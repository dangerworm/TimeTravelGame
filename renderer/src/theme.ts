import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: { fontFamily: 'Georgia, "Times New Roman", serif' },
  palette: { background: { default: '#4a4a4a' } },
});

// Era band colours (soft fill) + accent (the coloured spine), matching the whiteboard era track.
export const eraColor: Record<string, string> = {
  Recent: '#d6ebdb',
  Modern: '#fbe7ad',
  EarlyModern: '#f6cdc4',
  Medieval: '#f2ead2',
  Ancient: '#d3e1f4',
  Prehistoric: '#c6e6d9',
  ManyWorlds: '#f5bcbc',
};
export const eraAccent: Record<string, string> = {
  Recent: '#2e7d4f',
  Modern: '#b8860b',
  EarlyModern: '#c0392b',
  Medieval: '#9a7d2e',
  Ancient: '#2f5d99',
  Prehistoric: '#2f8f73',
  ManyWorlds: '#a52828',
};

export const skillColor: Record<Skill, string> = {
  Insight: '#b8860b', // gold
  Craft: '#2f5d99', // blue
  Grit: '#b0392b', // red
};
export const professionColor: Record<string, string> = {
  Historian: '#6a4caf',
  Engineer: '#b8860b',
  Physicist: '#2f5d99',
};

export const eraLabel: Record<string, string> = {
  Recent: 'Recent',
  Modern: 'Modern',
  EarlyModern: 'Early Modern',
  Medieval: 'Medieval',
  Ancient: 'Ancient',
  Prehistoric: 'Prehistoric',
  ManyWorlds: 'Many Worlds',
};

type Skill = 'Insight' | 'Craft' | 'Grit';
