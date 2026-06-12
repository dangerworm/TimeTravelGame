import { Box } from '@mui/material';
import type { ReactNode } from 'react';
import { MACHINE } from '../furniture';
import type { MachineModule } from '../furniture';

// A full-A4 (landscape) player board, reproducing the whiteboard draft in
// design/2026-06-09-post-whiteboarding-with-andy.png and adding the new Data zone. One per page.
// Printable area on landscape A4 with the 7mm @page margin is ~283×196mm.
const BOARD_W = '283mm';
const BOARD_H = '196mm';

// A labelled zone box. `fill` tints the interior; `tall` lets it grow.
function Zone({
  label,
  hint,
  fill = '#f4f5f7',
  ink = '#555',
  children,
  sx,
}: {
  label: string;
  hint?: string;
  fill?: string;
  ink?: string;
  children?: ReactNode;
  sx?: object;
}) {
  return (
    <Box
      sx={{
        position: 'relative',
        border: '0.4mm dashed #9aa0a8',
        borderRadius: '2mm',
        background: fill,
        p: '2mm',
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '2mm' }}>
        <Box sx={{ fontSize: '9pt', fontWeight: 700, letterSpacing: '0.4pt', color: ink, textTransform: 'uppercase' }}>
          {label}
        </Box>
        {hint && <Box sx={{ fontSize: '6.4pt', fontStyle: 'italic', color: '#8a8f97' }}>{hint}</Box>}
      </Box>
      {children}
    </Box>
  );
}

// A few sample token outlines, to show what lives in a pool zone (matching the draft's loose tokens).
function TokenSlots({ shape, color, n = 5 }: { shape: 'square' | 'diamond'; color: string; n?: number }) {
  return (
    <Box sx={{ display: 'flex', gap: '2mm', flexWrap: 'wrap', mt: '2mm' }}>
      {Array.from({ length: n }).map((_, i) => (
        <Box
          key={i}
          sx={{
            width: '8mm',
            height: '8mm',
            border: `0.4mm dashed ${color}`,
            borderRadius: shape === 'square' ? '1mm' : 0,
            transform: shape === 'diamond' ? 'rotate(45deg)' : 'none',
            opacity: 0.6,
          }}
        />
      ))}
    </Box>
  );
}

// One quadrant of the Time Machine diamond. The parent square is rotated 45°, so each quadrant's
// content is counter-rotated back to upright.
function Quadrant({ mod, corner }: { mod: MachineModule; corner: 'tl' | 'tr' | 'br' | 'bl' }) {
  // The visual diamond points (top/right/bottom/left) map to grid corners after a 45° rotation:
  // top→top-left cell, right→top-right, bottom→bottom-right, left→bottom-left.
  const radius = {
    tl: '14mm 0 0 0',
    tr: '0 14mm 0 0',
    br: '0 0 14mm 0',
    bl: '0 0 0 14mm',
  }[corner];
  return (
    <Box
      sx={{
        background: mod.fill,
        border: '0.4mm solid #fff',
        borderRadius: radius,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          transform: 'rotate(-45deg)',
          textAlign: 'center',
          color: mod.ink,
          px: '2mm',
          width: '34mm',
        }}
      >
        <Box sx={{ fontSize: '15pt', fontWeight: 800, lineHeight: 1 }}>{mod.start}</Box>
        <Box sx={{ fontSize: '7.2pt', fontWeight: 700, lineHeight: 1.05, mt: '0.6mm' }}>{mod.name}</Box>
        <Box sx={{ fontSize: '5.8pt', fontStyle: 'italic', lineHeight: 1.1, mt: '0.4mm' }}>{mod.does}</Box>
        <Box sx={{ fontSize: '5.6pt', fontWeight: 700, mt: '0.6mm' }}>{mod.costs}</Box>
        <Box sx={{ fontSize: '5pt', color: '#6a6a6a' }}>{mod.upgradedBy}</Box>
      </Box>
    </Box>
  );
}

function TimeMachine() {
  const D = '92mm'; // diagonal footprint of the upright diamond
  return (
    <Box sx={{ position: 'relative', width: '120mm', height: '120mm', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        sx={{
          width: D,
          height: D,
          transform: 'rotate(45deg)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: '0.8mm',
          borderRadius: '3mm',
          overflow: 'hidden',
          boxShadow: '0 0 0 0.5mm #cdd2d8',
        }}
      >
        <Quadrant mod={MACHINE.top} corner="tl" />
        <Quadrant mod={MACHINE.right} corner="tr" />
        <Quadrant mod={MACHINE.left} corner="bl" />
        <Quadrant mod={MACHINE.bottom} corner="br" />
      </Box>
      {/* Centre hub — not rotated. */}
      <Box
        sx={{
          position: 'absolute',
          width: '34mm',
          height: '34mm',
          borderRadius: '50%',
          background: '#fff',
          border: '0.5mm solid #b9bec5',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Box sx={{ fontSize: '9pt', fontWeight: 800, lineHeight: 1.05, color: '#2b2b2b' }}>Time
          <br />Machine</Box>
      </Box>
    </Box>
  );
}

export function PlayerBoard() {
  return (
    <Box
      className="board"
      sx={{
        width: BOARD_W,
        height: BOARD_H,
        boxSizing: 'border-box',
        background: '#e9eaec',
        border: '0.6mm solid #b9bec5',
        borderRadius: '4mm',
        p: '4mm',
        display: 'flex',
        flexDirection: 'column',
        color: '#1c1c1c',
        overflow: 'hidden',
      }}
    >
      {/* Title + setup reminder */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: '2.5mm' }}>
        <Box sx={{ fontSize: '13pt', fontWeight: 800, letterSpacing: '1pt' }}>WARPED — PLAYER BOARD</Box>
        <Box sx={{ fontSize: '6.8pt', fontStyle: 'italic', color: '#6a6a6a' }}>
          Setup: 3 Cash · base 2 Insight / 2 Craft / 2 Grit · Amplifier’s first upgrade is free
        </Box>
      </Box>

      {/* Body: left column of zones, right column the machine */}
      <Box sx={{ display: 'flex', gap: '4mm', flex: 1, minHeight: 0 }}>
        {/* LEFT */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '3mm', flex: 1, minWidth: 0 }}>
          <Zone label="Team" hint="researchers you own — the roster you send" fill="#ffffff" sx={{ flex: '0 0 28mm' }} />

          <Box sx={{ display: 'flex', gap: '3mm', flex: 1, minHeight: 0 }}>
            {/* Skills build strip (vertical) */}
            <Box
              sx={{
                flex: '0 0 16mm',
                border: '0.4mm dashed #9aa0a8',
                borderRadius: '2mm',
                background: '#efe7ea',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ transform: 'rotate(-90deg)', whiteSpace: 'nowrap', fontSize: '9pt', fontWeight: 700, letterSpacing: '2pt', color: '#7a6a72', textTransform: 'uppercase' }}>
                Skills
              </Box>
            </Box>

            {/* Zone stack */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '3mm', flex: 1, minWidth: 0 }}>
              <Zone label="Roster" hint="on this expedition" fill="#dff0e3" ink="#1f5a36" sx={{ flex: 1 }} />
              <Box sx={{ display: 'flex', gap: '3mm', flex: '0 0 26mm' }}>
                <Zone label="Reputation" fill="#fcf1cf" ink="#8a6400" sx={{ flex: 1 }}>
                  <TokenSlots shape="square" color="#c79b1e" />
                </Zone>
                <Zone label="Cash" fill="#e3edf9" ink="#2f5d99" sx={{ flex: 1 }}>
                  <TokenSlots shape="diamond" color="#5a86bf" />
                </Zone>
              </Box>
              {/* Era cards brought back split by kind: Artefacts (sell or paper) vs Data (a copy /
                  measurements — paper only). */}
              <Box sx={{ display: 'flex', gap: '3mm', flex: '0 0 24mm' }}>
                <Zone
                  label="Artefacts"
                  hint="things taken — sell or write a paper"
                  fill="#f3ecdc"
                  ink="#6a4d1a"
                  sx={{ flex: 1 }}
                />
                <Zone
                  label="Data"
                  hint="copies / measurements — paper only"
                  fill="#eef3ee"
                  ink="#3a5a3a"
                  sx={{ flex: 1 }}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* RIGHT: the machine */}
        <Box sx={{ flex: '0 0 122mm', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <TimeMachine />
          <Box sx={{ fontSize: '6.6pt', fontStyle: 'italic', color: '#6a6a6a', mt: '1mm', textAlign: 'center' }}>
            Instability accumulates on the machine — shutdown at the Stabiliser limit.
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
