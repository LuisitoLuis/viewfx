export const THEME_KEY = 'viewfx:theme'

const THEME_MODES = ['auto', 'dark', 'light']

const root = () => document.documentElement

const startViewTransition = () => document.startViewTransition

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const prefersDark = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches

export const isDark = () => root().classList.contains('dark')

function isThemeMode(value) {
  return value === 'light' || value === 'dark' || value === 'auto'
}

function readStoredMode() {
  try {
    const stored = localStorage.getItem(THEME_KEY)
    return isThemeMode(stored) ? stored : 'auto'
  } catch {
    return 'auto'
  }
}

function resolveDark(mode) {
  return mode === 'auto' ? prefersDark() : mode === 'dark'
}

function nextMode(mode) {
  return THEME_MODES[(THEME_MODES.indexOf(mode) + 1) % THEME_MODES.length]
}

function commit(dark, persist, mode) {
  const resolvedMode = mode ?? (persist ? (dark ? 'dark' : 'light') : readStoredMode())

  root().classList.toggle('dark', dark)
  root().dataset.themeMode = resolvedMode
  syncToggle()
  syncBrowserChrome()

  if (!persist) return

  try {
    localStorage.setItem(THEME_KEY, resolvedMode)
  } catch {
    // Private browsing modes can refuse writes; the theme still applies.
  }
}

/**
 * Flips the theme through the effect class currently on `<html>`.
 * Does not rewrite effect utilities — the playground or page owns those.
 * Falls back to an instant swap when the API is missing or the visitor has
 * asked for reduced motion.
 *
 * `persist` is false when the change comes from the OS rather than the
 * visitor, so following the system preference stays sticky.
 *
 * @param {boolean} [dark]
 * @param {boolean} [persist]
 * @param {'light' | 'dark' | 'auto'} [mode]
 */
export function playTransition(dark = !isDark(), persist = true, mode) {
  const el = root()
  const start = startViewTransition()

  if (!start || prefersReducedMotion()) {
    commit(dark, persist, mode)
    return
  }

  // Marks this as a theme wipe so page-route fades do not override the effect.
  el.classList.add('theme-swap')
  const clearSwap = () => el.classList.remove('theme-swap')

  const transition = start.call(document, () => commit(dark, persist, mode))
  transition?.finished.then(clearSwap, clearSwap)

  // Picking a second effect mid-animation skips the running transition, which
  // rejects every promise it exposes. The theme change itself has already been
  // applied, so there is nothing to recover — just don't leave unhandled
  // rejections in the console.
  for (const settled of [transition?.ready, transition?.updateCallbackDone, transition?.finished]) {
    settled?.catch(() => {})
  }
}

function cycleTheme() {
  const mode = nextMode(readStoredMode())
  playTransition(resolveDark(mode), true, mode)
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

  const mode = root().dataset.themeMode || readStoredMode()
  const labels = {
    auto: 'Switch to the dark theme',
    dark: 'Switch to the light theme',
    light: 'Use the system theme'
  }
  const label = labels[mode] ?? labels.auto
  toggle.setAttribute('aria-label', label)
  toggle.setAttribute('title', label)
}

export function initTheme() {
  root().dataset.themeMode = readStoredMode()
  syncToggle()
  syncBrowserChrome()

  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    cycleTheme()
  })

  // Any control can replay the current effect by opting in.
  document.addEventListener('click', (event) => {
    const target = event.target
    if (target instanceof Element && target.closest('[data-play-transition]')) {
      playTransition()
    }
  })

  // Follow the OS while the visitor is in auto mode.
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    if (readStoredMode() === 'auto') playTransition(event.matches, false, 'auto')
  })
}
