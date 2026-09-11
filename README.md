# ViewFX

A catalogue of **21 dark/light theme transitions** built with the native [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API). Hover a card to preview, click to apply it to the page, then copy the CSS.

The effects themselves have no runtime dependencies. Each one is CSS. The JavaScript is a single `document.startViewTransition()` call around your existing theme toggle.

## Use an effect

1. Copy the CSS from a card on the site.
2. Wrap your theme change:

```js
const switchTheme = () =>
  document.documentElement.classList.toggle('dark')

document.startViewTransition
  ? document.startViewTransition(switchTheme)
  : switchTheme()
```

3. Honour reduced motion so the theme still changes, just without the wipe:

```css
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(root),
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none !important;
  }
}
```

Browsers without the API skip the animation and toggle instantly.

## Run locally

Requires Node `>=22.12`.

```sh
pnpm install
pnpm dev
```

Then open the URL printed in the terminal.

```sh
pnpm build    # static output in dist/
pnpm preview  # serve the production build
```

## Add an effect

An effect is a set of custom properties on `<html data-effect="…">`. The view-transition pseudo-elements are styled once in `src/styles/transitions.css` and inherit those tokens.

| Step | File | What to add |
|------|------|-------------|
| 1 | `src/data/effects.ts` | `id`, name, description, technique, duration, copyable CSS |
| 2 | `src/styles/transitions.css` | `--vt-*` tokens for that `data-effect` |
| 3 | `src/data/masks.ts` | SVG shape, only if the effect uses a mask |
| 4 | `src/styles/previews.css` | `--preview-*` tokens so the card preview matches |

Example token block:

```css
:root[data-effect='heart'] {
  --vt-mask: var(--mask-heart);
  --vt-mask-size: 280vmax;
  --vt-duration: 1s;
}
```

Mask shapes are declared as readable SVG in `masks.ts` and emitted once as base64 `--mask-*` properties. The live transitions and the card previews share them.

## Layout of the repo

| Path | Role |
|------|------|
| `src/data/effects.ts` | Catalogue and the CSS snippets visitors copy |
| `src/data/masks.ts` | Shared mask shapes |
| `src/styles/transitions.css` | The 21 view transitions |
| `src/styles/previews.css` | Looping animations on the cards |
| `src/styles/global.css` | Tokens, base, components |
| `src/scripts/` | Theme, gallery, dialog, clipboard |
| `src/consts.ts` | Site URL and metadata (update `url` when deploying) |
| `public/logo.svg` | Header / footer mark |
| `public/favicon.svg` | Same mark for the tab |
| `public/favicon.ico` | Fallback for browsers that still request `.ico` |

## Behaviour to know

- Theme and selected effect are restored from `localStorage` before first paint, so neither flashes.
- The OS color scheme is followed until the visitor toggles the theme themselves.
- `prefers-reduced-motion: reduce` turns off both the page transitions and the looping card previews.

## Stack

| | |
| --- | --- |
| [![Astro](https://img.shields.io/badge/Astro-fff?style=for-the-badge&logo=astro&logoColor=bd303a&color=352563)](https://astro.build/) | Web framework for content-oriented sites. |
| [![Tailwind CSS](https://img.shields.io/badge/Tailwind-ffffff?style=for-the-badge&logo=tailwindcss&logoColor=38bdf8)](https://tailwindcss.com/) | Utility-first CSS framework for custom UI. |
| [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) | Static typing for JavaScript. |

