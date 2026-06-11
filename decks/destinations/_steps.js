'use strict';
// Authors per-step flavour `text` AND a flavour-matched requirement `req`, keyed by card id.
// The req must sit inside that era/position's PROPOSED band (validated below); within the band it is
// chosen by how hard the flavour sounds, and across the deck the picks average near each band's
// midpoint so the sim-validated balance holds. Supersedes _addtext.js. Run: node decks/destinations/_steps.js
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, 'cards.json');

// Bands by era + step position (mirror of sim/full-game.js PROPOSED) — the allowed req range.
const BANDS = {
  Recent:      [[1, 1], [1, 1], [1, 2]],
  Modern:      [[1, 1], [1, 2], [1, 3]],
  EarlyModern: [[1, 2], [1, 3], [1, 2], [2, 3]],
  Medieval:    [[1, 2], [1, 3], [2, 3], [2, 4]],
  Ancient:     [[2, 3], [1, 3], [2, 3], [2, 4], [2, 4]],
  Prehistoric: [[1, 3], [2, 3], [2, 4], [1, 3], [3, 4]],
  ManyWorlds:  [[2, 4], [2, 4], [3, 4], [3, 4], [5, 5]],
};

// { id: [ {t: flavour, r: req}, ... one per step ] }
const STEPS = {
  'rec-the-lost-reel': [
    { t: 'Trace the surviving print through the studio vault ledgers', r: 1 },
    { t: 'Reach the nitrate vault before the fire takes hold', r: 1 },
    { t: 'Spool the fragile reel onto a safe carrier as the heat rises', r: 2 },
  ],
  'rec-eddington-plates': [
    { t: 'Work the exposure times from the expedition notes', r: 1 },
    { t: 'Hold the camp steady as the clouds close in', r: 1 },
    { t: 'Capture the star-shift on the plates at totality', r: 2 },
  ],
  'rec-amelias-signal': [
    { t: "Piece together the flight's last bearings", r: 1 },
    { t: "Search the atoll's far shore", r: 1 },
    { t: 'Document the castaway camp', r: 1 },
  ],
  'rec-amber-room': [
    { t: 'Find the panels among the castle cellars', r: 1 },
    { t: 'Move through the collapsing city', r: 1 },
    { t: 'Work the amber panels loose', r: 1 },
  ],
  'rec-roswell-fragment': [
    { t: 'Read the recovery reports before the cordon tightens', r: 1 },
    { t: 'Slip the military cordon', r: 1 },
    { t: "Study the foil's impossible behaviour", r: 1 },
  ],
  'rec-wow-signal': [
    { t: "Predict the window from the telescope's drift", r: 1 },
    { t: "Hold the control room's nerve", r: 1 },
    { t: "Log the signal's source before it falls silent", r: 2 },
  ],
  'rec-hindenburg-skin': [
    { t: "Mark the doped panel from the crew's notes", r: 1 },
    { t: 'Work the mooring apron unnoticed', r: 1 },
    { t: 'Cut a skin sample minutes before the spark', r: 2 },
  ],
  'rec-tunguska-core': [
    { t: "Plot the blast's centre from the felled trees", r: 1 },
    { t: 'Cross the shattered taiga', r: 1 },
    { t: 'Recover a fragment of whatever fell', r: 2 },
  ],
  'rec-dyatlov-pass': [
    { t: "Reconstruct the hikers' route", r: 1 },
    { t: 'Endure the −30° night on the slope', r: 1 },
    { t: 'Record what drives them from the tent', r: 1 },
  ],
  'rec-peking-man': [
    { t: 'Trace the crates to the rail yard', r: 1 },
    { t: 'Reach the convoy as the war closes in', r: 1 },
    { t: 'Intercept the crates before they vanish', r: 2 },
  ],
  'rec-somerton-man': [
    { t: 'Match the man to a missing name', r: 1 },
    { t: 'Search the body before the case is filed', r: 1 },
    { t: 'Copy the torn page and its pencilled code', r: 1 },
  ],
  'rec-flannan-isles': [
    { t: "Read the keepers' last entries", r: 1 },
    { t: 'Climb to the sealed light room', r: 1 },
    { t: 'Save the logbook before the storm', r: 1 },
  ],
  'rec-uss-cyclops': [
    { t: 'Force the jammed hold doors', r: 1 },
    { t: 'Keep your feet on the canting deck', r: 1 },
    { t: 'Find the manifest before she goes down', r: 2 },
  ],
  'rec-glenn-miller': [
    { t: "Plot the plane's track over the Channel", r: 1 },
    { t: 'Reach the wreck in the cold water', r: 1 },
    { t: 'Pull the flight log from the flooded cockpit', r: 2 },
  ],
  'rec-just-judges': [
    { t: "Read the thief's deathbed letter", r: 1 },
    { t: "Work into the panel's hidden recess", r: 1 },
    { t: 'Photograph the Just Judges where it hides', r: 1 },
  ],
  'rec-fawcett-z': [
    { t: 'Endure the deep jungle', r: 1 },
    { t: "Find the expedition's last camp", r: 1 },
    { t: "Recover Fawcett's final notebook", r: 1 },
  ],
  'rec-florentine-diamond': [
    { t: 'Trace the diamond through the fallen court', r: 1 },
    { t: 'Move unseen among the fleeing household', r: 1 },
    { t: 'Lift the Florentine into the dark', r: 1 },
  ],
  'rec-apollo-tapes': [
    { t: 'Work out which reels hold the originals', r: 1 },
    { t: "Reach the tracking station's vault", r: 1 },
    { t: 'Copy the original Moon-landing tapes', r: 1 },
  ],
  'mod-the-great-stink': [
    { t: 'Decipher the unpublished schematics', r: 1 },
    { t: 'Slip into the half-built pumping works', r: 1 },
    { t: 'Free the prototype valve from its setting', r: 2 },
  ],
  'mod-babbages-cards': [
    { t: 'Find the card-programs in the cluttered workshop', r: 1 },
    { t: 'Reach the workshop before the clear-out', r: 1 },
    { t: "Box up the punched cards before they're scattered", r: 2 },
  ],
  'mod-franklin-log': [
    { t: 'Work out where the log is stowed', r: 1 },
    { t: 'Cross the pack ice to the abandoned ship', r: 2 },
    { t: 'Prise the log from the frozen chart room', r: 3 },
  ],
  'mod-darwins-pages': [
    { t: 'Learn which pages Darwin means to burn', r: 1 },
    { t: 'Reach the study unseen', r: 1 },
    { t: 'Transcribe the suppressed pages before the grate', r: 2 },
  ],
  'mod-tesla-notebook': [
    { t: "Read Tesla's working notes", r: 1 },
    { t: 'Cross the bolt-strewn laboratory floor', r: 2 },
    { t: 'Grasp the resonance principle — or take the book', r: 3 },
  ],
  'mod-mary-celeste': [
    { t: "Reconstruct the brig's last hours", r: 1 },
    { t: 'Board the silent ship mid-Atlantic', r: 1 },
    { t: 'Witness and record why they abandon her', r: 2 },
  ],
  'mod-mary-anning-fossil': [
    { t: "Follow Anning's eye along the cliff", r: 1 },
    { t: 'Work the crumbling Dorset cliff face', r: 2 },
    { t: 'Free the sea-dragon from the rock', r: 2 },
  ],
  'mod-semmelweis-ledger': [
    { t: "Find the ward's mortality records", r: 1 },
    { t: 'Move through the hostile hospital', r: 1 },
    { t: 'Copy the ledger that proves him right', r: 1 },
  ],
  'mod-livingstone-journals': [
    { t: "Locate the explorer's field journals", r: 1 },
    { t: 'Wade into the fever-swamp camp', r: 2 },
    { t: 'Save the journals history loses', r: 2 },
  ],
  'mod-tay-bridge': [
    { t: "Find the flaw in the engineer's calculations", r: 1 },
    { t: 'Reach the bridge office as the gale rises', r: 1 },
    { t: 'Take the notes before the spans drop', r: 3 },
  ],
  'mod-devils-footprints': [
    { t: 'Map the hundred-mile trail of prints', r: 1 },
    { t: 'Follow the prints across the frozen night', r: 1 },
    { t: 'Record the trail before the thaw', r: 1 },
  ],
  'mod-ambrose-bierce': [
    { t: "Ride with the revolution's column", r: 1 },
    { t: 'Find Bierce among the marching men', r: 1 },
    { t: 'Snatch his final dispatch before the ambush', r: 1 },
  ],
  'mod-ss-waratah': [
    { t: 'Work below as the ship labours', r: 1 },
    { t: 'Hold on through the mountainous swell', r: 2 },
    { t: 'Get the bridge log before she founders', r: 2 },
  ],
  'mod-kaspar-hauser': [
    { t: "Trace the foundling's few known facts", r: 1 },
    { t: 'Reach him before the assassin does', r: 1 },
    { t: 'Copy the papers he carried', r: 1 },
  ],
  'mod-hunley': [
    { t: 'Open the sunken hatch', r: 1 },
    { t: 'Hold your air in the silted dark', r: 2 },
    { t: 'Recover the mechanism before it settles', r: 3 },
  ],
  'mod-booth-diary': [
    { t: 'Find where the pages went', r: 1 },
    { t: 'Reach the diary under guard', r: 1 },
    { t: 'Photograph the eighteen pages before they are cut', r: 2 },
  ],
  'mod-confederate-gold': [
    { t: "Track the treasury train's route", r: 1 },
    { t: 'Reach the burial site ahead of the pursuers', r: 1 },
    { t: 'Count the crates — or carry them off', r: 1 },
  ],
  'mod-tambora-year': [
    { t: "Calculate the eruption's force", r: 1 },
    { t: 'Stand off the erupting mountain', r: 2 },
    { t: 'Measure the ash column at its height', r: 2 },
  ],
  'em-priestley-apparatus': [
    { t: 'Locate the cellar from the half-burned records', r: 1 },
    { t: 'Divert the gathering rioters from the east door', r: 2 },
    { t: 'Work the cellar lock before the smoke thickens', r: 2 },
    { t: 'Lift the sealed apparatus clear as the timbers catch', r: 3 },
  ],
  'em-lisbon-warning': [
    { t: "Find the engineer's desk in the failing light", r: 1 },
    { t: 'Brace the buckling doorway', r: 2 },
    { t: 'Cross the heaving floor', r: 2 },
    { t: 'Escape with the seismic notes as the city falls', r: 3 },
  ],
  'em-stradivari-varnish': [
    { t: "Win the master's trust", r: 1 },
    { t: 'Keep your place in the busy workshop', r: 1 },
    { t: 'Watch the ground coat go on, brush by brush', r: 2 },
    { t: 'Record the varnish recipe by eye and ear', r: 2 },
  ],
  'em-newton-papers': [
    { t: 'Learn which night the lamp overturns', r: 1 },
    { t: 'Reach the chamber as the fire starts', r: 2 },
    { t: 'Find the alchemical notebook among the flames', r: 2 },
    { t: 'Pull the notebook clear of the blaze', r: 3 },
  ],
  'em-dauphins-heart': [
    { t: "Confirm the boy's identity from the prison record", r: 2 },
    { t: "Slip the Temple prison's guard", r: 2 },
    { t: "Locate the doctor's quiet keeping-place", r: 1 },
    { t: 'Take the preserved heart — proof of a king', r: 2 },
  ],
  'em-roanoke': [
    { t: "Read the colony's last messages", r: 1 },
    { t: 'Walk the emptying stockade', r: 1 },
    { t: 'Search the dismantled houses for a sign', r: 2 },
    { t: 'Record where a hundred souls went', r: 3 },
  ],
  'em-mary-rose': [
    { t: "Find where the master's instruments are kept", r: 1 },
    { t: 'Get below as she heels over', r: 2 },
    { t: 'Work the cabinet open against the list', r: 2 },
    { t: 'Haul the instruments clear before the Solent closes', r: 3 },
  ],
  'em-mechanical-turk': [
    { t: "Learn the automaton's touring schedule", r: 1 },
    { t: 'Get into the cabinet between matches', r: 2 },
    { t: 'Trace the clockwork linkages', r: 2 },
    { t: 'Record how the trick really works', r: 2 },
  ],
  'em-vivaldi-scores': [
    { t: 'Find the rented lodgings before the sale', r: 1 },
    { t: 'Reach the rooms ahead of the dealers', r: 1 },
    { t: 'Sort the opera scores from the waste', r: 1 },
    { t: 'Carry the bound scores out', r: 2 },
  ],
  'em-tycho-death': [
    { t: "Reconstruct the astronomer's last days", r: 1 },
    { t: 'Reach the deathbed unchallenged', r: 1 },
    { t: 'Judge the symptoms at the bedside', r: 2 },
    { t: 'Take a sample to end the murder debate', r: 3 },
  ],
  'em-darien': [
    { t: "Find the company's records in the stockade", r: 1 },
    { t: 'Endure the fever-coast jungle', r: 2 },
    { t: 'Break into the locked counting-house', r: 2 },
    { t: 'Take the last ledger before the survivors burn it', r: 2 },
  ],
  'em-anghiari': [
    { t: "Read Vasari's records for the wall", r: 2 },
    { t: 'Work the great hall after hours', r: 1 },
    { t: 'Sound the wall for the hidden surface', r: 2 },
    { t: 'Record the mural — or cut it free', r: 3 },
  ],
  'em-cardenio': [
    { t: 'Find which company holds the play', r: 1 },
    { t: 'Slip backstage at the playhouse', r: 1 },
    { t: 'Locate the prompt-book', r: 1 },
    { t: 'Copy the prompt-book before the fire', r: 2 },
  ],
  'em-casket-letters': [
    { t: 'Trace the casket to its keeper', r: 2 },
    { t: 'Reach the locked study', r: 1 },
    { t: "Read the letters' contested hand", r: 2 },
    { t: 'Transcribe them — or take the casket whole', r: 2 },
  ],
  'em-flor-de-la-mar': [
    { t: "Find the strongroom on the carrack's plan", r: 1 },
    { t: 'Reach the wreck on the reef', r: 2 },
    { t: 'Force the flooded strongroom door', r: 2 },
    { t: 'Take the treasure before she breaks apart', r: 3 },
  ],
  'em-sea-venture': [
    { t: 'Work the wreck on the reef', r: 1 },
    { t: 'Hold on as the hull works apart', r: 2 },
    { t: "Find the captain's log in the flooding cabin", r: 1 },
    { t: 'Salvage the account before she breaks up', r: 2 },
  ],
  'med-greek-fire': [
    { t: "Read the siphonists' closely guarded order-book", r: 1 },
    { t: 'Keep your footing on the burning sea wall', r: 2 },
    { t: 'Watch the siphon fire and judge the secret mixture', r: 3 },
    { t: 'Reconstruct the lost formula step by step', r: 4 },
  ],
  'med-astronomers-margins': [
    { t: 'Find the hidden second set of notes', r: 1 },
    { t: 'Cross the cathedral works unseen', r: 2 },
    { t: 'Read the marginal cipher', r: 2 },
    { t: 'Copy the calculations centuries early', r: 3 },
  ],
  'med-voynich-quire': [
    { t: 'Find the missing quire in the binding', r: 2 },
    { t: 'Slip into the candlelit scriptorium', r: 1 },
    { t: 'Ease the unbound pages free', r: 2 },
    { t: 'Take the pages that unlock the cipher', r: 3 },
  ],
  'med-damascus-steel': [
    { t: 'Earn a place at the forge', r: 1 },
    { t: 'Work the heat of the smithy', r: 2 },
    { t: 'Time the quench and the folding', r: 3 },
    { t: 'Record the cycle that made wootz steel', r: 3 },
  ],
  'med-cathar-casket': [
    { t: "Learn the perfecti's escape route", r: 1 },
    { t: 'Descend the fortress cliff in the dark', r: 3 },
    { t: "Hold the rope under the treasure's weight", r: 2 },
    { t: 'Carry the Cathar treasure out before the fall', r: 3 },
  ],
  'med-princes-tower': [
    { t: 'Map the royal apartments', r: 1 },
    { t: 'Move through the Tower unseen', r: 2 },
    { t: 'Work past the locked apartments', r: 2 },
    { t: 'Record what becomes of the princes', r: 4 },
  ],
  'med-eilmer-glider': [
    { t: "Study the monk's wing design", r: 1 },
    { t: 'Climb to the abbey tower', r: 2 },
    { t: 'Examine the strapped wings', r: 2 },
    { t: 'Copy the contraption — or carry it home', r: 3 },
  ],
  'med-templar-fleet': [
    { t: 'Learn which ships sail that night', r: 1 },
    { t: "Reach the harbour before the king's men", r: 2 },
    { t: 'Break the strongboxes from the vault', r: 2 },
    { t: 'Run the treasure aboard before dawn', r: 3 },
  ],
  'med-house-of-wisdom': [
    { t: 'Find the most precious shelves', r: 1 },
    { t: 'Push through the sacked streets', r: 2 },
    { t: 'Choose what to save in moments', r: 2 },
    { t: 'Pull the manuscripts before the river takes them', r: 4 },
  ],
  'med-dancing-plague': [
    { t: 'Trace the plague to its first dancer', r: 1 },
    { t: 'Move among the dancing crowd', r: 1 },
    { t: 'Watch the dancers to exhaustion', r: 2 },
    { t: "Record the affliction before it's erased", r: 3 },
  ],
  'med-vinland': [
    { t: 'Read the sagas for the landing site', r: 1 },
    { t: 'Cross the fog-bound coast', r: 1 },
    { t: 'Survey the turf halls', r: 2 },
    { t: 'Measure the settlement — or take its ironwork', r: 2 },
  ],
  'med-kublai-fleet': [
    { t: 'Work the wreck in the bay', r: 1 },
    { t: 'Dive the typhoon-scattered fleet', r: 3 },
    { t: 'Find the flagship among the wrecks', r: 2 },
    { t: 'Reach the hold before the wind finishes', r: 3 },
  ],
  'med-green-children': [
    { t: 'Find the field where they appeared', r: 1 },
    { t: 'Win the wary children’s trust', r: 1 },
    { t: 'Make sense of their unknown tongue', r: 3 },
    { t: 'Record their account before it turns to folktale', r: 3 },
  ],
  'anc-before-the-fire': [
    { t: 'Talk your way past the librarians', r: 2 },
    { t: "Slip a scholar's suspicious question", r: 1 },
    { t: 'Navigate the unlit lower stacks', r: 2 },
    { t: 'Gather loose ostraca as cover', r: 2 },
    { t: 'Seize the doomed scroll as the shelves begin to burn', r: 3 },
  ],
  'anc-mercury-sea': [
    { t: "Read the court records for the tomb's plan", r: 2 },
    { t: "Cross the mercury moat's poisoned vapours", r: 3 },
    { t: 'Disarm the buried crossbow triggers', r: 2 },
    { t: 'Map the mercury rivers and their strange currents', r: 2 },
    { t: 'Breach the sealed inner chamber', r: 4 },
  ],
  'anc-antikythera': [
    { t: 'Find the mechanism in the Rhodian workshop', r: 2 },
    { t: 'Keep your place as it is demonstrated', r: 1 },
    { t: 'Follow the gear-trains as they turn', r: 3 },
    { t: 'Trace every tooth and ratio', r: 3 },
    { t: 'Record the whole mechanism before the ship sinks', r: 4 },
  ],
  'anc-roman-concrete': [
    { t: 'Earn a place on the harbour works', r: 2 },
    { t: 'Work the sea-wall in the surf', r: 2 },
    { t: 'Watch the moles being poured', r: 2 },
    { t: 'Note the proportions as they mix', r: 2 },
    { t: 'Record the self-healing recipe', r: 3 },
  ],
  'anc-silphium': [
    { t: 'Find the last wild stand', r: 2 },
    { t: 'Cross the harvested hills', r: 2 },
    { t: 'Identify a viable plant', r: 2 },
    { t: 'Dig it out root and all', r: 3 },
    { t: 'Lift a living silphium clear before extinction', r: 3 },
  ],
  'anc-dead-sea-scroll': [
    { t: 'Find the right cave above the sea', r: 2 },
    { t: 'Reach it before the legions', r: 2 },
    { t: "Read the jars' markings", r: 2 },
    { t: 'Open the sealed jar', r: 2 },
    { t: 'Take the scroll our scholars never read', r: 4 },
  ],
  'anc-archimedes-syracuse': [
    { t: "Find Archimedes' house in the falling city", r: 2 },
    { t: 'Reach it ahead of the legionaries', r: 3 },
    { t: 'Make sense of the impossible machines', r: 3 },
    { t: 'Pack the apparatus to move', r: 3 },
    { t: 'Carry the machines out of the burning city', r: 4 },
  ],
  'anc-roman-dodecahedron': [
    { t: "Find the craftsman's bench", r: 2 },
    { t: 'Wait out the busy workshop', r: 1 },
    { t: 'Watch how he uses the thing', r: 3 },
    { t: 'Measure its holes and knobs', r: 2 },
    { t: 'Take the dodecahedron — or record its use', r: 3 },
  ],
  'anc-phaistos-disc': [
    { t: 'Find the disc in the palace stores', r: 2 },
    { t: 'Move through the palace unseen', r: 2 },
    { t: 'Study the spiral of stamped signs', r: 3 },
    { t: 'Take a careful impression', r: 2 },
    { t: 'Copy both faces before the palace burns', r: 3 },
  ],
  'anc-sea-peoples': [
    { t: 'Find the archive in the burning city', r: 2 },
    { t: 'Reach it as the raiders close in', r: 3 },
    { t: 'Sort the diplomatic tablets', r: 2 },
    { t: 'Save the tablets from the flames', r: 2 },
    { t: 'Read who brought the kingdoms down', r: 3 },
  ],
  'anc-ninth-legion': [
    { t: "Find the fort's record room", r: 2 },
    { t: 'March north into the mist', r: 2 },
    { t: "Trace the legion's last orders", r: 2 },
    { t: 'Break into the strong-room', r: 2 },
    { t: "Recover the last muster before it's struck out", r: 3 },
  ],
  'anc-nazca': [
    { t: 'Find your bearings on the empty pampa', r: 2 },
    { t: 'Walk the lines under the desert sun', r: 2 },
    { t: 'Trace a single figure end to end', r: 2 },
    { t: 'Map the figures from the heights', r: 3 },
    { t: 'Survey them before the wind blurs the edges', r: 3 },
  ],
  'pre-gobekli-tepe': [
    { t: 'Make sense of a people who left no written word', r: 2 },
    { t: 'Endure the exposed hilltop dig', r: 2 },
    { t: "Read the stones' astronomical alignment", r: 3 },
    { t: 'Survey how the megaliths were raised without metal', r: 2 },
    { t: 'Record why they built it', r: 3 },
  ],
  'pre-doggerland': [
    { t: "Read the drowned land's old shoreline", r: 2 },
    { t: 'Reach the plain before the wave', r: 2 },
    { t: 'Find the hearth among the reeds', r: 2 },
    { t: 'Dig the tools from the hearth', r: 2 },
    { t: 'Lift the tools clear as the sea pours in', r: 4 },
  ],
  'pre-last-mammoth': [
    { t: 'Track the last herd on the island', r: 2 },
    { t: 'Cross the frozen island', r: 2 },
    { t: 'Judge the herd for a healthy calf', r: 3 },
    { t: 'Sedate one and take tissue and tusk', r: 2 },
    { t: 'Bring a living calf back through the door', r: 3 },
  ],
  'pre-akrotiri': [
    { t: "Find the merchant's house in the town", r: 1 },
    { t: 'Cross the shaking streets', r: 3 },
    { t: 'Identify the bronze hoard', r: 2 },
    { t: "Break open the merchant's store", r: 2 },
    { t: 'Take the hoard and run for the boats', r: 4 },
  ],
  'pre-chauvet': [
    { t: 'Find the painted chamber deep in the cave', r: 2 },
    { t: 'Crawl the tallow-lit passages', r: 2 },
    { t: 'Watch the artists at work', r: 2 },
    { t: 'Read the lamplight and the pigments', r: 2 },
    { t: 'Record the oldest masters before the lamps gutter', r: 3 },
  ],
  'pre-stonehenge': [
    { t: 'Make sense of a people with no writing', r: 2 },
    { t: 'Stand among the hauling crews', r: 2 },
    { t: 'Study how the sarsens are dressed', r: 3 },
    { t: "Read the ring's alignment to the sky", r: 2 },
    { t: 'Record how and why they raise the stones', r: 3 },
  ],
  'pre-denisovan': [
    { t: "Place the cave's deep layers in order", r: 2 },
    { t: 'Work the unstable dig', r: 2 },
    { t: 'Identify the Denisovan layer', r: 3 },
    { t: 'Extract the fingerbone intact', r: 2 },
    { t: 'Recover a living trace before the layer is lost', r: 3 },
  ],
  'pre-blombos': [
    { t: 'Find the ochre piece in the cave fill', r: 1 },
    { t: 'Work the coastal cave', r: 2 },
    { t: 'Make out the cross-hatched marks', r: 2 },
    { t: 'Steady the crumbling ochre', r: 2 },
    { t: 'Record the first mark before it turns to dust', r: 3 },
  ],
  'pre-red-deer-cave': [
    { t: "Date the cave's strange remains", r: 2 },
    { t: 'Shore up the failing cave roof', r: 2 },
    { t: 'Read the ancient features in the bones', r: 3 },
    { t: 'Judge how a vanished people survived', r: 2 },
    { t: 'Take a specimen before the roof comes down', r: 4 },
  ],
  'pre-long-winter': [
    { t: 'Locate the buried impact horizon', r: 2 },
    { t: 'Cross the meltwater channels', r: 2 },
    { t: 'Read the dark layer in the ice', r: 3 },
    { t: 'Core the impact layer', r: 2 },
    { t: 'Measure it before the meltwater scours it', r: 3 },
  ],
  'mw-the-first-door': [
    { t: 'Hold the branch point steady in the mathematics', r: 3 },
    { t: 'Tune every machine at the table in unison', r: 3 },
    { t: "Withstand the crossing's tearing forces", r: 4 },
    { t: "Read the door's shifting geometry", r: 4 },
    { t: 'Hold the door open long enough to cross', r: 5 },
  ],
  'mw-the-converging-paths': [
    { t: "Hold the threshold's tearing light", r: 3 },
    { t: 'Read the converging paths', r: 3 },
    { t: 'Lock every machine to the same instant', r: 4 },
    { t: 'Withstand the crossing together', r: 4 },
    { t: 'Step through before the threshold closes', r: 5 },
  ],
};

const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
let applied = 0, warn = 0;
for (const c of data.cards) {
  const spec = STEPS[c.id];
  if (!spec) continue;
  const band = BANDS[c.era];
  if (spec.length !== c.steps.length) { console.log('WARN step-count mismatch:', c.id); warn++; continue; }
  c.steps.forEach((s, i) => {
    s.text = spec[i].t;
    const [lo, hi] = band[i];
    if (spec[i].r < lo || spec[i].r > hi) { console.log(`WARN req ${spec[i].r} out of band [${lo},${hi}]:`, c.id, 'step', i + 1); warn++; }
    s.req = spec[i].r;
  });
  applied++;
}
fs.writeFileSync(FILE, JSON.stringify(data, null, 1) + '\n', 'utf8');
console.log('applied flavour + req to', applied, 'cards · warnings', warn);
