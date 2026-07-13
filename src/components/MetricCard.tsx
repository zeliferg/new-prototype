import type { ReactNode } from 'react'
import { InfoCircle } from './icons'

/** Semicircular gauge used by the Risk card. */
function Gauge({ score }: { score: number }) {
  const r = 22
  const circumference = Math.PI * r
  const filled = (Math.min(Math.max(score, 0), 100) / 100) * circumference

  return (
    <svg width="53" height="30" viewBox="0 0 53 30" aria-hidden="true" className="shrink-0">
      <path
        d={`M 4 27 A ${r} ${r} 0 0 1 49 27`}
        fill="none"
        stroke="#dbe7f3"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d={`M 4 27 A ${r} ${r} 0 0 1 49 27`}
        fill="none"
        stroke="#3878bc"
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={`${filled} ${circumference}`}
        className="transition-[stroke-dasharray] duration-500 ease-out"
      />
    </svg>
  )
}

export default function MetricCard({
  icon,
  label,
  value,
  score,
  gauge = false,
}: {
  icon: ReactNode
  label: string
  value: string
  score?: number
  gauge?: boolean
}) {
  return (
    <div className="rounded bg-gray-100 p-4">
      <div className="flex items-center gap-1.5 text-txt">
        <span className="text-primary">{icon}</span>
        <span className="font-semibold">{label}</span>
        <button
          type="button"
          aria-label={`About ${label}`}
          title={`About ${label}`}
          className="ml-0.5 text-primary transition-opacity hover:opacity-70"
        >
          <InfoCircle />
        </button>
      </div>

      <div className="mt-2 flex items-center gap-2">
        {gauge && <Gauge score={score ?? 0} />}
        <span className="text-2xl font-bold leading-tight text-nav-dark">{value}</span>
        {score !== undefined && gauge && (
          <span className="text-[0.9rem] text-txt-secondary">{score}/100</span>
        )}
      </div>
    </div>
  )
}
