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
    title: 'First flock in your level',
    intro:
      'Once the plugin is active and your Blueprint exists, configure the manager and drive rendering. See <a class="text-link" href="/env-species.html">Env &amp; species</a> for field detail and <a class="text-link" href="/tutorials.html">Tutorials</a> for worked Blueprint graphs.',
    steps: [
      'Set <strong>Dimension Mode</strong> and <strong>Simulation Bounds</strong> on the Details panel.',
      'Pick a <strong>Spawn Preset</strong> or <strong>Custom</strong> + <strong>Initial Species</strong>.',
      'Enable <strong>Auto Load Preset On Begin Play</strong>, or call <strong>Spawn Initial Species</strong> from the Event Graph.',
      'Drive rendering each tick — see the <a class="text-link" href="/tutorials.html#add-ism-instances">Add Instanced Static Mesh Instances</a> and <a class="text-link" href="/tutorials.html#update-on-tick">Update on Tick</a> tutorials.',
      'Optional: enable <strong>Track Player Pawn As Repulsor</strong> for interactive panic or repulsion.',
    ],
    video: '/tutorials/quick-flock-example.mp4',
    videoTitle: 'Quick flock example walkthrough',
  },
]

export function quickStartNavLinks(): SidebarLink[] {
  return quickStartSections.map((section) => ({
    href: `#${section.id}`,
    label: section.title,
  }))
}