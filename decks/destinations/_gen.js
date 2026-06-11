'use strict';
// Calibration-aware card generator. I author the real-history substance (the STUBS below); this
// derives every number from the cheat-sheet so the deck stays internally consistent. Idempotent:
// skips ids already present. Run: node decks/destinations/_gen.js
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, 'cards.json');

const ERA = ['Recent', 'Modern', 'EarlyModern', 'Medieval', 'Ancient', 'Prehistoric'];
const SKILLNAME = { I: 'Insight', C: 'Craft', G: 'Grit' };
const LOCKNAME = { H: 'Historian', E: 'Engineer', P: 'Physicist' };
const REP = { 0: { 2: 2, 3: 3, 4: 4 }, 1: { 2: 3, 3: 4, 4: 5 }, 2: { 2: 4, 3: 5, 4: 6 },
              3: { 2: 6, 3: 7, 4: 8 }, 4: { 2: 7, 3: 8, 4: 9 }, 5: { 3: 9, 4: 10 } };
const SCAR = [1, 1, 1, 2, 2, 3, 3];

function build(s) {
  const e = s.eraIndex, rep = REP[e][s.tier], req = e === 5 ? 2 : 1;
  const steps = s.steps.map((spec, i) => {
    const [sk, lk] = spec.split(':');
    const st = { n: i + 1, skill: SKILLNAME[sk], req, type: sk === 'G' ? 'danger' : 'knowledge' };
    if (lk) st.lock = LOCKNAME[lk];
    return st;
  });
  const L = steps.length;
  steps[L - 2].find = true;       // en-route find on the second-to-last step
  steps[L - 1].objective = true;  // objective on the last
  const doomed = s.mode === 'doomed-grab';
  const recordOnly = s.mode === 'record-only';
  return {
    id: s.id, name: s.name, era: ERA[e], eraIndex: e, place: s.place, mysteryTier: s.tier,
    fiction: s.fiction, steps,
    findStep: L - 1,
    find: { cash: 3 + e, publishRep: Math.max(1, Math.round(rep / 3)) },
    earlySpoil: s.spoil || null,
    objective: {
      mode: s.mode, doomed, rep,
      sellCash: recordOnly ? 0 : Math.round(rep * 1.5),
      scar: (recordOnly || doomed) ? 0 : SCAR[e],
      disrepute: (recordOnly || doomed) ? 0 : Math.max(1, Math.floor((rep - 1) / 2)),
    },
  };
}

// Each stub: id, name, place, eraIndex, tier (2-4), mode, steps (skill[:lock] per step; find auto on
// the 2nd-to-last, objective on the last), fiction (~2 sentences; the take/record/doomed hint inside).
const STUBS = [
  // ── Recent (eraIndex 0, 3 steps) ──
  { id: 'rec-somerton-man', name: 'The Somerton Man', place: 'Adelaide, 1948', eraIndex: 0, tier: 3, mode: 'record-only',
    steps: ['I:H', 'G', 'I'], fiction: 'A dead man on a beach, no name, and a scrap in his fob pocket reading "Tamám Shud." Copy the torn page and the code pencilled beneath it before the case goes cold forever.' },
  { id: 'rec-flannan-isles', name: 'The Flannan Light', place: 'Outer Hebrides, 1900', eraIndex: 0, tier: 3, mode: 'doomed-grab',
    steps: ['I:H', 'G', 'C:E'], fiction: 'Three keepers gone from a sealed lighthouse, the table set, one chair toppled. Reach the last log entry before the next storm takes the logbook with it.' },
  { id: 'rec-uss-cyclops', name: 'The Cyclops', place: 'off Barbados, 1918', eraIndex: 0, tier: 2, mode: 'doomed-grab',
    steps: ['C:E', 'G', 'I'], fiction: 'A Navy collier and three hundred men vanished without a wreck or a distress call. Get aboard and grab the manifest in the hours before she goes down.' },
  { id: 'rec-glenn-miller', name: "Miller's Flight", place: 'English Channel, 1944', eraIndex: 0, tier: 2, mode: 'doomed-grab',
    steps: ['I:H', 'G', 'C:E'], fiction: "The bandleader's plane left for Paris and never arrived. Pull the flight log from the cockpit before the Channel swallows it." },
  { id: 'rec-just-judges', name: 'The Just Judges', place: 'Ghent, 1934', eraIndex: 0, tier: 3, mode: 'plunder-or-record',
    steps: ['I:H', 'C:E', 'I'], fiction: 'A single panel cut from the Ghent Altarpiece, never recovered, its location taunted in a deathbed letter. Photograph it where it hides — or lift it for yourself.' },
  { id: 'rec-fawcett-z', name: 'The Road to Z', place: 'Mato Grosso, 1925', eraIndex: 0, tier: 3, mode: 'doomed-grab',
    steps: ['G', 'I:H', 'I'], fiction: 'Colonel Fawcett walked into the Amazon chasing a lost city and was never seen again. Recover his last notebook from the camp before the jungle erases it.' },
  { id: 'rec-florentine-diamond', name: 'The Florentine', place: 'Vienna, 1918', eraIndex: 0, tier: 3, mode: 'plunder-or-record',
    steps: ['I:H', 'G', 'C:E'], fiction: 'A 137-carat yellow diamond vanished as the Habsburg empire fell. Catalogue it as it changes hands — or simply take it into the dark.' },
  { id: 'rec-apollo-tapes', name: 'The Erased Tapes', place: 'Honeysuckle Creek, 1969', eraIndex: 0, tier: 2, mode: 'record-only',
    steps: ['I:P', 'G', 'C:E'], fiction: 'The original slow-scan tapes of the first Moon landing, taped over by accident and lost. Copy the master reels before they are wiped clean.' },

  // ── Modern (eraIndex 1, 3 steps) ──
  { id: 'mod-devils-footprints', name: "The Devil's Footprints", place: 'Devon, 1855', eraIndex: 1, tier: 3, mode: 'record-only',
    steps: ['I:H', 'G', 'I'], fiction: 'A hundred miles of cloven hoofprints crossing roofs and walled gardens, made in a single frozen night. Record the trail before the thaw takes it.' },
  { id: 'mod-ambrose-bierce', name: "Bierce's Last Dispatch", place: 'Chihuahua, 1913', eraIndex: 1, tier: 2, mode: 'doomed-grab',
    steps: ['G', 'I:H', 'I'], fiction: 'The writer rode into a revolution and out of all record. Snatch his final dispatch from the saddlebag before the column is ambushed.' },
  { id: 'mod-ss-waratah', name: 'The Waratah', place: 'off Durban, 1909', eraIndex: 1, tier: 2, mode: 'doomed-grab',
    steps: ['C:E', 'G', 'I:H'], fiction: 'The "Titanic of the South" steamed into a swell with 211 aboard and was never found. Get the bridge log before she founders.' },
  { id: 'mod-kaspar-hauser', name: 'The Foundling', place: 'Nuremberg, 1828', eraIndex: 1, tier: 3, mode: 'record-only',
    steps: ['I:H', 'G', 'I'], fiction: 'A youth appeared in the square able to write one name and nothing else, then was murdered before anyone learned his. Copy the papers he carried.' },
  { id: 'mod-hunley', name: 'The Hunley', place: 'Charleston, 1864', eraIndex: 1, tier: 3, mode: 'doomed-grab',
    steps: ['C:E', 'G', 'I:P'], fiction: 'The first submarine to sink a warship then sank itself, crew at their stations, for reasons unknown. Recover the mechanism before it settles in the silt.' },
  { id: 'mod-booth-diary', name: 'The Missing Pages', place: 'Washington, 1865', eraIndex: 1, tier: 3, mode: 'record-only',
    steps: ['I:H', 'G', 'C:E'], fiction: "Eighteen pages cut from the assassin's diary, their fate a century of accusation. Photograph them before they are excised." },
  { id: 'mod-confederate-gold', name: 'The Treasury Train', place: 'Georgia, 1865', eraIndex: 1, tier: 2, mode: 'plunder-or-record',
    steps: ['I:H', 'G', 'I'], fiction: 'The Confederate treasury left Richmond by rail and never reached its destination. Tally the crates where they were buried — or carry them off.' },
  { id: 'mod-tambora-year', name: 'The Year Without Summer', place: 'Sumbawa, 1815', eraIndex: 1, tier: 2, mode: 'record-only',
    steps: ['I:P', 'G', 'I'], fiction: 'A mountain erupted and stole a summer from the whole world the next year. Measure the ash column before the records of the blast are buried with it.' },

  // ── Early Modern (eraIndex 2, 4 steps) ──
  { id: 'em-darien', name: 'The Darien Venture', place: 'Panama, 1698', eraIndex: 2, tier: 2, mode: 'doomed-grab',
    steps: ['I:H', 'G', 'C:E', 'I'], fiction: "Scotland staked its wealth on a colony in the fever-coast jungle, and lost both. Take the company's last ledger before the survivors burn the stockade." },
  { id: 'em-anghiari', name: 'The Lost Battle', place: 'Florence, 1505', eraIndex: 2, tier: 3, mode: 'plunder-or-record',
    steps: ['I:H', 'G', 'C:E', 'C:E'], fiction: "Leonardo's unfinished mural, perhaps still sealed behind a later wall in the great hall. Record the surface that hides it — or cut it free." },
  { id: 'em-cardenio', name: 'Cardenio', place: 'London, 1613', eraIndex: 2, tier: 3, mode: 'record-only',
    steps: ['I:H', 'G', 'I', 'I'], fiction: "A play by Shakespeare, performed at court and then gone from every shelf. Copy the prompt-book before the playhouse fire claims it." },
  { id: 'em-casket-letters', name: 'The Casket Letters', place: 'Edinburgh, 1567', eraIndex: 2, tier: 3, mode: 'plunder-or-record',
    steps: ['I:H', 'G', 'I:H', 'I'], fiction: 'The letters that sent a queen to the block — authentic, or forged to fit. Transcribe them, or spirit the casket away whole.' },
  { id: 'em-flor-de-la-mar', name: 'Flor de la Mar', place: 'Strait of Malacca, 1511', eraIndex: 2, tier: 3, mode: 'doomed-grab',
    steps: ['I:H', 'G', 'C:E', 'I'], fiction: "A carrack so laden with a sultanate's plunder she could not be saved, lost on the homeward reef. Reach the strongroom before she breaks apart." },
  { id: 'em-sea-venture', name: 'The Sea Venture', place: 'Bermuda, 1609', eraIndex: 2, tier: 2, mode: 'doomed-grab',
    steps: ['C:E', 'G', 'I:H', 'I'], fiction: 'Wrecked on a reef thought to be devils, her castaways built two new ships and a legend. Salvage the captain’s account as the hull works apart.' },

  // ── Medieval (eraIndex 3, 4 steps) ──
  { id: 'med-house-of-wisdom', name: 'The House of Wisdom', place: 'Baghdad, 1258', eraIndex: 3, tier: 4, mode: 'doomed-grab',
    steps: ['I:H', 'G', 'I:H', 'I'], fiction: 'The Mongols emptied the great libraries into the Tigris until it ran black with ink. Pull what you can from the shelves before the river takes the rest.' },
  { id: 'med-dancing-plague', name: 'The Dancing Plague', place: 'Strasbourg, 1518', eraIndex: 3, tier: 3, mode: 'record-only',
    steps: ['I:H', 'G', 'I', 'I'], fiction: 'Hundreds danced in the streets for days, some until they dropped dead, and no one knows why. Record the affliction before the city erases the shame.' },
  { id: 'med-vinland', name: 'The Vinland Houses', place: 'Newfoundland, c.1000', eraIndex: 3, tier: 3, mode: 'plunder-or-record',
    steps: ['I:H', 'G', 'C:E', 'I'], fiction: 'Norse turf halls on a coast five centuries before Columbus, then abandoned to the fog. Measure the settlement — or carry off its ironwork.' },
  { id: 'med-kublai-fleet', name: 'The Divine Wind', place: 'Hakata Bay, 1281', eraIndex: 3, tier: 3, mode: 'doomed-grab',
    steps: ['C:E', 'G', 'I:H', 'I'], fiction: "The largest armada the world had seen, scattered and drowned by a typhoon overnight. Reach a flagship's hold before the wind finishes its work." },
  { id: 'med-green-children', name: 'The Green Children', place: 'Woolpit, c.1150', eraIndex: 3, tier: 3, mode: 'record-only',
    steps: ['I:H', 'G', 'I', 'I'], fiction: 'Two children, skin tinged green, speaking no known tongue, found at the edge of a harvest field. Record their account before it passes into folktale.' },

  // ── Ancient (eraIndex 4, 5 steps) ──
  { id: 'anc-phaistos-disc', name: 'The Phaistos Spiral', place: 'Crete, c.1700 BC', eraIndex: 4, tier: 4, mode: 'record-only',
    steps: ['I:H', 'G', 'I:H', 'C:E', 'I'], fiction: 'A clay disc stamped in a spiral with signs no scholar can read, alone of its kind. Copy both faces before the palace burns around it.' },
  { id: 'anc-sea-peoples', name: 'The Sea Peoples', place: 'Ugarit, c.1177 BC', eraIndex: 4, tier: 4, mode: 'record-only',
    steps: ['I:H', 'G', 'I', 'C:E', 'I'], fiction: 'Raiders no one could name brought a dozen kingdoms down in a single generation. Read the last tablets baked in the burning city before it falls.' },
  { id: 'anc-mercury-sea', name: 'The Mercury Sea', place: "Xi'an, 210 BC", eraIndex: 4, tier: 4, mode: 'plunder-or-record',
    steps: ['I:H', 'G', 'C:E', 'I:P', 'I'], fiction: "The first emperor's tomb, sealed over rivers of mercury and a buried army. Map the chamber — or breach it and take what the crossbows guard." },
  { id: 'anc-ninth-legion', name: 'The Ninth', place: 'Eboracum, c.120 AD', eraIndex: 4, tier: 3, mode: 'record-only',
    steps: ['I:H', 'G', 'I', 'C:E', 'I'], fiction: 'Five thousand legionaries marched north into the mist and vanished from every roll. Recover the fort’s last muster before the record is struck out.' },
  { id: 'anc-nazca', name: 'The Sky Drawings', place: 'Nazca, c.500 AD', eraIndex: 4, tier: 3, mode: 'record-only',
    steps: ['I:H', 'G', 'I', 'I', 'I'], fiction: 'Lines miles long, shaped into creatures only the sky can see in full. Survey them before the desert wind blurs their edges for good.' },

  // ── Prehistoric (eraIndex 5, 5 steps) ──
  { id: 'pre-denisovan', name: 'The Denisovan', place: 'Altai, c.50,000 BP', eraIndex: 5, tier: 4, mode: 'doomed-grab',
    steps: ['I:H', 'G', 'I:P', 'C:E', 'I'], fiction: 'A whole kind of human known from a single fingerbone in a cave. Recover a living trace before the layer is lost to the dig.' },
  { id: 'pre-blombos', name: 'The First Mark', place: 'Blombos, c.73,000 BP', eraIndex: 5, tier: 4, mode: 'record-only',
    steps: ['I:H', 'G', 'I', 'C:E', 'I'], fiction: 'A cross-hatch scratched in ochre — the oldest drawing a human hand ever made. Record it before the ochre crumbles to dust.' },
  { id: 'pre-red-deer-cave', name: 'The Red Deer People', place: 'Yunnan, c.14,000 BP', eraIndex: 5, tier: 3, mode: 'doomed-grab',
    steps: ['I:H', 'G', 'I', 'I:P', 'I'], fiction: 'People with ancient features who should have been gone for ages, yet were not. Take a specimen before the cave roof comes down.' },
  { id: 'pre-long-winter', name: 'The Long Winter', place: 'Hiawatha, c.12,800 BP', eraIndex: 5, tier: 4, mode: 'record-only',
    steps: ['I:P', 'G', 'I', 'C:E', 'I'], fiction: 'A sky-fire that may have plunged the warming world back into ice for a thousand years. Measure the impact layer before the meltwater scours it away.' },
];

const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const have = new Set(data.cards.map(c => c.id));
let added = 0;
for (const s of STUBS) {
  if (have.has(s.id)) { console.log('skip (exists):', s.id); continue; }
  data.cards.push(build(s)); added++;
}
fs.writeFileSync(FILE, JSON.stringify(data, null, 1) + '\n', 'utf8');

const byEra = {};
for (const c of data.cards) {
  byEra[c.era] = (byEra[c.era] || 0) + 1;
  const L = c.steps.length;
  if (c.findStep !== L - 1) console.log('BAD findStep', c.id);
  if (!c.steps.at(-1).objective) console.log('BAD objective', c.id);
  if (c.steps.filter(s => s.find).length !== 1) console.log('BAD find marker', c.id);
}
console.log('added', added, '· total', data.cards.length, '·', JSON.stringify(byEra));
