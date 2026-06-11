'use strict';
// Validated economy constants (from best-config.json — produced by the archived v1 sim) + labels.
const path = require('path');

const cfg  = require(path.join(__dirname, '..', 'best-config.json')).config;
const ERAS = ['Recent', 'Modern', 'EarlyModern', 'Medieval', 'Ancient', 'Prehistoric', 'ManyWorlds'];
const PROF = ['Historian', 'Engineer', 'Physicist'];

module.exports = { cfg, ERAS, PROF };
