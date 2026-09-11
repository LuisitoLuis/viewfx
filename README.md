# ViewFX

A specimen catalogue of 21 dark/light theme transitions built on the native
View Transitions API. Preview an effect on a card, apply it to the page, then
copy the CSS.

No runtime dependencies and no framework: every effect is CSS, and the only
JavaScript involved is one call to `document.startViewTransition()`.

## Tech stack

- Astro 7 (static output, self-hosted fonts via the Fonts API)
- Tailwind CSS 4 (design tokens declared with `@theme inline`)
- Native `document.startViewTransition()`
- Vanilla TypeScript for theme, gallery and dialog behaviour

## Project structure

```
src/
├─ consts.ts              Site metadata — change `url` when deploying
├─ data/
│  ├─ effects.ts          Effect catalogue and copyable CSS snippets
│  └─ masks.ts            Shared SVG mask shapes, emitted as --mask-* tokens
├─ lib/highlight.ts       Build-time syntax highlighter
├─ layouts/BaseLayout.astro
├─ components/            Header, hero, gallery, card, code dialog, footer
├─ pages/
│  ├─ index.astro
│  └─ 404.astro
public/
├─ favicon.svg            Brand mark (tab icon)
└─ logo.svg               Same mark (header / footer)
├─ scripts/               theme, gallery, dialog, clipboard, live-region
└─ styles/
   ├─ global.css          Tokens, base, components, utilities
   ├─ transitions.css     The 21 view transition effects
   └─ previews.css        Card preview animations
```

### How an effect is defined

Each effect is a set of custom properties on `<html data-effect="…">`. The
view transition pseudo-elements are styled once, in `transitions.css`, and read
those properties — custom properties inherit into the pseudo tree, so adding an
effect means adding tokens rather than another block of pseudo-element rules:

```css
:root[data-effect='heart'] {
  --vt-mask: var(--mask-heart);
  --vt-mask-size: 280vmax;
  --vt-duration: 1s;
}
```

Mask shapes live in `data/masks.ts` as readable SVG and are emitted once as
base64 `--mask-*` custom properties, shared by the real transitions and the
card previews.

## Development

```sh
npm install
npm run dev
```

## Build and preview

```sh
npm run build
npm run preview
```

## Notes

- Theme and selected effect are restored before first paint, so neither flashes.
- Without `startViewTransition()` the theme still changes, just instantly.
- `prefers-reduced-motion: reduce` disables the transitions and the looping card
  previews.

## Learn more

- [Astro docs](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com)
- [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
