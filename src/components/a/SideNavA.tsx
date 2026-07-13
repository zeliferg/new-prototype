import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { NAV_A, type NavAItem } from '../../data/navA'
import CommunitySwitcher from './CommunitySwitcher'
import { Chev, Compress, NavIconA } from './iconsA'

function Group({ item, collapsed }: { item: NavAItem; collapsed: boolean }) {
  const { pathname } = useLocation()
  const active = (item.children ?? []).some((c) => c.to === pathname)
  const [open, setOpen] = useState(active)

  useEffect(() => {
    if (collapsed) setOpen(false)
  }, [collapsed])

  // Leaf item (Dashboard, Search).
  if (!item.children) {
    return (
      <NavLink
        to={item.to!}
        title={collapsed ? item.label : undefined}
        className={({ isActive }) =>
          `relative flex items-center gap-4 py-3 pl-6 pr-4 transition-colors ${
            isActive
              ? 'bg-a-blue-bg font-bold text-a-blue'
              : 'text-a-gray-600 hover:bg-a-gray-50'
          } ${collapsed ? 'justify-center px-0' : ''}`
        }
      >
        {({ isActive }) => (
          <>
            {isActive && (
              <span className="absolute inset-y-0 left-0 w-[5px] bg-a-blue" aria-hidden="true" />
            )}
            <NavIconA name={item.icon} />
            {!collapsed && <span className="truncate">{item.label}</span>}
          </>
        )}
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
        className={`relative flex w-full items-center gap-4 py-3 pl-6 pr-4 text-left transition-colors ${
          active ? 'text-a-blue' : 'text-a-gray-600'
        } hover:bg-a-gray-50 ${collapsed ? 'justify-center px-0' : ''}`}
      >
        {active && <span className="absolute inset-y-2 left-0 w-[5px] bg-a-blue" aria-hidden="true" />}
        <NavIconA name={item.icon} />
        {!collapsed && (
          <>
            <span className="flex-1 truncate">{item.label}</span>
            <Chev dir={open ? 'up' : 'down'} className="text-a-gray-400" />
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
                  `relative block py-3 pl-[70px] pr-4 transition-colors ${
                    isActive
                      ? 'bg-a-blue-bg font-bold text-a-blue'
                      : 'text-a-gray-600 hover:bg-a-gray-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span
                        className="absolute inset-y-0 left-0 w-[5px] bg-a-blue"
                        aria-hidden="true"
                      />
                    )}
                    {child.label}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function SideNavA({
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
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col overflow-y-auto border-r border-a-gray-100 bg-white transition-[width,transform] duration-300 ease-out lg:translate-x-0 ${
          collapsed ? 'lg:w-[84px]' : 'lg:w-[296px]'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Brand */}
        <div className="flex items-start justify-between gap-2 px-6 py-5">
          {!collapsed && (
            <span className="text-[19px] font-bold leading-tight text-a-blue">
              Placeholder
              <br />
              Logo
            </span>
          )}
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className={`hidden shrink-0 rounded p-1 text-a-gray-400 transition-colors hover:bg-a-gray-50 hover:text-a-gray-600 lg:block ${
              collapsed ? 'mx-auto rotate-180' : ''
            }`}
          >
            <Compress />
          </button>
        </div>

        <CommunitySwitcher collapsed={collapsed} />

        <nav className="mt-5 flex-1 pb-6">
          {NAV_A.map((item) => (
            <Group key={item.label} item={item} collapsed={collapsed} />
          ))}
        </nav>
      </aside>
    </>
  )
}
