export function getInitialTheme() {
  const root = document.documentElement
  if (root.classList.contains('light')) return 'light'
  return 'dark'
}

export function applyTheme(nextTheme) {
  const root = document.documentElement
  root.classList.toggle('dark', nextTheme === 'dark')
  root.classList.toggle('light', nextTheme === 'light')
  localStorage.setItem('theme', nextTheme)
}

