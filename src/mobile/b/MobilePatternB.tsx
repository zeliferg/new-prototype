import { useState } from 'react'
import ContainerCard, { type Item, type Status } from '../../components/b/ContainerCard'
import { PAGES_B } from '../../data/navB'
import MobileNavB from './MobileNavB'
import MobileTopBarB from './MobileTopBarB'

const STATUSES: Status[] = ['Success', 'Running', 'Failed']

const DETAIL =
  'Last run completed against the current catalog. No anomalies detected in the propagated state vector.'

function seed(container: number): Item[] {
  return [{ id: `c${container}-1`, label: 'Item 1', status: 'Success', detail: DETAIL }]
}

/** Refreshing cycles the item's status, so the button visibly does something. */
function cycle(items: Item[]): Item[] {
  return items.map((i) => ({
    ...i,
    status: STATUSES[(STATUSES.indexOf(i.status) + 1) % STATUSES.length],
  }))
}

/**
 * Pattern B at phone size, built from the Figma mobile frame.
 *
 * Unlike A, C, and D — which the mobile route renders through an iframe so their
 * `lg:` branches resolve against a phone viewport — this shell is mobile-only
 * markup, so it mounts directly and needs no frame.
 *
 * Selection lives in state rather than the URL. The desktop shell keys off
 * `useLocation` and owns the `/b/*` namespace; this screen is mounted under
 * `/mobile/b`, so driving it from the path would fight the route it sits on.
 */
export default function MobilePatternB() {
  const [navOpen, setNavOpen] = useState(false)
  const [active, setActive] = useState('/b')
  const [c1, setC1] = useState<Item[]>(() => seed(1))
  const [c2, setC2] = useState<Item[]>(() => seed(2))

  const title = PAGES_B[active] ?? 'Dashboard'

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#f5f5f5] font-b text-b-text">
      <MobileTopBarB onOpenNav={() => setNavOpen(true)} notifications={3} />

      <main className="flex-1 overflow-y-auto px-4 pb-28 pt-6">
        {/* The frame shows no page heading, matching the desktop shell, which also
            keeps its title for assistive tech only. */}
        <h1 className="sr-only">{title}</h1>

        <div className="flex flex-col gap-4">
          <ContainerCard title="Container 1" items={c1} onRefresh={() => setC1(cycle)} />
          <ContainerCard title="Container 2" items={c2} onRefresh={() => setC2(cycle)} />
        </div>
      </main>

      {navOpen && (
        <MobileNavB
          active={active}
          onSelect={(to) => {
            setActive(to)
            setNavOpen(false)
          }}
          onClose={() => setNavOpen(false)}
        />
      )}
    </div>
  )
}
