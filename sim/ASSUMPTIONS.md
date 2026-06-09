# Simulator Assumptions

_Every modelling decision that needs Drew's eye._

## Starting State (Spec §9)
- No team, 2 cash, Amp/Cap/Col 1, Stabiliser max 2. **Spec-stated.**
- Permanent **2/2/2 player base** in every bag. Spec §3 calls this "provisional, a tuning knob." **Flagged.**

## Home Actions — Most Impactful Assumption

**Modelled as: each researcher at home gets ONE action** (write paper OR upgrade module OR clear instability).
Spec §8 says "each turn a researcher is in the field or at home (one of: write paper · upgrade module · clear instability)," which implies one action per researcher, not one per turn.
Spec §2 says "Develop (any turn) — one of: write a paper, or upgrade one machine module," suggesting one total.

**These interpretations produce very different games:**
- One-per-researcher: hiring 3 people means 2 home actions/turn — fast progression.
- One-per-turn: team size helps only expeditions, not home productivity.
**This needs a call from Drew before first print.**

## AI Policies

Three bots mixed across players:
1. **Greedy** (P0): full cap roster (all on MW), OC unless inst+1≥stab, deepest era, hire to fill profession gaps, Physicist upgrades Cap first.
2. **Cautious** (P1): 1-person roster (all on MW), never OC, always record, always Recent era, buys missing professions first.
3. **Balanced** (P2+): ~75% cap roster (all on MW), OC if 1-short on any step with stab headroom, one era back from max, buys missing professions first.

**Key gaps:** bots don't alliance for MW (solo only), don't negotiate, don't react to scores.

## Era Card Shape
- 2–3 steps per card (uniform). Spec says "2+ steps" — upper bound chosen.
- 20% of steps are forced Grit (danger). Spec: "danger steps open Grit."
- 20% of Insight steps are Historian-locked; same for Craft→Engineer. Physicist has no per-step lock. Spec: "some steps profession-locked (knowledge)" — Physicist gating is at the module level only.
- All objectives are artefacts (record-vs-plunder choice). Spec implies this; confirmed.

## Experience & Many Worlds Gate (Spec §6, §7)
- **Max 2 exp boxes** (from §7: "max +2 each," each box = +1 all skills).
- **MW requires Amp 7 = Engineer + Physicist both at max exp (2 boxes).** Spec §6 says "three full blue experience boxes" for the MW upgrade. If boxes = 3, the gate is significantly harder. **Likely a design-doc artifact — flag for Drew.**
- **Instability clearing does NOT grant exp.** Spec §7: "used — on an expedition, to write a paper, or to upgrade the machine (not to clear instability)."

## Papers
- Paper rep = 4 + historian_boxes × 1. Fresh historian: 4. Veteran: 6.
- Spec says "Papers (4+ rep) dominate artefacts (1)." Fresh historian at 4 doesn't quite hit 4. **Consider raising paperRepBase to 4.**

## Many Worlds
- 3 steps × 3 pips each. **Primary game-length tuning knob.**
- Failed MW: −2 integrity. Spec says "4–5" — **reduced to 2 after 4 caused cascade collapse in every game.** Confirm with Drew.
- **MW roster: all researchers sent** (not just cap-limit). Thematically: everyone for the final push. Massively improves success rate — without this, MW was ~5%.
- Bots attempt MW solo. Real tables will alliance. MW success rate is probably 10–20% higher in practice.

## Stabiliser & Shutdowns
- Greedy stops overclocking when inst+1 ≥ stab (shutdown threshold). With startStab=3, this means max 2 OCs per expedition.
- **Zero shutdowns observed in simulation.** Engineers clear instability between turns; greedy correctly avoids the third OC. The Stabiliser is a constraint, not a punishment trigger.
- **startStab=2 would fundamentally change this** — a single OC risks shutdown. If Drew wants shutdown to be a real risk, lower stab. Current data: stab=3 → OC is safe, frequent, and strategic.

## Game Length
- Best config: ~135 min at 3 min/player-turn (over 60–120 target). At 2.5 min/player-turn: ~113 min (in range).
- **The amp gating (E+P both maxed for amp 7) is the bottleneck.** Cannot be easily shortcut without changing the exp curve or amp cost structure.
- **Primary lever if games run long:** lower mwSteps to 2 (ends the game a round or two earlier) or raise home income.

## Turn-1 Seeding
- Each player buys first researcher if affordable (2 cash start = sometimes possible), then plans a card. Spec: "Turn-1 seeded gentle Recent starter (optional)" — modelled as standard plan draw from Recent (Amp 1 restricts to Recent anyway).

## Retirement / Parting Gift
- Not modelled. Bots don't deliberately retire maxed researchers. Parting Gift rep not awarded. **Understates the long-game team-legacy arc.** Low priority for first-contact print.

## Priority Review List
1. **One action per home researcher, or one total?** High impact.
2. **"Three exp boxes" for MW gate** — 2 or 3?
3. **Paper rep base** — raise to 4?
4. **MW difficulty** (3 pips × 3 steps) — adjust if game length is off.
5. **Amplifier total cost** (10 cash 1→7) — feasible in ~10 rounds?
