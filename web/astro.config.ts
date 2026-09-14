import { defineConfig, fontProviders } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

import { SITE } from './src/consts'

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  vite: {
    plugins: [tailwindcss()]
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Bricolage Grotesque',
      cssVariable: '--ff-display',
      weights: ['400 800'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext']
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--ff-mono',
      weights: ['400 600'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext']
    }
  ]
})
