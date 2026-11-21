[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/keyzoxyz/leonida-trophy-guide/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/keyzoxyz/leonida-trophy-guide/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01)

# Leonida Ledger — GTA VI trophy guide and tracker

Leonida Ledger is an offline, single-page trophy guide and progress tracker for all 55 Grand Theft
Auto VI PlayStation 5 trophies. Every trophy carries its official name, description and grade, an
original walkthrough, a one-line note on why it is hard (or cheap), numbered steps and sources. The
page adds a ten-stage roadmap to the platinum, missable flags, kind/grade/status filters, a search
box, a spoiler-safe mode that masks story trophies, and progress that saves to `localStorage` and
exports/imports as JSON. It is plain static files — no framework, no build step, no network request
at runtime — so opening `app/index.html` from disk is the whole install.

## Files

| Path | Job |
|---|---|
| `app/index.html` | the page shell: header, progress card, filters, roadmap panel, detail dialog, footer |
| `app/style.css` | the Vice City dusk theme plus the print stylesheet that turns the list into a paper checklist |
| `app/app.js` | rendering, filtering, search, detail sheet, roadmap, spoiler mode, localStorage progress, export/import |
| `app/data/trophies.json` | canonical data: 55 trophies with guides, `why`, steps, sources, stages and `verifiedAt` |
| `app/data/trophies.js` | the same data as an ES module, so the page loads with no `fetch` from `file://` |
| `main.ts` | entry point: copies `app/` and `screenshots/` into the output directory and writes `dossier.json` |
| `serve.ts` | small static server for local development (`node serve.ts`, optional `--port <n>`) |
| `scripts/shoot.py` | captures the four 1280×1080 screenshots into `screenshots/` with Playwright |
| `vendor/makefun-frontend.ts` | vendored `buildDossier`, used by `main.ts`; read-only |
| `screenshots/` | the four shipped PNGs: checklist, guide, roadmap, spoiler-safe view |

`app/data/trophies.js` is generated from `app/data/trophies.json`; edit the JSON rather than keeping
two hand-written copies.

## Run it

The guide itself needs nothing but a browser:

```sh
node serve.ts            # serves app/ on http://localhost:8080
```

Regenerate the screenshots (Python 3 with Pillow and Playwright, plus its Chromium build). It serves
`app/` on 127.0.0.1:8099, drives headless Chromium, and rewrites the four PNGs in `screenshots/`:

```sh
python3 scripts/shoot.py
```

Build the bounty entry with Node 22, standard library only. This copies `app/` and `screenshots/`
into the output directory and writes `dossier.json`; `MAKEFUN_OUTPUT_DIR` defaults to `/output`:

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts
```