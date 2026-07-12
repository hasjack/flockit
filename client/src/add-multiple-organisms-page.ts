import './style.css'
import { addMultipleOrganismsPageSidebar } from './nav'
import { renderAddMultipleOrganisms } from './add-multiple-organisms-render'
import { initSidebar, renderDocsShell, renderFooter, renderSidebar } from './shared'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = renderDocsShell(
  renderSidebar(addMultipleOrganismsPageSidebar()),
  `
    <header class="hero hero--compact" id="overview">
      <img class="logo logo--sm" src="/favicon.png" alt="FlockIt" width="64" height="64" />
      <p class="eyebrow">Blueprint walkthrough</p>
      <h1>Add multiple organisms</h1>
      <p class="lede">
        Programmatic Instanced Static Mesh setup — one mesh per species, seeded on BeginPlay and updated each tick.
      </p>
    </header>

    ${renderAddMultipleOrganisms()}

    ${renderFooter()}
  `
)

initSidebar()