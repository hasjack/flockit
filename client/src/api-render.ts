import { apiSections, type ApiEntry } from './api'
import { esc } from './shared'

function kindLabel(kind: ApiEntry['kind']): string {
  switch (kind) {
    case 'function':
      return 'Function'
    case 'property':
      return 'Property'
    case 'delegate':
      return 'Delegate'
    case 'enum':
      return 'Enum'
    case 'struct':
      return 'Struct'
  }
}

function renderEntry(entry: ApiEntry): string {
  const signature = entry.signature
    ? `<code class="api-signature">${esc(entry.signature)}</code>`
    : ''

  return `
    <article class="api-entry">
      <div class="api-entry-head">
        <h3 class="api-name">${esc(entry.name)}</h3>
        <span class="api-badge">${kindLabel(entry.kind)}</span>
      </div>
      ${signature}
      <p class="api-desc">${esc(entry.description)}</p>
    </article>
  `
}

export function renderApiSections(): string {
  return apiSections
    .map(
      (section) => `
    <section class="section" id="${section.id}">
      <h2>${esc(section.title)}</h2>
      <div class="api-list">
        ${section.entries.map(renderEntry).join('')}
      </div>
    </section>
  `
    )
    .join('')
}