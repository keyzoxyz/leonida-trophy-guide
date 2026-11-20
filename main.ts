// The hand-in step for the Leonida Trophy Guide. The deliverable is this directory's app/
// folder — plain static files a browser opens at app/index.html — plus up to four
// screenshots of it running. This program packages both:
//
//   1. refuse an entry with no app/index.html to open,
//   2. create the output directory (MAKEFUN_OUTPUT_DIR, or /output inside the grader),
//   3. copy app/ to <out>/app, byte for byte,
//   4. copy screenshots/ to <out>/screenshots, byte for byte,
//   5. report the file and byte counts that actually landed,
//   6. write dossier.json with the vendored make.fun library, under the scorer's caps.
//
// vendor/makefun-frontend.ts is the bounty's own copy of the dossier writer and stays
// untouched: the scorer rebuilds the dossier from this directory with an identical copy and
// expects the bytes written here to match. Run it locally with `MAKEFUN_OUTPUT_DIR=out node main.ts`.

import { cpSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

// The repository root is where this module lives, never the shell's working directory, so the
// program behaves the same however it is invoked.
const root = dirname(fileURLToPath(import.meta.url));

const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The scorer's caps, copied from the bounty's gate.json. Only text_max_bytes changes the
// bytes the library writes; the rest refuse an entry the scorer would refuse anyway.
const CAPS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 50331648,
};

function tally(dir: string): { files: number; bytes: number } {
  let files = 0;
  let bytes = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      const inner = tally(path);
      files += inner.files;
      bytes += inner.bytes;
    } else if (entry.isFile()) {
      files += 1;
      bytes += statSync(path).size;
    }
  }
  return { files, bytes };
}

function refuse(reason: string): never {
  console.error(`main.ts: refusing to hand in the entry — ${reason}`);
  process.exit(1);
}

// Step 1: the one file a browser must find, checked before anything is copied so a broken
// entry leaves no half-written output directory behind.
const page = join(root, 'app', 'index.html');
if (!existsSync(page)) refuse(`no app/index.html at ${page}`);
if (!statSync(page).isFile()) refuse(`${page} is not a file`);

// Step 2: the destination, created on demand. /output is the grader's; out/ is local.
mkdirSync(out, { recursive: true });

// Steps 3 and 4: the app and its screenshots, copied wholesale.
const appSource = join(root, 'app');
const shotsSource = join(root, 'screenshots');
if (!statSync(appSource).isDirectory()) refuse(`app/ is not a directory at ${appSource}`);
cpSync(appSource, join(out, 'app'), { recursive: true });
if (existsSync(shotsSource)) cpSync(shotsSource, join(out, 'screenshots'), { recursive: true });

// Step 5: what landed on disk, counted from the output rather than assumed from the input.
const app = tally(join(out, 'app'));
const shots = tally(join(out, 'screenshots'));
console.log(
  `main.ts: handed in ${app.files + shots.files} files, ${app.bytes + shots.bytes} bytes` +
  ` (app/ ${app.files} files ${app.bytes} bytes, screenshots/ ${shots.files} files ${shots.bytes} bytes)` +
  ` to ${out}`,
);

// Step 6: the dossier the judge reads, with the same options the scorer passes to its own
// copy of the library — that is what keeps the two files byte for byte identical.
const dossierPath = join(out, 'dossier.json');
const dossier = buildDossier(out, CAPS);
writeFileSync(dossierPath, dossier);
console.log(`main.ts: wrote ${dossierPath} (${dossier.byteLength} bytes)`);