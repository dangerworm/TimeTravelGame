# Content Schema — JSON decks (v0, expect churn)

_Authored 11 Jun 2026 (overnight) as the **first full playtest set**. JSON is the single source of
truth (Drew's a dev — this feeds the renderer + scripts later; no transcription). The schema is
**deliberately minimal and will churn** — first content is ~90% throwaway. Numbers are calibrated
against `sim/best-config.json` + `sim/RESULTS.md`; tone is calibrated against the seed cards in each
deck folder. **To play tomorrow, you don't need the renderer** — see `PLAYTEST.md` for crude-print
counts and how to copy these onto index cards._

All decks are a JSON file named `cards.json` in their deck folder. Every card has an `id`
(kebab-case, unique) and human-readable fields. Mechanics live in typed fields so a script/renderer
can read them; flavour lives in `fiction`.

---

## `destinations/cards.json` — era (destination) cards

A destination is a left-to-right **path of steps**. Most steps are pure **gates** (pay nothing); the
**second-to-last** step holds the **find** (Sell→Cash _or_ Publish→minor paper); the **last** step
is the **objective**.

```jsonc
{
  "id": "rec-the-lost-reel",
  "name": "The Lost Reel",
  "era": "Recent",            // era name (see eraIndex)
  "eraIndex": 0,              // 0 Recent … 6 ManyWorlds (drives all the maths)
  "place": "Culver City, 1927",
  "mysteryTier": 2,           // 1 Known · 2 Debated · 3 Lost · 4 Unknown — drives objective rep
  "fiction": "Two-sentence brief. The doomed/record/plunder hint lives HERE, so reading the card pays off.",
  "steps": [
    // skill ∈ Insight | Craft | Grit ; req = pips needed
    // type ∈ gate | danger | knowledge
    //   danger  = open Grit check (any brave scientist)
    //   knowledge = may be profession-locked (lock field); only that profession clears it
    // markers: "find": true on the second-to-last step; "objective": true on the last
    { "n": 1, "skill": "Insight", "req": 1, "type": "knowledge", "lock": "Historian" },
    { "n": 2, "skill": "Grit",    "req": 1, "type": "danger" },
    { "n": 3, "skill": "Craft",   "req": 1, "type": "knowledge", "lock": "Engineer", "objective": true }
  ],
  "findStep": 2,              // which step n carries the find (== second-to-last)
  "find": { "cash": 3, "publishRep": 1 },   // Sell→cash XOR Publish→a minor paper (small rep)
  "earlySpoil": null,        // any era: ~15% of steps BEFORE THE LAST TWO carry { "step": n, "cash": 1-2 }; max one per card
  "objective": {
    "mode": "doomed-grab",   // record-only | plunder-or-record | doomed-grab
    "doomed": true,          // doomed → grab clean (no scar, no disrepute)
    "rep": 2,                // PRINTED reputation: earned when a Historian PUBLISHES it (Data or Artefact)
    "sellCash": 3,           // plunder/doomed only: Sell→Cash (forfeits the rep; Cash XOR legacy)
    "scar": 0,               // Timeline Integrity hit if plundered non-doomed; doomed/record-only = 0
    "disrepute": 0           // tokens if SOLD non-doomed; doomed/record-only = 0
  }
}
```

**Objective modes (fiction-gated, per GDD §7):**

- `record-only` — pure knowledge (a cipher, a calculation, a measurement). No object to take. The era
  card enters your **Data** zone; a Historian at base later **Publishes** it → `rep`. No Sell, no scar.
- `plunder-or-record` — a removable, surviving artefact. **Record** (copy/measure → Data zone, clean,
  Publish later for `rep`) **or Plunder** (Artefact zone; **scars** the timeline by `scar`; later
  Publish→`rep` or Sell→`sellCash` for `disrepute`).
- `doomed-grab` — the artefact is about to be destroyed/lost. Grabbing it is clean **and** clever:
  Artefact zone, **no scar, no disrepute**; later Publish→`rep` or Sell→`sellCash`.

> **Reputation is never instant.** Recording/plundering only places the card in your Data/Artefacts
> zone. A Historian who didn't jump must spend a Develop action to **Publish** it for the `rep`
> (honours the 11 Jun "last-minute change" — all rep traces to a researcher's written work).

**Many Worlds** cards use `eraIndex: 6`, 5 steps × `req: 5`, `mode: "triumph"`. Completing all steps
ends the game in **Triumph**. **Failing any step → −2 Timeline Integrity** (`failIntegrity: 2`).

---

## `researchers/cards.json` — juniors (the **Researchers** deck) · `experts/cards.json`

```jsonc
{
  "id": "res-elena-foss",
  "name": "Dr. Elena Foss",
  "deck": "Researchers",          // or "Experts"
  "profession": "Historian",      // Historian | Engineer | Physicist
  "pips": { "insight": 2, "craft": 1, "grit": 0 },  // one skill card per pip into your deck
  "totalPips": 3,
  "cost": 3,                      // Cash; juniors ≈ total pips (3–7); experts 9–16
  "earnableBoxes": 2,             // juniors: 2 (1st of 3 boxes pre-filled). Experts: 0 (start maxed, can't retire)
  "flavour": "One line of character."
}
```

- **Professions gate work, not a 4th currency.** Historians clear Historian-locked knowledge steps,
  and are the **only** ones who Record/Publish for reputation. Engineers clear Engineer-locked steps,
  upgrade the Amplifier/Collimator, and clear instability. Physicists upgrade the Capacitor/Stabiliser
  and gate the deep Amp ladder; they have no per-step lock (occasionally a physics knowledge step).
- **Grit is a temperament** — the "brave" researchers in each profession carry a Grit spike.
- **Experience:** each earnable box = **+1 to all three skills** (max +2). 4 uses → max. Experts start
  maxed and **cannot retire** (no Parting Gift).

---

## `retirement/cards.json` — Parting Gifts

Drawn only when a researcher **bought below max, grown to max, then removed** retires.

```jsonc
{
  "id": "pg-the-blueprint",
  "name": "The Blueprint",
  "type": "upgrade",              // upgrade | boon | reputation | protege
  "fiction": "The story of the legacy.",
  "effect": "Gain one machine upgrade for free.",
  "value": null                   // reputation cards: the rep granted; else null
}
```

---

## `consequences/cards.json`

Drawn at the end of any turn you overclocked (a shutdown draws an extra).

```jsonc
{
  "id": "con-peer-review",
  "name": "Peer Review",
  "category": "repLoss",          // int1 int2 cashLoss cashGain repLoss repGain modLoss nothing
  "fiction": "The real-history flavour lives here.",
  "effect": "Your most recent paper is retracted: Reputation −2."
}
```

- `repLoss` is an **honest setback** (peer review catching a mistake) — it reduces the **Reputation**
  pile directly, **never** disrepute.
- Deck weighting (from `sim` consWeights) is documented in `PLAYTEST.md`.
