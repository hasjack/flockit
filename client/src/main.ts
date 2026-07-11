import './style.css'

const pluginRepo = 'https://github.com/hasjack/Flocker'
const docsRepo = 'https://github.com/hasjack/flockit'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<header class="site-header">
  <p class="eyebrow">Unreal Engine 5.8 Plugin</p>
  <h1>FlockIt</h1>
  <p class="lede">
    Curated flocking presets, multi-species swarms, and repulsor-driven panic —
    with a Blueprint-first API for tanks, exhibits, and agent swarms.
  </p>
</header>

<main class="cards">
  <section class="card">
    <h2>Documentation</h2>
    <p>Setup guides, ISM rendering patterns, demo maps, and videos will live here.</p>
    <a class="button" href="${docsRepo}" target="_blank" rel="noreferrer">GitHub repo</a>
  </section>

  <section class="card">
    <h2>Plugin source</h2>
    <p>C++ runtime plugin, presets, migrations, and Fab packaging scripts.</p>
    <a class="button button-secondary" href="${pluginRepo}" target="_blank" rel="noreferrer">Flocker on GitHub</a>
  </section>

  <section class="card">
    <h2>Quick start</h2>
    <ol>
      <li>Add an <code>AFlockManager</code> to your level.</li>
      <li>Pick a spawn preset or configure <code>Initial Species</code>.</li>
      <li>Drive ISMs with <code>Populate Instanced Organism Mesh</code>.</li>
      <li>Enable repulsor tracking for player-driven panic.</li>
    </ol>
  </section>
</main>

<footer class="site-footer">
  <p>Site deploying to <strong>flockit.xyz</strong> via GitHub Pages.</p>
</footer>
`