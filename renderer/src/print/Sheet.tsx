import { Box } from '@mui/material';
import type { ReactNode } from 'react';

const A4_W = '210mm';
const A4_H = '297mm';
const COLS = 3;
const ROWS = 3;
export const PER_SHEET = COLS * ROWS;

export function chunk<T>(arr: T[], n: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

// One A4 page of up to 9 cards in a 3×3 grid. `mirror` reverses each row's column order so a
// page of card BACKS aligns with the matching page of FRONTS when duplex-printed (long-edge flip).
export function Sheet({ cards, mirror = false }: { cards: ReactNode[]; mirror?: boolean }) {
  const slots: (ReactNode | null)[] = [...cards];
  while (slots.length < PER_SHEET) slots.push(null);

  let ordered = slots;
  if (mirror) {
    ordered = chunk(slots, COLS)
      .map((row) => row.slice().reverse())
      .flat();
  }

  return (
    <Box
      className="sheet"
      sx={{
        width: A4_W,
        height: A4_H,
        boxSizing: 'border-box',
        p: '7mm',
        display: 'grid',
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        placeItems: 'center',
      }}
    >
      {ordered.map((c, i) => (
        <Box key={i} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {c}
        </Box>
      ))}
    </Box>
  );
}
