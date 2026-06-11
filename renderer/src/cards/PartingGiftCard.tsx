import { Box } from '@mui/material';
import type { PartingGift } from '../types';
import { CardShell, Pill } from './parts';

const TYPE: Record<string, { label: string; color: string }> = {
  upgrade: { label: 'Upgrade', color: '#b8860b' },
  boon: { label: 'Boon', color: '#2f8f73' },
  reputation: { label: 'Reputation', color: '#2f5d99' },
  protege: { label: 'Protégé', color: '#6a4caf' },
};

export function PartingGiftCard({ card }: { card: PartingGift }) {
  const t = TYPE[card.type] ?? { label: card.type, color: '#444' };
  return (
    <CardShell accent={t.color} bg="#fdfbf6">
      <Box sx={{ px: '2mm', pt: '1.4mm', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Pill color="#fff" bg={t.color}>
          Parting Gift
        </Pill>
        <Box sx={{ fontSize: '6pt', fontWeight: 700, color: t.color }}>{t.label}</Box>
      </Box>

      <Box sx={{ px: '2mm', mt: '1mm' }}>
        <Box sx={{ fontSize: '11pt', fontWeight: 700, lineHeight: 1.1 }}>{card.name}</Box>
      </Box>

      <Box sx={{ px: '2mm', mt: '1.2mm', flexGrow: 1 }}>
        <Box
          sx={{
            fontSize: '6.6pt',
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
          background: '#f1ece1',
          borderLeft: `1mm solid ${t.color}`,
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
