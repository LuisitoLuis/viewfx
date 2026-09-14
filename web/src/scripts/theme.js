import { DEFAULT_EFFECT_CLASS, EFFECTS } from '../data/effects'

export const THEME_KEY = 'viewfx:theme'

const PAGE_EFFECT = DEFAULT_EFFECT_CLASS
const EFFECT_CLASSES = new Set(EFFECTS.map((effect) => effect.className))

const root = () => document.documentElement

const startViewTransition = () => document.startViewTransition

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const isDark = () => root().classList.contains('dark')

function commit(dark, persist) {
  root().classList.toggle('dark', dark)
  syncToggle()
  syncBrowserChrome()

  if (!persist) return

  try {
    localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light')
  } catch {
    // Private browsing modes can refuse writes; the theme still applies.
  }
}

/**
 * Flips the theme through `polygon` on `<html>`.
 * Falls back to an instant swap when the API is missing or the visitor has
 * asked for reduced motion.
 *
 * `persist` is false when the change comes from the OS rather than the
 * visitor, so following the system preference stays sticky.
 */
export function playTransition(dark = !isDark(), persist = true) {
  const el = root()
  for (const cls of [...el.classList]) {
    if (EFFECT_CLASSES.has(cls) && cls !== PAGE_EFFECT) {
      el.classList.remove(cls)
    }
  }
  el.classList.add(PAGE_EFFECT)

  const start = startViewTransition()

  if (!start || prefersReducedMotion()) {
    commit(dark, persist)
    return
  }

  const transition = start.call(document, () => commit(dark, persist))

  // Picking a second effect mid-animation skips the running transition, which
  // rejects every promise it exposes. The theme change itself has already been
  // applied, so there is nothing to recover — just don't leave unhandled
  // rejections in the console.
  for (const settled of [transition?.ready, transition?.updateCallbackDone, transition?.finished]) {
    settled?.catch(() => {})
  }
}

/** Keeps the mobile browser UI tinted to match the page. */
function syncBrowserChrome() {
  const meta = document.querySelector('meta[name="theme-color"]')
  if (!meta) return

  const paper = getComputedStyle(root()).getPropertyValue('--paper').trim()
  if (paper) meta.content = paper
}

function syncToggle() {
  const toggle = document.getElementById('theme-toggle')
  if (!toggle) return

  const label = isDark() ? 'Switch to the light theme' : 'Switch to the dark theme'
  toggle.setAttribute('aria-label', label)
  toggle.setAttribute('title', label)
}

export function initTheme() {
  syncToggle()
  syncBrowserChrome()

  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    playTransition()
  })

  // Any control can replay the current effect by opting in.
  document.addEventListener('click', (event) => {
    const target = event.target
    if (target instanceof Element && target.closest('[data-play-transition]')) {
      playTransition()
    }
  })

  // Follow the OS while the visitor has not expressed a preference.
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    let stored = null
    try {
      stored = localStorage.getItem(THEME_KEY)
    } catch {
      stored = null
    }

    if (!stored) playTransition(event.matches, false)
  })
}
