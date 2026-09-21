import { describe, it, expect } from 'vitest'
import { EFFECTS } from '../web/src/data/effects.js'
import { buildClasses, isEffectOrTimingClass } from '../web/src/lib/playground.js'

describe('playground class list', () => {
  it('emits the compound class for every catalogue effect', () => {
    for (const effect of EFFECTS) {
      expect(buildClasses({ e: effect.id, d: '1000', delay: '0', s: 'none' })).toEqual([
        `${effect.id}-duration-1000`
      ])
    }
  })

  it('keeps hyphenated effects as a single compound class', () => {
    expect(buildClasses({ e: 'circle-blur', d: '500', delay: '0', s: 'none' })).toEqual([
      'circle-blur-duration-500'
    ])
    expect(buildClasses({ e: 'slide-down', d: '1000', delay: '300', s: 'modern' })).toEqual([
      'slide-down-duration-1000-delay-300',
      'fx-steps-modern'
    ])
  })

  it('uses the bare effect class when duration is none', () => {
    expect(buildClasses({ e: 'mosaic', d: 'none', delay: '0', s: 'none' })).toEqual(['mosaic'])
  })

  it('does not treat slide-down or slide-left as the slide effect', () => {
    expect(isEffectOrTimingClass('slide-down-duration-1000')).toBe(true)
    expect(isEffectOrTimingClass('slide-left-duration-1000')).toBe(true)
    expect(isEffectOrTimingClass('slide-right-duration-1000')).toBe(true)
    expect(isEffectOrTimingClass('slide-up-duration-1000')).toBe(true)
    expect(isEffectOrTimingClass('slide-duration-1000')).toBe(true)
    expect(isEffectOrTimingClass('scrollbar-thin')).toBe(false)
  })
})
