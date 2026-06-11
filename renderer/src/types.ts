export type Skill = 'Insight' | 'Craft' | 'Grit';
export type Profession = 'Historian' | 'Engineer' | 'Physicist';
export type StepType = 'gate' | 'danger' | 'knowledge';
export type ObjectiveMode = 'record-only' | 'plunder-or-record' | 'doomed-grab' | 'triumph';

export interface Step {
  n: number;
  skill: Skill;
  req: number;
  type: StepType;
  lock?: Profession;
  find?: boolean;
  objective?: boolean;
  text?: string; // per-step flavour: what the team is doing here (justifies the skill + any lock)
}

export interface Objective {
  mode: ObjectiveMode;
  doomed: boolean;
  rep: number;
  sellCash: number;
  scar: number;
  disrepute: number;
}

export interface Destination {
  id: string;
  name: string;
  era: string;
  eraIndex: number;
  place: string;
  mysteryTier: number;
  fiction: string;
  steps: Step[];
  findStep: number | null;
  find: { cash: number; publishRep: number } | null;
  earlySpoil: { step: number; cash: number } | null;
  failIntegrity?: number;
  objective: Objective;
}

export interface Researcher {
  id: string;
  name: string;
  deck: string;
  profession: Profession;
  pips: { insight: number; craft: number; grit: number };
  totalPips: number;
  cost: number;
  earnableBoxes: number;
  flavour: string;
}

export interface PartingGift {
  id: string;
  name: string;
  type: string;
  value: number | null;
  fiction: string;
  effect: string;
}

export interface Consequence {
  id: string;
  name: string;
  category: string;
  copies: number;
  fiction: string;
  effect: string;
}

export interface Deck<T> {
  _meta?: Record<string, unknown>;
  cards: T[];
}
