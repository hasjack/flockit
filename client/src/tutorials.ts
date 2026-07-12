import { addAnOrganismMeshNavLinks } from './add-an-organism-mesh'
import { addMultipleOrganismsNavLinks } from './add-multiple-organisms'
import type { SidebarLink } from './shared'

export type TutorialActive = 'tutorials' | 'add-an-organism-mesh' | 'add-multiple-organisms'

export type TutorialIndexEntry = {
  href: string
  title: string
  description: string
}

export const tutorialIndexEntries: TutorialIndexEntry[] = [
  {
    href: '/add-an-organism-mesh.html',
    title: 'Add an organism mesh',
    description:
      'One shared Instanced Static Mesh — populate on Tick, plus manual spawn and Add Instance patterns.',
  },
  {
    href: '/add-multiple-organisms.html',
    title: 'Add multiple organisms',
    description:
      'One Instanced Static Mesh per species — programmatic setup on BeginPlay with per-tick updates.',
  },
]

function multiOrganismNavLinks(onPage: boolean): SidebarLink[] {
  const base = onPage ? '' : '/add-multiple-organisms.html'

  return addMultipleOrganismsNavLinks().map((link) => ({
    ...link,
    href: `${base}${link.href}`,
  }))
}

export function tutorialNavLinks(active?: TutorialActive): SidebarLink[] {
  return [
    {
      href: '/add-an-organism-mesh.html',
      label: 'Add an organism mesh',
      active: active === 'add-an-organism-mesh',
      children:
        active === 'add-an-organism-mesh' ? addAnOrganismMeshNavLinks(true) : undefined,
    },
    {
      href: '/add-multiple-organisms.html',
      label: 'Add multiple organisms',
      active: active === 'add-multiple-organisms',
      children:
        active === 'add-multiple-organisms' ? multiOrganismNavLinks(true) : undefined,
    },
  ]
}