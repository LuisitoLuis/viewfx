import { generatePluginCSS, generatePluginCSSFromPackage } from './utils.js'
import { describe, it, expect } from 'vitest'
import { EFFECTS } from '../web/src/data/effects.js'
import { maskCustomProperties } from '../src/masks.js'

describe('viewfx plugins', () => {
  it('use a predefined mask effect', async () => {
    const css = await generatePluginCSS({
      content: '<html class="circle"></html>'
    })

    expect(css).toContain(
      '.circle{--fx-anim:fx-mask-grow;--fx-anim-old:none;--fx-old-z:-1;--fx-mask:var(--mask-circle);--fx-mask-size:200vmax;--fx-duration:1s;}'
    )
    expect(css).toContain('@keyframes fx-mask-grow{to{mask-size:var(--fx-mask-size)}}')
  })

  it('use a predefined fade effect', async () => {
    const css = await generatePluginCSS({
      content: '<html class="fade"></html>'
    })

    expect(css).toContain(
      '.fade{--fx-anim:fx-fade-in;--fx-anim-old:fx-fade-out;--fx-duration:0.5s;--fx-ease:ease-in-out;}'
    )
    expect(css).toContain('@keyframes fx-fade-in')
    expect(css).toContain('@keyframes fx-fade-out')
  })

  it('flips the polygon clip with the dark class', async () => {
    const css = await generatePluginCSS({
      content: '<html class="dark polygon"></html>'
    })

    expect(css).toContain('--fx-anim:fx-reveal-light')
    expect(css).toContain('.dark.polygon{--fx-anim:fx-reveal-dark;}')
    expect(css).toContain('@keyframes fx-reveal-light')
    expect(css).toContain('@keyframes fx-reveal-dark')
  })

  it('combines effect duration and delay in one class', async () => {
    const css = await generatePluginCSS({
      content: '<html class="circle-duration-1000-delay-300"></html>'
    })

    expect(css).toContain(
      '.circle-duration-1000-delay-300{--fx-anim:fx-mask-grow;--fx-anim-old:none;--fx-old-z:-1;--fx-mask:var(--mask-circle);--fx-mask-size:200vmax;--fx-duration:1s;--fx-duration-override:1000ms;--fx-delay:300ms;}'
    )
  })

  it('combines a hyphenated effect with duration only', async () => {
    const css = await generatePluginCSS({
      content: '<html class="circle-blur-duration-500"></html>'
    })

    expect(css).toContain('.circle-blur-duration-500{')
    expect(css).toContain('--fx-mask:var(--mask-circle-blur)')
    expect(css).toContain('--fx-duration-override:500ms')
  })

  it('flips polygon compounds in dark', async () => {
    const css = await generatePluginCSS({
      content: '<html class="dark polygon-duration-1000-delay-300"></html>'
    })

    expect(css).toContain('--fx-anim:fx-reveal-light')
    expect(css).toContain('--fx-anim:fx-reveal-dark')
    expect(css).toContain('polygon-duration')
  })

  it('use a predefined transition delay', async () => {
    const css = await generatePluginCSS({
      content: '<html class="fx-delay-100"></html>'
    })

    expect(css).toContain('--fx-delay:100ms')
  })

  it('use a custom transition delay', async () => {
    const css = await generatePluginCSS({
      content: '<html class="fx-delay-[777ms]"></html>'
    })

    expect(css).toContain('.fx-delay-\\[777ms\\]{--fx-delay:777ms;}')
  })

  it('use a predefined transition duration', async () => {
    const css = await generatePluginCSS({
      content: '<html class="fx-duration-100"></html>'
    })

    expect(css).toContain('--fx-duration-override:100ms')
  })

  it('use a predefined named transition duration', async () => {
    const css = await generatePluginCSS({
      content: '<html class="fx-duration-faster"></html>'
    })

    expect(css).toContain('.fx-duration-faster{--fx-duration-override:100ms;}')
  })

  it('use a custom transition duration', async () => {
    const css = await generatePluginCSS({
      content: '<html class="fx-duration-[777ms]"></html>'
    })

    expect(css).toContain('.fx-duration-\\[777ms\\]{--fx-duration-override:777ms;}')
  })

  it('use not custom transition steps', async () => {
    const css = await generatePluginCSS({
      content: '<html class="fx-steps-retro"></html>'
    })

    expect(css).toContain('.fx-steps-retro{--fx-ease-override:steps(8);}')
  })

  it('use a custom transition steps', async () => {
    const css = await generatePluginCSS({
      content: '<html class="fx-steps-[33]"></html>'
    })

    expect(css).toContain('.fx-steps-\\[33\\]{--fx-ease-override:steps(33);}')
  })

  it('ships the view-transition engine', async () => {
    const css = await generatePluginCSS({
      content: '<html class="fade"></html>'
    })

    expect(css).toContain(':root::view-transition-old(root)')
    expect(css).toContain(':root::view-transition-new(root)')
    expect(css).toContain('animation-delay:var(--fx-delay, 0s)')
    expect(css).toContain('@media (prefers-reduced-motion: reduce)')
  })

  it('emits every catalogue utility', async () => {
    const classList = EFFECTS.map((effect) => effect.className).join(' ')
    const css = await generatePluginCSS({
      content: `<html class="${classList}"></html>`
    })

    for (const effect of EFFECTS) {
      expect(css).toContain(`.${effect.className}{`)
      expect(css).toContain('--fx-anim:')
    }
  })

  it('exposes mask tokens as base64 data URIs', async () => {
    const css = await generatePluginCSS({
      content: '<html class="circle"></html>'
    })

    expect(css).toContain('--mask-circle:url("data:image/svg+xml;base64,')
    expect(maskCustomProperties()).toContain('--mask-circle:url("data:image/svg+xml;base64,')
    expect(maskCustomProperties()).toContain('--mask-heart:')
  })

  it('resolves @import "viewfx" to the v4 CSS entry', async () => {
    const css = await generatePluginCSSFromPackage({
      content: '<html class="fade"></html>'
    })

    expect(css).toContain('.fade{')
    expect(css).toContain('--fx-anim:fx-fade-in')
  })
})
