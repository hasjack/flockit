import './style.css'
import { addAnOrganismMeshPageSidebar } from './nav'
import { renderAddAnOrganismMesh } from './add-an-organism-mesh-render'
import { initSidebar, renderDocsShell, renderFooter, renderSidebar } from './shared'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = renderDocsShell(
  renderSidebar(addAnOrganismMeshPageSidebar()),
  `
    <header class="hero hero--compact" id="top">
      <img class="logo logo--sm" src="/favicon.png" alt="FlockIt" width="64" height="64" />
      <p class="eyebrow">Blueprint walkthrough</p>
      <h1>Add an organism mesh</h1>
      <p class="lede">
        Replace debug draw with one Instanced Static Mesh — populate every organism transform each tick in a single call.
      </p>
    </header>

    ${renderAddAnOrganismMesh()}

    ${renderFooter()}
  `
)

initSidebar()