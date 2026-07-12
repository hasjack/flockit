import { apiSections } from './api'
import type { SidebarItem, SidebarLink } from './shared'
import { simulationSettingGroups } from './settings'
import { quickStartNavLinks } from './quick-start'
import { tutorialNavLinks } from './tutorials'

type ActivePage = 'home' | 'quick-start' | 'api' | 'env-species' | 'tutorials'

function envSpeciesChildren(): SidebarLink[] {
  return [
    ...simulationSettingGroups.map((group) => ({
      href: `#${group.id}`,
      label: group.title,
    })),
    { href: '#manager-config', label: 'Manager config' },
    { href: '#species-fields', label: 'Species fields' },
    { href: '#initial-species', label: 'Initial species' },
    { href: '#tuning-notes', label: 'Tuning notes' },
  ]
}

function pagesNav(active: ActivePage): SidebarItem[] {
  const items: SidebarItem[] = [
    { type: 'link', href: '/', label: 'Home', active: active === 'home' },
  ]

  if (active === 'quick-start') {
    items.push({
      type: 'page',
      href: '/quick-start.html',
      label: 'Quick start',
      active: true,
      children: quickStartNavLinks(),
    })
  } else {
    items.push({ type: 'link', href: '/quick-start.html', label: 'Quick start' })
  }

  if (active === 'api') {
    items.push({
      type: 'page',
      href: '/api.html',
      label: 'API reference',
      active: true,
      children: apiSections.map((section) => ({
        href: `#${section.id}`,
        label: section.title.replace(/^AFlockManager — /, ''),
      })),
    })
  } else {
    items.push({ type: 'link', href: '/api.html', label: 'API reference' })
  }

  if (active === 'env-species') {
    items.push({
      type: 'page',
      href: '/env-species.html',
      label: 'Env & species',
      active: true,
      children: envSpeciesChildren(),
    })
  } else {
    items.push({ type: 'link', href: '/env-species.html', label: 'Env & species' })
  }

  if (active === 'tutorials') {
    items.push({
      type: 'page',
      href: '/tutorials.html',
      label: 'Tutorials',
      active: true,
      children: tutorialNavLinks(),
    })
  } else {
    items.push({ type: 'link', href: '/tutorials.html', label: 'Tutorials' })
  }

  return items
}

export function homePageSidebar(): SidebarItem[] {
  return pagesNav('home')
}

export function quickStartPageSidebar(): SidebarItem[] {
  return pagesNav('quick-start')
}

export function apiPageSidebar(): SidebarItem[] {
  return pagesNav('api')
}

export function envSpeciesPageSidebar(): SidebarItem[] {
  return pagesNav('env-species')
}

export function tutorialsPageSidebar(): SidebarItem[] {
  return pagesNav('tutorials')
}