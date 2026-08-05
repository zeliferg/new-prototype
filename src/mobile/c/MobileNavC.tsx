import { useEffect, useState } from 'react'
import { Chevron, NavIcon } from '../../components/c/iconsC'
import { NAV_C, NAV_C_BOTTOM, type NavCItem } from '../../data/navC'

/** Pattern C's own selected treatment: Action/Selected at 24%. */
const SELECTED = 'bg-c-selected/24 font-medium text-c-ink'
const IDLE = 'text-c-ink/80 active:bg-c-selected/10'
const ROW = 'flex w-full min-h-[48px] items-center gap-3 rounded px-3 py-2.5 text-left transition-colors'

function NavRow({
  item,
  active,
  onSelect,
}: {
  item: NavCItem
  active: string
  onSelect: (to: string) => void
}) {
  const holdsActive = (item.children ?? []).some((c) => c.to === active)
  const [open, setOpen] = useState(holdsActive)

  if (!item.children) {
    const on = item.to === active
    return (
      <button
        type="button"
        aria-current={on ? 'page' : undefined}
        onClick={() => onSelect(item.to)}
        className={`${ROW} ${on ? SELECTED : IDLE}`}
      >
        <NavIcon name={item.icon} />
        <span className="flex-1 truncate">{item.label}</span>
      </button>
    )
  }

  return (
    <div>
      {/* A group is a container, not a destination — the open chevron says where
          you are, and the fill stays on the leaf you're actually on. */}
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`${ROW} ${IDLE}`}
      >
        <NavIcon name={item.icon} />
        <span className="flex-1 truncate">{item.label}</span>
        <Chevron dir={open ? 'up' : 'down'} className="shrink-0 text-c-ink/60" />
      </button>

      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-250 ease-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0">
          {item.children.map((child) => {
            const on = child.to === active
            return (
              <button
                key={child.to}
                type="button"
                aria-current={on ? 'page' : undefined}
                onClick={() => onSelect(child.to)}
                className={`flex min-h-[44px] w-full items-center rounded py-2 pl-10 pr-3 text-left transition-colors ${
                  on ? SELECTED : IDLE
                }`}
              >
                {child.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/**
 * Pattern C's phone navigation: a panel that rolls down from under the bar.
 *
 * A left drawer is a desktop idiom borrowed from the sidebar; on a phone the menu
 * belongs where the control that opens it is. The bar stays above and uninterrupted,
 * so the hamburger doubles as the close button and search stays reachable with the
 * menu open — which is why this has no header of its own.
 *
 * The open/close animation is a `0fr → 1fr` grid row rather than a transform, so
 * the panel clips itself and never needs a fixed height. `top-16` hangs it off the
 * 56px bar; the shell above is the containing block.
 */
export default function MobileNavC({
  open,
  active,
  onSelect,
  onClose,
}: {
  open: boolean
  active: string
  onSelect: (to: string) => void
  onClose: () => void
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <>
      {/* Starts below the bar, so tapping the hamburger to close never lands on
          the scrim instead. */}
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-hidden={!open}
        aria-label="Close navigation"
        onClick={onClose}
        className={`absolute inset-x-0 bottom-0 top-16 z-30 bg-black/30 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div
        id="mobile-nav-c"
        className={`absolute inset-x-0 top-16 z-40 grid overflow-hidden bg-white shadow-[var(--shadow-card)] transition-[grid-template-rows] duration-300 ease-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        {/* Capped so a long menu scrolls itself: an overlaid panel can't lengthen
            the page to make room the way an in-flow one could.

            Padding goes on the inner wrapper, never on this row item — a padded
            grid item keeps its padding at 0fr, leaving a sliver of menu on screen
            when the panel is meant to be shut. */}
        <nav
          aria-label="Pattern C"
          aria-hidden={!open}
          className="min-h-0 max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain"
        >
          <div className="px-2 py-2">
            {NAV_C.map((item) => (
              <NavRow key={item.label} item={item} active={active} onSelect={onSelect} />
            ))}

            {/* Settings and Logout keep their separation from the destinations above. */}
            <div className="mt-2 border-t border-c-ink/10 pt-2">
              {NAV_C_BOTTOM.map((item) => (
                <NavRow key={item.label} item={item} active={active} onSelect={onSelect} />
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
