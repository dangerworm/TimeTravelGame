# Tasks — Live Backlog

_Only what's still ahead. Done items are in
[`archive/completed-tasks.md`](archive/completed-tasks.md)._

> **Where we are (10 Jun eve):** the game is balance-validated and the design is consolidated into
> two foundation docs — **`intentions.md`** (the spirit + the _why_ behind every decision) and
> **`game-design-document.md`** (the game itself). One open _design_ thread remains (kingmaker); the
> rest is content, tooling, and the paper playtest.

---

## ⚠️ The one open design thread

- **Who triggers Many Worlds / kingmaker.** The endgame is built around a full-table alliance for
  the MW gauntlet, but the alliance-ending _mechanics_ are unspecified: who makes the **winning**
  jump, and how is the payoff shared, so it's neither a foregone conclusion nor a kingmaker handing
  one player the game? Rental-Cash-only + individual retirement + visible disrepute soften the
  _runaway-leader_ worry, but not this. **Design before playtest** (see the endgame section of the
  GDD; was `design-skeleton.md` §10 #5).

## Before the paper playtest

- [ ] **Content for a full playtest** (the handoff's task 8) — destination cards across the era
      ladder, the researcher decks, retirement / parting-gift cards, consequence cards. Tonal +
      structural benchmarks live in `decks/`; calibrate numbers against `sim/RESULTS.md`.
- [ ] **Polish the endgame flavour** — tighten the quiet-legacy speech; write the per-player vs
      collective epilogue variants. Content, not design.
- [ ] **Honey-Trap retirement card** — decide whether its −3 reputation should be **disrepute** (the
      deception is an ethics-linked act). (`decks/retirement/seed-cards.md`)

## The renderer (the handoff's task 9 — once content exists)

- [ ] Define the minimal JSON content schema (one card type to start).
- [ ] Scaffold the prototype renderer: **Vite + React + MUI**. Loads JSON, renders print-ready A4
      sheets (3×3 card grids, cut lines, page breaks, print-to-PDF). Use the layout sketch in
      `design/2026-06-09-post-whiteboarding-with-andy.png`. Start with one card type, then widen.

## Playtest-watch (can't be closed at a desk — judge them at the table)

- **Game length** — ~16–17 rounds / ~3h. The career-epic earns it narratively; revisit if the table
  drags (shrink deep step-bands / ease the Amp-7 gate).
- **Overclock feel** — the sim sits ~19% (a bot-conservatism floor; `--pushprobe` shows a reckless
  player pushes 60%+). Judge whether the gamble _feels_ thrilling in play.
- **Alliances** — the sim's biggest blind spot (bots attempt MW solo), so real MW success is likely
  higher than the sim shows. Tied to the kingmaker thread above.

## External / blocked

- **Title — "Warped" (working), pending IP/legal check.** Conflicts to clear: an existing publisher
  **"Warped Reality Games"** and an indie **"Warped Board Games."** Hold the project-wide rename
  (repo + `CLAUDE.md` still say "Time Travel") until IP clears.

## Later / parked darlings (add back only what a playtest proves necessary)

- [ ] Re-evaluate parked darlings: **conspicuousness** (bigger party = harder to hide),
      **intervention "threads"** (open/close a change across steps), **multi-turn expeditions** for
      deep late jumps, **Precision / the Collimator as "discretion"** (cleaner drops = less
      footprint), age-track, instability variety, combo-gated specials.
- [ ] Mine `archive/game-design.md` for reusable content (mystery tiers, real-history finds,
      fiction).
