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
  intro?: string
  figure: TutorialFigure
  steps: string[]
}

export const addAnOrganismMeshParts: TutorialPart[] = [
  {
    id: 'populate-organism-mesh',
    title: 'Populate on Tick',
    intro: `The most memory-efficient way to replace debug draw is one ${ism} for the whole flock. <strong>Populate Instanced Organism Mesh</strong> writes every organism transform in a single call each frame — one draw call, one instance buffer. When every species shares the same mesh, this is the pattern to use. If each species needs its own asset, see <a class="text-link" href="/add-multiple-organisms.html">Add multiple organisms</a>.`,
    figure: {
      image: '/tutorials/populate-ism.jpg',
      imageAlt:
        'Blueprint graph: Event Tick calls Populate Instanced Organism Mesh on the Flock Manager with an Instanced Static Mesh component wired in.',
    },
    steps: [
      `Open your <strong>Flock Manager</strong> Blueprint and add an ${ism} component — assign your organism static mesh and material.`,
      'Turn off <strong>Draw Debug Organisms</strong> on the manager.',
      'Leave <strong>Spawn On Begin Play</strong> on with a <strong>Spawn Preset</strong> so organisms exist when Play starts.',
      'In the <strong>Event Graph</strong>, add <strong>Event Tick</strong> and call <strong>Populate Instanced Organism Mesh</strong> (<strong>Target</strong> = <code>self</code>).',
      `Wire your ${ism} component into <strong>Instance Mesh</strong>.`,
      'Set <strong>Instance Scale</strong> to match your asset (the example uses <code>0.1</code>, <code>0.1</code>, <code>0.2</code>).',
      'Enable <strong>World Space</strong> and <strong>Orient to Velocity</strong> if the mesh should face its movement direction — set <strong>Forward Axis</strong> to match your asset (the example uses <strong>+Z</strong>).',
    ],
  },
  {
    id: 'spawn-species',
    title: 'Spawn Species (manual)',
    intro:
      'Only when <strong>Spawn On Begin Play</strong> is off. With the bool on, the manager spawns from <strong>Species</strong> automatically in C++ — do not add this graph. Use this walkthrough when you want explicit control (e.g. spawn on a trigger, or after loading data).',
    figure: {
      image: '/tutorials/spawn-species.jpg',
      imageAlt:
        'Blueprint graph: Event BeginPlay drives a For Each Loop over Species, calling Spawn Species each iteration.',
    },
    steps: [
      'Open your <strong>Flock Manager</strong> Blueprint (for example <code>BP_FlockIt</code>) and switch to the <strong>Event Graph</strong>.',
      'Add <strong>Event BeginPlay</strong>, then right-click in the Event Graph and add <strong>Get Species</strong> — or drag <strong>Species</strong> from the <strong>Details</strong> panel with the Blueprint root selected.',
      'Insert a <strong>For Each Loop</strong> and wire <strong>Species</strong> to its <strong>Array</strong> input.',
      'From <strong>Loop Body</strong>, call <strong>Spawn Species</strong> with <strong>Target</strong> set to <code>self</code>.',
      'Wire the loop <strong>Array Element</strong> into <strong>Species</strong>. Use <strong>Break FSpeciesSpawnConfig</strong> on the element to split <strong>Species</strong> and <strong>Count</strong> if the pins are not exposed directly.',
      'Turn off <strong>Spawn On Begin Play</strong> first — if both run you will spawn twice.',
    ],
  },
  {
    id: 'add-ism-instances',
    title: 'Add Instanced Static Mesh Instances',
    intro: `Single-species variant: one ${ism} and manual <strong>Add Instance</strong> on BeginPlay. For multiple species with different meshes, see <a class="text-link" href="/add-multiple-organisms.html">Add multiple organisms</a> instead.`,
    figure: {
      image: '/tutorials/example-beginplay-basic.jpg',
      imageAlt:
        'Blueprint graph: after Spawn Species, Get Organism Positions feeds a For Each Loop that Add Instance on an Instanced Static Mesh component.',
    },
    steps: [
      `Add an ${ism} component to your Flock Manager Blueprint and assign your organism mesh.`,
      `Turn off <strong>Draw Debug Organisms</strong> once your ${ism} component is driving visuals.`,
      'On <strong>Event BeginPlay</strong>, run your <strong>Spawn Species</strong> loop first so organisms exist in the simulation.',
      'Call <strong>Get Organism Positions</strong> (target = <code>self</code>) and connect <strong>Out Positions</strong> to a <strong>For Each Loop</strong>.',
      'From <strong>Loop Body</strong>, add <strong>Make Transform</strong> — wire the loop <strong>Array Element</strong> to <strong>Location</strong> and set <strong>Scale</strong> to your instance size (the example uses <code>0.1</code>).',
      `Call <strong>Add Instance</strong> on your ${ism} component. Pass the transform and leave <strong>World Space</strong> off for sim-local positions.`,
    ],
  },
  {
    id: 'update-on-tick',
    title: 'Update on Tick',
    intro:
      'Drive instance transforms every frame so meshes follow the flock. The screenshot shows the full BeginPlay + Tick graph; the steps below cover the Event Tick branch that updates existing instances.',
    figure: {
      image: '/tutorials/example-cycle-basic.jpg',
      imageAlt:
        'Blueprint graph: Event Tick loops organism positions and calls Update Instance Transform on the Instanced Static Mesh component.',
    },
    steps: [
      'Add <strong>Event Tick</strong> to the same Blueprint that already spawns organisms and calls <strong>Add Instance</strong> on BeginPlay.',
      'Each tick, call <strong>Get Organism Positions</strong> and feed <strong>Out Positions</strong> into a <strong>For Each Loop</strong>.',
      'Wire the loop <strong>Array Index</strong> to <strong>Update Instance Transform → Instance Index</strong> so each organism updates the same slot it received on BeginPlay.',
      'Build the new transform with <strong>Make Transform</strong> — <strong>Location</strong> from the position array element, <strong>Scale</strong> matching what you used when adding instances.',
      `Call <strong>Update Instance Transform</strong> on your ${ism} component. Keep <strong>World Space</strong> consistent with <strong>Add Instance</strong>.`,
      'The example sets <strong>Scale</strong> on <strong>Make Transform</strong> — optional, but a simple way to resize instances without changing the mesh asset.',
    ],
  },
]

export function addAnOrganismMeshNavLinks(onPage = false): SidebarLink[] {
  const base = onPage ? '' : '/add-an-organism-mesh.html'

  return addAnOrganismMeshParts.map((part) => ({
    href: `${base}#${part.id}`,
    label: part.title,
  }))
}