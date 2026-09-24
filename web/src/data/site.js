import { EFFECTS } from './effects'

/**
 * Single source of truth for site-wide metadata.
 * Canonical links, Open Graph tags, the sitemap and the JSON-LD payload derive from `url`.
 */
export const SITE = {
  url: 'https://viewfx.luismc.dev',
  name: 'ViewFX',
  title: `Tailwind CSS Theme Transitions Plugin | ${EFFECTS.length}+ Effects`,
  tagline: 'A specimen catalogue of dark/light theme transitions',
  description: `Preview ${EFFECTS.length}+ Tailwind CSS theme transitions on the View Transitions API. Copy one class onto <html>.`,
  image: 'https://pub-660dca4bd13944bd8c4a80be4489c81e.r2.dev/web.webp',
  locale: 'en',
  author: {
    name: 'luisitoluis',
    url: 'https://github.com/luisitoluis'
  },
  repo: 'https://github.com/LuisitoLuis/viewfx',
  package: 'viewfx',
  npm: 'https://www.npmjs.com/package/viewfx'
}
