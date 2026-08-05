import { useEffect, useMemo, useState } from 'react'
import { Chev, SearchIcon } from '../../components/a/iconsA'
import { COMMUNITIES, STATES } from '../../data/navA'

/** Bolds the portion of `text` matching the active query, as the desktop panel does. */
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

/**
 * Choosing a community, as a screen rather than a dropdown.
 *
 * The desktop switcher anchors a 479px panel to its trigger, which on a phone
 * covers the list it sits in and stacks a second scroll surface on the drawer's.
 * Here the list is the whole screen: one scroll area, a back arrow instead of a
 * click-outside target, and the commit button pinned where a thumb reaches it.
 *
 * Keeps the desktop's draft/commit model — the checkboxes edit a draft, and
 * "Choose Community" is what promotes it — so a half-made change can be abandoned
 * with Back.
 */
export default function CommunityPicker({
  selected,
  onCommit,
  onClose,
}: {
  selected: number[]
  onCommit: (ids: number[]) => void
  onClose: () => void
}) {
  const [draft, setDraft] = useState<number[]>(selected)
  const [query, setQuery] = useState('')
  const [state, setState] = useState('')

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return COMMUNITIES.filter((c) => {
      const matchesQuery =
        !q || c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q)
      const matchesState = !state || c.state === state
      return matchesQuery && matchesState
    })
  }, [query, state])

  // Select All applies to what's visible, not the whole catalogue — otherwise the
  // count beside it would lie once a filter is on.
  const allVisibleSelected = visible.length > 0 && visible.every((c) => draft.includes(c.id))

  function toggleAll() {
    const ids = visible.map((c) => c.id)
    setDraft((d) =>
      allVisibleSelected ? d.filter((id) => !ids.includes(id)) : [...new Set([...d, ...ids])],
    )
  }

  function toggle(id: number) {
    setDraft((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]))
  }

  return (
    <div
      role="dialog"
      aria-label="Choose community"
      className="absolute inset-0 z-30 flex flex-col bg-white font-a"
    >
      <div className="relative z-10 flex h-14 shrink-0 items-center gap-1 border-b border-a-gray-100 bg-white pl-1 pr-4">
        <button
          type="button"
          onClick={onClose}
          aria-label="Back"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-a-gray-500 active:bg-a-gray-50"
        >
          <Chev dir="left" />
        </button>
        <h2 className="flex-1 truncate text-[16px] font-bold text-a-ink">Choose community</h2>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-4 pt-3">
        <div className="relative">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Name or City"
            aria-label="Search name or city"
            className="w-full rounded-lg border border-a-gray-100 py-2.5 pl-3 pr-10 text-a-gray-600 outline-none transition-colors focus:border-a-blue placeholder:text-a-gray-400"
          />
          <SearchIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-a-gray-400" />
        </div>

        <div className="relative mt-2">
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            aria-label="Select state"
            className="w-full appearance-none rounded-lg border border-a-gray-100 py-2.5 pl-3 pr-10 text-a-gray-600 outline-none transition-colors focus:border-a-blue"
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

        <label className="mt-3 flex min-h-[44px] cursor-pointer items-center gap-2.5 px-1 text-a-gray-500">
          <input
            type="checkbox"
            className="sr-only"
            checked={allVisibleSelected}
            onChange={toggleAll}
          />
          <Checkbox checked={allVisibleSelected} />
          Select All ({visible.length})
        </label>

        <ul className="mt-1 space-y-2">
          {visible.length === 0 && (
            <li className="px-1 py-8 text-center text-a-gray-400">No communities found.</li>
          )}

          {visible.map((c) => {
            const on = draft.includes(c.id)
            return (
              <li key={c.id}>
                <label
                  className={`flex min-h-[56px] cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 transition-colors ${
                    on ? 'border-a-blue bg-a-blue-bg' : 'border-a-gray-100 bg-white active:bg-a-gray-50'
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
      </div>

      {/* Pinned rather than trailing the list, so it's reachable without scrolling
          to the bottom of a long catalogue. */}
      <div className="shrink-0 border-t border-a-gray-100 bg-white px-4 py-3">
        <button
          type="button"
          onClick={() => onCommit(draft)}
          disabled={draft.length === 0}
          className={`min-h-[48px] w-full rounded-lg font-bold transition-colors ${
            draft.length === 0
              ? 'cursor-not-allowed bg-a-gray-250 text-white'
              : 'bg-a-blue text-white active:bg-a-blue-deep'
          }`}
        >
          Choose Community
        </button>
      </div>
    </div>
  )
}
