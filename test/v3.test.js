import { generatePluginCSSv3 } from './utils.js'
import { describe, it, expect } from 'vitest'
import { EFFECTS } from '../web/src/data/effects.js'
import { maskCustomProperties } from '../src/masks.js'

describe('viewfx tailwind v3 plugin', () => {
  it('use a predefined mask effect', async () => {
    const css = await generatePluginCSSv3({
      content: '<html class="circle"></html>'
    })

    expect(css).toContain('.circle{')
    expect(css).toContain('--fx-anim:fx-mask-grow')
    expect(css).toContain('--fx-mask:var(--mask-circle)')
    expect(css).toContain('@keyframes fx-mask-grow')
  })

  it('use a predefined fade effect', async () => {
    const css = await generatePluginCSSv3({
      content: '<html class="fade"></html>'
    })

    expect(css).toContain('--fx-anim:fx-fade-in')
    expect(css).toContain('--fx-anim-old:fx-fade-out')
    expect(css).toContain('--fx-duration:0.5s')
    expect(css).toContain('@keyframes fx-fade-in')
    expect(css).toContain('@keyframes fx-fade-out')
  })

  it('use a centre expand clip', async () => {
    const css = await generatePluginCSSv3({
      content: '<html class="expand"></html>'
    })

    expect(css).toContain('--fx-anim:fx-expand-in')
    expect(css).toContain('--fx-old-z:-1')
    expect(css).toContain('@keyframes fx-expand-in')
  })

  it('flips the polygon clip with the dark class', async () => {
    const css = await generatePluginCSSv3({
      content: '<html class="dark polygon"></html>'
    })

    expect(css).toContain('--fx-anim:fx-reveal-light')
    expect(css).toContain('.dark.polygon{--fx-anim:fx-reveal-dark')
    expect(css).toContain('@keyframes fx-reveal-light')
    expect(css).toContain('@keyframes fx-reveal-dark')
  })

  it('combines effect duration and delay in one class', async () => {
    const css = await generatePluginCSSv3({
      content: '<html class="circle-duration-1000-delay-300"></html>'
    })

    expect(css).toContain('.circle-duration-1000-delay-300{')
    expect(css).toContain('--fx-anim:fx-mask-grow')
    expect(css).toContain('--fx-duration-override:1000ms')
    expect(css).toContain('--fx-delay:300ms')
  })

  it('use a predefined transition delay', async () => {
    const css = await generatePluginCSSv3({
      content: '<html class="fx-delay-100"></html>'
    })

    expect(css).toContain('--fx-delay:100ms')
  })

  it('use a custom transition delay', async () => {
    const css = await generatePluginCSSv3({
      content: '<html class="fx-delay-[777ms]"></html>'
    })

    expect(css).toContain('--fx-delay:777ms')
  })

  it('use a predefined transition duration', async () => {
    const css = await generatePluginCSSv3({
      content: '<html class="fx-duration-100"></html>'
    })

    expect(css).toContain('--fx-duration-override:100ms')
  })

  it('use a predefined named transition duration', async () => {
    const css = await generatePluginCSSv3({
      content: '<html class="fx-duration-faster"></html>'
    })

    expect(css).toContain('--fx-duration-override:100ms')
  })

  it('use a custom transition duration', async () => {
    const css = await generatePluginCSSv3({
      content: '<html class="fx-duration-[777ms]"></html>'
    })

    expect(css).toContain('--fx-duration-override:777ms')
  })

  it('use not custom transition steps', async () => {
    const css = await generatePluginCSSv3({
      content: '<html class="fx-steps-retro"></html>'
    })

    expect(css).toContain('--fx-ease-override:steps(8)')
  })

  it('use a custom transition steps', async () => {
    const css = await generatePluginCSSv3({
      content: '<html class="fx-steps-[33]"></html>'
    })

    expect(css).toContain('--fx-ease-override:steps(33)')
  })

  it('ships the view-transition engine', async () => {
    const css = await generatePluginCSSv3({
      content: '<html class="fade"></html>'
    })

    expect(css).toContain(':root::view-transition-old(root)')
    expect(css).toContain(':root::view-transition-new(root)')
    expect(css).toContain('animation-delay:var(--fx-delay, 0s)')
    expect(css).toContain('@media (prefers-reduced-motion: reduce)')
  })

  it('emits every catalogue utility', async () => {
    const classList = EFFECTS.map((effect) => effect.className).join(' ')
    const css = await generatePluginCSSv3({
      content: `<html class="${classList}"></html>`
    })

    for (const effect of EFFECTS) {
      expect(css).toContain(`.${effect.className}{`)
      expect(css).toContain('--fx-anim:')
    }
  })

  it('exposes mask tokens as base64 data URIs', async () => {
    const css = await generatePluginCSSv3({
      content: '<html class="circle"></html>'
    })

    expect(css).toContain('--mask-circle:url("data:image/svg+xml;base64,')
    expect(maskCustomProperties()).toContain('--mask-circle:url("data:image/svg+xml;base64,')
  })
})
