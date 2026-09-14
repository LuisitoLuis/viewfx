/** Effect utilities — keep in sync with `@utility` blocks in `src/index.css`. */

module.exports = {
  '.vt-circle': {
    '--vt-anim': 'vt-mask-grow',
    '--vt-anim-old': 'none',
    '--vt-old-z': '-1',
    '--vt-mask': 'var(--mask-circle)',
    '--vt-mask-size': '200vmax',
    '--vt-duration': '1s'
  },
  '.vt-circle-blur': {
    '--vt-anim': 'vt-mask-grow',
    '--vt-anim-old': 'none',
    '--vt-old-z': '-1',
    '--vt-mask': 'var(--mask-circle-blur)',
    '--vt-mask-size': '200vmax',
    '--vt-duration': '1s'
  },
  '.vt-corner-tl': {
    '--vt-anim': 'vt-mask-grow',
    '--vt-anim-old': 'none',
    '--vt-old-z': '-1',
    '--vt-mask': 'var(--mask-corner-tl)',
    '--vt-mask-position': 'top left',
    '--vt-mask-size': '350vmax',
    '--vt-duration': '1s'
  },
  '.vt-corner-tr': {
    '--vt-anim': 'vt-mask-grow',
    '--vt-anim-old': 'none',
    '--vt-old-z': '-1',
    '--vt-mask': 'var(--mask-corner-tr)',
    '--vt-mask-position': 'top right',
    '--vt-mask-size': '350vmax',
    '--vt-duration': '1s'
  },
  '.vt-iris': {
    '--vt-anim': 'vt-mask-grow',
    '--vt-anim-old': 'none',
    '--vt-old-z': '-1',
    '--vt-mask': 'var(--mask-star)',
    '--vt-mask-size': '300vmax',
    '--vt-duration': '0.9s'
  },
  '.vt-diamond': {
    '--vt-anim': 'vt-mask-grow',
    '--vt-anim-old': 'none',
    '--vt-old-z': '-1',
    '--vt-mask': 'var(--mask-diamond)',
    '--vt-mask-size': '280vmax',
    '--vt-duration': '0.9s'
  },
  '.vt-hexagon': {
    '--vt-anim': 'vt-mask-grow',
    '--vt-anim-old': 'none',
    '--vt-old-z': '-1',
    '--vt-mask': 'var(--mask-hexagon)',
    '--vt-mask-size': '300vmax',
    '--vt-duration': '1s'
  },
  '.vt-heart': {
    '--vt-anim': 'vt-mask-grow',
    '--vt-anim-old': 'none',
    '--vt-old-z': '-1',
    '--vt-mask': 'var(--mask-heart)',
    '--vt-mask-size': '280vmax',
    '--vt-duration': '1s'
  },
  '.vt-mosaic': {
    '--vt-anim': 'vt-mask-grow',
    '--vt-anim-old': 'none',
    '--vt-old-z': '-1',
    '--vt-mask': 'var(--mask-mosaic)',
    '--vt-mask-size': '300vmax',
    '--vt-duration': '0.9s'
  },
  '.vt-ink': {
    '--vt-anim': 'vt-mask-grow',
    '--vt-anim-old': 'none',
    '--vt-old-z': '-1',
    '--vt-mask': 'var(--mask-ink)',
    '--vt-mask-size': '250vmax',
    '--vt-duration': '1.2s'
  },
  '.vt-spiral': {
    '--vt-anim': 'vt-spiral',
    '--vt-anim-old': 'none',
    '--vt-old-z': '-1',
    '--vt-mask': 'conic-gradient(from 0deg, #fff 0%, transparent 0%)',
    '--vt-mask-size': '250vmax',
    '--vt-duration': '1.2s'
  },
  '.vt-polygon': {
    '--vt-anim': 'vt-reveal-light',
    '--vt-anim-old': 'none',
    '--vt-old-z': '-1',
    '--vt-duration': '0.7s'
  },
  '.dark.vt-polygon': {
    '--vt-anim': 'vt-reveal-dark'
  },
  '.vt-wipe-h': {
    '--vt-anim': 'vt-wipe-in-h',
    '--vt-anim-old': 'vt-wipe-out-h',
    '--vt-duration': '0.6s'
  },
  '.vt-wipe-v': {
    '--vt-anim': 'vt-wipe-in-down',
    '--vt-anim-old': 'vt-wipe-out-down',
    '--vt-duration': '0.6s'
  },
  '.vt-slide-down': {
    '--vt-anim': 'vt-wipe-in-up',
    '--vt-anim-old': 'vt-wipe-out-up',
    '--vt-duration': '0.6s'
  },
  '.vt-venetian': {
    '--vt-anim': 'vt-wipe-in-up',
    '--vt-anim-old': 'vt-venetian-out',
    '--vt-duration': '0.8s'
  },
  '.vt-glitch': {
    '--vt-anim': 'vt-glitch-in',
    '--vt-anim-old': 'vt-glitch-out',
    '--vt-duration': '0.6s'
  },
  '.vt-slide': {
    '--vt-anim': 'vt-slide-in',
    '--vt-anim-old': 'vt-slide-out',
    '--vt-duration': '0.6s'
  },
  '.vt-zoom': {
    '--vt-anim': 'vt-zoom-in',
    '--vt-anim-old': 'vt-zoom-out',
    '--vt-duration': '0.7s'
  },
  '.vt-rotate': {
    '--vt-anim': 'vt-rotate-in',
    '--vt-anim-old': 'vt-rotate-out',
    '--vt-duration': '0.7s'
  },
  '.vt-fade': {
    '--vt-anim': 'vt-fade-in',
    '--vt-anim-old': 'vt-fade-out',
    '--vt-duration': '0.5s',
    '--vt-ease': 'ease-in-out'
  }
}
