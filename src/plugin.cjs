const plugin = require('tailwindcss/plugin')
const { engineBase } = require('./engine.cjs')
const effects = require('./effects.cjs')
const { duration, delay, steps } = require('./theme.json')

module.exports = plugin(
  function viewfx({ addBase, addUtilities, matchUtilities, theme }) {
    addBase(engineBase())
    addUtilities(effects)

    matchUtilities(
      {
        'vt-duration': (value) => ({ '--vt-duration-override': value })
      },
      { values: theme('vtDuration') }
    )

    matchUtilities(
      {
        'vt-delay': (value) => ({ '--vt-delay': value })
      },
      { values: theme('vtDelay') }
    )

    matchUtilities(
      {
        'vt-steps': (value) => ({ '--vt-ease-override': `steps(${value})` })
      },
      { values: theme('vtSteps') }
    )
  },
  {
    theme: {
      vtDuration: duration,
      vtDelay: delay,
      vtSteps: steps
    }
  }
)
