const { maskVariables } = require('./masks.cjs')
const { mosaicNewRoot } = require('./mosaic.cjs')

const expoOut = `linear(0 0%,0.1684 2.66%,0.3165 5.49%,0.446 8.52%,0.5581 11.78%,0.6535 15.29%,0.7341 19.11%,0.8011 23.3%,0.8557 27.93%,0.8962 32.68%,0.9283 38.01%,0.9529 44.08%,0.9711 51.14%,0.9833 59.06%,0.9915 68.74%,1 100%)`
const expoIn = `linear(0 0%,0.0085 31.26%,0.0167 40.94%,0.0289 48.86%,0.0471 55.92%,0.0717 61.99%,0.1038 67.32%,0.1443 72.07%,0.1989 76.7%,0.2659 80.89%,0.3465 84.71%,0.4419 88.22%,0.554 91.48%,0.6835 94.51%,0.8316 97.34%,1 100%)`

const duration = 'var(--fx-duration-override, var(--fx-duration, 0.5s))'
const ease = 'var(--fx-ease-override, var(--fx-ease, var(--expo-out)))'
const delay = 'var(--fx-delay, 0s)'

function engineBase() {
  return {
    ':root': {
      ...maskVariables(),
      '--expo-out': expoOut,
      '--expo-in': expoIn
    },
    ':root::view-transition-group(root)': {
      animationDuration: duration,
      animationTimingFunction: ease,
      animationDelay: delay
    },
    ':root::view-transition-old(root)': {
      animation: `var(--fx-anim-old, fx-fade-out) ${duration} ${ease} ${delay} both`,
      zIndex: 'var(--fx-old-z, auto)',
      mixBlendMode: 'normal'
    },
    ':root::view-transition-new(root)': {
      mask: 'var(--fx-mask, none) var(--fx-mask-position, center) / 0 no-repeat',
      maskOrigin: 'content-box',
      animation: `var(--fx-anim, fx-fade-in) ${duration} ${ease} ${delay} both`,
      mixBlendMode: 'normal'
    },
    '@media (prefers-reduced-motion: reduce)': {
      '::view-transition-group(root), ::view-transition-old(root), ::view-transition-new(root)': {
        animation: 'none !important'
      }
    },
    '@property --fx-mosaic': {
      syntax: '"<number>"',
      inherits: 'false',
      initialValue: '1'
    },
    ':root.mosaic::view-transition-new(root), :root[class*="mosaic-duration"]::view-transition-new(root)':
      mosaicNewRoot,
    '@keyframes fx-mosaic': {
      from: { '--fx-mosaic': '0' },
      to: { '--fx-mosaic': '1' }
    },
    '@keyframes fx-mask-grow': {
      to: { maskSize: 'var(--fx-mask-size)' }
    },
    '@keyframes fx-spiral': {
      to: {
        maskSize: 'var(--fx-mask-size)',
        maskImage: 'conic-gradient(from 0deg, #fff 0%, #fff 100%)'
      }
    },
    '@keyframes fx-reveal-light': {
      from: { clipPath: 'polygon(171% 50%, 50% 171%, 50% 171%, 171% 50%)' },
      to: { clipPath: 'polygon(171% 50%, 50% 171%, -50% 71%, 50% -71%)' }
    },
    '@keyframes fx-reveal-dark': {
      from: { clipPath: 'polygon(50% -71%, -50% 71%, -50% 71%, 50% -71%)' },
      to: { clipPath: 'polygon(50% -71%, -50% 71%, 50% 171%, 171% 50%)' }
    },
    '@keyframes fx-wipe-in-h': {
      from: { clipPath: 'inset(0 100% 0 0)' },
      to: { clipPath: 'inset(0 0 0 0)' }
    },
    '@keyframes fx-wipe-out-h': {
      from: { clipPath: 'inset(0 0 0 0)' },
      to: { clipPath: 'inset(0 0 0 100%)' }
    },
    '@keyframes fx-wipe-in-left': {
      from: { clipPath: 'inset(0 0 0 100%)' },
      to: { clipPath: 'inset(0 0 0 0)' }
    },
    '@keyframes fx-wipe-out-left': {
      from: { clipPath: 'inset(0 0 0 0)' },
      to: { clipPath: 'inset(0 100% 0 0)' }
    },
    '@keyframes fx-wipe-in-down': {
      from: { clipPath: 'inset(100% 0 0 0)' },
      to: { clipPath: 'inset(0 0 0 0)' }
    },
    '@keyframes fx-wipe-out-down': {
      from: { clipPath: 'inset(0 0 0 0)' },
      to: { clipPath: 'inset(0 0 100% 0)' }
    },
    '@keyframes fx-wipe-in-up': {
      from: { clipPath: 'inset(0 0 100% 0)' },
      to: { clipPath: 'inset(0 0 0 0)' }
    },
    '@keyframes fx-wipe-out-up': {
      from: { clipPath: 'inset(0 0 0 0)' },
      to: { clipPath: 'inset(0 0 100% 0)' }
    },
    '@keyframes fx-venetian-out': {
      from: { clipPath: 'inset(0 0 0 0)' },
      to: { clipPath: 'inset(100% 0 0 0)' }
    },
    '@keyframes fx-expand-in': {
      from: { clipPath: 'inset(50%)' },
      to: { clipPath: 'inset(0)' }
    },
    '@keyframes fx-glitch-in': {
      '0%': { clipPath: 'inset(0 0 100% 0)', opacity: '0' },
      '20%': { clipPath: 'inset(40% 0 0 0)', opacity: '1' },
      '40%': { clipPath: 'inset(0 0 60% 0)' },
      '60%': { clipPath: 'inset(20% 0 20% 0)' },
      '100%': { clipPath: 'inset(0 0 0 0)' }
    },
    '@keyframes fx-glitch-out': {
      '0%': { clipPath: 'inset(0 0 0 0)', opacity: '1' },
      '20%': { clipPath: 'inset(0 0 40% 0)' },
      '40%': { clipPath: 'inset(60% 0 0 0)' },
      '60%': { clipPath: 'inset(20% 0 20% 0)', opacity: '0.5' },
      '100%': { clipPath: 'inset(0 0 100% 0)', opacity: '0' }
    },
    '@keyframes fx-slide-in': {
      from: { transform: 'translateX(100%)' },
      to: { transform: 'translateX(0)' }
    },
    '@keyframes fx-slide-out': {
      from: { transform: 'translateX(0)', opacity: '1' },
      to: { transform: 'translateX(-50%)', opacity: '0.3' }
    },
    '@keyframes fx-zoom-in': {
      from: { opacity: '0', transform: 'scale(0.85)' },
      to: { opacity: '1', transform: 'scale(1)' }
    },
    '@keyframes fx-zoom-out': {
      from: { opacity: '1', transform: 'scale(1)' },
      to: { opacity: '0', transform: 'scale(1.15)' }
    },
    '@keyframes fx-rotate-in': {
      from: { opacity: '0', transform: 'rotate(-6deg) scale(0.9)' },
      to: { opacity: '1', transform: 'rotate(0) scale(1)' }
    },
    '@keyframes fx-rotate-out': {
      from: { opacity: '1', transform: 'rotate(0) scale(1)' },
      to: { opacity: '0', transform: 'rotate(6deg) scale(0.9)' }
    },
    '@keyframes fx-fade-in': {
      from: { opacity: '0' },
      to: { opacity: '1' }
    },
    '@keyframes fx-fade-out': {
      from: { opacity: '1' },
      to: { opacity: '0' }
    }
  }
}

module.exports = { engineBase }
