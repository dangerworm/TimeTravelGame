# Time Travel Game — Design Document

_A board game of temporal science, academic rivalry, and historical discovery_

---

## Foreword / Story So Far

It is approximately one hundred years from now. Society looks much as it does today — people argue
about politics, drink coffee, and complain about the weather. Science has moved on considerably. So
has education: a single unified global syllabus has emerged, humanity's collective agreement on what
every student should know. Two and a half million of them are assigned the same essay topic on the
same day.

Most skim it, summarise it badly, and submit something passable.

But a handful — three, four, maybe five students, scattered across different countries, different
time zones, different lives — actually read it. Properly. And something clicks.

Independently, almost simultaneously, each of you has cracked the foundational principle of temporal
displacement. You can't go far. Not yet. You've proved it to yourself by sending a marble three
minutes into the past and catching it before you threw it. But the principle is sound, the maths
works, and you are standing at the edge of something that will change everything.

You are not rivals. Not exactly. You are peers who have each stumbled into the same extraordinary
discovery, and you each know — because you are scientists — that the person who publishes first, who
builds furthest, who assembles the best team and the most capable machine, will define this field
for generations.

The race begins now, in your garage, with scrap metal and borrowed silicon and a head full of
theory.

---

## Game Overview

**Players:** 2–5 **Duration:** 3–5 hours **Theme:** Competitive scientific development, time travel,
historical discovery **Format:** Card and tableau based. Each player has a personal board. Shared
decks, tokens, and era cards in the centre of the table.

### Core Loop

Each turn, a player spends their available **action points** across some or all of the following
phases. Early game, you won't have time to do everything. Late game, with a full team behind you,
you can execute the complete sequence in a single turn.

1. **React** _(optional)_ — adjust last turn's plan before jumping
2. **Jump** — execute the jump
3. **Process returns** — collect materials as tokens; artefact cards held in hand
4. **Write a paper / Sell** _(optional, each costs 1 action)_ — convert artefact cards to currency or legacy points
5. **Develop** — upgrade machine, recruit team members
6. **Plan next jump** — assign team, lock in destination

### Win Condition

The game ends the moment any player unlocks the **Many Worlds** capability — the ability to jump
between parallel timelines rather than within a single closed loop. This represents the ultimate
scientific achievement and is the final upgrade on the machine development track.

When this is triggered, all players tally their **Academic Legacy score**. The player with the
highest score wins — not necessarily the player who triggered the end game.

---

## Academic Legacy (Scoring)

At game end, players score across the following:

| Category                   | Notes                                                                                                           |
| -------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Research papers published  | Accumulated during the game via paper actions or postdoc researchers                                            |
| Respect tokens held        | Net respect (gains minus losses)                                                                                |
| Team cards in play         | Weighted by specialisation level                                                                                |
| Retired researcher bonuses | Veterans leave behind permanent upgrades or bonus legacy points                                                 |
| Machine sophistication     | Number and tier of ability cards slotted around the time machine                                                |
| Machine stage reached      | Bonus for each time machine tier unlocked                                                                       |
| Many Worlds bonus          | A flat bonus (approximately equivalent to 2–3 research papers) awarded to the player who triggered the end game |

**The strategic tension:** Racing hard for Many Worlds risks a thin legacy. Building a rich,
well-rounded career risks someone else triggering end game before you're ready. Both approaches are
viable.

---

## Action Economy

Time is your most constrained resource, especially early in the game.

### Player Actions

Each turn the player has **3 general action points**, spendable on any action in the turn sequence.
In the early game — working alone — all 3 are typically consumed by the core loop (Jump, Process
Returns, Plan Next Jump), leaving nothing for development or writing. This is intentional: the early
game should feel tight.

### Team Member Actions

Each team member card can take **at most one action per turn**. After acting, the card is exhausted
(turned sideways) and cannot act again until the start of your next turn. You are never required to
use a team member.

Every team member card carries a small **capability table** — one column per action type, with an
indicator in each:

| Indicator | Meaning |
|-----------|---------|
| Red dot | Cannot perform this action |
| Green dot | Can perform this action at standard effectiveness |
| Star | Performs this action with a bonus |

The player has no capability table — they can perform any action with their 3 general actions.

Junior team members have a more limited capability table than fully specialised ones. Spending
experience tokens to specialise upgrades their indicators — green dots may become stars, and some
blocked actions may open up.

### How This Plays Out

**Early game:** all 3 player actions go to the core loop. Any team members you have cover one
additional task each — a postdoc writes a paper, an engineer installs a component.

**Late game:** a well-assembled team may cover all routine actions entirely, freeing your 3 player
actions. Rather than spreading them across tasks the team already handles, you spend all 3 on a
single **3-action special**.

### The 3-Action Special

Spending all 3 player actions in one move triggers a powerful late-game play. The specific mechanic
is to be finalised, with the following as candidates:

- **Breakthrough** — advance the machine or install two upgrades in a single turn
- **Landmark Paper** — publish a career-defining paper worth significantly more legacy points than a
  standard flip
- **Temporal Anchor** — stabilise a parallel timeline entry point; a prerequisite step toward the
  Many Worlds unlock

---

## The Timeline Interpretations

Time travel in this game operates under one of two interpretations. All players begin in **Closed
Loop** and may eventually unlock **Many Worlds**.

### Closed Loop (Default)

Actions taken in the past have consequences in the present. Jumps may affect the shared timeline —
resources become scarcer or more available, certain eras become harder to access, or events ripple
outward to affect all players. This creates shared jeopardy and incentivises caution and cooperation
in the early game.

### Many Worlds (Unlocked)

The player who achieves this upgrade operates in their own parallel timeline. Their jumps no longer
affect the shared game state. This is a significant power asymmetry — they are effectively insulated
from closed loop consequences — and it triggers end game scoring.

---

## The Time Machine

Each player's time machine lives at the centre of their personal board. It begins as a rough
prototype and develops across four distinct stages. The stage you are at defines what kind of jumps
you can make.

### Machine Stages

| Stage | Name                  | Capability                                 | Notes                                                                                                                                             |
| ----- | --------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | **Observation**       | See the past, cannot interact              | Basic goggles/viewer prototype. Can scout a destination card without committing to a jump. No retrieval risk.                                     |
| 2     | **Visitation**        | Physical presence, time-limited            | You can visit and interact but carry only a portable return pad — you have roughly one hour before it expires. Risk of being stranded if delayed. |
| 3     | **Extended Presence** | Longer visits, more actions at destination | More reliable return mechanism. Can bring back larger hauls, spend more time selecting resources.                                                 |
| 4     | **Stable Portal**     | Reliable two-way transit, reduced risk     | Full control. Miniaturised and refined. Foundation for the Many Worlds unlock.                                                                    |

Each stage is represented by a new card placed on the machine stack on the personal board. The stack
visually narrates the machine's development.

### Satellite Ability Slots

Around the central machine stack are **4–6 satellite slots**. Each slot has a type and accepts only
matching ability cards:

- **Precision slot** — upgrades targeting accuracy (year → month → week → day → hour)
- **Physics slot** — upgrades relating to timeline interpretation and jump capability
- **Materials slot** — exotic element enhancements
- **Computing slot** — silicon-based processing upgrades
- **Research slot** — boosts to team productivity or paper output

### Machine Upgrade Path

Upgrade branches are visible to all players from the start of the game. There are no hidden traps —
all paths reach the same power ceiling but via different strengths:

- **Classical Physics branch** — precision and reliability. Best for consistent, low-risk jumps
- **Quantum Physics branch** — unlocks interaction with timeline consequences, better closed loop
  navigation
- **Theoretical/Dimensional branch** — enables scouting (send a researcher ahead without a full
  jump), contributes to the Many Worlds unlock

The Many Worlds upgrade requires contributions from all three branches, specific exotic materials,
and a minimum team specialisation threshold.

### Overclock

Engineers may apply an **overclock** to the machine — pushing it beyond its rated capability for a
single jump. The player chooses one of the following benefits:

- **Higher tier access** — draw from the destination deck one tier above what the machine stage
  normally allows
- **Bypass one machine requirement** — ignore one ability card requirement listed on the destination
  card

Overclock always forces Die 2 to be added to the jump's risk roll, regardless of the destination's
base risk level.

Each overclock adds one **unpredictability token**. One token is removed at the start of any turn on
which the player does not overclock. Tokens accumulate across consecutive overclock turns and cannot
be removed except by not overclocking.

| Tokens held | Effect when overclocking |
|-------------|--------------------------|
| 1 | Normal — Die 2 added, mitigation available |
| 2 | One mitigation team member is unavailable this jump |
| 3 | All mitigation negated |
| 4+ | All mitigation negated + additional Die 2 roll |

_Token thresholds are a starting point for playtesting._

---

## The Era Decks

The centre of the table holds a set of **era decks** divided by tier. Each deck contains destination
cards representing specific moments in time. Players draw from these decks when executing a jump.

### Deck Tiers

| Tier             | Access Requirement                     | Contents                                        |
| ---------------- | -------------------------------------- | ----------------------------------------------- |
| **Accessible**   | Any functional time machine (Stage 1+) | Common resources, low risk, low reward          |
| **Intermediate** | Stage 2 machine                        | Better resources, moderate risk                 |
| **Advanced**     | Stage 3 machine + specific abilities   | Rare materials, exotic elements, high reward    |
| **Expert**       | Stage 4 machine                        | Exceptional rewards, high risk, exotic elements |

Advanced and Expert decks sit face-down in the centre of the table as a visible reminder of what
players are working toward.

### Precision and Card Drawing

Your machine's **precision level** determines how many cards you draw from a deck and how much
choice you have:

| Precision Level   | Draw    | Keep         |
| ----------------- | ------- | ------------ |
| Year (base)       | 1 card  | Must take it |
| Month             | 2 cards | Pick 1       |
| Week              | 3 cards | Pick 1       |
| Day               | 4 cards | Pick 1       |
| Hour/Minute (max) | 5 cards | Pick 1 or 2  |

Better precision means more choice, not just better destinations.

### Destination Card Contents

**Front side:**

- **Era and flavour text** — where and when
- **Tier** — which deck it belongs to
- **Dice** — risk level: 0 dice (safe), Die 1, or Die 1 + Die 2
- **Machine failure consequence** — what happens if machine failure is rolled (e.g. "lose all
  materials", "team member stranded"). Only present if Die 2 is in play.
- **Machine requirements** — any ability cards needed in the satellite slots
- **Team requirements** — minimum travelling team size or specific type required (if any)
- **Returns** — what can be brought back: materials (tokens), artefact sale value, respect gain
- **Closed loop consequence** — what ripples outward in the shared timeline (if applicable)

**Back side:**

- **Paper title** — flavour (e.g. *"Concrete Evidence: The Chemistry of Roman Marine Structures"*)
- **Mystery tier** — determines legacy point value (see below)
- **Legacy points**
- **Secondary bonus** — respect, a free secondary paper, or similar (if applicable)

### Mystery Tiers

Paper rewards on the back of destination cards scale with how genuinely unknown the subject is:

| Tier | Description | Example finds | Legacy pts |
|------|-------------|---------------|------------|
| 1 — Known | Broadly understood; confirms existing theory | Roman nail, 1200 BC grain | 1–2 |
| 2 — Debated | Contested or partially understood | Roman concrete, Stonehenge transport | 3–4 |
| 3 — Lost | Knowledge that vanished completely | Greek fire, Damascus steel, theriac | 5–6 |
| 4 — Unknown | Never before seen | Silphium, the Wow! signal source | 8–10 |

A Tier 4 paper is career-defining — the kind of find that wins legacy scoring on its own.

### Two-Sided Destination Cards and Artefact Decisions

Every destination card that yields an artefact has a front (jump returns) and a back (academic
reward). Materials (tokens) come home with you regardless. Artefacts are different — the card
itself represents the artefact, and you decide what to do with it:

| Path | Actions | Currency | Legacy points |
|------|---------|----------|---------------|
| **Sell** the artefact | 1 | Face value | — |
| **Write paper** about the artefact | 1 | — | Full |
| **Write paper, then sell** | 2 | Face value + small bonus | Full |

Selling forecloses the paper option — you no longer have access to study it. Writing a paper does
not foreclose selling; the paper establishes provenance and marginally increases the sale value.
Holding a card in hand is free and has no time limit — players may accumulate several destination
cards and write papers on all of them in a single turn if they have enough postdocs.

The paper is not about the object retrieved — it is about the _discovery_: the era, the conditions,
what the find reveals about that moment in history or science. A lump of 1200 BC grain is evidence
of agricultural practice. A Roman nail is evidence of construction technique.

Some destination cards have no back side — resource-only finds (raw materials, exotic elements)
yield no academic credit. There is no paper to write about digging up copper.

**Selling** is covered by the Process Returns column on the capability table. A cultural specialist's
star on this column means they achieve a bonus above face value when selling.

---

## The Research Team

Team members are cards purchased from a central shop. The shop is a shared set of decks in the
centre of the table. The team is divided into **four types**, each with **sub-specialisations** —
forming a 4×4 grid of possible hires.

It is prohibitively expensive to fill the entire grid. You build the team that fits your strategy.

### Capability Table

Every team member card carries a small table — one column per action type — showing what they can
do and how well:

| Indicator | Meaning |
|-----------|---------|
| Red dot | Cannot perform this action |
| Green dot | Can perform this action at standard effectiveness |
| Star | Performs this action with a bonus |

**Action columns:** React · Jump · Process Returns · Write Paper · Develop · Plan Next Jump

The player has no capability table — they can perform any action with their 3 general actions.

**Location matters:** Some failure types can only be mitigated by team members in the right place.
Team members assigned to the staging area are **travelling** (at the destination). Everyone else
is **at base**. Comms failure is mitigated by a team member at base; machine failure is mitigated
by a team member travelling.

Junior team members have more restricted capability tables than fully specialised ones. Spending
experience tokens to specialise upgrades their indicators — green dots may become stars, and some
blocked actions may open up.

### The Four Team Types

#### Physicists

Drive machine development and jump capability.

- **Classical** — precision upgrades, machine reliability
- **Quantum** — closed loop navigation, timeline risk reduction
- **Theoretical** — dimensional theory, contributes to Many Worlds unlock
- **Experimental** — rapid prototyping, component testing, overclock management

#### Historians

Drive destination knowledge and return quality.

- **Era specialists** — deep knowledge of a period; look ahead in era decks or draw additional cards
- **Resource specialists** — identify high-value materials at a destination
- **Cultural specialists** — maximise artifact value and respect returns
- **Archaeological** — unlock special destination cards or recover additional items from a single
  jump

#### Engineers

Drive machine construction, maintenance, and reliability.

- **Structural** — build and install base machine components
- **Systems** — computing and silicon upgrades
- **Reliability** — reduce jump risk, manage overclock damage
- **Advanced fabrication** — required to install exotic element upgrades

#### Postdocs / Writers

Drive academic output and paper production, freeing other team members for higher-value tasks.

- **Physics postdoc** — writes papers on time travel discoveries and machine breakthroughs
- **History postdoc** — writes papers on artifacts and era discoveries (flips destination cards)
- **Materials postdoc** — writes papers on resource finds and material science
- **Generalist postdoc** — slower but can cover any paper type

### Team Synergies

Some combinations are notably powerful:

- Three engineers + one physicist: highly reliable machine, very low jump risk, good overclock
  capability — but slow academic output and limited destination knowledge
- Heavy historian roster: exceptional returns per jump, good paper output with postdocs — but
  machine development lags
- Mixed specialist team: slower to assemble, but capable of executing the full turn sequence
  efficiently by late game

No combination should make winning impossible — different builds reach the same ceiling by different
routes.

### Researcher Lifecycle

Team members begin as juniors — cheap, flexible, unspecialised. They gain **experience tokens** each
round. These tokens can be spent to:

- Unlock a sub-specialisation
- Contribute to a machine upgrade
- Write a research paper (if they are a postdoc type)

After full specialisation, a researcher eventually **retires**. Retirement is a payoff, not a loss.
A retiring team member leaves behind one of:

- A permanent machine upgrade card
- A one-time powerful action card
- A flat legacy score bonus

Young researchers are cheap and flexible. Veterans are powerful but finite.

---

## The Lending / Alliance Mechanic

Players may offer use of their time machine or team members to other players.

### Why Lend?

The lender must have an incentive. Suggested options (to be finalised during playtesting):

1. **Reputation gain** — lending earns respect tokens; the lender's design is being validated by
   external use
2. **Compulsory component exchange** — the borrower has a material or researcher the lender needs;
   the deal is negotiated at the table
3. **Machine returns improved** — the borrower's team learns something during the jump; the lender
   receives a minor upgrade card

### Imbalance by Design

A player far behind benefits greatly from borrowing an advanced machine. This is intentional — it
gives trailing players a catch-up mechanism. The imbalance should favour the borrower in capability,
but the lender extracts value in reputation or resources. Both parties gain something.

### Alliances

Organic alliances will form around specialisation. A player with outstanding historians, a player
with outstanding physicists, and a player with excellent raw materials are collectively more capable
than any one of them alone. The game does not enforce alliances but incentivises them through the
lending mechanic.

---

## Tokens and Resources

All resources are tracked with tokens on the personal board. Denominations of 1, 3, and 7 are
suggested to allow flexible representation without excessive tokens.

### Token Types

| Token              | Represents                                          | Notes                                                                                                       |
| ------------------ | --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Base Metal**     | Iron, copper, steel — structural machine components | Common, accessible from early era decks                                                                     |
| **Silicon**        | Computing and processing components                 | Mid-game resource                                                                                           |
| **Exotic Element** | Rare material enabling advanced machine abilities   | Late-game, expert deck destinations only. Name TBD — candidates: dark matter, temporal crystal, gravitonium |
| **Currency**       | Money from artifact sales and paper income          | Converts to team members and upgrades                                                                       |
| **Respect**        | Academic reputation                                 | Gained from papers, successful jumps, lending; lost from failed jumps or unethical actions                  |

### Conversion

- Artifacts convert directly to currency on processing
- Base metal and silicon are spent directly on machine upgrades — they do not convert to currency
- Exotic elements are spent on specific advanced upgrades only
- Respect cannot be converted but contributes directly to legacy scoring

---

## Personal Board Layout

Each player has an A5 board representing their workspace. Suggested layout:

```
┌─────────────────────────────────────────────────────────────┐
│  TEAM SLOTS — up to 6 cards, each with experience tokens    │
│  [ Physicist ] [ Historian ] [ Engineer ] [ Postdoc ] ...   │
├────────────────────────┬────────────────────────────────────┤
│                        │  SATELLITE ABILITY SLOTS           │
│   TIME MACHINE         │  [ ] Precision                     │
│   (card stack)         │  [ ] Physics                       │
│   Stage: 1 / 2 / 3 / 4 │  [ ] Materials                     │
│                        │  [ ] Computing                     │
│                        │  [ ] Research                      │
├────────────────────────┴────────────────────────────────────┤
│  RESOURCE TOKENS:   Metal | Silicon | Exotic                │
│                     Currency | Respect                      │
├─────────────────────────────────────────────────────────────┤
│  JUMP PLAN STAGING AREA                                     │
│  (destination card face-down + assigned team + resources)   │
├─────────────────────────────────────────────────────────────┤
│  PAPERS PUBLISHED: ___    LEGACY TRACK: ___                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Turn Structure

### 1. React _(optional)_

Before jumping, make one adjustment to last turn's plan in response to table changes. Costs a
resource. Aborting entirely is possible but costs more.

### 2. Jump

Execute the planned jump. Draw cards from the target era deck based on machine precision. Select
your destination. Resolve risk if applicable.

**Machine stage constraint:** What you can _do_ at the destination depends on your machine stage.
Stage 1 (Observation) means you cannot retrieve anything — you can only look. Stage 2+ allows
retrieval within time limits.

**Risk resolution:** Each destination card specifies a risk level which determines how many dice to
roll. Two custom dice are used, each with typed faces:

| Die | Faces |
|-----|-------|
| **Die 1** (mild) | 4× blank, 1× missed opportunity, 1× comms failure |
| **Die 2** (severe) | 3× blank, 1× missed opportunity, 1× comms failure, 1× machine failure |

| Risk level | Dice rolled |
|------------|-------------|
| None | 0 — safe, no roll |
| Low | Die 1 only |
| Moderate / High | Die 1 + Die 2 |

**Typed outcomes:**

- **Blank** — successful jump, full haul
- **Missed opportunity** — slightly reduced material gains (poor timing, couldn't reach everything)
- **Comms failure** — moderately reduced material gains (team panics without coordination)
- **Machine failure** — consequence specified on the destination card (examples: lose all materials,
  lose a team member for one turn, team member stranded)

If both dice show a result, apply both.

**Overclock:** Adds Die 2 to any roll regardless of the destination's base risk level. A low-risk
destination with overclock can produce machine failure. This is the core tradeoff of overclocking.

**Typed mitigation:** Team members with a star on the relevant capability column negate that failure
type — but location matters. Comms failure can only be mitigated by a team member **at base**
(maintaining the uplink). Machine failure can only be mitigated by a team member **travelling** (at
the destination, physically present to fix it). Missed opportunity is mitigated by a historian
**travelling** (they need to be there to spot what others would miss).

**Stranded:** A stranded team member cannot contribute until retrieved and does not gain experience
tokens while stranded. On their next turn, the player must choose:

- **Rescue** — jump to the same era at zero risk (no materials retrieved). The team member returns.
  The rescuing player gains respect: more than was lost by the stranding, acknowledging the cost of
  the missed productive turn. Another player may also offer to retrieve them during their own jump to
  the same era, earning respect for doing so.
- **Abandon** — the team member is lost permanently, with no retirement bonus. The player loses
  respect for leaving a colleague behind.

_Prototype note: use standard d6s with a reference table. Production: custom dice with printed
symbols._

### 3. Process Returns

- Collect materials as tokens on the board (automatic — no action required)
- Apply closed loop consequences to the shared timeline if applicable
- Artefact cards are held in hand — no action required yet

### 4. Write a Paper / Sell _(optional — each costs 1 action)_

Artefact cards in hand may be sold (1 action, face value currency) or written up as a paper (1
action, flip the card for legacy points), or both in sequence (2 actions, full currency + small
bonus). Either the player or an eligible team member may take these actions. See Two-Sided
Destination Cards for full detail.

### 5. Develop

Spend resources and currency on any combination of:

- Advance machine to next stage (stack a new machine card)
- Install ability cards into satellite slots
- Recruit team members from the shop
- Spend experience tokens on specialisations

### 6. Plan Next Jump

- Select target era deck
- Assign team members to the jump (place their cards in the staging area)
- Commit any resources required
- Negotiate loans or alliances with other players if desired

---

## Card Types Summary

| Card Type                     | Location                         | Notes                                                   |
| ----------------------------- | -------------------------------- | ------------------------------------------------------- |
| Destination cards (two-sided) | Era decks (centre table)         | Drawn during jump; flippable for academic rewards       |
| Physicist cards               | Team shop deck                   | Purchased during develop phase                          |
| Historian cards               | Team shop deck                   | Purchased during develop phase                          |
| Engineer cards                | Team shop deck                   | Purchased during develop phase                          |
| Postdoc cards                 | Team shop deck                   | Purchased during develop phase; enable paper delegation |
| Machine base card             | Personal board                   | Starting card, never removed                            |
| Machine stage cards           | Personal board (stacked)         | One per stage upgrade                                   |
| Ability cards                 | Personal board (satellite slots) | Slotted around machine stack                            |
| Turn order card               | Passed around table              | Tracks whose turn it is                                 |

---

## Open Questions / To Resolve

- **3-action special** — which of Breakthrough / Landmark Paper / Temporal Anchor (or a combination)
- **Exact legacy score values** — relative weighting of papers vs respect vs team vs machine
  sophistication
- **Machine failure consequence mix** — what range of outcomes to put on destination cards; how severe the worst outcomes should be at each tier
- **Closed loop consequence cards** — what specific effects, how severe, how targeted
- **Lending transaction rules** — formalise the exchange mechanic
- **Researcher shop structure** — how many cards visible at once, how does the shop refresh
- **Exotic element name** — candidates: dark matter, temporal crystal, gravitonium
- **Exact token denominations** — 1/3/7 is a starting point; playtesting will calibrate
- **Game length calibration** — targeting 3–5 hours; action economy and experience rates need tuning
- **Ethical actions** — recovering artifacts vs collecting resources vs more disruptive actions;
  different risk/reward and respect consequences
- **Unpredictability token thresholds** — exact point at which mitigation is partially/fully negated and extra dice are added; requires playtesting to calibrate
- **Stage 1 (Observation) utility** — needs a compelling reason to use scouting rather than just
  jumping blind. Candidate: allow Stage 1 to reveal destination card backs (the academic reward)
  without committing to a jump — scouts know what's worth publishing before anyone goes there
- **Postdoc unlock condition** — does hiring a postdoc immediately unlock card backs, or is there a
  trigger?
- **Year structure** — if each year is four rounds, what happens at year end? Does anything reset or
  escalate?

---

_Document updated following third design session (1 June). All mechanics are provisional and
subject to playtesting._
