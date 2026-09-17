import tailwindcss from '@tailwindcss/postcss'
import tailwindcssV3 from 'tailwindcss-v3'
import postcss from 'postcss'
import minify from '@csstools/postcss-minify'
import { createRequire } from 'module'
import { join } from 'path'

const require = createRequire(import.meta.url)
const viewfxV3 = require('../src/plugin.cjs')

const TAILWIND_BASE = '@import "tailwindcss" source(none);'
const PLUGIN_IMPORT = `@import "${join(process.cwd(), 'src/index.css')}";`

function sourceFromContent(content) {
  const classes = [...content.matchAll(/class="([^"]*)"/g)]
    .flatMap((match) => match[1].split(/\s+/))
    .filter(Boolean)

  if (classes.length === 0) return ''

  return `@source inline(${JSON.stringify(classes.join(' '))});`
}

export function generatePluginCSS(options = {}) {
  const { inline = '', content = '' } = options

  return postcss([tailwindcss(), minify()])
    .process(`${TAILWIND_BASE}\n${PLUGIN_IMPORT}\n${sourceFromContent(content)}\n${inline}`, {
      from: join(process.cwd(), 'test/index.test.js')
    })
    .then((result) => result.css)
}

export function generatePluginCSSv3(options = {}) {
  const { content = '' } = options

  return postcss([
    tailwindcssV3({
      content: [{ raw: content, extension: 'html' }],
      corePlugins: { preflight: false },
      plugins: [viewfxV3]
    }),
    minify()
  ])
    .process('@tailwind base;\n@tailwind components;\n@tailwind utilities;', {
      from: join(process.cwd(), 'test/v3.test.js')
    })
    .then((result) => result.css)
}

export function generatePluginCSSFromPackage(options = {}) {
  const { content = '' } = options

  return postcss([tailwindcss(), minify()])
    .process(`${TAILWIND_BASE}\n@import "viewfx";\n${sourceFromContent(content)}`, {
      from: join(process.cwd(), 'web/src/styles/index.css')
    })
    .then((result) => result.css)
}
