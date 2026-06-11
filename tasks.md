# Tasks — Live Backlog

_Only what's still ahead. Done items are in
[`archive/completed-tasks.md`](archive/completed-tasks.md)._

> **Where we are (11 Jun, overnight):** balance-validated, design consolidated, and now **a first full
> playtest set exists**. Authored content as JSON in `decks/` (32 destinations across all 7 eras, 18
> researchers, 9 experts, 8 parting gifts, 18 consequence designs → 24-card deck) + a working **Vite +
> React + MUI renderer** in `renderer/` that prints A4 sheets incl. **double-sided era cards** (build +
> typecheck pass). Kingmaker thread → a proposal written for review (`kingmaker-rule-suggestion.md`).
> **Remaining:** expand the destination deck toward ~12/era so a 4-player game can't run dry (the
> overnight loop is doing this); review the kingmaker proposal; eyeball the rendered cards; play it.

> **Earlier (10 Jun eve):** the design was consolidated into two foundation docs — **`intentions.md`**
> (spirit + _why_) and **`game-design-document.md`** (the game). One open _design_ thread (kingmaker).

---

## A last-minute change

Under _Rewards & the prize (Process)_, the game design document states: "**Record it** (copy,
photograph, measure) → **Reputation** added immediately, history intact, **clean**. Pure-knowledge
prizes (a cipher, a calculation) are **Record-only**."

This breaks the narrative as any reputation gain would come from a paper, and so reputation cannot
be added immediately.

My first impression is that players should still keep the era card representing the artefact, but I
suspect we'll need another section on the player board, thus visually tracking which are actual
artefacts brought back and which are pure data. These will then be turned into papers as per the
existing 'historian stays at base' rule.

## ⚠️ The one open design thread

- **Who triggers Many Worlds / kingmaker.** The endgame is built around a full-table alliance for
  the MW gauntlet, but the alliance-ending _mechanics_ are unspecified: who makes the **winning**
  jump, and how is the payoff shared, so it's neither a foregone conclusion nor a kingmaker handing
  one player the game? Rental-Cash-only + individual retirement + visible disrepute soften the
  _runaway-leader_ worry, but not this. **Design before playtest** (see the endgame section of the
  GDD; was `design-skeleton.md` §10 #5).
  - **→ A proposal is now written for review: `kingmaker-rule-suggestion.md`** (11 Jun, overnight).
    Core idea: an _open_ MW jump where Cash is negotiated but **Reputation is an automatic co-author
    credit by contribution, the host gets no bonus** — converting the ending from "who gets handed the
    lump" into "who dares commit hardest to the last jump." **Read it and react.**

## Before the paper playtest

- [x] **Content for a full playtest — authored as JSON** (task 8): **DONE (first pass, 11 Jun
      overnight)** — `decks/destinations|researchers|experts|retirement|consequences/cards.json`, schema
      in `decks/SCHEMA.md`, assembly guide in `decks/PLAYTEST.md`. Numbers calibrated to
      `sim/best-config.json`. _Still ahead: grow the destination deck toward ~12/era (don't-run-dry)._
- [~] (original brief, kept for reference) **Content for a full playtest — authored as JSON from the start** (task 8): destination cards
      across the era ladder, the researcher decks, retirement / parting-gift cards, consequence
      cards. **JSON is the single source of truth** (Drew's a dev; it feeds the renderer + scripts,
      no later transcription). _Guardrails:_ (1) keep the schema **minimal and expect it to churn**
      — first content is ~90% throwaway; (2) **don't let the renderer become a prerequisite to
      playing** — hand-copy / crude-print from JSON for the first table; (3) the first playtest's
      job is proving the **full v4 loop is _fun_** (the sim proved balance, not fun), so author
      **minimal-viable** content, not a polished set. The paper-first guard is _satisfied_ (core
      validated + iterating on content/numbers = exactly when `intentions.md` says to build the JSON
      pipeline). Tonal + structural benchmarks live in `decks/`; calibrate numbers against
      `sim/RESULTS.md`.
- [ ] **Polish the endgame flavour** — tighten the quiet-legacy speech; write the per-player vs
      collective epilogue variants. Content, not design.

## The renderer (task 9)

- [x] Define the **minimal JSON content schema** — `decks/SCHEMA.md` (all five card types). (11 Jun)
- [x] Scaffold the prototype renderer: **Vite + React + MUI** in `renderer/`. Loads JSON, renders
      print-ready A4 sheets (3×3 grids, cut-line borders, page breaks, print-to-PDF) for all five
      decks, with **double-sided / duplex-mirrored era cards**. `npm run build` + `tsc --noEmit` pass.
      (11 Jun)
- [ ] **Eyeball the rendered cards in a browser** — authored without a browser in the loop, so check
      the on-screen sheets fit/wrap correctly before a big print run, and prettify (portraits are
      placeholders; layout is functional not final).

## Playtest-watch (can't be closed at a desk — judge them at the table)

- **Game length** — ~16–17 rounds / ~3h. The career-epic earns it narratively; revisit if the table
  drags (shrink deep step-bands / ease the Amp-7 gate).
- **Overclock feel** — the sim sits ~19% (a bot-conservatism floor; `--pushprobe` shows a reckless
  player pushes 60%+). Judge whether the gamble _feels_ thrilling in play.
- **Alliances** — the sim's biggest blind spot (bots attempt MW solo), so real MW success is likely
  higher than the sim shows. Tied to the kingmaker thread above.

## Title — "Warped" (cleared for hobby use, 11 Jun)

- **UK register checked (trademarks.ipo.gov.uk): no live "Warped" in Class 28** (board games) —
  clear to proceed for a hobby / small-run project. _Residual, eyes-open:_ (1) the unregistered
  **"Warped Board Games" / "Warped Reality Games"** traders are a softer _passing-off_ risk the
  register can't surface (worth a glance at how established they are); (2) if it goes commercial,
  **register Class 28 yourself** and run separate **Class 9** (digital) / **Class 41** (events)
  searches — and a short paid clearance check before real print-run money.
- **The project-wide rename (Time Travel → Warped) is now UNBLOCKED** — repo name, `CLAUDE.md`,
  etc., whenever you want it. _(Not done yet — your call on timing.)_

## Later / parked darlings (add back only what a playtest proves necessary)

- [ ] Re-evaluate parked darlings: **conspicuousness** (bigger party = harder to hide),
      **intervention "threads"** (open/close a change across steps), **multi-turn expeditions** for
      deep late jumps, **Precision / the Collimator as "discretion"** (cleaner drops = less
      footprint), age-track, instability variety, combo-gated specials.
- [ ] Mine `archive/game-design.md` for reusable content (mystery tiers, real-history finds,
      fiction).
