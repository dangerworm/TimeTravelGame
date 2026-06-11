# Tasks — Live Backlog

_Only what's still ahead. Done items are in
[`archive/completed-tasks.md`](archive/completed-tasks.md)._

> **Where we are (10 Jun eve):** the game is balance-validated and the design is consolidated into
> two foundation docs — **`intentions.md`** (the spirit + the _why_ behind every decision) and
> **`game-design-document.md`** (the game itself). One open _design_ thread remains (kingmaker); the
> rest is content, tooling, and the paper playtest.

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

## Before the paper playtest

- [ ] **Content for a full playtest — authored as JSON from the start** (task 8): destination cards
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

## The renderer (task 9 — schema now defined _with_ the content, above)

- [ ] Define the **minimal JSON content schema** (one card type to start) — done alongside authoring
      the first content, since JSON is now the master format.
- [ ] Scaffold the prototype renderer: **Vite + React + MUI**. Loads JSON, renders print-ready A4
      sheets (3×3 card grids, cut lines, page breaks, print-to-PDF). Use the layout sketch in
      `design/2026-06-09-post-whiteboarding-with-andy.png`. Start with one card type, then widen.
      _Not a blocker for the first playtest — crude-print from JSON is fine until the content
      structure settles._

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
