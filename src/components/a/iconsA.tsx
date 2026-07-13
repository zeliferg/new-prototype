import type { NavAItem } from '../../data/navA'

type P = { className?: string }

const svg = (className = '', size = 22) => ({
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

const Grid = ({ className }: P) => (
  <svg {...svg(className)}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
)

export const SearchIcon = ({ className }: P) => (
  <svg {...svg(className)}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M15.8 15.8L21 21" />
  </svg>
)

const Tools = ({ className }: P) => (
  <svg {...svg(className)}>
    <path d="M4 20V8.5L11 4l7 4.5V20" />
    <path d="M9 20v-5h4v5" />
    <path d="M2.5 20h19" />
  </svg>
)

const Financials = ({ className }: P) => (
  <svg {...svg(className)}>
    <rect x="5" y="2.5" width="14" height="19" rx="2" />
    <path d="M9 7h6M9 11h6M9 15h3" />
  </svg>
)

const Enforcement = ({ className }: P) => (
  <svg {...svg(className)}>
    <path d="M3 15.5h13l2.5-4.5H6.5z" />
    <circle cx="7" cy="18.5" r="1.8" />
    <circle cx="16" cy="18.5" r="1.8" />
    <path d="M3 15.5V9h4" />
  </svg>
)

export const Pin = ({ className }: P) => (
  <svg {...svg(className, 20)}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)

export const Chev = ({ className = '', dir = 'down' }: P & { dir?: 'down' | 'up' | 'left' | 'right' }) => {
  const rot = { down: 0, up: 180, left: 90, right: -90 }[dir]
  return (
    <svg
      className={`shrink-0 transition-transform duration-200 ${className}`}
      style={{ transform: `rotate(${rot}deg)` }}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M6 9.5l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Up/down arrows shown on sortable column headers. */
export const SortArrows = ({ dir }: { dir?: 'asc' | 'desc' }) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
    <path
      d="M8 2.5l3 3.5H5z"
      fill="currentColor"
      className={dir === 'asc' ? 'opacity-100' : 'opacity-35'}
    />
    <path
      d="M8 13.5l3-3.5H5z"
      fill="currentColor"
      className={dir === 'desc' ? 'opacity-100' : 'opacity-35'}
    />
  </svg>
)

export const Compress = ({ className = '' }: P) => (
  <svg {...svg(className, 20)}>
    <path d="M15 5l-5 5 5 5" />
    <path d="M8 5l-5 5 5 5" />
  </svg>
)

export const InfoI = ({ className = '' }: P) => (
  <svg className={`shrink-0 ${className}`} width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="7" fill="currentColor" />
    <path d="M8 7v4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="4.9" r="0.85" fill="white" />
  </svg>
)

export const Bell = ({ className }: P) => (
  <svg {...svg(className)}>
    <path d="M7 9a5 5 0 0 1 10 0c0 3.6 1.4 5 2.2 5.7.5.4.2 1.3-.5 1.3H5.3c-.7 0-1-.9-.5-1.3C5.6 14 7 12.6 7 9z" />
    <path d="M10 19a2 2 0 0 0 4 0" />
  </svg>
)

export const HelpCircle = ({ className }: P) => (
  <svg {...svg(className)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.3" />
    <path d="M12 17h.01" />
  </svg>
)

export const User = ({ className }: P) => (
  <svg {...svg(className)}>
    <circle cx="12" cy="8.5" r="3.5" />
    <path d="M5 20a7 7 0 0 1 14 0" />
  </svg>
)

export const Burger = ({ className = '' }: P) => (
  <svg {...svg(className)}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
)

/** A minimal US flag, standing in for the locale switcher. */
export const Flag = ({ className = '' }: P) => (
  <svg className={`shrink-0 ${className}`} width="24" height="14" viewBox="0 0 24 13" aria-hidden="true">
    <rect width="24" height="13" rx="1.5" fill="#F0F0F0" />
    <g fill="#D80027">
      <rect y="0" width="24" height="1" />
      <rect y="2" width="24" height="1" />
      <rect y="4" width="24" height="1" />
      <rect y="6" width="24" height="1" />
      <rect y="8" width="24" height="1" />
      <rect y="10" width="24" height="1" />
      <rect y="12" width="24" height="1" />
    </g>
    <rect width="10" height="7" fill="#2E52B2" />
  </svg>
)

const MAP = {
  grid: Grid,
  search: SearchIcon,
  tools: Tools,
  financials: Financials,
  enforcement: Enforcement,
}

export function NavIconA({ name, className }: { name: NavAItem['icon']; className?: string }) {
  const C = MAP[name]
  return <C className={className} />
}
