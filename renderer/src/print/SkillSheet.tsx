import { Box } from '@mui/material';
import { SKILL_CARDS, SKILL_TOTAL } from '../furniture';
import { SkillCard } from '../cards/SkillCard';
import { chunk } from './Sheet';

// Mini skill/Trace cards tile 4×4 per A4 page. Each page carries the `.sheet` class so print.css
// gives it a page break. The bank is expanded from SKILL_CARDS by `count`, grouped so each design's
// copies stay contiguous (easier to count out and bag).
const COLS = 4;
const ROWS = 4;
const PER_SKILL_SHEET = COLS * ROWS;

const expanded = SKILL_CARDS.flatMap((spec) =>
  Array.from({ length: spec.count }, (_, i) => ({ spec, key: `${spec.id}-${i}` })),
);

export function SkillSheets() {
  const pages = chunk(expanded, PER_SKILL_SHEET);
  return (
    <>
      {pages.map((page, p) => (
        <Box
          key={p}
          className="sheet"
          sx={{
            width: '210mm',
            height: '297mm',
            boxSizing: 'border-box',
            p: '7mm',
            display: 'grid',
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            placeItems: 'center',
          }}
        >
          {page.map((c) => (
            <SkillCard key={c.key} spec={c.spec} />
          ))}
        </Box>
      ))}
    </>
  );
}

export { SKILL_TOTAL };
