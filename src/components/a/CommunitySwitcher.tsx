import { useEffect, useMemo, useRef, useState } from 'react'
import { COMMUNITIES, STATES, type Community } from '../../data/navA'
import { Chev, Pin, SearchIcon } from './iconsA'

/** Bolds the portion of `text` matching the active query, per the Search state. */
function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim()
  if (!q) return <>{text}</>

  const i = text.toLowerCase().indexOf(q.toLowerCase())
  if (i === -1) return <>{text}</>

  return (
    <>
      {text.slice(0, i)}
      <strong className="font-bold">{text.slice(i, i + q.length)}</strong>
      {text.slice(i + q.length)}
    </>
  )
}

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[3px] border transition-colors ${
        checked ? 'border-a-blue bg-a-blue' : 'border-a-gray-250 bg-white'
      }`}
    >
      {checked && (
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path
            d="M2.5 6.2l2.3 2.3 4.7-5"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  )
}

/** Summarises the committed selection for the trigger, matching the four comps. */
function triggerLabel(selected: Community[]): { title: string; sub: string } {
  if (selected.length === 0) return { title: 'Community Switcher', sub: 'Select a community' }

  if (selected.length === COMMUNITIES.length) {
    return { title: 'All selected', sub: `${COMMUNITIES.length} Active Communities` }
  }

  if (selected.length === 1) {
    return { title: selected[0].name, sub: `${selected[0].city}, ${selected[0].state}` }
  }

  return {
    title: `${selected.length} Communities Selected`,
    sub: selected.map((c) => c.name).join(', '),
  }
}

export default function CommunitySwitcher({ collapsed }: { collapsed: boolean }) {
  const [open, setOpen] = useState(false)

  // Committed selection drives the trigger; draft drives the checkboxes.
  // "Choose Community" is what moves draft → committed.
  const [committed, setCommitted] = useState<number[]>([COMMUNITIES[0].id])
  const [draft, setDraft] = useState<number[]>(committed)

  const [query, setQuery] = useState('')
  const [state, setState] = useState('')

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

  // Reopening always starts from what's actually committed, so an abandoned
  // edit never leaks into the next one.
  function openPanel() {
    setDraft(committed)
    setQuery('')
    setState('')
    setOpen(true)
  }

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return COMMUNITIES.filter((c) => {
      const matchesQuery =
        !q || c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q)
      const matchesState = !state || c.state === state
      return matchesQuery && matchesState
    })
  }, [query, state])

  // Select All applies to what's currently visible, not the whole catalogue —
  // otherwise the count next to it would lie once a filter is on.
  const allVisibleSelected =
    visible.length > 0 && visible.every((c) => draft.includes(c.id))

  function toggleAll() {
    const ids = visible.map((c) => c.id)
    setDraft((d) =>
      allVisibleSelected ? d.filter((id) => !ids.includes(id)) : [...new Set([...d, ...ids])],
    )
  }

  function toggle(id: number) {
    setDraft((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]))
  }

  function commit() {
    setCommitted(draft)
    setOpen(false)
  }

  const label = triggerLabel(COMMUNITIES.filter((c) => committed.includes(c.id)))

  return (
    <div ref={ref} className="relative px-3">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => (open ? setOpen(false) : openPanel())}
        title={collapsed ? label.title : undefined}
        className={`flex w-full items-center gap-3 rounded-lg border border-a-gray-100 bg-white px-3 py-2.5 text-left transition-colors hover:bg-a-gray-50 ${
          collapsed ? 'justify-center px-0' : ''
        }`}
      >
        <Pin className="text-a-gray-500" />
        {!collapsed && (
          <>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-bold text-a-ink">{label.title}</span>
              <span className="block truncate text-[12px] text-a-gray-400">{label.sub}</span>
            </span>
            <Chev dir={open ? 'up' : 'down'} className="text-a-gray-400" />
          </>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Property switcher"
          className="absolute left-3 right-3 top-[calc(100%+6px)] z-40 rounded-lg border border-a-gray-100 bg-white p-3 shadow-[var(--shadow-a-3)]"
        >
          {/* Search */}
          <div className="relative">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Name or City"
              aria-label="Search name or city"
              className="w-full rounded border border-a-gray-100 py-2 pl-3 pr-9 text-a-gray-600 outline-none transition-colors focus:border-a-blue placeholder:text-a-gray-400"
            />
            <SearchIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-a-gray-400" />
          </div>

          {/* State filter */}
          <div className="relative mt-2">
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              aria-label="Select state"
              className="w-full appearance-none rounded border border-a-gray-100 py-2 pl-3 pr-9 text-a-gray-600 outline-none transition-colors focus:border-a-blue"
            >
              <option value="">Select State</option>
              {STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <Chev
              dir="down"
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-a-gray-400"
            />
          </div>

          {/* Select all */}
          <label className="mt-3 flex cursor-pointer items-center gap-2.5 px-1 py-1.5 text-a-gray-500">
            <input
              type="checkbox"
              className="sr-only"
              checked={allVisibleSelected}
              onChange={toggleAll}
            />
            <Checkbox checked={allVisibleSelected} />
            Select All ({visible.length})
          </label>

          {/* List */}
          <ul className="mt-1 max-h-[280px] space-y-2 overflow-y-auto pr-1">
            {visible.length === 0 && (
              <li className="px-1 py-4 text-center text-a-gray-400">No communities found.</li>
            )}

            {visible.map((c) => {
              const on = draft.includes(c.id)
              return (
                <li key={c.id}>
                  <label
                    className={`flex cursor-pointer items-center gap-2.5 rounded border px-3 py-2 transition-colors ${
                      on
                        ? 'border-a-blue bg-a-blue-bg'
                        : 'border-a-gray-100 bg-white hover:bg-a-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={on}
                      onChange={() => toggle(c.id)}
                    />
                    <Checkbox checked={on} />
                    <span className="min-w-0">
                      <span className="block truncate text-a-gray-600">
                        <Highlight text={c.name} query={query} />
                      </span>
                      <span className="block truncate text-[12px] text-a-gray-400">
                        <Highlight text={c.city} query={query} />, {c.state}
                      </span>
                    </span>
                  </label>
                </li>
              )
            })}
          </ul>

          {/* Commit — disabled until something is selected, per the Search state. */}
          <button
            type="button"
            onClick={commit}
            disabled={draft.length === 0}
            className={`mt-3 w-full rounded py-2.5 font-bold transition-colors ${
              draft.length === 0
                ? 'cursor-not-allowed bg-a-gray-250 text-white'
                : 'bg-a-blue text-white hover:bg-a-blue-deep'
            }`}
          >
            Choose Community
          </button>
        </div>
      )}
    </div>
  )
}
