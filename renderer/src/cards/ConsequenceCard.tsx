import { Box } from '@mui/material';
import type { Consequence } from '../types';
import { CardShell, Pill } from './parts';

const CAT: Record<string, { label: string; color: string }> = {
  int1: { label: 'Integrity −1', color: '#a52828' },
  int2: { label: 'Integrity −2', color: '#7a1010' },
  cashLoss: { label: 'Cash −', color: '#b8860b' },
  cashGain: { label: 'Cash +', color: '#2f8f73' },
  repLoss: { label: 'Reputation −', color: '#6a4caf' },
  repGain: { label: 'Reputation +', color: '#2f5d99' },
  modLoss: { label: 'Module −', color: '#555' },
  nothing: { label: 'Clean', color: '#888' },
};

export function ConsequenceCard({ card }: { card: Consequence }) {
  const cat = CAT[card.category] ?? { label: card.category, color: '#444' };
  return (
    <CardShell accent={cat.color}>
      <Box sx={{ px: '2mm', pt: '1.4mm', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Pill color="#fff" bg={cat.color}>
          Consequence
        </Pill>
        <Box sx={{ fontSize: '6pt', fontWeight: 700, color: cat.color }}>{cat.label}</Box>
      </Box>

      <Box sx={{ px: '2mm', mt: '1mm' }}>
        <Box sx={{ fontSize: '10pt', fontWeight: 700, lineHeight: 1.1 }}>{card.name}</Box>
      </Box>

      <Box sx={{ px: '2mm', mt: '1.2mm', flexGrow: 1 }}>
        <Box
          sx={{
            fontSize: '7pt',
            fontStyle: 'italic',
            color: '#3a3a3a',
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 6,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {card.fiction}
        </Box>
      </Box>

      <Box
        sx={{
          mx: '2mm',
          mb: '2mm',
          p: '1.4mm',
          background: '#f3efe6',
          borderLeft: `1mm solid ${cat.color}`,
          fontSize: '7pt',
          fontWeight: 600,
          lineHeight: 1.25,
        }}
      >
        {card.effect}
      </Box>
    </CardShell>
  );
}
