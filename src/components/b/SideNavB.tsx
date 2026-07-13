import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { NAV_B, type NavBItem } from '../../data/navB'
import { Avatar, Chevron, Collapse, MoreHoriz, NavIconB } from './iconsB'

function Item({ item, collapsed }: { item: NavBItem; collapsed: boolean }) {
  const { pathname } = useLocation()
  const active = (item.children ?? []).some((c) => c.to === pathname)
  const [open, setOpen] = useState(active)

  useEffect(() => {
    if (collapsed) setOpen(false)
  }, [collapsed])

  const row = 'flex w-full items-center gap-3 rounded px-4 py-3 text-left transition-colors'

  if (!item.children) {
    return (
      <NavLink
        to={item.to!}
        title={collapsed ? item.label : undefined}
        className={({ isActive }) =>
          `${row} ${
            isActive
              ? 'bg-b-selected font-medium text-b-primary'
              : 'text-b-text hover:bg-black/[0.04]'
          } ${collapsed ? 'justify-center px-0' : ''}`
        }
      >
        <NavIconB name={item.icon} />
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
        className={`${row} ${
          active ? 'bg-b-selected font-medium text-b-primary' : 'text-b-text hover:bg-black/[0.04]'
        } ${collapsed ? 'justify-center px-0' : ''}`}
      >
        <NavIconB name={item.icon} />
        {!collapsed && (
          <>
            <span className="flex-1 truncate">{item.label}</span>
            <Chevron up={open} className="text-b-muted" />
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
            {item.children.map((child) => (
              <NavLink
                key={child.to}
                to={child.to}
                className={({ isActive }) =>
                  `block rounded py-2.5 pl-[52px] pr-4 transition-colors ${
                    isActive
                      ? 'bg-b-selected font-medium text-b-primary'
                      : 'text-b-muted hover:bg-black/[0.04] hover:text-b-text'
                  }`
                }
              >
                {child.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function SideNavB({
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
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        aria-label="Sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-b-divider bg-b-paper transition-[width,transform] duration-300 ease-out lg:translate-x-0 ${
          collapsed ? 'lg:w-[80px]' : 'lg:w-[296px]'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Brand */}
        <div className="flex h-14 items-center justify-between gap-2 px-4">
          {!collapsed && (
            <span className="truncate px-2 font-medium text-b-brand">Placeholder Logo</span>
          )}
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className={`hidden shrink-0 rounded p-1.5 text-b-muted transition-colors hover:bg-black/[0.04] lg:block ${
              collapsed ? 'mx-auto rotate-180' : ''
            }`}
          >
            <Collapse />
          </button>
        </div>

        {/* Sections */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-2 pb-4">
          {NAV_B.map((section, i) => (
            <div key={section.heading ?? i} className={i > 0 ? 'pt-3' : ''}>
              {section.heading && !collapsed && (
                <p className="px-4 pb-1 pt-2 font-medium text-b-text">{section.heading}</p>
              )}
              {/* Collapsed rail keeps the grouping as a rule rather than a word. */}
              {section.heading && collapsed && <hr className="mx-3 my-2 border-b-divider" />}

              {section.items.map((item) => (
                <Item key={item.label} item={item} collapsed={collapsed} />
              ))}
            </div>
          ))}
        </nav>

        {/* Account */}
        <div className="border-t border-b-divider p-2">
          <button
            type="button"
            title={collapsed ? 'Account Name' : undefined}
            className={`flex w-full items-center gap-3 rounded px-3 py-2 text-left transition-colors hover:bg-black/[0.04] ${
              collapsed ? 'justify-center px-0' : ''
            }`}
          >
            <Avatar className="h-8 w-8" />
            {!collapsed && (
              <>
                <span className="flex-1 truncate text-b-text">Account Name</span>
                <MoreHoriz className="text-b-muted" />
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  )
}
