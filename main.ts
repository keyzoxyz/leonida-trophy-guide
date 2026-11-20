// Entry point for the Leonida Trophy Guide bounty entry. The deliverable is this directory's app/
// folder — plain static files a browser opens at app/index.html, with no framework, no build step and
// no network request — plus 3 or 4 screenshots of it running. This program does the hand-in:
//
//   1. refuse an entry that has no app/index.html to open,
//   2. create the output directory (MAKEFUN_OUTPUT_DIR, or /output inside the grader),
//   3. copy app/ beside it, byte for byte,
//   4. copy screenshots/ beside it, byte for byte,
//   5. report how many files and bytes it handed over,
//   6. write dossier.json with the vendored make.fun library, under the scorer's own caps.
//
// vendor/makefun-frontend.ts is the bounty's copy of the dossier writer and must stay untouched: the
// scorer rebuilds the dossier from this directory with its own identical copy and expects the bytes
// written here to match. Run it locally with `MAKEFUN_OUTPUT_DIR=out node main.ts`; serve the app with
// `node serve.ts` and open http://localhost:8080.

import { cpSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

// The repository root is wherever this module lives — never the shell's working directory — so the
// script behaves the same when invoked from a subfolder or by an absolute path.
const root = dirname(fileURLToPath(import.meta.url));

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The scorer's caps, read off the bounty's reference/gate.json. Only text_max_bytes changes the bytes
// the library writes; the others make this program refuse an entry the scorer would refuse anyway.
const SCORER_CAPS = {
  // gate.json text_max_bytes: 160 KiB of source text inside the dossier.
  text_max_bytes: 163840,
  // gate.json screenshot count and per-image size: at most 4 images, each at most 256 KiB.
  screenshots: { max: 4, max_bytes: 262144 },
  // gate.json app tree: at most 993 files and directories under app/, at most 48 MiB of app files.
  app_max_files: 993,
  app_max_bytes: 50331648,
};

/** What one directory of the entry costs, so the run can say what it handed over. */
type TreeSize = { files: number; bytes: number };

function tally(dir: string): TreeSize {
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

/** Print why the entry cannot be handed in and stop with a failing status. */
function refuse(reason: string): never {
  console.error(`main.ts: refusing to hand in this entry — ${reason}`);
  process.exit(1);
}

// Step 1: the one file a browser must find. Checked before anything is copied, so a broken entry
// leaves no half-written output directory behind.
const page = join(root, 'app', 'index.html');
if (!existsSync(page)) refuse(`no app/index.html at ${page}`);
if (!statSync(page).isFile()) refuse(`${page} is not a file`);

// Step 2: the destination, created on demand. /output is the grader's; out/ is the local stand-in.
mkdirSync(outputDir, { recursive: true });

// Steps 3 and 4: the app and its screenshots, copied wholesale. screenshots/ is optional at the source
// but always present when this program finishes, because the dossier reads it.
const appSource = join(root, 'app');
const appTarget = join(outputDir, 'app');
if (!existsSync(appSource) || !statSync(appSource).isDirectory()) refuse(`no app/ directory at ${appSource}`);
cpSync(appSource, appTarget, { recursive: true });

const shotsSource = join(root, 'screenshots');
const shotsTarget = join(outputDir, 'screenshots');
mkdirSync(shotsTarget, { recursive: true });
if (existsSync(shotsSource)) cpSync(shotsSource, shotsTarget, { recursive: true });

// Step 5: what actually landed on disk, counted from the output rather than assumed from the inputs.
const appSize = tally(appTarget);
const shotsSize = tally(shotsTarget);
console.log(
  `main.ts: handed in ${appSize.files + shotsSize.files} files, ${appSize.bytes + shotsSize.bytes} bytes` +
  ` (app/ ${appSize.files} files ${appSize.bytes} bytes, screenshots/ ${shotsSize.files} files ${shotsSize.bytes} bytes)` +
  ` to ${outputDir}`,
);

// Step 6: the dossier the judge reads. Same options the scorer passes to its own copy of the library,
// which is what keeps the two files byte for byte identical.
const dossierPath = join(outputDir, 'dossier.json');
const dossier = buildDossier(outputDir, SCORER_CAPS);
writeFileSync(dossierPath, dossier);
console.log(`main.ts: wrote ${dossierPath} (${dossier.byteLength} bytes)`);