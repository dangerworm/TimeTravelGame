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
import { PlayerBoard } from './cards/PlayerBoard';
import { TokenSheets, TOKEN_TOTAL } from './print/TokenSheet';
import { LevelDiamondSheets } from './print/LevelDiamonds';
import { SkillSheets, SKILL_TOTAL } from './print/SkillSheet';
import { DIAMONDS_PER_PLAYER } from './furniture';

const destinations = (destinationsJson as Deck<Destination>).cards;
const researchers = (researchersJson as Deck<Researcher>).cards;
const experts = (expertsJson as Deck<Researcher>).cards;
const partingGifts = (retirementJson as Deck<PartingGift>).cards;
const consequences = (consequencesJson as Deck<Consequence>).cards;

type DeckKey =
  | 'destinations'
  | 'researchers'
  | 'experts'
  | 'retirement'
  | 'consequences'
  | 'skills'
  | 'boards'
  | 'tokens'
  | 'levels';
type Face = 'fronts' | 'backs' | 'duplex';

const DECK_LABEL: Record<DeckKey, string> = {
  destinations: 'Destinations (era cards)',
  researchers: 'Researchers (juniors)',
  experts: 'Experts',
  retirement: 'Parting Gifts',
  consequences: 'Consequences',
  skills: 'Skill / Trace cards',
  boards: 'Player boards',
  tokens: 'Tokens (punch-out)',
  levels: 'Machine level diamonds',
};

// Player boards print landscape; everything else stays portrait. Selecting the boards view injects
// an @page landscape rule (see <OrientationStyle/>), since each print job is one view.
const MAX_PLAYERS = 6;

// Expand the consequence designs into physical cards per their `copies` count.
const consequenceCards: Consequence[] = consequences.flatMap((c) =>
  Array.from({ length: Math.max(1, c.copies ?? 1) }, () => c),
);

function deckCount(deck: DeckKey, players: number): number {
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
    case 'skills':
      return SKILL_TOTAL;
    case 'boards':
      return players;
    case 'tokens':
      return TOKEN_TOTAL;
    case 'levels':
      return players * DIAMONDS_PER_PLAYER;
  }
}

function renderSheets(deck: DeckKey, face: Face, players: number): ReactNode[] {
  if (deck === 'boards') {
    return Array.from({ length: players }, (_, i) => (
      <Box key={i} className="board-page">
        <PlayerBoard />
      </Box>
    ));
  }
  if (deck === 'tokens') return [<TokenSheets key="tokens" />];
  if (deck === 'levels') return [<LevelDiamondSheets key="levels" players={players} />];
  if (deck === 'skills') return [<SkillSheets key="skills" />];

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

// Injects a landscape @page rule while the boards view is active. Mounted after print.css, so it
// overrides the global portrait rule via cascade order.
function OrientationStyle({ landscape }: { landscape: boolean }) {
  if (!landscape) return null;
  return <style>{`@page { size: A4 landscape; margin: 7mm; }`}</style>;
}

// Initial view from URL params (?view=&face=&players=) so each sheet is directly addressable —
// used by scripts/export-pdfs.mjs to print every view headlessly. Falls back to sane defaults.
function urlDefaults(): { deck: DeckKey; face: Face; players: number } {
  const p = new URLSearchParams(window.location.search);
  const view = p.get('view') as DeckKey | null;
  const deck = view && view in DECK_LABEL ? view : 'destinations';
  const faceParam = p.get('face') as Face | null;
  const face: Face = faceParam === 'fronts' || faceParam === 'backs' ? faceParam : 'duplex';
  const players = Math.min(MAX_PLAYERS, Math.max(2, Number(p.get('players')) || 4));
  return { deck, face, players };
}

export default function App() {
  const initial = urlDefaults();
  const [deck, setDeck] = useState<DeckKey>(initial.deck);
  const [face, setFace] = useState<Face>(initial.face);
  const [players, setPlayers] = useState(initial.players);

  const sheets = useMemo(() => renderSheets(deck, face, players), [deck, face, players]);
  const isDest = deck === 'destinations';
  const isBoards = deck === 'boards';
  const isTokens = deck === 'tokens';
  const isLevels = deck === 'levels';
  const isSkills = deck === 'skills';
  const usesPlayers = isBoards || isLevels;

  return (
    <Box>
      <OrientationStyle landscape={isBoards} />
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

          {usesPlayers && (
            <ToggleButtonGroup
              size="small"
              exclusive
              value={players}
              onChange={(_, v) => v && setPlayers(v as number)}
            >
              {Array.from({ length: MAX_PLAYERS - 1 }, (_, i) => i + 2).map((n) => (
                <ToggleButton key={n} value={n}>
                  {n}p
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          )}

          <Chip
            label={
              isBoards
                ? `${deckCount(deck, players)} board(s) · landscape A4`
                : isLevels
                  ? `${players} player set(s) · ${deckCount(deck, players)} diamonds`
                  : isTokens
                    ? `${deckCount(deck, players)} tokens · print on card`
                    : isSkills
                      ? `${deckCount(deck, players)} mini cards · print on card`
                      : `${deckCount(deck, players)} cards · ${sheets.length} A4 page(s)`
            }
          />

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
        {isBoards && (
          <Box sx={{ px: 2, pb: 1, fontSize: 13, color: 'text.secondary' }}>
            Boards print <b>landscape</b> (one per page) — set your print dialog to <b>Landscape</b> and
            “Fit to page”. Print onto card or mount on board. Era cards brought back split into{' '}
            <b>Artefacts</b> (sell or paper) and <b>Data</b> (paper only). Stack the matching{' '}
            <b>level diamonds</b> on each machine quadrant as it upgrades.
          </Box>
        )}
        {isTokens && (
          <Box sx={{ px: 2, pb: 1, fontSize: 13, color: 'text.secondary' }}>
            Punch-out tokens — print on card, cut on the borders. Counts are generous for up to{' '}
            {MAX_PLAYERS} players; tune supply in <code>src/furniture.ts</code>.
          </Box>
        )}
        {isLevels && (
          <Box sx={{ px: 2, pb: 1, fontSize: 13, color: 'text.secondary' }}>
            One set per player — the colour-matched diamonds you stack on each machine quadrant as it
            upgrades (Amplifier shows the era, Stabiliser the instability cap). Sized to overlay the
            board quadrants.
          </Box>
        )}
        {isSkills && (
          <Box sx={{ px: 2, pb: 1, fontSize: 13, color: 'text.secondary' }}>
            The deck-builder currency (GDD §6) — a <b>shared bank</b> of mini cards (44×67mm). Each
            player draws their one-shot expedition deck from these: the permanent <b>2/2/2 base</b> +
            one card per <b>roster pip</b> + one <b>Trace</b> per instability token, returned after
            each jump. Print on card and cut; counts are generous for 2–4 players (tune in{' '}
            <code>src/furniture.ts</code>).
          </Box>
        )}
      </AppBar>

      <Box className="sheets-scroll">{sheets}</Box>
    </Box>
  );
}
