import './style.css'
import { quickStartPageSidebar } from './nav'
import { renderQuickStartSections } from './quick-start-render'
import { initSidebar, renderDocsShell, renderFooter, renderSidebar } from './shared'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = renderDocsShell(
  renderSidebar(quickStartPageSidebar()),
  `
    <header class="hero hero--compact" id="overview">
      <img class="logo logo--sm" src="/favicon.png" alt="FlockIt" width="64" height="64" />
      <p class="eyebrow">Getting started</p>
      <h1>Quick start</h1>
      <p class="lede">
        Install and enable FlockIt, create a Flock Manager Blueprint, and place your first flock in a level.
      </p>
    </header>

    ${renderQuickStartSections()}

    ${renderFooter()}
  `
)

initSidebar()