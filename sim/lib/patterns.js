'use strict';
// Drew's hand-tuned req-pattern spread (11 Jun). Each step is a [min,max] band rolled per card from
// the game RNG — so a card's numbers track its narrative within a band, not a flat mechanical
// pattern. Shared by sim/full-game.js and sim/llm/play-llm-game.js so the two drivers can never
// silently diverge on what "--reqs proposed" means.
const PROPOSED = {
  Recent: [
    [1, 1],
    [1, 1],
    [1, 2],
  ],
  Modern: [
    [1, 1],
    [1, 2],
    [1, 3],
  ],
  EarlyModern: [
    [1, 2],
    [1, 3],
    [1, 2],
    [2, 3],
  ],
  Medieval: [
    [1, 2],
    [1, 3],
    [2, 3],
    [2, 4],
  ],
  Ancient: [
    [2, 3],
    [1, 3],
    [2, 3],
    [2, 4],
    [2, 4],
  ],
  Prehistoric: [
    [1, 3],
    [2, 3],
    [2, 4],
    [1, 3],
    [3, 4],
  ],
  ManyWorlds: [
    [2, 4],
    [2, 4],
    [3, 4],
    [3, 4],
    [5, 5],
  ],
};

module.exports = { PROPOSED };
