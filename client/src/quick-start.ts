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
    id: 'debug-flock',
    title: 'See a flock (debug)',
    intro:
      'The fastest way to confirm FlockIt is running — debug spheres only, no meshes or Event Graph setup.',
    image: '/tutorials/spawn-species.jpg',
    imageAlt:
      'Flock Manager Details panel with Spawn Preset and Species settings in the Simulation category.',
    steps: [
      'Place your <strong>Flock Manager</strong> actor in the level.',
      'In <strong>Simulation | Species</strong>, pick a <strong>Spawn Preset</strong> (not <strong>Custom</strong> or <strong>Empty</strong>).',
      'Under <strong>Simulation | Debug</strong>, enable <strong>Draw Debug Organisms</strong>.',
      'Press <strong>Play</strong>. Debug spheres appear for each organism — turn off debug draw when you move on to meshes.',
    ],
  },
]

export function quickStartNavLinks(): SidebarLink[] {
  return quickStartSections.map((section) => ({
    href: `#${section.id}`,
    label: section.title,
  }))
}