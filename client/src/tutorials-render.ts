import { esc } from './shared'
import { tutorialIndexEntries } from './tutorials'

export function renderTutorialIndex(): string {
  const cards = tutorialIndexEntries
    .map(
      (entry) => `
      <a class="card" href="${esc(entry.href)}">
        <span class="card__title">${esc(entry.title)}</span>
        <span class="card__desc">${esc(entry.description)}</span>
      </a>
    `
    )
    .join('')

  return `
    <nav class="card-grid" aria-label="Tutorial walkthroughs">
      ${cards}
    </nav>
  `
}