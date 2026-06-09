import type { Effect } from '../data/effects'

function openModal(eff: Effect) {
  document.getElementById('modal-title')!.textContent = `${eff.id}.css`
  document.getElementById('modal-code-content')!.textContent = eff.css
  document.getElementById('code-modal')!.classList.add('open')
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  document.getElementById('code-modal')!.classList.remove('open')
  document.body.style.overflow = ''
  const btn = document.getElementById('btn-copy')!
  btn.classList.remove('copied')
  btn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy`
}

function copyCode() {
  const code = document.getElementById('modal-code-content')!.textContent || ''
  navigator.clipboard.writeText(code).then(() => {
    const btn = document.getElementById('btn-copy')!
    btn.classList.add('copied')
    btn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copied!`
    setTimeout(() => {
      btn.classList.remove('copied')
      btn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy`
    }, 2000)
  })
}

export function initModal() {
  document.getElementById('btn-close-modal')?.addEventListener('click', closeModal)
  document.getElementById('modal-backdrop')?.addEventListener('click', closeModal)
  document.getElementById('btn-copy')?.addEventListener('click', copyCode)
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal() })
}

export function openEffectModal(id: string, effects: Effect[]) {
  const eff = effects.find(e => e.id === id)
  if (eff) openModal(eff)
}
