# Balance Simulator — Results

_Generated 2026-06-09T03:23:19.898Z_

## TL;DR

| | 4-player | 5-player | Target |
|---|---|---|---|
| Many Worlds success | 80.0% | 82.2% | ~80% |
| Avg rounds | 10.89 | 10.90 | 8–12 |
| Wall clock (est.) | 131 min | 163 min | 60–120 min |
| Overclock rate | 42.3% | 35.7% | ~30–40% |
| Cash-out rate | 69.2% | 70.1% | ~30–50% |
| Collapse rate | 20.0% | 17.8% | ≤50% |
| Avg shutdowns | 0.00 | 0.00 | 1–4 |
| Avg papers | 3.90 | 3.70 | 3–8 |
| Score spread | 19.94 | 20.40 | >3 |

## Recommended Equations

### Step Requirements

`req(eraIdx, stepIdx) = max(1, round(0.7 + 0.5×eraIdx + 0.4×stepIdx))`

| Era | depth | step0 | step1 | step2 | step3 |
|---|---|---|---|---|---|
| Recent | 1 | 1 | 1 | 2 | 2 |
| Modern | 2 | 1 | 2 | 2 | 2 |
| EarlyModern | 3 | 2 | 2 | 3 | 3 |
| Medieval | 4 | 2 | 3 | 3 | 3 |
| Ancient | 5 | 3 | 3 | 4 | 4 |
| Prehistoric | 6 | 3 | 4 | 4 | 4 |
| ManyWorlds | 7 | 4 | 4 | 5 | 5 |

### Rewards

- Find step cash: `3 + 1×eraIdx` → Recent: 3, Prehistoric: 8
- Objective rep: `2 + 1.5×eraIdx` → Recent: 2, Prehistoric: 10
- Paper rep: `4 + historian_boxes × 1` (veteran historian: 6)

### Costs

- Postdocs: 2–3 | Experts: 9
- Amplifier: [1, 1, 1, 1, 2, 4] (levels 1→2 through 6→7, total 10 cash)
- Capacitor: [3, 5, 8, 12]
- Collimator: [3, 5, 8]
- Stabiliser: [4, 7]
- Timeline Integrity: 10 (4p) / 12 (5p)

## Sample Game Traces (4-player)

### Trace 1 — ends: manyworlds, 11 rounds

Scores: 6 / 10 / 23 / 6

| Rnd | P | Policy | Era | Team | Cash | Rep | Instab | Integr | Amp | Expedition |
|-----|---|--------|-----|------|------|-----|--------|--------|-----|------------|
| 1 | 0 | greedy | Recent | 2 | 3 | 0 | 2 | 10 | 1 | 2/3 oc=2 |
| 1 | 1 | cautious | Recent | 2 | 0 | 2 | 0 | 10 | 1 | 2/2 oc=0 |
| 1 | 2 | balanced | Recent | 2 | 1 | 0 | 1 | 9 | 1 | 1/3 oc=1 |
| 1 | 3 | greedy | Recent | 2 | 0 | 0 | 2 | 9 | 1 | 2/2 oc=2 |
| 2 | 0 | greedy | Modern | 3 | 5 | 0 | 2 | 9 | 2 | 2/3 oc=0 |
| 2 | 1 | cautious | Recent | 2 | 5 | 2 | 0 | 9 | 2 | 3/3 oc=0 |
| 2 | 2 | balanced | Recent | 3 | 3 | 1 | 2 | 9 | 2 | 2/3 oc=1 |
| 2 | 3 | greedy | Modern | 3 | 0 | 0 | 2 | 9 | 2 | 1/3 oc=0 |
| 3 | 0 | greedy | EarlyModern | 4 | 5 | 0 | 1 | 9 | 3 | 1/2 oc=0 |
| 3 | 1 | cautious | Recent | 2 | 5 | 2 | 0 | 9 | 2 | 0/2 oc=0 |
| 3 | 2 | balanced | Recent | 4 | 3 | 1 | 2 | 9 | 2 | 2/3 oc=0 |
| 3 | 3 | greedy | EarlyModern | 4 | 0 | 0 | 2 | 9 | 3 | 1/3 oc=0 |
| 4 | 0 | greedy | Ancient | 4 | 1 | 0 | 1 | 9 | 5 | 0/2 oc=1 |
| 4 | 1 | cautious | Recent | 3 | 6 | 2 | 0 | 9 | 2 | 1/3 oc=0 |
| 4 | 2 | balanced | Modern | 4 | 0 | 1 | 2 | 9 | 3 | 1/3 oc=0 |
| 4 | 3 | greedy | Medieval | 4 | 1 | 0 | 2 | 9 | 4 | 1/2 oc=0 |
| 5 | 0 | greedy | Prehistoric | 4 | 0 | 0 | 2 | 9 | 6 | 0/3 oc=1 |
| 5 | 1 | cautious | Recent | 4 | 6 | 4 | 0 | 9 | 2 | 3/3 oc=0 |
| 5 | 2 | balanced | Modern | 5 | 5 | 1 | 0 | 9 | 3 | 2/3 oc=0 |
| 5 | 3 | greedy | Ancient | 4 | 0 | 0 | 2 | 9 | 5 | 0/2 oc=0 |
| 6 | 0 | greedy | Prehistoric | 4 | 0 | 0 | 2 | 9 | 6 | 0/3 oc=0 |
| 6 | 1 | cautious | Recent | 4 | 0 | 4 | 0 | 9 | 3 | 0/2 oc=0 |
| 6 | 2 | balanced | EarlyModern | 6 | 7 | 1 | 0 | 9 | 4 | 2/3 oc=2 |
| 6 | 3 | greedy | Ancient | 4 | 0 | 0 | 2 | 9 | 5 | 0/2 oc=0 |
| 7 | 0 | greedy | Prehistoric | 4 | 0 | 0 | 0 | 9 | 6 | 0/2 oc=0 |
| 7 | 1 | cautious | Recent | 4 | 2 | 4 | 0 | 9 | 6 | 2/3 oc=0 |
| 7 | 2 | balanced | Ancient | 7 | 6 | 1 | 0 | 9 | 6 | 2/2 oc=0 |
| 7 | 3 | greedy | Ancient | 4 | 0 | 0 | 2 | 9 | 5 | 0/2 oc=0 |
| 8 | 0 | greedy | Prehistoric | 4 | 0 | 0 | 0 | 9 | 6 | 0/3 oc=2 |
| 8 | 1 | cautious | Recent | 4 | 0 | 4 | 0 | 9 | 6 | 2/3 oc=0 |
| 8 | 2 | balanced | Ancient | 8 | 8 | 1 | 0 | 9 | 6 | 1/3 oc=0 |
| 8 | 3 | greedy | Ancient | 4 | 0 | 0 | 2 | 9 | 5 | 0/2 oc=0 |
| 9 | 0 | greedy | Prehistoric | 5 | 3 | 0 | 2 | 9 | 6 | 1/2 oc=2 |
| 9 | 1 | cautious | Recent | 4 | 3 | 4 | 0 | 9 | 6 | 1/3 oc=0 |
| 9 | 2 | balanced | Ancient | 8 | 3 | 1 | 0 | 9 | 6 | 0/3 oc=0 |
| 9 | 3 | greedy | Ancient | 5 | 0 | 0 | 2 | 9 | 5 | 1/2 oc=0 |
| 10 | 0 | greedy | Prehistoric | 6 | 9 | 0 | 0 | 9 | 6 | 1/2 oc=0 |
| 10 | 1 | cautious | Recent | 4 | 3 | 4 | 0 | 9 | 6 | 1/3 oc=0 |
| 10 | 2 | balanced | ManyWorlds | 9 | 4 | 1 | 0 | 9 | 7 | 1/2 oc=0 |
| 10 | 3 | greedy | Prehistoric | 6 | 2 | 0 | 2 | 9 | 6 | 1/2 oc=0 |
| 11 | 0 | greedy | Prehistoric | 7 | 15 | 0 | 0 | 7 | 6 | 1/2 oc=2 |
| 11 | 1 | cautious | Recent | 4 | 1 | 4 | 0 | 7 | 6 | 1/3 oc=0 |

### Trace 2 — ends: manyworlds, 7 rounds

Scores: 4 / 6 / 6 / 26

| Rnd | P | Policy | Era | Team | Cash | Rep | Instab | Integr | Amp | Expedition |
|-----|---|--------|-----|------|------|-----|--------|--------|-----|------------|
| 1 | 0 | greedy | Recent | 2 | 0 | 0 | 2 | 10 | 1 | 1/2 oc=2 |
| 1 | 1 | cautious | Recent | 2 | 3 | 0 | 0 | 10 | 1 | 3/3 oc=0 |
| 1 | 2 | balanced | Recent | 1 | 0 | 0 | 0 | 10 | 1 | 0/2 oc=0 |
| 1 | 3 | greedy | Recent | 2 | 3 | 0 | 0 | 10 | 1 | 2/3 oc=0 |
| 2 | 0 | greedy | Recent | 2 | 0 | 0 | 2 | 10 | 1 | 0/3 oc=0 |
| 2 | 1 | cautious | Recent | 2 | 5 | 0 | 0 | 10 | 2 | 1/3 oc=0 |
| 2 | 2 | balanced | Recent | 2 | 4 | 0 | 1 | 10 | 1 | 2/3 oc=1 |
| 2 | 3 | greedy | Modern | 3 | 5 | 1 | 2 | 10 | 2 | 2/3 oc=2 |
| 3 | 0 | greedy | Modern | 3 | 0 | 0 | 2 | 10 | 2 | 1/2 oc=0 |
| 3 | 1 | cautious | Recent | 3 | 5 | 0 | 0 | 10 | 2 | 1/3 oc=0 |
| 3 | 2 | balanced | Recent | 3 | 6 | 0 | 1 | 10 | 2 | 2/3 oc=0 |
| 3 | 3 | greedy | Modern | 4 | 4 | 1 | 1 | 10 | 2 | 1/2 oc=0 |
| 4 | 0 | greedy | Modern | 3 | 0 | 0 | 0 | 10 | 2 | 0/3 oc=0 |
| 4 | 1 | cautious | Recent | 4 | 7 | 0 | 0 | 10 | 4 | 2/3 oc=0 |
| 4 | 2 | balanced | Modern | 4 | 5 | 0 | 0 | 10 | 3 | 1/3 oc=0 |
| 4 | 3 | greedy | Modern | 5 | 1 | 5 | 1 | 10 | 2 | 2/2 oc=0 |
| 5 | 0 | greedy | EarlyModern | 4 | 1 | 0 | 0 | 9 | 3 | 1/3 oc=2 |
| 5 | 1 | cautious | Recent | 5 | 5 | 0 | 0 | 9 | 6 | 2/3 oc=0 |
| 5 | 2 | balanced | Medieval | 5 | 9 | 0 | 1 | 9 | 5 | 2/3 oc=2 |
| 5 | 3 | greedy | Medieval | 6 | 1 | 4 | 2 | 9 | 4 | 1/3 oc=1 |
| 6 | 0 | greedy | Medieval | 5 | 0 | 0 | 0 | 8 | 4 | 2/2 oc=2 |
| 6 | 1 | cautious | Recent | 5 | 3 | 0 | 0 | 8 | 6 | 1/3 oc=0 |
| 6 | 2 | balanced | Ancient | 6 | 1 | 0 | 1 | 8 | 6 | 0/2 oc=0 |
| 6 | 3 | greedy | ManyWorlds | 7 | 4 | 4 | 2 | 8 | 7 | 2/3 oc=0 |
| 7 | 0 | greedy | Medieval | 5 | 0 | 0 | 0 | 6 | 4 | 0/3 oc=2 |
| 7 | 1 | cautious | Recent | 5 | 3 | 0 | 0 | 6 | 6 | 2/2 oc=0 |
| 7 | 2 | balanced | Ancient | 7 | 5 | 0 | 0 | 6 | 6 | 1/3 oc=0 |

### Trace 3 — ends: manyworlds, 9 rounds

Scores: 10 / 6 / 4 / 24

| Rnd | P | Policy | Era | Team | Cash | Rep | Instab | Integr | Amp | Expedition |
|-----|---|--------|-----|------|------|-----|--------|--------|-----|------------|
| 1 | 0 | greedy | Recent | 2 | 3 | 0 | 0 | 10 | 1 | 2/3 oc=0 |
| 1 | 1 | cautious | Recent | 2 | 3 | 0 | 0 | 10 | 1 | 2/3 oc=0 |
| 1 | 2 | balanced | Recent | 1 | 0 | 0 | 1 | 10 | 1 | 0/2 oc=1 |
| 1 | 3 | greedy | Recent | 2 | 0 | 2 | 0 | 10 | 1 | 2/2 oc=0 |
| 2 | 0 | greedy | Recent | 3 | 3 | 0 | 2 | 9 | 1 | 2/3 oc=2 |
| 2 | 1 | cautious | Recent | 2 | 2 | 0 | 0 | 9 | 2 | 0/2 oc=0 |
| 2 | 2 | balanced | Recent | 1 | 0 | 0 | 1 | 9 | 1 | 0/3 oc=0 |
| 2 | 3 | greedy | Modern | 3 | 0 | 2 | 0 | 9 | 2 | 1/3 oc=0 |
| 3 | 0 | greedy | Recent | 4 | 7 | 0 | 1 | 9 | 1 | 2/3 oc=0 |
| 3 | 1 | cautious | Recent | 3 | 5 | 0 | 0 | 9 | 2 | 2/3 oc=0 |
| 3 | 2 | balanced | Recent | 2 | 3 | 0 | 1 | 9 | 1 | 2/3 oc=0 |
| 3 | 3 | greedy | EarlyModern | 3 | 0 | 2 | 0 | 9 | 3 | 2/2 oc=0 |
| 4 | 0 | greedy | Modern | 5 | 10 | 0 | 0 | 9 | 2 | 3/3 oc=0 |
| 4 | 1 | cautious | Recent | 4 | 4 | 0 | 0 | 9 | 4 | 1/3 oc=0 |
| 4 | 2 | balanced | Recent | 3 | 3 | 0 | 1 | 9 | 2 | 1/3 oc=0 |
| 4 | 3 | greedy | Medieval | 4 | 0 | 2 | 2 | 9 | 4 | 1/2 oc=2 |
| 5 | 0 | greedy | Medieval | 6 | 13 | 4 | 0 | 9 | 4 | 3/3 oc=0 |
| 5 | 1 | cautious | Recent | 4 | 4 | 0 | 0 | 9 | 6 | 2/3 oc=0 |
| 5 | 2 | balanced | Modern | 3 | 2 | 0 | 0 | 9 | 3 | 0/2 oc=0 |
| 5 | 3 | greedy | Ancient | 5 | 3 | 2 | 0 | 9 | 5 | 1/2 oc=0 |
| 6 | 0 | greedy | Prehistoric | 7 | 14 | 4 | 1 | 9 | 6 | 1/2 oc=2 |
| 6 | 1 | cautious | Recent | 4 | 4 | 0 | 0 | 9 | 6 | 1/3 oc=0 |
| 6 | 2 | balanced | EarlyModern | 3 | 3 | 0 | 0 | 9 | 4 | 1/3 oc=1 |
| 6 | 3 | greedy | Prehistoric | 6 | 0 | 2 | 0 | 8 | 6 | 1/3 oc=2 |
| 7 | 0 | greedy | Prehistoric | 8 | 17 | 4 | 1 | 8 | 6 | 1/3 oc=1 |
| 7 | 1 | cautious | Recent | 4 | 0 | 0 | 0 | 8 | 6 | 2/3 oc=0 |
| 7 | 2 | balanced | EarlyModern | 3 | 0 | 0 | 0 | 8 | 4 | 0/2 oc=0 |
| 7 | 3 | greedy | ManyWorlds | 7 | 3 | 2 | 0 | 8 | 7 | 1/2 oc=2 |
| 8 | 0 | greedy | Prehistoric | 9 | 24 | 4 | 1 | 8 | 6 | 1/3 oc=1 |
| 8 | 1 | cautious | Recent | 4 | 3 | 0 | 0 | 8 | 6 | 1/2 oc=0 |
| 8 | 2 | balanced | EarlyModern | 3 | 0 | 0 | 0 | 8 | 4 | 0/3 oc=0 |
| 8 | 3 | greedy | ManyWorlds | 8 | 1 | 2 | 2 | 5 | 7 | 1/3 oc=2 |
| 9 | 0 | greedy | Prehistoric | 10 | 23 | 4 | 1 | 5 | 6 | 0/3 oc=1 |
| 9 | 1 | cautious | Recent | 4 | 1 | 0 | 0 | 5 | 6 | 2/3 oc=0 |
| 9 | 2 | balanced | EarlyModern | 3 | 1 | 0 | 0 | 5 | 4 | 0/3 oc=1 |

## What This Does NOT Tell Us

- **Fun is not modelled.** A bot that maximises EV ≠ a human having a good time.
- **No alliance mechanic.** Bots attempt Many Worlds solo. Human tables will coordinate; real MW success rate is likely higher.
- **No negotiation.** The Negotiate phase (cash loans, deals) is absent.
- **Bots don't respond to social dynamics** — a trailing human will take wild risks; a bot stays policy-compliant.
- **Paper playtest is the ground truth.** These numbers are starting points, not proof of balance.
