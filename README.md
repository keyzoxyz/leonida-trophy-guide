[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/keyzoxyz/leonida-trophy-guide/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/keyzoxyz/leonida-trophy-guide/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

# Leonida Trophy Guide

A GTA 6 (Leonida) trophy guide: a curated list of all trophies with unlock conditions, plus a script that screenshots each trophy card from the web app to produce the guide's images.

## Files

| Path | Description |
| --- | --- |
| `main.ts` | Entry point that builds the trophy guide (screenshots + data output). |
| `serve.ts` | Local dev server for the web app. |
| `app/index.html` | Web app page shell. |
| `app/app.js` | Web app logic (trophy rendering & navigation). |
| `app/style.css` | Web app styling. |
| `app/data/trophies.js` | Trophy data as a JS module. |
| `app/data/trophies.json` | Combined trophy data (JSON). |
| `app/data/trophies-1.json` | Trophy data batch 1. |
| `app/data/trophies-2.json` | Trophy data batch 2. |
| `app/data/trophies-3.json` | Trophy data batch 3. |
| `scripts/shoot.py` | Screenshot script that captures trophy cards from the app. |
| `vendor/makefun-frontend.ts` | Bundled make.fun frontend helper. |
| `LICENSE` | License. |
| `.gitignore` | Git ignore rules. |

## How to run

Capture trophy card screenshots:

    python3 scripts/shoot.py

Build the guide (data + screenshots) with output written to `out`:

    MAKEFUN_OUTPUT_DIR=out node main.ts
