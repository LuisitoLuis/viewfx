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
    name: 'Wipe Horizontal',
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
    name: 'Wipe Vertical',
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
    id: 'slide',
    name: 'Slide',
    desc: 'New page slides in, old retreats left.',
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
]
