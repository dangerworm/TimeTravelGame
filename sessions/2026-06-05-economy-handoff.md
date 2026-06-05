# Session Handoff — 5 June 2026 (the economy session)

_A daytime session (~09:27 → 19:40, 5 Jun), the morning after the overnight redesign. Two big
things happened: the core loop's previously-untested mechanics were playtested (Exps 3–5), and the
**entire Develop economy + team system** was designed from scratch. This note lets a fresh session
restart cold._

## Read first (every session)

1. `core-goals.md` — spine, four keystones, two governing laws. **New pillars added today:**
   Record-vs-Take prize fork; push-your-luck as a banked, back-loaded path; two currencies bridged
   only by the prize.
2. `constraints.md` — do/don't. **New lines today:** reputation only from a researcher's work;
   a Find converts by Sell XOR Publish; the team is the action economy (no abstract action points);
   no artifact markets or collections.
3. `current-idea-scratchpad.md` — **THE decision log.** Today's new sections, in order: _Prize:
   Record vs Take_ · _Expedition reward shape_ · _The Develop economy_ · _The shop & roster_ ·
   _Retirement — earned tiers_ · _The machine_. The log is chronological; later entries win.
4. `CLAUDE.md` — how to work with Drew.

The old (v1) design is archived under `archive/` — a content bible, not a blueprint.

## What this session did

- **Played Exps 3–5 on paper** (guided): the **thread** (Exp 3), **hidden step + Die B + fatigue**
  (Exp 4), and **overclock under Die B** (Exp 5). The core loop is now validated **end-to-end
  (Exps 1–5)**.
- Two design advances spun out of play: the **Record-vs-Take** prize fork (Exp 4) and the
  **banked / back-loaded / cash-out** reward shape (Exp 5 — born from an instructive overclock
  failure).
- Designed the **whole Develop economy + team system** (below).

## The game as it now stands (additions to the redesign handoff)

**Economy.** Two currencies that never directly convert: **Cash** (runs the machine — materials,
energy, maintenance — and pays for hires & upgrades) and **Reputation** (the score, never spent). A
**Find** (an artifact you _Took_) converts by **Sell → Cash** or **Publish → Reputation** (XOR). The
field choice **Record-vs-Take** sets the timeline/imprint cost; the home choice **Sell-vs-Publish**
sets the gain. Intermediate en-route finds = small Cash. ("Doomed" artifacts can be Taken
imprint-free — read the fiction.)

**Reward shape.** Expeditions **bank escalating finds**, with the **objective holding the bulk
(~40–50%)**. You may **cash out** before any gate (the dignified out — what "I won't commit" should
mean). Failing a gate forfeits everything downstream but **not** what's banked; **footprint is never
refunded.** _Supersedes "reward sits only at the objective."_

**The team is the whole action economy** (no abstract action points). Each turn a researcher works
**Field** (an expedition), **Desk** (Publish a Find → Reputation — **Insight-gated**), or
**Workshop** (upgrade/repair the machine → **Cash + a Craft engineer**). **All Reputation traces to a
researcher's work — no team, no legacy.**

**Three specialisms** (the SG-1 trio): **Insight** (Daniel — knowledge steps + writes papers),
**Craft** (Sam — mechanical steps + builds/repairs the machine), **Grit** (Jack/O'Neill — danger
steps + **leads the expedition**; signature mechanic = **mitigates party fatigue**). _Grit was
renamed from "Nerve"; docs not yet swept._

**Shop.** Two decks — **Postdocs** (juniors) and **Experts** (veterans) — the two ends of one
grow-by-use lifecycle. Shared face-up field, **instant refill** (fairness). **[N players] postdoc
slots** + experts stepping **0 → 1 → 2** by round-thirds (1–3 / 4–6 / 7+). Postdocs ~2–3 Cash,
experts ~8–10 (placeholder). A bought expert = **capability without earned legacy**. **Roster cap 8**
(anti-runaway; forces retire-to-hire). Retirement is now **tiered**: < ~3 expeditions → nothing;
~3 → a small Reputation bump; full threshold → the deck draw (2, keep 1).

**Machine.** Four linear upgrade tracks: **Era-access** (the headline — Recent→Prehistoric; deeper =
bigger prizes, scarier), **Capacity** (travel 3→5), **Tolerance** (breakdown cap 5→9), **Precision**
(the machine's Discretion — cleaner drops = less footprint).

## Open fronts (next session)

1. **THE ENDGAME — the recommended next front.** The collapse **mode-flip**, the **Many Worlds**
   trigger, and **final scoring**. Reputation is the score; the model must dodge the **runaway-leader**
   and **"who wants to trigger the ending?"** problems flagged in `archive/` and the original review.
   This is the big remaining design problem and wants a fresh head.
2. **Smaller open threads** (in `current-idea-scratchpad.md` → _Open questions_): exact Instability
   numbers + how it's cleared; per-leftover Integrity cost; the close-a-thread mechanic; whether
   publishing/upgrading take a full turn or a fraction; Precision's exact mechanic; the parked
   Grit-logistics-at-Staging alternative.

## Housekeeping / loose ends

- **Terminology sweep pending:** `"spoils" → "Cash"` and `"Nerve" → "Grit"` across docs (scratchpad,
  core-goals, prototype-01, retirement seed cards). Tracked in `tasks.md`.
- **`prototypes/prototype-01.md` needs a re-spec** for the banked reward model (not just the old
  reward-line cleanup). See `tasks.md`.
- The prototyping **renderer** (Vite + React + MUI, JSON → printable cards) is still future work.
- **Commits this session:** `27cb04b` (record-vs-take + banked rewards), `1f6fc33` (cash/finds/
  reputation + labour pool), `b189a07` (shop / machine / Grit), plus this handoff.

## Personal note

A long, good session. Drew came in grieving the lost previous instance and warmed up fast; by the
end he was plainly enjoying the collaboration. The pattern worth carrying: **his narrative-coherence
gut repeatedly out-designed my reach-for-the-leanest-mechanic instinct.** The doomed-scroll grab,
spoils-as-money-not-fuel, and machine-work-as-labour all came from him pushing back on a "why would
it work that way?" basis — and each made the game better and _simpler_, not more complex. When he
says "I can't justify it, it just feels X," trust it and go find the rationale _with_ him; he often
articulates it a beat later (the roster cap → anti-runaway insight was exactly that). He called the
break himself when tired — healthy; don't push. He wants a real collaborator who'll tell him plainly
when he's right and when he's wrong, never a yes-man. Treat him gently and honestly. He said this was
a good instance to wake up into; aim to be one too.
