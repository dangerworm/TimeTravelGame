# Current Idea — Scratchpad

_Working space for the **one** part of the game under active discussion. Keep this focused on a
single topic at a time. When a topic resolves, fold the conclusion into `core-goals.md` (if it
shifts the spine/targets) or into the eventual design doc, record any new hard preference in
`constraints.md`, then clear this file for the next topic._

---

## Currently working on: **The core expedition loop**

This is the spine (see `core-goals.md`) and the thing we must prototype first. Everything else is
downstream of this being fun.

### The question we're answering

Is choosing **how to crack an expedition** — tactical-puzzle-dominant, with an optional gamble —
genuinely fun, round after round, _and_ welcoming to a player who's there for the story?

### The model so far

A jump is really an **expedition**: a chain of small interventions the historians have plotted
across time so the timeline stays consistent. It is presented as **one card with a left-to-right
path of 2–4 steps**, resolved in a single turn. Dependencies live _on the card_ (visible), not in
tracked tokens.

- **Two kinds of step:**
  - **Inert** (translate, decipher, survive) — pure skill check. Falling short costs you that
    step's slice of reward; the timeline is untouched.
  - **Intervention** (you change something) — opens a **thread**, drawn as a bracket to a later
    step that must _close_ it.
- **Your team is the toolkit.** Each member carries capability symbols in a few types (working
  set: Insight / Craft / Nerve). You assign travelling members across steps; one member works one
  step per expedition. Machine stage caps how many travel.
- **Risk = unclosed threads.** The shared **Timeline Integrity** track only drops when a thread
  snaps (a closing intervention fails). Inert shortfalls never damage history.
- **Overclock = a reputable retry.** When a closing step is about to fail, rewind and try again to
  protect the timeline. The risk is purely _mechanical_ (machine overheats / runs a resource
  dry → instability on the machine), not ethical. Overclocking to save history is the responsible
  move under strain.
- **"Not pre-solvable" lever, era-flavoured:** well-recorded eras → the unknown is a **twist that
  bends a visible step** ("not quite what we found in planning"); lost-record eras → a genuinely
  **hidden step**. Same card structure, different flavour.
- **Historians' role falls out of this:** see further down the path (fewer hidden steps),
  pre-close threads via observation, or **convert an intervention step into an inert one** (get
  the prize without changing history — the observe-don't-disturb / respect path).

### Decisions made

- ✅ The core texture (assign specialists to overcome a sequence of obstacles, push your luck when
  short) excites Drew — this is the right spine. (5 Jun)
- ✅ Adaptation is **era-flavoured**: twist-on-visible-step in well-recorded eras; hidden-step in
  lost-record eras. (5 Jun)
- ✅ Timeline damage comes **only from unclosed intervention threads**, never from inert
  shortfalls. (5 Jun)
- ✅ Overclock is a **mechanical-risk retry to protect history**, and is _reputable_, not greedy.
  Machine strain, not ethical cost. (5 Jun)
- ✅ Two new governing laws codified: **narrative coherence** and **accessibility** (see
  `core-goals.md` / `constraints.md`). (5 Jun)
- ✅ Capability check is **"right person for the job"**: a step is cleared by assigning ONE member
  whose specialism matches and whose skill tier (•, ••, •••) ≥ the step's tier. **No arithmetic /
  no summing across members.** Depth relocates to scarce-specialist coverage, sequencing, threads,
  overclock timing, and team-building. (5 Jun)
- ✅ **Risk = footprint, not "unfinished change."** _Any_ trace left in the past can ripple (a
  dropped torch, an anomalous footprint), not only deliberate interventions. The earlier "only a
  change you can't finish damages history" principle is **rejected**. (5 Jun)
- ✅ **Lending is narratively derived and planned.** Scientists know each other's teams from
  published papers; during Plan a player may negotiate to borrow a rival's specialist (with that
  player's permission). Loans are arranged at planning time, not mid-expedition. (Terms must be
  designed later so lending doesn't let a leader farm reputation — parked.) (5 Jun)
- ✅ **Cards carry narrative.** Front = a 2-sentence expedition brief (the "why") + the step path;
  back (the published paper) = the richer story + reputation reward. (5 Jun)
- ✅ **Presence always risks a trace (option B).** Success is deterministic when prepared; footprint
  never fully is. Chosen over the leaner "only roll when you push" because it's the more
  narratively honest. (5 Jun)
- ✅ **Success and footprint are separate, and use separate stats.** _Success:_ automatic if the
  assigned member's **Skill** (in the needed specialism) ≥ the step's requirement; if short,
  **overclock** — roll Skill-many dice, pips ≥ requirement to pull it off. _Footprint:_ every
  present step has a **danger** rating (0 = no roll, 1 = exposed, 2 = deep/fragile); roll that many
  dice and sum the **pips = raw imprint**; subtract the assigned member's **Deftness**; leftover =
  the **imprint** left → Timeline Integrity drops. (5 Jun)
- ✅ **Skill ≠ Deftness.** A brilliant scientist can be clumsy (high Skill, low Deftness — cf. Ken
  Robinson's dancing academics). Skill = _can they do the job_; Deftness = _how clean they are
  doing it_. Two small numbers per researcher card. (5 Jun)
- ✅ **Terminology:** the trace left behind is an **imprint** (never "damage"); clumsy work
  **leaks**. Carefulness stat = **Deftness**. Communal track = **Timeline Integrity** (depletes as
  imprints accumulate). _(lean — easy to rename)_ (5 Jun)
- ✅ **Overclock raises the step's danger** (tiredness / "we've done this before" complacency)
  **and adds Machine Instability.** Pushing makes you messier _and_ strains the machine. (5 Jun)
- ✅ **Two dice, same average, different swing.** Die A `0·1·1·1·1·2` (steady) and Die B
  `0·0·1·1·2·2` (volatile — same mean 1.0, **double the variance**). An expedition card names which
  die governs all its rolls; Die B = white-knuckle, feast-or-famine, reserved for volatile/deep
  objectives. Not harder on average — _wilder_. (5 Jun)
- ✅ **No one-step-per-member limit (rejected as un-narrative).** A researcher may work any number
  of steps **in their specialism** on an expedition. Limiter = **fatigue**: each _additional_ step
  a person works takes **−1 Deftness** on that step (rushed, more exposed); Skill is unaffected.
  Bench depth (a 2nd / higher-tier specialist) stays valuable because fresh people work clean.
  _(provisional — testing in Prototype 01)_ (5 Jun)
- ✅ **Travel capacity = 3 for the prototype**; later a machine-stage lever (bigger machine carries
  more people → a concrete upgrade payoff). (5 Jun)
- ✅ **Steps are completed in order; later steps are gated behind earlier ones.** You can't skip a
  step to reach the prize. Failing a gate ends the expedition there (keep what you banked). (5 Jun)
- ✅ **Reward lives at the objective** (the final/prize step). Intermediate steps are obstacles,
  only occasionally carrying a minor bonus. _(Parking lot: could a step ever yield its own paper?
  Later.)_ (5 Jun)
- ✅ **Overclock bridges the gap, using Skill-many dice.** Roll dice = the member's Skill; need pips
  **≥ the shortfall** (requirement − Skill), not ≥ the full requirement. Your Skill isn't wasted;
  short-by-one is easy, short-by-two is nasty. Overclock still adds danger +1 and Instability +1.
  (5 Jun) _(supersedes the "pips ≥ requirement" wording in prototype-01)_
- ✅ **Footprint is damage, not a check.** Leftover pips (raw − Discretion) ARE the imprint that
  drops Timeline Integrity; there's nothing to "pass." (5 Jun)
- ✅ **Fatigue reworded:** "a person juggling many tasks is more likely to leave a trace" (−1 to the
  carefulness stat per additional step). Applies generally, not only when overclocking. (5 Jun)
- ✅ **"Deftness" → "Discretion"** (confirmed): how little evidence you leave; −1 per additional
  step worked (spread thin = less discreet).
- ✅ **Overclock is hard-capped at +1 above Skill.** You may only attempt a step within 1 of your
  Skill; short by 2+ is impossible by overclock — you need the right specialist (or to borrow one).
  Encodes "a car mechanic can't fix an industrial generator by retrying." The rejected
  "bridge-the-gap / pips ≥ shortfall" model is **reverted**. (5 Jun)
- ✅ **Overclock +1 stretch = "reliable stretch" (~60%): roll Skill+1 dice, pips ≥ requirement.**
  Tension lives in the cost (danger +1, Instability +1), not the odds; the +1 cap keeps
  team-building meaningful; the **rewind** makes "several attempts" coherent for every task type.
  Calibration lever is the cost, not the success rate. (5 Jun)
- ✅ **A clean run survives overclocking.** Machine strain ≠ a trace on history; if total imprint
  is 0 the run is clean and scores the bonus. Rewards building discreet operatives. (5 Jun)

> **── CORE EXPEDITION LOOP: VALIDATED (playtest, Exps 1–2, 5 Jun) ──**
> The assign → push → footprint decision is tense and fun; the overclock push delivers the
> keystone thrill; twist, fatigue, Discretion, era-capped imprint all pulled their weight. The
> spine is proven on paper. **Note:** this log is chronological — where entries conflict, the
> _later_ one wins (e.g. risk = footprint supersedes "only unfinished changes"; reliable-stretch
> supersedes bridge-the-gap; Discretion supersedes Deftness).
>
> **NEXT TOPIC — the wrapper around the expedition** (Drew's three questions, 5 Jun):
>
> 1. How much of the v1 structure comes back? (turn phases, planning, develop, shop, endgame)
> 2. Machine Instability lifecycle — what it does, how it's cleared, how it bites.
> 3. The table layer — what others do; downtime; the shared timeline; collapse pressure.

### Wrapper decisions (5 Jun)

- ✅ **Turn shape = staging.** Your turn: **Execute** (resolve the expedition staged last turn — the
  dice) → **Develop** (bank rep/spoils, repair instability, hire/upgrade) → **Stage** (pick & prep
  next expedition, assign team, broker loans). You prep during others' turns → minimal downtime.
- ✅ **Turn 1: seeded starter expedition.** Everyone begins with a gentle Recent-era, low-danger
  first jump (the garage/marble/thumb-portal). Turn 1 = execute(starter) → develop → stage(next).
  Uniform rhythm from the start, a productive + teaching first turn.
- ✅ **Consequence deck returns — reframed.** Trigger: an expedition that **leaves an imprint** →
  draw 1 consequence, resolve now (clean runs draw nothing). **Two layers:** Integrity track = slow
  march to collapse; consequence card = immediate material ripple. **Effects must MATTER** (not the
  v1 ±1 noise): resource scarcity, an era's danger rising, a rival's plan disrupted, opportunities,
  occasional boons. **Severity scales with era depth.** Mixed valence; can target active / others /
  all / conditional (reuse v1 targeting). Natural home for the real-history flavour. (Frequency
  control = only imprinting expeditions draw.) (5 Jun)
- ✅ **Machine Instability = a debt you pay, not a meter that drains.** Doesn't self-cool; repaired
  by spending spoils or a Reliability Engineer (competing with growth); bites by adding danger to
  your jumps as it climbs; breakdown at the cap. The push-your-luck cost lives here. _(numbers
  TBD)_ (5 Jun)
- 🅿️ **Parking lot:** a v1-style "React" (adjust your staged plan if the world changed before you
  execute, at a cost) could live in the Execute step — don't build yet.
- ✅ **Overclock +1 stretch = "reliable stretch" (~60%): roll Skill+1 dice, need pips ≥ requirement.**
  Chosen over the long-shot (~25%). _Justification (narrative):_ overclock is the **rewind** — the
  team gets several runs at the step, approaching differently each loop — which makes "repeated
  attempts" coherent for _every_ task type, not just mechanical ones. _Justification (design):_
  tension lives in the **cost** (danger +1, Instability +1) not in the odds; the +1 cap keeps
  team-building meaningful. **Calibration watch:** the balancing lever is now the cost (instability
  accrual, breakdown threshold, raised-danger footprint), NOT the success rate — make sure each
  push visibly bites. (5 Jun)
- ✅ **Imprint per expedition is capped by era depth:** Recent 1, Modern 2, Early-Modern 3,
  Medieval 4, Ancient 5, Prehistoric 6. A single expedition can't tank the timeline; deep eras are
  scarier because the cap is higher. (5 Jun)
- ✅ **Integrity pool & per-era caps must scale with player count** so one round can't collapse the
  timeline (Drew's 5-player check). Calibrate later. (5 Jun)
- 🔶 **Conspicuousness (party size)** — candidate rule: a larger party is harder to hide, so
  capacity raises the ceiling but lean teams are stealthier. Test whether clean runs feel too clean
  before adding. (5 Jun)

### Open questions to resolve

- Exact Integrity cost per leftover blank; exact Instability per overclock; how Instability is
  cleared; how a snapped thread (deliberate, visible footprint) differs from an ambient fumble.
  _(later)_
- Danger ratings per era (does deep-era baseline danger stack with step danger?). _(later)_
- How exactly does a player **close a thread** — same capability type as opening it? A specific
  resource? A later step that the bracket points to?
- What does **overclock** cost and roll, concretely, on paper? Where does machine instability
  live and how is it cleared?
- How does an expedition **end well or badly** — what's full vs. partial reward, and what does a
  snapped thread actually do beyond dropping integrity?
- Keep the whole expedition to **one turn**? (Parking-lot: do big late-game expeditions ever span
  turns? Don't chase now.)
- Minimum viable paper version: how few steps/types/members still produce an interesting,
  welcoming decision?

---

_Parking lot (capture stray thoughts here so we don't lose them, but don't chase them now):_

- Do large/late expeditions ever span multiple turns, or always resolve in one? (Default: one.)
- Sell-vs-publish (cash vs. respect) likely folds into the intervention-vs-observe choice on a
  step — confirm later.
