export interface Effect {
  id: string
  name: string
  desc: string
  previewClass: string
  css: string
}

export const EFFECTS: Effect[] = [
  {
    id: 'circle',
    name: 'Circle',
    desc: 'SVG circle mask expanding from center.',
    previewClass: 'mini-anim-circle',
    css:
`::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-old(root),
.dark::view-transition-old(root) {
  animation: none;
  animation-fill-mode: both;
  z-index: -1;
}
::view-transition-new(root) {
  mask: url('data:image/svg+xml,
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="20" fill="white"/>
    </svg>') center / 0 no-repeat;
  animation: scale 1s;
  animation-fill-mode: both;
}
@keyframes scale {
  to { mask-size: 200vmax; }
}`
  },
  {
    id: 'circle-blur',
    name: 'Circle Blur',
    desc: 'Circle with soft feGaussianBlur edge.',
    previewClass: 'mini-anim-circle-blur',
    css:
`::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-new(root) {
  mask: url('data:image/svg+xml,
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <defs>
        <filter id="blur">
          <feGaussianBlur stdDeviation="2"/>
        </filter>
      </defs>
      <circle cx="20" cy="20" r="18" fill="white"
        filter="url(%23blur)"/>
    </svg>') center / 0 no-repeat;
  animation: scale 1s;
  animation-fill-mode: both;
}
::view-transition-old(root),
.dark::view-transition-old(root) {
  animation: none;
  animation-fill-mode: both;
  z-index: -1;
}
@keyframes scale {
  to { mask-size: 200vmax; }
}`
  },
  {
    id: 'corner-tl',
    name: 'Corner Top-Left',
    desc: 'Ripple expanding from the top-left corner.',
    previewClass: 'mini-anim-corner-tl',
    css:
`::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-new(root) {
  mask: url('data:image/svg+xml,
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <defs>
        <filter id="blur">
          <feGaussianBlur stdDeviation="2"/>
        </filter>
      </defs>
      <circle cx="0" cy="0" r="18" fill="white"
        filter="url(%23blur)"/>
    </svg>') top left / 0 no-repeat;
  mask-origin: content-box;
  animation: scale 1s;
  animation-fill-mode: both;
  transform-origin: top left;
}
::view-transition-old(root),
.dark::view-transition-old(root) {
  animation: scale 1s;
  animation-fill-mode: both;
  transform-origin: top left;
  z-index: -1;
}
@keyframes scale {
  to { mask-size: 350vmax; }
}`
  },
  {
    id: 'corner-tr',
    name: 'Corner Top-Right',
    desc: 'Ripple expanding from the top-right corner.',
    previewClass: 'mini-anim-corner-tr',
    css:
`::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-new(root) {
  mask: url('data:image/svg+xml,
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <defs>
        <filter id="blur">
          <feGaussianBlur stdDeviation="1.5"/>
        </filter>
      </defs>
      <circle cx="40" cy="0" r="18" fill="white"
        filter="url(%23blur)"/>
    </svg>') top right / 0 no-repeat;
  mask-origin: content-box;
  animation: scale 1s both;
  transform-origin: top right;
}
::view-transition-old(root),
.dark::view-transition-old(root) {
  z-index: -1; animation: none;
}
@keyframes scale {
  to { mask-size: 350vmax; }
}`
  },
  {
    id: 'polygon',
    name: 'Diagonal Wipe',
    desc: 'Clip-path polygon sweeping corner to corner.',
    previewClass: 'mini-anim-polygon',
    css:
`::view-transition-group(root) {
  animation-duration: 0.7s;
  animation-timing-function: var(--expo-out);
}
::view-transition-new(root) {
  animation-name: reveal-light;
  animation-fill-mode: both;
}
::view-transition-old(root),
.dark::view-transition-old(root) {
  animation: none;
  animation-fill-mode: both;
  z-index: -1;
}
.dark::view-transition-new(root) {
  animation-name: reveal-dark;
  animation-fill-mode: both;
}
@keyframes reveal-dark {
  from { clip-path: polygon(50% -71%, -50% 71%, -50% 71%, 50% -71%); }
  to   { clip-path: polygon(50% -71%, -50% 71%, 50% 171%, 171% 50%); }
}
@keyframes reveal-light {
  from { clip-path: polygon(171% 50%, 50% 171%, 50% 171%, 171% 50%); }
  to   { clip-path: polygon(171% 50%, 50% 171%, -50% 71%, 50% -71%); }
}`
  },
  {
    id: 'diamond',
    name: 'Diamond',
    desc: 'SVG diamond mask expanding from center.',
    previewClass: 'mini-anim-diamond',
    css:
`/* SVG: <polygon points="20,0 40,20 20,40 0,20" fill="white"/> */
::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-new(root) {
  mask: url('data:image/svg+xml,
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <polygon points="20,0 40,20 20,40 0,20" fill="white"/>
    </svg>') center / 0 no-repeat;
  animation: diamond 0.9s both;
}
::view-transition-old(root),
.dark::view-transition-old(root) {
  animation: none; z-index: -1;
}
@keyframes diamond {
  to { mask-size: 280vmax; }
}`
  },
  {
    id: 'hexagon',
    name: 'Hexagon',
    desc: 'Six-sided mask scaling from center.',
    previewClass: 'mini-anim-hexagon',
    css:
`/* SVG: <polygon points="50,0 93,25 93,75 50,100 7,75 7,25"/> */
::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-new(root) {
  mask: url('data:image/svg+xml,
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"
        fill="white"/>
    </svg>') center / 0 no-repeat;
  animation: hex 1s both;
}
::view-transition-old(root),
.dark::view-transition-old(root) {
  animation: none; z-index: -1;
}
@keyframes hex {
  to { mask-size: 300vmax; }
}`
  },
  {
    id: 'iris',
    name: 'Star Iris',
    desc: 'Five-pointed star — camera iris effect.',
    previewClass: 'mini-anim-iris',
    css:
`/* SVG: five-point star polygon */
::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-new(root) {
  mask: url('data:image/svg+xml,
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <polygon
        points="50,0 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35"
        fill="white"/>
    </svg>') center / 0 no-repeat;
  animation: iris 0.9s both;
}
::view-transition-old(root),
.dark::view-transition-old(root) {
  animation: none; z-index: -1;
}
@keyframes iris {
  to { mask-size: 300vmax; }
}`
  },
  {
    id: 'wipe-h',
    name: 'Slide Right',
    desc: 'New theme slides in from the right edge.',
    previewClass: 'mini-anim-wipe-h',
    css:
`::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-new(root) {
  animation: wipe-in 0.6s both;
}
::view-transition-old(root) {
  animation: wipe-out 0.6s both;
}
@keyframes wipe-in {
  from { clip-path: inset(0 100% 0 0); }
  to   { clip-path: inset(0 0%   0 0); }
}
@keyframes wipe-out {
  from { clip-path: inset(0 0 0 0);    }
  to   { clip-path: inset(0 0 0 100%); }
}`
  },
  {
    id: 'wipe-v',
    name: 'Slide Down',
    desc: 'New theme drops in from the top edge.',
    previewClass: 'mini-anim-wipe-v',
    css:
`::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-new(root) {
  animation: wipe-in-v 0.6s both;
}
::view-transition-old(root) {
  animation: wipe-out-v 0.6s both;
}
@keyframes wipe-in-v {
  from { clip-path: inset(100% 0 0 0); }
  to   { clip-path: inset(0%   0 0 0); }
}
@keyframes wipe-out-v {
  from { clip-path: inset(0 0 0    0); }
  to   { clip-path: inset(0 0 100% 0); }
}`
  },
  {
    id: 'slide-down',
    name: 'Slide Up',
    desc: 'New theme slides in from the bottom edge.',
    previewClass: 'mini-anim-slide-down',
    css:
`::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-new(root) {
  animation: slide-down-in 0.6s both;
}
::view-transition-old(root) {
  animation: slide-down-out 0.6s both;
}
@keyframes slide-down-in {
  from { clip-path: inset(0 0 100% 0); }
  to   { clip-path: inset(0 0 0 0); }
}
@keyframes slide-down-out {
  from { clip-path: inset(0 0 0 0); }
  to   { clip-path: inset(0 0 100% 0); }
}`
  },
  {
    id: 'slide',
    name: 'Slide Left',
    desc: 'New page slides in from the left, old retreats right.',
    previewClass: 'mini-anim-slide',
    css:
`::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-new(root) {
  animation: slide-in 0.6s both;
}
::view-transition-old(root) {
  animation: slide-out 0.6s both;
}
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
    desc: 'Old scales up while new fades in.',
    previewClass: 'mini-anim-zoom',
    css:
`::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-new(root) {
  animation: zoom-in 0.7s both;
}
::view-transition-old(root) {
  animation: zoom-out 0.7s both;
}
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
    desc: 'Subtle page-rotation with fade.',
    previewClass: 'mini-anim-rotate',
    css:
`::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-new(root) {
  animation: rotate-in 0.7s both;
}
::view-transition-old(root) {
  animation: rotate-out 0.7s both;
}
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
    desc: 'Classic opacity fade — smooth & invisible.',
    previewClass: 'mini-anim-fade',
    css:
`::view-transition-group(root) {
  animation-timing-function: ease-in-out;
}
::view-transition-new(root) {
  animation: fade-in 0.5s both;
}
::view-transition-old(root) {
  animation: fade-out 0.5s both;
}
@keyframes fade-in  { from { opacity: 0; } to { opacity: 1; } }
@keyframes fade-out { from { opacity: 1; } to { opacity: 0; } }`
  },
  {
    id: 'ink',
    name: 'Ink Bleed',
    desc: 'Turbulence-warped circle like ink spreading.',
    previewClass: 'mini-anim-ink',
    css:
`/* feTurbulence + feDisplacementMap distort the circle edge */
::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-new(root) {
  mask: url('data:image/svg+xml,
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <defs>
        <filter id="turbulence">
          <feTurbulence type="fractalNoise"
            baseFrequency="0.02" numOctaves="3" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise"
            scale="15" xChannelSelector="R" yChannelSelector="G"/>
        </filter>
      </defs>
      <circle cx="50" cy="50" r="50" fill="white"
        filter="url(%23turbulence)"/>
    </svg>') center / 0 no-repeat;
  animation: ink 1.2s both;
}
::view-transition-old(root),
.dark::view-transition-old(root) {
  animation: none; z-index: -1;
}
@keyframes ink {
  to { mask-size: 250vmax; }
}`
  },
  {
    id: 'venetian',
    name: 'Venetian Blinds',
    desc: 'Horizontal strips revealing the new theme.',
    previewClass: 'mini-anim-venetian',
    css:
`::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-new(root) {
  animation: venetian-in 0.8s both;
}
::view-transition-old(root) {
  animation: venetian-out 0.8s both;
}
@keyframes venetian-in {
  from { clip-path: inset(0 0 100% 0); }
  to   { clip-path: inset(0 0 0% 0); }
}
@keyframes venetian-out {
  from { clip-path: inset(0 0 0 0); }
  to   { clip-path: inset(100% 0 0 0); }
}`
  },
  {
    id: 'spiral',
    name: 'Spiral',
    desc: 'Conic gradient mask spiraling from center.',
    previewClass: 'mini-anim-spiral',
    css:
`::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-new(root) {
  mask: conic-gradient(from 0deg, white 0%, transparent 0%) center / 0 no-repeat;
  animation: spiral-in 1.2s both;
}
::view-transition-old(root),
.dark::view-transition-old(root) {
  animation: none; z-index: -1;
}
@keyframes spiral-in {
  to { mask-size: 250vmax; mask-image: conic-gradient(from 0deg, white 0%, white 100%); }
}`
  },
  {
    id: 'heart',
    name: 'Heart',
    desc: 'Heart-shaped mask expanding from center.',
    previewClass: 'mini-anim-heart',
    css:
`::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-new(root) {
  mask: url('data:image/svg+xml,
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <path d="M50 88 C25 65 5 50 5 30 5 15 15 5 30 5 40 5 48 12 50 18 52 12 60 5 70 5 85 5 95 15 95 30 95 50 75 65 50 88Z" fill="white"/>
    </svg>') center / 0 no-repeat;
  animation: heart 1s both;
}
::view-transition-old(root),
.dark::view-transition-old(root) {
  animation: none; z-index: -1;
}
@keyframes heart {
  to { mask-size: 280vmax; }
}`
  },
  {
    id: 'glitch',
    name: 'Glitch',
    desc: 'Digital glitch with clipped offsets.',
    previewClass: 'mini-anim-glitch',
    css:
`::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-new(root) {
  animation: glitch-in 0.6s both;
}
::view-transition-old(root) {
  animation: glitch-out 0.6s both;
}
@keyframes glitch-in {
  0%   { clip-path: inset(0 0 100% 0); opacity: 0; }
  20%  { clip-path: inset(40% 0 0 0); opacity: 1; }
  40%  { clip-path: inset(0 0 60% 0); }
  60%  { clip-path: inset(20% 0 20% 0); }
  80%  { clip-path: inset(0 0 0 0); }
  100% { clip-path: inset(0 0 0 0); opacity: 1; }
}
@keyframes glitch-out {
  0%   { clip-path: inset(0 0 0 0); opacity: 1; }
  20%  { clip-path: inset(0 0 40% 0); }
  40%  { clip-path: inset(60% 0 0 0); }
  60%  { clip-path: inset(20% 0 20% 0); opacity: 0.5; }
  80%  { clip-path: inset(0 0 100% 0); opacity: 0; }
  100% { clip-path: inset(0 0 100% 0); opacity: 0; }
}`
  },
  {
    id: 'mosaic',
    name: 'Mosaic',
    desc: 'Grid of tiles revealing the new theme.',
    previewClass: 'mini-anim-mosaic',
    css:
`::view-transition-group(root) {
  animation-timing-function: var(--expo-out);
}
::view-transition-new(root) {
  mask: url('data:image/svg+xml,
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect x="0" y="0" width="25" height="25" fill="white"/>
      <rect x="50" y="0" width="25" height="25" fill="white"/>
      <rect x="25" y="25" width="25" height="25" fill="white"/>
      <rect x="75" y="25" width="25" height="25" fill="white"/>
      <rect x="0" y="50" width="25" height="25" fill="white"/>
      <rect x="50" y="50" width="25" height="25" fill="white"/>
      <rect x="25" y="75" width="25" height="25" fill="white"/>
      <rect x="75" y="75" width="25" height="25" fill="white"/>
    </svg>') center / 0 no-repeat;
  animation: mosaic 0.9s both;
}
::view-transition-old(root),
.dark::view-transition-old(root) {
  animation: none; z-index: -1;
}
@keyframes mosaic {
  to { mask-size: 300vmax; }
}`
  },
]
