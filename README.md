# Leonida Trophy Guide — GTA VI platinum roadmap & tracker

Entry for [make.fun · gta6-trophy-guide-01](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01).
[![rank](https://make.fun/badge/gta6-trophy-guide-01/keyzoxyz/leonida-trophy-guide/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/keyzoxyz/leonida-trophy-guide/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

An offline, single-page guide and tracker for all 55 Grand Theft Auto VI PlayStation 5 trophies: the
official names, descriptions and grades, an original guide for every trophy with its sources named,
a one-line note on what makes each trophy hard or cheap, a ten-stage roadmap to the platinum, missable
flags and a callout counting what is still winnable, kind and grade filters, a spoiler-safe mode, and
progress that saves in the browser and exports to a file. It is plain static files — no framework, no
build step, no network request — so opening `app/index.html` from disk is the whole install.

## What is inside

| File | Job |
|---|---|
| `app/index.html` | the page, the footer's data-verified line, and the inline module that fills it |
| `app/style.css` | the Vice City dusk theme on one 4px spacing scale, and the print stylesheet at the end |
| `app/app.js` | list, roadmap, detail sheet, localStorage progress, export/import, spoiler mode, search |
| `app/data/trophies.json` | the canonical data: 55 trophies, guides, `why`, steps, sources, stages, `verifiedAt` |
| `app/data/trophies.js` | the same data as an ES module, so the page needs no `fetch` when opened from disk |
| `main.ts` | hands the entry in: copies `app/` and `screenshots/` to the output folder, writes `dossier.json` |

`trophies.js` is generated from `trophies.json`; edit the JSON and regenerate rather than editing both.

## Printing it

The most useful form of a trophy checklist is the one you can carry to the couch and tick with a pen, so
`app/style.css` ends in a dedicated `@media print` block. Pressing Ctrl/Cmd+P gives a white page with
black text and nothing else: no gradients, no box-shadows and no rounded panels. The block turns off the
four pieces of the page that only work with a mouse — `#topbar`, `#filters`, `#roadmapPanel` and
`#detailSheet` — and reflows the trophy list so every trophy prints on its own row inside a thin 1px
border. Each row keeps its grade, name, official description, stage and missable flag; the on-screen
check button is replaced by an empty square you can tick, and a trophy already marked earned prints with
a tick and its name struck through. Spoiler-safe mode's text-shadow blur is disabled in print, because
on paper it is just a grey smear: the row prints its placeholder words instead.

## The data-verified footer line

The footer ends with a line reading **"Data verified _date_"**. That date is not typed into the markup
by hand and cannot drift away from the data: `app/index.html` holds the raw ISO string in
`<span id="verifiedAt">` as a no-script fallback, and a small inline module imports the `VERIFIED_AT`
constant from `app/data/trophies.js` and rewrites the span in the reader's locale. The single source of
truth is `verifiedAt` at the top of `app/data/trophies.json`; regenerate the module and the footer
follows. A page can therefore never claim a fresher check than the trophy list it ships.

## Search, and what Escape does

The search box matches a trophy's **name**, its **guide text** and its **cited sources**. Sources are
joined into one searchable string first, so typing `PSNProfiles` or `Rockstar Newswire` lists every
trophy that leans on that reference, and a query can never match across the seam between two fields.
Escape unwinds one layer at a time: with text in the box it clears the search and leaves the open trophy
sheet alone, because the reader came from a search result and one key should not undo both actions. Only
with the box already empty does Escape close the detail sheet.

## The guides

Every guide is original prose written for this entry, derived from the official PlayStation description
plus the mechanic it names, and each trophy carries its sources beside it. Metadata is derived rather
than invented: `kind` reads off the description's verb, `stage` places the trophy on the roadmap, and
`missable` is set exactly where the description ties a trophy to a named companion, strand, one-time
story beat or chapter boundary — the four shapes that advancing the story can close for good.

Each trophy also carries a `why` field: one sentence, in this entry's own words, on what makes that
trophy hard or cheap — volume, a skill gate, a closed storyline window, or cash. The detail sheet prints
it under the official description, and withholds it in spoiler-safe mode along with the guide, because
the honest answer usually names the story beat.

## Run it

```bash
node serve.ts        # then open http://localhost:8080
```

or hand it in:

```bash
rm -rf out && mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see [LICENSE](LICENSE). Trophy names and descriptions remain PlayStation's; everything else here
is original.