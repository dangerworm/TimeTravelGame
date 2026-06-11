# Warped — card printer (prototype renderer)

A small **Vite + React + MUI** tool that loads the canonical card content (`../decks/*/cards.json`)
and renders **print-ready A4 sheets** for the paper playtest — including **double-sided era cards**.
It is a print generator, **not a playable game**.

## Run it

```bash
cd renderer
npm install
npm run dev      # opens a local server; sync runs automatically first
```

Then in the browser:

1. Pick a deck from the dropdown (Destinations / Researchers / Experts / Parting Gifts / Consequences).
2. For **Destinations**, choose **Duplex** (front + back, the default), **Fronts only**, or **Backs only**.
3. Click **Print / Save as PDF** → in the print dialog choose **Save as PDF** (or a real printer).

A4 portrait, **3×3 = 9 cards per page**, ~62×90 mm each. The card border is the cut line.

## Double-sided era cards

In **Duplex** mode the pages come out **front, back, front, back…**, and the back pages are
**pre-mirrored** so they line up when you print double-sided. Set your printer to **double-sided,
flip on long edge**. If the backs don't align, switch the printer to short-edge binding, or print
**Fronts only** and **Backs only** separately and collate by hand.

> Printer setup: in the browser print dialog, set **Margins: Default/None** and **Scale: 100%** (turn
> off "Fit to page") so the mm sizing is preserved. Enable **Background graphics** so the era colours
> print.

## How content flows

`../decks/*/cards.json` is the **single source of truth**. `npm run dev`/`build` run
`scripts/sync-content.mjs` first, which copies those files into `src/content/` (gitignored). Edit the
JSON in `../decks`, refresh, and the cards update. Don't edit `src/content` directly.

## Scripts

| Script | Does |
|---|---|
| `npm run dev` | sync + dev server |
| `npm run build` | sync + production build into `dist/` |
| `npm run preview` | serve the built `dist/` |
| `npm run typecheck` | `tsc --noEmit` |

## Status / next

First-pass prototype (11 Jun 2026). Renders all five decks. Card layouts are functional, not final —
portraits are placeholders. Verified: `npm run build` and `tsc --noEmit` both pass. **Eyeball the
on-screen sheets before a big print run** (this was authored without a browser in the loop). Widen /
prettify per `../tasks.md`.
