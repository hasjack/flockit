import './style.css'
import { tutorialsPageSidebar } from './nav'
import { initSidebar, renderDocsShell, renderFooter, renderSidebar } from './shared'
import { renderTutorialIndex } from './tutorials-render'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = renderDocsShell(
  renderSidebar(tutorialsPageSidebar()),
  `
    <header class="hero hero--compact" id="overview">
      <img class="logo logo--sm" src="/favicon.png" alt="FlockIt" width="64" height="64" />
      <p class="eyebrow">Blueprint walkthroughs</p>
      <h1>Tutorials</h1>
      <p class="lede">
        Worked Event Graph examples for common FlockIt setups — pick a walkthrough to get started.
      </p>
    </header>

    ${renderTutorialIndex()}

    ${renderFooter()}
  `
)

initSidebar()