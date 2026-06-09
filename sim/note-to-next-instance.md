# Note to Next Instance

Sim is complete on branch `sim-balance`. All deliverables committed.

## What was built

`sim/sim.js` — Node.js balance simulator. Run modes:
- `node sim/sim.js` — full 500-game sweep across 81 configs, writes RESULTS/ASSUMPTIONS/PROGRESS.md
- `node sim/sim.js --quick` — 200-game fast sweep (use for quick iteration)
- `node sim/sim.js --trace1` — single 4-player diagnostic game with turn-by-turn trace

## Bugs fixed during session (all in sim.js)

1. **mwReqPerStep=6 was impossible** (max team hand=8, need 6 of one skill): lowered to 3
2. **Physicist never upgraded Capacitor** (upgradeModule tried Amp first for ALL professions): fixed priority: Physicist→Cap→Stab→Amp, Engineer→Amp→Col, Historian→Amp
3. **Cautious/balanced bots never bought Engineers or Physicists** (both used avail[0] = always Historian): fixed to prioritize missing professions
4. **MW sent only cap-limited roster** (cap=1 → hand=4 → req=3 impossible): MW now sends all researchers
5. **mwIntegDmgFail=4 caused cascade collapse** (every failed MW wiped 4 integrity): lowered to 2
6. **stepsMax=4 created impossible cards** (need 6 pip cards, hand=4): had been fixed to 3 in prior session

## Deliverables

- `sim/RESULTS.md` — final metrics, recommended equations, 3 sample traces
- `sim/ASSUMPTIONS.md` — all modelling decisions flagged for Drew
- `sim/PROGRESS.md` — best params and next steps

## Key findings

Best config: reqBase=0.7, reqEraSlope=0.5, integrity4p=10, ampCostMult=0.45

| Metric | Value | Target |
|--------|-------|--------|
| MW success (4p) | 80.0% | ~80% ✓ |
| Avg rounds | 10.9 | 8-12 ✓ |
| Collapse rate | 20.0% | ≤50% ✓ |
| Wall clock | 131 min | 60-120 ⚠️ |
| Shutdowns | 0.00 | 1-4 ⚠️ |

## Flagged for Drew

1. **Home action model** — modelled as one per researcher (not one per turn). High impact on tempo.
2. **startStab=2 vs 3** — stab=3 means zero shutdowns in simulation; stab=2 would make overclock feel risky
3. **MW sends full team** — spec doesn't explicitly say this; we assumed it for the math to work
4. **Wall clock** — 131 min at 3 min/player-turn; ~109 min at 2.5 min (Arnak-weight is achievable)
5. **mwIntegDmgFail lowered to 2** — spec says 4-5, but that caused universal cascade collapse

## If continuing

- Merge `sim-balance` into `development` when Drew reviews
- Paper playtest is the next step — sim gives starting numbers, not proof of balance
