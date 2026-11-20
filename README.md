# Leonida Trophy Guide — GTA VI platinum roadmap & tracker

An offline, single-page guide and progress tracker for all 55 Grand Theft Auto VI PlayStation 5
trophies. It ships the official names, descriptions and grades, an original guide and a one-sentence
"why it is hard or cheap" note for every trophy, a ten-stage roadmap to the platinum, missable flags,
kind and grade filters, a spoiler-safe mode, and progress that saves in the browser and exports to a
file. Plain static files only — no framework, no build step, no network request — so opening
`app/index.html` from disk is the whole install.

## What is inside

| File | Job |
|---|---|
| `app/index.html` | the page, the data-verified footer line, and the inline module that fills it |
| `app/style.css` | the Vice City dusk theme, on one 4px spacing scale, and the print stylesheet at the end |
| `app/app.js` | list, roadmap, detail sheet, localStorage progress, export/import, spoiler mode, search |
| `app/data/trophies.json` | the canonical data: 55 trophies, guides, `why`, steps, sources, stages, `verifiedAt` |
| `app/data/trophies.js` | the same data as an ES module, so the page needs no `fetch` when opened from disk |
| `main.ts` | hands the entry in: copies `app/` and `screenshots/` to the output folder, writes `dossier.json` |

`app/data/trophies.js` is generated from `app/data/trophies.json`; edit the JSON and regenerate rather
than keeping two hand-written copies. The module exports `GAME`, `PLATFORM`, `VERIFIED_AT`, `STAGES`
and `TROPHIES`, plus the same list as its default export.

## Printing it

The most useful form of a trophy checklist is the one you can carry to the couch and tick with a pen,
so `app/style.css` ends in a dedicated `@media print` block. Ctrl/Cmd+P gives a white page with black
text and nothing else: no gradients, no `box-shadow`, no rounded dark panels. The block turns off the
four pieces of the page that only work with a mouse — `#topbar`, `#filters`, `#roadmapPanel` and
`#detailSheet` — along with the other controls, and reflows the list so every trophy prints on its own
row inside a thin 1px border. Each row keeps its grade, name, official description, stage and missable
flag; the on-screen check button becomes an empty square you can tick, and a trophy already marked
earned prints with a tick and its name struck through. Spoiler-safe mode's blur is switched off in
print, because on paper it is just a grey smear: the row prints its placeholder words instead.

## The data-verified footer line

The footer ends with a line reading **"Data verified _date_"**. The date is not typed into the page by
hand and cannot drift away from the data. `app/index.html` carries the raw ISO date in
`<time id="verifiedAt" datetime="2026-11-21">2026-11-21</time>` as a plain-markup fallback, and a small
inline module imports `VERIFIED_AT` from `app/data/trophies.js` and rewrites the element in the
reader's locale. The single source of truth is `verifiedAt` at the top of `app/data/trophies.json`;
regenerate the module and the footer follows. A page therefore cannot claim a fresher check than the
trophy list it ships.

## Search, and what Escape does

The search box matches a trophy's **name**, its **guide text** and its **cited sources**. Sources are
joined into one searchable string first, so typing `PSNProfiles` or `Rockstar Newswire` lists every
trophy that leans on that reference, and a query can never match across the seam between two fields.
Escape unwinds one layer at a time: with text in the box it clears the search and leaves the open
trophy sheet alone, because the reader probably arrived from a search result and one key should not
undo both actions. Only with the box already empty does Escape close the detail sheet.

## The guides

Every guide is original prose written for this entry, derived from the official PlayStation
description plus the mechanic it names, and each trophy lists its sources beside it. Metadata is
derived rather than invented: `kind` reads off the description's verb, `stage` places the trophy on
the roadmap, and `missable` is set exactly where the description ties a trophy to a named companion,
strand, one-time story beat or chapter boundary — the shapes that advancing the story can close for
good.

Each trophy also carries a `why` field: one sentence, in this entry's own words, on what makes it hard
or cheap — volume, a skill gate, a closed storyline window, or cash. The detail sheet prints it under
the official description, and withholds it in spoiler-safe mode with the guide, because the honest
answer usually names the story beat.

## Run it

```bash
node serve.ts        # then open http://localhost:8080
```

or hand it in:

```bash
rm -rf out && mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see [LICENSE](LICENSE). Trophy names and descriptions remain PlayStation's; everything else
here is original.