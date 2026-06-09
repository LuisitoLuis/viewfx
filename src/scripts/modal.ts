import type { Effect } from '../data/effects'

export function initModal() {
  // Modal open/close/copy logic is handled inline in CodeModal.astro
  // This module only provides the openEffectModal entry point
}

export function openEffectModal(id: string, effects: Effect[]) {
  const eff = effects.find(e => e.id === id)
  if (!eff) return

  document.dispatchEvent(new CustomEvent('open-effect-modal', {
    detail: { title: `${eff.id}.css`, css: eff.css }
  }))
}
