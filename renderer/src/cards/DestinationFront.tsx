import { Box } from '@mui/material';
import type { Destination, Step } from '../types';
import { eraAccent, eraColor, eraLabel } from '../theme';
import { CardShell, Pill, SkillReq } from './parts';

function StepRow({ step, spoilCash }: { step: Step; spoilCash?: number }) {
  const tag =
    step.objective ? 'OBJECTIVE' : step.find ? 'FIND' : step.type === 'danger' ? 'Danger' : 'Gate';
  const tagColor = step.objective ? '#a52828' : step.find ? '#b8860b' : '#555';
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.4mm',
        py: '0.7mm',
        borderTop: '0.2mm solid #e2ddd0',
      }}
    >
      <Box
        sx={{
          width: '4mm',
          height: '4mm',
          flexShrink: 0,
          borderRadius: '50%',
          border: '0.3mm solid #888',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '6.6pt',
          fontWeight: 700,
        }}
      >
        {step.n}
      </Box>
      <SkillReq skill={step.skill} req={step.req} />
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4mm' }}>
        <Box sx={{ fontSize: '5.8pt', fontWeight: 700, color: tagColor, textTransform: 'uppercase' }}>
          {tag}
        </Box>
        <Box sx={{ display: 'flex', gap: '0.8mm' }}>
          {step.lock && (
            <Box sx={{ fontSize: '5.6pt', color: '#6a4caf', fontWeight: 600 }}>🔒{step.lock}</Box>
          )}
          {spoilCash != null && (
            <Box sx={{ fontSize: '5.6pt', color: '#b8860b', fontWeight: 700 }}>+{spoilCash}¢ spoil</Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export function DestinationFront({ card }: { card: Destination }) {
  const accent = eraAccent[card.era] ?? '#444';
  const band = eraColor[card.era] ?? '#eee';
  return (
    <CardShell accent={accent}>
      <Box sx={{ background: band, px: '2mm', py: '1.2mm' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Pill color="#fff" bg={accent}>
            {eraLabel[card.era] ?? card.era}
          </Pill>
          <Box sx={{ fontSize: '5.8pt', fontStyle: 'italic', color: '#444' }}>{card.place}</Box>
        </Box>
        <Box sx={{ fontSize: '11pt', fontWeight: 700, lineHeight: 1.1, mt: '0.8mm' }}>{card.name}</Box>
      </Box>

      <Box sx={{ px: '2mm', pt: '1.2mm' }}>
        <Box
          sx={{
            fontSize: '6.4pt',
            fontStyle: 'italic',
            color: '#3a3a3a',
            lineHeight: 1.25,
            // Clamp flavour so it can never push the step ladder (the game info) off a dense card.
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {card.fiction}
        </Box>
      </Box>

      <Box sx={{ px: '2mm', mt: '0.8mm', flexGrow: 1 }}>
        <Box sx={{ fontSize: '5.6pt', fontWeight: 700, letterSpacing: '0.4pt', color: '#999' }}>
          THE EXPEDITION →
        </Box>
        {card.steps.map((s) => (
          <StepRow
            key={s.n}
            step={s}
            spoilCash={card.earlySpoil && card.earlySpoil.step === s.n ? card.earlySpoil.cash : undefined}
          />
        ))}
      </Box>

      <Box
        sx={{
          px: '2mm',
          py: '1mm',
          borderTop: '0.3mm solid #ddd',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '6pt',
        }}
      >
        {card.find ? (
          <Box>
            <b>Find</b> (step {card.findStep}): Sell → <b>{card.find.cash}¢</b> · Publish →{' '}
            <b>{card.find.publishRep} rep</b>
          </Box>
        ) : (
          <Box sx={{ fontStyle: 'italic', color: '#a52828' }}>The door is the only prize.</Box>
        )}
        <Box sx={{ color: '#888' }}>{card.id}</Box>
      </Box>
    </CardShell>
  );
}
