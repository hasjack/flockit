import './style.css'
import { apiSections, navSections, type ApiEntry } from './api'
import { esc, renderDocsShell, renderFooter, renderSidebar } from './shared'

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

function renderApiSection(section: (typeof apiSections)[number]): string {
  return `
    <section class="docs-section" id="${section.id}">
      <h2>${esc(section.title)}</h2>
      <div class="api-list">
        ${section.entries.map(renderEntry).join('')}
      </div>
    </section>
  `
}

const sidebarLinks = [
  { href: '/', label: 'API reference', active: true },
  { href: '/env-species.html', label: 'Env & species' },
  ...navSections.map((item) => ({ href: `#${item.id}`, label: item.label })),
]

document.querySelector<HTMLDivElement>('#app')!.innerHTML = renderDocsShell(
  renderSidebar(sidebarLinks),
  `
    <header class="docs-hero" id="overview">
      <img class="docs-logo" src="/favicon.png" alt="FlockIt" width="96" height="96" />
      <p class="eyebrow">Unreal Engine 5.8</p>
      <h1>FlockIt</h1>
      <p class="lede">
        Curated flocking presets, multi-species swarms, and repulsor-driven panic.
        Blueprint-first API for tanks, exhibits, and agent swarms.
      </p>
      <p class="hero-links">
        <a class="text-link" href="/env-species.html">Env &amp; species settings →</a>
      </p>
    </header>

    <section class="docs-section" id="quick-start">
      <h2>Quick start</h2>
      <ol class="steps">
        <li>Place an <code>AFlockManager</code> in your level and set <strong>Dimension Mode</strong> and <strong>Simulation Bounds</strong>.</li>
        <li>Choose a <strong>Spawn Preset</strong> or set <strong>Custom</strong> and edit <strong>Initial Species</strong>. See the <a href="/env-species.html">settings reference</a> for field detail.</li>
        <li>Enable <strong>Auto Load Preset On Begin Play</strong>, or call <strong>Spawn Initial Species</strong> from Blueprint.</li>
        <li>Drive an ISM with <strong>Populate Instanced Organism Mesh</strong> each tick (turn off debug draw).</li>
        <li>Enable <strong>Track Player Pawn As Repulsor</strong> for interactive panic or repulsion.</li>
      </ol>
      <div class="callout">
        <strong>ISM pattern.</strong> Use Populate each tick, <em>or</em> BeginPlay Add Instance + Tick Batch Update — not both.
        <code>Get Organism World Transforms</code> returns all organisms on one manager; slice by species for multi-ISM setups.
      </div>
    </section>

    ${apiSections.map(renderApiSection).join('')}

    ${renderFooter()}
  `
)