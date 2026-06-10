# Design Skeleton — the whole game, one place (v4)

_Captured 9 Jun 2026, straight off Drew's post-whiteboard session with Andy (raw notes in
`2026-06-09-post-whiteboarding-with-andy.txt`, board sketch in the image cache). This is the
**current full skeleton** — it supersedes the v3 chip-draw sketch in `current-idea-scratchpad.md`.
**All numbers are provisional** and exist to be playtested, not defended._

> Read `core-goals.md` (spine + keystones) and `constraints.md` (do/don't) first — those still
> govern. This doc is the ruleset that hangs off them.

---

## 1. What's on the table

- **Timeline Integrity** — a single shared track, all players. (Its endgame behaviour is the one
  **open question** — see §10.)
- **Era track:** 1 Recent ▸ 2 Modern ▸ 3 Early Modern ▸ 4 Medieval ▸ 5 Ancient ▸ 6 Prehistoric ▸ 7
  Many Worlds. Deeper = bigger prizes, scarier.
- **Consequence deck** (shared).
- **Researcher market:** a **Researchers** (junior) deck and an **Experts** (veteran) deck, plus a
  **Parting Gift** deck for retirements.
- **Each player board:**
  - **Skills deck** — built fresh each expedition (see §3); not persistent between jumps.
  - **Team** — the researcher identity cards you own.
  - **Reputation** (the score, never spent), **Cash** (runs everything), **Artefacts** zone.
  - **Time Machine** — four modules: **Displacement Amplifier**, **Baryonic Capacitor**, **Temporal
    Collimator**, **Quantum Stabiliser** (see §6), plus accumulated **instability tokens**.

---

## 2. Turn structure

Order: **(React) → (Negotiate) → Jump → Process → Develop → Plan.** You **Plan** at the end of your
turn for _next_ turn, so prep happens during others' turns (low downtime). First turn of the game
begins at **React** in the **Recent** era.

- **React** _(only if you have a jump staged)_ — cancel a jump a consequence has invalidated, **or**
  plan a last-minute jump (last-minute jumps may draw **max 1** era card).
- **Negotiate** _(if jumping)_ — arrange anything with other players for the upcoming jump (loans,
  etc.).
- **Jump** — attempt the steps on your era card (§3–4).
- **Process** _(if you jumped and ≥1 step succeeded)_ — collect spoils (§5).
- **Develop** _(any turn)_ — **one** of: write a paper, **or** upgrade one machine module (§6). Idle
  engineers may also clear instability (§4) — relationship to the single Develop action is an open
  detail (§10).
- **Plan** — draw era cards up to your **Collimator** level and pick/stage your next jump.

---

## 3. Building the bag (the deck-/bag-builder core, Option B)

At the **start of each expedition** you pick a **roster of team members up to the machine's
Capacity**, then build a one-shot **skills deck (bag)** from:

- **the roster's pips** — one skill card per pip (Insight / Craft / Grit), plus
- **the player base** — a permanent **2 Insight / 2 Craft / 2 Grit** that goes into _every_ bag
  (this is also the early-game floor — provisional, a tuning knob), plus
- **traces** — **one Trace card per instability token currently on your machine** (§4).

> **Example (Drew's):** roster = one historian (I 2 / C 2 / G 2), 2 instability tokens → bag = **2
> Trace + 4 Insight + 4 Craft + 4 Grit**.

Then **draw a hand of `2 × (researchers on the expedition) + 2`** cards — and **top it back up to
that size at the start of every step**, reshuffling the discard (played cards and traces) back in
when the deck runs dry (corrected 10 Jun: the hand is _refilled each step_, not drawn once and
depleted across the whole expedition). The hand is **visible** — your legible floor. "Who do I
send?" is a real recurring decision: it sets your bag's composition _and_ your hand size, and sent
researchers can't also work at home this turn (§6). _The `+2` is load-bearing — the sim shows deep
expeditions stall without it._

---

## 4. Resolving the expedition (Jump)

An era card is a left-to-right path of **steps**, each printing a skill requirement (an amount of
one skill). **Deeper eras are longer ladders of gentler gates** — step bands ≈ **2–3 / 3–4 / 5–6**
by era pair (Recent…Prehistoric); requirements stay low (shallow ≈1, deep ≈2) so a long climb is the
challenge, not each wall. **Spoils (Cash) sit only on the second-to-last step**; every earlier step
is a pure gate, and the last step is the objective. At each step you top the hand up (§3) and play
matching cards to meet the requirement; played cards go to the discard and recycle.

- **Overclock** — if your hand can't cover the next step, you may overclock: **+1 instability
  token**, **+1 Trace card to the deck**, and **draw 1 card** into your hand (the gamble that the
  draw turns up the skill you need). Traces do nothing but dilute future draws — within this run
  _and_, via §3, every future bag until cleaned. (9 Jun)
- **Cash out** — at any gate you may stop and **bank everything cleared**
  (banked/back-loaded/cash-out reward shape, unchanged from prior design). Footprint already left is
  never refunded.
- **Stabiliser shutdown** — if instability reaches the **Stabiliser limit** (start max **2**; tuning
  toward 3), at the end of that step the machine **shuts down**: the expedition ends, you
  auto-cash-out, draw an **extra consequence**, and Timeline Integrity **−1**. This is the hard cap
  that stops a single run bricking the machine.

**Cleaning up (three paths):** instability is a **debt you actively pay down**, not a meter that
self-drains.

- **Engineer at base.** An **engineer who did not go on an expedition** this turn removes **up to
  [their Craft pips]** instability tokens — a matching number of Trace cards leave your deck with
  them. (Either leave the engineer home while the rest jump, or **skip the Jump** entirely and go
  straight to Develop to use them.)
- **Early-game safety valve (no soft-lock).** A player with **no engineer on their team AND no
  Stabiliser upgrade** may spend a **minimal Develop/Plan turn** (skipping the Jump) to **clear all
  instability**. So a teamless player who overclocks to shutdown can't get permanently crippled. It
  is **gated** precisely so it never undercuts the engineer's opportunity cost: the moment you own
  an engineer (or upgrade the Stabiliser), the free vent is gone and cleanup costs real labour. (9
  Jun)

**Consequences:** at the end of **any turn in which you overclocked 1+ times**, draw **one**
consequence card (clean runs draw none). Examples (flavour stripped):

- Timeline Integrity −1 or −2.
- One / some / all players: gain or lose cash; gain or lose reputation; gain or lose a skill card
  (even a bad one); (rare) lose 1 level of a machine module; (rare) lose a team member of a type.

Severity scales with era depth; the real-history flavour lives here.

---

## 5. Reward & the prize (Process)

- **En-route finds** (steps before the objective) → **converted to Cash** immediately when the
  expedition ends.
- **The objective** (final step), if all steps succeeded and there's an item to retrieve:
  - **Plunder it** → the **era card goes to your Artefacts zone**. **A non-doomed artefact scars
    Timeline Integrity** when taken (`[1,1,2,2,3,3,4]` by era — deeper finds scar more); **doomed
    artefacts grab clean** (no scar). It can later be **researched** in **Develop** by a **historian
    who didn't jump that turn** → adds the artefact's **printed Reputation** (historian experience
    does **not** change it — any historian at base writes it up), card discarded. Or **sold** →
    **Cash**, but at a **disrepute** of `max(1, floor((rep−1)/2))` Reputation (**0 for doomed**
    artefacts). _(Both clarified 10 Jun 2026.)_
  - **Bring back evidence** (a copy, a photo — not the artefact) → the era card is **processed
    immediately**, **Reputation** added, card discarded.

Sell-vs-publish and Record-vs-Take both live here, unchanged in spirit from prior design.

---

## 6. The machine — four modules

All start at level **1** except the Stabiliser (start **max 2**). Upgrading is a **Develop** action
and each module gates on who can do the work:

| Module                     | Does                                          | Upgraded by   |
| -------------------------- | --------------------------------------------- | ------------- |
| **Displacement Amplifier** | max era reachable                             | see ladder ↓  |
| **Baryonic Capacitor**     | expedition capacity (roster size → hand size) | **Physicist** |
| **Temporal Collimator**    | era cards drawn at Plan                       | **Engineer**  |
| **Quantum Stabiliser**     | max instability before shutdown               | **Physicist** |

**Amplifier ladder (the progression spine):**

- Recent → Modern: **no researcher needed**.
- Modern → Early Modern, Early Modern → Medieval: **Engineer**.
- Medieval → Ancient, Ancient → Prehistoric: **Engineer + Physicist**.
- Prehistoric → Many Worlds: **Engineer + Physicist, both with three full blue experience boxes**.

---

## 7. Researchers — pips, experience, retirement

- **Buying a researcher** adds **one skill card per pip** to your bags going forward (e.g. Dr
  Barnes, C 1 / I 2 / G 1 → +1 Craft, +2 Insight, +1 Grit).
- **Experience:** each time a researcher is **used** — on an expedition, to write a paper, or to
  upgrade the machine (**not** to clear instability) — they gain **1 experience token**. The **4th**
  token resets and advances them **one blue box** on their card (envisioned: a plastic clip up the
  card edge). Each box adds **+1 to all three skills** (max **+2 each**), so a veteran rises
  uniformly and keeps their spike.
- **Retirement / Parting Gift:** a researcher **bought below the max box** who **reaches the max**
  and is then **removed from the team** leaves a **Parting Gift** (the retirement payoff).
  **Experts** start on the **highest box** and **cannot be retired** — capability you can buy,
  legacy you can only grow.

---

## 8. Economy & action pool

- **Two currencies, bridged only by the prize:** **Cash** (spent on everything) and **Reputation**
  (the score, never spent). The only bridge is what you do with an artefact (Sell → Cash **XOR**
  Publish → Reputation).
- **The team is the action economy.** Each turn a researcher is in the field (jumping) **or** at
  home (one of: write a paper · upgrade a module · clear instability). Sent researchers can't work
  at home.
- **All Reputation traces to a researcher's work** (Recording/evidence in the field, or Publishing
  at the desk). No team, no legacy.

---

## 9. Starting state, endgame & scoring

- **Start:** no team, no artefacts, no reputation, **2 Cash**; skills baseline **1/1/1** as
  originally written **but** the working assumption is now a permanent **2/2/2 player base** (§3,
  tuning). Amplifier / Capacitor / Collimator at **1**; Stabiliser **max 2**.
- **Endgame trigger:** play continues until a player **completes all steps on a Many Worlds card**.
  A Many Worlds expedition that _fails_ any step **reduces Timeline Integrity by 4–5**. The first
  successful Many Worlds (likely via a **full-table alliance**) **ends the game**.
- **Timeline Integrity 0:** triggers a final **"Unravelling" round** — each player takes one more
  turn at max peril (collapse flavour firing) to get their affairs in order, or ally for one last
  **Many Worlds** escape — then the game ends and everyone scores. (Not a cold game-over; resolved 9
  Jun, see §10.)
- **Score = Reputation + highest module level reached + number of unresearched artefacts (1 each).**
  Papers (4+ rep) dominate artefacts (1), so held artefacts are a consolation, not a hoarding
  strategy.
- **⚠️ The multiverse is now RARE (~50% of games; balance-sim 10 Jun).** The Many Worlds card is a
  hard 5×5 gauntlet, so reaching for it and missing frays the timeline. That makes the endgame split
  roughly **~52% triumph / ~36% collapse / ~12% quiet legacy** — three distinct endings. **Design
  consequence (TODO): the two non-triumph endings must feel like _"a life well lived,"_ not failure.**
  Each ending needs flavour text **and a reflection / score-recap beat** that surfaces what the player
  _built_ — the team they grew, papers published, eras reached, artefacts saved. Collapse must read as
  a dramatic mode-flip, not a loss. Without this, ~half of playthroughs feel like a 3-hour defeat.

### Endgame narration (Drew's, keep verbatim)

**Successful Many Worlds:** "You did it! Humanity now has the power to access the furthest reaches
of infinite universes. Technology advances rapidly, time travel becomes a new field of training
similar to that for astronauts, and governments around the world scramble to draw up safety
guidelines for an enthusiastic public. The only thing to do now is to ponder whether we should
explore the future..."

**Timeline collapse:** "It starts small — sightings of confused medieval warriors in town centers,
Benjamin Franklin wandering the streets of New York — and unravels further as the minutes go by.
Egyptian pharaohs are seen arguing with each other outside the pyramids of Egypt. Later, a herd of
triceratops is spotted by a group on an African safari. It's only when the atmosphere starts
changing that the entire population starts noticing. Within an hour, astrological objects are
hurtling through each other and the laws of nature themselves come apart at the seams."

---

## 10. Open questions & concerns

1. **✅ Timeline collapse — RESOLVED (9 Jun): option (a), the "Unravelling" fuse.** Integrity 0
   triggers one final round rather than a cold game-over; the deterrent lives in the personal
   overclock costs, so the shared track delivers collapse drama without a buzzer. Reconciles
   keystone #3. Drew's reasoning: the personal punishment is deterrent enough, and a final round
   lets players settle their affairs — or, if close, ally for one last Many Worlds attempt. The
   concern and rejected alternatives are kept below for the record:
   - **(a) Fuse / "Unravelling" final round — CHOSEN.** Integrity 0 doesn't end the game — it
     triggers one final round at max peril; the only clean escape is completing a Many Worlds jump;
     then the game ends and everyone scores. Restores the mode-flip keystone in one rule; the
     personal overclock costs (below) keep the deterrent; spite-flipping is no better than the
     legitimate "rush the ending" lever, since the game always ends on score.
   - **(b) Wind-down round.** Integrity 0 → everyone gets one last turn to cash out / publish →
     score. Simplest; (a) minus the Many Worlds escape framing.
   - **(c) Cut the shared bar entirely.** Peril lives purely in the **personal** overclock stack
     (compounding Trace pollution + shutdown ending your run + consequence draws + engineer drag — a
     strong individual deterrent; a _shared_ bar was always a weak one, by tragedy-of-the-commons).
     Collapse flavour is delivered by consequence cards. Game ends only via Many Worlds (+ maybe a
     round cap). Loses collective dread + the collapse ending.
   - **(d) Low integrity sabotages the _win_, not the game.** A frayed timeline can't be safely
     opened — low integrity makes Many Worlds harder/impossible. Collective greed denies everyone
     the good ending without a buzzer.
2. **✅ Overclock draw — RESOLVED (9 Jun):** each overclock draws **1** card into the hand (plus the
   instability token and the Trace).
3. **✅ Instability removal — RESOLVED (9 Jun):** three paths (engineer at base /
   skip-Jump-to-Develop / early-game no-engineer vent) — see §4. Working assumption: one home job
   per researcher per turn, so an engineer who cleans can't also paper/upgrade that turn.
4. **Numbers / early-game balance.** Hand size vs bag size vs step requirements so the overclock
   bites without being routine; the 2/2/2-base vs Stabiliser-3 floor; per-era requirement and reward
   curves; Many Worlds difficulty; integrity pool scaled to player count.
5. **"Who triggers Many Worlds" / runaway leader** — the alliance ending needs care so it isn't a
   kingmaker or a foregone conclusion.
6. **Ethics link is now weak.** Greedy _Take_ no longer scars the shared timeline directly (it costs
   reputation instead); the "shared timeline remembers the table's greed" feeling rides almost
   entirely on overclock→consequence→integrity. Decide if that's acceptable.
