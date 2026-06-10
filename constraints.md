# Constraints — Explicit Do / Don't

_Hard boundaries Drew has stated. Treat these as fixed unless Drew explicitly relaxes them._ _Add a
dated line whenever Drew states a new preference. Newest at the bottom of each section._

---

## DO

- **Make the jump a tactical puzzle first.** Information largely visible; players out-think the
  destination. The gamble (push-your-luck) is an _optional_ layer on top, not the default mode. (5
  Jun 2026)
- **Keep the overclock / push-your-luck thrill** somewhere in the design. (5 Jun 2026)
- **Keep the team-legacy feeling** — brilliant minds building on your discovery — and the
  retirement-leaves-a-legacy payoff. (5 Jun 2026)
- **Make collapse emergent and earned** — driven by the table's aggregate greed, threatening at most
  ~50% of games. (5 Jun 2026)
- **Design for 4–5 players** (Drew's husband + 2–4 friends) as the primary target. (5 Jun 2026)
- **Prefer the smallest rule set** that delivers the experience; add a mechanic only when a playtest
  proves it is needed. (5 Jun 2026)
- **Let the theme live in the decisions**, not just in flavour text on components. (5 Jun 2026)
- **Bring real board-game design knowledge** — comparable games, common pitfalls, genre mechanics.
  Drew is a first-time designer and wants this. (5 Jun 2026)
- **Prototype paper-first** for the core loop's _feel_; build the JSON + renderer pipeline only once
  the core survives first contact and we're iterating on content/numbers. (5 Jun 2026)
- **Prototyping tooling uses Drew's stack:** TypeScript + React + MUI + Vite. The tool generates
  printable components from JSON content; it is _not_ a playable game. (5 Jun 2026)
- **Every mechanic must be narratively explicable.** If we can't explain _why_ the game works that
  way in the fiction, it isn't believable enough to emotionally invest in. Mechanics and narrative
  are co-designed; neither is bolted onto the other. When a rule and the story disagree, fix the
  rule. (5 Jun 2026)
- **Accessibility — never make a player feel stupid.** The game must welcome players who come for
  the roleplay and the emotional experience, not the optimisation. Keep the _surface_ decision
  intuitive and thematic ("who do I send to face this?"); make tactical depth _opt-in_, layered on
  top, never required to participate or to feel good. Failures must read as drama ("the river
  flooded"), never as "you did the maths wrong." No mechanic should publicly expose one player's
  poor optimisation to the table's judgement. (5 Jun 2026)
- **Prefer mechanisms that carry the narrative without bookkeeping.** When the story implies
  something complex (e.g. chains of dependent changes across time), look first for a way to make it
  _visible and self-tracking_ (e.g. on a card, resolved in one sitting) before adding tokens or
  counters. (5 Jun 2026)
- **Keep the Record-vs-Take prize fork fiction-gated, never universal.** A prize offers a take/copy
  choice _only_ where the fiction supports it (doomed or removable artifacts); pure-knowledge prizes
  are Record-only. Forcing a take-or-copy decision on every objective would double each card's
  surface and drown the tactical puzzle in a repeated meta-choice — that is the v1 accretion ghost.
  (5 Jun 2026)
- **Reputation only ever comes from a researcher's work** — Recording in the field or Publishing a
  Find at the desk. No mechanism grants reputation without a team member doing the work; this makes
  the team-legacy keystone literal. (5 Jun 2026)
- **A Find converts by Sell XOR Publish, never both by default.** The exclusive choice (Cash now vs.
  Reputation) is the economy's core tension; "both" is a parked premium, never the default. (5
  Jun 2026)
- **The team is the action economy — don't add abstract action points.** Each turn a researcher is
  assigned to field _or_ desk; that single labour pool drives both expeditions and publishing. (5
  Jun 2026)
- **Minimal arithmetic — at most one small sum, across a single set of cards, to resolve a step.**
  Adding a few chip values to clear an obstacle is fine; what's banned is carrying several running
  totals across decks/tokens/tracks in your head at once. Failure still reads as drama, never "you
  did the maths wrong." _Relaxes the earlier "no arithmetic / no summing" stance — summing chips is
  the v3 resolution engine._ (8 Jun 2026)
- **The expedition stays a fixed, visible puzzle; the chaos lives in your draw, not the world.**
  Keep the era card with its printed steps + requirements; players solve **the hand of skill chips
  they drew** against a legible challenge — engine + chaos, with a bit of tactical puzzle kept and
  "info largely visible" intact. (Don't make the expedition itself a face-down deck — it decouples
  difficulty from reward.) (8 Jun 2026)
- **One mechanical triad: skills (Insight / Craft / Grit) are the currency; profession is flavour +
  gating.** Steps require skills; professions (Historian / Engineer / Physicist) tell the story of a
  researcher's spread and gate some steps — never a second currency. Knowledge gates are
  profession-locked; danger is an open Grit check. (8 Jun 2026)
- **Grit is a temperament, not a profession — no soldier / muscle / tank type.** Bravery is a
  quality any scientist can have (the scientist-adventurer); the brave ones spike Grit. Keeps the
  "scientists, not soldiers" anchor — a combat type would turn the co-discovery team into a
  mercenary crew. (8 Jun 2026)
- **Resolution is a per-expedition bag-builder (Option B).** Each jump, pick a roster up to machine
  **Capacity**, build a one-shot bag from their pips + a permanent **player base (2/2/2, provisional)** +
  one **Trace per instability token**; draw `2 × researchers-on-expedition + 2`. The bag is rebuilt every
  jump (not persistent); "who do I send?" stays a live decision. Full ruleset in `design-skeleton.md`.
  (9 Jun 2026)
- **Overclock's cost is personal and persistent.** Overclock = +1 instability token **and** +1 Trace
  card (1:1); Traces dilute every future bag until an engineer clears the tokens. Instability is a debt
  you pay, capped by the **Stabiliser** (shutdown forces a cash-out — never an unbounded brick). (9 Jun
  2026)
- **Experience grows all three skills** (+1 per blue box, max +2 each) — veterans rise uniformly and
  keep their spike. Paper-writing lives in **Develop**. (9 Jun 2026)
- **Timeline collapse is a one-round "Unravelling" fuse, never a cold game-over.** Integrity 0 triggers a
  final round (each player one more turn; settle affairs, or attempt a last Many Worlds escape) then
  scoring. The overclock deterrent lives in the **personal** costs (Trace pollution, shutdown,
  consequences, engineer drag), not the shared track. Keystone #3 honoured. (9 Jun 2026)
- **Home actions are one per researcher, not one per turn.** Each teammate not in the field takes one
  Develop action (write a paper · upgrade a module · clear instability). Team size therefore drives home
  productivity as well as field strength. _(9 Jun 2026, balance-sim confirmed.)_
- **Experience shows 3 boxes, but the first is always pre-filled** — so only **2 are earnable** (the +2
  pip cap above). Purely so a researcher always looks like they carry some experience; no extra gate, no
  effect on game length. _(9 Jun 2026.)_
- **The machine starts at Amp 2** — Recent _and_ Modern reachable from turn one. Starting at Amp 1 left
  even the boldest player crawling in Recent for ~4 rounds before the game opened up, then rushing the
  middle eras ("suddenly thrust into the end-game"). Amp 2 removes the dead opening at negligible balance
  cost; Recent becomes the optional gentle on-ramp, not a forced tier. _(9 Jun 2026, balance-sim
  confirmed — Experiment A.)_
- **The Stabiliser starts at 2, so overclock is a genuine gamble.** At Stab 2 a carried-over instability
  plus one push for the objective can trip a shutdown. The danger should **concentrate in the player who
  keeps pushing** (sim: the reckless archetype bricks ~2–3×/game while careful players almost never do),
  not spread evenly across the table. _(9 Jun 2026, balance-sim confirmed.)_
- **The game should be winnable but never a foregone conclusion — aim for ~75% of tables reaching Many
  Worlds** (revised down from an initial 80% gut figure). Roughly a quarter of tables should fall short or
  collapse, so the win means something. _(9 Jun 2026.)_
- **An artefact is Cash XOR legacy — Sell _or_ keep-for-points, never both (Model B).** Selling pays Cash
  now and **forfeits** every end-game point the artefact would have scored — its paper's Reputation if
  Published, or **1 point** if held unresearched (scoring per `design-skeleton.md` §9). _Considered
  allowing a paper **and** a sale ("both", real-life style); rejected — free Cash + free Reputation
  collapses the cash-vs-legacy tension that is the economy's spine._ (9 Jun 2026)
- **Sell disrepute scales with the find's significance, and doomed artefacts sell clean.** Selling a
  **non-doomed** artefact costs **`max(1, floor((rep − 1) / 2))` Reputation**, where `rep` is the
  artefact's **printed Reputation value** (the find's significance, not the publishing historian's
  output) → 1 for rep 2–4, 2 for 5–6, 3 for 7–8, 4 for 9–10. Flogging a treasure stings more than a
  trinket, while disrepute stays well below the paper value so **Sell remains the cash-desperate lifeline,
  never a trap**. **Doomed artefacts have 0 disrepute** — clean to grab _and_ clean to sell (the same
  doomed exception as the plunder Integrity-scar). (10 Jun 2026)
- **Spoils (Cash) appear only on the _second-to-last_ step of an era card.** Every earlier step is a
  **pure gate that pays nothing**; the penultimate step holds the one cash "find," the last step holds the
  objective (rep/artefact). You **can't get rich bailing after 1–2 steps** — you must climb almost the
  whole ladder to bank anything, then choose whether to gamble the final objective. _(Sharpens the
  push-your-luck to one real cash-out point; revises the earlier "escalating banked finds" shape — update
  `core-goals.md`.)_ (10 Jun 2026)
- **Deep eras are long ladders of _gentle_ gates, not short brutal walls.** Ancient / Prehistoric cards
  have **more steps but low, flat per-step requirements** (plus the odd Grit danger spike); the challenge
  is the **length of the climb and the final gamble**, not each step being a wall. _Narrative:_ civilised
  eras gate on political / social control — security, secrecy, power — that didn't exist deep in time,
  where the difficulty is instead the long, blind search through near-nonexistent records. Step bands
  ≈ **2–3 / 3–4 / 5–6** by era pair, requirements re-tuned to keep deep objectives reachable. (10 Jun 2026)
- **Expedition resolution is a refill-each-step deck draw, not a one-shot depletion.** At the start of
  **every step** you top the hand back up to **`2 × roster + 2`**, reshuffling the discard (played cards +
  traces) when the deck runs dry; overclock draws beyond the cap. _Corrects a 10 Jun discovery: the
  written spec and the sim had the hand drawn **once** and depleted across the whole expedition — **not**
  the intent, and the reason deep multi-step cards looked impossible. The earlier v3 "bag = stamina / no
  reshuffle" line is **dropped**; stamina now lives in accumulating **Trace pollution + instability toward
  shutdown**._ The **`+2` is load-bearing** — at `[2×roster]` the sim shows deep completion cratering and
  constant folding. (10 Jun 2026)
- **Many Worlds is the win-rate brake: a 6-step × 4-pip gauntlet.** Tuning MW difficulty (not the era
  economy) is how we hold the win rate near ~75% without making the deep ladders unreachable. Full
  recommended config lives in `sim/RESULTS.md`; the cost of the gentle-ladder design is a **long game
  (~13 rounds)**, knowingly accepted for the deep-era escalation. (10 Jun 2026)
- **Plundering a non-doomed artefact scars the timeline — the shared half of the greed dial.** Taking a
  non-doomed artefact costs **Timeline Integrity**, era-scaled `[1,1,2,2,3,3,4]` (Recent→Many Worlds;
  deeper finds scar more); **doomed artefacts grab clean** (no scar, no disrepute — the same doomed
  exception as disrepute). The field choice is **Record** (clean Reputation now) vs **Plunder** (take it,
  scar now, then at the desk **Publish** for Reputation _or_ **Sell** for Cash). This is what makes a
  greedy table's collective plundering bend the timeline toward collapse — sim: greedy-heavy tables
  collapse ~35–43% vs balanced-heavy ~20%, so the ethical axis is now mechanical, not just fiction. The
  three archetypes plunder very differently (greedy ~1.2/game, balanced ~0.5, cautious ~0.1). (10 Jun 2026)
- **The game is balanced across player counts (sim --matrix).** Standard mix holds Many Worlds ~79–84%
  with collapse ~16–24% across **3/4/5 players**; 2p plays a touch easier, 6p a touch harder, both still
  work. Recommended config: integrity 16, MW **5 steps × 4 pips**, failed-MW −1. (10 Jun 2026)

## DON'T

- **No Pandemic-style dead stop** — never an automatic buzzer that ends the game and erases effort
  two turns from glory. Collapse must be a mode-flip, not game-over. (5 Jun 2026)
- **Don't make "how you treat history" the spine.** It is one pillar of several. (5 Jun 2026)
- **No catch-up mechanics that feel patronising.** (carried from original design philosophy)
- **Don't let the game routinise into "plan → roll → collect → buy → repeat."** That failure mode is
  exactly what triggered the redesign. (5 Jun 2026)
- **Don't pour content into the renderer before the core loop is proven fun** — ~90% of the first
  content will be thrown away. (5 Jun 2026)
- **Don't drift back into point-salad / accretion** — every idea getting its own subsystem. That is
  how the first version lost its way. (5 Jun 2026)
- **No artifact markets or collections.** No multiple buyers (museum vs. collector vs. auction with
  differing prices) and no keep-a-Find-for-a-permanent-bonus tableau. These are the v1-style
  elaborations the single Sell/Publish decision exists to replace. (5 Jun 2026)
- **No 4th skill and no soldier / muscle profession.** Three skills (Insight / Craft / Grit), three
  professions (Historian / Engineer / Physicist). Danger is owned by the Grit _temperament_, not a
  new type. (8 Jun 2026)

---

## Theme anchors (softer, but Drew cares)

- Players are **scientists, not thieves**. Peers who co-discovered something extraordinary.
- The fantasy is movie-excitement-level, not documentary-realism — but choices should be rewarded or
  punished roughly as they would be in real life.
- Real historical mysteries are the destination content; reward scales with how genuinely unknown
  the subject is.
