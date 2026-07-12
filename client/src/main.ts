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

    ${renderFooter()}
  `
)

initSidebar()
initGallery()