import type { SidebarLink } from './shared'

export type QuickStartSection = {
  id: string
  title: string
  intro?: string
  image?: string
  imageAlt?: string
  video?: string
  videoTitle?: string
  steps: string[]
}

export const quickStartSections: QuickStartSection[] = [
  {
    id: 'installation',
    title: 'Installation',
    intro:
      'Install FlockIt from Fab into your Unreal Engine <strong>5.8</strong> project. Win64, Mac, and Linux are supported.',
    steps: [
      'Open <strong>Fab</strong> and find <strong>FlockIt</strong>.',
      'Add it to your project using the Fab install flow.',
      'Open the project in Unreal Engine <strong>5.8</strong> — Fab places the plugin in your project&apos;s <code>Plugins/</code> folder.',
      '<strong>Manual install:</strong> copy the <code>FlockIt</code> folder into <code>YourProject/Plugins/</code>, regenerate project files, build the editor target, and restart.',
    ],
  },
  {
    id: 'enable-plugin',
    title: 'Enable the plugin',
    steps: [
      'Open <strong>Edit → Plugins</strong>.',
      'Search for <strong>FlockIt</strong>.',
      'Check <strong>Enabled</strong> and restart the editor if prompted.',
      'Confirm <strong>Flock Manager</strong> appears when creating a new Blueprint Class.',
    ],
  },
  {
    id: 'create-flock-manager',
    title: 'Create Flock Manager Blueprint',
    intro:
      'FlockIt runs on an <code>AFlockManager</code> actor. Subclass it in Blueprint so you can add meshes, materials, and Event Graph logic in one place.',
    image: '/tutorials/create-flock-manager-class.jpg',
    imageAlt:
      'Unreal Engine Pick Parent Class dialog with Flock Manager selected as the Blueprint parent.',
    steps: [
      'In the Content Browser, choose <strong>Add → Blueprint Class</strong>.',
      'Pick <strong>Flock Manager</strong> (<code>AFlockManager</code>) as the parent class.',
      'Name the asset (for example <code>BP_FlockIt</code>) and open it.',
      'Add <strong>Instanced Static Mesh</strong> component(s) for your organism meshes, or start with debug draw and add meshes later.',
      'Place the Blueprint in your level when you are ready to test.',
    ],
  },
  {
    id: 'first-flock',
    title: 'See your first flock',
    intro:
      'Confirm everything is working with debug draw — no meshes or Event Graph setup required.',
    image: '/tutorials/spawn-species.jpg',
    imageAlt:
      'Flock Manager Details panel with Spawn Preset and Species settings in the Simulation category.',
    steps: [
      'Select your placed <strong>Flock Manager</strong> and pick a <strong>Spawn Preset</strong> in <strong>Simulation | Species</strong>.',
      'Under <strong>Simulation | Debug</strong>, enable <strong>Draw Debug Organisms</strong>.',
      'Press <strong>Play</strong>. Debug spheres appear for each organism.',
    ],
  },
]

export function quickStartNavLinks(): SidebarLink[] {
  return quickStartSections.map((section) => ({
    href: `#${section.id}`,
    label: section.title,
  }))
}