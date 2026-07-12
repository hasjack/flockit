import './style.css'
import { renderApiSections } from './api-render'
import { apiPageSidebar } from './nav'
import { initSidebar, renderDocsShell, renderFooter, renderSidebar } from './shared'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = renderDocsShell(
  renderSidebar(apiPageSidebar()),
  `
    <header class="hero hero--compact" id="overview">
      <img class="logo logo--sm" src="/favicon.png" alt="FlockIt" width="64" height="64" />
      <p class="eyebrow">AFlockManager</p>
      <h1>API reference</h1>
      <p class="lede">
        Blueprint-callable properties, functions, enums and structs exposed by the FlockIt plugin.
      </p>
    </header>

    ${renderApiSections()}

    ${renderFooter()}
  `
)

initSidebar()