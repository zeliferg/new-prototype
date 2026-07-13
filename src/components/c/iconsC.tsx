import type { NavCItem } from '../../data/navC'

type P = { className?: string }

const s = (className = '') => ({
  className: `shrink-0 ${className}`,
  width: 18,
  height: 18,
  viewBox: '0 0 20 20',
  fill: 'none',
  'aria-hidden': true as const,
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
})

const Home = ({ className }: P) => (
  <svg {...s(className)}>
    <path d="M3 8.5L10 3l7 5.5V16a1 1 0 0 1-1 1h-3.5v-4.5h-5V17H4a1 1 0 0 1-1-1z" />
  </svg>
)

const Insights = ({ className }: P) => (
  <svg {...s(className)}>
    <path d="M2 14l4-5 3 2.5L14 5" />
    <path d="M11.5 5H14v2.5" />
    <path d="M2 17h16" />
  </svg>
)

const Report = ({ className }: P) => (
  <svg {...s(className)}>
    <rect x="2.5" y="4" width="15" height="12" rx="1.5" />
    <path d="M2.5 7.5h15" />
  </svg>
)

const Lists = ({ className }: P) => (
  <svg {...s(className)}>
    <path d="M7 6h10M7 10h10M7 14h10M3.5 6h.01M3.5 10h.01M3.5 14h.01" />
  </svg>
)

const Bell = ({ className }: P) => (
  <svg {...s(className)}>
    <path d="M6 8a4 4 0 1 1 8 0c0 3 1.2 4.2 1.8 4.7.4.3.2 1-.3 1H4.5c-.5 0-.7-.7-.3-1C4.8 12.2 6 11 6 8z" />
    <path d="M8.5 16a1.6 1.6 0 0 0 3 0" />
  </svg>
)

const Help = ({ className }: P) => (
  <svg {...s(className)}>
    <circle cx="10" cy="10" r="7.5" />
    <path d="M8 8a2 2 0 1 1 2.8 1.85c-.5.22-.8.7-.8 1.25v.3" />
    <path d="M10 14h.01" />
  </svg>
)

const Settings = ({ className }: P) => (
  <svg {...s(className)}>
    <circle cx="10" cy="10" r="2.6" />
    <path d="M16.2 12.1a1.4 1.4 0 0 0 .28 1.54l.05.05a1.7 1.7 0 1 1-2.4 2.4l-.05-.05a1.4 1.4 0 0 0-1.54-.28 1.4 1.4 0 0 0-.85 1.28V17a1.7 1.7 0 1 1-3.4 0v-.09A1.4 1.4 0 0 0 7.4 15.6a1.4 1.4 0 0 0-1.54.28l-.05.05a1.7 1.7 0 1 1-2.4-2.4l.05-.05a1.4 1.4 0 0 0 .28-1.54 1.4 1.4 0 0 0-1.28-.85H3a1.7 1.7 0 1 1 0-3.4h.09A1.4 1.4 0 0 0 4.4 6.4a1.4 1.4 0 0 0-.28-1.54l-.05-.05a1.7 1.7 0 1 1 2.4-2.4l.05.05a1.4 1.4 0 0 0 1.54.28h.07a1.4 1.4 0 0 0 .85-1.28V1a1.7 1.7 0 1 1 3.4 0v.09a1.4 1.4 0 0 0 .85 1.28 1.4 1.4 0 0 0 1.54-.28l.05-.05a1.7 1.7 0 1 1 2.4 2.4l-.05.05a1.4 1.4 0 0 0-.28 1.54v.07a1.4 1.4 0 0 0 1.28.85H19a1.7 1.7 0 1 1 0 3.4h-.09a1.4 1.4 0 0 0-1.28.85z" />
  </svg>
)

const Logout = ({ className }: P) => (
  <svg {...s(className)}>
    <path d="M8 17H4.5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1H8" />
    <path d="M13 14l4-4-4-4M17 10H8" />
  </svg>
)

export const Chevron = ({ className = '', dir = 'down' }: P & { dir?: 'down' | 'up' | 'left' | 'right' }) => {
  const rot = { down: 0, up: 180, left: 90, right: -90 }[dir]
  return (
    <svg
      className={`shrink-0 transition-transform duration-200 ${className}`}
      style={{ transform: `rotate(${rot}deg)` }}
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const Search = ({ className = '' }: P) => (
  <svg className={`shrink-0 ${className}`} width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.7" />
    <path d="M13.2 13.2L17 17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
)

export const CloseCircle = ({ className = '' }: P) => (
  <svg className={`shrink-0 ${className}`} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="8.2" stroke="currentColor" strokeWidth="1.4" />
    <path d="M7.4 7.4l5.2 5.2M12.6 7.4l-5.2 5.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

export const Kebab = ({ className = '' }: P) => (
  <svg className={`shrink-0 ${className}`} width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <circle cx="8" cy="3" r="1.4" fill="currentColor" />
    <circle cx="8" cy="8" r="1.4" fill="currentColor" />
    <circle cx="8" cy="13" r="1.4" fill="currentColor" />
  </svg>
)

export const Burger = ({ className = '' }: P) => (
  <svg className={`shrink-0 ${className}`} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
)

const MAP = {
  home: Home,
  insights: Insights,
  report: Report,
  lists: Lists,
  bell: Bell,
  help: Help,
  settings: Settings,
  logout: Logout,
}

export function NavIcon({ name, className }: { name: NavCItem['icon']; className?: string }) {
  const C = MAP[name]
  return <C className={className} />
}
