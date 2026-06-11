# Game Design Document

### _Working title: **Warped** (pending an IP/legal check — repo still says "Time Travel")_

_The single source of truth for **what the game is** — the complete ruleset in one place. The
**why** behind every decision lives in `intentions.md`; the **tuning model** lives in `sim/`. All
numbers are provisional and exist to be playtested, not defended; per-card values (step
requirements, find cash, objective reputation) live **on the cards** — this document describes the
system that reads them. Supersedes `design-skeleton.md` (archived)._

---

## 1. The fiction

You and your rivals were colleagues once — the team that, together, cracked time travel. Now each of
you runs your own lab, racing to turn that shared discovery into the greatest scientific legacy of
the age: to reach further into history than anyone, to recover what was thought lost, to publish the
papers that rewrite the textbooks — and, if you dare, to be the first to open the door to the
multiverse itself.

But every jump leaves a mark. The timeline you all share remembers how greedy the table has been,
and if it frays too far, reality itself begins to come apart. You are scientists, not thieves — but
the line between preserving history and plundering it is yours to walk.

---

## 2. The object of the game

Build a **team** and a **time machine**, jump to **destinations** across history, and solve the
**challenge** each one presents — banking **Cash** to grow your lab and **Reputation** (your legacy,
and the score). The player with the greatest legacy wins.

**The game ends three ways — whichever comes first:**

| Ending           | Trigger                                                     | Feeling                                                              |
| ---------------- | ----------------------------------------------------------- | -------------------------------------------------------------------- |
| **Triumph**      | A player **completes a Many Worlds expedition**             | The multiverse opens — humanity's furthest reach                     |
| **Collapse**     | **Timeline Integrity hits 0** → a final "Unravelling" round | Reality comes apart; a dramatic third act, not a buzzer              |
| **Quiet legacy** | **Every player has retired**                                | The pioneers retire respected; time travel matured into a discipline |

All three end on the same **scoring** (§12). None of them erases your work — even collapse is a
mode-flip, never a dead stop.

---

## 3. Components

- **Era track** (the destinations, by depth):
  `1 Recent · 2 Modern · 3 Early Modern · 4 Medieval · 5 Ancient · 6 Prehistoric · 7 Many Worlds`.
  Deeper = bigger prizes, scarier.
- **Destination (era) cards** — each a left-to-right path of steps (the expeditions).
- **Researcher market** — a **Researchers** (junior) deck and an **Experts** (veteran) deck, plus a
  **Parting Gift** deck (retirement payoffs).
- **Consequence deck** (shared).
- **Timeline Integrity track** (one, shared by the whole table).
- **Skill cards** in three skills: **Insight · Craft · Grit** (the deck-builder currency).
- **Each player board:**
  - **Time Machine** — four modules (§8) + accumulated **instability tokens**.
  - **Team** — the researcher cards you own.
  - **Cash** · **Reputation** (the score, never spent) · a separate **Disrepute** pile (moral-stain
    tokens) · an **Artefacts** zone.
  - A **skills deck**, built fresh each expedition (§6).

---

## 4. Setup

- Each player starts with **no team, no artefacts, no reputation, no disrepute, and 3 Cash**.
- Machine: **Amplifier, Capacitor, Collimator at level 1; Stabiliser at max-instability 2.** The
  Amplifier's **first upgrade is free**, so **Recent and Modern are both reachable from turn one**.
- A permanent **player base of 2 Insight / 2 Craft / 2 Grit** goes into every deck you ever build.
- **Timeline Integrity = (players + 1) × 4** → 16 (3p) · 20 (4p) · 24 (5p).
- The first player begins their turn at **React** in the **Recent** era.

---

## 5. Anatomy of a turn

A turn runs in order: **(React) → (Negotiate) → Jump → Process → Develop → Plan.** You **Plan** at
the _end_ of your turn for your _next_ turn, so most prep happens during other players' turns —
downtime stays low.

- **React** _(only if you have a jump staged)_ — cancel a jump a consequence has invalidated, **or**
  improvise a last-minute jump (a last-minute jump may draw **max 1** era card).
- **Negotiate** _(if jumping)_ — **rent another player's teammate** for this jump (§9). Cash only,
  never Reputation, no loans.
- **Jump** — attempt the steps on your era card (§6).
- **Process** _(if you jumped and ≥1 step succeeded)_ — collect your rewards (§7).
- **Develop** _(any turn)_ — each teammate **not in the field** may take **one** home action:
  **write a paper · upgrade one machine module · clear instability.** (One action _per researcher_,
  so team size drives home productivity.)
- **Plan** — draw era cards up to your **Collimator** level and stage your next jump.

**Retire from the game** _(instead of a turn, whenever you choose)_ — end your career: read your
epilogue, **lock your score**, and take no further turns (§12). The game's third end-trigger.

---

## 6. The expedition

### Building the deck

At the **start of each expedition**, pick a **roster** of researchers up to your machine's
**Capacity**, then build a one-shot **deck of skill cards** from:

- **the roster's pips** — one skill card per pip (Insight / Craft / Grit), plus
- **the player base** — a permanent 2 / 2 / 2, plus
- **traces** — one **Trace card** per instability token currently on your machine.

The deck is **rebuilt every jump** — so "who do I send?" is a live decision that sets both your
deck's composition _and_ your hand size.

> _Example:_ roster = one historian (I 2 / C 2 / G 2), 2 instability tokens → deck = 2 Trace + 4
> Insight + 4 Craft + 4 Grit.

### The hand (refilled every step)

Draw a **hand of `2 × (researchers on the expedition) + 2`** skill cards. At the **start of every
step** you **top the hand back up** to that size, reshuffling the discard (played skill cards and
Traces) when the deck runs dry. Your hand is **visible** — it's your legible floor. _(The `+2` is
load-bearing: without it, deep multi-step expeditions stall.)_

### Resolving steps

An era card is a path of **steps**, each printing a single **skill requirement**. Play matching
skill cards from your hand to meet it; played skill cards go to the discard and recycle.

- **Deeper eras are longer ladders of gentler gates** — more steps, low flat requirements (plus the
  odd Grit danger spike). The challenge is the length of the climb and the final gamble, not each
  wall.
- **Knowledge steps** are **profession-locked** (only a Historian / Engineer / Physicist can clear
  them); **danger steps** are open **Grit** checks any brave scientist can answer.
- **Traces** are dead weight — they match nothing, just dilute your draws.

### Overclock — the gamble

If your hand can't cover the next step, you may **overclock**: take **+1 instability token**, add
**+1 Trace** to your deck, and **draw 1 skill card** into your hand — betting the draw turns up what
you need. The cost is **personal and persistent**: Traces pollute every future deck until an
engineer clears the tokens.

### Cash out, or push on

At any gate you may **cash out** — stop and bank everything you've cleared so far. Footprint already
left is never refunded. Or push on toward the back-loaded prize (§7).

### Shutdown (the hard cap)

If instability reaches your **Stabiliser limit** (start: 2), at the end of that step the machine
**shuts down**: the expedition ends, you auto-cash-out, **draw an extra consequence**, and
**Timeline Integrity −1**. This is what stops a single run bricking the machine forever — the gamble
is bounded.

### Clearing instability (three paths)

Instability is a debt you actively pay down, not a meter that self-drains.

1. **Engineer at base** — an engineer who did **not** jump this turn removes up to **[their Craft
   pips]** instability tokens (a matching number of Traces leave your deck) as their Develop action.
2. **Skip the Jump** — stay home and go straight to Develop to use your engineers.
3. **Early-game safety valve** — a player with **no engineer and no Stabiliser upgrade** may spend a
   minimal turn to clear **all** instability. The moment you own an engineer or upgrade the
   Stabiliser, this free vent is gone — so a teamless player can never be permanently bricked, but
   cleanup costs real labour as soon as you can afford it.

### Consequences

At the end of **any turn in which you overclocked at least once**, draw **one** consequence card
(clean runs draw none; a shutdown draws an extra). Consequences can shave Timeline Integrity, swing
Cash or Reputation, hand you a junk skill card, or (rarely) cost a module level or a teammate. The
real-history flavour lives here. _(A consequence that docks Reputation is an honest setback — peer
review catching a mistake — **not** disrepute.)_

---

## 7. Rewards & the prize (Process)

An expedition's rewards are **back-loaded** — every step before the penultimate is a pure gate that
pays nothing, so you can't get rich bailing early:

- **The en-route find** (on the **second-to-last** step) → at Process, choose: **Sell it → Cash**,
  or **Publish it → a minor paper (small Reputation)**. Publishing is a desk write-up, so the
  writing researcher also earns experience (§9). _(This lifts paper cadence even for a cautious
  cash-out.)_
- **Early-relief spoil** — on **any** era card, each step **before the last two** (i.e. every pure
  gate, not the find or the objective) carries a ~**15%** chance of a small **1–2 Cash** drop, **at
  most one per card**. Pure Cash, no paper. _(Extended from shallow-only to all eras — Drew, 11 Jun;
  watch that the tiny deep-era drops don't soften the back-load.)_
- **The objective** (final step), if all steps succeeded and there's something to claim:
  - **Record it** (copy, photograph, measure) → the era card enters your **Data** zone; history
    intact, **clean** return. **Reputation** comes from a historian **Publish**ing it which adds the
    corresponding reputation to the player's pool. Pure-knowledge prizes (a cipher, a calculation)
    are **Record-only**.
  - **Plunder it** → the artefact enters your **Artefacts** zone. A **non-doomed** artefact **scars
    Timeline Integrity** when taken (era-scaled `[1,1,1,2,2,3,3]` — deeper finds scar more); a
    **doomed** artefact (about to burn or be lost) **grabs clean** (no scar). Later, at the desk, a
    historian who didn't jump can **Publish** it → its **printed Reputation**, or you can **Sell**
    it → **Cash**.

### Record vs Plunder, Sell vs Publish

The objective's fork is **fiction-gated**: the take/copy choice exists only where the fiction
supports it. A held artefact is **Cash XOR Reputation** but **not both** — selling pays **Cash** now
and **forfeits** the points it would have scored (its paper's Reputation if Published, or 1 point if
held unresearched). You never get both.

### Disrepute (the moral cost, made visible)

Every **ethics-linked** reputation cost is paid as **disrepute tokens** — a separate pile beside
your Reputation, never subtracted from it directly:

- **Selling a non-doomed artefact** → `max(1, floor((rep − 1) / 2))` disrepute (printed on the era
  card; 1 for a rep-2–4 find, up to 4 for rep 9–10).
- **Doomed artefacts** → **0 disrepute** (clean to grab _and_ clean to sell).

Disrepute stays well below the paper value, so **Sell is the cash-desperate lifeline, never a trap**
— and at scoring it nets against your Reputation, so the table can _see_ the price of how you
played.

---

## 8. The time machine — four modules

All start at level 1 except the Stabiliser (start: max-instability 2). Upgrading is a **Develop**
action gated on who does the work:

| Module                     | Does                                             | Upgraded by   | Costs (per upgrade)  |
| -------------------------- | ------------------------------------------------ | ------------- | -------------------- |
| **Displacement Amplifier** | max era reachable                                | see ladder ↓  | `[0, 1, 2, 4, 6, 9]` |
| **Baryonic Capacitor**     | expedition Capacity (roster → hand size)         | **Physicist** | `[3, 4, 6, 9]`       |
| **Temporal Collimator**    | era cards drawn at Plan                          | **Engineer**  | `[3, 5, 8]`          |
| **Quantum Stabiliser**     | max instability before shutdown (+2 per upgrade) | **Physicist** | `[4, 7]`             |

**The Amplifier ladder (the progression spine):**

- Recent → Modern: **free, no researcher** (the free first upgrade).
- Modern → Early Modern, Early Modern → Medieval: **Engineer**.
- Medieval → Ancient, Ancient → Prehistoric: **Engineer + Physicist**.
- Prehistoric → Many Worlds: **Engineer + Physicist, both fully experienced** (both earnable
  experience boxes filled).

---

## 9. Your team

- **Buying a researcher** adds **one skill card per pip** to your decks from then on if that
  researcher joins the expedition. Juniors (**Researchers** deck) carry **3–6 total pips** (cost ≈
  total pips, 3–7 Cash); **Experts** carry **9–15** (cost 9–16) — capability you can buy, but not
  reputation.
- **Experience.** Each time a researcher is **used** — on an expedition, to write a paper (including
  a minor en-route paper), or to upgrade the machine (**not** to clear instability) — they gain one
  experience token. **Every 2nd token advances one blue box.** A card shows **3 boxes, but the first
  is pre-filled — only 2 are earnable**, so **4 uses** take a fresh recruit to the max. Each earned
  box adds **+1 to all three skills** (max +2), so a veteran rises uniformly and keeps their spike.
- **Retirement & Parting Gifts.** A researcher **bought below the max** who **reaches the max** and
  is then **removed from the team** leaves a **Parting Gift** (an upgrade, a boon, a reputation
  bonus, or a protégé). **Experts start at the max and cannot be retired** — capability you buy,
  legacy you grow.
- **Rental (Negotiate).** You may **rent another player's teammate** for one expedition at a
  freely-agreed **Cash** fee: their pips join your deck (counting toward Capacity), their owner
  can't use them at home that turn, and **all Reputation stays with you** (your jump, your legacy —
  they're hired help). The researcher returns after. **Cash only — Reputation is never rented, sold,
  or shared.** Rental is also the seat of the endgame alliance: lend a rival your specialist for the
  Many Worlds gauntlet. _(Open detail: whether a rented researcher earns experience for its owner —
  lean: no.)_

---

## 10. The economy

- **Two currencies, bridged only by the prize.** **Cash** runs everything (hires, upgrades, the
  machine); **Reputation** is the score and is never spent. The only bridge is a find/artefact:
  **Sell → Cash XOR Publish → Reputation.**
- **All Reputation traces to a researcher's work** — Recording in the field, or Publishing at the
  desk. No team, no legacy.
- **Disrepute is Reputation's moral shadow** (§7) — a separate pile, netted against the score only
  at the end.
- **The team is the action economy.** Each turn a researcher is in the field **or** takes one home
  action — never both. There are no abstract action points.

---

## 11. Timeline Integrity, consequences & collapse

The shared **Timeline Integrity** track is the table's collective conscience. It frays from the
aggregate of everyone's greed: **plunder scars** (non-doomed takes), **overclock failures**
(shutdowns), and **consequence cards**. A careful table never collapses; a greedy one summons it.

- As Integrity drops, the threat grows — and crucially, **reaching for Many Worlds and failing costs
  −2 Integrity** (§12), so the endgame race itself frays the timeline.
- **Collapse is a one-round "Unravelling" fuse, never a cold game-over.** When Integrity hits **0**,
  each player takes **one more turn** at maximum peril (the collapse flavour firing) to settle their
  affairs — or to ally for one last **Many Worlds** escape. Then everyone scores. Nobody's effort is
  erased; the personal overclock costs, not this shared track, are the real deterrent.

---

## 12. Ending the game & scoring

### The three end-triggers (whichever comes first)

1. **Triumph** — a player **completes all steps on a Many Worlds card** (a **5-step × 5-pip**
   gauntlet, via the full-table alliance of §14). A Many Worlds expedition that **fails** any step
   costs **`−2 × (host instability + 1)` Integrity** (§14). The multiverse is **rare and sacred** —
   reaching for it and missing frays the timeline, so most games do _not_ end this way.
2. **Quiet legacy** — **every player has retired.** Retiring is a voluntary, individual choice on
   your turn: read your epilogue, lock your score, take no more turns. It's self-regulating
   (retiring stops you scoring, so nobody quits early) and turns the whole game into a
   **career-scale gamble** — bank an illustrious, earthbound career now, or push for the multiverse
   and risk the timeline tearing apart under you.
3. **Collapse** — **Integrity 0** triggers the Unravelling round (§11), then scoring.

There is **no round cap.** The game ends because someone wins it, retires from it, or breaks it.

### Scoring — the two-band portrait

Every ending closes on the same **score-recap sheet**, read as a career in two bands:

| WHAT YOU DISCOVERED  | HOW YOU DID IT               |
| -------------------- | ---------------------------- |
| Papers published     | Disrepute carried (subtract) |
| Deepest era reached  | Veterans retired with honour |
| Artefacts saved      |                              |
| Many Worlds reached? |                              |

SCORE = Reputation − Disrepute + highest module level reached + unresearched artefacts (1 each)

Papers dominate held artefacts, so hoarding isn't a strategy. **Glory and shame show as two visible
piles** — restraint _shows_ in the portrait without needing its own scoring axis, and the careful
player's reward is a visibly clean sheet. Each retiring player reads a personal **epilogue** as they
bow out; when the last player ends, the table reads the collective ending narration below.

---

## 13. Endgame narration

**Triumph (a successful Many Worlds):** _"You did it! Humanity now has the power to access the
furthest reaches of infinite universes. Technology advances rapidly, time travel becomes a new field
of training similar to that for astronauts, and governments around the world scramble to draw up
safety guidelines for an enthusiastic private sector. The only thing to do now is to ponder whether
we should explore the future or let it come to us…"_

**Collapse (the timeline unravels):** _"It starts small. People in the present start reporting odd
sightings -- confused medieval warriors in town centers, Benjamin Franklin wandering the streets of
New York -- and things unravel further as the minutes go by. Egyptian pharaohs are seen arguing with
each other outside the pyramids of Egypt. Later, a herd of triceratops is spotted by a group on an
African safari. It's only when the atmosphere starts changing that the entire population starts
noticing. Within an hour, astrological objects are hurtling into and through each other and the laws
of nature themselves come apart at the seams."_

**Quiet legacy (you retire) — _draft, polish before print_:** _"Your work gave birth to a new field.
You had an illustrious career in one of the most exciting domains in science -- and now, with the
multiverse still beyond reach but the timeline whole, you retire to live out your own history. The
torch passes to a new generation of temporal scientists; what you built -- the minds you gathered,
the histories you saved, the papers that bear your name -- endures."_ _(Read per-player as each
retires; the table reads a collective version when the last player bows out.)_

---

## 14. The Many Worlds alliance (RESOLVED — Drew, 11 Jun 2026)

The endgame is a **full-table alliance** attempting the Many Worlds gauntlet. The rule answers "who
makes the winning jump, and how is the payoff shared" so the ending is **neither a foregone
conclusion nor a kingmaker**:

- **Open, declared jump.** Any player at **Amp 7** may **declare** a Many Worlds attempt on their
  turn (their machine opens the door — hosting carries **no scoring bonus**). Once declared, **every
  player commits** their researchers to the push (**Capacity is ignored** — everyone, for the final
  jump).
- **Reputation is automatic, by contribution — not negotiated, not a lump.** On success the
  multiverse opening pays a **co-author credit: +1 Reputation per researcher you committed, capped
  at +6**. Every contributor is credited only for **their own** researchers' work (the two laws
  hold: rep traces to your own team; nothing is shared or transferred). There is **no single ~11-pt
  prize** to hand the host — the glory is divided by who actually pushed.
- **Only the host's machine traces** pollute the combined deck (it's their door).
- **Failure tears the timeline in proportion to the host's machine state:** a failed Many Worlds
  attempt costs **`−2 × (host instability + 1)` Integrity** (clean machine → −2 floor; a rattling,
  overclocked machine → a far worse tear). _This makes running the climactic jump on a **stable**
  machine matter enormously, and gives the endgame one last overclock-keystone decision: vent first,
  or push now?_ (Drew, 11 Jun — supersedes the flat −2.)

_Why this kills all three failure modes:_ contribution is **open to all** (no kingmaker — no one to
bribe or freeze out); the payoff is **divided by contribution** (no winner-take-the-lump — the final
jump isn't worth points by itself); and the trailing players have the **most to gain by going
all-in** (a real, earned catch-up, so the leader can't coast to the door). The cash-rental
**Negotiate** layer (§9) still rides underneath for the table-talk. _Co-author currency is
researcher **count**, not pips — legible, near-zero arithmetic; the +6 cap guards against swarm-gaming
with cheap juniors. The +6 cap and the −2×(inst+1) rate are provisional, untuned — the full-game sim
(`sim/full-game.js`) models the alliance but its numbers want a balance pass._

---

## Appendix A — the numbers at a glance (provisional; tuning lives in `sim/`)

| Dial                                 | Value                                                |
| ------------------------------------ | ---------------------------------------------------- |
| Start Cash / player base / hand size | 3 · 2/2/2 · `2×roster + 2`                           |
| Integrity pool                       | `(players + 1) × 4`                                  |
| Stabiliser (shutdown limit)          | start 2, +2 per upgrade                              |
| Step requirement (per card)          | shallow ≈ 1, deep ≈ 2 (on the card)                  |
| En-route find Cash                   | ~6 (Recent) → ~16 (Prehistoric)                      |
| Objective Reputation                 | ~2 (Recent) → ~10–11 (Prehistoric / MW)              |
| Sell disrepute                       | `max(1, floor((rep−1)/2))`; doomed = 0               |
| Plunder Integrity scar               | `[1,1,1,2,2,3,3]` by era; doomed = 0                 |
| Many Worlds gauntlet                 | 5 steps × 5 pips; fail = −2×(host instab.+1) Integrity |
| MW co-author Reputation              | +1 per committed researcher per owner, cap +6        |
| Experience                           | 2 earnable boxes, 2 uses each, +1 all skills per box |

Outcome at the recommended config (sim, std mix): **~52% triumph · ~36% collapse · ~12% quiet
legacy**, ~16–17 rounds, balanced across 3/4/5 players. Full manual: `sim/README.md`.

## Appendix B — optional told-aloud Epilogue (a first-few-plays variant)

For groups who enjoy the roleplay, each player's retirement can be narrated aloud from a guided
fill-in-the-blank Epilogue card (lead researcher, deepest era, papers published, artefacts saved,
how cleanly they played). It's magic the first time or two and becomes optional thereafter — the
portrait scoresheet (§12) carries the same payoff every play without it.

```

```
