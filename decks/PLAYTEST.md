# Playtest assembly — print & play (v0, 11 Jun 2026)

_How to get **Warped** onto the table tomorrow. The card content is the JSON in this folder; the
ruleset is `../game-design-document.md`. There are two ways to make the cards:_

- **Easy:** open the renderer (`../renderer/` — `npm install && npm run dev`, then **Print → Save as
  PDF**). It lays the cards out on A4 with cut lines, including **double-sided era cards**.
- **Crude:** copy the JSON onto index cards by hand. Everything you need is below.

> The first playtest's only job is to prove the **v4 loop is _fun_** (the sim proved it's _balanced_,
> not fun). Don't polish — play it, break it, take notes against the **Playtest-watch** list at the end.

---

## What's in the box (this content set)

| Deck | File | Count | Notes |
|---|---|---|---|
| **Destinations (era cards)** | `destinations/cards.json` | **32** | Recent 5 · Modern 5 · Early Modern 5 · Medieval 5 · Ancient 5 · Prehistoric 5 · **Many Worlds 2**. Double-sided (front = the expedition path; back = the paper/prize). |
| **Researchers** (juniors) | `researchers/cards.json` | **18** | 6 Historian · 6 Engineer · 6 Physicist. |
| **Experts** (veterans) | `experts/cards.json` | **9** | 3 per profession. Start maxed, can't retire. |
| **Parting Gifts** | `retirement/cards.json` | **8** | Retirement payoffs. |
| **Consequences** | `consequences/cards.json` | **18 designs → 24 cards** | Make copies per the `copies` field (table below). |

**You must also make these generic bits** (tokens/scraps are fine — they're not in the JSON):

- **Skill cards** — the deck-builder currency. Make a bank of **~40 Insight / ~40 Craft / ~40 Grit**
  (small cards or chits in three colours). Plus **~24 Trace** cards (blank/grey — they match nothing).
- **Tokens** — Cash, Reputation, Disrepute, Instability, Experience (coins/cubes/pen ticks all work).
  Reputation and Disrepute are **separate piles** (you net them only at scoring).
- **Tracks** — Timeline Integrity (a row of ~24 marks + 1 marker) and the **Era track** 1–7.
- **Player board zones** (draw on paper): Team · Skills deck · Cash · Reputation · Disrepute ·
  **Data** (recorded era cards awaiting a paper) · **Artefacts** (plundered era cards) · the Time
  Machine (4 modules: Amplifier / Capacitor / Collimator / Stabiliser).

### Consequence deck — copies to make (matches the sim's weighting)

Build a 24-card deck: `int1`×5, `int2`×2, `cashLoss`×4, `cashGain`×3, `repLoss`×2, `repGain`×2,
`modLoss`×1, `nothing`×5. The `copies` field on each card already encodes this — just make that many.

---

## Setup (from GDD §4 — these numbers win over the older whiteboard sketch)

1. Each player: **no team, no artefacts, 0 Reputation, 0 Disrepute, 3 Cash.**
2. Each machine: **Amplifier 1, Capacitor 1, Collimator 1, Stabiliser max-instability 2.** The
   Amplifier's **first upgrade is free** → **Recent and Modern are both reachable from turn one.**
3. Every skills deck always contains a permanent **player base of 2 Insight / 2 Craft / 2 Grit.**
4. **Timeline Integrity = (players + 1) × 4** → **16** (3p) · **20** (4p) · **24** (5p).
5. Sort destinations by era into the Era-track rows; shuffle each era's pile. Shuffle the Researchers,
   Experts, Parting Gift and Consequence decks.
6. First player begins their turn at **React**, in the **Recent** era.

## A turn, at a glance (GDD §5)

**(React) → (Negotiate) → Jump → Process → Develop → Plan.** You **Plan** at the _end_ of your turn for
your _next_ one, so prep happens during others' turns. Key reminders for the table:

- **Build the expedition deck fresh each jump:** roster (≤ Capacity) → 1 skill card per pip + the 2/2/2
  base + **1 Trace per instability token** on your machine. Draw a hand of **2 × (researchers on the
  jump) + 2**, and **top the hand back up to that size at the start of every step**.
- **Short on a step?** **Overclock:** +1 instability token, +1 Trace into your deck, draw 1 card. If
  instability hits your Stabiliser limit, the machine **shuts down** (auto-cash-out, +1 extra
  consequence, Integrity −1).
- **Find** (second-to-last step): **Sell → Cash** _or_ **Publish → a minor paper** (a Historian at base).
- **Objective** (last step): **Record** → card to your **Data** zone, or **Plunder** → **Artefacts**
  zone (non-doomed plunder **scars** Integrity; doomed grabs clean). **Reputation is never instant** —
  a Historian who didn't jump **Publishes** a Data/Artefact card later for its printed rep.
- **Early-relief spoil:** a step marked with a coin drops **1–2 Cash** when you clear it (already baked
  onto ~15% of gate-steps; pure Cash, no paper).
- **Overclocked this turn?** Draw **1 Consequence** at end of turn (a shutdown draws an extra).

## Ending & scoring (GDD §12)

First of: **Triumph** (a Many Worlds card completed) · **Collapse** (Integrity 0 → one Unravelling
round) · **Quiet legacy** (every player retired). Then everyone scores:

**SCORE = Reputation − Disrepute + highest module level reached + unresearched artefacts (1 each).**

> **Many Worlds / the alliance:** the alliance-ending mechanics are the one **unfinished** rule — see
> `../kingmaker-rule-suggestion.md` for a proposal to try (or house-rule it for the night).

---

## Playtest-watch (judge these at the table — the sim can't)

- **Does the overclock gamble _feel_ thrilling?** (sim sits ~19% — a bot-conservatism floor.)
- **Is the deep-era climb fun or a slog?** (Ancient/Prehistoric are 5-step ladders; game ran ~16–17
  rounds / long in the sim.)
- **Do the new all-era early-spoils dull the deep back-load?** (Drew's 11 Jun change — watch it.)
- **The Data → Publish step** (the 11 Jun rule): does deferring reputation to a desk-bound Historian
  feel good, or fiddly?
- **Alliances & negotiation** — the sim's blind spot. Watch whether the table naturally allies for MW.
- **Does anyone feel out of it by round 3?** (the "nobody should feel stupid" law.)
