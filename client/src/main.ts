import './style.css'

const demoRepo = 'https://github.com/hasjack/flockit'

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
    <p>Setup guides, ISM rendering patterns, demo maps, and videos.</p>
    <a class="button" href="${demoRepo}" target="_blank" rel="noreferrer">Demo project</a>
  </section>

  <section class="card">
    <h2>Get the plugin</h2>
    <p>Runtime plugin for UE 5.8 — presets, multi-species, repulsor and panic modes.</p>
    <span class="button button-secondary button-disabled">Fab — coming soon</span>
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
  <p><a href="https://flockit.xyz">flockit.xyz</a></p>
</footer>
`