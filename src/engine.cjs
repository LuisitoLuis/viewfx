const { maskVariables } = require('./masks.cjs')

const expoOut = `linear(0 0%,0.1684 2.66%,0.3165 5.49%,0.446 8.52%,0.5581 11.78%,0.6535 15.29%,0.7341 19.11%,0.8011 23.3%,0.8557 27.93%,0.8962 32.68%,0.9283 38.01%,0.9529 44.08%,0.9711 51.14%,0.9833 59.06%,0.9915 68.74%,1 100%)`
const expoIn = `linear(0 0%,0.0085 31.26%,0.0167 40.94%,0.0289 48.86%,0.0471 55.92%,0.0717 61.99%,0.1038 67.32%,0.1443 72.07%,0.1989 76.7%,0.2659 80.89%,0.3465 84.71%,0.4419 88.22%,0.554 91.48%,0.6835 94.51%,0.8316 97.34%,1 100%)`

const duration = 'var(--vt-duration-override, var(--vt-duration, 0.5s))'
const ease = 'var(--vt-ease-override, var(--vt-ease, var(--expo-out)))'
const delay = 'var(--vt-delay, 0s)'

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
      animation: `var(--vt-anim-old, vt-fade-out) ${duration} ${ease} ${delay} both`,
      zIndex: 'var(--vt-old-z, auto)',
      mixBlendMode: 'normal'
    },
    ':root::view-transition-new(root)': {
      mask: 'var(--vt-mask, none) var(--vt-mask-position, center) / 0 no-repeat',
      maskOrigin: 'content-box',
      animation: `var(--vt-anim, vt-fade-in) ${duration} ${ease} ${delay} both`,
      mixBlendMode: 'normal'
    },
    '@media (prefers-reduced-motion: reduce)': {
      '::view-transition-group(root), ::view-transition-old(root), ::view-transition-new(root)': {
        animation: 'none !important'
      }
    },
    '@keyframes vt-mask-grow': {
      to: { maskSize: 'var(--vt-mask-size)' }
    },
    '@keyframes vt-spiral': {
      to: {
        maskSize: 'var(--vt-mask-size)',
        maskImage: 'conic-gradient(from 0deg, #fff 0%, #fff 100%)'
      }
    },
    '@keyframes vt-reveal-light': {
      from: { clipPath: 'polygon(171% 50%, 50% 171%, 50% 171%, 171% 50%)' },
      to: { clipPath: 'polygon(171% 50%, 50% 171%, -50% 71%, 50% -71%)' }
    },
    '@keyframes vt-reveal-dark': {
      from: { clipPath: 'polygon(50% -71%, -50% 71%, -50% 71%, 50% -71%)' },
      to: { clipPath: 'polygon(50% -71%, -50% 71%, 50% 171%, 171% 50%)' }
    },
    '@keyframes vt-wipe-in-h': {
      from: { clipPath: 'inset(0 100% 0 0)' },
      to: { clipPath: 'inset(0 0 0 0)' }
    },
    '@keyframes vt-wipe-out-h': {
      from: { clipPath: 'inset(0 0 0 0)' },
      to: { clipPath: 'inset(0 0 0 100%)' }
    },
    '@keyframes vt-wipe-in-down': {
      from: { clipPath: 'inset(100% 0 0 0)' },
      to: { clipPath: 'inset(0 0 0 0)' }
    },
    '@keyframes vt-wipe-out-down': {
      from: { clipPath: 'inset(0 0 0 0)' },
      to: { clipPath: 'inset(0 0 100% 0)' }
    },
    '@keyframes vt-wipe-in-up': {
      from: { clipPath: 'inset(0 0 100% 0)' },
      to: { clipPath: 'inset(0 0 0 0)' }
    },
    '@keyframes vt-wipe-out-up': {
      from: { clipPath: 'inset(0 0 0 0)' },
      to: { clipPath: 'inset(0 0 100% 0)' }
    },
    '@keyframes vt-venetian-out': {
      from: { clipPath: 'inset(0 0 0 0)' },
      to: { clipPath: 'inset(100% 0 0 0)' }
    },
    '@keyframes vt-glitch-in': {
      '0%': { clipPath: 'inset(0 0 100% 0)', opacity: '0' },
      '20%': { clipPath: 'inset(40% 0 0 0)', opacity: '1' },
      '40%': { clipPath: 'inset(0 0 60% 0)' },
      '60%': { clipPath: 'inset(20% 0 20% 0)' },
      '100%': { clipPath: 'inset(0 0 0 0)' }
    },
    '@keyframes vt-glitch-out': {
      '0%': { clipPath: 'inset(0 0 0 0)', opacity: '1' },
      '20%': { clipPath: 'inset(0 0 40% 0)' },
      '40%': { clipPath: 'inset(60% 0 0 0)' },
      '60%': { clipPath: 'inset(20% 0 20% 0)', opacity: '0.5' },
      '100%': { clipPath: 'inset(0 0 100% 0)', opacity: '0' }
    },
    '@keyframes vt-slide-in': {
      from: { transform: 'translateX(100%)' },
      to: { transform: 'translateX(0)' }
    },
    '@keyframes vt-slide-out': {
      from: { transform: 'translateX(0)', opacity: '1' },
      to: { transform: 'translateX(-50%)', opacity: '0.3' }
    },
    '@keyframes vt-zoom-in': {
      from: { opacity: '0', transform: 'scale(0.85)' },
      to: { opacity: '1', transform: 'scale(1)' }
    },
    '@keyframes vt-zoom-out': {
      from: { opacity: '1', transform: 'scale(1)' },
      to: { opacity: '0', transform: 'scale(1.15)' }
    },
    '@keyframes vt-rotate-in': {
      from: { opacity: '0', transform: 'rotate(-6deg) scale(0.9)' },
      to: { opacity: '1', transform: 'rotate(0) scale(1)' }
    },
    '@keyframes vt-rotate-out': {
      from: { opacity: '1', transform: 'rotate(0) scale(1)' },
      to: { opacity: '0', transform: 'rotate(6deg) scale(0.9)' }
    },
    '@keyframes vt-fade-in': {
      from: { opacity: '0' },
      to: { opacity: '1' }
    },
    '@keyframes vt-fade-out': {
      from: { opacity: '1' },
      to: { opacity: '0' }
    }
  }
}

module.exports = { engineBase }
