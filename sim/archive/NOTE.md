# Archived — v1 abstract balance sim (retired 11 Jun 2026)

`sim-abstract-v1.js` is the original single-file Monte-Carlo sim (plus its generated docs). It played
**procedural** era cards (a req *formula*, not the real deck) with policy bots, to get a first feel for
how the numbers should work across 2–6 players. It did its job — it produced `best-config.json` (the
validated economy constants, still live in `sim/`) and the 10 Jun design decisions (see
`ASSUMPTIONS-abstract-v1.md`).

It's frozen here for reference. The **live** sim plays the real `decks/` cards — see `sim/` and its
README. Don't extend this file; mine it.
