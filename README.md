[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/keyzoxyz/leonida-trophy-guide/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/keyzoxyz/leonida-trophy-guide/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01)

# Leonida Trophy Guide

An offline, single-page GTA VI trophy guide and tracker for PlayStation 5. All 55 trophies, ten
roadmap stages, a missable-first warning system, spoiler-safe browsing, and progress that lives in
your browser — no account, no network, no build step.

Open `app/index.html` and the whole thing runs. Mark trophies as you earn them; the header progress
bar, grade counts and roadmap all update live. Everything is saved to `localStorage`, and the
Export/Import buttons move your progress between machines as a small JSON file.

## What makes it a guide, not just a list

- **Missable-first roadmap.** The sidebar orders all ten stages the way the platinum wants them, with
  a callout counting the 16 missable trophies and a warning that every one of them closes with its
  chapter. The finale is flagged as a one-way door.
- **A written route for every trophy.** Each of the 55 entries carries its own short guide, a
  one-line "why", ordered steps, and sources — so a trophy is always one click from a plan.
- **Spoiler-safe by default.** Unearned story trophies are masked to their kind until you earn them
  or turn spoiler-safe off, so a trophy hunt never leaks the plot.
- **Filters that match how you actually play.** Search over names, guides and sources; filter by
  grade, kind, or status (missable / earned / unearned).

## Files

| Path | What it is |
| --- | --- |
| `app/index.html` | The page: header, grade chips, controls, filters, roadmap, list, detail sheet, footer |
| `app/style.css` | Vice City dusk theme: deep navy, magenta, teal, gold; 4px spacing scale; print stylesheet |
| `app/app.js` | Rendering, filters, search, spoiler masking, localStorage progress, export/import, detail sheet |
| `app/data/trophies.json` | The 55 trophies and 10 stages — the single source of truth |
| `app/data/trophies.js` | The same data as an ES module, generated from the JSON |
| `scripts/shoot.py` | Serves `app/` and captures the four 1280x1080 screenshots in `screenshots/` |
| `screenshots/*.png` | The four captures that ship with the entry |
| `main.ts` | The make.fun hand-in: copies `app/` + `screenshots/` to the output dir, writes `dossier.json` |
| `vendor/makefun-frontend.ts` | The bounty's dossier writer, untouched |

## Run it

```sh
# Browse the guide (no build step)
open app/index.html            # or: python3 -m http.server -d app 8080

# Regenerate the four screenshots
python3 scripts/shoot.py

# Produce the hand-in (dossier.json + packaged app/screenshots)
MAKEFUN_OUTPUT_DIR=out node main.ts
```

The four screenshots: `1-checklist.png` (a third of trophies earned), `2-guide.png` (a missable
trophy's sheet open), `3-roadmap.png` (missable-only filter), `4-spoiler.png` (spoiler-safe with the
story filter).

Verified against the PlayStation 5 trophy list on 2026-11-21. Good luck out there, Leonida Legend.
