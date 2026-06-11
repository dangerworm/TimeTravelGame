'use strict';
// Enumerates every distinct table COMPOSITION (unordered multiset of archetypes) for nPlayers — so
// the sim can average over all possible mixes rather than one fixed cycle. Non-decreasing archetype
// index avoids counting permutations twice. n=3 → 10 tables, n=4 → 15, n=5 → 21.
const archetypes = ["greedy", "cautious", "balanced"];

function* getPlayerCombinations(nPlayers, curPlayer = 0, curPlyrArchetype = 0) {
  if (curPlayer < nPlayers - 1) {
    for (let a = curPlyrArchetype; a < archetypes.length; a++) {
      const combinations = [...getPlayerCombinations(nPlayers, curPlayer + 1, a)];

      for (const combination of combinations) {
        yield [archetypes[a], combination].flat();
      }
    }
  } else {
    for (let a = curPlyrArchetype; a < archetypes.length; a++) {
      yield archetypes[a];
    }
  }
}

module.exports = { getPlayerCombinations };
