# Balance Simulator — Results

_Generated 2026-06-09T22:02:58.047Z_

## TL;DR

| | 4-player | 5-player | Target |
|---|---|---|---|
| Many Worlds success | 72.2% | 78.4% | ~75% |
| Avg rounds | 9.40 | 9.58 | 8–12 |
| Wall clock (est.) | 113 min | 144 min | 60–120 min |
| Overclock rate | 38.6% | 31.5% | ~30–40% |
| Cash-out rate | 45.6% | 48.9% | ~30–50% |
| Collapse rate | 27.8% | 21.6% | ≤50% |
| Avg shutdowns (table total) | 6.35 | 6.62 | pusher-heavy → see ↓ |
| Avg papers | 4.41 | 4.37 | 3–8 |
| Score spread | 19.55 | 20.76 | >3 |

### Shutdowns by archetype (4-player, per player per game)

_The gamble should concentrate in the pusher, not spread evenly._

| Archetype | Shutdowns/game | Overclocks/game | OC rate | Cash-out rate |
|---|---|---|---|---|
| greedy | 2.54 | 5.63 | 62.7% | 40.3% |
| balanced | 1.26 | 2.50 | 28.5% | 47.5% |
| cautious | 0.00 | 0.00 | 0.0% | 58.8% |

## Recommended Equations

### Step Requirements

`req(eraIdx, stepIdx) = max(1, round(0.6 + 0.4×eraIdx + 0.4×stepIdx))`

| Era | depth | step0 | step1 | step2 | step3 |
|---|---|---|---|---|---|
| Recent | 1 | 1 | 1 | 1 | 2 |
| Modern | 2 | 1 | 1 | 2 | 2 |
| EarlyModern | 3 | 1 | 2 | 2 | 3 |
| Medieval | 4 | 2 | 2 | 3 | 3 |
| Ancient | 5 | 2 | 3 | 3 | 3 |
| Prehistoric | 6 | 3 | 3 | 3 | 4 |
| ManyWorlds | 7 | 3 | 3 | 4 | 4 |

### Rewards

- Find step cash: `3 + 1×eraIdx` → Recent: 3, Prehistoric: 8
- Objective rep: `2 + 1.5×eraIdx` → Recent: 2, Prehistoric: 10
- Paper rep: `4 + historian_boxes × 1` (veteran historian: 6)

### Costs

- Postdocs: 2–3 | Experts: 9
- Amplifier: [1, 1, 1, 1, 2, 3] (levels 1→2 through 6→7, total 9 cash)
- Capacitor: [3, 5, 8, 12]
- Collimator: [3, 5, 8]
- Stabiliser: [4, 7]
- Timeline Integrity: 14 (4p) / 17 (5p)

## Sample Game Traces (4-player)

### Trace 1 — ends: manyworlds, 7 rounds

Scores: 6 / 8 / 7 / 31

| Rnd | P | Policy | Era | Team | Cash | Rep | Instab | Integr | Amp | Expedition |
|-----|---|--------|-----|------|------|-----|--------|--------|-----|------------|
| 1 | 0 | greedy | Modern | 2 | 1 | 0 | 0 | 14 | 2 | 2/2 oc=0 |
| 1 | 1 | cautious | Recent | 2 | 3 | 0 | 0 | 14 | 2 | 3/3 oc=0 |
| 1 | 2 | balanced | Recent | 2 | 1 | 0 | 0 | 14 | 2 | 2/2 oc=0 |
| 1 | 3 | greedy | Modern | 2 | 5 | 4 | 2 | 13 | 2 | 3/3 oc=2 |
| 2 | 0 | greedy | Modern | 3 | 2 | 0 | 1 | 12 | 2 | 1/3 oc=1 |
| 2 | 1 | cautious | Recent | 3 | 6 | 0 | 0 | 12 | 2 | 2/3 oc=0 |
| 2 | 2 | balanced | Recent | 3 | 2 | 4 | 0 | 12 | 2 | 2/2 oc=0 |
| 2 | 3 | greedy | EarlyModern | 3 | 6 | 4 | 2 | 12 | 3 | 1/3 oc=0 |
| 3 | 0 | greedy | EarlyModern | 3 | 1 | 0 | 0 | 12 | 3 | 0/2 oc=0 |
| 3 | 1 | cautious | Recent | 4 | 6 | 0 | 0 | 12 | 2 | 3/3 oc=0 |
| 3 | 2 | balanced | Recent | 3 | 2 | 4 | 0 | 12 | 2 | 1/3 oc=0 |
| 3 | 3 | greedy | EarlyModern | 4 | 6 | 8 | 2 | 12 | 3 | 2/2 oc=0 |
| 4 | 0 | greedy | Medieval | 4 | 3 | 0 | 1 | 11 | 4 | 1/2 oc=2 |
| 4 | 1 | cautious | Recent | 4 | 0 | 0 | 0 | 11 | 3 | 0/3 oc=0 |
| 4 | 2 | balanced | Recent | 3 | 3 | 4 | 0 | 11 | 2 | 3/3 oc=0 |
| 4 | 3 | greedy | Ancient | 5 | 7 | 9 | 3 | 10 | 5 | 1/2 oc=1 |
| 5 | 0 | greedy | Prehistoric | 4 | 0 | 0 | 0 | 10 | 6 | 0/2 oc=0 |
| 5 | 1 | cautious | Recent | 4 | 1 | 0 | 0 | 10 | 5 | 2/2 oc=0 |
| 5 | 2 | balanced | Recent | 3 | 3 | 4 | 0 | 10 | 2 | 0/2 oc=0 |
| 5 | 3 | greedy | Prehistoric | 6 | 9 | 9 | 3 | 10 | 6 | 1/3 oc=0 |
| 6 | 0 | greedy | Prehistoric | 4 | 0 | 0 | 1 | 10 | 6 | 0/3 oc=1 |
| 6 | 1 | cautious | Recent | 4 | 2 | 0 | 0 | 10 | 6 | 2/2 oc=0 |
| 6 | 2 | balanced | Recent | 4 | 6 | 4 | 0 | 10 | 2 | 3/3 oc=0 |
| 6 | 3 | greedy | ManyWorlds | 6 | 1 | 9 | 0 | 10 | 7 | 0/2 oc=0 |
| 7 | 0 | greedy | Prehistoric | 4 | 0 | 0 | 0 | 10 | 6 | 0/3 oc=0 |
| 7 | 1 | cautious | Recent | 4 | 1 | 2 | 0 | 10 | 6 | 2/2 oc=0 |
| 7 | 2 | balanced | Modern | 5 | 8 | 4 | 0 | 10 | 3 | 3/3 oc=0 |

### Trace 2 — ends: manyworlds, 7 rounds

Scores: 10 / 8 / 8 / 26

| Rnd | P | Policy | Era | Team | Cash | Rep | Instab | Integr | Amp | Expedition |
|-----|---|--------|-----|------|------|-----|--------|--------|-----|------------|
| 1 | 0 | greedy | Modern | 2 | 1 | 0 | 2 | 13 | 2 | 1/2 oc=2 |
| 1 | 1 | cautious | Recent | 2 | 1 | 2 | 0 | 13 | 2 | 2/2 oc=0 |
| 1 | 2 | balanced | Recent | 2 | 0 | 0 | 0 | 13 | 2 | 1/3 oc=0 |
| 1 | 3 | greedy | Modern | 2 | 6 | 0 | 2 | 12 | 2 | 2/3 oc=2 |
| 2 | 0 | greedy | Modern | 3 | 0 | 0 | 2 | 12 | 2 | 2/2 oc=0 |
| 2 | 1 | cautious | Recent | 2 | 1 | 2 | 0 | 12 | 2 | 0/2 oc=0 |
| 2 | 2 | balanced | Recent | 2 | 3 | 0 | 0 | 12 | 2 | 2/3 oc=0 |
| 2 | 3 | greedy | EarlyModern | 3 | 6 | 0 | 2 | 12 | 3 | 1/3 oc=0 |
| 3 | 0 | greedy | Modern | 4 | 5 | 1 | 2 | 11 | 2 | 2/3 oc=1 |
| 3 | 1 | cautious | Recent | 2 | 1 | 2 | 0 | 11 | 2 | 0/3 oc=0 |
| 3 | 2 | balanced | Recent | 3 | 7 | 0 | 2 | 9 | 2 | 2/3 oc=2 |
| 3 | 3 | greedy | EarlyModern | 4 | 6 | 0 | 2 | 8 | 3 | 1/2 oc=1 |
| 4 | 0 | greedy | Modern | 5 | 7 | 5 | 1 | 8 | 2 | 1/3 oc=0 |
| 4 | 1 | cautious | Recent | 2 | 4 | 2 | 0 | 8 | 2 | 1/3 oc=0 |
| 4 | 2 | balanced | Recent | 4 | 11 | 2 | 1 | 8 | 2 | 3/3 oc=0 |
| 4 | 3 | greedy | Medieval | 5 | 2 | 0 | 2 | 8 | 4 | 1/3 oc=0 |
| 5 | 0 | greedy | Medieval | 6 | 7 | 4 | 1 | 7 | 4 | 1/2 oc=1 |
| 5 | 1 | cautious | Recent | 2 | 4 | 2 | 0 | 7 | 2 | 0/3 oc=0 |
| 5 | 2 | balanced | EarlyModern | 5 | 12 | 2 | 2 | 5 | 4 | 2/3 oc=1 |
| 5 | 3 | greedy | Ancient | 6 | 5 | 4 | 2 | 5 | 5 | 2/2 oc=0 |
| 6 | 0 | greedy | Prehistoric | 7 | 7 | 4 | 0 | 5 | 6 | 1/3 oc=0 |
| 6 | 1 | cautious | Recent | 3 | 4 | 2 | 0 | 5 | 2 | 1/2 oc=0 |
| 6 | 2 | balanced | Ancient | 6 | 16 | 2 | 1 | 5 | 6 | 3/3 oc=0 |
| 6 | 3 | greedy | ManyWorlds | 7 | 4 | 4 | 2 | 5 | 7 | 1/3 oc=0 |
| 7 | 0 | greedy | Prehistoric | 8 | 5 | 4 | 0 | 3 | 6 | 0/2 oc=1 |
| 7 | 1 | cautious | Recent | 3 | 5 | 4 | 0 | 3 | 4 | 2/2 oc=0 |
| 7 | 2 | balanced | Ancient | 7 | 14 | 2 | 0 | 3 | 6 | 0/3 oc=0 |

### Trace 3 — ends: manyworlds, 15 rounds

Scores: 9 / 10 / 43 / 14

| Rnd | P | Policy | Era | Team | Cash | Rep | Instab | Integr | Amp | Expedition |
|-----|---|--------|-----|------|------|-----|--------|--------|-----|------------|
| 1 | 0 | greedy | Modern | 2 | 1 | 0 | 0 | 14 | 2 | 2/2 oc=0 |
| 1 | 1 | cautious | Recent | 1 | 0 | 0 | 0 | 14 | 2 | 0/3 oc=0 |
| 1 | 2 | balanced | Recent | 1 | 0 | 0 | 0 | 14 | 2 | 0/3 oc=0 |
| 1 | 3 | greedy | Modern | 2 | 0 | 0 | 1 | 14 | 2 | 1/3 oc=1 |
| 2 | 0 | greedy | Modern | 3 | 3 | 0 | 1 | 13 | 2 | 3/3 oc=1 |
| 2 | 1 | cautious | Recent | 1 | 0 | 0 | 0 | 13 | 2 | 0/2 oc=0 |
| 2 | 2 | balanced | Recent | 1 | 0 | 0 | 0 | 13 | 2 | 0/2 oc=0 |
| 2 | 3 | greedy | Modern | 2 | 0 | 0 | 0 | 13 | 2 | 0/3 oc=0 |
| 3 | 0 | greedy | Modern | 4 | 4 | 4 | 1 | 13 | 2 | 1/3 oc=0 |
| 3 | 1 | cautious | Recent | 2 | 3 | 2 | 0 | 13 | 2 | 3/3 oc=0 |
| 3 | 2 | balanced | Recent | 2 | 0 | 0 | 0 | 13 | 2 | 2/2 oc=0 |
| 3 | 3 | greedy | Modern | 3 | 0 | 4 | 0 | 13 | 2 | 2/2 oc=1 |
| 4 | 0 | greedy | EarlyModern | 5 | 8 | 4 | 0 | 13 | 3 | 3/3 oc=0 |
| 4 | 1 | cautious | Recent | 3 | 6 | 2 | 0 | 13 | 2 | 2/3 oc=0 |
| 4 | 2 | balanced | Recent | 2 | 0 | 4 | 0 | 13 | 2 | 0/3 oc=0 |
| 4 | 3 | greedy | Modern | 4 | 5 | 8 | 0 | 13 | 2 | 3/3 oc=1 |
| 5 | 0 | greedy | Ancient | 6 | 6 | 4 | 1 | 12 | 5 | 1/2 oc=2 |
| 5 | 1 | cautious | Recent | 3 | 4 | 2 | 0 | 12 | 4 | 0/3 oc=0 |
| 5 | 2 | balanced | Recent | 2 | 0 | 4 | 0 | 12 | 2 | 0/3 oc=0 |
| 5 | 3 | greedy | Ancient | 5 | 3 | 8 | 0 | 12 | 5 | 2/2 oc=0 |
| 6 | 0 | greedy | Prehistoric | 7 | 9 | 4 | 0 | 12 | 6 | 1/3 oc=0 |
| 6 | 1 | cautious | Recent | 3 | 1 | 2 | 0 | 12 | 4 | 0/3 oc=0 |
| 6 | 2 | balanced | Recent | 2 | 3 | 4 | 0 | 12 | 2 | 1/3 oc=0 |
| 6 | 3 | greedy | Prehistoric | 6 | 5 | 8 | 0 | 11 | 6 | 1/3 oc=1 |
| 7 | 0 | greedy | Prehistoric | 8 | 12 | 4 | 0 | 11 | 6 | 1/3 oc=1 |
| 7 | 1 | cautious | Recent | 3 | 1 | 2 | 0 | 11 | 4 | 0/2 oc=0 |
| 7 | 2 | balanced | Recent | 3 | 6 | 4 | 0 | 11 | 2 | 3/3 oc=0 |
| 7 | 3 | greedy | Prehistoric | 7 | 12 | 8 | 0 | 10 | 6 | 1/2 oc=2 |
| 8 | 0 | greedy | Prehistoric | 9 | 18 | 4 | 0 | 10 | 6 | 1/3 oc=1 |
| 8 | 1 | cautious | Recent | 3 | 4 | 2 | 0 | 10 | 4 | 1/3 oc=0 |
| 8 | 2 | balanced | Modern | 4 | 9 | 6 | 0 | 8 | 3 | 3/3 oc=2 |
| 8 | 3 | greedy | Prehistoric | 8 | 10 | 8 | 0 | 8 | 6 | 0/3 oc=1 |
| 9 | 0 | greedy | Prehistoric | 10 | 20 | 4 | 0 | 8 | 6 | 1/3 oc=1 |
| 9 | 1 | cautious | Recent | 3 | 2 | 2 | 0 | 8 | 4 | 1/3 oc=0 |
| 9 | 2 | balanced | EarlyModern | 5 | 11 | 12 | 1 | 7 | 4 | 3/3 oc=1 |
| 9 | 3 | greedy | Prehistoric | 9 | 6 | 8 | 0 | 7 | 6 | 0/2 oc=1 |
| 10 | 0 | greedy | Prehistoric | 11 | 17 | 3 | 0 | 7 | 6 | 0/3 oc=1 |
| 10 | 1 | cautious | Recent | 3 | 5 | 2 | 0 | 7 | 4 | 2/2 oc=0 |
| 10 | 2 | balanced | Medieval | 6 | 7 | 12 | 0 | 7 | 5 | 1/2 oc=0 |
| 10 | 3 | greedy | Prehistoric | 10 | 3 | 8 | 0 | 7 | 6 | 0/3 oc=1 |
| 11 | 0 | greedy | Prehistoric | 12 | 22 | 3 | 1 | 5 | 6 | 2/3 oc=2 |
| 11 | 1 | cautious | Recent | 3 | 0 | 4 | 0 | 5 | 4 | 2/2 oc=0 |
| 11 | 2 | balanced | Ancient | 7 | 2 | 12 | 0 | 5 | 6 | 0/2 oc=0 |
| 11 | 3 | greedy | Prehistoric | 11 | 0 | 8 | 0 | 3 | 6 | 0/3 oc=1 |
| 12 | 0 | greedy | Prehistoric | 13 | 19 | 3 | 0 | 3 | 6 | 0/3 oc=0 |
| 12 | 1 | cautious | Recent | 3 | 0 | 4 | 0 | 3 | 4 | 0/2 oc=0 |
| 12 | 2 | balanced | Ancient | 8 | 4 | 12 | 0 | 3 | 6 | 2/2 oc=0 |
| 12 | 3 | greedy | Prehistoric | 12 | 5 | 8 | 0 | 3 | 6 | 1/3 oc=1 |
| 13 | 0 | greedy | Prehistoric | 14 | 25 | 2 | 1 | 3 | 6 | 1/3 oc=1 |
| 13 | 1 | cautious | Recent | 3 | 0 | 4 | 0 | 3 | 4 | 0/3 oc=0 |
_(8 rows omitted)_

## What This Does NOT Tell Us

- **Fun is not modelled.** A bot that maximises EV ≠ a human having a good time.
- **No alliance mechanic.** Bots attempt Many Worlds solo. Human tables will coordinate; real MW success rate is likely higher.
- **No negotiation.** The Negotiate phase (cash loans, deals) is absent.
- **Bots don't respond to social dynamics** — a trailing human will take wild risks; a bot stays policy-compliant.
- **Paper playtest is the ground truth.** These numbers are starting points, not proof of balance.
