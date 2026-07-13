export type NavBIcon =
  | 'home'
  | 'calendar'
  | 'collision'
  | 'covariance'
  | 'orbit'
  | 'environment'
  | 'maneuver'
  | 'viewer'
  | 'object'
  | 'tools'
  | 'docs'

export type NavBItem = {
  label: string
  to?: string
  icon: NavBIcon
  children?: { label: string; to: string }[]
}

export type NavBSection = {
  /** Undefined for the leading ungrouped items (Dashboard, Event Calendar). */
  heading?: string
  items: NavBItem[]
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-')

export const NAV_B: NavBSection[] = [
  {
    items: [
      { label: 'Dashboard', to: '/b', icon: 'home' },
      { label: 'Event Calendar', to: '/b/calendar', icon: 'calendar' },
    ],
  },
  {
    heading: 'Services',
    items: [
      {
        label: 'Collision Risk Management',
        icon: 'collision',
        children: ['Conjunctions', 'Screenings', 'Mitigation'].map((l) => ({
          label: l,
          to: `/b/collision/${slug(l)}`,
        })),
      },
      {
        label: 'Covariance Realism',
        icon: 'covariance',
        children: ['Assessment', 'Calibration'].map((l) => ({
          label: l,
          to: `/b/covariance/${slug(l)}`,
        })),
      },
      {
        label: 'Orbit Determination',
        icon: 'orbit',
        children: ['Solutions', 'Residuals', 'Ephemerides'].map((l) => ({
          label: l,
          to: `/b/orbit/${slug(l)}`,
        })),
      },
      { label: 'Space Environment Data', to: '/b/environment', icon: 'environment' },
      { label: 'Maneuver Planning', to: '/b/maneuver', icon: 'maneuver' },
    ],
  },
  {
    heading: 'Utilities',
    items: [
      { label: '3D Viewer', to: '/b/viewer', icon: 'viewer' },
      {
        label: 'Space Object Information',
        icon: 'object',
        children: ['Catalog', 'Attributes'].map((l) => ({
          label: l,
          to: `/b/object/${slug(l)}`,
        })),
      },
      {
        label: 'Manual Tools',
        icon: 'tools',
        children: ['Propagator', 'Converter'].map((l) => ({
          label: l,
          to: `/b/tools/${slug(l)}`,
        })),
      },
      { label: 'Documentation', to: '/b/docs', icon: 'docs' },
    ],
  },
]

/** Route → page title, derived from the nav so the two can't drift apart. */
export const PAGES_B: Record<string, string> = Object.fromEntries(
  NAV_B.flatMap((s) =>
    s.items.flatMap((i) =>
      i.children ? i.children.map((c) => [c.to, c.label]) : i.to ? [[i.to, i.label]] : [],
    ),
  ),
)
