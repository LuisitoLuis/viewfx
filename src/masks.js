/**
 * Mask shapes for the ViewFX Tailwind plugin.
 *
 * Declared as readable SVG and emitted as base64 custom properties
 * (`pnpm emit:masks` → `src/masks.css`). Base64 matters: an SVG data URI
 * containing a nested `url(#id)` filter reference breaks CSS minifiers
 * when written literally into a stylesheet.
 */

const svg = (viewBox, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${body}</svg>`

const blur = (deviation) =>
  `<defs><filter id="b"><feGaussianBlur stdDeviation="${deviation}"/></filter></defs>`

export const MASK_SVG = {
  circle: svg('0 0 40 40', '<circle cx="20" cy="20" r="20" fill="#fff"/>'),

  'circle-blur': svg(
    '0 0 40 40',
    `${blur(2)}<circle cx="20" cy="20" r="18" fill="#fff" filter="url(#b)"/>`
  ),

  'corner-tl': svg(
    '0 0 40 40',
    `${blur(0.6)}<circle cx="0" cy="0" r="40" fill="#fff" filter="url(#b)"/>`
  ),

  'corner-tr': svg(
    '0 0 40 40',
    `${blur(0.6)}<circle cx="40" cy="0" r="40" fill="#fff" filter="url(#b)"/>`
  ),

  'corner-bl': svg(
    '0 0 40 40',
    `${blur(0.6)}<circle cx="0" cy="40" r="40" fill="#fff" filter="url(#b)"/>`
  ),

  'corner-br': svg(
    '0 0 40 40',
    `${blur(0.6)}<circle cx="40" cy="40" r="40" fill="#fff" filter="url(#b)"/>`
  ),

  square: svg('0 0 40 40', '<rect x="4" y="4" width="32" height="32" fill="#fff"/>'),

  soft: svg(
    '0 0 40 40',
    `${blur(3.2)}<ellipse cx="20" cy="20" rx="16" ry="12" fill="#fff" filter="url(#b)"/>`
  ),

  diamond: svg('0 0 40 40', '<polygon points="20,0 40,20 20,40 0,20" fill="#fff"/>'),

  hexagon: svg(
    '0 0 100 100',
    '<polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" fill="#fff"/>'
  ),

  star: svg(
    '0 0 100 100',
    '<polygon points="50,0 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="#fff"/>'
  ),

  ink: svg(
    '0 0 100 100',
    '<defs><filter id="t">' +
      '<feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="n"/>' +
      '<feDisplacementMap in="SourceGraphic" in2="n" scale="15" xChannelSelector="R" yChannelSelector="G"/>' +
      '</filter></defs>' +
      '<circle cx="50" cy="50" r="50" fill="#fff" filter="url(#t)"/>'
  ),

  heart: svg(
    '0 0 100 100',
    '<path fill="#fff" d="M50 88C25 65 5 50 5 30 5 15 15 5 30 5c10 0 18 7 20 13 2-6 10-13 20-13 15 0 25 10 25 25 0 20-20 35-45 58Z"/>'
  )
}

function toBase64(markup) {
  return Buffer.from(markup, 'utf8').toString('base64')
}

export function maskVariables() {
  const vars = {}
  for (const [name, markup] of Object.entries(MASK_SVG)) {
    vars[`--mask-${name}`] = `url("data:image/svg+xml;base64,${toBase64(markup)}")`
  }
  return vars
}

/** `:root` declaration block exposing every shape as `--mask-<name>`. */
export function maskCustomProperties() {
  const declarations = Object.entries(maskVariables())
    .map(([name, value]) => `${name}:${value}`)
    .join(';')

  return `:root{${declarations}}`
}
