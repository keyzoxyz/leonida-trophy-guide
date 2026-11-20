# Leonida Trophy Guide — GTA VI platinum roadmap & tracker

Entry for [make.fun · gta6-trophy-guide-01](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01).
[![rank](https://make.fun/badge/gta6-trophy-guide-01/keyzoxyz/leonida-trophy-guide/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/keyzoxyz/leonida-trophy-guide/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

An offline, single-page guide and tracker for all 55 Grand Theft Auto VI PlayStation 5 trophies:
the official names, descriptions and grades as PlayStation publishes them, an original guide for
every trophy with its sources named, a ten-stage roadmap to the platinum, missable flags, a
missable-trophy callout that counts what is still winnable and points at the stages it sits in,
kind filters and grade filters with per-grade earned counters, a spoiler-safe mode, and progress
that saves in the browser and exports to a file.

## What is inside

| File | Job |
|---|---|
| `app/index.html` | the page |
| `app/style.css` | the Vice City dusk theme — one palette, one 4px spacing scale — plus the print stylesheet |
| `app/app.js` | list, roadmap, detail sheet, localStorage progress, export/import, spoiler mode |
| `app/data/trophies.json` | the canonical data: 55 trophies, guides, steps, sources, stages, `verifiedAt` |
| `app/data/trophies.js` | the same data as an ES module, so opening from disk needs no fetch |
| `main.ts` | hands the entry in: copies `app/` + `screenshots/` to `/output`, writes `dossier.json` |

No framework, no build step, no network: the whole first load is four files, 18 KB gzipped.

## Reading it on paper

`app/style.css` ends in a `@media print` block, because the most useful form of a trophy checklist
is the one you can carry to the couch and tick with a pen. Printing (Ctrl/Cmd+P) drops the dark
theme — white page, black text, no gradients, no shadows, no rounded panels — hides the roadmap
panel, the filter bar, the header controls and the detail sheet, and reflows the list into one
column. Each trophy keeps its grade, name, official description, stage, missable flag and count,
and the on-screen check button becomes an empty square to tick; an earned trophy prints with a tick
already in the box and its name struck through. Spoiler-safe mode's text-shadow blur is switched
off in print, so hidden trophies print as their placeholder words rather than a grey smear.

## The last-updated line

The footer carries "Trophy list last updated <date>". That date is not written into
`app/index.html` by hand: the markup holds the raw ISO string as a fallback, and a small inline
module imports `VERIFIED_AT` from `app/data/trophies.js` and formats it for the reader's locale. The
single source of truth is `verifiedAt` at the top of `app/data/trophies.json`; regenerate the module
and the footer follows. A page can therefore never claim a fresher check than the data it ships.

## The guides

Every guide is original text written for this entry, derived from the official PlayStation
description plus the mechanic it names, and each carries its sources beside it — the official
description first, then the community references a fact came from. Metadata is derived, not
invented: `kind` reads off the description's verb, `stage` places the trophy on the roadmap,
`missable` is set exactly where the description ties the trophy to a named companion, strand,
one-time story beat or chapter boundary — the four shapes that can be lost by advancing the story.

Where a guide hinges on a named character, the character is named in the guide's first sentence, so
the card, the sheet and a search for that name all lead to the same trophy.

## Searching

The search box matches a trophy's name, its guide text and its cited sources, so typing
`PSNProfiles` or `PowerPyx` lists the trophies that lean on that reference. Escape unwinds the
narrowest layer first: it clears the search box, and only then closes an open trophy sheet.

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