# Leonida Trophy Guide — GTA VI platinum roadmap & tracker

Entry for [make.fun · gta6-trophy-guide-01](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01).
[![rank](https://make.fun/badge/gta6-trophy-guide-01/keyzoxyz/leonida-trophy-guide/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/keyzoxyz/leonida-trophy-guide/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

An offline, single-page guide and tracker for all 55 Grand Theft Auto VI PlayStation 5 trophies:
the official names, descriptions and grades as PlayStation publishes them, an original guide for
every trophy with its sources named, a ten-stage roadmap to the platinum, missable flags, kind
filters, a spoiler-safe mode, and progress that saves in the browser and exports to a file.

## What is inside

| File | Job |
|---|---|
| `app/index.html` | the page |
| `app/style.css` | the Vice City dusk theme — one palette, one 4px spacing scale |
| `app/app.js` | list, roadmap, detail sheet, localStorage progress, export/import, spoiler mode |
| `app/data/trophies.json` | the canonical data: 55 trophies, guides, steps, sources, stages |
| `app/data/trophies.js` | the same data as an ES module, so opening from disk needs no fetch |
| `main.ts` | hands the entry in: copies `app/` + `screenshots/` to `/output`, writes `dossier.json` |

No framework, no build step, no network: the whole first load is four files, 18 KB gzipped.

## The guides

Every guide is original text written for this entry, derived from the official PlayStation
description plus the mechanic it names, and each carries its sources beside it — the official
description first, then the community references a fact came from. Metadata is derived, not
invented: `kind` reads off the description's verb, `stage` places the trophy on the roadmap,
`missable` is set exactly where the description ties the trophy to a named companion, strand,
one-time story beat or chapter boundary — the four shapes that can be lost by advancing the story.

## Run it

```bash
node serve.ts        # then open http://localhost:8080
```

or hand it in:

```bash
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see [LICENSE](LICENSE). Trophy names and descriptions remain PlayStation's; everything else
here is original.
