import { useEffect, useRef, useState } from 'react'
import { BellB, BurgerB, CalendarToday } from './iconsB'

const pad = (n: number) => String(n).padStart(2, '0')

/**
 * Day of year, plus the fraction of the day elapsed — the "DOY: 274.73" in the
 * design (Oct 1 is day 274; 17:24:59 is 0.726 of a day).
 */
function dayOfYear(d: Date): string {
  const startOfYear = new Date(d.getFullYear(), 0, 0)
  const days = Math.floor((d.getTime() - startOfYear.getTime()) / 86_400_000)
  const fraction =
    (d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds()) / 86_400
  return (days + fraction).toFixed(2)
}

function stamp(d: Date): string {
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ` +
    `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  )
}

function Clock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="flex items-center gap-2 text-b-muted">
      <CalendarToday className="text-b-muted" />
      <time
        dateTime={now.toISOString()}
        className="whitespace-nowrap tabular-nums text-[13px] text-b-text"
      >
        {stamp(now)}
        <span className="ml-3 text-b-muted">DOY: {dayOfYear(now)}</span>
      </time>
    </span>
  )
}

export default function TopBarB({ onOpenMobileNav }: { onOpenMobileNav: () => void }) {
  const [open, setOpen] = useState(false)
  const [count, setCount] = useState(3)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onDown(e: PointerEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-b-divider bg-b-paper px-4 sm:px-6">
      <button
        type="button"
        onClick={onOpenMobileNav}
        aria-label="Open navigation"
        className="rounded p-2 text-b-muted hover:bg-black/[0.04] lg:hidden"
      >
        <BurgerB />
      </button>

      <div className="ml-auto flex items-center gap-3 sm:gap-5">
        <span className="hidden sm:flex">
          <Clock />
        </span>

        <div ref={ref} className="relative">
          <button
            type="button"
            aria-label={`Notifications${count ? ` (${count} unread)` : ''}`}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-b-muted transition-colors hover:bg-black/[0.04] hover:text-b-text"
          >
            <BellB />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-b-error px-1 text-[11px] font-medium text-white">
                {count}
              </span>
            )}
          </button>

          {open && (
            <div
              role="dialog"
              aria-label="Notifications"
              className="absolute right-0 top-[calc(100%+8px)] z-40 w-[300px] overflow-hidden rounded border border-b-divider bg-b-paper shadow-[var(--shadow-b-card)]"
            >
              <div className="flex items-center justify-between border-b border-b-divider px-4 py-3">
                <p className="font-medium text-b-text">Notifications</p>
                {count > 0 && (
                  <button
                    type="button"
                    onClick={() => setCount(0)}
                    className="text-[13px] text-b-primary hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              {count === 0 ? (
                <p className="px-4 py-6 text-center text-b-muted">You're all caught up.</p>
              ) : (
                <ul>
                  {[
                    'Conjunction alert: COSMOS 2251 screening complete.',
                    'Orbit determination solution converged.',
                    'Maneuver plan awaiting approval.',
                  ]
                    .slice(0, count)
                    .map((t) => (
                      <li
                        key={t}
                        className="border-b border-b-divider px-4 py-3 text-[13px] text-b-text last:border-0"
                      >
                        {t}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
