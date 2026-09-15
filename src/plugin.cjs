const plugin = require('tailwindcss/plugin')
const { engineBase } = require('./engine.cjs')
const effects = require('./effects.cjs')
const { registerCompound } = require('./compound.cjs')
const { duration, delay, steps } = require('./theme.json')

module.exports = plugin(
  function viewfx({ addBase, addUtilities, matchUtilities, theme }) {
    addBase(engineBase())
    addUtilities(effects)
    registerCompound({ matchUtilities })

    matchUtilities(
      {
        'fx-duration': (value) => ({ '--fx-duration-override': value })
      },
      { values: theme('fxDuration') }
    )

    matchUtilities(
      {
        'fx-delay': (value) => ({ '--fx-delay': value })
      },
      { values: theme('fxDelay') }
    )

    matchUtilities(
      {
        'fx-steps': (value) => ({ '--fx-ease-override': `steps(${value})` })
      },
      { values: theme('fxSteps') }
    )
  },
  {
    theme: {
      fxDuration: duration,
      fxDelay: delay,
      fxSteps: steps
    }
  }
)
