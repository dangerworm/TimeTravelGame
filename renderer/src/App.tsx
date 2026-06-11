import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  AppBar,
  Box,
  Button,
  Chip,
  FormControl,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from '@mui/material';
import destinationsJson from './content/destinations.json';
import researchersJson from './content/researchers.json';
import expertsJson from './content/experts.json';
import retirementJson from './content/retirement.json';
import consequencesJson from './content/consequences.json';
import type { Consequence, Deck, Destination, PartingGift, Researcher } from './types';
import { chunk, PER_SHEET, Sheet } from './print/Sheet';
import { DestinationFront } from './cards/DestinationFront';
import { DestinationBack } from './cards/DestinationBack';
import { ResearcherCard } from './cards/ResearcherCard';
import { PartingGiftCard } from './cards/PartingGiftCard';
import { ConsequenceCard } from './cards/ConsequenceCard';

const destinations = (destinationsJson as Deck<Destination>).cards;
const researchers = (researchersJson as Deck<Researcher>).cards;
const experts = (expertsJson as Deck<Researcher>).cards;
const partingGifts = (retirementJson as Deck<PartingGift>).cards;
const consequences = (consequencesJson as Deck<Consequence>).cards;

type DeckKey = 'destinations' | 'researchers' | 'experts' | 'retirement' | 'consequences';
type Face = 'fronts' | 'backs' | 'duplex';

const DECK_LABEL: Record<DeckKey, string> = {
  destinations: 'Destinations (era cards)',
  researchers: 'Researchers (juniors)',
  experts: 'Experts',
  retirement: 'Parting Gifts',
  consequences: 'Consequences',
};

// Expand the consequence designs into physical cards per their `copies` count.
const consequenceCards: Consequence[] = consequences.flatMap((c) =>
  Array.from({ length: Math.max(1, c.copies ?? 1) }, () => c),
);

function deckCount(deck: DeckKey): number {
  switch (deck) {
    case 'destinations':
      return destinations.length;
    case 'researchers':
      return researchers.length;
    case 'experts':
      return experts.length;
    case 'retirement':
      return partingGifts.length;
    case 'consequences':
      return consequenceCards.length;
  }
}

function renderSheets(deck: DeckKey, face: Face): ReactNode[] {
  if (deck === 'destinations') {
    const groups = chunk(destinations, PER_SHEET);
    if (face === 'fronts')
      return groups.map((g, i) => (
        <Sheet key={`f${i}`} cards={g.map((c) => <DestinationFront key={c.id} card={c} />)} />
      ));
    if (face === 'backs')
      return groups.map((g, i) => (
        <Sheet key={`b${i}`} mirror cards={g.map((c) => <DestinationBack key={c.id} card={c} />)} />
      ));
    // duplex: front page then matching mirrored back page, repeated
    return groups.flatMap((g, i) => [
      <Sheet key={`f${i}`} cards={g.map((c) => <DestinationFront key={c.id} card={c} />)} />,
      <Sheet key={`b${i}`} mirror cards={g.map((c) => <DestinationBack key={c.id} card={c} />)} />,
    ]);
  }

  let cards: ReactNode[] = [];
  if (deck === 'researchers') cards = researchers.map((c) => <ResearcherCard key={c.id} card={c} />);
  if (deck === 'experts') cards = experts.map((c) => <ResearcherCard key={c.id} card={c} />);
  if (deck === 'retirement') cards = partingGifts.map((c) => <PartingGiftCard key={c.id} card={c} />);
  if (deck === 'consequences')
    cards = consequenceCards.map((c, i) => <ConsequenceCard key={`${c.id}-${i}`} card={c} />);

  return chunk(cards, PER_SHEET).map((g, i) => <Sheet key={i} cards={g} />);
}

export default function App() {
  const [deck, setDeck] = useState<DeckKey>('destinations');
  const [face, setFace] = useState<Face>('duplex');

  const sheets = useMemo(() => renderSheets(deck, face), [deck, face]);
  const isDest = deck === 'destinations';

  return (
    <Box>
      <AppBar position="sticky" color="default" className="no-print" elevation={2}>
        <Toolbar sx={{ gap: 2, flexWrap: 'wrap' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mr: 1 }}>
            Warped · card printer
          </Typography>

          <FormControl size="small" sx={{ minWidth: 240 }}>
            <Select value={deck} onChange={(e) => setDeck(e.target.value as DeckKey)}>
              {(Object.keys(DECK_LABEL) as DeckKey[]).map((k) => (
                <MenuItem key={k} value={k}>
                  {DECK_LABEL[k]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {isDest && (
            <ToggleButtonGroup
              size="small"
              exclusive
              value={face}
              onChange={(_, v) => v && setFace(v as Face)}
            >
              <ToggleButton value="duplex">Duplex (front + back)</ToggleButton>
              <ToggleButton value="fronts">Fronts only</ToggleButton>
              <ToggleButton value="backs">Backs only</ToggleButton>
            </ToggleButtonGroup>
          )}

          <Chip label={`${deckCount(deck)} cards · ${sheets.length} A4 page(s)`} />

          <Box sx={{ flexGrow: 1 }} />
          <Button variant="contained" onClick={() => window.print()}>
            Print / Save as PDF
          </Button>
        </Toolbar>
        {isDest && face === 'duplex' && (
          <Box sx={{ px: 2, pb: 1, fontSize: 13, color: 'text.secondary' }}>
            Duplex tip: print double-sided, <b>flip on long edge</b>. Pages alternate front, back, front,
            back — the backs are pre-mirrored so they line up. If alignment is off, switch your printer to
            short-edge binding or use “Backs only”.
          </Box>
        )}
      </AppBar>

      <Box className="sheets-scroll">{sheets}</Box>
    </Box>
  );
}
