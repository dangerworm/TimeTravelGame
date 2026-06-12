import { Box } from '@mui/material';
import { MODULE_DIAMONDS } from '../furniture';
import type { LevelDiamond, ModuleDiamonds } from '../furniture';

// One level diamond. The box is rotated 45°; the face counter-rotates upright. The flex cell
// reserves the rotated diagonal (size × √2) so stacked rows don't overlap on the punch sheet.
function Diamond({ mod, level }: { mod: ModuleDiamonds; level: LevelDiamond }) {
  const s = `${mod.size}mm`;
  const cell = `${(mod.size * 1.42).toFixed(1)}mm`;
  return (
    <Box sx={{ width: cell, height: cell, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        sx={{
          width: s,
          height: s,
          boxSizing: 'border-box',
          background: mod.fill,
          border: `0.3mm solid ${mod.ink}`,
          borderRadius: '1.5mm',
          transform: 'rotate(45deg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ transform: 'rotate(-45deg)', textAlign: 'center', color: mod.ink, lineHeight: 1 }}>
          <Box sx={{ fontSize: `${mod.size * 0.36}pt`, fontWeight: 800 }}>{level.value}</Box>
          {level.sub && <Box sx={{ fontSize: '5pt', fontWeight: 600, mt: '0.3mm' }}>{level.sub}</Box>}
        </Box>
      </Box>
    </Box>
  );
}

// One player's full set: a row of level diamonds per module.
function PlayerSet({ n }: { n: number }) {
  return (
    <Box className="token-group" sx={{ mb: '7mm' }}>
      <Box sx={{ fontSize: '11pt', fontWeight: 700, letterSpacing: '0.4pt', mb: '2mm', borderBottom: '0.3mm solid #ccc', pb: '1mm' }}>
        Player {n} — machine level diamonds
      </Box>
      {MODULE_DIAMONDS.map((mod) => (
        <Box key={mod.key} sx={{ display: 'flex', alignItems: 'center', gap: '3mm', mb: '2.5mm' }}>
          <Box sx={{ width: '38mm', flexShrink: 0, fontSize: '7.4pt', fontWeight: 700, color: mod.ink }}>
            {mod.name}
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1.5mm' }}>
            {mod.levels.map((lv, i) => (
              <Diamond key={i} mod={mod} level={lv} />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

// One set per player, flowing down an A4-width column (paginates at print).
export function LevelDiamondSheets({ players }: { players: number }) {
  return (
    <Box className="token-flow">
      {Array.from({ length: players }, (_, i) => (
        <PlayerSet key={i} n={i + 1} />
      ))}
    </Box>
  );
}
