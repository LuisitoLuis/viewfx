# ViewFX

A small Astro site showcasing dark/light theme transition effects using the native View Transitions API.

This project includes:

- A responsive effect gallery with 21 theme toggle animations
- Accessible keyboard interaction and status announcements
- A code modal for viewing effect implementation details
- Light/dark mode support with persistent local storage

## 🧱 Tech stack

- Astro 6.4.4
- Tailwind CSS 4.3.0
- Native browser `document.startViewTransition()` transitions
- Vanilla TypeScript for UI interactivity

## 📁 Project structure

- `src/pages/index.astro` — main page layout
- `src/components/` — UI components like header, hero, grid, footer and modal
- `src/data/effects.ts` — effect metadata and preview classes
- `src/scripts/` — client-side theme and modal logic
- `src/styles/global.css` — global styling and theme variables
- `public/` — static assets

## 🚀 Development

From the project root:

```sh
npm install
npm run dev
```

or, if you prefer pnpm:

```sh
pnpm install
pnpm run dev
```

Then open the local server URL shown in the terminal.

## 🛠️ Build & preview

```sh
npm run build
npm run preview
```

## 📌 Notes

- The app uses `document.startViewTransition()` when available.
- Selected effect state is saved in `localStorage`.
- The demo is optimized for modern browsers with native view transitions support.

## 📚 Learn more

- Astro docs: https://docs.astro.build
- Tailwind CSS: https://tailwindcss.com
