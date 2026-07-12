import type { SidebarLink } from './shared'

const ISM_DOC =
  'https://dev.epicgames.com/documentation/unreal-engine/instanced-static-mesh-component-in-unreal-engine'

const ism = `<a class="text-link" href="${ISM_DOC}" target="_blank" rel="noreferrer">Instanced Static Mesh</a>`

export type Tutorial = {
  id: string
  title: string
  intro: string
  image: string
  imageAlt: string
  steps: string[]
}

export const tutorials: Tutorial[] = [
  {
    id: 'populate-organism-mesh',
    title: 'Add your organism mesh',
    intro: `The most memory-efficient way to replace debug draw is one ${ism} for the whole flock. <strong>Populate Instanced Organism Mesh</strong> writes every organism transform in a single call each frame — one draw call, one instance buffer. If each species needs a different mesh, a separate ISM per species works but multiplies draw calls and instance overhead. See <a class="text-link" href="#add-ism-instances">Add Instanced Static Mesh Instances</a> for that pattern.`,
    image: '/tutorials/populate-ism.jpg',
    imageAlt:
      'Blueprint graph: Event Tick calls Populate Instanced Organism Mesh on the Flock Manager with an Instanced Static Mesh component wired in.',
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
    title: 'Spawn Species',
    intro:
      'Spawn every row in Species when play begins. Turn off <strong>Spawn On Begin Play</strong> when you want explicit control in your Blueprint.',
    image: '/tutorials/spawn-species.jpg',
    imageAlt:
      'Blueprint graph: Event BeginPlay drives a For Each Loop over Species, calling Spawn Species each iteration.',
    steps: [
      'Open your <strong>Flock Manager</strong> Blueprint (for example <code>BP_FlockIt</code>) and switch to the <strong>Event Graph</strong>.',
      'Add <strong>Event BeginPlay</strong> and drag <strong>Species</strong> from the Details panel into the graph.',
      'Insert a <strong>For Each Loop</strong> node and connect <strong>Species</strong> to its <strong>Array</strong> input.',
      'From <strong>Loop Body</strong>, call <strong>Spawn Species</strong> with <strong>Target</strong> set to <code>self</code>.',
      'Wire the loop <strong>Array Element</strong> into <strong>Species</strong>. Use <strong>Break FSpeciesSpawnConfig</strong> on the element to split <strong>Species</strong> and <strong>Count</strong> if the pins are not exposed directly.',
      'Disable <strong>Spawn On Begin Play</strong> on the manager if you are spawning manually — otherwise both paths may run.',
    ],
  },
  {
    id: 'add-ism-instances',
    title: 'Add Instanced Static Mesh Instances',
    intro: `When each species needs its own mesh, use one ${ism} per species and add instances programmatically on BeginPlay. More flexible than a single shared mesh, but each extra ISM adds draw calls and instance-buffer cost.`,
    image: '/tutorials/example-beginplay-basic.jpg',
    imageAlt:
      'Blueprint graph: after Spawn Species, Get Organism Positions feeds a For Each Loop that Add Instance on an Instanced Static Mesh component.',
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
    image: '/tutorials/example-cycle-basic.jpg',
    imageAlt:
      'Blueprint graph: Event Tick loops organism positions and calls Update Instance Transform on the Instanced Static Mesh component.',
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

export function tutorialNavLinks(): SidebarLink[] {
  const [spawn, ...followUps] = tutorials

  return [
    {
      href: `#${spawn.id}`,
      label: spawn.title,
      children: followUps.map((tutorial) => ({
        href: `#${tutorial.id}`,
        label: tutorial.title,
      })),
    },
  ]
}