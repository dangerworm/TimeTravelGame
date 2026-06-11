import { Box } from '@mui/material';
import type { Destination, ObjectiveMode } from '../types';
import { eraAccent, eraColor, eraLabel } from '../theme';
import { CardShell, Pill } from './parts';

const TIER_LABEL = ['', 'Known', 'Debated', 'Lost', 'Unknown'];
const MODE_LABEL: Record<ObjectiveMode, string> = {
  'record-only': 'Record only',
  'plunder-or-record': 'Record or Plunder',
  'doomed-grab': 'Doomed — grab clean',
  triumph: 'Triumph — the door',
};

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ fontSize: '5.6pt', textTransform: 'uppercase', letterSpacing: '0.3pt', color: '#888' }}>
        {label}
      </Box>
      <Box sx={{ fontSize: '13pt', fontWeight: 700, lineHeight: 1 }}>{value}</Box>
      {sub && <Box sx={{ fontSize: '5.4pt', color: '#999' }}>{sub}</Box>}
    </Box>
  );
}

export function DestinationBack({ card }: { card: Destination }) {
  const accent = eraAccent[card.era] ?? '#444';
  const band = eraColor[card.era] ?? '#eee';
  const o = card.objective;
  const isTriumph = o.mode === 'triumph';
  return (
    <CardShell accent={accent} bg={band}>
      <Box sx={{ px: '2mm', py: '1.2mm', textAlign: 'center' }}>
        <Pill color="#fff" bg={accent}>
          {eraLabel[card.era] ?? card.era} · the paper
        </Pill>
        <Box sx={{ fontSize: '10.5pt', fontWeight: 700, lineHeight: 1.1, mt: '1mm' }}>{card.name}</Box>
        <Box sx={{ fontSize: '5.8pt', fontStyle: 'italic', color: '#555' }}>{card.place}</Box>
      </Box>

      <Box
        sx={{
          mx: '2mm',
          p: '1.4mm',
          background: 'rgba(255,255,255,0.72)',
          borderRadius: '1mm',
          textAlign: 'center',
        }}
      >
        <Box sx={{ fontSize: '6.4pt', fontWeight: 700, color: accent }}>
          {MODE_LABEL[o.mode]}
        </Box>
        <Box sx={{ fontSize: '5.8pt', color: '#666' }}>
          Mystery tier {card.mysteryTier} · {TIER_LABEL[card.mysteryTier]}
        </Box>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          px: '2mm',
          py: '1.4mm',
        }}
      >
        <Stat label="Reputation" value={`${o.rep}`} sub="published" />
        {o.sellCash > 0 && <Stat label="Sell" value={`${o.sellCash}¢`} sub={`+${o.disrepute} disrep.`} />}
        {!isTriumph && (
          <Stat
            label="Plunder scar"
            value={o.doomed ? '0' : `−${o.scar}`}
            sub={o.doomed ? 'doomed = clean' : 'integrity'}
          />
        )}
        {isTriumph && <Stat label="Fail" value={`−${card.failIntegrity ?? 2}`} sub="integrity" />}
      </Box>

      <Box
        sx={{
          px: '2mm',
          py: '1mm',
          background: 'rgba(255,255,255,0.55)',
          fontSize: '5.8pt',
          lineHeight: 1.25,
          color: '#333',
        }}
      >
        {o.mode === 'record-only' &&
          'Pure knowledge — nothing to take. Record → your Data zone; a Historian Publishes it later for the Reputation.'}
        {o.mode === 'plunder-or-record' &&
          'Record (clean, → Data) or Plunder (→ Artefacts, scars the timeline). Publish for Reputation, or Sell for Cash + disrepute.'}
        {o.mode === 'doomed-grab' &&
          'About to be lost — grabbing it is clean AND clever. → Artefacts, no scar. Publish for Reputation, or Sell for Cash, no disrepute.'}
        {o.mode === 'triumph' &&
          'Complete all five steps to open the multiverse and end the game in Triumph. Any failed step frays the timeline.'}
      </Box>
    </CardShell>
  );
}
