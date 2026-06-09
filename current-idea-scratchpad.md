# Current Idea — Scratchpad

_Working space for the **one** part of the game under active discussion. Keep this focused on a
single topic at a time. When a topic resolves, fold the conclusion into `core-goals.md` (if it
shifts the spine/targets) or into the eventual design doc, record any new hard preference in
`constraints.md`, then clear this file for the next topic._

---

> **── 📕 9 Jun 2026: the whole game is now captured in `design-skeleton.md` (v4).** Drew's
> post-whiteboard session with Andy folded the loop, machine, economy, experience, endgame and scoring
> into one skeleton. The bag-builder resolution is **Option B** (pick a roster up to Capacity, build a
> one-shot bag, draw `2×roster+2`); footprint = **Trace cards** (1:1 with instability, engineer-cleaned).
> The long v3/v2 log below is **retained for rationale** but superseded by the skeleton. **The single
> active topic is now the one below.**

## Last resolved (9 Jun): **Timeline-collapse peril — the "Unravelling" fuse**

The skeleton makes **Integrity 0 = game over**. Drew flagged the concern himself: he wants the
**peril** (overclocking mustn't be free, players mustn't overclock every time) but **not** the
Pandemic-style dead-stop (it breaks keystone #3) and **not** a trailing-player table-flip lever.

**The reframe (Claude, 9 Jun):** the *personal* overclock costs already do the anti-overclock job —
compounding Trace pollution, run-ending shutdown, consequence draws, engineer drag. A *shared* bar is a
weak individual deterrent anyway (tragedy of the commons). So the bar is free to do **collective drama**
without being a buzzer. Candidates:

- **(a) "Unravelling" fuse — lead recommendation.** Integrity 0 triggers **one final round** at max
  peril (collapse flavour firing); the only clean escape is completing a **Many Worlds** jump; then the
  game ends and everyone scores. Restores the mode-flip keystone in one rule; peril intact; spite-flip
  no better than the legitimate "rush the ending" lever (game always ends on **score**, not auto-win).
- **(b) Wind-down round** — Integrity 0 → one last turn each → score. (a) minus the escape framing.
- **(c) Cut the shared bar entirely** — peril is purely personal; collapse is consequence-card flavour;
  game ends only via Many Worlds. Cleanest, loses collective dread + the collapse ending.
- **(d) Low integrity sabotages the *win*** — a frayed timeline can't be safely opened, making Many
  Worlds harder/impossible. Greed denies the good ending without a buzzer.

**✅ Resolved (9 Jun 2026): option (a), the "Unravelling" fuse.** Drew's reasoning: the personal
overclock punishment is deterrent enough, and a final round lets players get their affairs in order
before scoring — or, if they're close, ally for one last Many Worlds attempt. Folded into `core-goals.md`
(keystone #3 reconciled) and `design-skeleton.md` §9. **No active topic — pick the next one when you
return** (candidates: numbers / early-game calibration; the small open mechanics in `design-skeleton.md`
§10).

---

## (Superseded, retained for rationale) The core expedition loop

This is the spine (see `core-goals.md`) and the thing we must prototype first. Everything else is
downstream of this being fun.

> **── ⚠️ v3 CORE-RESOLUTION REDESIGN (8 Jun 2026) ── READ THIS FIRST.** A **real-human playtest**
> (Drew + Andy + Rikki) found the v2 expedition loop **dull**: the expedition was _pre-solved at
> Staging_ (assign the obvious specialist, then Execute just confirms it), so most jumps had one
> die-roll of drama and otherwise played themselves. Andy wanted **more chaos** and expected a
> **deck-builder** (Moonrakers); Drew agreed. We rebuilt the **core resolution mechanic** from a
> deterministic assignment puzzle into a **chip / bag-builder draw**. The v2 decision log below
> still stands for everything _around_ the resolution — the economy, reward shape (banked /
> back-loaded / cash-out), Record-vs-Take, the machine tracks, shop, retirement, consequence deck —
> but the **"assign one member whose Skill ≥ req, no summing" core is SUPERSEDED** by the model in
> this section.

### v3: the expedition as a chip-draw mini-game (8 Jun 2026)

**The shape.** The expedition stays the **fixed, visible v2 puzzle** — an era card with a
left-to-right path of steps, each printing a requirement. What changes is _how you clear a step_:
not by assigning a matching specialist, but by **drawing skill chips and spending them.** The chaos
lives in **what you draw**, not in the world — so the puzzle stays legible (engine + chaos, with a
bit of tactical puzzle kept; info largely visible retained). _(Rejected en route: making the
expedition itself a face-down deck you flip per step — it decouples reward from difficulty, so a
hard expedition could be one flip and an easy one ten. Killed.)_

- ✅ **Researchers are chip sources, not step-keys.** Every researcher card prints pips in **all
  three skills** (Insight / Craft / Grit) as a **spiky spread** (high in their thing, ~1 elsewhere).
  A pip = one **single-skill chip** (the **2×1** model — uniform chips, box needs only 3 chip
  types).
- ✅ **You build a fresh bag per expedition from who you send.** At Stage you declare the away-team
  (capped by machine **Capacity**) and pool the chips matching their pips. This is a **bag-builder
  (Quacks of Quedlinburg), not a persistent deck** — rebuilt each expedition, low admin (chips, only
  3–5 people). "Who do I send?" returns as a real recurring decision — but now it shapes your
  _odds_, not a deterministic key-match. _Spreads must stay spiky or this decision goes soft._
- ✅ **Draw a hand = 2 chips per researcher going** → **Capacity = away-team size = hand size**
  (this finally pins down what Capacity _does_). **The hand is visible** = your legible floor:
  glance at the steps and you _know_ what you can clear cleanly. Risk stays readable because you
  know your bag's composition (Quacks-style).
- ✅ **Resolve steps left→right: discard matching-skill chips summing ≥ the requirement** to clear a
  step. This is what the **relaxed maths law** unlocks (one small sum, one skill, per step — see
  `constraints.md`). Finds bank Cash; the objective holds the Paper (reward shape unchanged).
- ✅ **Press-your-luck = "press on or cash out" at each gate**, exactly as the banked/back-loaded
  reward shape wants. Can't cover the next step? **Overclock = draw 2 more chips, +1 Instability**,
  gambling the draw turns up the skill you need. Won't or can't → expedition ends, keep what's
  banked.
- ✅ **No reshuffle mid-expedition — the bag is your stamina.** A finite draw pool means pushing
  deep physically runs you low; team _size_ becomes a depth limit alongside the machine's
  Era-access. A bigger team reaches deeper.
- ✅ **(a) Identity on board, anonymous chips in the bag.** Researchers live as **identity cards**
  on the player board (Team area) for growth / retirement / legacy; they _feed_ anonymous skill
  chips into the bag. Clean separation, two component types. **Grow-by-use = add a pip** (one more
  chip); **retire = remove the person** (their chips never come again) + the legacy draw. _(Note:
  the earlier "retirement = thin your deck" flourish is moot — the bag is rebuilt per expedition,
  not persistent.)_

**One mechanical triad — skills are the currency; profession is flavour + gating (8 Jun):**

- ✅ **Skills (Insight / Craft / Grit) are the only currency; steps require skills.** The
  **profession** (Historian / Engineer / Physicist) is the _story_ of a researcher's spread + a
  **gating** lever — it is **not** a second currency. (Killed the muddle of two unaligned 3-way
  classifications.)
- ✅ **Knowledge gates are profession-locked; danger is open.** Some steps **gate** on a profession
  — "decipher the inscription" → Historian; "rig the mechanism" → Engineer; "solve the temporal
  anomaly" → Physicist — only the right mind unlocks them. **Danger steps gate on no one** — open
  **Grit** checks anyone brave can answer. _Not everyone can read Linear B; anyone can be brave._
- ✅ **Grit is a temperament, not a profession — no soldier / muscle / tank type.** Bravery is a
  quality any scientist can have; the adventurous ones spike Grit (the scientist-adventurer —
  Indiana Jones, Daniel Jackson). Keeps the **"scientists, not soldiers"** theme anchor intact (a
  combat type would quietly turn the co-discovery team into a mercenary crew). Optional spice: a
  **"Field-hardened" trait** tag on some cards to make Grit pop, cross-profession.
- ✅ **Three professions:** **Historian** (Insight — languages / period / records), **Engineer**
  (Craft — building / blueprints / the machine), **Physicist** (Insight, hard-science flavour —
  gates temporal / anomaly steps; distinguished from Historian by _what it gates_, not a separate
  currency).

**Now OPEN (the v3 redesign reopened these — re-resolve before re-spec'ing the prototype):**

- ❓ **Footprint / imprint → Timeline Integrity in the chip model.** v2's "roll danger dice,
  subtract Discretion" is now unanchored. How does presence leave a trace when resolution is chips,
  not dice? (Candidates: a cost paid in chips / instability, or a separate footprint draw. TBD.)
- ❓ **Fate of Discretion, Die A / Die B, danger ratings, fatigue.** Discretion was the footprint
  mitigator; fatigue was −1 Discretion per extra step (and one-member-per-step is gone). All hang on
  how footprint is rebuilt — several v2 stats likely collapse.
- ❓ **How Field / Desk / Workshop spend chips** — does home labour draw from the same hand/bag as
  fieldwork? (Earlier instinct: a chip spent at the Desk/Workshop isn't in your field hand — the
  labour-pool tension survives _through_ the bag. Confirm.)
- ❓ **Numbers:** requirement magnitudes vs hand size vs bag size, so the overclock-draw bites
  without being routine. Paper calibration.

### The question we're answering

Is choosing **how to crack an expedition** — tactical-puzzle-dominant, with an optional gamble —
genuinely fun, round after round, _and_ welcoming to a player who's there for the story?

### The model so far

A jump is really an **expedition**: a chain of small interventions the historians have plotted
across time so the timeline stays consistent. It is presented as **one card with a left-to-right
path of 2–4 steps**, resolved in a single turn. Dependencies live _on the card_ (visible), not in
tracked tokens.

- **Two kinds of step:**
  - **Inert** (translate, decipher, survive) — pure skill check. Falling short costs you that step's
    slice of reward; the timeline is untouched.
  - **Intervention** (you change something) — opens a **thread**, drawn as a bracket to a later step
    that must _close_ it.
- **Your team is the toolkit.** Each member carries capability symbols in a few types (working set:
  Insight / Craft / Nerve). You assign travelling members across steps; one member works one step
  per expedition. Machine stage caps how many travel.
- **Risk = unclosed threads.** The shared **Timeline Integrity** track only drops when a thread
  snaps (a closing intervention fails). Inert shortfalls never damage history.
- **Overclock = a reputable retry.** When a closing step is about to fail, rewind and try again to
  protect the timeline. The risk is purely _mechanical_ (machine overheats / runs a resource dry →
  instability on the machine), not ethical. Overclocking to save history is the responsible move
  under strain.
- **"Not pre-solvable" lever, era-flavoured:** well-recorded eras → the unknown is a **twist that
  bends a visible step** ("not quite what we found in planning"); lost-record eras → a genuinely
  **hidden step**. Same card structure, different flavour.
- **Historians' role falls out of this:** see further down the path (fewer hidden steps), pre-close
  threads via observation, or **convert an intervention step into an inert one** (get the prize
  without changing history — the observe-don't-disturb / respect path).

### Decisions made

- ✅ The core texture (assign specialists to overcome a sequence of obstacles, push your luck when
  short) excites Drew — this is the right spine. (5 Jun)
- ✅ Adaptation is **era-flavoured**: twist-on-visible-step in well-recorded eras; hidden-step in
  lost-record eras. (5 Jun)
- ✅ Timeline damage comes **only from unclosed intervention threads**, never from inert shortfalls.
  (5 Jun)
- ✅ Overclock is a **mechanical-risk retry to protect history**, and is _reputable_, not greedy.
  Machine strain, not ethical cost. (5 Jun)
- ✅ Two new governing laws codified: **narrative coherence** and **accessibility** (see
  `core-goals.md` / `constraints.md`). (5 Jun)
- ✅ Capability check is **"right person for the job"**: a step is cleared by assigning ONE member
  whose specialism matches and whose skill tier (•, ••, •••) ≥ the step's tier. **No arithmetic / no
  summing across members.** Depth relocates to scarce-specialist coverage, sequencing, threads,
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
  never fully is. Chosen over the leaner "only roll when you push" because it's the more narratively
  honest. (5 Jun)
- ✅ **Success and footprint are separate, and use separate stats.** _Success:_ automatic if the
  assigned member's **Skill** (in the needed specialism) ≥ the step's requirement; if short,
  **overclock** — roll Skill-many dice, pips ≥ requirement to pull it off. _Footprint:_ every
  present step has a **danger** rating (0 = no roll, 1 = exposed, 2 = deep/fragile); roll that many
  dice and sum the **pips = raw imprint**; subtract the assigned member's **Deftness**; leftover =
  the **imprint** left → Timeline Integrity drops. (5 Jun)
- ✅ **Skill ≠ Deftness.** A brilliant scientist can be clumsy (high Skill, low Deftness — cf. Ken
  Robinson's dancing academics). Skill = _can they do the job_; Deftness = _how clean they are doing
  it_. Two small numbers per researcher card. (5 Jun)
- ✅ **Terminology:** the trace left behind is an **imprint** (never "damage"); clumsy work
  **leaks**. Carefulness stat = **Deftness**. Communal track = **Timeline Integrity** (depletes as
  imprints accumulate). _(lean — easy to rename)_ (5 Jun)
- ✅ **Overclock raises the step's danger** (tiredness / "we've done this before" complacency) **and
  adds Machine Instability.** Pushing makes you messier _and_ strains the machine. (5 Jun)
- ✅ **Two dice, same average, different swing.** Die A `0·1·1·1·1·2` (steady) and Die B
  `0·0·1·1·2·2` (volatile — same mean 1.0, **double the variance**). An expedition card names which
  die governs all its rolls; Die B = white-knuckle, feast-or-famine, reserved for volatile/deep
  objectives. Not harder on average — _wilder_. (5 Jun)
- ✅ **No one-step-per-member limit (rejected as un-narrative).** A researcher may work any number
  of steps **in their specialism** on an expedition. Limiter = **fatigue**: each _additional_ step a
  person works takes **−1 Deftness** on that step (rushed, more exposed); Skill is unaffected. Bench
  depth (a 2nd / higher-tier specialist) stays valuable because fresh people work clean.
  _(provisional — testing in Prototype 01)_ (5 Jun)
- ✅ **Travel capacity = 3 for the prototype**; later a machine-stage lever (bigger machine carries
  more people → a concrete upgrade payoff). (5 Jun)
- ✅ **Steps are completed in order; later steps are gated behind earlier ones.** You can't skip a
  step to reach the prize. Failing a gate ends the expedition there (keep what you banked). (5 Jun)
- ✅ **Reward lives at the objective** (the final/prize step). Intermediate steps are obstacles,
  only occasionally carrying a minor bonus. _(Parking lot: could a step ever yield its own paper?
  Later.)_ (5 Jun) — **⚠️ SUPERSEDED by "Expedition reward shape: banked, back-loaded, cash-out"
  below: the objective still holds the bulk, but the path now banks escalating finds.**
- ✅ **Overclock bridges the gap, using Skill-many dice.** Roll dice = the member's Skill; need pips
  **≥ the shortfall** (requirement − Skill), not ≥ the full requirement. Your Skill isn't wasted;
  short-by-one is easy, short-by-two is nasty. Overclock still adds danger +1 and Instability +1. (5
  Jun) _(supersedes the "pips ≥ requirement" wording in prototype-01)_
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
- ✅ **A clean run survives overclocking.** Machine strain ≠ a trace on history; if total imprint is
  0 the run is clean and scores the bonus. Rewards building discreet operatives. (5 Jun)

> **── CORE EXPEDITION LOOP: VALIDATED (playtest, Exps 1–5, 5 Jun) ──** The assign → push →
> footprint decision is tense and fun; the overclock push delivers the keystone thrill; twist,
> fatigue, Discretion, era-capped imprint all pulled their weight. The spine is proven on paper.
> **Note:** this log is chronological — where entries conflict, the _later_ one wins (e.g. risk =
> footprint supersedes "only unfinished changes"; reliable-stretch supersedes bridge-the-gap;
> Discretion supersedes Deftness).
>
> **Exps 3–5 played (the previously-untested core mechanics):**
>
> - **Exp 3 (thread):** a thread you can comfortably close plays as _relief_, not tension — the "you
>   earned this" dividend for good team-building. Threads need a real risk of the closing step
>   failing to carry drama. **Finding banked, not a flaw.**
> - **Exp 4 (hidden + Die B + fatigue):** fatigue-leak read as _story_ ("the tired genius fumbled
>   the delicate part"), not tax. **Big validation:** shared imprint became a _social_ moment — "the
>   timeline damage is everyone's problem; I look round to see who's annoyed by my gamble." Die B
>   spiked but Discretion buffers hid it; volatility barely registered when danger was low.
> - **Exp 5 (overclock under Die B):** surfaced the **tollgate-trapdoor flaw** → led to the
>   banked/back-loaded/cash-out reward model (see its section below). The fix that came out of this
>   is the night's headline.
>
> Two design threads spun out of this play and are captured as their own sections below:
> **Record-vs-Take prize fork** (from Exp 4) and **Expedition reward shape** (from Exp 5).
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
  your jumps as it climbs; breakdown at the cap. The push-your-luck cost lives here. _(numbers TBD)_
  (5 Jun)
- 🅿️ **Parking lot:** a v1-style "React" (adjust your staged plan if the world changed before you
  execute, at a cost) could live in the Execute step — don't build yet.

### Develop & the team-legacy lifecycle (5 Jun)

- ✅ **Develop = spend spoils on three competing jobs:** hire (shop), upgrade machine (capacity /
  era access / instability tolerance / precision), repair instability. One pool; they trade off.
- ✅ **Researchers grow by USE, not a calendar.** Each researcher who _works_ an expedition earns
  experience; bench-warmers don't grow. At thresholds they advance (green→star, +1 Skill or
  Discretion, or a small ability). Replaces v1's 25→70 age track — lighter, and it builds attachment
  (your mainstays become _yours_). (5 Jun)
- ✅ **Retirement = an earned legacy, gated by experience (Drew's fix).** Retire BELOW the threshold
  → nothing, just frees the slot. Retire AT/ABOVE → **draw from the Retirement deck** (random, not a
  menu — story over min-max, and each card explains _how_ the legacy came about). Cards = upgrade /
  boon / reputation / protégé; some are gifts, some are **opportunities with a cost**. The
  investment (many expeditions growing them) IS the price, so it's not a free gamble. Seed content +
  tonal benchmark: `decks/retirement/seed-cards.md`. (5 Jun)
- ✅ **Retirement draw = 2, keep 1** (surprise + a sliver of agency, so an off-fit card doesn't sour
  the send-off). **Reward is flat** — not scaled by investment depth; the rounds spent growing the
  researcher already generated the story, so the card just gives it a punchline. (5 Jun)
- 🅿️ **Parking lot:** retirement timing — voluntary any time, with an eventual experience **cap**
  that forces it (keeps veterans finite, lineage flowing). Don't lock yet.
- ✅ **Overclock +1 stretch = "reliable stretch" (~60%): roll Skill+1 dice, need pips ≥
  requirement.** Chosen over the long-shot (~25%). _Justification (narrative):_ overclock is the
  **rewind** — the team gets several runs at the step, approaching differently each loop — which
  makes "repeated attempts" coherent for _every_ task type, not just mechanical ones. _Justification
  (design):_ tension lives in the **cost** (danger +1, Instability +1) not in the odds; the +1 cap
  keeps team-building meaningful. **Calibration watch:** the balancing lever is now the cost
  (instability accrual, breakdown threshold, raised-danger footprint), NOT the success rate — make
  sure each push visibly bites. (5 Jun)
- ✅ **Imprint per expedition is capped by era depth:** Recent 1, Modern 2, Early-Modern 3, Medieval
  4, Ancient 5, Prehistoric 6. A single expedition can't tank the timeline; deep eras are scarier
  because the cap is higher. (5 Jun)
- ✅ **Integrity pool & per-era caps must scale with player count** so one round can't collapse the
  timeline (Drew's 5-player check). Calibrate later. (5 Jun)
- 🔶 **Conspicuousness (party size)** — candidate rule: a larger party is harder to hide, so
  capacity raises the ceiling but lean teams are stealthier. Test whether clean runs feel too clean
  before adding. (5 Jun)

### Prize: Record vs Take — sell-vs-publish made physical (5 Jun, from Exp 4 playtest)

- ✅ **Each prize step can be claimed up to two ways:** _Record_ (copy/document) → **Paper →
  reputation** (the score), history intact; or _Take_ (remove the artifact) → **spoils** (engine
  fuel), normally a big **intervention imprint** because the record now diverges. (5 Jun)
- ✅ **"Doomed" is a one-bit flag on the destination** that waives the take-imprint: if the object
  burns / is lost anyway, taking it changes nothing, so it's clean _and_ clever. Rewards reading the
  fiction (the Alexandria scroll: why copy what's about to burn? — grab it). (5 Jun)
- ✅ **Fiction-gated, not universal** (constraint added): pure-knowledge prizes (cipher,
  calculation) are Record-only; doomed/removable artifacts are where the fork is live. Avoids
  doubling every card and drowning the puzzle in a repeated meta-choice. (5 Jun)
- ✅ **This consolidates three parked threads into one mechanism:** sell-vs-publish,
  intervention-vs- observe, and "take-don't-copy." Engine-building tension (spoils grow you vs.
  reputation scores) and the ethical dial both fall out for free. Belongs at the centre of the
  **Develop-economy** front when we pick it up (it defines what spoils are _for_). Folded into
  `core-goals.md`. (5 Jun)
- 🅿️ **Parking lot:** can you ever do _both_ (take AND copy)? Default no — you either remove it or
  leave it; that's the fork. Confirm when we build the economy.

### Expedition reward shape: banked, back-loaded, cash-out (5 Jun, from Exp 5 playtest)

This is the **press-your-luck spine**, and it supersedes the earlier "reward sits _only_ at the
objective" line below. Born from the Exp 5 finding: a do-or-die overclock on a _mandatory mid-path
gate_ forfeits everything downstream → reads as a **tollgate-with-a-trapdoor**, not the keystone
thrill, and a winning/cautious player simply won't engage (breaks keystone #1 + accessibility).

- ✅ **Rewards bank along the path and escalate toward the objective.** Steps are either **gates**
  (pure obstacle, no reward) or **finds** (bank a small reward when cleared). Finds grow as you
  descend; the **objective holds the bulk (~40–50% of the expedition's value)**. (5 Jun)
- ✅ **Back-loaded, but _not_ exponential.** Convex-but-gentle (Drew's 1·1·3·4·objective shape), so
  the objective clearly matters yet the banked finds aren't rounding error. True exponential
  re-creates the cliff (losing the final step = near-total loss again). The steepness is the key
  calibration knob. (5 Jun)
- ✅ **Voluntary cash-out is the lynchpin.** Before any step you may **stop and bank everything
  cleared.** _This is what "I wouldn't commit" actually means_ — bank your finds and leave the prize
  on the desk — turning all-or-nothing into a real, non-zero press-your-luck decision. The overclock
  at a gate becomes "push deeper for the growing prize, or cash out my floor?" — keystone thrill
  with a floor that grows as you go. (5 Jun)
- ✅ **Footprint is never refunded.** Imprints left on steps already taken stay even if you cash out
  early — so "was it worth going in?" keeps its weight; a half-run can still scar history for a
  partial reward. (5 Jun)
- ✅ **Reward types split along the path:** intermediate **finds = spoils** (engine fuel —
  "everything you collect is of interest"); the **objective = the Paper** (reputation, the score)
  and the home of the **Record-vs-Take** fork. (5 Jun)
- ✅ **Failing a gate** ends the expedition: keep what's banked, lose everything downstream incl.
  the objective; a snapped intervention thread _additionally_ costs Integrity. (5 Jun)
- 📌 **Finding — overclock placement matters:** an overclock on the _prize/final_ step feels heroic
  (Nuremberg, Exp 2 — "dare I grab it?"); an overclock on a _mandatory middle_ step felt like a
  trapdoor (Lisbon, Exp 5). Back-loaded banking + cash-out resolves this. (5 Jun)

### The Develop economy — Cash, Finds, Reputation, the labour pool (5 Jun)

Headline: **two currencies that never directly convert.** The only bridge is what you do with a
**Find**. Born when Drew rejected "spoils = abstract fuel" on the narrative-coherence law (an
artifact is _sold_ or _studied_; the machine runs on _money_).

- ✅ **Terms:** **Cash** (the currency — runs the machine: materials / energy / maintenance, plus
  hiring & upgrades); **Finds** (physical artifacts/data brought home by Taking — transient, not
  hoarded); **Reputation** (the score, never spent). _"Spoils" is the old name for Cash — sweep the
  docs later._ (5 Jun)
- ✅ **Not accretion:** it's a 1-for-1 swap (spoils → Cash) **plus a single new decision** (sell vs
  publish a Find). One decision carrying the central tension ≠ a new subsystem. (5 Jun)
- ✅ **A Find converts by Sell XOR Publish:** **Sell → Cash** (museum / collector / rival lab);
  **Publish → Reputation** (you researched it). XOR keeps the tension. (5 Jun)
- ✅ **Two-layer prize decision:**
  - _Field (the timeline question):_ **Record** (document, leave it) = no imprint, Reputation,
    publish-only, lower ceiling; **Take** (remove it) = imprint unless doomed, yields a Find (Sell
    or Publish, higher ceiling, the _only_ path for physical-only prizes).
  - _Home (the gain question):_ for a Taken Find, **Sell or Publish.**
- ✅ **Intermediate en-route finds = small Cash** — no sell/publish sub-decision per step (protects
  the tactical-puzzle feel). The big choice lives only at the objective. (5 Jun)
- ✅ **The team is the single labour pool, and that IS the action economy** (no abstract action
  points). Each turn every researcher goes to **Field** (travel & work steps) or **Desk** (study a
  Find → Publish → Reputation). A researcher can't do both in one turn. (5 Jun)
- ✅ **Emergent tension = fieldwork vs writing-up.** Big expeditions send everyone → Finds pile up
  unpublished; quieter turns keep someone home to convert the backlog → Reputation. True to real
  labs; no new tokens. (5 Jun)
- ✅ **Principle — all Reputation traces to a researcher's work:** Record (field) or Publish (desk).
  _No team, no legacy_ — the team-legacy keystone made literal. Answers "can you score without a
  team?" → **no.** (5 Jun)
- ✅ **Publishing feeds grow-by-use:** the desk researcher earns experience writing the paper — same
  lifecycle / retirement payoff as field work. (5 Jun)
- ✅ **Develop refined:** the old "spend spoils on three competing jobs (hire/upgrade/repair)"
  becomes **two competing pools — money and people:** spend **Cash** (hire / upgrade / repair) _and_
  assign **labour** (field vs desk). (5 Jun)

**Fences (named now, before they feel necessary — this is where v1 regrows):**

- ❌ **No multiple buyers** (museum vs collector vs auction, differing prices). Park.
- ❌ **No keep-a-Find-for-a-bonus** (artifacts as permanent tableau). Point-salad magnet. Park.
- 🅿️ **"Both" (publish _then_ sell)** — dilutes the XOR; allowed later only via a specific
  upgrade/specialist, never the default.

**Parked calibration (numbers, not architecture):** Record vs Take→Publish reputation ceilings; does
publishing take a full turn or a fraction.

**Still open in the economy:** the **machine upgrade tracks** (capacity / era-access /
instability-tolerance / precision).

### The shop & roster (5 Jun)

- ✅ **Two decks — Postdocs (juniors) and Experts (veterans) — are the two ends of one lifecycle.**
  A grown postdoc _becomes_ expert-tier, so an Expert card is "that endpoint, bought." Grow
  capability or buy it. (5 Jun)
- ✅ **Market = a shared face-up field, refilled _instantly_.** A bought slot is replaced from its
  deck immediately, so every player faces a full market on their turn — kills the first-mover
  monopoly on a scarce card (Drew's 6-player fairness check). You still race for a _specific_ card,
  never shut out of the market entirely. (5 Jun)
- ✅ **Postdoc slots = [number of players]** — talent-to-rival ratio stays constant at every count
  (self-solves the thin-at-5 / bloated-at-2 problem). (5 Jun)
- ✅ **Expert slots step up by round-thirds:** rounds **1–3 → 0**, **4–6 → 1**, **7+ → 2.** A
  grow-your-own opening; proven talent only signs on once the field is making noise. _(supersedes
  the earlier "1–2 experts" sketch.)_ (5 Jun)
- ✅ **Costs (placeholder, calibrate on paper):** postdocs ~2–3 Cash, experts ~8–10. (5 Jun)
- ✅ **A bought Expert = capability without history.** Expert stats (same reachable ceiling as a
  grown postdoc, maybe a signature ability) but **no earned legacy** until they've worked your
  expeditions (see retirement tiers). Capability you can buy; legacy you can only grow. (5 Jun)
- ✅ **Roster cap = 8.** Generous enough to feel like freedom, but a real ceiling whose main job is
  **anti-runaway-leader** — a rich player can't hoard unlimited talent and snowball (Drew reasoned
  to this). When full, hiring forces a **retire-to-hire**, manufacturing the bittersweet "make room
  for the future" beats (lineage churn + legacy draws). 🔶 _Playtest watch: is tracking up to 8
  researchers (field + desk + bench) too much?_ (5 Jun)

### Retirement — earned tiers (5 Jun, refines the lifecycle section above)

Retirement benefit scales with **expeditions worked for you**, in tiers — which is also how a
latecomer Expert earns a legacy:

- **Below ~3 expeditions:** nothing — retiring just frees the slot.
- **~3 expeditions:** a **reduced** send-off — a **small Reputation bump only** (no machine upgrade
  / action card / deck draw). The consolation legacy.
- **Full threshold (higher):** the full **Retirement deck draw** (2, keep 1) — upgrade / boon /
  reputation / protégé.

_(Thresholds are calibration. This adds a consolation tier **below** the full draw; it does **not**
overturn the earlier "the full draw is flat, not scaled by investment depth" decision — the tiers
gate \_whether_ you draw, not how big the full draw is.)\_

### The machine — upgrade tracks & the Workshop action (5 Jun)

- ✅ **Four upgrade tracks; ① Era-access is the headline.** Recent ▸ Modern ▸ Early-Mod ▸ Medieval ▸
  Ancient ▸ Prehistoric — the progression spine: deeper eras = bigger prizes (higher paper tiers)
  but scarier (higher imprint caps, Die B, more danger). The other three are supporting cast. (5
  Jun)
- ✅ **② Capacity** (travel 3 ▸ 4 ▸ 5): how many researchers travel one expedition — cover more
  specialisms, spread fatigue, work longer paths. (5 Jun)
- ✅ **③ Tolerance** (breakdown cap 5 ▸ 7 ▸ 9): raises the Instability ceiling = overclock headroom;
  competes with _repairing_ instability (raise the roof vs mop the floor). (5 Jun)
- ✅ **④ Precision = the machine's Discretion (cleaner drops = less footprint).** _Drew's
  narrative:_ an imprecise machine drops you early (longer exposed → bigger footprint) or needs
  repeat jumps (tired, stressed researchers → more leak); a precise one puts you exactly where/when,
  so you scar less. The "go deep but stay clean" track. _("Fewer surprises" rejected — you visit the
  same period, so the same obstacles are there regardless of arrival precision.)_ Mechanic TBD (−1
  footprint die / +effective Discretion). (5 Jun)
- ✅ **Machine work is a Workshop action — Cash + a Craft researcher.** Upgrading (and repairing)
  the machine isn't just a purchase: it takes **time, effort and skill**, so it requires assigning a
  **Craft (engineer) researcher** to the Workshop _and_ spending Cash. This **extends the labour
  pool to three destinations:** **Field** (work an expedition) · **Desk** (publish a Find →
  Reputation) · **Workshop** (upgrade/repair the machine — Craft-gated). (5 Jun)
- ✅ **Three specialisms kept** (Insight / Craft / Nerve); **Craft = the engineer / STEM / maker**
  type that does machine work. (5 Jun)
- 🔶 **Consequence to watch:** Craft becomes a bottleneck — your engineer can crack a field obstacle
  OR upgrade the machine, not both — rewarding Craft bench depth. Good tension; watch it doesn't
  starve. (5 Jun)
- ✅ **Structure = four simple linear tracks** (spend to advance a pip, escalating cost), not
  modular tiles (parked). Revisit if four feels like too much. (5 Jun)
- ✅ **Desk / Publish = Insight-gated** (historians write the papers). Reasoning: an engineer might
  do material analysis on a Find, but only a historian can add the **context** that wraps it into a
  paper — and materials science has moved on, so the engineering isn't the novel contribution. Each
  home job now owns a specialism: **Field** (step-driven) · **Desk = Insight** · **Workshop =
  Craft**. (5 Jun)
- ✅ **Third specialism = Grit** (renamed from "Nerve"): the **O'Neill** to Insight's Daniel and
  Craft's Sam — the strong, non-academic tactical leader who **leads the expedition and keeps the
  team on task.** Field domain = danger steps (infiltrate, survive, escape). **Signature mechanic
  (confirmed): a Grit leader on an expedition mitigates fatigue** — softens the −1 Discretion per
  extra step, keeping the party effective — reusing the existing fatigue rule, no new subsystem. So
  each type owns a field domain _and_ a home/signature role: **Insight** = knowledge + papers
  (Desk), **Craft** = machine + Workshop, **Grit** = danger + leadership (field).
  _(Logistics-at-Staging is a parked alternative dimension. Sweep "Nerve" → "Grit" across docs with
  the spoils→Cash pass.)_ (5 Jun)

### Open questions to resolve

- Exact Integrity cost per leftover blank; exact Instability per overclock; how Instability is
  cleared; how a snapped thread (deliberate, visible footprint) differs from an ambient fumble.
  _(later)_
- Danger ratings per era (does deep-era baseline danger stack with step danger?). _(later)_
- How exactly does a player **close a thread** — same capability type as opening it? A specific
  resource? A later step that the bracket points to?
- What does **overclock** cost and roll, concretely, on paper? Where does machine instability live
  and how is it cleared?
- How does an expedition **end well or badly** — what's full vs. partial reward, and what does a
  snapped thread actually do beyond dropping integrity?
- Keep the whole expedition to **one turn**? (Parking-lot: do big late-game expeditions ever span
  turns? Don't chase now.)
- Minimum viable paper version: how few steps/types/members still produce an interesting, welcoming
  decision?

---

_Parking lot (capture stray thoughts here so we don't lose them, but don't chase them now):_

- 🔶 **TITLE CANDIDATE: _Warped_** (Rikki's suggestion, 5 Jun — Drew likes it; front-runner). Works
  on four levels: (1) **spacetime** — a time-_warp_, the sci-fi mechanism; (2) **the timeline** —
  imprints _warp_ history, collapse = a warped timeline; (3) **moral** — the greed/ethics dial, a
  warped scientist; (4) **weaving** — the _warp_ is a loom's lengthwise threads, and the game opens
  & closes **threads** across a timeline kept consistent. Strong; not locked (confirming triggers a
  project-wide rename from the "Time Travel" working title).

- Do large/late expeditions ever span multiple turns, or always resolve in one? (Default: one.)
- ✅ Sell-vs-publish (cash vs. respect) — **confirmed (5 Jun):** it _is_ the Record-vs-Take prize
  fork (see the dedicated section above). No longer parked.
