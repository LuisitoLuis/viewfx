function pagePath() {
  const path = window.location.pathname
  return path === '/index.html' ? '/' : path
}

function clearHash() {
  const next = `${pagePath()}${window.location.search}`
  if (`${window.location.pathname}${window.location.search}${window.location.hash}` === next) return
  history.replaceState(null, '', next)
}

function scrollToSection(id) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const behavior = prefersReducedMotion ? 'auto' : 'smooth'

  if (id === 'top') {
    window.scrollTo({ top: 0, behavior })
    return true
  }

  const el = document.getElementById(id) || document.getElementsByName(id)[0]
  if (!(el instanceof HTMLElement)) return false

  const header = document.querySelector('header')
  const offset = header ? header.getBoundingClientRect().height + 8 : 8
  const y = el.getBoundingClientRect().top + window.scrollY - offset

  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
  window.scrollTo({ top: y, behavior })
  return true
}

function sectionIdFromHref(href) {
  let url
  try {
    url = new URL(href, window.location.href)
  } catch {
    return null
  }

  if (url.origin !== window.location.origin || !url.hash) return null

  const path = url.pathname === '/index.html' ? '/' : url.pathname
  if (path !== pagePath()) return null

  return url.hash.slice(1)
}

export function initSectionNav() {
  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

    const link = event.target instanceof Element ? event.target.closest('a[href]') : null
    if (!link || link.getAttribute('target') === '_blank') return

    const id = sectionIdFromHref(link.getAttribute('href') ?? '')
    if (!id) return

    event.preventDefault()
    scrollToSection(id)
    clearHash()
  })

  const incoming = window.location.hash.slice(1)
  if (!incoming) return

  scrollToSection(incoming)
  clearHash()
}
