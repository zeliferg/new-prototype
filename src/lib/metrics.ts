export type Filters = {
  source: string
  component: string
  view: string
}

export type Metrics = {
  riskLabel: string
  riskScore: number // 0-100, drives the gauge arc
  severity: string
  instances: number
  density: number
  fromPreviousPeriod: number
  overLifetime: number
}

/** FNV-1a. Small, stable, and dependency-free — we only need determinism, not crypto. */
function hash(input: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

/** Mulberry32 — a seeded PRNG so one filter combination always yields one result. */
function rng(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const BANDS = ['Low', 'Medium', 'High', 'Critical'] as const

/**
 * Metrics are derived from the applied filters rather than fetched, so that
 * pressing Apply visibly changes the dashboard while staying reproducible:
 * the same selection always produces the same numbers.
 */
export function deriveMetrics(filters: Filters, pathname: string): Metrics {
  const seed = hash(`${filters.source}|${filters.component}|${filters.view}|${pathname}`)
  const rand = rng(seed)

  const riskScore = Math.round(rand() * 100)
  const severityIndex = Math.floor(rand() * BANDS.length)

  return {
    riskLabel: BANDS[Math.min(Math.floor(riskScore / 26), 3)],
    riskScore,
    severity: BANDS[severityIndex],
    instances: Math.round(rand() * 240) + 1,
    density: Number((rand() * 90 + 1).toFixed(2)),
    fromPreviousPeriod: Number((rand() * 900 - 200).toFixed(2)),
    overLifetime: Number((rand() * 400 - 200).toFixed(2)),
  }
}

/** The exact values shown in the Figma comp, used before any filter is applied. */
export const INITIAL_METRICS: Metrics = {
  riskLabel: 'Low',
  riskScore: 19,
  severity: 'Low',
  instances: 23,
  density: 43.47,
  fromPreviousPeriod: 557.79,
  overLifetime: -25.12,
}
