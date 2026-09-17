import { playTransition, isDark } from './theme'
import { announce } from './live-region'
import { toastSuccess } from './toast'
import { GIF_DURATION } from '../data/gif'

const SIZE_KEYS = ['30%', '50%', '70%', '100%', 'cover']

function cssUrl(url) {
  return `url(${JSON.stringify(url)})`
}

function parseGifLink(value) {
  const trimmed = value.trim()
  if (!trimmed) return ''

  try {
    const url = new URL(trimmed)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return ''
    return url.href
  } catch {
    return ''
  }
}

function restartUrl(href) {
  try {
    const url = new URL(href)
    url.searchParams.set('_t', String(Date.now()))
    return url.href
  } catch {
    return href
  }
}

function flashLabel(button, message) {
  const label = button.querySelector('[data-label]')
  if (!(label instanceof HTMLElement)) return
  const previous = label.textContent ?? ''
  label.textContent = message
  window.setTimeout(() => {
    label.textContent = previous
  }, 1200)
}

function holdSize(value) {
  if (value === 'cover' || value === '100%') return '100vmax'
  if (typeof value === 'string' && value.endsWith('%')) return `${value.slice(0, -1)}vmax`
  return '50vmax'
}

function parseDurationKey(value) {
  if (value && value in GIF_DURATION) return value
  if (value === '1000' || value === '900' || value === '800' || value === '700') return '1s'
  return '3s'
}

export function buildSnippet(gifHref, hold, duration) {
  const src = gifHref || ' '
  return `::view-transition-group(root) {
  animation-timing-function: var(--expo-in);
}

::view-transition-new(root) {
  mask: url('${src}') center / 0 no-repeat;
  animation: scale ${duration};
  animation-fill-mode: both;
}

::view-transition-old(root),
.dark::view-transition-old(root) {
  animation: none;
  z-index: -1;
}

@keyframes scale {
  0% {
    mask-size: 0px;
  }
  10% {
    mask-size: ${hold};
  }
  90% {
    mask-size: ${hold};
  }
  100% {
    mask-size: 2000vmax;
  }
}`
}

function maskSheet(playHref, hold, duration) {
  const mask = cssUrl(playHref)
  return `html.gif-mask,
html.gif-mask.dark {
  --fx-anim: none;
  --fx-anim-old: none;
  --fx-mask: none;
  --fx-old-z: -1;
}

html.gif-mask.theme-swap.has-gif-mask::view-transition-group(root) {
  animation-duration: ${duration};
  animation-timing-function: var(--expo-in);
}

html.gif-mask.theme-swap.has-gif-mask::view-transition-new(root) {
  -webkit-mask-image: ${mask} !important;
  mask-image: ${mask} !important;
  -webkit-mask-position: center !important;
  mask-position: center !important;
  -webkit-mask-repeat: no-repeat !important;
  mask-repeat: no-repeat !important;
  -webkit-mask-origin: border-box !important;
  mask-origin: border-box !important;
  -webkit-mask-size: 0px;
  mask-size: 0px;
  animation: gif-mask-scale ${duration} linear both !important;
}

html.gif-mask.theme-swap.has-gif-mask::view-transition-old(root),
html.gif-mask.theme-swap.has-gif-mask.dark::view-transition-old(root) {
  -webkit-mask-image: none !important;
  mask-image: none !important;
  animation: none !important;
  z-index: -1 !important;
}

@keyframes gif-mask-scale {
  0% {
    -webkit-mask-size: 0px;
    mask-size: 0px;
  }
  10% {
    -webkit-mask-size: ${hold};
    mask-size: ${hold};
  }
  90% {
    -webkit-mask-size: ${hold};
    mask-size: ${hold};
  }
  100% {
    -webkit-mask-size: 2000vmax;
    mask-size: 2000vmax;
  }
}`
}

function decodeImage(href) {
  const probe = new Image()
  const ready = Promise.race([
    new Promise((resolve) => {
      probe.onload = resolve
      probe.onerror = resolve
    }),
    new Promise((resolve) => window.setTimeout(resolve, 350))
  ])
  probe.src = href
  void probe.decode().catch(() => {})
  return ready
}

export function initGifStudio() {
  const root = document.documentElement
  const input = document.getElementById('gif-url')
  const thumb = document.getElementById('gif-thumb')
  const stage = document.getElementById('gif-stage')
  const empty = document.getElementById('gif-empty')
  const play = document.getElementById('play-btn')
  const duration = document.getElementById('ctrl-duration')
  const size = document.getElementById('ctrl-size')
  const snippet = document.getElementById('class-snippet')
  const htmlSnippet = document.getElementById('html-snippet')
  const copyClasses = document.getElementById('copy-classes')
  const copyUrl = document.getElementById('copy-url')
  const clear = document.getElementById('gif-clear')

  if (
    !(input instanceof HTMLInputElement) ||
    !(thumb instanceof HTMLImageElement) ||
    !(stage instanceof HTMLImageElement) ||
    !(duration instanceof HTMLSelectElement) ||
    !(size instanceof HTMLSelectElement) ||
    !play ||
    !snippet ||
    !htmlSnippet ||
    !copyClasses ||
    !copyUrl ||
    !clear
  ) {
    return
  }

  const params = new URLSearchParams(window.location.search)
  duration.value = parseDurationKey(params.get('d'))
  if (SIZE_KEYS.includes(params.get('size') ?? '')) size.value = params.get('size') ?? '50%'
  input.value = ''

  root.classList.add('gif-mask')

  const durationCss = () => GIF_DURATION[duration.value] ?? '3s'
  const gifHref = () => parseGifLink(input.value)

  const syncClear = () => {
    clear.hidden = !input.value.trim()
  }

  const paint = (href) => {
    if (!href) {
      thumb.removeAttribute('src')
      stage.removeAttribute('src')
      thumb.hidden = true
      stage.hidden = true
      if (empty) empty.hidden = false
      return
    }

    thumb.src = href
    stage.src = href
    thumb.hidden = false
    stage.hidden = false
    if (empty) empty.hidden = true
  }

  const syncVars = () => {
    root.style.setProperty('--gif-hold', holdSize(size.value))
    root.style.setProperty('--gif-duration', durationCss())
  }

  const armMask = async ({ restart = false } = {}) => {
    const href = gifHref()
    if (!href) {
      root.style.removeProperty('--gif-mask')
      root.classList.remove('has-gif-mask')
      document.getElementById('gif-mask-sheet')?.remove()
      syncVars()
      return ''
    }

    const playHref = restart ? restartUrl(href) : href
    root.style.setProperty('--gif-mask', cssUrl(playHref))
    root.classList.add('has-gif-mask')
    syncVars()

    let sheet = document.getElementById('gif-mask-sheet')
    if (!(sheet instanceof HTMLStyleElement)) {
      sheet = document.createElement('style')
      sheet.id = 'gif-mask-sheet'
      document.head.appendChild(sheet)
    }
    sheet.textContent = maskSheet(playHref, holdSize(size.value), durationCss())

    await decodeImage(playHref)
    return playHref
  }

  const updateUrl = () => {
    const url = new URL(window.location.href)
    if (duration.value === '3s') url.searchParams.delete('d')
    else url.searchParams.set('d', duration.value)
    if (size.value === '50%') url.searchParams.delete('size')
    else url.searchParams.set('size', size.value)
    url.searchParams.delete('gif')
    url.searchParams.delete('gif2')
    history.replaceState(null, '', url)
  }

  const shareHref = () => {
    const url = new URL(window.location.href)
    const gif = gifHref()
    if (gif) url.searchParams.set('gif', gif)
    else url.searchParams.delete('gif')
    url.searchParams.delete('gif2')
    return url.href
  }

  const updateSnippet = () => {
    snippet.textContent = buildSnippet(gifHref(), holdSize(size.value), durationCss())
    htmlSnippet.textContent = `if (!document.startViewTransition) switchTheme()
document.startViewTransition(switchTheme);`
  }

  const refresh = () => {
    paint(gifHref())
    syncClear()
    syncVars()
    updateSnippet()
    updateUrl()
    void armMask()
  }

  input.addEventListener('input', syncClear)
  input.addEventListener('change', refresh)
  input.addEventListener('paste', () => window.setTimeout(refresh, 0))
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      refresh()
    }
  })

  duration.addEventListener('change', refresh)
  size.addEventListener('change', refresh)

  clear.addEventListener('click', () => {
    input.value = ''
    refresh()
    input.focus()
    announce('GIF removed')
  })

  play.addEventListener('click', async () => {
    const href = gifHref()
    if (!href) {
      toastSuccess('Paste a GIF link first')
      return
    }

    play.disabled = true
    try {
      await armMask({ restart: true })
      await new Promise((resolve) => requestAnimationFrame(() => resolve()))
      playTransition(!isDark())
      announce('GIF mask transition played')
    } finally {
      play.disabled = false
    }
  })

  copyClasses.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(buildSnippet(gifHref(), holdSize(size.value), durationCss()))
      announce('CSS copied to clipboard')
      flashLabel(copyClasses, 'Copied!')
      toastSuccess('CSS copied to clipboard')
    } catch {
      announce('Could not copy CSS')
    }
  })

  copyUrl.addEventListener('click', async () => {
    updateUrl()
    try {
      await navigator.clipboard.writeText(shareHref())
      announce('Share URL copied to clipboard')
      flashLabel(copyUrl, 'URL copied!')
      toastSuccess('Share URL copied to clipboard')
    } catch {
      announce('Could not copy URL')
    }
  })

  thumb.addEventListener('error', () => {
    if (thumb.getAttribute('src') !== gifHref()) return
    thumb.hidden = true
  })
  stage.addEventListener('error', () => {
    if (stage.getAttribute('src') !== gifHref()) return
    stage.hidden = true
    if (empty) empty.hidden = false
  })

  refresh()
}
