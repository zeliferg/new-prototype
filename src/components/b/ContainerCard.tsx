import { useState } from 'react'
import { CheckCircle, Chevron, Refresh } from './iconsB'

export type Status = 'Success' | 'Running' | 'Failed'

const STATUS_STYLE: Record<Status, string> = {
  Success: 'bg-b-success text-white',
  Running: 'bg-b-primary text-white',
  Failed: 'bg-b-error text-white',
}

export type Item = { id: string; label: string; status: Status; detail: string }

function Row({ item }: { item: Item }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded border border-b-divider">
      <div className="flex items-center gap-3 px-3 py-2.5">
        <span className="flex-1 truncate text-b-text">{item.label}</span>

        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[12px] font-medium ${
            STATUS_STYLE[item.status]
          }`}
        >
          <CheckCircle />
          {item.status}
        </span>

        <button
          type="button"
          aria-expanded={open}
          aria-label={`${open ? 'Collapse' : 'Expand'} ${item.label}`}
          onClick={() => setOpen((v) => !v)}
          className="rounded p-1.5 text-b-muted transition-colors hover:bg-black/[0.04]"
        >
          <Chevron up={open} />
        </button>
      </div>

      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-250 ease-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0">
          <p className="border-t border-b-divider px-3 py-2.5 text-[13px] text-b-muted">
            {item.detail}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function ContainerCard({
  title,
  items,
  onRefresh,
}: {
  title: string
  items: Item[]
  onRefresh: () => void
}) {
  const [spinning, setSpinning] = useState(false)

  function refresh() {
    setSpinning(true)
    onRefresh()
    // Let the spin complete so the refresh reads as an action, not a flicker.
    setTimeout(() => setSpinning(false), 600)
  }

  return (
    <section className="rounded border border-b-divider bg-b-paper p-4 shadow-[var(--shadow-b-card)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="font-medium text-b-text">{title}</h2>
        <button
          type="button"
          onClick={refresh}
          aria-label={`Refresh ${title}`}
          className="rounded p-1.5 text-b-muted transition-colors hover:bg-black/[0.04] hover:text-b-text"
        >
          <Refresh className={spinning ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="space-y-2">
        {items.map((i) => (
          <Row key={i.id} item={i} />
        ))}
      </div>
    </section>
  )
}
