// Leonida Trophy Guide — make.fun entrypoint.
//
// This program is the hand-in: it copies the static app/ and screenshots/ trees next to each other
// under the output directory, prints what it handed over, then writes dossier.json with the bounty's
// vendored dossier writer under the scorer's own caps. The app itself is plain static files with no
// build step, so "building" here means packaging: byte-for-byte copies, then one JSON report.
//
//   MAKEFUN_OUTPUT_DIR=out node main.ts
//
// vendor/makefun-frontend.ts is the bounty's library; it must stay untouched so the scorer's copy of
// buildDossier produces exactly the bytes committed here.

import { cpSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

// The root is the directory this module sits in, whatever the shell's working directory says.
const root = dirname(fileURLToPath(import.meta.url));

const OUT = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The scorer's gate caps, read from the bounty spec: 160 KiB of source text in the dossier, at most
// 4 screenshots of 256 KiB each, and an app tree of at most 993 entries and 48 MiB.
const CAPS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 50331648,
};

/** Total file count and bytes under a directory tree. */
function tally(dir) {
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

function refuse(reason) {
  console.error(`main.ts: refusing the hand-in — ${reason}`);
  process.exit(1);
}

// The one file a browser must open, checked before anything is written so a broken entry leaves no
// half-finished output directory behind.
const page = join(root, 'app', 'index.html');
if (!existsSync(page) || !statSync(page).isFile()) refuse(`no app/index.html at ${page}`);

mkdirSync(OUT, { recursive: true });

// Steps 1 and 2: the app tree, then the screenshots. Both are copied wholesale; screenshots/ is
// optional at the source but always present in the output because the dossier reads it.
const appTarget = join(OUT, 'app');
if (!existsSync(join(root, 'app'))) refuse('app/ is missing');
cpSync(join(root, 'app'), appTarget, { recursive: true });

const shotsTarget = join(OUT, 'screenshots');
mkdirSync(shotsTarget, { recursive: true });
if (existsSync(join(root, 'screenshots'))) {
  cpSync(join(root, 'screenshots'), shotsTarget, { recursive: true });
}

// Steps 3 and 4: report what actually landed on disk, counted from the output, not assumed.
const appSize = tally(appTarget);
const shotsSize = tally(shotsTarget);
const totalFiles = appSize.files + shotsSize.files;
const totalBytes = appSize.bytes + shotsSize.bytes;
console.log(
  `main.ts: handed in ${totalFiles} files, ${totalBytes} bytes` +
  ` (app/ ${appSize.files} files ${appSize.bytes} bytes, screenshots/ ${shotsSize.files} files ${shotsSize.bytes} bytes)` +
  ` to ${OUT}`,
);

// Step 5: the dossier the judge reads, written with the same options the scorer passes to its own
// byte-identical copy of the library.
const dossierPath = join(OUT, 'dossier.json');
const dossier = buildDossier(OUT, CAPS);
writeFileSync(dossierPath, dossier);
console.log(`main.ts: wrote ${dossierPath} (${dossier.byteLength} bytes)`);
