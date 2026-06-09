'use strict';
// Trace one 4-player game from sim.js to diagnose MW=0% issue
// We monkey-patch playGame to trace player state per round

const sim = require('./sim.js');
// sim.js doesn't export — we need to copy key logic or run a wrapper
// Instead: run a quick diagnostic inline by piping to Node

process.exit(0); // placeholder — use inline below
