# Simulator Assumptions

_Every modelling decision that needs Drew's eye._

## Resolution model — REFILL (corrected 10 Jun 2026)
- The hand is **topped up to [2×roster + 2] at the start of every step**; when the draw
  deck empties it is refilled by **reshuffling the discard** (played cards + live Trace cards). Overclock
  draws beyond the cap. _This replaced an earlier bug where the hand was drawn ONCE and depleted across
  all steps (matching the literal text of the post-whiteboard note but not Drew's intent)._
- "Bag = stamina / no reshuffle" is **dropped**; stamina now lives in accumulating Trace pollution +
  instability climbing toward shutdown.
- **handBase = 2 is needed:** at handBase 0 (`[2×roster]`) deep completion craters to ~21% and
  cash-out spikes to ~62% (constant folding). The +2 is what makes deep ladders climbable.

## Experiment B — era step-scaling (DECIDED 10 Jun 2026)
- Deeper eras are **longer ladders**: step bands [[2,3],[2,3],[3,4],[3,4],[5,6],[5,6]] (eras 0..5).
- **Spoils only on the second-to-last step** (every earlier step pays nothing); the last step is the objective.
- Req curve is gentle: `max(1, round(0.6 + 0.2×era + 0×step))` → shallow req-1,
  deep req-2. **Caveat:** "danger spikes" can't be much higher than req-2 — a single high-req step still
  outruns the hand, so danger should bite some *other* way (instability / consequence), not via big reqs.
- **Many Worlds is the win brake:** 6 steps × 4 pips — tuned to land MW success ~75% without
  touching the era economy.

## Starting State
- No team, 2 cash, **Amp 2** (Recent + Modern open turn one — DECIDED 9 Jun, Experiment A), Cap/Col 1, **Stabiliser 2** (gamble — DECIDED 9 Jun).
- Permanent **2/2/2 player base** in every bag. Spec §3 calls this "provisional, a tuning knob." **Flagged.**

## Era pacing — Experiment A (DECIDED 9 Jun 2026)
- Starting at Amp 1 pinned even the fastest (greedy) player in Recent for ~4 rounds before the eras opened, then rushed the middle — the "slow start, sudden end-game" smell.
- **Amp 2 fixes the opening** (open in Modern, mid-eras reached ~1 round sooner) at negligible balance cost (MW 75→71%, rounds 10→9.4, both still on target).
- **Still open:** the *late* plateau (rounds 8–12 hover at era 4–5 waiting for E+P to mature for Amp 7) is a separate end-game-gate pacing issue, not addressed by A.

## Home Actions — DECIDED (9 Jun 2026)

**Each researcher at home gets ONE action** (write paper OR upgrade module OR clear instability). Drew's call. Team size therefore drives home productivity as well as expedition strength.

## AI Policies

Three bots mixed across players:
1. **Greedy** (P0): full cap roster, deepest era, hire to fill profession gaps, Physicist upgrades Cap first. **Pushes the objective into shutdown range when ≤3 short** (the reckless gambler).
2. **Cautious** (P1): 1-person roster, never overclocks, always record, always Recent era, buys missing professions first.
3. **Balanced** (P2+): ~75% cap roster, one era back from max, buys missing professions first. **Gambles the objective only when 1 short**, otherwise stops before a shutdown.

**Key gaps:** bots don't alliance for MW (solo only), don't negotiate, don't react to scores.

## Era Card Shape
- 2–3 steps per card (uniform). Spec says "2+ steps" — upper bound chosen.
- 20% of steps are forced Grit (danger). Spec: "danger steps open Grit."
- 20% of Insight steps are Historian-locked; same for Craft→Engineer. Physicist has no per-step lock. Spec: "some steps profession-locked (knowledge)" — Physicist gating is at the module level only.
- All objectives are artefacts (record-vs-plunder choice). Spec implies this; confirmed.

## Experience & Many Worlds Gate — DECIDED (9 Jun 2026)
- A researcher's card shows **3 experience boxes, but box 1 is always pre-filled** (aesthetic). So there are **2 earnable boxes** → **+2 pip cap**, matching constraints.md. The "three boxes" of spec §6 is the display, not three *earnable* fills — no extra gate, no game-length change.
- Each earnable box = +1 to all skills; **MW requires Amp 7 = Engineer + Physicist both fully experienced (both earnable boxes filled).**
- **Instability clearing does NOT grant exp.** Spec §7: "used — on an expedition, to write a paper, or to upgrade the machine (not to clear instability)."

## Papers — DECIDED (10 Jun 2026)
- **Publishing pays the artefact's PRINTED reputation** (= the objective's rep value, 2–10 by era). **Historian experience does NOT modify it** — any historian at base writes it up; experience grows their pips, not the paper's worth.
- This matches Record (which always paid the card's rep) and removes the sim's old flat "paperRepBase + boxes" invention. Deep finds are now worth their true significance; "Papers dominate held artefacts (1 each)" still holds.

## Many Worlds
- 6 steps × 4 pips each. **Primary game-length tuning knob.**
- Failed MW: −2 integrity. Spec says "4–5" — **reduced to 2 after 4 caused cascade collapse in every game.** Confirm with Drew.
- **MW roster: all researchers sent** (not just cap-limit). Thematically: everyone for the final push. Massively improves success rate — without this, MW was ~5%.
- Bots attempt MW solo. Real tables will alliance. MW success rate is probably 10–20% higher in practice.

## Stabiliser & Shutdowns — DECIDED: startStab=2 (9 Jun 2026)
- **startStab=2 (locked):** overclock is a real gamble. A carried-over instability plus an objective push can trip a shutdown (instability ≥ stab → integrity −1, consequence draw, expedition aborts).
- **The gamble is tuned to concentrate in the pusher** (Drew's intent — one reckless player bricks often, the careful ones rarely):
  - **Greedy** pushes the *objective* into shutdown range when ≤3 short → **~2.3 shutdowns/game.**
  - **Balanced** gambles the objective only when 1 short → **~1.4 shutdowns/game.**
  - **Cautious** never overclocks → **0 shutdowns** (pure by character).
- Pushing greedy higher (also gambling the rich find step) was tried and **reverted** — it bricks before reaching the objective, dropping MW to ~62% and spiking collapse to ~38%. 2.3/1.4/0 is the sweet spot.
- The old "zero shutdowns" was a bot blind spot (no bot ever pushed into one), never evidence the gamble was safe.

## Cash-out — it's a cautious-bot artifact
- The headline cash-out rate (~42%) is dragged up by the **cautious bot folding ~60%** of expeditions (it never overclocks, so it folds the instant it draws short). The pushers fold far less: **greedy ~35%, balanced ~44%.**
- A human "cautious" player clears easy steps a timid bot folds, so **real-table cash-out will sit below the simulated figure.** Don't over-tune to this number.

## Game Length & the overclock frequency (watch items)
- **Experiment B runs longer: ~13 rounds, ~157 min (4p) at 3 min/player-turn**, and deep expeditions
  (5–6 steps) take longer per turn too. This is the cost of the gentle-ladder escalation — a long, epic
  game, over the original 60–120 target. Drew accepted this trade for the richer deep-era experience.
- **Overclock frequency dropped to ~21%** (vs ~35% pre-B): with a full hand refilled each step you're short
  less often, so the gamble fires less. Cash-out (~37%) keeps push-your-luck present, but if the overclock
  thrill feels thin in play, nudge the req curve up a touch to force more short-by-one moments.
- **Length levers if needed:** shrink the deep bands (4–5 not 5–6), drop an era tier, or ease the Amp-7 gate.

## Turn-1 Seeding
- Each player buys first researcher if affordable (2 cash start = sometimes possible), then plans a card. Spec: "Turn-1 seeded gentle Recent starter (optional)" — modelled as standard plan draw from Recent (Amp 1 restricts to Recent anyway).

## Retirement / Parting Gift
- Not modelled. Bots don't deliberately retire maxed researchers. Parting Gift rep not awarded. **Understates the long-game team-legacy arc.** Low priority for first-contact print.

## Priority Review List
_Home-action model, exp-box count, and startStab are now DECIDED (see sections above)._
1. **5-player wall clock** (~149 min @ 3 min/turn) — the one metric still over target. Lower mwSteps or raise home income if it bites in play.
2. **Shutdowns at ~4/game** — top of the 1–4 band. Tighten the greedy objective-push to "≤1 short" for ~2–3 if too punishing.
3. **Paper rep base** — raise to 4? (Fresh historian currently 4.)
4. **MW difficulty** (4 pips × 6 steps) — adjust if game length is off.
5. **Amplifier total cost** (18 cash 1→7) — feasible in ~10 rounds?
