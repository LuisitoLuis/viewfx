/**
 * Effect catalogue. `id` is the `data-fx` value on cards and the suffix of
 * the `vt-*` class on `<html>`. `className` is a string literal so Tailwind
 * can scan it; `css` is the snippet shown in the code dialog.
 */

export const TECHNIQUES = ['mask', 'clip-path', 'transform', 'opacity'] as const

export type Technique = (typeof TECHNIQUES)[number]

export interface Effect {
  id: string
  /** Tailwind utility applied to `<html>`. Keep as a string literal. */
  className: string
  name: string
  desc: string
  technique: Technique
  /** Length of the transition, used for the card metadata line. */
  durationMs: number
  css: string
}

export const DEFAULT_EFFECT_ID = 'circle'
export const DEFAULT_EFFECT_CLASS = 'vt-circle'

const usage = (className: string) => `<html class="${className}">`

export const EFFECTS: Effect[] = [
  {
    id: 'circle',
    className: 'vt-circle',
    name: 'Circle',
    desc: 'An SVG circle mask expanding from the centre of the viewport.',
    technique: 'mask',
    durationMs: 1000,
    css: usage('vt-circle')
  },
  {
    id: 'circle-blur',
    className: 'vt-circle-blur',
    name: 'Circle Blur',
    desc: 'The same circle, softened with an feGaussianBlur edge.',
    technique: 'mask',
    durationMs: 1000,
    css: usage('vt-circle-blur')
  },
  {
    id: 'polygon',
    className: 'vt-polygon',
    name: 'Diagonal Wipe',
    desc: 'A clip-path polygon sweeping corner to corner.',
    technique: 'clip-path',
    durationMs: 700,
    css: usage('vt-polygon')
  },
  {
    id: 'corner-tl',
    className: 'vt-corner-tl',
    name: 'Corner Top-Left',
    desc: 'A soft ripple growing out of the top-left corner.',
    technique: 'mask',
    durationMs: 1000,
    css: usage('vt-corner-tl')
  },
  {
    id: 'corner-tr',
    className: 'vt-corner-tr',
    name: 'Corner Top-Right',
    desc: 'The mirrored ripple, anchored to the top-right corner.',
    technique: 'mask',
    durationMs: 1000,
    css: usage('vt-corner-tr')
  },
  {
    id: 'iris',
    className: 'vt-iris',
    name: 'Star Iris',
    desc: 'A five-pointed star opening like a camera iris.',
    technique: 'mask',
    durationMs: 900,
    css: usage('vt-iris')
  },
  {
    id: 'diamond',
    className: 'vt-diamond',
    name: 'Diamond',
    desc: 'A rotated square mask scaling out from the centre.',
    technique: 'mask',
    durationMs: 900,
    css: usage('vt-diamond')
  },
  {
    id: 'hexagon',
    className: 'vt-hexagon',
    name: 'Hexagon',
    desc: 'A six-sided mask — subtler than the circle, still geometric.',
    technique: 'mask',
    durationMs: 1000,
    css: usage('vt-hexagon')
  },
  {
    id: 'heart',
    className: 'vt-heart',
    name: 'Heart',
    desc: 'A heart-shaped path mask. Use responsibly.',
    technique: 'mask',
    durationMs: 1000,
    css: usage('vt-heart')
  },
  {
    id: 'mosaic',
    className: 'vt-mosaic',
    name: 'Mosaic',
    desc: 'A checkerboard of tiles blooming into the new theme.',
    technique: 'mask',
    durationMs: 900,
    css: usage('vt-mosaic')
  },
  {
    id: 'ink',
    className: 'vt-ink',
    name: 'Ink Bleed',
    desc: 'feTurbulence warps the circle edge like ink on paper.',
    technique: 'mask',
    durationMs: 1200,
    css: usage('vt-ink')
  },
  {
    id: 'spiral',
    className: 'vt-spiral',
    name: 'Spiral',
    desc: 'A conic-gradient mask unwinding around the centre.',
    technique: 'mask',
    durationMs: 1200,
    css: usage('vt-spiral')
  },
  {
    id: 'wipe-h',
    className: 'vt-wipe-h',
    name: 'Wipe Right',
    desc: 'A hard inset edge travelling left to right.',
    technique: 'clip-path',
    durationMs: 600,
    css: usage('vt-wipe-h')
  },
  {
    id: 'wipe-v',
    className: 'vt-wipe-v',
    name: 'Wipe Down',
    desc: 'The same edge, falling from the top of the viewport.',
    technique: 'clip-path',
    durationMs: 600,
    css: usage('vt-wipe-v')
  },
  {
    id: 'slide-down',
    className: 'vt-slide-down',
    name: 'Wipe Up',
    desc: 'The edge rising from the bottom instead.',
    technique: 'clip-path',
    durationMs: 600,
    css: usage('vt-slide-down')
  },
  {
    id: 'venetian',
    className: 'vt-venetian',
    name: 'Venetian',
    desc: 'A slower vertical reveal, like opening a blind.',
    technique: 'clip-path',
    durationMs: 800,
    css: usage('vt-venetian')
  },
  {
    id: 'glitch',
    className: 'vt-glitch',
    name: 'Glitch',
    desc: 'Stepped clip offsets for a broken-signal feel.',
    technique: 'clip-path',
    durationMs: 600,
    css: usage('vt-glitch')
  },
  {
    id: 'slide',
    className: 'vt-slide',
    name: 'Slide Left',
    desc: 'The new theme pushes the old one off screen.',
    technique: 'transform',
    durationMs: 600,
    css: usage('vt-slide')
  },
  {
    id: 'zoom',
    className: 'vt-zoom',
    name: 'Zoom',
    desc: 'The old view scales away while the new one settles in.',
    technique: 'transform',
    durationMs: 700,
    css: usage('vt-zoom')
  },
  {
    id: 'rotate',
    className: 'vt-rotate',
    name: 'Rotate',
    desc: 'A few degrees of tilt on the way in and out.',
    technique: 'transform',
    durationMs: 700,
    css: usage('vt-rotate')
  },
  {
    id: 'fade',
    className: 'vt-fade',
    name: 'Cross-fade',
    desc: 'The safe default. Works everywhere, surprises nobody.',
    technique: 'opacity',
    durationMs: 500,
    css: usage('vt-fade')
  }
]
