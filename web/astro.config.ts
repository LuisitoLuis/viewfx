import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

import { SITE } from './src/consts'

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  vite: {
    plugins: [tailwindcss()]
  }
})
