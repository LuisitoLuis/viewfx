/**
 * Effect catalogue. `id` is the `data-fx` value on cards and the suffix of
 * the class on `<html>`. `className` is a string literal so Tailwind
 * can scan it; `css` is the snippet shown in the code dialog.
 */

export const TECHNIQUES = ['mask', 'clip-path', 'transform', 'opacity']

export const DEFAULT_EFFECT_ID = 'polygon'
export const DEFAULT_EFFECT_CLASS = 'polygon'

const usage = (className) => `<html class="${className}">`

export const EFFECTS = [
  {
    id: 'circle',
    className: 'circle',
    name: 'Circle',
    desc: 'An SVG circle mask expanding from the centre of the viewport.',
    technique: 'mask',
    durationMs: 1000,
    css: usage('circle')
  },
  {
    id: 'circle-blur',
    className: 'circle-blur',
    name: 'Circle Blur',
    desc: 'The same circle, softened with an feGaussianBlur edge.',
    technique: 'mask',
    durationMs: 1000,
    css: usage('circle-blur')
  },
  {
    id: 'polygon',
    className: 'polygon',
    name: 'Diagonal Wipe',
    desc: 'A clip-path polygon sweeping corner to corner.',
    technique: 'clip-path',
    durationMs: 700,
    css: usage('polygon')
  },
  {
    id: 'corner-tl',
    className: 'corner-tl',
    name: 'Corner Top-Left',
    desc: 'A soft ripple growing out of the top-left corner.',
    technique: 'mask',
    durationMs: 1000,
    css: usage('corner-tl')
  },
  {
    id: 'corner-tr',
    className: 'corner-tr',
    name: 'Corner Top-Right',
    desc: 'The mirrored ripple, anchored to the top-right corner.',
    technique: 'mask',
    durationMs: 1000,
    css: usage('corner-tr')
  },
  {
    id: 'iris',
    className: 'iris',
    name: 'Star Iris',
    desc: 'A five-pointed star opening like a camera iris.',
    technique: 'mask',
    durationMs: 900,
    css: usage('iris')
  },
  {
    id: 'diamond',
    className: 'diamond',
    name: 'Diamond',
    desc: 'A rotated square mask scaling out from the centre.',
    technique: 'mask',
    durationMs: 900,
    css: usage('diamond')
  },
  {
    id: 'hexagon',
    className: 'hexagon',
    name: 'Hexagon',
    desc: 'A six-sided mask — subtler than the circle, still geometric.',
    technique: 'mask',
    durationMs: 1000,
    css: usage('hexagon')
  },
  {
    id: 'heart',
    className: 'heart',
    name: 'Heart',
    desc: 'A heart-shaped path mask. Use responsibly.',
    technique: 'mask',
    durationMs: 1000,
    css: usage('heart')
  },
  {
    id: 'mosaic',
    className: 'mosaic',
    name: 'Mosaic',
    desc: 'A checkerboard of tiles blooming into the new theme.',
    technique: 'mask',
    durationMs: 900,
    css: usage('mosaic')
  },
  {
    id: 'ink',
    className: 'ink',
    name: 'Ink Bleed',
    desc: 'feTurbulence warps the circle edge like ink on paper.',
    technique: 'mask',
    durationMs: 1200,
    css: usage('ink')
  },
  {
    id: 'spiral',
    className: 'spiral',
    name: 'Spiral',
    desc: 'A conic-gradient mask unwinding around the centre.',
    technique: 'mask',
    durationMs: 1200,
    css: usage('spiral')
  },
  {
    id: 'wipe-h',
    className: 'wipe-h',
    name: 'Wipe Right',
    desc: 'A hard inset edge travelling left to right.',
    technique: 'clip-path',
    durationMs: 600,
    css: usage('wipe-h')
  },
  {
    id: 'wipe-v',
    className: 'wipe-v',
    name: 'Wipe Down',
    desc: 'The same edge, falling from the top of the viewport.',
    technique: 'clip-path',
    durationMs: 600,
    css: usage('wipe-v')
  },
  {
    id: 'slide-down',
    className: 'slide-down',
    name: 'Wipe Up',
    desc: 'The edge rising from the bottom instead.',
    technique: 'clip-path',
    durationMs: 600,
    css: usage('slide-down')
  },
  {
    id: 'venetian',
    className: 'venetian',
    name: 'Venetian',
    desc: 'A slower vertical reveal, like opening a blind.',
    technique: 'clip-path',
    durationMs: 800,
    css: usage('venetian')
  },
  {
    id: 'glitch',
    className: 'glitch',
    name: 'Glitch',
    desc: 'Stepped clip offsets for a broken-signal feel.',
    technique: 'clip-path',
    durationMs: 600,
    css: usage('glitch')
  },
  {
    id: 'slide',
    className: 'slide',
    name: 'Slide Left',
    desc: 'The new theme pushes the old one off screen.',
    technique: 'transform',
    durationMs: 600,
    css: usage('slide')
  },
  {
    id: 'zoom',
    className: 'zoom',
    name: 'Zoom',
    desc: 'The old view scales away while the new one settles in.',
    technique: 'transform',
    durationMs: 700,
    css: usage('zoom')
  },
  {
    id: 'rotate',
    className: 'rotate',
    name: 'Rotate',
    desc: 'A few degrees of tilt on the way in and out.',
    technique: 'transform',
    durationMs: 700,
    css: usage('rotate')
  },
  {
    id: 'fade',
    className: 'fade',
    name: 'Cross-fade',
    desc: 'The safe default. Works everywhere, surprises nobody.',
    technique: 'opacity',
    durationMs: 500,
    css: usage('fade')
  }
]
