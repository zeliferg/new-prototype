import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { NAV_C, NAV_C_BOTTOM, type NavCItem } from '../../data/navC'
import { Chevron, NavIcon } from './iconsC'

function isActive(item: NavCItem, pathname: string) {
  if (pathname === item.to) return true
  return (item.children ?? []).some((c) => c.to === pathname)
}

function Item({ item, collapsed }: { item: NavCItem; collapsed: boolean }) {
  const { pathname } = useLocation()
  const active = isActive(item, pathname)
  const [open, setOpen] = useState(active)

  // A collapsed rail has no room for submenus, so fold them away with it.
  useEffect(() => {
    if (collapsed) setOpen(false)
  }, [collapsed])

  const rowBase =
    'flex w-full items-center gap-3 rounded px-3 py-2.5 text-left transition-colors duration-150'

  /** Selected nav item: Action/Selected (#28548A) at 24%, 4px radius. */
  const selected = 'bg-c-selected/24 font-medium text-c-ink'
  const unselected = 'text-c-ink/80 hover:bg-c-selected/10 hover:text-c-ink'

  if (!item.children) {
    return (
      <NavLink
        to={item.to}
        title={collapsed ? item.label : undefined}
        className={({ isActive: a }) =>
          `${rowBase} ${a ? selected : unselected} ${collapsed ? 'justify-center px-0' : ''}`
        }
      >
        <NavIcon name={item.icon} />
        {!collapsed && <span className="truncate">{item.label}</span>}
      </NavLink>
    )
  }

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        title={collapsed ? item.label : undefined}
        onClick={() => setOpen((v) => !v)}
        className={`${rowBase} ${active ? selected : unselected} ${
          collapsed ? 'justify-center px-0' : ''
        }`}
      >
        <NavIcon name={item.icon} />
        {!collapsed && (
          <>
            <span className="flex-1 truncate">{item.label}</span>
            <Chevron dir={open ? 'up' : 'down'} className="text-c-ink/60" />
          </>
        )}
      </button>

      {!collapsed && (
        <div
          className={`grid overflow-hidden transition-[grid-template-rows] duration-250 ease-out ${
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="min-h-0">
            <div className="mt-0.5 ml-[22px] border-l border-c-ink/10 pl-3">
              {item.children.map((child) => (
                <NavLink
                  key={child.to}
                  to={child.to}
                  className={({ isActive: a }) =>
                    `block rounded px-3 py-2 text-[0.95em] transition-colors ${
                      a ? selected : unselected
                    }`
                  }
                >
                  {child.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function SideNav({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}: {
  collapsed: boolean
  onToggleCollapse: () => void
  mobileOpen: boolean
  onCloseMobile: () => void
}) {
  return (
    <>
      {/* Scrim — mobile only, since the sidebar overlays content there. */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        aria-label="Sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-white shadow-[var(--shadow-side-nav)] transition-[width,transform] duration-300 ease-out lg:translate-x-0 ${
          collapsed ? 'lg:w-[76px]' : 'lg:w-[294px]'
        } w-[280px] ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Brand */}
        <div className="flex h-[80px] items-center justify-between gap-2 px-4">
          {!collapsed && (
            <span className="truncate text-[19px] font-semibold tracking-tight text-c-ink">
              Placeholder Logo
            </span>
          )}
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className={`hidden h-7 w-7 shrink-0 items-center justify-center rounded-md border border-c-ink/10 bg-white text-c-ink/70 shadow-sm transition-colors hover:bg-c-bg lg:flex ${
              collapsed ? 'mx-auto' : ''
            }`}
          >
            <Chevron dir={collapsed ? 'right' : 'left'} />
          </button>
        </div>

        {/* Primary nav */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {NAV_C.map((item) => (
            <Item key={item.label} item={item} collapsed={collapsed} />
          ))}
        </nav>

        {/* Bottom nav */}
        <div className="space-y-1 border-t border-c-ink/10 px-3 py-4">
          {NAV_C_BOTTOM.map((item) => (
            <Item key={item.label} item={item} collapsed={collapsed} />
          ))}
        </div>
      </aside>
    </>
  )
}
