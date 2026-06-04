# Time Travel Game - Design Document

_A board game of temporal science, academic rivalry, and historical discovery_

---

## Foreword / Story So Far

It is approximately two hundred years from now. Society looks much as it does today - people still
go to school, argue about politics, complain about the weather, and drink coffee. Science has moved
on considerably. So has education: a single unified global syllabus has emerged, humanity's
collective agreement on what every student should know. Two and a half million theoretical physics
students across every major university are assigned the same essay topic on the same day.

Most skim it, summarise it badly, and submit something passable.

But a handful - three, four, maybe five students, scattered across different countries, different
time zones, different lives - actually read it. Properly. And something clicks.

Independently, almost simultaneously, each of you has cracked the foundational principle of
spatiotemporal translocation - time travel. You can't go far. Not yet. The portal is barely the size
of your thumb. You've proven what it is by taking a photograph of your younger self. You sent a
marble three minutes into the past and caught it before you threw it. The principle is sound, the
maths works, and you are standing at the edge of something that will change everything. You've
already ordered a small camera drone.

You are not rivals. Not exactly. You are peers who have each stumbled into the same extraordinary
discovery, and you each know - because you are scientists - that the person who publishes first, who
builds furthest, who assembles the best team and the most capable machine, will define this field
for generations.

The race begins now, in your garage, with scrap metal and borrowed hardware and a head full of
theory.

---

## Game Overview

**Players:** 2–6

**Duration:** 3–5 hours

**Theme:** Competitive scientific development, time travel, historical discovery

**Format:** Card and tableau based. Each player has a personal board. Shared decks, tokens, and era
cards in the centre of the table.

### Core Loop

Each turn, a player spends their available **action points** across some or all of the following
phases. Early game, you won't have time to do everything. Late game, with a full team behind you,
you can execute the complete sequence in a single turn.

1. **React** _(optional)_ - adjust last turn's plan before jumping or make a spur-of-the-moment
   decision (reduces number of era cards to choose from to 1)
2. **Jump** - open a portal; collect artefacts, information, and/or materials
3. **Realise** _(optional, each costs 1 action)_ - convert artefact cards to currency; write a paper
   for academic reputation
4. **Develop** - recruit team members, install component, upgrade machine
5. **Plan** - assign a team and choose the next destination

### Win Condition

The game ends the moment any player unlocks the **Many Worlds** capability - the ability to jump
between parallel timelines rather than within a single closed loop. This represents the ultimate
scientific achievement and is the final upgrade on the machine development track.

When this is triggered, all players tally their **Academic Reputation score**. The player with the
highest score wins - not necessarily the player who triggered the end game.

---

## Academic Reputation

Reputation accumulates permanently and is never spent - it represents your standing in the field.
The reputation threshold is a floor, not a cost: you must have published enough to demonstrate
credibility, but you do not lose points when hiring. This means a player who races ahead on papers
can access specialists earlier, without sacrificing their end-game score to do so.

A player flush with currency but thin on published papers simply cannot attract the later
specialists. The field is maturing; serious researchers want to join established teams. This
reinforces the core tension: racing for Many Worlds starves the team; building a high reputation
unlocks the best hires.

When a card is purchased, the shop immediately refills from the top of the deck. The number of cards
visible at once is to be finalised in playtesting (starting point: 4–6 visible).

_The advancing pool also carries flavour: early hires are pioneers in a brand-new discipline; later
hires are specialists in an established field, with credentials and expectations to match._

### End Game Scoring

At game end, players score across the following:

| Category                   | Notes                                                                                                           |
| -------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Research papers published  | Accumulated during the game via writing papers                                                                  |
| Disrepute tokens held      | Each token represents unresolved reputational damage; reduce final score by 10 each                             |
| Team cards in play         | Weighted by specialisation level                                                                                |
| Retired researcher bonuses | Veterans leave behind permanent upgrades or bonus reputation                                                    |
| Machine sophistication     | Number and tier of modules installed in module slots                                                            |
| Machine stage reached      | Bonus for each time machine tier unlocked                                                                       |
| Many Worlds bonus          | A flat bonus (approximately equivalent to 4–5 research papers) awarded to the player who triggered the end game |
| Research thesis            | Flat reputation bonus if the player's secret objective was met (see Research Thesis)                            |

**The strategic tension:** Racing hard for Many Worlds risks a low reputation. Building a rich,
well-rounded career risks someone else triggering end game before you're ready. Both approaches are
viable.

---

## Research Thesis

At setup, each player draws one **research thesis card** and keeps it secret. A thesis represents
the scientist's personal academic obsession — the specific question or achievement that would define
their career alongside the main race. It adds a private scoring dimension that other players can
only guess at.

### Scoring

Thesis objectives score at game end. Each is worth a flat reputation bonus if the condition has been
met — significant enough to swing a close game but not so large that it overrides the main scoring
categories. Starting point: 8–10 reputation. To be calibrated in playtesting.

### Revelation

Some objectives are **event-based** and may be revealed by the player at any point once achieved.
Revelation is optional — the player may prefer to stay hidden until final scoring. Others are
**end-only** and can only be verified when the game concludes.

A player who reveals mid-game signals their strategy to the table. A player who stays hidden
maintains the mystery of whether they have already achieved their thesis or are still working toward
it.

| Objective         | Condition                                                           | Revelation |
| ----------------- | ------------------------------------------------------------------- | ---------- |
| **Saturated**     | Have all four module slots filled at game end                       | End only   |
| **Emeritus**      | Retire two team members during the game                             | End only   |
| **Broad Scholar** | Write at least one paper from each of four different eras           | End only   |
| **The Frontier**  | Make at least one successful jump to the Ancient or Prehistoric era | Mid-game   |
| **Tarnished**     | Hold two disrepute tokens at the same time                          | Mid-game   |
| **Maverick**      | Hold two instability tokens at the same time                        | Mid-game   |
| **No Shortcuts**  | End the game having never overclocked your time machine             | End only   |
| **Disruptor**     | Complete at least one deliberate interference jump                  | Mid-game   |
| **Diligent**      | Write a paper for every artefact retrieved                          | End only   |

The full thesis deck should contain 12–16 cards for variety between games. The above are the
starting set; additional objectives to be developed during content design.

---

## Action Economy

Time is your most constrained resource, especially early in the game.

### Player Actions

Each turn the player has **3 general action points**, spendable on any action in the turn sequence.
In the early game - working alone - all 3 are typically consumed by the core loop (one jump, one
realisation, one plan), leaving no time for development. This is intentional: the early game should
feel tight.

### Team Member Actions

Each team member card can take **at most one action per turn**. After acting, the card is exhausted
(turned sideways) and cannot act again until the start of your next turn. You are never _required_
to use a team member.

Every team member card carries a small **capability table** showing what they can do across five
action columns (Red = blocked, Green = standard, Star = bonus). Full detail in The Research Team
section. The player has no capability table - they can perform any action with their 3 general
actions.

### How This Plays Out

**Early game:** all 3 player actions go to the core loop. Any team members you have cover one
additional task each - a postdoc writes a paper, an engineer installs a component.

**Late game:** a well-assembled team may cover all routine actions entirely, freeing your 3 player
actions. Rather than spreading them across tasks the team already handles, you spend all 3 on a
single **3-action special**.

**Jump autonomy:** Initiating a jump normally costs a player action — the player opens the portal.
On a Stage 3+ machine, an experienced engineer or classical physicist with a star on the Jump column
may initiate the jump independently, removing this cost from the player. The exact age threshold or
card tier at which this star appears is to be calibrated in playtesting. Until then, the player must
always initiate.

### The 3-Action Special

Spending all 3 player actions in one move triggers a powerful late-game play. **On a 3-action
special turn, the player does not jump — the special replaces the jump.** The team handles the jump
(if jump autonomy is available) or the player skips jumping that turn. The team also covers Realise
and Plan as normal.

The 3 player actions are consumed entirely by the special. All named team members also exhaust.
Three distinct specials exist, each unlocked by a specific team composition:

- **Breakthrough** — quantum physicist + structural engineer. The team derives a new capability
  independently, without a jump. Effect: install one module for free into any existing empty slot.
- **Landmark Paper** — a researcher and their matching specialist postdoc (physicist + physics
  postdoc; historian + history postdoc; engineer + materials postdoc). Effect: publish a
  career-defining paper worth significantly more reputation than a standard flip. The field of the
  paper is determined by the pairing used. The generalist postdoc cannot trigger this special.
- **Temporal Anchor** — quantum physicist + any historian + advanced fabrication engineer +
  generalist postdoc. Effect: stabilise a parallel timeline entry point. Required before the Many
  Worlds upgrade can be purchased.

---

## The Timeline Interpretations

Time travel in this game operates under two interpretations. All players begin in **Closed Loop**
and may eventually unlock **Many Worlds**.

### Closed Loop (Default)

Every jump changes the past slightly. Those changes propagate forward through physical causality and
manifest in the present as small shifts in material availability, technology, or conditions - not as
anyone's knowledge or memory of change. Only your team knows what happened. The world is simply a
little different.

**Closed loop consequence deck:** A single shared deck of 42 cards (14 positive, 28 negative). After
jumping, the player draws as specified by the destination card (None / Draw 1 / Draw 2). They read
the card aloud and apply the effect immediately. Effects are one-time and resolve instantly.

Drawn cards are discarded face-up beside the face-down deck so players can track what has cycled
through. When the deck is exhausted, the discard pile is shuffled and play continues.

**Difficulty tiers** (chosen at setup):

| Tier       | Rule                                                                                                                                                             |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Easy**   | Destination card draws reduced by 1 (min 0). At end of each complete round, draw 1 consequence — "active player" targeting applies to all players for this draw. |
| **Normal** | Draw as specified on destination card.                                                                                                                           |
| **Hard**   | All destination card draws +1 (min 1 per jump).                                                                                                                  |

Effects may target:

- **Active player** — the player who jumped
- **All other players** — everyone except the player who jumped
- **All players** — the entire table
- **Conditional** — players meeting a specific condition (e.g. holding a particular resource or
  artefact type, or having a specific team member). Only qualifying players are affected, regardless
  of difficulty tier.

The Easy round-end draw expansion (treating "active player" as "all players") applies only to
active-player-targeted cards. Conditional targeting always resolves as written.

**Content guideline:** Cards targeting the active player only should carry mild effects so that when
expanded to all players in the Easy round-end draw, the impact remains manageable.

Examples of the principle in action:

- _You removed a gold nugget that would have sparked a 19th-century gold rush - gold is now scarcer.
  Players holding base metal gain 1 currency._
- _You accidentally left a battery in 1800 AD - energy research accelerated. All players pay 1 less
  currency on their next machine upgrade._
- _New manufacturing processes emerged from your left-behind technology - engineers gain 1 bonus
  action this round._
- _You prevented the burning of the Library of Alexandria - historians have access to better
  records. Players with a historian on their team draw 1 additional card on their next jump._
- _Your excavation disturbed a mineral deposit - all players lose 1 base metal token._
- _A temporal ripple affected equipment calibration - all players gain 1 instability token._

Flavour text explains the causality. The mechanical effect applies regardless of whether the jumping
player intended the change.

**Quantum physicist mitigation:** A quantum physicist with a star on the Realise column may look at
the top 2 consequence cards and choose which one applies, or discard one without effect.

### Many Worlds (Unlocked)

Achieving the Many Worlds upgrade requires one jump using that technology in order to trigger end
game scoring. All players tally their Academic Reputation score; the highest wins - not necessarily
the player who triggered it. The triggering player receives a flat bonus equivalent to 4–5 research
papers for reaching this milestone first.

---

## The Time Machine

Each player's time machine lives at the centre of their personal board. It begins as a rough
prototype and develops across four distinct stages. The stage you are at defines what kind of jumps
you can make.

### Machine Stages

| Stage | Name                  | Capability                                                                                                          | Notes                                                                                                                                                                                                                                                                                                                                          |
| ----- | --------------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0     | **Observation**       | Drone retrieval, no personal travel                                                                                 | A drone is sent in your place. Retrieves small quantities of base materials and can record observations for academic papers (confirming or denying historical myths; witnessing documented events). No artefact retrieval - the drone cannot carry them. No personal risk. _The thrill of first contact — pure discovery, no personal danger._ |
| 1     | **Visitation**        | Physical presence, time-limited                                                                                     | You can visit and interact but carry only a portable return pad - you have roughly one hour before it expires. Risk of being stranded if delayed. _Peak personal danger: exhilarating and genuinely unnerving._                                                                                                                                |
| 2     | **Extended Presence** | Longer visits, more actions at destination                                                                          | More reliable return mechanism. Can bring back larger hauls, spend more time selecting resources. _More capable but more complex — richer returns, more to coordinate._                                                                                                                                                                        |
| 3     | **Stable Portal**     | Reliable two-way transit, reduced risk                                                                              | Full control. Miniaturised and refined. _Operations become routine; reliable enough to lend — borrowing and lending peaks here._                                                                                                                                                                                                               |
| 4     | **Enhanced Portal**   | Reliable two-way transit plus spatial translocation (teleportation) at destination, reduced risk of machine failure | Full control. Miniaturised and refined. Foundation for the Many Worlds unlock. _Mechanically smooth but contextually volatile: the race to Many Worlds intensifies, competition sharpens, and the resources needed push into the most demanding eras._                                                                                         |

Each stage is represented by a new card placed on the machine stack on the personal board. The stack
visually narrates the machine's development.

### Module Slots

Around the central machine stack are **4 module slots**. Each slot has a type and accepts only
matching modules:

- **Precision slot** - upgrades targeting accuracy (enables larger choice of era cards)
- **Reversal slot** - temporal analysis and consequence management. Modules in this slot represent
  increasingly sophisticated understanding of the closed loop. Three upgrade tiers: _Familiarity_
  (replay a destination with active real-time temporal feedback — the machine creates an awareness
  link so the team can sense what's shifting and course-correct); _Hindsight_ (on revisit,
  consequence draw reduced or previewed — the team understands what changed last time); _Awareness_
  (targeted reversal — a revisit can undo a specific consequence rather than just reduce risk). The
  slot supports revisiting any destination to extract more depth, not just recovering from bad
  outcomes. Exact mechanics to be calibrated in playtesting.
- **Materials slot** - exotic material installation. Accepts a horexium or aevium token (refined
  from exotic ore during Develop). The double-sided token is placed face-up showing which material
  is installed. Horexium: overclocking adds 1 fewer instability token while installed. Aevium: draw
  one additional card from an adjacent era on every Plan while installed.
- **Computing slot** - processing upgrades and overclocking

### Machine Upgrade Path

Upgrade branches are visible to all players from the start of the game. There are no hidden traps -
all paths reach the same power ceiling but via different strengths:

- **Engineering branch** - precision and reliability. Best for consistent, low-risk jumps
- **Quantum Physics branch** - unlocks interaction with timeline consequences, better closed loop
  navigation
- **Theoretical/Dimensional branch** - enables scouting (send a researcher ahead without a full
  jump), contributes to the Many Worlds unlock

The Many Worlds upgrade requires contributions from all three branches, specific exotic materials,
and a minimum team specialisation threshold.

### Overclock

Experimental physicists may install an **overclock** to the machine - pushing it beyond its rated
capability for a single jump. The player chooses one of the following benefits on a jump:

- **Higher era access** - draw from the destination deck one era above what the machine stage
  normally allows
- **Bypass one machine requirement** - ignore one module requirement listed on the destination card

Overclock always forces Die 2 to be added to the jump's risk roll, regardless of the destination's
base risk level.

Each overclock adds one **machine instability token**, placed on the machine stack. See Instability
below for how tokens affect jumps.

### Instability

Instability tokens represent accumulated strain on the operation — from pushing the machine beyond
its limits, or from hasty, underprepared jumps. **The total count across all held tokens determines
the effect on every jump, regardless of source.**

Tokens are placed in one of two areas to indicate their origin, which governs how they are removed:

- **Machine instability** (on the machine stack): caused by overclocking. Can be mitigated by
  experimental physicists (star on Jump column — card text specifies the exact benefit). Removed
  only by a Reliability Engineer: one token per turn on any turn the player does not overclock.
- **Team instability** (near the team slots): caused by a hasty React with no staged plan, or by
  certain consequence cards. Removed naturally at a rate of one per turn with no special
  requirement. A React-added token is active only for that turn's jump and is gone by end of turn —
  the panic fades.

| Tokens held | Effect on jump                                      |
| ----------- | --------------------------------------------------- |
| 1           | Die 2 added; typed mitigation available             |
| 2           | One mitigation team member is unavailable this jump |
| 3           | All mitigation negated + additional Die 1 roll      |
| 4+          | All mitigation negated + 1+ additional Die 2 rolls  |

_Token thresholds are a starting point for playtesting._

---

## The Era Decks

The centre of the table holds five **era decks**, each representing a distinct period in history.
Cards are drawn from these decks during the Plan phase. Each era has a colour code for quick
identification and scales in difficulty, reward, and rarity with temporal distance from the game's
present (~2125 AD).

A sixth era - the Future - is planned but deferred to a later design phase and may be produced as an
expansion.

### Eras

| Era              | Period        | Machine stage                   | Colour              | Notes                                        |
| ---------------- | ------------- | ------------------------------- | ------------------- | -------------------------------------------- |
| **Recent**       | 2000–2125 AD  | Stage 0+                        | Yellow              | Entry point; closest to game's present       |
| **Modern**       | 1800–2000 AD  | Stage 1+                        | Silver/grey         | Age of discovery and accelerated development |
| **Early-Modern** | 1500–1800 AD  | Stage 2+                        | Blue                | Age of exploration and early science         |
| **Medieval**     | 500–1500 AD   | Stage 3+                        | Forest green        | Feudal societies, early engineering          |
| **Ancient**      | 500 BC–500 AD | Stage 4                         | Terracotta/burgundy | Classical civilisations, lost knowledge      |
| **Prehistoric**  | Before 500 BC | Stage 4 + Theoretical physicist | Deep ochre/brown    | Deep time; hardest to reach, greatest reward |

Ancient and Prehistoric decks sit face-down in the centre of the table as a visible reminder of what
players are working toward.

### Stage 0 Destination Cards

A small set of Stage 0 destination cards - drone-accessible, observation-only - is included in the
game. These yield base materials and observation papers, but no artefacts. Observation papers are
primarily Tier 3 (lost or unverifiable knowledge - the drone witnesses something no historian has
confirmed), giving players enough reputation from their first jump to begin accessing the researcher
shop.

**Standard setup (recommended for first play):** Seed Stage 0 cards to the top of the Modern era
deck. Every player's first jump is productive from turn one, and the paper and academic reputation
mechanics are introduced naturally before anyone has upgraded their machine.

**Experienced setup:** Remove Stage 0 cards from the deck entirely. All players begin with a Stage 1
machine (Visitation). The early game is denser - players start with full retrieval capability and
manage the faster strategic pace from turn one.

### Precision and Card Drawing

Card selection happens during the **Plan** phase, not during the jump itself. The player draws from
the target era deck, selects one card, places it face-down in the staging area, and executes it on
their next turn. This gives all players time to consider the table state and plan responses.

The number of cards drawn is determined by two factors:

- **Machine precision** (upgraded via the Precision module slot)
- **Travelling team members** with relevant expertise (historians, quantum physicists, engineers
  with a star on the Plan column)

| Precision Level | Base draw             | Notes                            |
| --------------- | --------------------- | -------------------------------- |
| Decade (base)   | 1 card - must take it | No choice; machine too imprecise |
| Year            | 2 cards - pick 1      |                                  |
| Month           | 3 cards - pick 1      |                                  |
| Week            | 4 cards - pick 1      |                                  |
| Day (max)       | 5 cards - pick 1 or 2 |                                  |

Team members may add +1 draw each, up to a maximum of 4–5 cards total regardless of precision level.
Better precision means more choice, not necessarily better destinations.

### Destination Card Contents

**Front side:**

- **Era and location** - which era deck it belongs to; specific place and date
- **Flavour text** - 1–2 lines setting the scene
- **Dice** - risk level: 0 dice (safe), Die 1, or Die 1 + Die 2
- **Machine failure consequence** - what happens if machine failure is rolled (e.g. "lose all
  materials", "team member stranded"). Only present if Die 2 is in play.
- **Machine requirements** - any modules needed in the module slots
- **Team requirements** - minimum travelling team size or specific type required (if any). Hard
  requirements exist only at the era level (e.g. Prehistoric requires a theoretical physicist).
  Per-card requirements are soft: the destination is accessible without the specified team member,
  but going without applies a modifier — an extra die, reduced returns, or both. The exact modifier
  is printed on the card.
- **Returns** - what can be brought back: materials (tokens), artefact sale value, reputation gain
- **Closed loop consequence** - what ripples outward in the shared timeline (if applicable): how
  many consequence cards to draw. Some destination cards specify a particular effect directly rather
  than drawing from the deck; others specify additional draws on top of a fixed effect.

**Back side:**

- **Paper title** - flavour (e.g. _"Concrete Evidence: The Chemistry of Roman Marine Structures"_)
- **Mystery tier** - determines reputation value (see below)
- **Reputation**
- **Secondary bonus** - bonus reputation, a free secondary paper, or similar (if applicable)

### Mystery Tiers

Paper rewards on the back of destination cards scale with how genuinely unknown the subject is:

| Tier        | Description                                  | Example finds                        | Reputation |
| ----------- | -------------------------------------------- | ------------------------------------ | ---------- |
| 1 - Known   | Broadly understood; confirms existing theory | Roman nail, 1200 BC grain            | 1–2        |
| 2 - Debated | Contested or partially understood            | Roman concrete, Stonehenge transport | 3–4        |
| 3 - Lost    | Knowledge that vanished completely           | Greek fire, Damascus steel, theriac  | 5–7        |
| 4 - Unknown | Never before seen                            | Silphium, the Wow! signal source     | 8–10       |

A Tier 4 paper is career-defining - the kind of find that provides a substantial boost to reputation
on its own.

### Two-Sided Destination Cards and Artefact Decisions

Every destination card has a front (jump returns) and a back (academic reward). What you can do with
the card depends on the type of return:

**Observation cards (Stage 0 / drone only):** The card yields base materials and an observation
paper. There is nothing physical to sell - the drone witnessed and recorded. Writing the paper costs
1 action and earns reputation. No sell option.

**Artefact cards (Stage 1+):** The card itself represents the artefact. Materials (tokens) come home
automatically; the artefact card is held in hand and you decide what to do with it:

| Path                               | Actions | Currency                 | Reputation |
| ---------------------------------- | ------- | ------------------------ | ---------- |
| **Sell** the artefact              | 1       | Face value               | -          |
| **Write paper** about the artefact | 1       | -                        | Full       |
| **Write paper, then sell**         | 2       | Face value + small bonus | Full       |

- Selling forecloses the paper option - you no longer have access to study it.
- Writing a paper does not foreclose selling; the paper establishes provenance and marginally
  increases the sale value. A 'paper' token is placed on the card so that no additional papers can
  be written.
- Holding a card in hand is free and has no time limit - players may accumulate several destination
  cards and write papers on all of them in a single turn if they have enough postdocs, or can write
  papers and sell if they have enough postdocs and actions.

The paper is not about the object retrieved - it is about the _discovery_: the era, the conditions,
what the find reveals about that moment in history or science. A lump of 1200 BC grain is evidence
of agricultural practice. A Roman nail is evidence of construction technique.

**Selling** is covered by the Realise column on the capability table. A cultural specialist's star
on this column means they achieve a bonus above face value when selling.

---

## The Research Team

Team members are cards purchased from a central shop. The shop is a shared set of decks in the
centre of the table. The team is divided into **four types**, each with **sub-specialisations** -
forming a 4×4 grid of possible hires.

It is prohibitively expensive to fill the entire grid. You build the team that fits your strategy.

### Capability Table

Every team member card carries a small table - one column per action type - showing what they can do
and how well:

| Indicator | Meaning                                           |
| --------- | ------------------------------------------------- |
| Red dot   | Cannot perform this action                        |
| Green dot | Can perform this action at standard effectiveness |
| Star      | Performs this action with a bonus                 |

**Action columns:** React · Jump · Realise · Develop · Plan

A star in any column signals that something special happens in that phase - a bonus, a mitigation,
or an unlocked capability. For new players it's a prompt to check the text on the card; for
experienced players, a reminder that the card does something. Overclock repair registers as a star
in the React column, Overclock management registers as a star in the Jump column, Closed loop
consequence mitigation as a star in the Realise column. Jump autonomy (initiating a jump without the
player, on a Stage 3+ machine) also registers as a star in the Jump column for experienced engineers
and classical physicists — the card text distinguishes this from other Jump stars.

The player has no capability table - they can perform any action with their 3 general actions.

**Location matters:** Some failure types can only be mitigated by team members in the right place.
Team members assigned to the staging area are **travelling** (at the destination). Everyone else is
**at base**. Comms failure is mitigated by a team member at base; machine failure (return pad
failure in stage 2) is mitigated by a team member travelling.

Junior team members have more restricted capability tables than fully specialised ones. Capability
improves as the age marker advances - green dots may become stars, and some blocked actions open up
over time.

### The Four Team Types

#### Physicists

Drive machine development and jump capability.

- **Classical** - precision upgrades, machine reliability
- **Quantum** - closed loop navigation, timeline risk reduction
- **Theoretical** - dimensional theory, contributes to Many Worlds unlock
- **Experimental** - rapid prototyping, component testing, overclock management during jumps

#### Historians

Drive destination knowledge and return quality.

- **Era specialists** - deep knowledge of a period; look ahead in era decks or draw additional cards
- **Resource specialists** - identify high-value materials at a destination (better returns)
- **Cultural specialists** - maximise artefact value; their existing relationships achieve above
  face-value returns when selling
- **Archaeological** - recover additional items from a single jump (unlock an artefact on cards
  which would otherwise not return one)

#### Engineers

Drive machine construction, maintenance, and reliability.

- **Structural** - build and install base machine components
- **Systems** - energy usage and computing upgrades
- **Reliability** - reduce jump risk, repair overclock damage
- **Advanced fabrication** - required to install exotic element upgrades

#### Postdocs / Writers

Drive academic output and paper production, freeing other team members for higher-value tasks.

- **Physics postdoc** - writes papers on time travel discoveries and machine breakthroughs
- **History postdoc** - writes papers on artefacts and era discoveries
- **Materials postdoc** - writes papers on resource finds and material science
- **Generalist postdoc** - slower but can cover any paper type

Writing a paper always costs 1 action; the player may take this action themselves. Postdocs exist to
take it off the player's plate, freeing those actions for higher-value work. Card backs are always
accessible — there is no unlock condition.

### Researcher Applications

The applications pool is a single shared deck, sorted at setup so that accessible researchers sit
near the top and more powerful specialists sit deeper. As applicants are accepted and the deck
advances, the pool naturally advances - later cards cost more and require more academic reputation,
but come with stronger capability tables and higher base ages.

Each researcher card carries two hire requirements printed on it:

- **Currency cost** - paid from the player's currency tokens
- **Reputation threshold** - the minimum reputation the player must have accumulated to make the
  hire

### Team Synergies

Some combinations are notably powerful:

- Three engineers + one physicist: highly reliable machine, very low jump risk, good overclock
  capability - but slow academic output and limited destination knowledge
- Heavy historian roster: exceptional returns per jump, good paper output with postdocs - but
  machine development lags
- Mixed specialist team: slower to assemble, but capable of executing the full turn sequence
  efficiently by late game

No combination should make winning impossible - different builds reach the same ceiling by different
routes.

### Researcher Lifecycle

Each team member's career is tracked as an **age**, marked on a scale printed on the side of the
card:

> **25 · 30 · 35 · 40 · 45 · 50 · 55 · 60 · 65 · 70**

A marker advances one step each round. Age is experience - a 50-year-old has served longer and is
simply more capable than the 30-year-old you just hired. Capability improves at age thresholds:
green dots become stars, and some blocked actions open up. (Exact thresholds to be calibrated in
playtesting.)

Team members begin as juniors - cheap, flexible, unspecialised - and start at age 25. More expensive
cards may start at a higher age, reflecting hires with an established track record.

**Retirement:** A team member may retire voluntarily at age 60 or 65. Retirement is mandatory at 70.
This is one of the game's richest decisions - your most experienced researchers are at peak
capability, but the retirement bonus is waiting. Retirement is a payoff, not a loss. A retiring team
member leaves behind one of:

- A permanent machine upgrade card
- A one-time powerful action card
- A flat reputation score bonus

Young researchers are cheap and flexible. Veterans are powerful but finite.

**Field Training:** At age 40, a team member may take a field training specialisation — a choice
that reflects years of increasingly dangerous jumps and a decision to prepare accordingly. Field
training options include weapons handling, martial arts, and surveillance. A field-trained team
member travelling at a destination can negate a bane result from Die 3, preventing the Die 2
cascade. Only one field skill may be chosen per researcher; the choice is made when the age marker
reaches 40. Exact capability implications per skill are to be developed during content design.

**Dismissal:** A team member may be dismissed during the Develop phase. The player pays severance
(currency cost to be calibrated in playtesting). If the team member has reached age 40, they also
receive a partial retirement bonus — smaller than the full benefit available at age 60+, but
acknowledging their investment in the project. Dismissed researchers leave the game entirely; they
do not return to the shop. No disrepute token is incurred — this is a financial transaction, not an
ethical failing.

---

## The Lending / Alliance Mechanic

Players may offer use of their time machine or team members to other players. All terms are freely
negotiated at the table — the lender may ask for currency, resources, future reciprocation, or
nothing at all. If they ask too much, the borrower can refuse; if they forget to ask for anything,
that is their loss.

### Lending Incentives

When the borrower completes a jump using the lender's machine, the lender receives an **automatic
flat reputation gain** — external use of their design validates the build. This applies to machine
lending only; lending team members carries no automatic reputation gain. Amount to be calibrated in
playtesting.

Additional terms are freely negotiated and may include: resources, artefacts, team member loans or
transfers, or future reciprocation.

### How a Loan Works

Loans are initiated at the beginning of a jump — either during React or at the start of a normal
jump turn. The borrower uses the lender's machine stage, module slots, and any agreed team members
for that jump, resolved immediately on the borrower's turn.

**React case:** During a jump prepared in a React step, the instability token is applied to
**whichever machine is used for the jump** — the borrower's own if they are jumping with it, or the
lender's if they are borrowing. This gives lenders genuine skin in the game and makes negotiations
in React situations naturally more tense.

**Normal case:** If the borrower has a staged plan and is simply borrowing capability they fall
short on, no instability is added to the lender. The lender's team has had the same five years of
preparation and is simply helping on the day.

The lender's machine returns after the jump. There is no unavailability penalty on the lender's next
turn.

### Loans vs Transfers

**Loan:** A team member works with the borrower for one jump — whether travelling to the destination
or providing support at base — and returns to the home team automatically afterward. No age
adjustment — this is a brief professional collaboration, not a career move.

**Transfer:** A team member moves permanently to another player's team. Their age marker carries
forward but is treated as 5 years less, reflecting the adjustment cost of a new team, working style,
and machine.

### Imbalance by Design

A player far behind benefits greatly from borrowing an advanced machine. This is intentional - it
gives trailing players a catch-up mechanism. The imbalance should favour the borrower in capability,
but the lender extracts value in reputation or resources. Both parties gain something.

### Alliances

Organic alliances will form around specialisation. A player with outstanding historians, a player
with outstanding physicists, and a player with excellent raw materials are collectively more capable
than any one of them alone. The game does not enforce alliances but incentivises them through the
lending mechanic.

This opens the possibility of team play — alliances who achieve the Many Worlds jump should be
allowed to pool their points and win together.

---

## Tokens and Resources

All resources are tracked with tokens on the personal board. Denominations of 1, 5, and 10 are
suggested to allow flexible representation without excessive tokens.

### Token Types

| Token          | Represents                                               | Notes                                                                                                                                                                                                                          |
| -------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Base Metal** | Iron, copper, steel - structural machine components      | Common, accessible from early era decks                                                                                                                                                                                        |
| **Chips**      | Computing and processing components                      | Mid-game resource                                                                                                                                                                                                              |
| **Exotic Ore** | Raw exotic material collected from deep-era destinations | Late-game only; Ancient and Prehistoric destinations. Refined during Develop into either horexium or aevium.                                                                                                                   |
| **Horexium**   | Refined exotic material — temporal stabiliser            | Installed in the Materials slot. While installed: overclocking adds 1 fewer instability token than normal (minimum 0).                                                                                                         |
| **Aevium**     | Refined exotic material — temporal broadener             | Installed in the Materials slot. While installed: draw one additional destination card from an adjacent era during every Plan phase, on top of the normal precision draw.                                                      |
| **Currency**   | Money from artefact sales                                | Used to hire team members and buy upgrades                                                                                                                                                                                     |
| **Disrepute**  | Reputational damage from ethical violations              | Each token increases the reputation threshold on any researcher hire by 1. One token removed per turn on which no ethical violation is committed (damage fades). Any remaining at game end reduce reputation score by 10 each. |

### Conversion

- Artefacts are held in hand after a jump - selling costs 1 action; they do not convert
  automatically
- Base metal and chips are spent directly on machine upgrades - they do not convert to currency
- Exotic ore is refined during Develop into either horexium or aevium (exchange the ore token for
  the double-sided exotic material token, choose which face is up). The refined token is then
  installed in the Materials module slot — it is not a currency; it is a machine component. Horexium
  and aevium are spent when their capability is triggered; they do not convert to currency
- Disrepute tokens cannot be converted; they decay at a rate of one per each turn without an ethical
  violation, and reduce reputation score if held at game end

---

## Personal Board Layout

Each player has an A5 board representing their workspace. Suggested layout:

```text
┌─────────────────────────────────────────────────────────────┐
│  TEAM SLOTS - up to 8 cards, each with age marker           │
│  [ Physicist ] [ Historian ] [ Engineer ] [ Postdoc ] ...   │
├────────────────────────┬────────────────────────────────────┤
│                        │  MODULE SLOTS           │
│   TIME MACHINE         │  [ ] Precision                     │
│   (card stack)         │  [ ] Reversal                      │
│   Stage: 0/1/2/3/4     │  [ ] Materials                     │
│                        │  [ ] Computing                     │
├────────────────────────┴────────────────────────────────────┤
│  RESOURCE TOKENS:   Metal | Chips | Exotic Ore               │
│                     Currency | Disrepute                   │
├─────────────────────────────────────────────────────────────┤
│  JUMP PLAN STAGING AREA                                     │
│  (destination card face-down + assigned team + resources)   │
├─────────────────────────────────────────────────────────────┤
│  PAPERS PUBLISHED: ___    LEGACY TRACK: ___                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Turn Structure

### 1. React / _(optional)_

Before jumping, make a last-minute adjustment to last turn's plan, or — if no jump was staged — make
a spur-of-the-moment decision. Either way, the team is acting without a proper planning cycle.

**Costs 1 action.** Even a hasty jump takes real effort: rough calculations, rapid briefings,
last-minute workshops. Actions represent a meaningful block of time and work, and setting up a jump
demands that regardless of how little preparation there was.

**Instead of a normal precision draw, you may only take the top card of the target era deck — no
choice.** At low precision this is no different from a normal Plan; at high precision it is a
significant downgrade. This is simply the reality of operating without five years of lead time.

If no jump was staged, an instability token is also added — the team is not ready and the machine
knows it.

Aborting the jump entirely is also possible - whether it costs more should be determined during
playtesting.

### 2. Jump

Execute the planned jump using the destination card from the staging area. Resolve risk if
applicable.

**Machine stage constraint:** What you can _do_ at the destination depends on your machine stage.
Stage 0 (Observation) sends a drone - base materials and observation papers only; no artefacts and
no personal risk. Stage 1+ allows personal travel and artefact retrieval.

**Risk resolution:** Each destination card specifies a risk level which determines how many dice to
roll. Two custom dice are used, each with typed faces:

| Die                    | Faces                                                                 |
| ---------------------- | --------------------------------------------------------------------- |
| **Die 1** (mild)       | 4× blank, 1× missed opportunity, 1× comms failure                     |
| **Die 2** (severe)     | 3× blank, 1× missed opportunity, 1× comms failure, 1× machine failure |
| **Die 3** (volatility) | 2× blank, 2× boon, 2× bane                                            |

| Risk level                        | Dice rolled       |
| --------------------------------- | ----------------- |
| None                              | 0 - safe, no roll |
| Low                               | Die 1 only        |
| Moderate / High                   | Die 1 + Die 2     |
| Ancient / Prehistoric destination | + Die 3 (always)  |

> _Prototype note: use standard d6s with a reference table. Production: custom dice with printed
> symbols._

**Typed outcomes:**

- **Blank** - successful jump, full haul
- **Missed opportunity** - slightly reduced material gains (poor timing, couldn't reach everything)
- **Comms failure** - moderately reduced material gains (team panics without coordination)
- **Machine failure** - consequence specified on the destination card (examples: lose all materials,
  lose a team member for one turn, team member stranded)
- **Boon** - bonus specified on the destination card (examples: extra materials, additional
  artefact, improved paper tier). TBD per card during content design.
- **Bane** - cascade: roll Die 2 and apply the result. Field-trained team members travelling may
  negate the bane before the Die 2 is rolled.

If multiple dice show results, apply all.

**Overclock:** Adds Die 2 to any roll regardless of the destination's base risk level. A low-risk
destination with overclock can produce machine failure. This is the core tradeoff of overclocking.

**Typed mitigation:** Team members with a star on the relevant capability column negate that failure
type - but location matters. Comms failure can only be mitigated by a team member **at base**
(maintaining the uplink). Machine failure can only be mitigated by a team member **travelling** (at
the destination, physically present to fix it). Missed opportunity is mitigated by a historian
**travelling** (they need to be there to spot what others would miss). Bane is mitigated by a
field-trained team member **travelling** (see Field Training below).

**Stranded:** A stranded team member cannot contribute until retrieved and their age marker does not
advance while stranded. In the Plan step at the end of their turn or the React step at the start of
their next turn, the player must choose:

- **Rescue** - jump to the same era at zero risk (no materials retrieved). The team member returns.
  The rescuing player gains reputation, acknowledging the cost of the missed productive turn.
  Another player may also offer to retrieve them during their own jump to the same era, earning
  reputation for doing so.
- **Abandon** - the team member is lost permanently, with no retirement bonus. The player receives a
  disrepute token for leaving a colleague behind.

#### Deliberate Interference

A player may choose to deliberately alter a historical event rather than simply observe and
retrieve. This is high-risk, high-reward, and ethically contested.

**Requirements:** A postdoc must be on the team (at base). Before jumping, they document the
baseline conditions - the zeitgeist of the era. On return, they compare pre- and post-interference
records, producing a paper that proves theories about closed-loop timeline behaviour.

**Rewards:** Exceptional material haul + elevated reputation (the comparative methodology justifies
the academic credit).

**Costs:**

- Both dice are mandatory (Die 1 + Die 2), regardless of the destination's base risk level
- Draw 2–3 closed loop consequence cards - the quantum physicist cannot mitigate any of them
- Receive a disrepute token - word gets out and society has opinions

**Note:** Normal dice failure mitigation still applies (team members can negate rolled outcomes).
Only the consequence draws are unmitigable.

### 3. Realise

**Mandatory activities:**

- Collect materials as tokens on the board (automatic - no action required)
- Apply closed loop consequences to the shared timeline if applicable
- Artefact cards are held in hand - no action required yet

_**Optional activities - each costs 1 action:**_

Artefact cards in hand may be sold (1 action, face value currency) or written up as a paper (1
action, flip the card for reputation), or both in sequence (2 actions, full currency + small bonus).
Either the player or an eligible team member may take these actions. See Two-Sided Destination Cards
for full detail.

### 4. Develop

Spend resources and currency on any combination of:

- Advance machine to next stage (stack a new machine card)
- Install modules into module slots
- Recruit team members from the shop

Development costs currency, not actions - you can do as many upgrades and hires as you can afford.

### 5. Plan

- Select target era deck; draw cards (precision + team bonuses, max 4–5)
- Choose one destination card; place it face-down in the staging area
- Assign team members to the jump (travelling vs. at base)
- Commit any resources required
- Negotiate loans or alliances with other players if desired

**Holding a staged card:** If the staging area already holds a card from a previous turn, it may
remain there as long as needed. The slot is occupied: the player cannot plan a new jump until it is
cleared by either executing the jump or discarding the card.

**Discarding a staged card:** The player may spend 1 player action to discard a staged card. The
card is not removed from the game — it is shuffled back into the middle of its era deck. (Another
team might make the same discovery.) Team members cannot take this action.

> Optional rule for seasoned players: when choosing destination cards, you are not allowed to look
> at the paper rewards on the back

---

## Card Types Summary

| Card Type                     | Location                      | Notes                                                   |
| ----------------------------- | ----------------------------- | ------------------------------------------------------- |
| Destination cards (two-sided) | Era decks (centre table)      | Drawn during Plan; flippable for academic rewards       |
| Physicist cards               | Team shop deck                | Purchased during develop phase                          |
| Historian cards               | Team shop deck                | Purchased during develop phase                          |
| Engineer cards                | Team shop deck                | Purchased during develop phase                          |
| Postdoc cards                 | Team shop deck                | Purchased during develop phase; enable paper delegation |
| Machine base card             | Personal board                | Starting card, never removed                            |
| Machine stage cards           | Personal board (stacked)      | One per stage upgrade                                   |
| Modules                       | Personal board (module slots) | Installed in module slots around the machine stack      |
| Research thesis cards         | Player hand (secret)          | Drawn at setup; scored at game end                      |
| Turn order card               | Passed around table           | Tracks whose turn it is                                 |

---

## Open Questions / To Resolve

- **Exact reputation score values** - relative weighting of papers vs team vs machine sophistication
  vs disrepute penalty
- **Machine failure consequence mix** - what range of outcomes to put on destination cards; how
  severe the worst outcomes should be at each tier
- **Researcher shop visible count** - how many cards visible at once; starting point is 4–6
- **Exact token denominations** - 1/3/7 is a starting point; playtesting will calibrate
- **Game length calibration** - targeting 3–5 hours; action economy and experience rates need tuning
- **Instability token thresholds** - exact point at which mitigation is partially/fully negated and
  extra dice are added; requires playtesting to calibrate

---

_Document updated following sixth design session (4 June 2026). All mechanics are provisional and
subject to playtesting._
