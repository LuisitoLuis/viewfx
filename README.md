# ViewFX

A [Tailwind CSS](https://tailwindcss.com/) v3 and v4 plugin of **21 dark/light theme transitions** built with the native [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API).

Visit the [catalogue](https://viewfx.luismc.dev) to preview each effect.

## Installation

```sh
pnpm add viewfx
```

**Tailwind CSS v4** — CSS-first import:

```css
/* global.css */
@import 'tailwindcss';
@import 'viewfx';
```

**Tailwind CSS v3** — JavaScript plugin:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    require('viewfx')
  ]
}
```

## Usage

Put an effect class on `<html>`, then wrap your theme toggle:

```html
<html class="dark vt-circle">
```

```js
const switchTheme = () =>
  document.documentElement.classList.toggle('dark')

document.startViewTransition
  ? document.startViewTransition(switchTheme)
  : switchTheme()
```

`prefers-reduced-motion: reduce` is honoured by the plugin: the theme still changes, without the wipe. Browsers without the API skip the animation and toggle instantly.

### Effects

| Class | Technique |
| --- | --- |
| `vt-circle` | mask |
| `vt-circle-blur` | mask |
| `vt-corner-tl` | mask |
| `vt-corner-tr` | mask |
| `vt-iris` | mask |
| `vt-diamond` | mask |
| `vt-hexagon` | mask |
| `vt-heart` | mask |
| `vt-mosaic` | mask |
| `vt-ink` | mask |
| `vt-spiral` | mask |
| `vt-polygon` | clip-path |
| `vt-wipe-h` | clip-path |
| `vt-wipe-v` | clip-path |
| `vt-slide-down` | clip-path |
| `vt-venetian` | clip-path |
| `vt-glitch` | clip-path |
| `vt-slide` | transform |
| `vt-zoom` | transform |
| `vt-rotate` | transform |
| `vt-fade` | opacity |

Optional timing utilities on the same element: `vt-duration-1000`, `vt-delay-300`, `vt-steps-modern`.

Theme is expected as a `.dark` class on `<html>` (the `vt-polygon` wipe reverses in dark).

## Run the catalogue locally

Requires Node `>=22.12`.

```sh
pnpm install
pnpm dev
```

Then open the URL printed in the terminal.

```sh
pnpm build    # static output in web/dist/
pnpm preview  # serve the production build
```

## Add an effect

An effect is a `@utility vt-…` block that sets `--vt-*` tokens. The view-transition pseudo-elements are styled once in `src/index.css` and inherit those tokens.

| Step | File | What to add |
|------|------|-------------|
| 1 | `src/index.css` | `@utility vt-name { … }` plus keyframes if needed |
| 1b | `src/effects.cjs` / `src/engine.cjs` | Same tokens for the Tailwind v3 JS plugin |
| 2 | `src/masks.cjs` | SVG shape, only if the effect uses a mask, then `pnpm emit:masks` |
| 3 | `web/src/data/effects.js` | Catalogue entry with a **string-literal** `className` |
| 4 | `web/src/styles/previews.css` | `--preview-*` tokens so the card preview matches |

Mask shapes are declared as readable SVG in `src/masks.cjs` and emitted once as base64 `--mask-*` properties. The live transitions and the card previews share them.

## Layout of the repo

| Path | Role |
|------|------|
| `src/index.css` | Tailwind v4 CSS plugin (published) |
| `src/plugin.cjs` | Tailwind v3 JS plugin (`require('viewfx')`) |
| `src/masks.cjs` | Shared mask shapes |
| `src/masks.js` | ESM re-export for `emit:masks` |
| `src/masks.css` | Generated base64 mask tokens |
| `web/` | Catalogue site |
| `web/src/data/effects.js` | Catalogue and copyable snippets |
| `web/src/styles/previews.css` | Looping animations on the cards |
| `web/src/scripts/` | Theme, gallery, dialog, clipboard |
| `test/` | Plugin CSS tests (Vitest, same pattern as tailwind-animations) |

## Behaviour to know

- Theme and selected effect are restored from `localStorage` before first paint, so neither flashes.
- The OS color scheme is followed until the visitor toggles the theme themselves.
- `prefers-reduced-motion: reduce` turns off both the page transitions and the looping card previews.