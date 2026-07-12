import type { SidebarLink } from './shared'

const ISM_DOC =
  'https://dev.epicgames.com/documentation/unreal-engine/instanced-static-mesh-component-in-unreal-engine'

const ism = `<a class="text-link" href="${ISM_DOC}" target="_blank" rel="noreferrer">Instanced Static Mesh</a>`

export type TutorialFigure = {
  image: string
  imageAlt: string
}

export type TutorialPart = {
  id: string
  title: string
  warning?: string
  figure?: TutorialFigure
  steps: string[]
}

export const addMultipleOrganismsIntro = `Follow-on from <a class="text-link" href="/add-an-organism-mesh.html">Add an organism mesh</a>: when each species needs a different static mesh, create one ${ism} per species on BeginPlay, seed instances once, then update transforms each tick. More draw calls than <strong>Populate Instanced Organism Mesh</strong>, but each species gets its own asset.`

export const addMultipleOrganismsParts: TutorialPart[] = [
  {
    id: 'ism-array-variable',
    title: 'ISMeshes array variable',
    steps: [
      'In your <strong>Flock Manager</strong> Blueprint, open the <strong>Variables</strong> panel and add a new variable named <code>ISMeshes</code>.',
      'Set the variable type to <strong>Instanced Static Mesh Component</strong> (object reference) and click the grid icon to make it an <strong>array</strong>.',
      'Compile the Blueprint so the array is ready to receive components from the Event Graph.',
    ],
  },
  {
    id: 'one-ism-per-species',
    title: 'One ISM per species',
    figure: {
      image: '/tutorials/programatic-ism.jpg',
      imageAlt:
        'Blueprint graph: Event BeginPlay loops Species, adds an Instanced Static Mesh Component per entry, sets its static mesh, and appends it to an ISMeshes array.',
    },
    steps: [
      'Turn off <strong>Draw Debug Organisms</strong> on the manager.',
      'Leave <strong>Spawn On Begin Play</strong> on with a <strong>Spawn Preset</strong> so organisms exist when this loop runs.',
      'On <strong>Event BeginPlay</strong>, right-click in the Event Graph and add <strong>Get Species</strong> — or drag <strong>Species</strong> from the <strong>Details</strong> panel with the Blueprint root selected. Wire the array into a <strong>For Each Loop</strong>.',
      `From <strong>Loop Body</strong>, call <strong>Add Instanced Static Mesh Component</strong>, then <strong>Set Static Mesh</strong> on the return value — pick a mesh (the example uses <strong>Cone</strong>).`,
      '<strong>ADD</strong> the component to <code>ISMeshes</code> so you can reach it later from Tick.',
    ],
  },
  {
    id: 'seed-instances-beginplay',
    title: 'Seed instances on BeginPlay',
    warning:
      'This section adds <strong>Spawn Species</strong> to the species loop — ensure <strong>Spawn On Begin Play</strong> is switched off, or organisms will spawn twice.',
    figure: {
      image: '/tutorials/programatic-ism-beginplay.jpg',
      imageAlt:
        'Blueprint graph: after the species loop, Get Organism Transforms feeds nested loops that call Add Instance on the matching ISM from ISMeshes.',
    },
    steps: [
      'Add a <code>Populations</code> integer array. In the species loop, call <strong>Spawn Species</strong>, then <strong>ADD</strong> each species <strong>Count</strong> to <code>Populations</code> — one entry per ISM, same order as <code>ISMeshes</code>.',
      'From the species loop <strong>Completed</strong> pin, call <strong>Get Organism Transforms</strong> (<strong>Target</strong> = <code>self</code>).',
      'Set <strong>Instance Scale</strong> (the example uses <code>0.02</code>, <code>0.02</code>, <code>0.02</code>), enable <strong>Orient to Velocity</strong>, and set <strong>Forward Axis</strong> to match your asset (the example uses <strong>+Z</strong>).',
      '<strong>For Each Loop</strong> over <strong>Out Transforms</strong>. Use the loop <strong>Array Index</strong> with <code>Populations</code> to decide which <code>ISMeshes</code> entry owns this organism.',
      'The screenshot uses a <strong>For Each Loop with Break</strong> over <code>Populations</code> — walk cumulative counts until the index falls inside a species slot.',
      '<strong>GET</strong> the matching ISM from <code>ISMeshes</code> and call <strong>Add Instance</strong> with the transform element. Leave <strong>World Space</strong> off for sim-local positions.',
    ],
  },
  {
    id: 'update-on-tick',
    title: 'Update on Tick',
    figure: {
      image: '/tutorials/programatic-ism-ontick.jpg',
      imageAlt:
        'Blueprint graph: Event Tick calls Get Organism Transforms and routes Update Instance Transform to the correct ISM via Populations and ISMeshes.',
    },
    steps: [
      'Add <strong>Event Tick</strong> to the same Blueprint.',
      'Each tick, call <strong>Get Organism Transforms</strong> with the same <strong>Instance Scale</strong>, <strong>Orient to Velocity</strong>, and <strong>Forward Axis</strong> as BeginPlay.',
      '<strong>For Each Loop</strong> over <strong>Out Transforms</strong> again, using the same index routing through <code>Populations</code> and <code>ISMeshes</code>.',
      'Compute the per-ISM <strong>Instance Index</strong> by subtracting the population offset for earlier species.',
      `Call <strong>Update Instance Transform</strong> on the routed ISM. Keep <strong>World Space</strong> consistent with <strong>Add Instance</strong>.`,
    ],
  },
  {
    id: 'refactor',
    title: 'Refactor',
    figure: {
      image: '/tutorials/programatic-ism-refactor.jpg',
      imageAlt:
        'Blueprint graph: shared Instance Scale variable, Add Population during the species loop, and Get Mesh Index / Get Instance Index helpers on BeginPlay and Tick.',
    },
    steps: [
      'Three helper functions are created — <strong>Add Population</strong>, <strong>Get Mesh Index</strong>, and <strong>Get Instance Index</strong> — for a cleaner Event Graph.',
      'Move <strong>Instance Scale</strong> to a Blueprint variable — wire it into both <strong>Get Organism Transforms</strong> calls so BeginPlay and Tick stay in sync.',
    ],
  },
]

export function addMultipleOrganismsNavLinks(): SidebarLink[] {
  return addMultipleOrganismsParts.map((part) => ({
    href: `#${part.id}`,
    label: part.title,
  }))
}