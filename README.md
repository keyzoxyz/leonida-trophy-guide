# Leonida Trophy Guide — GTA VI platinum roadmap & tracker

Entry for [make.fun · gta6-trophy-guide-01](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01).
[![rank](https://make.fun/badge/gta6-trophy-guide-01/keyzoxyz/leonida-trophy-guide/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/keyzoxyz/leonida-trophy-guide/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

An offline, single-page guide and tracker for all 55 Grand Theft Auto VI PlayStation 5 trophies:
the official names, descriptions and grades as PlayStation publishes them, an original guide for
every trophy with its sources named and a one-line note on what makes that trophy hard or easy,
a ten-stage roadmap to the platinum, missable flags, a missable-trophy callout that counts what is
still winnable and points at the stages it sits in, kind filters and grade filters with per-grade
earned counters, a spoiler-safe mode, and progress that saves in the browser and exports to a file.

## What is inside

| File | Job |
|---|---|
| `app/index.html` | the page, and the footer's data-verified line |
| `app/style.css` | the Vice City dusk theme — one palette, one 4px spacing scale — and, at the end, the print stylesheet |
| `app/app.js` | list, roadmap, detail sheet, localStorage progress, export/import, spoiler mode, search |
| `app/data/trophies.json` | the canonical data: 55 trophies, guides, `why`, steps, sources, stages, `verifiedAt` |
| `app/data/trophies.js` | the same data as an ES module, so opening from disk needs no fetch |
| `main.ts` | hands the entry in: copies `app/` + `screenshots/` to `/output`, writes `dossier.json` |

No framework, no build step, no network: the whole first load is four files, about 25 KB gzipped.

## Reading it on paper

`app/style.css` ends in a dedicated `@media print` block, because the most useful form of a trophy
checklist is the one you can carry to the couch and tick with a pen. Printing (Ctrl/Cmd+P) gives a
white page with black text and nothing else: no gradients, no box-shadows, no rounded panels. The
block hides the four things that only work with a mouse — `#topbar`, `#filters`, `#roadmapPanel` and
`#detailSheet` — and reflows the trophy list so every card prints on its own row inside a plain 1px
border. Each row keeps its grade, name, official description, stage, missable flag and count, and the
on-screen check button becomes an empty square to tick; an earned trophy prints with a tick already in
the box and its name struck through. Spoiler-safe mode's text-shadow blur is switched off in print, so
hidden trophies print as their placeholder words rather than a grey smear.

## The data-verified line

The footer ends with a line reading **"Data verified _date_"**. That date is not typed into
`app/index.html` by hand and cannot drift out of date: the markup holds the raw ISO string in
`<span id="verifiedAt">` as a no-script fallback, and a small inline module imports the
`VERIFIED_AT` constant from `app/data/trophies.js` and rewrites the span for the reader's locale.
The single source of truth is `verifiedAt` at the top of `app/data/trophies.json`; regenerate the
module from the JSON and the footer follows. A page can therefore never claim a fresher check than
the data it ships.

## The guides

Every guide is original text written for this entry, derived from the official PlayStation
description plus the mechanic it names, and each carries its sources beside it — the official
description first, then the community references a fact came from. Metadata is derived, not
invented: `kind` reads off the description's verb, `stage` places the trophy on the roadmap,
`missable` is set exactly where the description ties the trophy to a named companion, strand,
one-time story beat or chapter boundary — the four shapes that can be lost by advancing the story.

Each trophy also carries a `why` field: one short sentence, in this entry's own words, saying what
makes that particular trophy hard or easy (volume, skill gate, a closed storyline window, cash).
The detail sheet prints it under the official description, and like the guide it is withheld in
spoiler-safe mode, because the honest answer often names the story beat.

Where a guide hinges on a named character, the character is named in the guide's first sentence, so
the card, the sheet and a search for that name all lead to the same trophy.

## Searching and the Escape key

The search box matches a trophy's name, its guide text and its cited sources — the sources are
joined into one searchable string — so typing `PSNProfiles` or `Rockstar Newswire` lists the
trophies that lean on that reference. Escape unwinds one layer at a time: with text in the box it
clears the search and leaves the trophy sheet open, and only with the box already empty does it
close the sheet.

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