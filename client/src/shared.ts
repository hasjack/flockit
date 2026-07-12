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

export type SidebarGroup = {
  label: string
  href?: string
  open?: boolean
  children: SidebarLink[]
}

export type SidebarPage = {
  href: string
  label: string
  active?: boolean
  children: SidebarLink[]
}

export type SidebarItem =
  | ({ type: 'link' } & SidebarLink)
  | ({ type: 'page' } & SidebarPage)
  | ({ type: 'group' } & SidebarGroup)

export function renderSidebar(items: SidebarItem[]): string {
  const nav = items.map(renderSidebarItem).join('')

  return `
    <aside class="sidebar">
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

function renderSidebarItem(item: SidebarItem): string {
  if (item.type === 'link') {
    const cls = item.active ? 'sidebar-link active' : 'sidebar-link'
    return `<a class="${cls}" href="${esc(item.href)}">${esc(item.label)}</a>`
  }

  if (item.type === 'page') {
    const cls = item.active ? 'sidebar-link nav-group__link active' : 'sidebar-link nav-group__link'
    const children = item.children
      .map((child) => {
        const childCls = child.active
          ? 'sidebar-link sidebar-link--nested active'
          : 'sidebar-link sidebar-link--nested'
        return `<a class="${childCls}" href="${esc(child.href)}">${esc(child.label)}</a>`
      })
      .join('')

    return `
      <div class="nav-group">
        <a class="${cls}" href="${esc(item.href)}">${esc(item.label)}</a>
        <div class="nav-group__children">${children}</div>
      </div>
    `
  }

  const openAttr = item.open === false ? '' : ' open'
  const heading = item.href
    ? `<a class="sidebar-summary-link" href="${esc(item.href)}">${esc(item.label)}</a>`
    : `<span class="sidebar-summary-label">${esc(item.label)}</span>`

  const children = item.children
    .map((child) => {
      const cls = child.active ? 'sidebar-link sidebar-link--nested active' : 'sidebar-link sidebar-link--nested'
      return `<a class="${cls}" href="${esc(child.href)}">${esc(child.label)}</a>`
    })
    .join('')

  return `
    <details class="sidebar-group"${openAttr}>
      <summary class="sidebar-summary">${heading}</summary>
      <div class="sidebar-children">${children}</div>
    </details>
  `
}

export function renderDocsShell(sidebar: string, main: string): string {
  return `<div class="layout">${sidebar}<main class="main">${main}</main></div>`
}

export function renderFooter(): string {
  return `
    <footer class="footer">
      <p><a href="https://hasjack.github.io/flockit/">hasjack.github.io/flockit</a></p>
    </footer>
  `
}

export function initSidebar(): void {
  document.querySelectorAll<HTMLAnchorElement>('.sidebar-summary-link').forEach((link) => {
    link.addEventListener('click', (event) => event.stopPropagation())
  })

  const hash = window.location.hash
  if (!hash) return

  document.querySelectorAll<HTMLDetailsElement>('.sidebar-group').forEach((group) => {
    if (group.querySelector(`a[href="${hash}"]`)) group.open = true
  })
}