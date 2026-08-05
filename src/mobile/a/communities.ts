import { COMMUNITIES } from '../../data/navA'

/**
 * Summarises a selection for the context strip. Same four cases the desktop
 * CommunitySwitcher's trigger uses, kept here so the strip and the picker can't
 * describe the same selection differently.
 */
export function communityLabel(ids: number[]): { title: string; sub: string } {
  const selected = COMMUNITIES.filter((c) => ids.includes(c.id))

  if (selected.length === 0) return { title: 'Select a community', sub: 'None selected' }

  if (selected.length === COMMUNITIES.length) {
    return { title: 'All selected', sub: `${COMMUNITIES.length} Active Communities` }
  }

  if (selected.length === 1) {
    return { title: selected[0].name, sub: `${selected[0].city}, ${selected[0].state}` }
  }

  return {
    title: `${selected.length} Communities Selected`,
    sub: selected.map((c) => c.name).join(', '),
  }
}
