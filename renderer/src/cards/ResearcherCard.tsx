import { Box } from '@mui/material';
import type { Researcher } from '../types';
import { professionColor, skillColor } from '../theme';
import { CardShell, Pill, PipRow, XpBoxes } from './parts';

export function ResearcherCard({ card }: { card: Researcher }) {
  const accent = professionColor[card.profession] ?? '#444';
  const isExpert = card.deck === 'Experts';
  // Display: 3 boxes total; experts fully filled (3/3), juniors show 1 pre-filled of (1 + earnable).
  const totalBoxes = 3;
  const filled = isExpert ? 3 : Math.max(1, totalBoxes - card.earnableBoxes);
  return (
    <CardShell accent={accent} bg={isExpert ? '#fbf7ef' : '#fff'}>
      <Box sx={{ px: '2mm', pt: '1.4mm', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Box sx={{ fontSize: '10pt', fontWeight: 700, lineHeight: 1.05 }}>{card.name}</Box>
          <Box sx={{ mt: '0.6mm' }}>
            <Pill color="#fff" bg={accent}>
              {card.profession}
            </Pill>
          </Box>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Box sx={{ fontSize: '5.4pt', color: '#999', mb: '0.6mm' }}>experience</Box>
          <XpBoxes total={totalBoxes} filled={filled} />
        </Box>
      </Box>

      <Box
        sx={{
          mx: '2mm',
          my: '1.4mm',
          height: '22mm',
          border: '0.3mm dashed #cbb',
          borderRadius: '1mm',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#cbb',
          fontSize: '6pt',
          fontStyle: 'italic',
        }}
      >
        portrait
      </Box>

      <Box sx={{ px: '2mm' }}>
        <PipRow label="Insight" value={card.pips.insight} color={skillColor.Insight} />
        <PipRow label="Craft" value={card.pips.craft} color={skillColor.Craft} />
        <PipRow label="Grit" value={card.pips.grit} color={skillColor.Grit} />
      </Box>

      <Box sx={{ px: '2mm', mt: '0.8mm', flexGrow: 1 }}>
        <Box
          sx={{
            fontSize: '6pt',
            fontStyle: 'italic',
            color: '#555',
            lineHeight: 1.2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {card.flavour}
        </Box>
      </Box>

      <Box
        sx={{
          px: '2mm',
          py: '1mm',
          borderTop: '0.3mm solid #eee',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '6.4pt',
        }}
      >
        <Box>
          Cost <b style={{ fontSize: '8pt' }}>{card.cost}¢</b>
        </Box>
        <Box sx={{ color: '#777' }}>
          {card.totalPips} pips{isExpert ? ' · maxed, no retire' : ''}
        </Box>
      </Box>
    </CardShell>
  );
}
