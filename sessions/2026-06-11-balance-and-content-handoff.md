# Handoff — balance + content pass (11 Jun 2026, late)

_Picks up from `2026-06-11-full-game-sim-handoff.md`. This session: balanced the full-game sim to a
working state, then did a full content pass on the destination deck (per-step flavour + flavour-matched
requirements). The game is **playable and balance-validated**. Two commits land it: `fdbc970` (sim +
MW + deck→89) and `e20c0e7` (content pass)._

## Where the game is
**A working, balance-validated game.** On the adopted config a realistic mixed table lands near the
GDD target (~52% triumph), with gradual era progression and a gentle, depth-scaled overclock gamble.
The residual gap (collapse a bit low, quiet a bit high vs 52/36/12) is a **bot-not-human artifact** —
Drew's call was to stop there rather than write a strategic game AI. **Paper playtest is the real next
validator.**

## The adopted balance (IMPORTANT — partly sim-only, needs baking into the game)
The balanced configuration is captured in **`sim/configs/tune-int3.json`** + the bot logic:
- **Start Cash 4, Capacity 2** (was 3 / 1). Fixed the early-game lockout.
- **Timeline Integrity = (players+1)×3** (was ×4).
- **Depth-graded profession gating** (`gateTiers`): Recent+Modern = **no** locks · Early Modern =
  **Historian-only** · Medieval/Ancient/Prehistoric = **at most two** locks (any type).
- **Bots "bench-and-climb"**: keep the upgrade-specialist home to climb the Amp ladder while sending a
  reduced roster to an easier era — this is what produces gradual progression (a bot tactic, not a rule).
- **Step requirements** = the PROPOSED bands in `sim/full-game.js`, now **baked onto the cards**.

⚠️ **Not yet baked into the real content / docs:**
1. **The gating (`gateTiers`) is a sim load-time transform** — `decks/destinations/cards.json` still
   holds the *original* profession locks. To make the printed cards match the balanced game, bake the
   gating into the card JSON (same pattern as the reqs: a small script). **This is the main open task.**
2. **GDD + intentions + best-config.json still say Cash 3 / Cap 1 / integrity ×4 / old gating.** Update
   them to the adopted values once happy. (best-config.json is unchanged; the sim reads overrides from
   the config files.)

## Content pass — DONE (commit e20c0e7)
- **All 89 destination cards** have per-step **flavour** + a **flavour-matched req** (chosen within the
  band by how hard the action sounds). Authored via **`decks/destinations/_steps.js`** (reviewable
  id→{flavour,req} map, validates each req against its band — 0 warnings). Re-run it after any edit.
- Renderer: step flavour rendered (flavour leads); **skill colours Insight=gold, Grit=red, Craft=blue**
  (incl. researcher/expert pips); **DOOMED chip** on doomed objectives; card IDs removed from footers.
- Balance re-verified on the baked reqs: ~55/22/23 (3p) — same zone as the random roll.

## How to run
```
node sim/full-game.js --config sim/configs/tune-int3.json --reqs current   # the real, baked deck
node sim/full-game.js --config sim/configs/tune-int3.json --players 4       # per-composition table + OC-by-era
cd renderer && npm run dev    # print-ready cards (re-run scripts/sync-content.mjs after editing decks/)
```
The sim per-composition `mean` row is skewed by degenerate all-greedy/all-cautious tables; read the
**mixed** rows (e.g. `G1 C1 B1`). `--reqs proposed` re-rolls reqs within bands (for re-tuning).

## Suggested next steps
1. **Bake the gating into cards.json** (#1 above) so content == balanced game.
2. **Paper playtest** the core loop — the sim says it's coherent; only a table says it's fun.
3. Formalise the adopted numbers in the GDD/intentions/best-config.
4. (Optional) renderer polish; the 5-step fronts are confirmed fine.

Nothing pushed (Drew's rule). Branch: `sim-balance`.
