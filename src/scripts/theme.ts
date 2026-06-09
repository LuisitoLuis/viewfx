const isDark = () => document.documentElement.classList.contains('dark')

function updateIcons(dark: boolean) {
  const sun = document.getElementById('icon-sun')
  const moon = document.getElementById('icon-moon')
  if (sun && moon) {
    sun.style.display = dark ? 'none' : 'block'
    moon.style.display = dark ? 'block' : 'none'
  }
}

function switchTheme() {
  const dark = !isDark()
  document.documentElement.classList.toggle('dark', dark)
  updateIcons(dark)
}

export function fireToggle() {
  if (!document.startViewTransition) {
    switchTheme()
    return
  }
  document.startViewTransition(switchTheme)
}

export function initTheme() {
  const dark = isDark()
  updateIcons(dark)

  document.getElementById('theme-toggle')
    ?.addEventListener('click', fireToggle)
}
