import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV, UTILITY_NAV, type NavItem } from '../data/nav'
import { Caret, ChevronDown, Close, Hamburger, QuestionCircle, UserCircle } from './icons'

/** True when the current path is inside this nav item's section. */
function isActiveSection(item: NavItem, pathname: string): boolean {
  if (item.to === '/') return pathname === '/'
  if (pathname === item.to || pathname.startsWith(`${item.to}/`)) return true
  return (item.children ?? []).some((c) => c.to === pathname)
}

/* ------------------------------------------------------------------ *
 * Desktop
 * ------------------------------------------------------------------ */

function DesktopMenu({
  item,
  active,
  openId,
  setOpenId,
  icon,
}: {
  item: NavItem
  active: boolean
  openId: string | null
  setOpenId: (id: string | null) => void
  icon?: React.ReactNode
}) {
  const open = openId === item.label
  const menuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // Move focus into the menu when it opens via keyboard, so Tab/arrows land somewhere useful.
  useEffect(() => {
    if (open) menuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()
  }, [open])

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape' && open) {
      setOpenId(null)
      triggerRef.current?.focus()
    }
    if (e.key === 'ArrowDown' && !open) {
      e.preventDefault()
      setOpenId(item.label)
    }
  }

  return (
    <div className="relative" onKeyDown={onKeyDown}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpenId(open ? null : item.label)}
        className={`flex h-[60px] items-center gap-1.5 px-4 text-white/90 transition-colors hover:bg-white/10 hover:text-white ${
          active ? 'font-semibold text-white' : ''
        }`}
      >
        {icon}
        <span className={icon ? 'sr-only' : ''}>{item.label}</span>
        <ChevronDown className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        {active && (
          <span className="absolute inset-x-3 bottom-0 h-[3px] rounded-t bg-accent" aria-hidden="true" />
        )}
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-label={item.label}
          className="absolute right-0 top-[60px] z-50 min-w-[200px] overflow-hidden rounded-b border border-border-subtle bg-white py-1 shadow-lg"
        >
          {item.children!.map((child) => (
            <NavLink
              key={child.to}
              to={child.to}
              role="menuitem"
              className={({ isActive }) =>
                `block px-4 py-2 text-txt transition-colors hover:bg-gray-100 ${
                  isActive ? 'bg-gray-100 font-semibold' : ''
                }`
              }
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Mobile — an in-flow expanding panel, per the mobile hamburger design.
 * Submenus expand in place as light panels rather than sliding over.
 * ------------------------------------------------------------------ */

function MobileRow({ item, icon }: { item: NavItem; icon?: React.ReactNode }) {
  const { pathname } = useLocation()
  const active = isActiveSection(item, pathname)
  const [open, setOpen] = useState(active && !!item.children)

  if (!item.children) {
    return (
      <NavLink
        to={item.to}
        className={`relative block py-3.5 pl-6 pr-4 text-white/90 hover:bg-white/5 ${
          active ? 'font-semibold text-white' : ''
        }`}
      >
        {active && (
          <span className="absolute inset-y-0 left-0 w-[3px] bg-accent-mobile" aria-hidden="true" />
        )}
        {item.label}
      </NavLink>
    )
  }

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`relative flex w-full items-center justify-between py-3.5 pl-6 pr-4 text-left text-white/90 hover:bg-white/5 ${
          active ? 'font-semibold text-white' : ''
        }`}
      >
        {(active || open) && (
          <span className="absolute inset-y-0 left-0 w-[3px] bg-accent-mobile" aria-hidden="true" />
        )}
        <span className="flex items-center gap-2">
          {icon}
          {item.label}
        </span>
        <Caret up={open} className="text-white/70" />
      </button>

      {/* Light nested panel, matching the mobile comp. */}
      <div
        className={`grid overflow-hidden bg-white transition-[grid-template-rows] duration-250 ease-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0">
          {item.children.map((child) => (
            <NavLink
              key={child.to}
              to={child.to}
              className={({ isActive }) =>
                `block py-2.5 pl-10 pr-4 text-txt transition-colors hover:bg-submenu-hover ${
                  isActive ? 'bg-submenu-hover font-semibold' : ''
                }`
              }
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

export default function Navbar() {
  const { pathname } = useLocation()
  const [openId, setOpenId] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  // Navigating always dismisses any open menu — otherwise a dropdown lingers
  // over the new page after you click one of its links.
  useEffect(() => {
    setOpenId(null)
    setMobileOpen(false)
  }, [pathname])

  // Outside click / Escape close the desktop dropdowns.
  useEffect(() => {
    if (!openId) return
    function onPointerDown(e: PointerEvent) {
      if (!navRef.current?.contains(e.target as Node)) setOpenId(null)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenId(null)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [openId])

  return (
    <header ref={navRef} className="sticky top-0 z-50 bg-nav-dark">
      <nav aria-label="Main" className="flex h-[60px] items-center px-6">
        <Link
          to="/"
          className="mr-2 text-[26px] font-semibold leading-none tracking-tight text-white lg:mr-6"
        >
          Logo
        </Link>

        {/* Desktop links */}
        <div className="ml-4 hidden flex-1 items-center lg:flex">
          {NAV.map((item) => {
            const active = isActiveSection(item, pathname)
            return item.children ? (
              <DesktopMenu
                key={item.label}
                item={item}
                active={active}
                openId={openId}
                setOpenId={setOpenId}
              />
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                className={`relative flex h-[60px] items-center px-4 text-white/90 transition-colors hover:bg-white/10 hover:text-white ${
                  active ? 'font-semibold text-white' : ''
                }`}
              >
                {item.label}
                {active && (
                  <span
                    className="absolute inset-x-3 bottom-0 h-[3px] rounded-t bg-accent"
                    aria-hidden="true"
                  />
                )}
              </NavLink>
            )
          })}
        </div>

        {/* Desktop utility menus */}
        <div className="ml-auto hidden items-center lg:flex">
          {UTILITY_NAV.map((item) => (
            <DesktopMenu
              key={item.label}
              item={item}
              active={isActiveSection(item, pathname)}
              openId={openId}
              setOpenId={setOpenId}
              icon={item.label === 'Profile' ? <UserCircle /> : <QuestionCircle />}
            />
          ))}
        </div>

        {/* Hamburger */}
        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((v) => !v)}
          className="ml-auto rounded p-2 text-white hover:bg-white/10 lg:hidden"
        >
          {mobileOpen ? <Close /> : <Hamburger />}
        </button>
      </nav>

      {/* Mobile panel — overlays the page rather than displacing it. Same
          0fr → 1fr row animation as before, but taken out of flow so opening the
          menu doesn't shove the content down. `top-full` hangs it off the bottom
          of the 60px bar; the sticky header is already a containing block. */}
      <div
        id="mobile-nav"
        className={`absolute inset-x-0 top-full grid overflow-hidden bg-nav-dark shadow-lg transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
          mobileOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        {/* A long menu scrolls itself instead of running off the viewport, since
            it can no longer lengthen the page to make room. */}
        <div className="min-h-0 max-h-[calc(100dvh-60px)] overflow-y-auto">
          <div className="pb-2">
            <p className="px-6 py-3 font-bold text-white">Account Name</p>
            {NAV.map((item) => (
              <MobileRow key={item.label} item={item} />
            ))}
            <div className="my-2 border-t border-white/15" />
            {UTILITY_NAV.map((item) => (
              <MobileRow
                key={item.label}
                item={item}
                icon={
                  item.label === 'Profile' ? (
                    <UserCircle className="opacity-80" />
                  ) : (
                    <QuestionCircle className="opacity-80" />
                  )
                }
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
