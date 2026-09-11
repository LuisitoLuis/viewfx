/**
 * Effect catalogue. `id` doubles as the `data-effect` value on `<html>` and as
 * the key used by `styles/transitions.css` and `styles/previews.css`, so it
 * must not change without updating both stylesheets.
 *
 * `css` is the self-contained snippet shown in the code dialog: it is meant to
 * be copied into any project, so it never references ViewFX internals.
 */

export const TECHNIQUES = ['mask', 'clip-path', 'transform', 'opacity'] as const

export type Technique = (typeof TECHNIQUES)[number]

export interface Effect {
  id: string
  name: string
  desc: string
  technique: Technique
  /** Length of the transition, used for the card metadata line. */
  durationMs: number
  css: string
}

export const DEFAULT_EFFECT_ID = 'circle'

export const EFFECTS: Effect[] = [
  {
    id: 'circle',
    name: 'Circle',
    desc: 'An SVG circle mask expanding from the centre of the viewport.',
    technique: 'mask',
    durationMs: 1000,
    css: `::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-old(root),
:root.dark::view-transition-old(root) {
  animation: none;
  z-index: -1;
}
::view-transition-new(root) {
  mask: url('data:image/svg+xml,\
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">\
<circle cx="20" cy="20" r="20" fill="white"/>\
</svg>') center / 0 no-repeat;
  animation: grow 1s both;
}
@keyframes grow {
  to { mask-size: 200vmax; }
}`
  },
  {
    id: 'circle-blur',
    name: 'Circle Blur',
    desc: 'The same circle, softened with an feGaussianBlur edge.',
    technique: 'mask',
    durationMs: 1000,
    css: `::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-old(root),
:root.dark::view-transition-old(root) {
  animation: none;
  z-index: -1;
}
::view-transition-new(root) {
  mask: url('data:image/svg+xml,\
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">\
<defs><filter id="b"><feGaussianBlur stdDeviation="2"/></filter></defs>\
<circle cx="20" cy="20" r="18" fill="white" filter="url(%23b)"/>\
</svg>') center / 0 no-repeat;
  animation: grow 1s both;
}
@keyframes grow {
  to { mask-size: 200vmax; }
}`
  },
  {
    id: 'polygon',
    name: 'Diagonal Wipe',
    desc: 'A clip-path polygon sweeping corner to corner.',
    technique: 'clip-path',
    durationMs: 700,
    css: `::view-transition-group(root) {
  animation-duration: 0.7s;
  animation-timing-function: var(--expo-out);
}
::view-transition-old(root),
:root.dark::view-transition-old(root) {
  animation: none;
  z-index: -1;
}
::view-transition-new(root) {
  animation: reveal-light 0.7s both;
}
:root.dark::view-transition-new(root) {
  animation: reveal-dark 0.7s both;
}
@keyframes reveal-light {
  from { clip-path: polygon(171% 50%, 50% 171%, 50% 171%, 171% 50%); }
  to   { clip-path: polygon(171% 50%, 50% 171%, -50% 71%, 50% -71%); }
}
@keyframes reveal-dark {
  from { clip-path: polygon(50% -71%, -50% 71%, -50% 71%, 50% -71%); }
  to   { clip-path: polygon(50% -71%, -50% 71%, 50% 171%, 171% 50%); }
}`
  },
  {
    id: 'corner-tl',
    name: 'Corner Top-Left',
    desc: 'A soft ripple growing out of the top-left corner.',
    technique: 'mask',
    durationMs: 1000,
    css: `::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-old(root),
:root.dark::view-transition-old(root) {
  animation: none;
  z-index: -1;
}
::view-transition-new(root) {
  mask: url('data:image/svg+xml,\
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">\
<defs><filter id="b"><feGaussianBlur stdDeviation="2"/></filter></defs>\
<circle cx="0" cy="0" r="18" fill="white" filter="url(%23b)"/>\
</svg>') top left / 0 no-repeat;
  mask-origin: content-box;
  animation: grow 1s both;
}
@keyframes grow {
  to { mask-size: 350vmax; }
}`
  },
  {
    id: 'corner-tr',
    name: 'Corner Top-Right',
    desc: 'The mirrored ripple, anchored to the top-right corner.',
    technique: 'mask',
    durationMs: 1000,
    css: `::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-old(root),
:root.dark::view-transition-old(root) {
  animation: none;
  z-index: -1;
}
::view-transition-new(root) {
  mask: url('data:image/svg+xml,\
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">\
<defs><filter id="b"><feGaussianBlur stdDeviation="1.5"/></filter></defs>\
<circle cx="40" cy="0" r="18" fill="white" filter="url(%23b)"/>\
</svg>') top right / 0 no-repeat;
  mask-origin: content-box;
  animation: grow 1s both;
}
@keyframes grow {
  to { mask-size: 350vmax; }
}`
  },
  {
    id: 'iris',
    name: 'Star Iris',
    desc: 'A five-pointed star opening like a camera iris.',
    technique: 'mask',
    durationMs: 900,
    css: `::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-old(root),
:root.dark::view-transition-old(root) {
  animation: none;
  z-index: -1;
}
::view-transition-new(root) {
  mask: url('data:image/svg+xml,\
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">\
<polygon fill="white" \
points="50,0 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35"/>\
</svg>') center / 0 no-repeat;
  animation: grow 0.9s both;
}
@keyframes grow {
  to { mask-size: 300vmax; }
}`
  },
  {
    id: 'diamond',
    name: 'Diamond',
    desc: 'A rotated square mask scaling out from the centre.',
    technique: 'mask',
    durationMs: 900,
    css: `::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-old(root),
:root.dark::view-transition-old(root) {
  animation: none;
  z-index: -1;
}
::view-transition-new(root) {
  mask: url('data:image/svg+xml,\
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">\
<polygon points="20,0 40,20 20,40 0,20" fill="white"/>\
</svg>') center / 0 no-repeat;
  animation: grow 0.9s both;
}
@keyframes grow {
  to { mask-size: 280vmax; }
}`
  },
  {
    id: 'hexagon',
    name: 'Hexagon',
    desc: 'A six-sided mask — subtler than the circle, still geometric.',
    technique: 'mask',
    durationMs: 1000,
    css: `::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-old(root),
:root.dark::view-transition-old(root) {
  animation: none;
  z-index: -1;
}
::view-transition-new(root) {
  mask: url('data:image/svg+xml,\
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">\
<polygon fill="white" \
points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"/>\
</svg>') center / 0 no-repeat;
  animation: grow 1s both;
}
@keyframes grow {
  to { mask-size: 300vmax; }
}`
  },
  {
    id: 'heart',
    name: 'Heart',
    desc: 'A heart-shaped path mask. Use responsibly.',
    technique: 'mask',
    durationMs: 1000,
    css: `::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-old(root),
:root.dark::view-transition-old(root) {
  animation: none;
  z-index: -1;
}
::view-transition-new(root) {
  mask: url('data:image/svg+xml,\
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">\
<path fill="white" d="M50 88C25 65 5 50 5 30 5 15 15 5 30 5c10 0 18 7 20 13\
 2-6 10-13 20-13 15 0 25 10 25 25 0 20-20 35-45 58Z"/>\
</svg>') center / 0 no-repeat;
  animation: grow 1s both;
}
@keyframes grow {
  to { mask-size: 280vmax; }
}`
  },
  {
    id: 'mosaic',
    name: 'Mosaic',
    desc: 'A checkerboard of tiles blooming into the new theme.',
    technique: 'mask',
    durationMs: 900,
    css: `::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-old(root),
:root.dark::view-transition-old(root) {
  animation: none;
  z-index: -1;
}
::view-transition-new(root) {
  /* eight 25×25 tiles in a 100×100 viewBox */
  mask: url('data:image/svg+xml,\
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">\
<rect x="0" y="0" width="25" height="25" fill="white"/>\
<rect x="50" y="0" width="25" height="25" fill="white"/>\
<rect x="25" y="25" width="25" height="25" fill="white"/>\
<rect x="75" y="25" width="25" height="25" fill="white"/>\
<rect x="0" y="50" width="25" height="25" fill="white"/>\
<rect x="50" y="50" width="25" height="25" fill="white"/>\
<rect x="25" y="75" width="25" height="25" fill="white"/>\
<rect x="75" y="75" width="25" height="25" fill="white"/>\
</svg>') center / 0 no-repeat;
  animation: grow 0.9s both;
}
@keyframes grow {
  to { mask-size: 300vmax; }
}`
  },
  {
    id: 'ink',
    name: 'Ink Bleed',
    desc: 'feTurbulence warps the circle edge like ink on paper.',
    technique: 'mask',
    durationMs: 1200,
    css: `::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-old(root),
:root.dark::view-transition-old(root) {
  animation: none;
  z-index: -1;
}
::view-transition-new(root) {
  mask: url('data:image/svg+xml,\
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">\
<defs><filter id="t">\
<feTurbulence type="fractalNoise" baseFrequency="0.02" \
numOctaves="3" result="n"/>\
<feDisplacementMap in="SourceGraphic" in2="n" scale="15" \
xChannelSelector="R" yChannelSelector="G"/>\
</filter></defs>\
<circle cx="50" cy="50" r="50" fill="white" filter="url(%23t)"/>\
</svg>') center / 0 no-repeat;
  animation: grow 1.2s both;
}
@keyframes grow {
  to { mask-size: 250vmax; }
}`
  },
  {
    id: 'spiral',
    name: 'Spiral',
    desc: 'A conic-gradient mask unwinding around the centre.',
    technique: 'mask',
    durationMs: 1200,
    css: `::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-old(root),
:root.dark::view-transition-old(root) {
  animation: none;
  z-index: -1;
}
::view-transition-new(root) {
  mask: conic-gradient(from 0deg, white 0%, transparent 0%)
    center / 0 no-repeat;
  animation: spiral 1.2s both;
}
@keyframes spiral {
  to {
    mask-size: 250vmax;
    mask-image: conic-gradient(from 0deg, white 0%, white 100%);
  }
}`
  },
  {
    id: 'wipe-h',
    name: 'Wipe Right',
    desc: 'A hard inset edge travelling left to right.',
    technique: 'clip-path',
    durationMs: 600,
    css: `::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-new(root) { animation: wipe-in 0.6s both; }
::view-transition-old(root) { animation: wipe-out 0.6s both; }

@keyframes wipe-in {
  from { clip-path: inset(0 100% 0 0); }
  to   { clip-path: inset(0 0 0 0); }
}
@keyframes wipe-out {
  from { clip-path: inset(0 0 0 0); }
  to   { clip-path: inset(0 0 0 100%); }
}`
  },
  {
    id: 'wipe-v',
    name: 'Wipe Down',
    desc: 'The same edge, falling from the top of the viewport.',
    technique: 'clip-path',
    durationMs: 600,
    css: `::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-new(root) { animation: wipe-in 0.6s both; }
::view-transition-old(root) { animation: wipe-out 0.6s both; }

@keyframes wipe-in {
  from { clip-path: inset(100% 0 0 0); }
  to   { clip-path: inset(0 0 0 0); }
}
@keyframes wipe-out {
  from { clip-path: inset(0 0 0 0); }
  to   { clip-path: inset(0 0 100% 0); }
}`
  },
  {
    id: 'slide-down',
    name: 'Wipe Up',
    desc: 'The edge rising from the bottom instead.',
    technique: 'clip-path',
    durationMs: 600,
    css: `::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-new(root) { animation: wipe-in 0.6s both; }
::view-transition-old(root) { animation: wipe-out 0.6s both; }

@keyframes wipe-in {
  from { clip-path: inset(0 0 100% 0); }
  to   { clip-path: inset(0 0 0 0); }
}
@keyframes wipe-out {
  from { clip-path: inset(0 0 0 0); }
  to   { clip-path: inset(0 0 100% 0); }
}`
  },
  {
    id: 'venetian',
    name: 'Venetian',
    desc: 'A slower vertical reveal, like opening a blind.',
    technique: 'clip-path',
    durationMs: 800,
    css: `::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-new(root) { animation: venetian-in 0.8s both; }
::view-transition-old(root) { animation: venetian-out 0.8s both; }

@keyframes venetian-in {
  from { clip-path: inset(0 0 100% 0); }
  to   { clip-path: inset(0 0 0 0); }
}
@keyframes venetian-out {
  from { clip-path: inset(0 0 0 0); }
  to   { clip-path: inset(100% 0 0 0); }
}`
  },
  {
    id: 'glitch',
    name: 'Glitch',
    desc: 'Stepped clip offsets for a broken-signal feel.',
    technique: 'clip-path',
    durationMs: 600,
    css: `::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-new(root) { animation: glitch-in 0.6s both; }
::view-transition-old(root) { animation: glitch-out 0.6s both; }

@keyframes glitch-in {
  0%   { clip-path: inset(0 0 100% 0); opacity: 0; }
  20%  { clip-path: inset(40% 0 0 0);  opacity: 1; }
  40%  { clip-path: inset(0 0 60% 0); }
  60%  { clip-path: inset(20% 0 20% 0); }
  100% { clip-path: inset(0 0 0 0); }
}
@keyframes glitch-out {
  0%   { clip-path: inset(0 0 0 0); opacity: 1; }
  20%  { clip-path: inset(0 0 40% 0); }
  40%  { clip-path: inset(60% 0 0 0); }
  60%  { clip-path: inset(20% 0 20% 0); opacity: 0.5; }
  100% { clip-path: inset(0 0 100% 0); opacity: 0; }
}`
  },
  {
    id: 'slide',
    name: 'Slide Left',
    desc: 'The new theme pushes the old one off screen.',
    technique: 'transform',
    durationMs: 600,
    css: `::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-new(root) { animation: slide-in 0.6s both; }
::view-transition-old(root) { animation: slide-out 0.6s both; }

@keyframes slide-in {
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
}
@keyframes slide-out {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); opacity: 0.3; }
}`
  },
  {
    id: 'zoom',
    name: 'Zoom',
    desc: 'The old view scales away while the new one settles in.',
    technique: 'transform',
    durationMs: 700,
    css: `::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-new(root) { animation: zoom-in 0.7s both; }
::view-transition-old(root) { animation: zoom-out 0.7s both; }

@keyframes zoom-in {
  from { opacity: 0; transform: scale(0.85); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes zoom-out {
  from { opacity: 1; transform: scale(1); }
  to   { opacity: 0; transform: scale(1.15); }
}`
  },
  {
    id: 'rotate',
    name: 'Rotate',
    desc: 'A few degrees of tilt on the way in and out.',
    technique: 'transform',
    durationMs: 700,
    css: `::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-new(root) { animation: rotate-in 0.7s both; }
::view-transition-old(root) { animation: rotate-out 0.7s both; }

@keyframes rotate-in {
  from { opacity: 0; transform: rotate(-6deg) scale(0.9); }
  to   { opacity: 1; transform: rotate(0) scale(1); }
}
@keyframes rotate-out {
  from { opacity: 1; transform: rotate(0) scale(1); }
  to   { opacity: 0; transform: rotate(6deg) scale(0.9); }
}`
  },
  {
    id: 'fade',
    name: 'Cross-fade',
    desc: 'The safe default. Works everywhere, surprises nobody.',
    technique: 'opacity',
    durationMs: 500,
    css: `::view-transition-group(root) {
  animation-timing-function: ease-in-out;
}
::view-transition-new(root) { animation: fade-in 0.5s both; }
::view-transition-old(root) { animation: fade-out 0.5s both; }

@keyframes fade-in  { from { opacity: 0; } to { opacity: 1; } }
@keyframes fade-out { from { opacity: 1; } to { opacity: 0; } }`
  }
]
