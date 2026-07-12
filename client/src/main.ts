import './style.css'
import { initGallery, renderGallery } from './gallery'
import { homePageSidebar } from './nav'
import { renderPageLinks } from './page-links'
import { initSidebar, renderDocsShell, renderFooter, renderSidebar } from './shared'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = renderDocsShell(
  renderSidebar(homePageSidebar()),
  `
    <header class="hero hero--minimal" id="top">
      <img class="logo" src="/favicon.png" alt="FlockIt" width="72" height="72" />
      <p class="eyebrow">Unreal Engine 5.8</p>
      <h1>FlockIt</h1>
    </header>

    <section class="showcase" id="gallery">
      ${renderGallery()}
      ${renderPageLinks()}
    </section>

    <section class="section" id="quick-start">
      <h2>Quick start</h2>
      <ol class="steps">
        <li>Create a <strong>Blueprint Class</strong> (Content Browser → Add → Blueprint Class) with parent <strong>Flock Manager</strong>.</li>
        <li>Open the Blueprint — add <strong>Instanced Static Mesh</strong> component(s) for your organism meshes.</li>
        <li>Place the Blueprint in your level. Set <strong>Dimension Mode</strong> and <strong>Simulation Bounds</strong> on the Details panel.</li>
        <li>Pick a <strong>Spawn Preset</strong> or <strong>Custom</strong> + <strong>Initial Species</strong>. See <a href="/env-species.html">Env &amp; species</a> for field detail.</li>
        <li>Enable <strong>Auto Load Preset On Begin Play</strong>, or call <strong>Spawn Initial Species</strong> from the Event Graph.</li>
        <li>On <strong>Tick</strong>, call <strong>Populate Instanced Organism Mesh</strong> on each ISM (turn off <strong>Draw Debug Organisms</strong>).</li>
        <li>Optional: enable <strong>Track Player Pawn As Repulsor</strong> for interactive panic or repulsion.</li>
      </ol>
    </section>

    ${renderFooter()}
  `
)

initSidebar()
initGallery()