import { generatePluginCSS, generatePluginCSSFromPackage } from './utils.js'
import { describe, it, expect } from 'vitest'
import { EFFECTS } from '../web/src/data/effects.js'
import { maskCustomProperties } from '../src/masks.js'

describe('viewfx plugins', () => {
  it('use a predefined mask effect', async () => {
    const css = await generatePluginCSS({
      content: '<html class="vt-circle"></html>'
    })

    expect(css).toContain(
      '.vt-circle{--vt-anim:vt-mask-grow;--vt-anim-old:none;--vt-old-z:-1;--vt-mask:var(--mask-circle);--vt-mask-size:200vmax;--vt-duration:1s;}'
    )
    expect(css).toContain('@keyframes vt-mask-grow{to{mask-size:var(--vt-mask-size)}}')
  })

  it('use a predefined fade effect', async () => {
    const css = await generatePluginCSS({
      content: '<html class="vt-fade"></html>'
    })

    expect(css).toContain(
      '.vt-fade{--vt-anim:vt-fade-in;--vt-anim-old:vt-fade-out;--vt-duration:0.5s;--vt-ease:ease-in-out;}'
    )
    expect(css).toContain('@keyframes vt-fade-in')
    expect(css).toContain('@keyframes vt-fade-out')
  })

  it('flips the polygon clip with the dark class', async () => {
    const css = await generatePluginCSS({
      content: '<html class="dark vt-polygon"></html>'
    })

    expect(css).toContain('--vt-anim:vt-reveal-light')
    expect(css).toContain('.dark.vt-polygon{--vt-anim:vt-reveal-dark;}')
    expect(css).toContain('@keyframes vt-reveal-light')
    expect(css).toContain('@keyframes vt-reveal-dark')
  })

  it('use a predefined transition delay', async () => {
    const css = await generatePluginCSS({
      content: '<html class="vt-delay-100"></html>'
    })

    expect(css).toContain('--vt-delay:100ms')
  })

  it('use a custom transition delay', async () => {
    const css = await generatePluginCSS({
      content: '<html class="vt-delay-[777ms]"></html>'
    })

    expect(css).toContain('.vt-delay-\\[777ms\\]{--vt-delay:777ms;}')
  })

  it('use a predefined transition duration', async () => {
    const css = await generatePluginCSS({
      content: '<html class="vt-duration-100"></html>'
    })

    expect(css).toContain('--vt-duration-override:100ms')
  })

  it('use a predefined named transition duration', async () => {
    const css = await generatePluginCSS({
      content: '<html class="vt-duration-faster"></html>'
    })

    expect(css).toContain('.vt-duration-faster{--vt-duration-override:100ms;}')
  })

  it('use a custom transition duration', async () => {
    const css = await generatePluginCSS({
      content: '<html class="vt-duration-[777ms]"></html>'
    })

    expect(css).toContain('.vt-duration-\\[777ms\\]{--vt-duration-override:777ms;}')
  })

  it('use not custom transition steps', async () => {
    const css = await generatePluginCSS({
      content: '<html class="vt-steps-retro"></html>'
    })

    expect(css).toContain('.vt-steps-retro{--vt-ease-override:steps(8);}')
  })

  it('use a custom transition steps', async () => {
    const css = await generatePluginCSS({
      content: '<html class="vt-steps-[33]"></html>'
    })

    expect(css).toContain('.vt-steps-\\[33\\]{--vt-ease-override:steps(33);}')
  })

  it('ships the view-transition engine', async () => {
    const css = await generatePluginCSS({
      content: '<html class="vt-fade"></html>'
    })

    expect(css).toContain(':root::view-transition-old(root)')
    expect(css).toContain(':root::view-transition-new(root)')
    expect(css).toContain('animation-delay:var(--vt-delay, 0s)')
    expect(css).toContain('@media (prefers-reduced-motion: reduce)')
  })

  it('emits every catalogue utility', async () => {
    const classList = EFFECTS.map((effect) => effect.className).join(' ')
    const css = await generatePluginCSS({
      content: `<html class="${classList}"></html>`
    })

    for (const effect of EFFECTS) {
      expect(css).toContain(`.${effect.className}{`)
      expect(css).toContain('--vt-anim:')
    }
  })

  it('exposes mask tokens as base64 data URIs', async () => {
    const css = await generatePluginCSS({
      content: '<html class="vt-circle"></html>'
    })

    expect(css).toContain('--mask-circle:url("data:image/svg+xml;base64,')
    expect(maskCustomProperties()).toContain('--mask-circle:url("data:image/svg+xml;base64,')
    expect(maskCustomProperties()).toContain('--mask-heart:')
  })

  it('resolves @import "viewfx" to the v4 CSS entry', async () => {
    const css = await generatePluginCSSFromPackage({
      content: '<html class="vt-fade"></html>'
    })

    expect(css).toContain('.vt-fade{')
    expect(css).toContain('--vt-anim:vt-fade-in')
  })
})
