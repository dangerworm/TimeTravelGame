// Copies the canonical decks/*/cards.json into src/content/ so the app can import them.
// Runs automatically before `dev` and `build` (see package.json). The JSON in ../decks is the
// single source of truth; this is a one-way copy. src/content is gitignored.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const decks = path.resolve(root, '..', 'decks');
const out = path.resolve(root, 'src', 'content');

fs.mkdirSync(out, { recursive: true });

const map = {
  destinations: 'destinations/cards.json',
  researchers: 'researchers/cards.json',
  experts: 'experts/cards.json',
  retirement: 'retirement/cards.json',
  consequences: 'consequences/cards.json',
};

let ok = 0;
for (const [name, rel] of Object.entries(map)) {
  const src = path.join(decks, rel);
  if (!fs.existsSync(src)) {
    console.warn('  [sync] MISSING', src, '— writing empty deck');
    fs.writeFileSync(path.join(out, name + '.json'), JSON.stringify({ cards: [] }, null, 2));
    continue;
  }
  fs.copyFileSync(src, path.join(out, name + '.json'));
  ok++;
}
console.log(`[sync] ${ok} deck(s) copied into src/content/`);
