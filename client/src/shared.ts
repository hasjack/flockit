export const demoRepo = 'https://github.com/hasjack/flockit'

export function esc(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

export type SidebarLink = {
  href: string
  label: string
  active?: boolean
}

export function renderSidebar(links: SidebarLink[]): string {
  const nav = links
    .map((item) => {
      const cls = item.active ? 'sidebar-link active' : 'sidebar-link'
      return `<a class="${cls}" href="${esc(item.href)}">${esc(item.label)}</a>`
    })
    .join('')

  return `
    <aside class="docs-sidebar">
      <a class="sidebar-brand" href="/">
        <img src="/favicon.png" alt="" width="32" height="32" />
        <span>FlockIt</span>
      </a>
      <nav class="sidebar-nav" aria-label="Documentation">
        ${nav}
      </nav>
      <div class="sidebar-footer">
        <a class="sidebar-link subtle" href="${demoRepo}" target="_blank" rel="noreferrer">Demo project</a>
        <span class="sidebar-pill">Fab — coming soon</span>
      </div>
    </aside>
  `
}

export function renderDocsShell(sidebar: string, main: string): string {
  return `<div class="docs-layout">${sidebar}<main class="docs-main">${main}</main></div>`
}

export function renderFooter(): string {
  return `
    <footer class="site-footer">
      <p><a href="https://hasjack.github.io/flockit/">hasjack.github.io/flockit</a></p>
    </footer>
  `
}