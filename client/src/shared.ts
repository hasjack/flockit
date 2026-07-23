export const demoRepo = 'https://github.com/hasjack/flockit'
export const fabListing =
  'https://www.fab.com/listings/7c5fcbfb-ff80-4b4a-9b77-688af87f2f12'

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
  children?: SidebarLink[]
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
        <a class="sidebar-pill" href="${fabListing}" target="_blank" rel="noreferrer">Available on Fab</a>
      </div>
    </aside>
  `
}

function renderNavLink(link: SidebarLink, depth: number): string {
  const depthClass = depth === 0 ? 'sidebar-link--nested' : 'sidebar-link--deep'
  const cls = link.active
    ? `sidebar-link ${depthClass} active`
    : `sidebar-link ${depthClass}`
  const anchor = `<a class="${cls}" href="${esc(link.href)}">${esc(link.label)}</a>`

  if (!link.children?.length) return anchor

  return `
    <div class="nav-branch">
      ${anchor}
      <div class="nav-group__children nav-group__children--branch">${renderNavLinks(link.children, depth + 1)}</div>
    </div>
  `
}

function renderNavLinks(links: SidebarLink[], depth = 0): string {
  return links.map((link) => renderNavLink(link, depth)).join('')
}

function renderSidebarItem(item: SidebarItem): string {
  if (item.type === 'link') {
    const cls = item.active ? 'sidebar-link active' : 'sidebar-link'
    return `<a class="${cls}" href="${esc(item.href)}">${esc(item.label)}</a>`
  }

  if (item.type === 'page') {
    const cls = item.active ? 'sidebar-link nav-group__link active' : 'sidebar-link nav-group__link'

    return `
      <div class="nav-group">
        <a class="${cls}" href="${esc(item.href)}">${esc(item.label)}</a>
        <div class="nav-group__children">${renderNavLinks(item.children)}</div>
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
      <p><a href="${demoRepo}" target="_blank" rel="noreferrer">github.com/hasjack/flockit</a></p>
    </footer>
  `
}

export function renderWarning(html: string): string {
  return `
    <div class="callout callout--warning" role="note">
      <span class="callout__icon" aria-hidden="true">⚠</span>
      <div class="callout__body">${html}</div>
    </div>
  `
}

export function renderTutorialFigure(image: string, imageAlt: string): string {
  return `
    <figure class="tutorial__figure">
      <button type="button" class="tutorial__figure-btn" aria-label="View image full size: ${esc(imageAlt)}">
        <img
          class="tutorial__image"
          src="${esc(image)}"
          alt="${esc(imageAlt)}"
          loading="lazy"
        />
      </button>
    </figure>
  `
}

function initTutorialFigures(): void {
  let modal = document.querySelector<HTMLDivElement>('.figure-modal')

  if (!modal) {
    modal = document.createElement('div')
    modal.className = 'figure-modal'
    modal.hidden = true
    modal.innerHTML = `
      <button type="button" class="figure-modal__close" aria-label="Close">×</button>
      <img class="figure-modal__image" alt="" />
    `
    document.body.append(modal)
  }

  const modalImage = modal.querySelector<HTMLImageElement>('.figure-modal__image')!
  const closeButton = modal.querySelector<HTMLButtonElement>('.figure-modal__close')!

  const closeModal = () => {
    modal!.hidden = true
    document.body.classList.remove('figure-modal-open')
    modalImage.removeAttribute('src')
    modalImage.alt = ''
  }

  const openModal = (src: string, alt: string) => {
    modalImage.src = src
    modalImage.alt = alt
    modal!.hidden = false
    document.body.classList.add('figure-modal-open')
    closeButton.focus()
  }

  if (!modal.dataset.bound) {
    modal.dataset.bound = 'true'
    closeButton.addEventListener('click', closeModal)
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeModal()
    })
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !modal!.hidden) closeModal()
    })
  }

  document.querySelectorAll<HTMLButtonElement>('.tutorial__figure-btn').forEach((button) => {
    if (button.dataset.bound) return
    button.dataset.bound = 'true'

    button.addEventListener('click', () => {
      const image = button.querySelector<HTMLImageElement>('.tutorial__image')
      if (!image?.src) return
      openModal(image.src, image.alt)
    })
  })
}

export function initSidebar(): void {
  document.querySelectorAll<HTMLAnchorElement>('.sidebar-summary-link').forEach((link) => {
    link.addEventListener('click', (event) => event.stopPropagation())
  })

  const hash = window.location.hash
  if (hash) {
    document.querySelectorAll<HTMLDetailsElement>('.sidebar-group').forEach((group) => {
      if (group.querySelector(`a[href="${hash}"]`)) group.open = true
    })
  }

  initTutorialFigures()
}