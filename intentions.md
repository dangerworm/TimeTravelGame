# Intentions — the spirit, and the _why_ behind every decision

_This is the north star (what the game is **for**) and the rationale ledger (why each rule is the
way it is). The game itself — the actual rules and numbers — lives in **`game-design-document.md`**.
When a rule and this document's spirit disagree, **the spirit wins and the rule is what's wrong.**_

_Consolidates the former `core-goals.md` (vision) and `constraints.md` (decision log), reconciled
**10 Jun 2026 (eve)**. Decision dates are kept. Where an early figure was later revised, the
**current** value is stated and the original noted — so this file has no internal contradictions._

---

# PART I — THE SPIRIT (the north star)

## What kind of game this is

A **competitive expedition / engine-building game** for rival scientists who co-discovered time
travel. You build a **team and a machine**, then use them to **solve the challenge each destination
presents** — a tactical puzzle with an optional push-your-luck gamble — racing for the greatest
scientific legacy, while a **shared timeline** quietly remembers how greedy the table has been and
can tip into a dramatic third-act collapse.

Touchstones to study and steal from: **Lost Ruins of Arnak** (build a toolkit, overcome expedition
obstacles, climb a track) and **Clank!** (push-your-luck on a shared board with a collective threat
that greed summons).

## The spine (the one decision, made over and over)

> **"How do I crack this destination — and how hard do I dare push?"**

Each jump is a small **expedition with obstacles**. Your team is a **bag of skill chips**; on each
expedition you **draw a hand** and spend chips against a **fixed, visible** challenge. The puzzle
and your bag's composition stay legible; **what you draw is the chaos** — you solve the hand you
were dealt, fresh every time. The gamble is built in, not bolted on: press deeper for the growing
prize or cash out; **overclock** to draw more chips at rising Instability when you're short.

If this core choice is not fun round after round, nothing else matters.

## The four keystones (NON-NEGOTIABLE)

_These are the feelings the game must deliver. They came straight from Drew and outrank any
individual mechanic. A rule that breaks one of these is the rule that's wrong._

1. **The overclock thrill.** Push the boundary; it could go either way. Push-your-luck must survive
   into the final design in some form.
2. **Team legacy.** The deep satisfaction of bringing together brilliant minds who build on _your_
   discovery and make it greater — an engine that grows and opens new possibilities. Keep the "a
   veteran retires and leaves a permanent legacy" payoff beat.
3. **Collapse is possible, but never a dead stop.** The shared timeline _can_ fail — but it is never
   a Pandemic-style buzzer that erases everyone's effort two turns from glory. Collapse is a
   dramatic **third-act mode-flip**, not game-over.
4. **The spine is challenge-navigation, not ethics.** "How you treat history" is _one pillar of
   several_, not the heart of the game.

## The two laws (these govern every mechanic)

- **Narrative coherence.** Every mechanic must be explicable in the fiction. If we can't say _why_
  the machine/team/timeline behaves this way, players can't emotionally invest, and it doesn't go
  in. Mechanics and story are co-designed; when a rule and the story disagree, fix the rule.
- **Accessible to the heart, not just the head.** The game must be a great night for someone who
  comes for the roleplay and the feeling, not the optimisation — **nobody should ever feel stupid.**
  The surface decision stays intuitive and thematic ("who do I send to face this?"); tactical depth
  is opt-in, layered on top. The gamble is the leveller (anyone can have a heroic or disastrous
  moment); failure always reads as drama ("the river flooded"), never as a maths error exposed to
  the table.

## What success means for this project

- **~80%: Drew genuinely loves playing it** with his husband and 2–4 friends. Enjoyment and wow
  factor above all.
- **~20%: the legitimate ego reward** of "_You_ made this? That's awesome."

Design for a table of **4–5 players**. Treat larger/smaller counts as variants to tune later.

## Theme anchors (softer, but Drew cares)

- Players are **scientists, not thieves** — peers who co-discovered something extraordinary.
- The fantasy is **movie-excitement-level, not documentary-realism** — but choices should be
  rewarded or punished roughly as they would be in real life.
- **Real historical mysteries** are the destination content; reward scales with how genuinely
  unknown the subject is. This is the game's most distinctive, marketable hook.

---

# PART II — THE DECISIONS & THEIR WHY

_Locked decisions, grouped by area, each with its rationale. Dates kept. The current value is always
stated first; superseded figures are noted in italics._

## The expedition & resolution

- **Resolution is a per-expedition bag-builder (Option B).** Each jump, pick a roster up to machine
  **Capacity** and build a one-shot bag from their pips + a permanent **player base (2/2/2)** + one
  **Trace per instability token**. The bag is rebuilt every jump (not persistent), so "who do I
  send?" stays a live decision. (9 Jun)
- **Resolution refills the hand each step — not a one-shot depletion.** At the **start of every
  step** you top the hand up to **`2 × roster + 2`**, reshuffling the discard (played cards +
  Traces) when the deck runs dry; overclock draws beyond the cap. The **`+2` is load-bearing** — at
  `[2×roster]` the sim shows deep completion cratering and constant folding. _Corrects a 10 Jun bug
  where the spec and sim drew the hand once and depleted it across the whole expedition — the reason
  deep cards looked impossible; the old "bag = stamina / no reshuffle" line is dropped. Stamina now
  lives in accumulating **Trace pollution + instability toward shutdown**._ (10 Jun)
- **The expedition stays a fixed, visible puzzle; the chaos lives in your draw, not the world.**
  Keep the era card with its printed steps + requirements; players solve **the hand they drew**
  against a legible challenge — engine + chaos. (Don't make the expedition a face-down deck — that
  decouples difficulty from reward.) (8 Jun)
- **Make the jump a tactical puzzle first.** Information largely visible; players out-think the
  destination. The push-your-luck gamble is an _optional_ layer on top, not the default mode. (5
  Jun)
- **One mechanical triad: skills (Insight / Craft / Grit) are the currency; profession is flavour +
  gating.** Steps require skills; professions (Historian / Engineer / Physicist) tell the story of a
  researcher's spread and gate some steps — never a second currency. Knowledge gates are
  profession-locked; danger is an open **Grit** check. (8 Jun)
- **Grit is a temperament, not a profession — no soldier / muscle / tank type.** Bravery is a
  quality any scientist can have; the brave ones spike Grit. A combat type would turn the
  co-discovery team into a mercenary crew. (8 Jun)
- **Overclock's cost is personal and persistent.** Overclock = **+1 instability token** and **+1
  Trace card** (1:1) and **draw 1**; Traces dilute every future bag until an engineer clears the
  tokens. Instability is a debt you pay, capped by the **Stabiliser** (shutdown forces a cash-out —
  never an unbounded brick). (9 Jun)
- **Deep eras are long ladders of _gentle_ gates, not short brutal walls.** Deep cards have more
  steps but low, flat per-step requirements (plus the odd Grit danger spike); the challenge is the
  **length of the climb and the final gamble**. _Narrative:_ civilised eras gate on political/social
  control (security, secrecy, power) that didn't exist deep in time, where the difficulty is the
  long, blind search through near-nonexistent records. (10 Jun)
- **Danger spikes bite via instability/consequence, not high requirements.** A single high-req step
  outruns the refilled hand, so danger must threaten some other way. (10 Jun, playtest-watch)

## The reward & the prize

- **The reward ladder is back-loaded to one real cash-out point.** Every step before the penultimate
  is a **pure gate that pays nothing**; the **second-to-last** step holds the one **find**; the last
  step is the objective. You **can't get rich bailing after 1–2 steps** — you must climb almost the
  whole ladder, then choose whether to gamble the final objective. _Revised the earlier "escalating
  banked finds at every gate" shape._ (10 Jun)
- **The en-route find is Sell-or-Publish, like a minor objective.** At Process you **Sell it →
  Cash** _or_ **Publish it → a minor paper (small Reputation)**. Reuses the existing Sell/Publish
  mechanism (no new subsystem), roughly doubles per-expedition paper potential, and lifts paper
  cadence **even for cautious cash-outs**; publishing it also seasons the writing researcher (an
  experience token). The back-load holds (you must still reach the penultimate step) and the minor
  paper stays well below the objective's rep. _Replaces the earlier "en-route find = pure Cash."_
  (10 Jun)
- **Early-relief spoil (shallow eras only).** For eras **below Ancient** (Recent–Medieval), a step
  before the penultimate has a **15% chance** of a small **1–2 Cash** drop, at most one per card —
  **pure Cash, no paper**. Eases the early climb without touching the back-load; deep eras stay
  lean. (10 Jun)
- **The objective is Record _or_ Plunder, fiction-gated.** **Record** it (copy/photo) → Reputation,
  history intact, clean. **Plunder** it → the artefact enters your zone to later **Publish** (rep)
  or **Sell** (cash). The take/copy choice exists **only where the fiction supports it** (doomed or
  removable artefacts); pure-knowledge prizes are **Record-only**. Forcing the choice on every
  objective would double each card's surface and drown the puzzle — the v1 accretion ghost. (5 Jun)
- **Plundering a non-doomed artefact scars the timeline — the shared half of the greed dial.**
  Taking one costs **Timeline Integrity**, era-scaled **`[1,1,1,2,2,3,3]`** (deeper finds scar
  more); **doomed artefacts grab clean** (no scar). This makes a greedy table's collective
  plundering bend the timeline toward collapse — sim: greedy-heavy tables collapse far more than
  careful ones, so the ethical axis is mechanical, not just fiction. _Superseded the earlier
  `[1,1,2,2,3,3,4]`._ (10 Jun)
- **An artefact is Cash XOR legacy — Sell _or_ keep-for-points, never both (Model B).** Selling pays
  Cash now and **forfeits** the end-game points it would have scored (its paper's Reputation if
  Published, or **1 point** if held unresearched). \_Rejected allowing a paper **and** a sale — free
  Cash
  - free Reputation collapses the cash-vs-legacy tension that is the economy's spine.\_ (9 Jun)
- **Sell disrepute scales with the find's significance; doomed sells clean.** Selling a
  **non-doomed** artefact costs **`max(1, floor((rep−1)/2))` disrepute** (1 for rep 2–4 … 4 for rep
  9–10), where `rep` is the artefact's **printed** value. Disrepute stays well below the paper
  value, so **Sell is the cash-desperate lifeline, never a trap**. **Doomed = 0 disrepute** — clean
  to grab _and_ to sell. (10 Jun)

## The economy & the team

- **Two currencies, bridged only by the prize.** **Cash** (spent on everything) and **Reputation**
  (the score, never spent). The only bridge is what you do with a find/artefact — **Sell → Cash XOR
  Publish → Reputation**; "both" is a parked premium, never the default. (5 Jun)
- **Reputation only ever comes from a researcher's work** — Recording in the field or Publishing at
  the desk. No mechanism grants reputation without a team member doing the work; this makes the
  team-legacy keystone literal. (5 Jun)
- **Disrepute is a separate token pile (the moral stain), not a silent Reputation decrement.** All
  **ethics-linked** reputation costs (selling a non-doomed artefact; plunder hits) are paid as
  **disrepute tokens** kept _beside_ your Reputation, never removed from it. **Final score =
  Reputation − disrepute**, netted once at scoring. Reputation can still **dip for honest reasons**
  — a consequence discrediting a paper is _peer review catching a mistake, not a moral failing_, and
  reduces the Reputation pile directly (not disrepute). _Purpose:_ the endgame score-recap becomes a
  two-band **portrait** (_what you discovered_ × _how you did it_) with no new points-salad; the
  careful player's reward is a visibly **clean sheet**, and mid-game the disrepute pile telegraphs a
  plunderer's true standing (soft catch-up read, zero arithmetic). _Supersedes the earlier wording
  that took the sell cost straight out of Reputation._ (10 Jun)
- **The team is the action economy — no abstract action points.** Each turn a researcher is in the
  field (jumping) **or** at home (one Develop action). Sent researchers can't work at home. (5 Jun)
- **Home actions are one per researcher, not one per turn.** Each teammate not in the field takes
  one Develop action (write a paper · upgrade a module · clear instability), so team size drives
  home productivity as well as field strength. _(9 Jun, balance-sim confirmed.)_
- **Experience grows all three skills.** Each earned blue box = **+1 to all three skills** (max
  **+2**); veterans rise uniformly and keep their spike. A card **shows 3 boxes, but the first is
  pre-filled — only 2 are earnable**; each box takes 2 uses, so 4 uses takes a fresh recruit to the
  max. (9 Jun)
- **Negotiate is researcher rental for Cash only — never a Reputation transfer, no loans.** You may
  **rent another player's teammate** for one expedition at a freely-agreed **Cash** fee: their pips
  join your bag (counting toward Capacity), their owner loses that home-action, the Reputation stays
  yours, they return after. _Why:_ Reputation is your life's work and must trace to your own team,
  so it's never rented, sold, or shared — that kills the runaway-leader rep-farm and keeps the
  team-legacy keystone pure. Cash loans are cut (repayment bookkeeping + exploits). Bonus: rental is
  the **mechanical seat of the endgame alliance** — lend a rival your Physicist/Engineer for the
  Many Worlds gauntlet. _Open detail:_ does a rented researcher earn experience for its owner?
  (lean: no.) (10 Jun)
- **Minimal arithmetic — at most one small sum, across one set of cards, to resolve a step.**
  Summing a few chip values is fine; carrying several running totals across decks/tokens/tracks in
  your head is banned. Failure reads as drama, never "you did the maths wrong." (8 Jun)

## The machine & progression

- **The machine starts low and opens immediately.** **Amplifier starts at level 1, but the first
  upgrade is free** (`ampCosts[0]=0`), so **Recent _and_ Modern are reachable from turn one** — no
  dead opening crawl. Recent becomes the optional gentle on-ramp, not a forced tier. _Stated earlier
  as "starts at Amp 2"; the current model is Amp 1 + free first upgrade, functionally the same
  opening, and it is the load-bearing fix from Experiment A._ (9 Jun, balance-sim confirmed.)
- **The Stabiliser starts at 2, so overclock is a genuine gamble.** At Stab 2 a carried-over
  instability plus one push for the objective can trip a shutdown — and the danger should
  **concentrate in the player who keeps pushing** (sim: the reckless archetype bricks ~2–3×/game;
  careful players almost never do), not spread evenly. Stabiliser upgrades add +2 each. (9 Jun)
- **Four modules, each gated on who does the work.** Amplifier (max era) · Capacitor (Capacity →
  hand size) · Collimator (era cards drawn at Plan) · Stabiliser (instability tolerance). Full
  ladder and costs in the GDD. _Precision-as-discretion (cleaner drops = less footprint) stays
  parked._ (9 Jun)

## The timeline, collapse & endgame

- **Collapse is a one-round "Unravelling" fuse, never a cold game-over.** Integrity 0 triggers a
  final round (each player one more turn — settle affairs, or attempt a last Many Worlds escape)
  then scoring. The overclock deterrent lives in the **personal** costs (Trace pollution, shutdown,
  consequences, engineer drag), not the shared track. Honours keystone #3. (9 Jun)
- **Timeline Integrity pool = (players + 1) × 4** → 16 (3p) · 20 (4p) · 24 (5p). (10 Jun)
- **Individual retirement is the third end-trigger (the quiet-legacy ending) — not a round cap, not
  a table vote.** On your turn you may **retire your scientist** instead of acting: read your
  epilogue, **lock your score**, take no further turns. The game ends on the **first** of: _every
  player retired_ (quiet legacy), _a Many Worlds success_ (triumph), or _Integrity 0_ (collapse).
  _Why individual, not a table vote:_ unanimous concession has a contested failure mode (leader
  wants to lock the win, trailer wants one more push) and frames the ending as collective
  **surrender**, undercutting its dignity. Individual retirement is self-regulating (retiring stops
  you scoring, so nobody quits early), needs no aging bookkeeping, and turns the whole game into a
  **career-scale overclock gamble** — bank an illustrious, earthbound career now, or push for the
  multiverse and risk the timeline tearing apart. _Watch in playtest:_ downtime for an early-stalled
  player; the solo-grind tail once all but one retire. (10 Jun)
- **Many Worlds is the win-rate brake, and the multiverse is RARE/sacred.** Tune **MW difficulty**,
  not the era economy, to hold the win rate. The MW card is a **5-step × 5-pip gauntlet**, failed-MW
  **−2 Integrity** → MW success ~**50%**, so the endgame splits roughly **~52% triumph / ~36%
  collapse / ~12% quiet legacy** — three distinct endings. _Supersedes the earlier "aim ~75% MW"
  target and the "6-step × 4-pip" gauntlet; the rarer win was a deliberate 10 Jun decision to make
  the multiverse feel earned._ (10 Jun)
- **All three endings must feel like "a life well lived."** Every ending closes on the same two-band
  **portrait scoresheet** (_what you discovered_ × _how you did it_), scored as \*\*Reputation −
  disrepute
  - highest module level + unresearched artefacts (1 each)**. Glory and shame show as two visible
    piles; restraint **shows\*\* without scoring its own axis. Each retiree reads a personal
    epilogue; the last player out triggers the collective ending narration. (10 Jun)
- **Ethics is the dial, not the spine.** Collective greed (plunder scars + overclock→consequence→
  integrity) is what _fuels_ the collapse threat; a careful table never collapses. Emergent and
  player-driven — aim for collapse threatening at most ~50% of games. (5 Jun)
- **Multiple visible scoring axes; no player realises on round 3 they can't win.** A telegraphed
  endgame everyone sees coming, and a two-axis legacy (what you discovered × how you did it) so
  different playstyles are all viable. (5 Jun)
- **The game is balanced across player counts** (sim `--matrix`): the standard mix holds across
  3/4/5 players (2p a touch easier, 6p a touch harder, both work). Recommended config in
  `sim/best-config.json` / `sim/RESULTS.md`. (10 Jun)

## Process & craft (how we design)

- **Prefer the smallest rule set** that delivers the experience; add a mechanic only when a playtest
  proves it is needed. (5 Jun)
- **Let the theme live in the decisions**, not just flavour text on components. (5 Jun)
- **Every mechanic must be narratively explicable** — co-design mechanics and story; when they
  disagree, fix the rule. (5 Jun)
- **Accessibility — never make a player feel stupid.** Surface decision intuitive and thematic;
  tactical depth opt-in; failures read as drama, never exposed optimisation. (5 Jun)
- **Prefer mechanisms that carry the narrative without bookkeeping** — make complexity visible and
  self-tracking (on a card, resolved in one sitting) before adding tokens or counters. (5 Jun)
- **Bring real board-game design knowledge** — comparable games, common pitfalls, genre mechanics;
  Drew is a first-time designer and wants this. (5 Jun)
- **Prototype paper-first** for the core loop's _feel_; build the JSON + renderer pipeline only once
  the core survives first contact and we're iterating on content/numbers. The renderer uses Drew's
  stack (**TypeScript + React + MUI + Vite**) and generates printable components from JSON — it is
  _not_ a playable game. (5 Jun)

---

# PART III — HARD BOUNDARIES (the DON'Ts)

- **No Pandemic-style dead stop** — never an automatic buzzer that ends the game and erases effort
  two turns from glory. Collapse is a mode-flip, not game-over. (5 Jun)
- **Don't make "how you treat history" the spine.** It is one pillar of several. (5 Jun)
- **No catch-up mechanics that feel patronising.** (carried from the original design philosophy)
- **Don't let the game routinise into "plan → roll → collect → buy → repeat."** That failure mode is
  exactly what triggered the redesign. (5 Jun)
- **Don't pour content into the renderer before the core loop is proven fun** — ~90% of the first
  content will be thrown away. (5 Jun)
- **Don't drift back into point-salad / accretion** — every idea getting its own subsystem is how v1
  lost its way. (5 Jun)
- **No artefact markets or collections** — no multiple buyers with differing prices, no
  keep-a-Find-for-a-permanent-bonus tableau. The single Sell/Publish decision exists to replace
  these. (5 Jun)
- **No 4th skill and no soldier / muscle profession.** Three skills (Insight / Craft / Grit), three
  professions (Historian / Engineer / Physicist). Danger is owned by the Grit _temperament_. (8 Jun)

---

## Salvaged from the old design (the content bible to mine)

These survive the rebuild and feed the content: the co-discovery fiction/foreword; **real historical
mysteries** as destinations (reward scales with how genuinely unknown the subject is — the mystery
tiers); machine stages gating which eras you can reach; team retirement leaving a permanent legacy.
Source: `archive/game-design.md`.

## Parked for v1 (darlings to re-earn, not delete)

Age-track micro-bookkeeping, two instability types, combo-gated specials, modules-with-sub-rules,
field training, dismissal, the full three-dice system, conspicuousness, intervention "threads",
multi-turn expeditions, Precision/Collimator-as-discretion. Add any back only when a playtest proves
the game needs it.
