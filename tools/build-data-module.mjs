// Turns app/data/trophies.json — the canonical copy — into app/data/trophies.js, the ES module the
// page imports. Opening index.html straight from disk is then a plain module load with no fetch, and
// the JSON stays the single place a human edits: run `node tools/build-data-module.mjs` after changing
// it and commit both files. The generator is deliberately dumb: it copies values in the order the JSON
// holds them, so a field added to the data reaches the page without being taught to this script.

import { readFileSync, writeFileSync } from 'node:fs';

const source = new URL('../app/data/trophies.json', import.meta.url);
const target = new URL('../app/data/trophies.js', import.meta.url);

const data = JSON.parse(readFileSync(source, 'utf8'));

for (const key of ['game', 'platform', 'verifiedAt', 'stages', 'trophies']) {
  if (!(key in data)) throw new Error(`trophies.json is missing "${key}"`);
}
if (!Array.isArray(data.trophies) || data.trophies.length === 0) {
  throw new Error('trophies.json holds no trophies');
}

/** Pretty JSON for a value, at the same two-space indent the JSON file uses. */
const block = (value) => JSON.stringify(value, null, 2);

const parts = [
  '// Trophy data for the Leonida Trophy Guide, generated from app/data/trophies.json.',
  '// That JSON is the canonical copy; edit it and run `node tools/build-data-module.mjs` rather than',
  '// editing this module, which only exists so the page can import its data with no fetch.',
  '',
  `export const GAME = ${JSON.stringify(data.game)};`,
  `export const PLATFORM = ${JSON.stringify(data.platform)};`,
  `export const VERIFIED_AT = ${JSON.stringify(data.verifiedAt)};`,
  '',
  `export const STAGES = ${block(data.stages)};`,
  '',
  `export const TROPHIES = ${block(data.trophies)};`,
  '',
  'export default TROPHIES;',
  '',
];

writeFileSync(target, parts.join('\n'));
console.log(`wrote app/data/trophies.js: ${data.trophies.length} trophies, ${data.stages.length} stages, ${Buffer.byteLength(parts.join('\n'))} bytes`);