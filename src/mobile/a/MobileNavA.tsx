import { useEffect, useState } from 'react'
import { Chev, HelpCircle, NavIconA, User } from '../../components/a/iconsA'
import { Close } from '../../components/icons'
import { NAV_A, type NavAItem } from '../../data/navA'
import { ACCOUNT, ACCOUNT_LINKS, LANGUAGES } from '../../data/topbar'
import PlaceholderLogoA from './PlaceholderLogoA'

/** Rows sit on the same 54px pitch as Pattern B's mobile menu. */
const ROW = 'flex w-full min-h-[54px] items-center gap-3 rounded-lg px-3 py-3 text-left'
const SELECTED = 'bg-a-blue-bg font-bold text-a-blue'
const IDLE = 'text-a-gray-600 active:bg-a-gray-50'

/**
 * A row that expands its children in place, matching the desktop SideNavA.
 *
 * Deliberately never takes the selected treatment. A group is a container, not a
 * destination — highlighting both "Property Tools" and "Basic Information" reads
 * as two current pages. The blue belongs to the leaf you're actually on; the group
 * says where you are by being open.
 */
function Expandable({
  label,
  icon,
  open,
  onToggle,
  children,
}: {
  label: string
  icon: React.ReactNode
  open: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className={`${ROW} ${IDLE}`}
      >
        {icon}
        <span className="flex-1">{label}</span>
        <Chev dir={open ? 'up' : 'down'} className="shrink-0 text-a-gray-400" />
      </button>

      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-250 ease-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0">{children}</div>
      </div>
    </div>
  )
}

function NavRow({
  item,
  active,
  onSelect,
}: {
  item: NavAItem
  active: string
  onSelect: (to: string) => void
}) {
  const holdsActive = (item.children ?? []).some((c) => c.to === active)
  const [open, setOpen] = useState(holdsActive)
  const icon = <NavIconA name={item.icon} className="h-5 w-5 shrink-0" />

  if (!item.children) {
    const on = item.to === active
    return (
      <button
        type="button"
        aria-current={on ? 'page' : undefined}
        onClick={() => onSelect(item.to!)}
        className={`${ROW} ${on ? SELECTED : IDLE}`}
      >
        {icon}
        <span className="flex-1">{item.label}</span>
      </button>
    )
  }

  return (
    <Expandable label={item.label} icon={icon} open={open} onToggle={() => setOpen((v) => !v)}>
      {item.children.map((child) => {
        const on = child.to === active
        return (
          <button
            key={child.to}
            type="button"
            aria-current={on ? 'page' : undefined}
            onClick={() => onSelect(child.to)}
            /* Indented past the icon column (20px glyph + 12px gap) so child labels
               line up under their parent's label. */
            className={`flex min-h-[48px] w-full items-center rounded-lg py-2 pl-11 pr-3 text-left ${
              on ? SELECTED : 'text-a-gray-500 active:bg-a-gray-50'
            }`}
          >
            {child.label}
          </button>
        )
      })}
    </Expandable>
  )
}

/**
 * Pattern A's phone drawer.
 *
 * Destinations and account-level settings — navigation, language, help, account.
 * The two things the desktop shell keeps alongside them stay out: search moves
 * under the page heading, and the community switcher becomes page chrome, since
 * neither is somewhere you go. Structured to match Pattern B's mobile menu: a
 * pinned header over a single scrolling column.
 */
export default function MobileNavA({
  active,
  onSelect,
  onClose,
}: {
  active: string
  onSelect: (to: string) => void
  onClose: () => void
}) {
  const [utility, setUtility] = useState<'lang' | 'help' | 'account' | null>(null)
  const [lang, setLang] = useState(LANGUAGES[2]) // English (US)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const toggle = (m: 'lang' | 'help' | 'account') =>
    setUtility((c) => (c === m ? null : m))

  return (
    <div className="absolute inset-0 z-20 flex flex-col bg-white font-a">
      {/* Header sits outside the scroll area so the brand and close button hold
          their place while the list travels underneath. */}
      <div className="relative z-10 flex h-14 shrink-0 items-center gap-4 border-b border-a-gray-100 bg-white pl-4 pr-2">
        <PlaceholderLogoA className="flex-1" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-a-gray-500 active:bg-a-gray-50"
        >
          <Close />
        </button>
      </div>

      {/* No community switcher here: scope is page chrome, not a destination, so it
          lives in CommunityStrip under the app bar. Anchoring its 479px panel inside
          this drawer put an overlay on an overlay, stacked two scroll surfaces, and
          made one Escape close both layers at once. */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <nav aria-label="Pattern A" className="px-3 pt-4">
          {NAV_A.map((item) => (
            <NavRow key={item.label} item={item} active={active} onSelect={onSelect} />
          ))}
        </nav>

        <hr className="mx-4 mt-4 border-a-gray-100" />

        {/* The top bar's menus on desktop; rows here, since a phone has no room
            for a dropdown anchored to a 36px button. */}
        <div className="px-3 py-2">
          <Expandable
            label={lang.label}
            icon={<span className="w-5 shrink-0 text-center text-[17px] leading-none">{lang.flag}</span>}
            open={utility === 'lang'}
            onToggle={() => toggle('lang')}
          >
            <div className="max-h-[240px] overflow-y-auto">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  aria-checked={l.code === lang.code}
                  role="menuitemradio"
                  onClick={() => {
                    setLang(l)
                    setUtility(null)
                  }}
                  className={`flex min-h-[44px] w-full items-center gap-3 rounded-lg py-2 pl-11 pr-3 text-left ${
                    l.code === lang.code ? SELECTED : 'text-a-gray-500 active:bg-a-gray-50'
                  }`}
                >
                  <span className="text-[15px] leading-none">{l.flag}</span>
                  <span className="truncate">{l.label}</span>
                </button>
              ))}
            </div>
          </Expandable>

          <Expandable
            label="Help"
            icon={<HelpCircle className="h-5 w-5 shrink-0" />}
            open={utility === 'help'}
            onToggle={() => toggle('help')}
          >
            <p className="py-2 pl-11 pr-3 text-[13px] leading-relaxed text-a-gray-500">
              Contact us at{' '}
              <a href="mailto:support@support.com" className="font-bold text-a-blue underline">
                support@support.com
              </a>{' '}
              for assistance and we'll be happy to help you!
            </p>
          </Expandable>
        </div>

        <hr className="mx-4 border-a-gray-100" />

        <div className="px-3 py-2">
          <Expandable
            label={ACCOUNT.name}
            icon={
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-a-blue-bg text-a-blue">
                <User className="h-3.5 w-3.5" />
              </span>
            }
            open={utility === 'account'}
            onToggle={() => toggle('account')}
          >
            <p className="pb-1 pl-11 pr-3 text-[12px] text-a-gray-400">{ACCOUNT.email}</p>
            {ACCOUNT_LINKS.map((l) => (
              <button
                key={l}
                type="button"
                className="flex min-h-[44px] w-full items-center rounded-lg py-2 pl-11 pr-3 text-left text-a-gray-500 active:bg-a-gray-50"
              >
                {l}
              </button>
            ))}
          </Expandable>

          <button type="button" className={`${ROW} ${IDLE}`}>
            <span className="w-5 shrink-0" aria-hidden />
            <span className="flex-1">Log out</span>
          </button>
        </div>

        <div className="h-6" />
      </div>
    </div>
  )
}
