/**
 * Code viewer built on the native `<dialog>`, which brings the focus trap,
 * Escape handling, inert background and focus restore for free.
 *
 * Each card ships its highlighted snippet in a `<template>`; the dialog clones it
 * on open and drops it on close, so 21 code blocks never sit in the layout.
 */
export function initCodeDialog() {
  const dialog = document.querySelector('#code-dialog')
  if (!dialog) return

  const title = dialog.querySelector('#code-dialog-title')
  const body = dialog.querySelector('[data-dialog-body]')
  if (!title || !body) return

  document.addEventListener('click', (event) => {
    const target = event.target
    if (!(target instanceof Element)) return

    const trigger = target.closest('[data-open-code]')
    if (!trigger) return

    const card = trigger.closest('.fx-card')
    const template = card?.querySelector('template[data-code]')
    if (!card || !template) return

    title.textContent = card.dataset.name ?? 'Code'
    body.replaceChildren(template.content.cloneNode(true))
    dialog.showModal()
  })

  // Clicks land on the dialog element itself only when they hit the backdrop.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close()
  })

  dialog.addEventListener('close', () => {
    body.replaceChildren()
  })
}
