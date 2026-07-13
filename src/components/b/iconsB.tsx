import type { NavBIcon } from '../../data/navB'

type P = { className?: string }

const s = (className = '', size = 22) => ({
  className: `shrink-0 ${className}`,
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  'aria-hidden': true as const,
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
})

const Home = ({ className }: P) => (
  <svg {...s(className)}>
    <path d="M3.5 10L12 3.5l8.5 6.5V20a1 1 0 0 1-1 1h-4v-6h-7v6h-4a1 1 0 0 1-1-1z" />
  </svg>
)

const Calendar = ({ className }: P) => (
  <svg {...s(className)}>
    <rect x="3.5" y="5" width="17" height="16" rx="2" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4" />
  </svg>
)

const Collision = ({ className }: P) => (
  <svg {...s(className)}>
    <circle cx="12" cy="12" r="4" />
    <ellipse cx="12" cy="12" rx="9.5" ry="4.2" transform="rotate(-28 12 12)" />
  </svg>
)

const Covariance = ({ className }: P) => (
  <svg {...s(className)}>
    <ellipse cx="12" cy="12" rx="4" ry="8" transform="rotate(35 12 12)" />
    <path d="M6 18L18 6" />
  </svg>
)

const Orbit = ({ className }: P) => (
  <svg {...s(className)}>
    <circle cx="12" cy="12" r="4.5" />
    <ellipse cx="12" cy="12" rx="10" ry="5" transform="rotate(-20 12 12)" />
    <circle cx="20" cy="8.5" r="1.4" fill="currentColor" />
  </svg>
)

const Environment = ({ className }: P) => (
  <svg {...s(className)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.5 2.6 2.5 14.4 0 17M12 3.5c-2.5 2.6-2.5 14.4 0 17" />
  </svg>
)

const Maneuver = ({ className }: P) => (
  <svg {...s(className)}>
    <circle cx="9" cy="15" r="5" />
    <path d="M13 11l7-7M15.5 4H20v4.5" />
  </svg>
)

const Viewer = ({ className }: P) => (
  <svg {...s(className)}>
    <path d="M12 3l7 4v10l-7 4-7-4V7z" />
    <path d="M12 12l7-4M12 12v9M12 12L5 8" />
  </svg>
)

const ObjectInfo = ({ className }: P) => (
  <svg {...s(className)}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
    <path d="M8 16v-4M12 16V8M16 16v-6" />
  </svg>
)

const Tools = ({ className }: P) => (
  <svg {...s(className)}>
    <rect x="2.5" y="7" width="19" height="13" rx="2" />
    <path d="M8.5 7V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2" />
    <path d="M2.5 12h19" />
  </svg>
)

const Docs = ({ className }: P) => (
  <svg {...s(className)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M9.7 9.5a2.4 2.4 0 1 1 3.3 2.2c-.6.3-1 .9-1 1.5v.3" />
    <path d="M12 16.8h.01" />
  </svg>
)

export const Chevron = ({ className = '', up = false }: P & { up?: boolean }) => (
  <svg
    className={`shrink-0 transition-transform duration-200 ${up ? 'rotate-180' : ''} ${className}`}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const Collapse = ({ className = '' }: P) => (
  <svg {...s(className, 20)}>
    <path d="M14.5 6l-5 6 5 6M8 6l-5 6 5 6" />
  </svg>
)

export const BellB = ({ className }: P) => (
  <svg {...s(className)}>
    <path d="M7 10a5 5 0 0 1 10 0c0 3.6 1.3 5 2.1 5.8.4.4.1 1.2-.5 1.2H5.4c-.6 0-.9-.8-.5-1.2C5.7 15 7 13.6 7 10z" />
    <path d="M10 20a2 2 0 0 0 4 0" />
  </svg>
)

export const CalendarToday = ({ className }: P) => (
  <svg {...s(className, 20)}>
    <rect x="3.5" y="5" width="17" height="16" rx="2" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4" />
  </svg>
)

export const Refresh = ({ className = '' }: P) => (
  <svg {...s(className, 20)}>
    <path d="M20 12a8 8 0 1 1-2.5-5.8" />
    <path d="M20 4v4.5h-4.5" />
  </svg>
)

export const CheckCircle = ({ className = '' }: P) => (
  <svg
    className={`shrink-0 ${className}`}
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="2" />
    <path d="M7.8 12.3l2.8 2.8 5.6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const MoreHoriz = ({ className = '' }: P) => (
  <svg className={`shrink-0 ${className}`} width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="5" cy="12" r="1.7" fill="currentColor" />
    <circle cx="12" cy="12" r="1.7" fill="currentColor" />
    <circle cx="19" cy="12" r="1.7" fill="currentColor" />
  </svg>
)

export const Avatar = ({ className = '' }: P) => (
  <svg className={`shrink-0 ${className}`} width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
    <circle cx="16" cy="16" r="16" fill="#E8EEF4" />
    <circle cx="16" cy="13" r="4.2" stroke="#16395B" strokeWidth="1.6" fill="none" />
    <path d="M8.5 25a7.5 7.5 0 0 1 15 0" stroke="#16395B" strokeWidth="1.6" fill="none" strokeLinecap="round" />
  </svg>
)

export const BurgerB = ({ className = '' }: P) => (
  <svg {...s(className)}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
)

const MAP: Record<NavBIcon, (p: P) => JSX.Element> = {
  home: Home,
  calendar: Calendar,
  collision: Collision,
  covariance: Covariance,
  orbit: Orbit,
  environment: Environment,
  maneuver: Maneuver,
  viewer: Viewer,
  object: ObjectInfo,
  tools: Tools,
  docs: Docs,
}

export function NavIconB({ name, className }: { name: NavBIcon; className?: string }) {
  const C = MAP[name]
  return <C className={className} />
}
