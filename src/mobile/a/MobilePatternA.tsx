import { useMemo, useState } from 'react'
import DataTable from '../../components/a/DataTable'
import { SearchIcon } from '../../components/a/iconsA'
import { COMMUNITIES, PAGES_A } from '../../data/navA'
import { ROWS } from '../../data/properties'
import { NOTIFICATIONS } from '../../data/topbar'
import CommunityPicker from './CommunityPicker'
import CommunityStrip from './CommunityStrip'
import MobileNavA from './MobileNavA'
import MobileTopBarA from './MobileTopBarA'

/**
 * Pattern A at phone size.
 *
 * Same split as Pattern B's mobile shell: a three-item app bar over the page, with
 * everything else behind the drawer. The one structural change from desktop is
 * search — too wide to sit in a phone app bar, so it moves directly under the page
 * heading, which is also where a search that filters this page's table belongs.
 *
 * Selection lives in state rather than the URL, because the desktop shell owns the
 * `/a/*` namespace and this screen is mounted at `/mobile/a`.
 */
export default function MobilePatternA() {
  const [navOpen, setNavOpen] = useState(false)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [active, setActive] = useState('/a/property/basic')
  const [query, setQuery] = useState('')
  // Scope lives here, above both the strip that displays it and the picker that
  // edits it, so neither owns it.
  const [communities, setCommunities] = useState<number[]>([COMMUNITIES[0].id])

  const page = PAGES_A[active] ?? { parent: 'Home', title: 'Dashboard' }
  const unread = NOTIFICATIONS.filter((n) => !n.read).length

  // Same filter the desktop top-bar search runs, matching its placeholder's promise.
  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ROWS
    return ROWS.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.userType.toLowerCase().includes(q) ||
        String(r.price).includes(q),
    )
  }, [query])

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-a-gray-50 font-a text-a-gray-600">
      <MobileTopBarA onOpenNav={() => setNavOpen(true)} unread={unread} />
      <CommunityStrip selected={communities} onOpen={() => setPickerOpen(true)} />

      <main className="flex-1 overflow-y-auto px-4 pb-28 pt-5">
        <nav aria-label="Breadcrumb" className="text-[12px]">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li className="text-a-gray-450">{page.parent}</li>
            <li aria-hidden="true" className="text-a-gray-450">
              /
            </li>
            <li aria-current="page" className="font-bold text-a-blue">
              {page.title}
            </li>
          </ol>
        </nav>

        <h1 className="mt-2 text-[24px] font-bold text-a-ink">{page.title}</h1>

        {/* Search, relocated out of the app bar. */}
        <div className="relative mt-4">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-a-gray-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search records"
            placeholder="Search by Name, Plate, Year, Make, Model, or Color"
            className="w-full rounded-full border border-a-gray-100 bg-white py-2.5 pl-10 pr-4 text-a-gray-600 outline-none transition-colors focus:border-a-blue placeholder:text-a-gray-400"
          />
        </div>

        <section className="mt-5 rounded-lg bg-white p-4 shadow-[var(--shadow-a-1)]">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-[17px] font-bold text-a-ink">Header1</h2>
            <button
              type="button"
              className="rounded-lg border border-a-blue px-4 py-2 font-bold text-a-blue transition-colors active:bg-a-blue-bg"
            >
              Lorem Ipsum
            </button>
          </div>

          <DataTable rows={rows} />
        </section>
      </main>

      {navOpen && (
        <MobileNavA
          active={active}
          onSelect={(to) => {
            setActive(to)
            setNavOpen(false)
          }}
          onClose={() => setNavOpen(false)}
        />
      )}

      {/* Opens from the page, not from inside the drawer, so the two are never
          stacked and each owns Escape while it's the only thing open. */}
      {pickerOpen && (
        <CommunityPicker
          selected={communities}
          onCommit={(ids) => {
            setCommunities(ids)
            setPickerOpen(false)
          }}
          onClose={() => setPickerOpen(false)}
        />
      )}
    </div>
  )
}
