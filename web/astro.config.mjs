import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

import { SITE } from './src/consts.js'

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  vite: {
    plugins: [tailwindcss()]
  }
})
