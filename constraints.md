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
