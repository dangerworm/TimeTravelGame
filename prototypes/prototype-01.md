# Prototype 01 — The Core Expedition Loop

_First playable paper test. Solo. ~20 minutes. Goal: find out whether **cracking an expedition** is
fun and welcoming, round after round._

**The one question this answers:** is the assign → resolve → push-or-stay-clean decision tense and
satisfying every time — and does "presence always risks a trace" create drama without feeling like
punishment?

Deliberately minimal. **No economy, no recruiting, no machine upgrades yet** — a fixed team plays
five expeditions back to back. If the core sings, we add the engine around it. If it doesn't, we fix
it here before building anything.

---

## What to make (index cards / scrap paper)

### The two dice

Use one ordinary d6 and this lookup (or write the faces on a blank die):

| d6 roll →      | 1   | 2   | 3   | 4   | 5   | 6   |
| -------------- | --- | --- | --- | --- | --- | --- |
| **Die A** pips | 0   | 1   | 1   | 1   | 1   | 2   |
| **Die B** pips | 0   | 0   | 1   | 1   | 2   | 2   |

Each expedition card says which die governs **all** its rolls.

### Your team (fixed for this test — 3 researchers)

| Researcher   | Specialism | Skill | Discretion | Note                        |
| ------------ | ---------- | ----- | ---------- | --------------------------- |
| **Dr. Vale** | Insight    | 3     | 1          | Brilliant historian, clumsy |
| **Mensah**   | Craft      | 2     | 2          | Solid, careful engineer     |
| **Okafor**   | Nerve      | 2     | 3          | Deft, steady fixer          |

You may bring **all three** on every expedition (travel capacity 3). Each member works **one step**.

_Swap roster (optional — replay to feel team variety): **Lindqvist** Craft 3 / Discretion 0 ·
**Reyes** Generalist (Insight 1, Craft 1, Nerve 1) / Discretion 3 · **Sun** Insight 2 /
Discretion 2._

### The tracks

- **Timeline Integrity** (communal): start at **10**. Every imprint drops it. (Solo: just watch how
  low it gets — collapse pressure is the feeling we're testing.)
- **Machine Instability** (personal): start at **0**. Each overclock +1. At **5**, the machine
  breaks down — skip your next expedition's overclock option entirely.

### The expeditions

Make one card each (front = brief + steps; the "paper" reward stands in for the back). A step reads:
**label · specialism + Skill needed · danger · type**.

---

#### 1 · London, 1858 — "The Great Stink" · **Die A**

> Bazalgette's prototype relief valve was cast at the Deptford works weeks before the official
> design was filed. Recover it before the record catches up.

- **S1** Decipher the unpublished schematics · **Insight 2** · danger 0 · inert
- **S2** Slip into the half-built pumping works · **Craft 2** · danger 1 · inert
- **S3** Retrieve the prototype valve · **Craft 3** · danger 1 · _prize_
- **Reward:** 2 spoils + Paper (Tier 2 → **3 reputation**). Clean run (0 imprint): **+1**.

#### 2 · Nuremberg, 1471 — "The Astronomer's Margins" · **Die A**

> Regiomontanus kept a second set of notes he never published. A footprint in the wrong courtyard
> here would be unlike anything the watch has ever seen.

- **S1** Read the marginal cipher · **Insight 2** · danger 0 · inert
- **S2** Cross the cathedral works unseen · **Nerve 2** · danger 2 · inert
- **S3** [TWIST — flip on arrival] _The night watch has doubled._ The prize step now needs **Nerve
  3**. Copy the hidden notes · **Nerve (see twist)** · danger 1 · _prize_
- **Reward:** 1 spoil + Paper (Tier 3 → **5 reputation**). Clean run: **+1**.

#### 3 · Birmingham, 1791 — "Priestley's Lost Apparatus" · **Die A**

> Days before the rioters burn his lab, Priestley sealed an experimental apparatus in the cellar.
> Reaching it means changing what the mob does next — and putting that right afterwards.

- **S1** Locate the cellar from the burned records · **Insight 2** · danger 1 · inert
- **S2** Divert the rioters from the east door · **Nerve 2** · danger 2 · **intervention (opens a
  thread → must be closed at S3)**
- **S3** Restore the night's events so history holds · **Craft 2** · danger 1 · _closes the thread_
- **Reward:** 2 spoils + Paper (Tier 2 → **3 reputation**). Clean run: **+1**. _If the thread is
  left open (S3 not cleared): the thread snaps — **Timeline Integrity −2** and the paper is forfeit
  (a botched, unpublishable mess)._

#### 4 · Alexandria, 48 BC — "Before the Fire" · **Die B (volatile)**

> A scroll catalogued only once, the week before the great library burned. Deep time; the record is
> gone, so you cannot know everything you'll meet.

- **S1** Talk your way past the librarians · **Insight 3** · danger 1 · inert
- **S2** [HIDDEN — flip on arrival] _A scholar recognises you don't belong._ · **Nerve 2** · danger
  2 · inert
- **S3** Copy the doomed scroll · **Insight 3** · danger 2 · _prize_
- **Reward:** 1 spoil + Paper (Tier 4 → **8 reputation**). Clean run: **+2**.

#### 5 · Lisbon, 1755 — "The Engineer's Warning" · **Die B (volatile)**

> Moments before the earthquake, an engineer's seismic notes are still on his desk. Grab them and
> get out as the ground opens.

- **S1** Find the notes in the failing light · **Insight 2** · danger 2 · inert
- **S2** Brace the collapsing stair · **Craft 3** · danger 2 · inert
- **S3** Escape the tremor with the notes · **Nerve 2** · danger 2 · _prize_
- **Reward:** 2 spoils + Paper (Tier 3 → **5 reputation**). Clean run: **+2**.

---

## How to resolve a step

For each step, left to right:

1. **Reveal** any `[TWIST]` / `[HIDDEN]` step when you reach it.
2. **Assign** one unused researcher whose **specialism matches** the step.
3. **Success:**
   - If their **Skill ≥ the requirement** → **automatic success.** No success roll.
   - If **short by exactly 1**: you may **Overclock** → this step's **danger +1**, **Machine
     Instability +1**, then **roll Skill+1 dice; pips ≥ requirement = success** (~60% at Skill 2,
     the "reliable stretch"). Short by **2 or more**, or no matching specialist: you **cannot**
     attempt it — competence can't be faked, and the +1 cap can never bridge a 2-gap.
   - If you don't/can't succeed: the step is **failed**. Steps run **in order**, so a failed step
     **ends the expedition** there; if it was an **intervention** whose thread you'd opened, the
     thread **snaps** (see card).
4. **Footprint** (always, if final danger ≥ 1, success or fail):
   - Roll **danger-many dice** (the expedition's die). **Sum the pips.**
   - Subtract the assigned member's **Discretion** (after any −1 fatigue). Result (min 0) = imprint.
   - **Cap the imprint at the era's depth** (Recent 1, Modern 2, Early-Modern 3, Medieval 4, Ancient
     5, Prehistoric 6). **Timeline Integrity − imprint.**

**Reward sits at the objective** (the prize step); intermediate steps are gates, only occasionally
carrying a minor bonus.

At the end: total **reputation** earned, note where Integrity and Instability landed.

---

## What to feel for (jot a line after each expedition)

- Was the **assignment** a real decision, or obvious? (Who eats the dangerous step? Who do you _not_
  have the right person for?)
- Did reaching for an **overclock** feel thrilling — and did the danger+instability cost make it a
  genuine "do I dare"?
- Did a leaked **imprint** feel like _drama_ ("we dropped something in the dark") or like
  _punishment_? This is the make-or-break for option B.
- Did **Die B** expeditions feel wilder and more tense than Die A?
- Did watching **Timeline Integrity** fall create looming dread (the collapse we'll build toward)?
- Could someone who hates maths play this happily? Where did it feel like homework?

> Calibration is expected to be off on the first play — spoils, reputation, Integrity start, and
> Instability cap are all guesses. We're testing the **feel of the decision**, not the balance.
