import { PATTERN_IDS, type Pattern } from '../lib/patterns'

/** URLs stay lowercase (`/mobile/a`); the Pattern union is uppercase. */
export function patternFromParam(raw: string | undefined): Pattern | null {
  const upper = (raw ?? '').toUpperCase()
  return (PATTERN_IDS as string[]).includes(upper) ? (upper as Pattern) : null
}

export function mobilePathFor(pattern: Pattern): string {
  return `/mobile/${pattern.toLowerCase()}`
}
