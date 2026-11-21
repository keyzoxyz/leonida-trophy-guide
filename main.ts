// make.fun entry point: stage app/ and screenshots/ into the output directory and write its dossier.
// Runs as-is under Node 22+ (`node main.ts`); Node's standard library only.

import { cp, mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildDossier } from './vendor/makefun-frontend.ts';

const entryDir = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

interface Counts {
  files: number;
  bytes: number;
}

async function countTree(dir: string): Promise<Counts> {
  const counts: Counts = { files: 0, bytes: 0 };
  const walk = async (current: string): Promise<void> => {
    const entries = await readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const path = join(current, entry.name);
      if (entry.isDirectory()) {
        await walk(path);
      } else if (entry.isFile()) {
        counts.files += 1;
        counts.bytes += (await stat(path)).size;
      }
    }
  };
  await walk(dir);
  return counts;
}

async function stage(name: 'app' | 'screenshots'): Promise<Counts> {
  const source = join(entryDir, name);
  const target = join(outDir, name);
  await rm(target, { recursive: true, force: true });
  await cp(source, target, { recursive: true });
  return countTree(target);
}

await mkdir(outDir, { recursive: true });
await stage('app');
const screenshots = await stage('screenshots');

const app = await countTree(join(outDir, 'app'));

const dossier = buildDossier(entryDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 50331648,
});

await writeFile(join(outDir, 'dossier.json'), dossier);

if (dossier.length > 1572864) {
  console.error(`error: dossier.json is ${dossier.length} bytes, exceeds 1572864 bytes (1.5 MiB)`);
  process.exit(1);
}

console.log(`app: ${app.files} files, ${app.bytes} bytes`);
console.log(`screenshots: ${screenshots.files} files, ${screenshots.bytes} bytes`);
console.log(`dossier.json: 1 file, ${dossier.length} bytes`);
console.log(
  `total: ${app.files + screenshots.files + 1} files, ${app.bytes + screenshots.bytes + dossier.length} bytes`,
);