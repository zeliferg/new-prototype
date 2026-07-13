import { useEffect, useRef, useState } from 'react'
import { SEARCH_SCOPES } from '../../data/insights'
import { Burger, Chevron, Search } from './iconsC'

export default function HeaderC({
  title,
  query,
  onQueryChange,
  scope,
  onScopeChange,
  onOpenMobileNav,
}: {
  title: string
  query: string
  onQueryChange: (v: string) => void
  scope: string
  onScopeChange: (v: string) => void
  onOpenMobileNav: () => void
}) {
  const [scopeOpen, setScopeOpen] = useState(false)
  const scopeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!scopeOpen) return
    function onDown(e: PointerEvent) {
      if (!scopeRef.current?.contains(e.target as Node)) setScopeOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setScopeOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [scopeOpen])

  return (
    <header className="sticky top-0 z-30 flex min-h-[80px] flex-wrap items-center gap-3 bg-white px-4 py-3 shadow-[var(--shadow-header)] sm:px-6">
      <button
        type="button"
        onClick={onOpenMobileNav}
        aria-label="Open navigation"
        className="rounded-md p-2 text-c-ink hover:bg-c-bg lg:hidden"
      >
        <Burger />
      </button>

      <h1 className="text-lg font-medium text-c-ink">{title}</h1>

      {/* Search — scope dropdown + input + submit, matching the comp. */}
      <div className="ml-auto flex w-full items-stretch sm:w-auto">
        <div
          ref={scopeRef}
          className="relative flex flex-1 items-stretch rounded-l-md border border-c-ink/15 bg-white focus-within:border-c-ink/40 sm:w-[300px] sm:flex-none"
        >
          <button
            type="button"
            aria-expanded={scopeOpen}
            aria-haspopup="listbox"
            onClick={() => setScopeOpen((v) => !v)}
            className="flex shrink-0 items-center gap-1.5 rounded-l-md py-2.5 pl-3 pr-2 text-c-ink/80 hover:bg-c-bg"
          >
            {scope}
            <Chevron dir={scopeOpen ? 'up' : 'down'} className="text-c-ink/60" />
          </button>

          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            aria-label={`Search ${scope}`}
            placeholder="Search…"
            className="w-full min-w-0 bg-transparent py-2.5 pr-3 text-c-ink outline-none placeholder:text-c-ink/40"
          />

          {scopeOpen && (
            <ul
              role="listbox"
              className="absolute left-0 top-[calc(100%+4px)] z-40 w-48 overflow-hidden rounded-md border border-c-ink/10 bg-white py-1 shadow-[var(--shadow-card)]"
            >
              {SEARCH_SCOPES.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={s === scope}
                    onClick={() => {
                      onScopeChange(s)
                      setScopeOpen(false)
                    }}
                    className={`block w-full px-3 py-2 text-left transition-colors hover:bg-c-bg ${
                      s === scope ? 'font-medium text-c-ink' : 'text-c-ink/80'
                    }`}
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          aria-label="Search"
          className="flex w-12 shrink-0 items-center justify-center rounded-r-md bg-c-ink text-white transition-opacity hover:opacity-90"
        >
          <Search />
        </button>
      </div>
    </header>
  )
}
