import './style.css'
import { envSpeciesPageSidebar } from './nav'
import { esc, initSidebar, renderDocsShell, renderFooter, renderSidebar } from './shared'
import {
  managerConfigFields,
  simulationSettingGroups,
  speciesFields,
  type SettingField,
  type SettingGroup,
} from './settings'

function renderFieldRow(field: SettingField): string {
  const def = field.default
    ? `<td class="table__default"><code>${esc(field.default)}</code></td>`
    : '<td class="table__default">—</td>'

  return `
    <tr>
      <td class="table__name">${esc(field.name)}</td>
      <td class="table__type"><code>${esc(field.type)}</code></td>
      ${def}
      <td class="table__desc">${esc(field.description)}</td>
    </tr>
  `
}

function renderFieldTable(fields: SettingField[]): string {
  return `
    <div class="table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th>Setting</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          ${fields.map(renderFieldRow).join('')}
        </tbody>
      </table>
    </div>
  `
}

function renderGroup(group: SettingGroup): string {
  const intro = group.intro ? `<p class="section-intro">${esc(group.intro)}</p>` : ''
  return `
    <section class="section section--nested" id="${esc(group.id)}">
      <h3>${esc(group.title)}</h3>
      ${intro}
      ${renderFieldTable(group.fields)}
    </section>
  `
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = renderDocsShell(
  renderSidebar(envSpeciesPageSidebar()),
  `
    <header class="hero hero--compact">
      <img class="logo logo--sm" src="/favicon.png" alt="FlockIt" width="64" height="64" />
      <p class="eyebrow">AFlockManager</p>
      <h1>Env &amp; species settings</h1>
      <p class="lede">
        Every simulation and per-species knob on the Flock Manager Details panel —
        what it does, defaults, and how global env settings combine with Species.
      </p>
    </header>

    <section class="section" id="simulation-settings">
      <h2>Simulation settings</h2>
      <p class="section-intro">
        <strong>Simulation Settings</strong> on the manager is <code>Env</code> (<code>FSimConfig</code>).
        These apply to the whole tank. Per-species radii and strengths live under <strong>Species</strong>.
      </p>
      ${simulationSettingGroups.map(renderGroup).join('')}
    </section>

    <section class="section" id="manager-config">
      <h2>Manager config</h2>
      <p class="section-intro">
        Top-level properties on <code>AFlockManager</code> alongside Env — volume, dimensionality, spawn layout,
        repulsor / panic, and optional player bounds (Walls Block Player).
      </p>
      ${renderFieldTable(managerConfigFields)}
    </section>

    <section class="section" id="species-fields">
      <h2>Species fields</h2>
      <p class="section-intro">
        Each entry in <strong>Species</strong> contains a <code>Species</code> struct (<code>FOrgType</code>)
        plus a population <code>Count</code>. Values are copied to organisms at spawn; live edits use <code>Edit Species</code>.
      </p>
      ${renderFieldTable(speciesFields)}
    </section>

    <section class="section" id="species">
      <h2>Species</h2>
      <div class="callout">
        <p><strong>Presets vs Custom.</strong> Changing <code>Selected Spawn Preset</code> in the editor overwrites Species and Simulation Settings. Choose <strong>Custom</strong> to tune by hand. Most presets use <strong>Spread</strong> spawn layout.</p>
        <p><strong>Panic Showcase</strong> also applies panic repulsor settings and turns on <strong>Walls Block Player → Keep Inside</strong> so the pawn stays in the tank while the school scatters.</p>
        <p><strong>Count</strong> per row is the census target when <strong>Spawn On Begin Play</strong> runs or when you call <code>Spawn Species Population</code>.</p>
        <p><strong>Multi-species ISMs.</strong> <code>Get Organism World Transforms</code> returns one flat array for the whole manager. Slice by species order and count from this list when driving separate meshes.</p>
      </div>
    </section>

    <section class="section" id="tuning-notes">
      <h2>Tuning notes</h2>
      <div class="note-grid">
        <article class="note-card">
          <h3>Global × per-species</h3>
          <p>Alignment uses <code>Align Global Scale × Alignment Strength</code>. Cohesion model and K0 are global; cohesion radius/strength are per species. Repulsor push uses global <code>Repulsor Strength × Repulsor Sensitivity</code>; panic speed uses <code>Panic Speed Boost × Panic Reaction</code>. <code>Panic Spook Duration</code> controls how long scatter effects linger after leaving the zone.</p>
        </article>
        <article class="note-card">
          <h3>Organism walls vs player walls</h3>
          <p><code>Env → Wall Margin / Wall Strength</code> are soft forces on organisms only. <code>Walls Block Player</code> is a hard pawn constraint (Keep Inside / Keep Outside) with its own <code>Player Wall Margin</code>. Use <code>Is World Location Inside Simulation Bounds</code> to query without moving anything; call <code>Constrain Player Pawn</code> if you need a one-shot apply outside the automatic tick.</p>
        </article>
        <article class="note-card">
          <h3>Quiet vs busy tanks</h3>
          <p>Raise <code>Drag</code> and lower <code>Accel Scale</code> for drift. Raise <code>Align Saturation</code> or lower alignment strengths to loosen tight balls. <code>Min Cruise Speed</code> stops mid-water hovering.</p>
        </article>
        <article class="note-card">
          <h3>Performance</h3>
          <p><code>Force Update Stride</code> &gt; 1 skips neighbour-force updates on some frames. Start at 2–4 for 200+ organisms. Turn off debug draw when using ISMs.</p>
        </article>
      </div>
    </section>

    ${renderFooter()}
  `
)

initSidebar()