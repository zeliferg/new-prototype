import { useNavigate } from 'react-router-dom'

export type Pattern = 'A' | 'B' | 'C' | 'D'

/** The pattern is encoded in the URL, so it's shareable and survives reload. */
export function patternFor(pathname: string): Pattern {
  if (pathname === '/a' || pathname.startsWith('/a/')) return 'A'
  if (pathname === '/b' || pathname.startsWith('/b/')) return 'B'
  if (pathname === '/c' || pathname.startsWith('/c/')) return 'C'
  return 'D'
}

const HOME: Record<Pattern, string> = {
  A: '/a/property/basic',
  B: '/b',
  C: '/c',
  D: '/dashboard',
}

const OPTIONS: { id: Pattern; label: string; hint: string }[] = [
  { id: 'A', label: 'Pattern A', hint: 'Admin' },
  { id: 'B', label: 'Pattern B', hint: 'Console' },
  { id: 'C', label: 'Pattern C', hint: 'Insights' },
  { id: 'D', label: 'Pattern D', hint: 'Top nav' },
]

export default function PatternSwitcher({ active }: { active: Pattern }) {
  const navigate = useNavigate()

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex justify-center p-4">
      <div
        role="group"
        aria-label="Switch design pattern"
        className="pointer-events-auto flex items-center gap-1 rounded-full border border-black/10 bg-white/85 p-1 shadow-lg backdrop-blur-md"
      >
        {OPTIONS.map((o) => {
          const on = o.id === active
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={on}
              onClick={() => navigate(HOME[o.id])}
              className={`flex items-baseline gap-1.5 rounded-full px-4 py-2 transition-colors ${
                on ? 'bg-[#001022] text-white' : 'text-black/70 hover:bg-black/5 hover:text-black'
              }`}
            >
              <span className="font-semibold">{o.label}</span>
              <span className={`text-[0.85em] ${on ? 'text-white/65' : 'text-black/45'}`}>
                {o.hint}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
