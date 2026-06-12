import { Box } from '@mui/material';
import type { SkillCardSpec } from '../furniture';

// Mini card (44×67mm) for the deck-builder currency. The solid border is the cut line; the top band
// echoes the researcher cards' accent stripe. A big central glyph carries it at a glance in a fanned
// hand, with the skill name repeated top + bottom so it reads from either edge. Trace is styled as
// junk (grey, faint) so it's obvious it matches nothing.
export const SKILL_CARD_W = '44mm';
export const SKILL_CARD_H = '67mm';

export function SkillCard({ spec }: { spec: SkillCardSpec }) {
  const isTrace = spec.kind === 'Trace';
  return (
    <Box
      sx={{
        width: SKILL_CARD_W,
        height: SKILL_CARD_H,
        boxSizing: 'border-box',
        border: '0.25mm solid #2b2b2b',
        borderTop: `2.2mm solid ${spec.band}`,
        background: spec.fill,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        breakInside: 'avoid',
      }}
    >
      <Box
        sx={{
          mt: '1.6mm',
          fontSize: '8pt',
          fontWeight: 800,
          letterSpacing: '0.6pt',
          textTransform: 'uppercase',
          color: spec.ink,
        }}
      >
        {spec.name}
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '34pt',
          lineHeight: 1,
          color: spec.ink,
          opacity: isTrace ? 0.55 : 1,
        }}
      >
        {spec.glyph}
      </Box>

      <Box
        sx={{
          fontSize: '5.4pt',
          fontStyle: 'italic',
          color: isTrace ? '#888' : '#666',
          textAlign: 'center',
          px: '1.6mm',
          lineHeight: 1.15,
        }}
      >
        {spec.note}
      </Box>
      <Box
        sx={{
          mt: '1mm',
          mb: '1.6mm',
          fontSize: '6.6pt',
          fontWeight: 700,
          letterSpacing: '0.4pt',
          textTransform: 'uppercase',
          color: spec.ink,
          opacity: 0.75,
        }}
      >
        {spec.name}
      </Box>
    </Box>
  );
}
