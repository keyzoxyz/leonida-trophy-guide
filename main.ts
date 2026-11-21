// The entry point of this make.fun entry (Node 22, standard library only, no build step: `node main.ts`). It takes
// the entry directory this file sits in, copies app/ and screenshots/ into the output directory, and writes
// dossier.json — the canonical bytes buildDossier makes of app/ and screenshots/ — then prints what it wrote.
// MAKEFUN_OUTPUT_DIR picks the output directory; it defaults to /output. vendor/ is read, never written.
import { cp, mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = resolve(fileURLToPath(new URL('.', import.meta.url)));
const out = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? '/output');

const CAPS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 50331648,
};

type Count = { files: number; bytes: number };

/** The regular files under dir, recursively, and their sizes summed. */
async function countTree(dir: string): Promise<Count> {
  let files = 0;
  let bytes = 0;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      const sub = await countTree(path);
      files += sub.files;
      bytes += sub.bytes;
    } else if (entry.isFile()) {
      files += 1;
      bytes += (await stat(path)).size;
    }
  }
  return { files, bytes };
}

const line = (name: string, count: Count) => `${name.padEnd(14)}${String(count.files).padStart(4)} files ${String(count.bytes).padStart(10)} bytes`;

// Build first, so a dossier buildDossier refuses leaves the output directory untouched.
const dossier = buildDossier(here, CAPS);

await mkdir(out, { recursive: true });
for (const name of ['app', 'screenshots']) {
  await rm(join(out, name), { recursive: true, force: true });
  await cp(join(here, name), join(out, name), { recursive: true });
}

// What the dossier describes is now on disk, so measure the copied app tree itself. A dossier past
// 1.5 MiB (1572864 bytes) is not publishable, so fail loudly instead of writing it.
const app = await countTree(join(out, 'app'));
console.log(`app total: ${app.bytes} bytes`);
if (dossier.byteLength > 1572864) {
  console.error(`error: dossier.json is ${dossier.byteLength} bytes, over the 1.5 MiB limit of 1572864 bytes`);
  process.exit(1);
}

await writeFile(join(out, 'dossier.json'), dossier);

const screenshots = await countTree(join(out, 'screenshots'));
console.log(line('app/', app));
console.log(line('screenshots/', screenshots));
console.log(line('dossier.json', { files: 1, bytes: dossier.byteLength }));
console.log(line('total', {
  files: app.files + screenshots.files + 1,
  bytes: app.bytes + screenshots.bytes + dossier.byteLength,
}));
console.log(`written to ${out}`);