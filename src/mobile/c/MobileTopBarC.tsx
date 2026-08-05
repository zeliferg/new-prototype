import { Burger, Search } from '../../components/c/iconsC'
import { Close } from '../../components/icons'

/**
 * Pattern C's mobile bar: menu, brand, search — all on one line.
 *
 * The desktop HeaderC is `flex-wrap`, so below `sm` the search field drops to a
 * second row and the bar grows to two lines. Here search sits at the right of the
 * bar and shrinks instead of wrapping, which is what keeps this to one 64px row.
 *
 * Two things from the desktop header don't fit at 390px and are handled elsewhere:
 * the page title moves into the page body, and the scope dropdown is dropped — it
 * labels the search but doesn't filter it, so nothing is lost but the label.
 */
export default function MobileTopBarC({
  query,
  onQueryChange,
  navOpen,
  onToggleNav,
}: {
  query: string
  onQueryChange: (v: string) => void
  navOpen: boolean
  onToggleNav: () => void
}) {
  return (
    /* z-50 keeps the bar above the panel that drops from beneath it, so the same
       button that opened the menu is still there to close it. */
    <header className="relative z-50 flex h-16 shrink-0 items-center gap-2 bg-white px-3 shadow-[var(--shadow-header)]">
      <button
        type="button"
        onClick={onToggleNav}
        aria-expanded={navOpen}
        aria-controls="mobile-nav-c"
        aria-label={navOpen ? 'Close navigation' : 'Open navigation'}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-c-ink transition-colors active:bg-c-bg"
      >
        {navOpen ? <Close /> : <Burger />}
      </button>

      <span className="shrink-0 text-[15px] font-semibold tracking-tight text-c-ink">
        Placeholder Logo
      </span>

      {/* min-w-0 is what lets this shrink rather than push the row to wrap. */}
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="ml-auto flex min-w-0 flex-1 items-stretch"
      >
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Search insights"
          placeholder="Search…"
          className="w-full min-w-0 rounded-l-md border border-r-0 border-c-ink/15 bg-white px-2.5 py-2 text-c-ink outline-none focus:border-c-ink/40 placeholder:text-c-ink/40"
        />
        <button
          type="submit"
          aria-label="Search"
          className="flex w-10 shrink-0 items-center justify-center rounded-r-md bg-c-ink text-white transition-opacity active:opacity-90"
        >
          <Search />
        </button>
      </form>
    </header>
  )
}
