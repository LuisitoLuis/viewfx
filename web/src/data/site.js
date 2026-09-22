import { EFFECTS } from './effects'

/**
 * Single source of truth for site-wide metadata.
 * Change `url` here when the catalogue has a public domain — canonical links,
 * Open Graph tags and the JSON-LD payload all derive from it.
 */
export const SITE = {
  url: 'https://github.com/LuisitoLuis/viewfx',
  name: 'ViewFX',
  title: `ViewFX — ${EFFECTS.length} theme transition effects for the View Transitions API`,
  tagline: 'A specimen catalogue of dark/light theme transitions',
  description: `A specimen catalogue of ${EFFECTS.length} dark/light theme transitions built on the native View Transitions API. Preview each effect, then copy a Tailwind class. One line of JavaScript.`,
  locale: 'en',
  author: {
    name: 'luisitoluis',
    url: 'https://github.com/luisitoluis'
  },
  repo: 'https://github.com/LuisitoLuis/viewfx',
  package: 'viewfx',
  npm: 'https://www.npmjs.com/package/viewfx'
}
