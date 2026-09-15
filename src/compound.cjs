/**
 * Combined effect+timing utilities:
 *   circle-duration-1000
 *   circle-duration-1000-delay-300
 *
 * Tailwind v4 only allows one `*` in `@utility` names, so these are registered
 * from JS (`@plugin` in v4, `require('viewfx')` in v3).
 */
const plugin = require('tailwindcss/plugin')
const effects = require('./effects.cjs')
const { duration, delay } = require('./theme.json')

function registerCompound({ matchUtilities }) {
  for (const [selector, tokens] of Object.entries(effects)) {
    if (!selector.startsWith('.') || selector.includes('.dark')) continue

    const name = selector.slice(1)

    matchUtilities(
      {
        [`${name}-duration`]: (value) => ({
          ...tokens,
          '--fx-duration-override': value
        })
      },
      { values: duration }
    )

    for (const [durationKey, durationValue] of Object.entries(duration)) {
      matchUtilities(
        {
          [`${name}-duration-${durationKey}-delay`]: (value) => ({
            ...tokens,
            '--fx-duration-override': durationValue,
            '--fx-delay': value
          })
        },
        { values: delay }
      )
    }
  }
}

const compoundPlugin = plugin(registerCompound)
compoundPlugin.registerCompound = registerCompound

module.exports = compoundPlugin
