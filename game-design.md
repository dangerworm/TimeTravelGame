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
4. **Write a paper / Sell** _(optional, each costs 1 action)_ — convert artefact cards to currency
   or legacy points
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
| Disrespect tokens held     | Each token held at game end reduces final legacy score by 1 (they represent unresolved reputational damage)     |
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

Every team member card carries a small **capability table** showing what they can do across six
action columns (Red = blocked, Green = standard, Star = bonus). Full detail in The Research Team
section. The player has no capability table — they can perform any action with their 3 general
actions.

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

Every jump changes the past slightly. Those changes propagate forward through physical causality and
manifest in the present as small shifts in material availability, technology, or conditions — not as
anyone's knowledge or memory of change. Nobody knows what happened. The world is simply a little
different.

**Closed loop consequence deck:** A single shared deck. After processing returns, the jumping player
draws from it as specified by the destination card (None / Draw 1 / Draw 2). They read the card
aloud and apply the effect immediately. Effects are one-time and resolve instantly.

Effects can be positive or negative, and may target: all players, all players except the jumping
player, or players holding a specific resource or artefact type. Examples of the principle in
action:

- _You removed a gold nugget that would have sparked a 19th-century gold rush — gold is now scarcer.
  Players holding base metal gain 1 currency._
- _You accidentally left a battery in 1800 AD — energy research accelerated. All players pay 1 less
  currency on their next machine upgrade._
- _New manufacturing processes emerged from your left-behind technology — engineers gain 1 bonus
  action this round._
- _You prevented the burning of the Library of Alexandria — historians have access to better
  records. Players with a historian on their team draw 1 additional card on their next jump._
- _Your excavation disturbed a mineral deposit — all players lose 1 base metal token._
- _A temporal ripple affected equipment calibration — all players gain 1 unpredictability token._

Flavour text explains the causality. The mechanical effect applies regardless of whether the jumping
player intended the change.

**Quantum physicist mitigation:** A quantum physicist with a star on the Jump column may look at
the top 2 consequence cards and choose which one applies, or discard one without effect.

### Many Worlds (Unlocked)

Achieving the Many Worlds upgrade triggers end game scoring immediately. All players tally their
Academic Legacy score; the highest wins — not necessarily the player who triggered it. The
triggering player receives a flat bonus equivalent to 2–3 research papers for reaching this
milestone first.

---

## The Time Machine

Each player's time machine lives at the centre of their personal board. It begins as a rough
prototype and develops across four distinct stages. The stage you are at defines what kind of jumps
you can make.

### Machine Stages

| Stage | Name                  | Capability                                 | Notes                                                                                                                                             |
| ----- | --------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | **Observation**       | Drone retrieval, no personal travel        | A drone is sent in your place. Retrieves small quantities of base materials and can record observations for academic papers (confirming or denying historical myths; witnessing documented events). No artefact retrieval — the drone cannot carry them. No personal risk.                                     |
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

- **Higher era access** — draw from the destination deck one era above what the machine stage
  normally allows
- **Bypass one machine requirement** — ignore one ability card requirement listed on the destination
  card

Overclock always forces Die 2 to be added to the jump's risk roll, regardless of the destination's
base risk level.

Each overclock adds one **unpredictability token**. One token is removed at the start of any turn on
which the player does not overclock. Tokens accumulate across consecutive overclock turns and cannot
be removed except by not overclocking.

| Tokens held | Effect when overclocking                            |
| ----------- | --------------------------------------------------- |
| 1           | Normal — Die 2 added, mitigation available          |
| 2           | One mitigation team member is unavailable this jump |
| 3           | All mitigation negated                              |
| 4+          | All mitigation negated + additional Die 2 roll      |

_Token thresholds are a starting point for playtesting._

---

## The Era Decks

The centre of the table holds five **era decks**, each representing a distinct period in history.
Cards are drawn from these decks during the Plan Next Jump phase. Each era has a colour code for
quick identification and scales in difficulty, reward, and rarity with temporal distance from the
game's present (~2125 AD).

A sixth era — the Future — is planned but deferred to a later design phase.

### Eras

| Era              | Period        | Machine stage                   | Colour              | Notes                                        |
| ---------------- | ------------- | ------------------------------- | ------------------- | -------------------------------------------- |
| **Modern**       | 1800–2000 AD  | Stage 1+                        | Silver/grey         | Entry point; closest to game's present       |
| **Early-Modern** | 1500–1800 AD  | Stage 2+                        | Blue                | Age of exploration and early science         |
| **Medieval**     | 500–1500 AD   | Stage 3+                        | Forest green        | Feudal societies, early engineering          |
| **Ancient**      | 500 BC–500 AD | Stage 4                         | Terracotta/burgundy | Classical civilisations, lost knowledge      |
| **Prehistoric**  | Before 500 BC | Stage 4 + Theoretical physicist | Deep ochre/brown    | Deep time; hardest to reach, greatest reward |

Ancient and Prehistoric decks sit face-down in the centre of the table as a visible reminder of what
players are working toward.

### Stage 1 Destination Cards

A small set of Stage 1 destination cards — drone-accessible, observation-only — is included in the
game. These yield base materials and observation papers, but no artefacts. Observation papers are
primarily Tier 3 (lost or unverifiable knowledge — the drone witnesses something no historian has
confirmed), giving players enough merit from their first jump to begin accessing the researcher shop.

**Standard setup (recommended for first play):** Seed Stage 1 cards to the top of the Modern era
deck. Every player's first jump is productive from turn one, and the paper and academic merit
mechanics are introduced naturally before anyone has upgraded their machine.

**Experienced setup:** Remove Stage 1 cards from the deck entirely. All players begin with a Stage 2
machine (Visitation). The early game is denser — players start with full retrieval capability and
manage the faster strategic pace from turn one.

### Precision and Card Drawing

Card selection happens during the **Plan Next Jump** phase, not during the jump itself. The player
draws from the target era deck, selects one card, places it face-down in the staging area, and
executes it on their next turn. This gives all players time to consider the table state and plan
responses.

The number of cards drawn is determined by two factors:

- **Machine precision** (upgraded via the Precision satellite slot)
- **Travelling team members** with relevant expertise (historians, quantum physicists, engineers
  with a star on the Plan column)

| Precision Level   | Base draw             | Notes                            |
| ----------------- | --------------------- | -------------------------------- |
| Year (base)       | 1 card — must take it | No choice; machine too imprecise |
| Month             | 2 cards — pick 1      |                                  |
| Week              | 3 cards — pick 1      |                                  |
| Day               | 4 cards — pick 1      |                                  |
| Hour/Minute (max) | 5 cards — pick 1 or 2 |                                  |

Team members may add +1 draw each, up to a maximum of 4–5 cards total regardless of precision level.
Better precision means more choice, not necessarily better destinations.

### Destination Card Contents

**Front side:**

- **Era and location** — which era deck it belongs to; specific place and date
- **Flavour text** — 1–2 lines setting the scene
- **Dice** — risk level: 0 dice (safe), Die 1, or Die 1 + Die 2
- **Machine failure consequence** — what happens if machine failure is rolled (e.g. "lose all
  materials", "team member stranded"). Only present if Die 2 is in play.
- **Machine requirements** — any ability cards needed in the satellite slots
- **Team requirements** — minimum travelling team size or specific type required (if any)
- **Returns** — what can be brought back: materials (tokens), artefact sale value, merit gain
- **Closed loop consequence** — what ripples outward in the shared timeline (if applicable)

**Back side:**

- **Paper title** — flavour (e.g. _"Concrete Evidence: The Chemistry of Roman Marine Structures"_)
- **Mystery tier** — determines legacy point value (see below)
- **Legacy points**
- **Secondary bonus** — bonus merit, a free secondary paper, or similar (if applicable)

### Mystery Tiers

Paper rewards on the back of destination cards scale with how genuinely unknown the subject is:

| Tier        | Description                                  | Example finds                        | Legacy pts |
| ----------- | -------------------------------------------- | ------------------------------------ | ---------- |
| 1 — Known   | Broadly understood; confirms existing theory | Roman nail, 1200 BC grain            | 1–2        |
| 2 — Debated | Contested or partially understood            | Roman concrete, Stonehenge transport | 3–4        |
| 3 — Lost    | Knowledge that vanished completely           | Greek fire, Damascus steel, theriac  | 5–6        |
| 4 — Unknown | Never before seen                            | Silphium, the Wow! signal source     | 8–10       |

A Tier 4 paper is career-defining — the kind of find that wins legacy scoring on its own.

### Two-Sided Destination Cards and Artefact Decisions

Every destination card has a front (jump returns) and a back (academic reward). What you can do
with the card depends on the type of return:

**Observation cards (Stage 1 / drone only):** The card yields base materials and an observation
paper. There is nothing physical to sell — the drone witnessed and recorded. Writing the paper costs
1 action and earns legacy points. No sell option.

**Artefact cards (Stage 2+):** The card itself represents the artefact. Materials (tokens) come
home automatically; the artefact card is held in hand and you decide what to do with it:

| Path                               | Actions | Currency                 | Legacy points |
| ---------------------------------- | ------- | ------------------------ | ------------- |
| **Sell** the artefact              | 1       | Face value               | —             |
| **Write paper** about the artefact | 1       | —                        | Full          |
| **Write paper, then sell**         | 2       | Face value + small bonus | Full          |

Selling forecloses the paper option — you no longer have access to study it. Writing a paper does
not foreclose selling; the paper establishes provenance and marginally increases the sale value.
Holding a card in hand is free and has no time limit — players may accumulate several destination
cards and write papers on all of them in a single turn if they have enough postdocs.

The paper is not about the object retrieved — it is about the _discovery_: the era, the conditions,
what the find reveals about that moment in history or science. A lump of 1200 BC grain is evidence
of agricultural practice. A Roman nail is evidence of construction technique.

**Selling** is covered by the Process Returns column on the capability table. A cultural
specialist's star on this column means they achieve a bonus above face value when selling.

---

## The Research Team

Team members are cards purchased from a central shop. The shop is a shared set of decks in the
centre of the table. The team is divided into **four types**, each with **sub-specialisations** —
forming a 4×4 grid of possible hires.

It is prohibitively expensive to fill the entire grid. You build the team that fits your strategy.

### Capability Table

Every team member card carries a small table — one column per action type — showing what they can do
and how well:

| Indicator | Meaning                                           |
| --------- | ------------------------------------------------- |
| Red dot   | Cannot perform this action                        |
| Green dot | Can perform this action at standard effectiveness |
| Star      | Performs this action with a bonus                 |

**Action columns:** React · Jump · Process Returns · Write Paper · Develop · Plan Next Jump

A star in any column signals that something special happens in that phase — a bonus, a mitigation,
or an unlocked capability. For new players it's a prompt to check the rules; for experienced
players, a reminder of what that card does. Closed loop consequence mitigation and overclock
management both register as stars in the Jump column.

The player has no capability table — they can perform any action with their 3 general actions.

**Location matters:** Some failure types can only be mitigated by team members in the right place.
Team members assigned to the staging area are **travelling** (at the destination). Everyone else is
**at base**. Comms failure is mitigated by a team member at base; machine failure is mitigated by a
team member travelling.

Junior team members have more restricted capability tables than fully specialised ones. Capability
improves as the age marker advances — green dots may become stars, and some blocked actions open up
over time.

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
- **Cultural specialists** — maximise artefact value; their existing relationships achieve above face-value returns when selling
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

### The Researcher Shop

The shop is a single shared deck, sorted at setup so that accessible researchers sit near the top
and more powerful specialists sit deeper. As cards are purchased and the deck advances, the shop
naturally escalates — later cards cost more and require more academic merit, but come with stronger
capability tables and higher base ages.

Each researcher card carries two hire requirements printed on it:

- **Currency cost** — paid from the player's currency tokens
- **Merit threshold** — the minimum legacy points the player must have accumulated to make the hire

A player flush with currency but thin on published papers simply cannot attract the later
specialists. The field is maturing; serious researchers want to join established teams. This
reinforces the core tension: racing for Many Worlds starves the team; building a rich legacy
unlocks the best hires.

When a card is purchased, the shop immediately refills from the top of the deck. The number of cards
visible at once is to be finalised in playtesting (starting point: 4–6 visible).

_The escalating shop also carries flavour: early hires are pioneers in a brand-new discipline; later
hires are specialists in an established field, with credentials and expectations to match._

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

Each team member's career is tracked as an **age**, marked on a scale printed on the side of the
card:

> **25 · 30 · 35 · 40 · 45 · 50 · 55 · 60 · 65 · 70**

A marker advances one step each round. Age is experience — a 50-year-old has served longer and is
simply more capable than the 30-year-old you just hired. Capability improves at age thresholds:
green dots become stars, and some blocked actions open up. (Exact thresholds to be calibrated in
playtesting.)

Team members begin as juniors — cheap, flexible, unspecialised — and start at age 25. More expensive
cards may start at a higher age, reflecting hires with an established track record.

**Retirement:** A team member may retire voluntarily at age 60 or 65. Retirement is mandatory at 70.
This is one of the game's richest decisions — your most experienced researchers are at peak
capability, but the retirement bonus is waiting. Retirement is a payoff, not a loss. A retiring team
member leaves behind one of:

- A permanent machine upgrade card
- A one-time powerful action card
- A flat legacy score bonus

**Team member trades:** When a team member moves to another player's team as part of a loan or deal,
their age marker carries forward — minus one step, as an adjustment cost for a new team, working
style, and machine.

Young researchers are cheap and flexible. Veterans are powerful but finite.

---

## The Lending / Alliance Mechanic

Players may offer use of their time machine or team members to other players.

### Why Lend?

The lender must have an incentive. Suggested options (to be finalised during playtesting):

1. **Reputation gain** — lending earns merit; the lender's design is being validated by external use
2. **Compulsory component exchange** — the borrower has a material or researcher the lender needs;
   the deal is negotiated at the table
3. **Machine returns improved** — the borrower's team learns something during the jump; the lender
   receives a minor upgrade card

### Imbalance by Design

A player far behind benefits greatly from borrowing an advanced machine. This is intentional — it
gives trailing players a catch-up mechanism. The imbalance should favour the borrower in capability,
but the lender extracts value in merit or resources. Both parties gain something.

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
| **Currency**       | Money from artefact sales                           | Used to hire team members and buy upgrades                                                                  |
| **Disrespect**     | Reputational damage from ethical violations         | Each token increases the merit threshold on any researcher hire by 1. One token removed per turn on which no ethical violation is committed (reputation fades). Any remaining at game end reduce legacy score by 1 each. |

### Conversion

- Artefacts are held in hand after a jump — selling costs 1 action; they do not convert
  automatically
- Base metal and silicon are spent directly on machine upgrades — they do not convert to currency
- Exotic elements are spent on specific advanced upgrades only
- Disrespect tokens cannot be converted; they decay one per turn without ethical violation and reduce legacy score if held at game end

---

## Personal Board Layout

Each player has an A5 board representing their workspace. Suggested layout:

```
┌─────────────────────────────────────────────────────────────┐
│  TEAM SLOTS — up to 6 cards, each with age marker           │
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
│                     Currency | Disrespect                   │
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

Before jumping, make one adjustment to last turn's plan in response to table changes. Costs 1
action, and requires turning over a single era card from the target deck — the price of a
last-minute change is working with slightly less information on future jumps. Aborting the jump
entirely is possible but costs more.

### 2. Jump

Execute the planned jump using the destination card from the staging area. Resolve risk if
applicable.

**Machine stage constraint:** What you can _do_ at the destination depends on your machine stage.
Stage 1 (Observation) sends a drone — base materials and observation papers only; no artefacts and
no personal risk. Stage 2+ allows personal travel and artefact retrieval within time limits.

**Risk resolution:** Each destination card specifies a risk level which determines how many dice to
roll. Two custom dice are used, each with typed faces:

| Die                | Faces                                                                 |
| ------------------ | --------------------------------------------------------------------- |
| **Die 1** (mild)   | 4× blank, 1× missed opportunity, 1× comms failure                     |
| **Die 2** (severe) | 3× blank, 1× missed opportunity, 1× comms failure, 1× machine failure |

| Risk level      | Dice rolled       |
| --------------- | ----------------- |
| None            | 0 — safe, no roll |
| Low             | Die 1 only        |
| Moderate / High | Die 1 + Die 2     |

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

**Stranded:** A stranded team member cannot contribute until retrieved and their age marker does not
advance while stranded. On their next turn, the player must choose:

- **Rescue** — jump to the same era at zero risk (no materials retrieved). The team member returns.
  The rescuing player gains merit, acknowledging the cost of the missed productive turn. Another
  player may also offer to retrieve them during their own jump to the same era, earning merit for
  doing so.
- **Abandon** — the team member is lost permanently, with no retirement bonus. The player receives
  a disrespect token for leaving a colleague behind.

_Prototype note: use standard d6s with a reference table. Production: custom dice with printed
symbols._

#### Deliberate Interference

A player may choose to deliberately alter a historical event rather than simply observe and retrieve.
This is high-risk, high-reward, and ethically contested.

**Requirements:** A postdoc must be on the team (at base). Before jumping, they document the
baseline conditions — the zeitgeist of the era. On return, they compare pre- and post-interference
records, producing a paper that proves theories about closed-loop timeline behaviour.

**Rewards:** Exceptional material haul + elevated legacy points (the comparative methodology
justifies the academic credit).

**Costs:**
- Both dice are mandatory (Die 1 + Die 2), regardless of the destination's base risk level
- Draw 2–3 closed loop consequence cards — the quantum physicist cannot mitigate any of them
- Receive a disrespect token — the scientific community has opinions

**Note:** Normal dice failure mitigation still applies (team members can negate rolled outcomes).
Only the consequence draws are unmitigable.

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

Development costs credits, not actions — you can do as many upgrades and hires as you can afford.

### 6. Plan Next Jump

- Select target era deck; draw cards (precision + team bonuses, max 4–5)
- Choose one destination card; place it face-down in the staging area
- Assign team members to the jump (travelling vs. at base)
- Commit any resources required
- Negotiate loans or alliances with other players if desired

---

## Card Types Summary

| Card Type                     | Location                         | Notes                                                       |
| ----------------------------- | -------------------------------- | ----------------------------------------------------------- |
| Destination cards (two-sided) | Era decks (centre table)         | Drawn during Plan Next Jump; flippable for academic rewards |
| Physicist cards               | Team shop deck                   | Purchased during develop phase                              |
| Historian cards               | Team shop deck                   | Purchased during develop phase                              |
| Engineer cards                | Team shop deck                   | Purchased during develop phase                              |
| Postdoc cards                 | Team shop deck                   | Purchased during develop phase; enable paper delegation     |
| Machine base card             | Personal board                   | Starting card, never removed                                |
| Machine stage cards           | Personal board (stacked)         | One per stage upgrade                                       |
| Ability cards                 | Personal board (satellite slots) | Slotted around machine stack                                |
| Turn order card               | Passed around table              | Tracks whose turn it is                                     |

---

## Open Questions / To Resolve

- **Academic scoring metric name** — "legacy points" is the working term; needs a proper name
  (something h-index-like that fits the game's academic theme)
- **3-action special** — which of Breakthrough / Landmark Paper / Temporal Anchor (or a combination)
- **Exact legacy score values** — relative weighting of papers vs team vs machine sophistication vs disrespect penalty
- **Machine failure consequence mix** — what range of outcomes to put on destination cards; how
  severe the worst outcomes should be at each tier
- **Closed loop consequence deck** — size, card mix, ratio of positive to negative effects; exact
  mechanical phrasings for each category of consequence
- **Lending transaction rules** — formalise the exchange mechanic
- **Researcher shop visible count** — how many cards visible at once; starting point is 4–6
- **Exotic element name** — candidates: dark matter, temporal crystal, gravitonium
- **Exact token denominations** — 1/3/7 is a starting point; playtesting will calibrate
- **Game length calibration** — targeting 3–5 hours; action economy and experience rates need tuning
- **Unpredictability token thresholds** — exact point at which mitigation is partially/fully negated
  and extra dice are added; requires playtesting to calibrate
- **Postdoc unlock condition** — does hiring a postdoc immediately unlock card backs, or is there a
  trigger?

---

_Document updated following fourth design session (2 June). All mechanics are provisional and subject
to playtesting._
