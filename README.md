[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/keyzoxyz/leonida-trophy-guide/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/keyzoxyz/leonida-trophy-guide/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01)

# Leonida Trophy Guide

An offline, single-page trophy guide and tracker for **Grand Theft Auto VI** on **PlayStation 5** —
all **55 trophies**, every one with a hand-written guide, a why, concrete steps and the sources
checked against the list verified on **2026-11-21**. No frameworks, no build step, no network
calls: plain HTML, CSS and one ES module of data, so the page works straight off disk and keeps
your progress in the browser.

## What it does

- **Checklist** — tick trophies as the PlayStation notifications land; the count, the progress
  bar and the per-grade chips update everywhere at once, and the state survives reloads in
  localStorage.
- **Guides** — every trophy opens a detail sheet with the full guide, why the trophy exists,
  numbered steps and its sources. Nothing here is farmed from a wiki dump.
- **Roadmap** — ten stages in the order that keeps the platinum reachable, with a callout for
  the 16 missable trophies that close when the story advances past them.
- **Filters** — by kind (story, strangers, heists, activities, collectibles, economy, meta),
  by grade, by missable / earned / unearned, and a search that reads names, guide text and
  sources.
- **Spoiler-safe mode** — masks the names and descriptions of unearned story trophies until
  they are banked, so the guide can sit open on a second screen.
- **Export / import** — progress as a small JSON file, for moving between machines.
- **Print** — a print stylesheet strips the chrome and lays the guide out on paper.

## Files

| Path | What it is |
| --- | --- |
| `app/index.html` | The page: top bar, grade chips, controls, filters, roadmap, trophy list, detail sheet, footer |
| `app/style.css` | Vice City dusk theme — deep navy, coral, teal, gold; sticky bars, cards, modal sheet, print block |
| `app/app.js` | Rendering, filters, search, spoiler masking, earned state, export/import, the sheet |
| `app/data/trophies.json` | The 55 trophies and 10 roadmap stages, compact, one trophy per line |
| `app/data/trophies.js` | The same data as an ES module, generated from the JSON (the page imports this) |
| `main.ts` | The hand-in: copies `app/` and `screenshots/` into the output dir and writes `dossier.json` |
| `scripts/shoot.py` | Serves `app/` on 127.0.0.1:8099 and captures the four screenshots with Playwright |
| `screenshots/` | The four 1280×1080 captures the judge sees first |
| `vendor/makefun-frontend.ts` | make.fun's dossier library, vendored untouched |
| `serve.ts` | Optional local server (`node serve.ts` → http://localhost:8080) |

## Run it

```sh
# open the app directly, or serve it
node serve.ts                # http://localhost:8080

# reshoot the four screenshots (needs Playwright's Chromium and Pillow)
python3 scripts/shoot.py

# hand the entry in: copies app/ + screenshots/ to out/ and writes out/dossier.json
rm -rf out && mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`MAKEFUN_OUTPUT_DIR` defaults to `/output`, which is where the grader expects the hand-in.

## Data

Trophy facts — ids, names, official descriptions, grades, kinds, stages, missable and hidden
flags — are verified against the PlayStation 5 list as of **2026-11-21**. The guides, whys and
steps are original writing for this entry. `app/data/trophies.js` is generated from
`app/data/trophies.json`; edit the JSON, then regenerate the module rather than editing both.

## Unofficial

Fan-made and unaffiliated with Rockstar Games or Sony Interactive Entertainment. All trophy
names and descriptions belong to their owners; the words around them are ours.