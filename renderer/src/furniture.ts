// Game furniture — tokens and the time-machine module data. These are NOT authored card content
// (they don't live in decks/*.json); they're constants derived from the GDD (§3 Components, §7
// zones, §8 the four modules) and the whiteboard draft in
// design/2026-06-09-post-whiteboarding-with-andy.png. Tune freely — this is a prototype set.

export type TokenShape = 'square' | 'disc' | 'diamond';

export interface TokenSpec {
  id: string;
  label: string; // group heading on the punch-out sheet
  note?: string; // small sub-line under the heading
  face: string; // what's printed on the token (value or glyph)
  shape: TokenShape;
  fill: string;
  ink: string; // text / border colour
  size: number; // mm
  count: number; // how many to print (generous for up to 6 players)
}

// Colours echo the renderer theme + the whiteboard draft (Cash = blue diamonds, Reputation =
// amber squares, experience = the blue xp-box blue #2f5d99).
export const TOKENS: TokenSpec[] = [
  { id: 'cash-1', label: 'Cash', note: '¢1 — the spending currency', face: '1', shape: 'diamond', fill: '#cfe0f4', ink: '#2f5d99', size: 16, count: 48 },
  { id: 'cash-5', label: 'Cash', note: '¢5', face: '5', shape: 'diamond', fill: '#7aa6d6', ink: '#13294b', size: 16, count: 24 },
  { id: 'rep-1', label: 'Reputation', note: 'the score — never spent', face: '1', shape: 'square', fill: '#fbe7ad', ink: '#8a6400', size: 16, count: 48 },
  { id: 'rep-5', label: 'Reputation', note: '5', face: '5', shape: 'square', fill: '#e0b84e', ink: '#5a3d00', size: 16, count: 24 },
  { id: 'disrepute', label: 'Disrepute', note: 'the moral stain — nets against Reputation at scoring', face: '✦', shape: 'square', fill: '#3a2b3f', ink: '#f2dff0', size: 15, count: 36 },
  { id: 'instability', label: 'Instability', note: 'on the machine — each adds a Trace to your deck', face: '⚡', shape: 'disc', fill: '#b07cc6', ink: '#3a1147', size: 14, count: 40 },
  { id: 'experience', label: 'Experience', note: 'sits on a researcher — every 2nd advances a box', face: '●', shape: 'disc', fill: '#cfddf0', ink: '#2f5d99', size: 11, count: 60 },
  { id: 'integrity', label: 'Timeline Integrity marker', note: 'one shared marker (+ spares)', face: '◆', shape: 'disc', fill: '#f3c33b', ink: '#5a4300', size: 18, count: 3 },
  { id: 'first-player', label: 'First-player marker', note: 'one', face: '1st', shape: 'disc', fill: '#2e7d4f', ink: '#fff', size: 18, count: 1 },
];

export interface MachineModule {
  n: number; // module number as drawn on the diamond (1–4)
  name: string;
  does: string; // the descriptor printed in the quadrant corner
  costs: string; // upgrade-cost ladder (GDD §8)
  upgradedBy: string;
  fill: string;
  ink: string;
  start: number; // starting level (setup)
}

// Quadrants, in draw order around the diamond: top, right, bottom, left.
export const MACHINE: { top: MachineModule; right: MachineModule; bottom: MachineModule; left: MachineModule } = {
  top: { n: 1, name: 'Displacement Amplifier', does: 'max era reachable', costs: '0·1·2·4·6·9', upgradedBy: 'see Amplifier ladder', fill: '#f6cdc4', ink: '#7a2018', start: 1 },
  right: { n: 2, name: 'Baryonic Capacitor', does: 'expedition capacity', costs: '3·4·6·9', upgradedBy: 'Physicist', fill: '#cfe6d5', ink: '#1f5a36', start: 1 },
  bottom: { n: 3, name: 'Temporal Collimator', does: 'era cards pulled at Plan', costs: '3·5·8', upgradedBy: 'Engineer', fill: '#cfe0f4', ink: '#1c3e6b', start: 1 },
  left: { n: 4, name: 'Quantum Stabiliser', does: 'max instability before shutdown', costs: '2 → +2 (4·7)', upgradedBy: 'Physicist', fill: '#fbe7ad', ink: '#6a4d00', start: 2 },
};

// Level diamonds — the markers you stack onto a machine quadrant as that module upgrades. One set
// per player. Each diamond is in its module's colour and prints the level (or, for the Amplifier,
// the era reached; for the Stabiliser, the instability cap). Sized to overlay a board quadrant.
const ERAS = ['Recent', 'Modern', 'Early Modern', 'Medieval', 'Ancient', 'Prehistoric', 'Many Worlds'];

export interface LevelDiamond {
  value: string; // the big number on the diamond
  sub?: string; // small sub-line (era name, or "max")
}
export interface ModuleDiamonds {
  key: string;
  name: string;
  fill: string;
  ink: string;
  size: number; // mm — overlay footprint on a quadrant
  levels: LevelDiamond[];
}

const DIA = 30; // overlay size in mm

// Full range start→max, so a set works whether you single-mark or stack.
export const MODULE_DIAMONDS: ModuleDiamonds[] = [
  {
    key: 'amplifier',
    name: 'Displacement Amplifier',
    fill: MACHINE.top.fill,
    ink: MACHINE.top.ink,
    size: DIA,
    levels: [1, 2, 3, 4, 5, 6, 7].map((n) => ({ value: String(n), sub: ERAS[n - 1] })),
  },
  {
    key: 'capacitor',
    name: 'Baryonic Capacitor',
    fill: MACHINE.right.fill,
    ink: MACHINE.right.ink,
    size: DIA,
    levels: [1, 2, 3, 4, 5].map((n) => ({ value: String(n) })),
  },
  {
    key: 'collimator',
    name: 'Temporal Collimator',
    fill: MACHINE.bottom.fill,
    ink: MACHINE.bottom.ink,
    size: DIA,
    levels: [1, 2, 3, 4].map((n) => ({ value: String(n) })),
  },
  {
    key: 'stabiliser',
    name: 'Quantum Stabiliser',
    fill: MACHINE.left.fill,
    ink: MACHINE.left.ink,
    size: DIA,
    levels: [2, 4, 6].map((n) => ({ value: String(n), sub: 'cap' })),
  },
];

export const DIAMONDS_PER_PLAYER = MODULE_DIAMONDS.reduce((n, m) => n + m.levels.length, 0);
