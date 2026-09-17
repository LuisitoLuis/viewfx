import { ANIMATION_DURATION } from '../data/timing'
import { playTransition, isDark } from './theme'
import { announce } from './live-region'
import { toastSuccess } from './toast'

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
    url.hash = `t=${Date.now()}`
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

function buildSnippet(gifHref, hold, duration) {
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
  animation: scale ${duration};
  animation-fill-mode: both;
}

@keyframes scale {
  0% {
    mask-size: 0;
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

export function initGifStudio() {
  const root = document.documentElement
  const input = document.getElementById('gif-url')
  const thumb = document.getElementById('gif-thumb')
  const play = document.getElementById('play-btn')
  const duration = document.getElementById('ctrl-duration')
  const size = document.getElementById('ctrl-size')
  const snippet = document.getElementById('class-snippet')
  const htmlSnippet = document.getElementById('html-snippet')
  const copyClasses = document.getElementById('copy-classes')
  const copyUrl = document.getElementById('copy-url')

  if (
    !(input instanceof HTMLInputElement) ||
    !(thumb instanceof HTMLImageElement) ||
    !(duration instanceof HTMLSelectElement) ||
    !(size instanceof HTMLSelectElement) ||
    !play ||
    !snippet ||
    !htmlSnippet ||
    !copyClasses ||
    !copyUrl
  ) {
    return
  }

  const params = new URLSearchParams(window.location.search)
  if (params.get('d') && params.get('d') in ANIMATION_DURATION) duration.value = params.get('d')
  if (SIZE_KEYS.includes(params.get('size') ?? '')) size.value = params.get('size') ?? '50%'
  input.value = params.get('gif') || params.get('gif2') || ''

  root.classList.add('gif-mask')

  const durationCss = () => ANIMATION_DURATION[duration.value] ?? '1000ms'
  const gifHref = () => parseGifLink(input.value)

  const paintThumb = (href) => {
    if (!href) {
      thumb.removeAttribute('src')
      thumb.hidden = true
      return
    }
    thumb.src = href
    thumb.hidden = false
  }

  const syncVars = () => {
    root.style.setProperty('--gif-hold', holdSize(size.value))
    root.style.setProperty('--gif-duration', durationCss())
  }

  const armMask = async () => {
    const href = gifHref()
    if (!href) {
      root.style.removeProperty('--gif-mask')
      root.classList.remove('has-gif-mask')
      syncVars()
      return
    }

    const playHref = restartUrl(href)
    root.style.setProperty('--gif-mask', cssUrl(playHref))
    root.classList.add('has-gif-mask')
    syncVars()

    const probe = new Image()
    probe.src = playHref
    try {
      await probe.decode()
    } catch {
      // Remote GIFs can still work as CSS masks even if decode fails.
    }
  }

  const updateUrl = () => {
    const url = new URL(window.location.href)
    if (duration.value === '1000') url.searchParams.delete('d')
    else url.searchParams.set('d', duration.value)
    if (size.value === '50%') url.searchParams.delete('size')
    else url.searchParams.set('size', size.value)

    const gif = gifHref()
    if (gif) url.searchParams.set('gif', gif)
    else url.searchParams.delete('gif')
    url.searchParams.delete('gif2')

    history.replaceState(null, '', url)
  }

  const updateSnippet = () => {
    snippet.textContent = buildSnippet(gifHref(), holdSize(size.value), durationCss())
    htmlSnippet.textContent = `if (!document.startViewTransition) switchTheme()
document.startViewTransition(switchTheme);`
  }

  const refresh = () => {
    paintThumb(gifHref())
    syncVars()
    updateSnippet()
    updateUrl()
  }

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

  play.addEventListener('click', async () => {
    const href = gifHref()
    if (!href) {
      toastSuccess('Paste a GIF link first')
      return
    }

    play.disabled = true
    try {
      await armMask()
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
      await navigator.clipboard.writeText(window.location.href)
      announce('Share URL copied to clipboard')
      flashLabel(copyUrl, 'URL copied!')
      toastSuccess('Share URL copied to clipboard')
    } catch {
      announce('Could not copy URL')
    }
  })

  thumb.addEventListener('error', () => {
    thumb.hidden = true
  })

  refresh()
}
