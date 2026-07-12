import { esc } from './shared'

const pages = [
  {
    href: '/api.html',
    title: 'API reference',
    description: 'Full Blueprint API — properties, functions, enums and structs for AFlockManager.',
  },
  {
    href: '/env-species.html',
    title: 'Env & species',
    description: 'Every simulation setting and per-species field on the Flock Manager Details panel.',
  },
]

export function renderPageLinks(): string {
  const cards = pages
    .map(
      (page) => `
      <a class="card" href="${esc(page.href)}">
        <span class="card__title">${esc(page.title)}</span>
        <span class="card__desc">${esc(page.description)}</span>
      </a>
    `
    )
    .join('')

  return `
    <nav class="card-grid" id="docs" aria-label="Documentation pages">
      ${cards}
    </nav>
  `
}