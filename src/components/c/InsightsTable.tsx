import { useEffect, useRef, useState } from 'react'
import type { Insight } from '../../data/insights'
import { Chevron, Kebab } from './iconsC'

const TONE: Record<Insight['tone'], string> = {
  green: 'from-c-green to-c-blue',
  pink: 'from-c-pink to-c-purple',
  purple: 'from-c-purple to-c-blue',
  blue: 'from-c-blue to-c-green',
}

/** The colored gradient badge that leads each row. */
function Badge({ tone }: { tone: Insight['tone'] }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${TONE[tone]}`}
    >
      <span className="h-2.5 w-2.5 rounded-full bg-white/70" />
    </span>
  )
}

function RowMenu({ id }: { id: number }) {
  const [open, setOpen] = useState(false)
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
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={`Actions for insight ${id}`}
        onClick={() => setOpen((v) => !v)}
        className="rounded-md p-2 text-c-ink/60 transition-colors hover:bg-c-bg hover:text-c-ink"
      >
        <Kebab />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-30 w-40 overflow-hidden rounded-md border border-c-ink/10 bg-white py-1 shadow-[var(--shadow-card)]"
        >
          {['View details', 'Share', 'Dismiss'].map((a) => (
            <button
              key={a}
              type="button"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block w-full px-3 py-2 text-left text-c-ink/80 transition-colors hover:bg-c-bg hover:text-c-ink"
            >
              {a}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function InsightsTable({ rows }: { rows: Insight[] }) {
  const [open, setOpen] = useState(true)

  return (
    <section className="overflow-hidden rounded-lg bg-white shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between px-6 py-4">
        <h2 className="font-medium text-c-ink">Insights</h2>
        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? 'Collapse insights' : 'Expand insights'}
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-1.5 text-c-ink/70 transition-colors hover:bg-c-bg"
        >
          <Chevron dir={open ? 'down' : 'right'} />
        </button>
      </div>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          {rows.length === 0 ? (
            <p className="px-6 py-10 text-center text-c-ink/50">No insights match your search.</p>
          ) : (
            <>
              {/* Desktop: real table semantics. */}
              <table className="hidden w-full border-collapse md:table">
                <thead>
                  <tr className="bg-c-green/10 text-left">
                    <th scope="col" className="w-[52px]" />
                    <th scope="col" className="px-3 py-2 text-[0.9em] font-medium text-c-ink">
                      Date
                    </th>
                    <th scope="col" className="px-3 py-2 text-[0.9em] font-medium text-c-ink">
                      Statement
                    </th>
                    <th scope="col" className="px-3 py-2 text-[0.9em] font-medium text-c-ink">
                      Category
                    </th>
                    <th scope="col" className="w-[52px]" />
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr
                      key={r.id}
                      className="border-b border-c-ink/[0.07] transition-colors last:border-0 hover:bg-c-bg"
                    >
                      <td className="py-4 pl-6">
                        <Badge tone={r.tone} />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 align-top font-mono text-[0.85em] text-c-ink/70">
                        {r.date}
                      </td>
                      <td className="max-w-[520px] px-3 py-4 align-top text-c-ink">{r.statement}</td>
                      <td className="px-3 py-4 align-top text-c-ink/80">{r.category}</td>
                      <td className="py-4 pr-4 align-top">
                        <RowMenu id={r.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile: the table collapses into stacked cards — a 5-column
                  grid is unreadable under ~700px. */}
              <ul className="md:hidden">
                {rows.map((r) => (
                  <li
                    key={r.id}
                    className="flex gap-3 border-b border-c-ink/[0.07] px-4 py-4 last:border-0"
                  >
                    <Badge tone={r.tone} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[0.8em] text-c-ink/60">{r.date}</span>
                        <RowMenu id={r.id} />
                      </div>
                      <p className="mt-1 text-c-ink">{r.statement}</p>
                      <p className="mt-2 text-[0.9em] text-c-ink/70">{r.category}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
