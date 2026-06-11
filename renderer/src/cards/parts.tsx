import { Box } from '@mui/material';
import type { ReactNode } from 'react';
import { skillColor } from '../theme';
import type { Skill } from '../types';

// Poker-ish card footprint. The solid border IS the cut line.
export const CARD_W = '62mm';
export const CARD_H = '90mm';

export function CardShell({
  accent,
  bg = '#fff',
  children,
}: {
  accent: string;
  bg?: string;
  children: ReactNode;
}) {
  return (
    <Box
      sx={{
        width: CARD_W,
        height: CARD_H,
        boxSizing: 'border-box',
        border: '0.25mm solid #2b2b2b',
        borderTop: `2.4mm solid ${accent}`,
        background: bg,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        color: '#1c1c1c',
      }}
    >
      {children}
    </Box>
  );
}

export function Pill({
  children,
  color,
  bg,
}: {
  children: ReactNode;
  color: string;
  bg: string;
}) {
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-block',
        px: '1.4mm',
        py: '0.3mm',
        borderRadius: '1mm',
        fontSize: '6.2pt',
        fontWeight: 700,
        letterSpacing: '0.2pt',
        textTransform: 'uppercase',
        color,
        background: bg,
        lineHeight: 1.25,
      }}
    >
      {children}
    </Box>
  );
}

// A coloured chip showing a skill requirement, e.g. "Grit 2".
export function SkillReq({ skill, req }: { skill: Skill; req: number }) {
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.8mm',
        px: '1.4mm',
        py: '0.4mm',
        borderRadius: '1mm',
        fontSize: '7pt',
        fontWeight: 700,
        color: '#fff',
        background: skillColor[skill],
      }}
    >
      {skill}
      <Box
        component="span"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '3.4mm',
          height: '3.4mm',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.85)',
          color: skillColor[skill],
          fontSize: '6.6pt',
        }}
      >
        {req}
      </Box>
    </Box>
  );
}

// A row of pips (filled dots) for a researcher skill line.
export function PipRow({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: '0.4mm' }}>
      <Box sx={{ fontSize: '6.8pt', fontWeight: 600, color: '#333' }}>{label}</Box>
      <Box sx={{ display: 'flex', gap: '0.7mm' }}>
        {Array.from({ length: Math.max(value, 0) }).map((_, i) => (
          <Box
            key={i}
            sx={{ width: '2mm', height: '2mm', borderRadius: '50%', background: color }}
          />
        ))}
        {value === 0 && <Box sx={{ fontSize: '6.2pt', color: '#999' }}>—</Box>}
      </Box>
    </Box>
  );
}

// Experience boxes: total boxes shown; the first `filled` are pre-filled (solid).
export function XpBoxes({ total, filled }: { total: number; filled: number }) {
  return (
    <Box sx={{ display: 'flex', gap: '0.7mm' }}>
      {Array.from({ length: total }).map((_, i) => (
        <Box
          key={i}
          sx={{
            width: '2.4mm',
            height: '2.4mm',
            border: '0.3mm solid #2f5d99',
            background: i < filled ? '#2f5d99' : 'transparent',
          }}
        />
      ))}
    </Box>
  );
}
