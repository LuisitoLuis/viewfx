const REGION_ID = 'live-region'

/** Long enough for the clear to register, short enough to feel immediate. */
const REANNOUNCE_DELAY = 60

let pending = 0

/**
 * Announces a message to screen readers without moving focus.
 *
 * The region is cleared first because assistive tech ignores a rewrite of
 * identical text, which happens whenever the same effect is replayed. The gap
 * uses a timer rather than `requestAnimationFrame`: frame callbacks are
 * throttled or skipped outright in background tabs.
 */
export function announce(message) {
  const region = document.getElementById(REGION_ID)
  if (!region) return

  window.clearTimeout(pending)
  region.textContent = ''

  pending = window.setTimeout(() => {
    region.textContent = message
  }, REANNOUNCE_DELAY)
}
