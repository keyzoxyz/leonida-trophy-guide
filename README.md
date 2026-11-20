# Leonida Trophy Guide — GTA VI platinum roadmap & tracker

[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/keyzoxyz/leonida-trophy-guide/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/keyzoxyz/leonida-trophy-guide/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

**Bounty:** [make.fun/bounty/gta6-trophy-guide-01](https://make.fun/bounty/gta6-trophy-guide-01)

An offline, single-page guide and progress tracker for all 55 Grand Theft Auto VI PlayStation 5
trophies. It carries the official names, descriptions and grades, an original guide plus a one-line
"hard or cheap" note for every trophy, a ten-stage roadmap to the platinum, missable flags, kind and
grade filters, a spoiler-safe mode, and progress that saves in the browser and exports to a file.
There is no framework and no build step: `app/index.html` opened from disk is the whole install, and
the page makes no network request.

## What is inside

| File | Job |
|---|---|
| `app/index.html` | the page, its data-verified footer line, and the inline module that fills the date |
| `app/style.css` | the Vice City dusk theme on one 4px spacing scale, with the print sheet at the end |
| `app/app.js` | trophy list, roadmap, detail sheet, localStorage progress, export/import, spoiler mode, search |
| `app/data/trophies.json` | canonical data: 55 trophies with guides, `why`, steps, sources, stages and `verifiedAt` |
| `app/data/trophies.js` | the same data as an ES module, so the page imports it instead of fetching it |
| `tools/build-data-module.mjs` | regenerates the module from the JSON |
| `main.ts` | hands the entry in: copies `app/` and `screenshots/`, writes `dossier.json` |
| `serve.ts` | a small static server for local testing |

The JSON is the only copy a human edits. After changing it, run
`node tools/build-data-module.mjs` and commit both files; the module exports `GAME`, `PLATFORM`,
`VERIFIED_AT`, `STAGES` and `TROPHIES`, plus `TROPHIES` again as its default export.

## Filters and the roadmap

Kind chips (story, strands, activities, collectibles, heists, economy, meta) and grade chips with
per-grade earned counters narrow the list; the roadmap's ten stages filter it by point in the run.
"Hide earned", "Unearned only" and "Missable only" are independent toggles. Picking a kind clears any
stage selection, because the two views were never meant to intersect silently and an empty list is a
worse answer than a reset filter. The missable callout at the top of the roadmap counts what is still
open and links straight to the stages that hold it, so the roadmap and the list cannot disagree.

## Search, and what Escape does

Search covers a trophy's **name**, its **guide text** and its **cited sources**, joined into one
lowercase string before matching. Typing `PSNProfiles` or `Rockstar Newswire` therefore lists every
trophy that leans on that reference, and a query can never match across the seam between two fields.

Escape unwinds one layer at a time. With text in the box it clears the search and leaves an open
trophy sheet alone, because the reader most likely arrived from a search result and one keypress
should not undo both actions. Only when the box is already empty does Escape close the sheet.

## Printing it

The most useful checklist is the one you can take to the couch, so `app/style.css` ends in a dedicated
`@media print` block. Ctrl/Cmd+P gives a white page with black text: no gradients, no shadows, no
rounded panels. The block removes `#topbar`, `#filters`, `#roadmapPanel` and `#detailSheet` along with
the other mouse-only controls, then reflows the list so each trophy sits on its own row inside a 1px
border with its grade, name, official description, stage and missable flag. The screen check button
becomes an empty square you can tick with a pen, and an earned trophy prints ticked with its name
struck through. Spoiler-safe mode's blur is switched off for paper, where it would only print as a
grey smear.

## The data-verified footer line

The footer ends with **"Data verified _date_"**. That date is never typed into the page by hand:
`app/index.html` carries the raw ISO value in `<time id="verifiedAt" datetime="2026-11-21">2026-11-21</time>`
as a plain-markup fallback, and a small inline module imports `VERIFIED_AT` from `app/data/trophies.js`
and rewrites the element in the reader's locale. The single source of truth is `verifiedAt` at the top
of `app/data/trophies.json`, so a page cannot claim a fresher check than the trophy list it ships.

## About the guides

Every guide is original prose written for this entry, four sentences that turn the official
description into something you can act on: where the trophy sits in the run, what counts toward it,
and what usually goes wrong. Metadata is derived rather than invented — `kind` follows the verb in the
description, `stage` places the trophy on the roadmap, and `missable` is set where the description ties
a trophy to a named companion, strand, one-time beat or chapter boundary. Each trophy also carries a
`why` sentence naming what makes it hard or cheap: volume, a skill gate, a closing window, or cash. The
detail sheet prints that line under the official description and withholds it in spoiler-safe mode with
the guide, since it often names the story beat.

## Run it

```bash
node serve.ts        # then open http://localhost:8080
```

or hand the entry in:

```bash
rm -rf out && mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see [LICENSE](LICENSE). Trophy names and descriptions remain PlayStation's; everything else is
original to this entry.