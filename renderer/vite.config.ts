import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Prototype card printer. `npm run dev` (or build) runs scripts/sync-content.mjs first,
// copying decks/*/cards.json into src/content so the cards bundle with the app.
export default defineConfig({
  plugins: [react()],
});
