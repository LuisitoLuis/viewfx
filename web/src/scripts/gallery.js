import { announce } from './live-region'
import { playTransition } from './theme'

export const EFFECT_KEY = 'viewfx:effect'

const EFFECT_CLASS = /^vt-(?!duration-|delay-|steps-)/

function rootEffectClass() {
  return [...document.documentElement.classList].find((cls) => EFFECT_CLASS.test(cls))
}

function rootEffectId() {
  return rootEffectClass()?.slice(3)
}

function setRootEffect(id) {
  const root = document.documentElement
  const next = `vt-${id}`

  for (const cls of [...root.classList]) {
    if (EFFECT_CLASS.test(cls)) root.classList.remove(cls)
  }

  root.classList.add(next)
}

const ANNOUNCE_DELAY = 500

const cards = () => Array.from(document.querySelectorAll('.fx-card'))
const visibleSelects = () =>
  Array.from(document.querySelectorAll('.fx-card:not([hidden]) .fx-select'))

/**
 * Applies an effect and, unless restoring state on load, immediately replays
 * it by flipping the theme — the effect only exists while the theme changes,
 * so selecting without playing would give no feedback.
 */
function selectEffect(id, { play = true } = {}) {
  setRootEffect(id)

  try {
    localStorage.setItem(EFFECT_KEY, id)
  } catch {
    // Preference simply will not survive a reload.
  }

  let name = id

  for (const card of cards()) {
    const isCurrent = card.dataset.fx === id
    const select = card.querySelector('.fx-select')

    card.classList.toggle('is-current', isCurrent)

    if (isCurrent) {
      name = card.dataset.name ?? id
      select?.setAttribute('aria-current', 'true')
    } else {
      select?.removeAttribute('aria-current')
    }
  }

  if (play) {
    const className = `vt-${id}`
    void navigator.clipboard.writeText(className).then(
      () => announce(`${name} applied, ${className} copied`),
      () => announce(`${name} applied`)
    )
    playTransition()
  }
}

function initSelection() {
  const grid = document.getElementById('effect-grid')
  if (!grid) return

  grid.addEventListener('click', (event) => {
    const target = event.target
    if (!(target instanceof Element)) return

    const select = target.closest('.fx-select')
    const id = select?.closest('.fx-card')?.dataset.fx

    if (id) selectEffect(id)
  })

  // Arrow keys walk the gallery so it is not 21 tab stops to cross.
  // Rows wrap, so left/up and right/down are simply previous and next.
  grid.addEventListener('keydown', (event) => {
    const step =
      { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key] ?? 0

    if (!step && event.key !== 'Home' && event.key !== 'End') return

    const selects = visibleSelects()
    const index = selects.findIndex((select) => select === document.activeElement)
    if (index === -1) return

    event.preventDefault()

    const next =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? selects.length - 1
          : (index + step + selects.length) % selects.length

    selects[next]?.focus()
  })
}

function initFilters() {
  const search = document.querySelector('#effect-search')
  // `data-filter`, not `data-technique`: the cards carry that one.
  const chips = Array.from(document.querySelectorAll('[data-filter]'))
  const empty = document.getElementById('effect-empty')
  const reset = document.getElementById('effect-reset')

  let technique = 'all'
  let announceTimer = 0

  function apply() {
    const query = search?.value.trim().toLowerCase() ?? ''
    let visible = 0

    for (const card of cards()) {
      const matchesQuery = !query || (card.dataset.search ?? '').includes(query)
      const matchesTechnique = technique === 'all' || card.dataset.technique === technique

      card.hidden = !(matchesQuery && matchesTechnique)
      if (!card.hidden) visible += 1
    }

    if (empty) empty.hidden = visible > 0

    // Debounced so typing does not produce an announcement per keystroke.
    window.clearTimeout(announceTimer)
    announceTimer = window.setTimeout(() => {
      announce(visible === 1 ? '1 effect shown' : `${visible} effects shown`)
    }, ANNOUNCE_DELAY)
  }

  search?.addEventListener('input', apply)

  for (const chip of chips) {
    chip.addEventListener('click', () => {
      technique = chip.dataset.filter ?? 'all'

      for (const other of chips) {
        other.setAttribute('aria-pressed', String(other === chip))
      }

      apply()
    })
  }

  reset?.addEventListener('click', () => {
    if (search) search.value = ''
    technique = 'all'

    for (const chip of chips) {
      chip.setAttribute('aria-pressed', String(chip.dataset.filter === 'all'))
    }

    apply()
    search?.focus()
  })
}

function setVar(el, name, value) {
  if (value) el.style.setProperty(name, value)
  else el.style.removeProperty(name)
}

function initPreviewControls() {
  const gallery = document.querySelector('.fx-gallery')
  const duration = document.querySelector('#preview-duration')
  const delay = document.querySelector('#preview-delay')
  const steps = document.querySelector('#preview-steps')
  const playAll = document.querySelector('#play-all')
  if (!gallery || !duration || !delay || !steps || !playAll) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

  function applyTiming() {
    const root = document.documentElement
    const durationValue = duration.value
    const delayValue = delay.value
    const stepsValue = steps.value
    const delayOrNull = delayValue && delayValue !== '0ms' ? delayValue : null
    const stepsOrNull = stepsValue && stepsValue !== '0' ? `steps(${stepsValue})` : null

    setVar(gallery, '--gallery-duration', durationValue || null)
    setVar(gallery, '--gallery-delay', delayOrNull)
    setVar(gallery, '--gallery-ease', stepsOrNull)

    setVar(root, '--vt-duration-override', durationValue || null)
    setVar(root, '--vt-delay', delayOrNull)
    setVar(root, '--vt-ease-override', stepsOrNull)
  }

  function applyPlayAll(silent = false) {
    if (reduced.matches) {
      playAll.checked = false
      playAll.disabled = true
      gallery.toggleAttribute('data-play-all', false)
      return
    }

    playAll.disabled = false
    gallery.toggleAttribute('data-play-all', playAll.checked)

    if (silent) return

    announce(
      playAll.checked
        ? 'Play all enabled. All previews loop continuously.'
        : 'Play all disabled. Previews play on hover or focus.'
    )
  }

  duration.addEventListener('change', applyTiming)
  delay.addEventListener('change', applyTiming)
  steps.addEventListener('change', applyTiming)
  playAll.addEventListener('change', () => applyPlayAll())
  reduced.addEventListener('change', () => applyPlayAll())
  applyTiming()
  applyPlayAll(true)
}


export function initGallery() {
  let stored = null
  try {
    stored = localStorage.getItem(EFFECT_KEY)
  } catch {
    stored = null
  }

  // A stored id can outlive its effect, so fall back to the server-rendered one.
  const isKnown =
    stored && document.querySelector(`.fx-card[data-fx="${CSS.escape(stored)}"]`) !== null
  const current = isKnown ? stored : rootEffectId()

  if (current) selectEffect(current, { play: false })

  initSelection()
  initFilters()
  initPreviewControls()
}
