import { useEffect, useRef, useState } from 'react'
import {
  ACCOUNT,
  ACCOUNT_LINKS,
  LANGUAGES,
  NOTIFICATIONS,
  type Notification,
} from '../../data/topbar'
import { Bell, Burger, HelpCircle, SearchIcon, User } from './iconsA'

type Menu = 'help' | 'lang' | 'bell' | 'user' | null

/** Icon button in the bar. The open menu's trigger fills solid blue. */
function IconButton({
  label,
  active,
  onClick,
  children,
  badge,
}: {
  label: string
  active: boolean
  onClick: () => void
  children: React.ReactNode
  badge?: boolean
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-expanded={active}
      aria-haspopup="menu"
      onClick={onClick}
      className={`relative flex h-9 w-9 items-center justify-center rounded transition-colors ${
        active ? 'bg-a-blue text-white' : 'text-a-gray-500 hover:bg-a-gray-50 hover:text-a-blue'
      }`}
    >
      {children}
      {badge && (
        <span
          aria-hidden="true"
          className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-a-blue ring-2 ring-white"
        />
      )}
    </button>
  )
}

const panel =
  'absolute right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-lg border border-a-gray-100 bg-white shadow-[var(--shadow-a-3)]'

export default function TopBarA({
  query,
  onQueryChange,
  onOpenMobileNav,
}: {
  query: string
  onQueryChange: (v: string) => void
  onOpenMobileNav: () => void
}) {
  // One open menu at a time — opening any menu implicitly closes the rest.
  const [menu, setMenu] = useState<Menu>(null)
  const [lang, setLang] = useState(LANGUAGES[2]) // English (US)
  const [notes, setNotes] = useState<Notification[]>(NOTIFICATIONS)

  const ref = useRef<HTMLDivElement>(null)
  const unread = notes.filter((n) => !n.read).length

  useEffect(() => {
    if (!menu) return
    function onDown(e: PointerEvent) {
      if (!ref.current?.contains(e.target as Node)) setMenu(null)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenu(null)
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [menu])

  const toggle = (m: Exclude<Menu, null>) => setMenu((c) => (c === m ? null : m))

  function markRead(id: number) {
    setNotes((ns) => ns.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-a-gray-100 bg-white px-4">
      <button
        type="button"
        onClick={onOpenMobileNav}
        aria-label="Open navigation"
        className="rounded p-2 text-a-gray-500 hover:bg-a-gray-50 lg:hidden"
      >
        <Burger />
      </button>

      <div className="relative w-full max-w-[478px]">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-a-gray-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Search records"
          placeholder="Search by Name, Plate, Year, Make, Model, or Color"
          className="w-full rounded-full border border-a-gray-100 bg-white py-2 pl-10 pr-4 text-a-gray-600 outline-none transition-colors focus:border-a-blue placeholder:text-a-gray-400"
        />
      </div>

      <div ref={ref} className="relative ml-auto flex items-center gap-1">
        {/* Language */}
        <div className="relative">
          <IconButton label="Change language" active={menu === 'lang'} onClick={() => toggle('lang')}>
            <span className="text-[18px] leading-none">{lang.flag}</span>
          </IconButton>

          {menu === 'lang' && (
            <ul role="menu" className={`${panel} max-h-[340px] w-[190px] overflow-y-auto py-1`}>
              {LANGUAGES.map((l) => (
                <li key={l.code}>
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked={l.code === lang.code}
                    onClick={() => {
                      setLang(l)
                      setMenu(null)
                    }}
                    className={`flex w-full items-center gap-2.5 px-3 py-1.5 text-left transition-colors hover:bg-a-blue-bg ${
                      l.code === lang.code ? 'bg-a-blue-bg font-bold text-a-blue' : 'text-a-gray-600'
                    }`}
                  >
                    <span className="text-[15px] leading-none">{l.flag}</span>
                    <span className="truncate text-[13px]">{l.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Help */}
        <div className="relative">
          <IconButton label="Help" active={menu === 'help'} onClick={() => toggle('help')}>
            <HelpCircle />
          </IconButton>

          {menu === 'help' && (
            <div role="dialog" aria-label="Help" className={`${panel} w-[280px] p-4`}>
              <div className="flex items-start justify-between gap-3">
                <p className="font-bold text-a-ink">Need any help?</p>
                <button
                  type="button"
                  onClick={() => setMenu(null)}
                  aria-label="Close help"
                  className="rounded p-0.5 text-a-gray-400 hover:text-a-gray-600"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <hr className="my-3 border-a-gray-100" />
              <p className="text-[13px] leading-relaxed text-a-gray-500">
                Contact us at{' '}
                <a href="mailto:support@support.com" className="font-bold text-a-blue hover:underline">
                  support@support.com
                </a>{' '}
                for assistance and we'll be happy to help you!
              </p>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <IconButton
            label={`Notifications${unread ? ` (${unread} unread)` : ''}`}
            active={menu === 'bell'}
            onClick={() => toggle('bell')}
            badge={unread > 0 && menu !== 'bell'}
          >
            <Bell />
          </IconButton>

          {menu === 'bell' && (
            <div role="dialog" aria-label="Notifications" className={`${panel} w-[280px]`}>
              <div className="flex items-center justify-between border-b border-a-gray-100 px-4 py-3">
                <p className="font-bold text-a-ink">Notifications</p>
                <button
                  type="button"
                  aria-label="Notification settings"
                  className="text-a-blue transition-opacity hover:opacity-70"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 8.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5zm9-.5-2.1-.6a7 7 0 0 0-.7-1.7l1-1.9-2-2-1.9 1a7 7 0 0 0-1.7-.7L13 0h-2l-.6 2.1a7 7 0 0 0-1.7.7l-1.9-1-2 2 1 1.9a7 7 0 0 0-.7 1.7L3 8v2l2.1.6c.2.6.4 1.2.7 1.7l-1 1.9 2 2 1.9-1c.5.3 1.1.5 1.7.7L11 18h2l.6-2.1a7 7 0 0 0 1.7-.7l1.9 1 2-2-1-1.9c.3-.5.5-1.1.7-1.7L21 10z" transform="translate(0 3)" />
                  </svg>
                </button>
              </div>

              <ul className="max-h-[260px] overflow-y-auto">
                {notes.map((n) => (
                  <li
                    key={n.id}
                    className="flex gap-2 border-b border-a-gray-100 px-4 py-3 last:border-0"
                  >
                    <span
                      aria-hidden="true"
                      className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                        n.read ? 'bg-transparent' : 'bg-a-blue'
                      }`}
                    />
                    <div className="min-w-0">
                      <p className="text-[13px] text-a-gray-600">{n.text}</p>
                      <p className="mt-0.5 flex items-center gap-2 text-[11px] text-a-gray-400">
                        {n.age}
                        {!n.read && (
                          <button
                            type="button"
                            onClick={() => markRead(n.id)}
                            className="text-a-blue hover:underline"
                          >
                            Set as read
                          </button>
                        )}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-a-gray-100 px-4 py-2.5">
                <button type="button" className="text-[13px] text-a-blue hover:underline">
                  View all Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Account */}
        <div className="relative">
          <IconButton label="Account" active={menu === 'user'} onClick={() => toggle('user')}>
            <User />
          </IconButton>

          {menu === 'user' && (
            <div role="menu" aria-label="Account" className={`${panel} w-[220px]`}>
              <div className="flex items-center gap-3 px-4 py-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-a-blue-bg text-a-blue">
                  <User className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-bold text-a-ink">{ACCOUNT.name}</span>
                  <span className="block truncate text-[12px] text-a-gray-400">{ACCOUNT.email}</span>
                </span>
              </div>

              <hr className="border-a-gray-100" />

              <div className="py-1">
                {ACCOUNT_LINKS.map((l) => (
                  <button
                    key={l}
                    type="button"
                    role="menuitem"
                    onClick={() => setMenu(null)}
                    className="block w-full px-4 py-2 text-left text-a-gray-600 transition-colors hover:bg-a-blue-bg hover:text-a-blue"
                  >
                    {l}
                  </button>
                ))}
              </div>

              <hr className="border-a-gray-100" />

              <div className="py-1">
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => setMenu(null)}
                  className="block w-full px-4 py-2 text-left text-a-gray-600 transition-colors hover:bg-a-blue-bg hover:text-a-blue"
                >
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
