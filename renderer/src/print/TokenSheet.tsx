import { Box } from '@mui/material';
import { TOKENS } from '../furniture';
import type { TokenSpec } from '../furniture';

// A single punch-out token. The solid border is the cut line. Diamonds rotate the box 45° and
// counter-rotate the face so the value stays upright; their flex cell reserves the rotated
// diagonal (size × √2) so neighbours don't overlap.
function Token({ spec }: { spec: TokenSpec }) {
  const s = `${spec.size}mm`;
  const isDiamond = spec.shape === 'diamond';
  const cell = isDiamond ? `${(spec.size * 1.42).toFixed(1)}mm` : s;
  return (
    <Box sx={{ width: cell, height: cell, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        sx={{
          width: s,
          height: s,
          boxSizing: 'border-box',
          background: spec.fill,
          border: `0.3mm solid ${spec.ink}`,
          borderRadius: spec.shape === 'disc' ? '50%' : '1mm',
          transform: isDiamond ? 'rotate(45deg)' : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            transform: isDiamond ? 'rotate(-45deg)' : 'none',
            color: spec.ink,
            fontWeight: 800,
            fontSize: `${Math.max(6, spec.size * 0.42)}pt`,
            lineHeight: 1,
          }}
        >
          {spec.face}
        </Box>
      </Box>
    </Box>
  );
}

function TokenGroup({ spec }: { spec: TokenSpec }) {
  return (
    <Box className="token-group" sx={{ mb: '6mm' }}>
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '3mm', mb: '2mm', borderBottom: '0.3mm solid #ccc', pb: '1mm' }}>
        <Box sx={{ fontSize: '10pt', fontWeight: 700, letterSpacing: '0.4pt', textTransform: 'uppercase' }}>
          {spec.label}
        </Box>
        {spec.note && <Box sx={{ fontSize: '7pt', fontStyle: 'italic', color: '#777' }}>{spec.note}</Box>}
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ fontSize: '7pt', color: '#999' }}>×{spec.count}</Box>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '2.5mm' }}>
        {Array.from({ length: spec.count }).map((_, i) => (
          <Token key={i} spec={spec} />
        ))}
      </Box>
    </Box>
  );
}

// All token groups flow down a single A4-width column; the browser paginates at print and
// `break-inside: avoid` (print.css) keeps a group from splitting across a page where it can.
export function TokenSheets() {
  return (
    <Box className="token-flow">
      {TOKENS.map((spec) => (
        <TokenGroup key={spec.id} spec={spec} />
      ))}
    </Box>
  );
}

export const TOKEN_TOTAL = TOKENS.reduce((n, t) => n + t.count, 0);
