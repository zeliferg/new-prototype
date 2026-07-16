import { PATTERN_IDS, type Pattern } from './patterns'

export type ViewMode = 'single' | 'overview' | 'compare'

const ORDER: ViewMode[] = ['single', 'overview', 'compare']

/** Unknown values fall back to single — these URLs get hand-edited and pasted around. */
export function modeFrom(search: URLSearchParams): ViewMode {
  const raw = search.get('mode') as ViewMode | null
  return raw && ORDER.includes(raw) ? raw : 'single'
}

export function nextMode(mode: ViewMode): ViewMode {
  return ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length]
}

function isPattern(value: string): value is Pattern {
  return (PATTERN_IDS as string[]).includes(value)
}

/**
 * Reads `?vs=A,C`. Defaults to the active pattern against another, so cycling
 * into compare never demands a decision first.
 */
export function pairFrom(search: URLSearchParams, active: Pattern): [Pattern, Pattern] {
  const [rawLeft = '', rawRight = ''] = (search.get('vs') ?? '').split(',')
  const left = isPattern(rawLeft) ? rawLeft : active
  const right =
    isPattern(rawRight) && rawRight !== left ? rawRight : left === 'A' ? 'C' : 'A'
  return [left, right]
}

/** Advances one slot to the next pattern, skipping whatever the other slot holds. */
export function rotateSlot(pair: [Pattern, Pattern], slot: 0 | 1): [Pattern, Pattern] {
  const other = pair[slot === 0 ? 1 : 0]
  let next = PATTERN_IDS[(PATTERN_IDS.indexOf(pair[slot]) + 1) % PATTERN_IDS.length]
  if (next === other) next = PATTERN_IDS[(PATTERN_IDS.indexOf(next) + 1) % PATTERN_IDS.length]
  return slot === 0 ? [next, pair[1]] : [pair[0], next]
}
