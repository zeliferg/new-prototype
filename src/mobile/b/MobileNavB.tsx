import { useEffect, useState } from 'react'
import { Avatar, Chevron, NavIconB } from '../../components/b/iconsB'
import { Close } from '../../components/icons'
import { NAV_B, type NavBItem } from '../../data/navB'
import logoutIcon from './assets/logout.svg'

/* The frame's palette. Pattern B's tokens in index.css describe the desktop shell
   (#16395b brand, #e8eef4 selected); the phone design uses its own values, kept
   literal here the way PatternSwitcher keeps its #001022 rather than widening a
   shared token that desktop also reads. */
const BRAND = 'text-[#003d78]'
const ITEM = 'text-[#3c3d42]'
const HEADING = 'text-[#121826]'
const SELECTED = 'bg-[#e3ebf8]'

/** Rows sit on a 54px pitch: the design's 30px row plus its 24px gap, moved inside
 *  the control so the whole pitch is tappable instead of just the text. */
const ROW = 'flex w-full min-h-[54px] items-center gap-2 rounded-[8px] px-2 text-left'

function NavRow({
  item,
  active,
  onSelect,
}: {
  item: NavBItem
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
        onClick={() => onSelect(item.to!)}
        className={`${ROW} py-3 ${on ? `${SELECTED} ${BRAND}` : `${ITEM} active:bg-black/[0.04]`}`}
      >
        <NavIconB name={item.icon} className="h-6 w-6" />
        <span className="flex-1 text-[18px] leading-[1.5]">{item.label}</span>
      </button>
    )
  }

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`${ROW} py-3 ${
          holdsActive ? `${SELECTED} ${BRAND}` : `${ITEM} active:bg-black/[0.04]`
        }`}
      >
        <NavIconB name={item.icon} className="h-6 w-6" />
        <span className="flex-1 text-[18px] leading-[1.5]">{item.label}</span>
        <Chevron up={open} className="shrink-0" />
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
                /* Indented past the icon column (24px glyph + 8px gap) so child
                   labels line up under their parent's label. */
                className={`flex min-h-[48px] w-full items-center rounded-[8px] py-2 pl-10 pr-2 text-left text-[16px] leading-[1.5] ${
                  on ? `${SELECTED} ${BRAND}` : `${ITEM} active:bg-black/[0.04]`
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
 * Pattern B's phone navigation: a full-screen panel rather than the desktop's
 * 280px drawer over dimmed content. Sections, labels, and icons all come from
 * NAV_B and iconsB, so this is a second presentation of the desktop nav rather
 * than a second copy of it.
 */
export default function MobileNavB({
  active,
  onSelect,
  onClose,
}: {
  active: string
  onSelect: (to: string) => void
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const [lead, ...groups] = NAV_B

  return (
    <div className="absolute inset-0 z-20 flex flex-col bg-white font-b">
      {/* Header is a flex sibling of the scroll area, not inside it, so the brand
          and the close button hold their place while the list travels underneath.
          Sticky positioning would work too, but this keeps the scrollbar to the
          list and guarantees the close button is always reachable. */}
      <div className="relative z-10 flex h-16 shrink-0 items-center gap-4 bg-white pl-5 pr-3">
        {/* The frame pairs a logo mark with the product name; both are replaced by
            the same placeholder wording SideNavB uses, to keep the demo unbranded. */}
        <p className={`flex-1 text-[16px] font-medium leading-[1.43] tracking-[0.17px] ${BRAND}`}>
          Placeholder Logo
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-b-muted active:bg-black/[0.06]"
        >
          <Close />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain">
        <nav aria-label="Pattern B" className="px-5 pt-2">
          {lead.items.map((item) => (
            <NavRow key={item.label} item={item} active={active} onSelect={onSelect} />
          ))}

          <div className="px-2">
            {groups.map((section) => (
              <div key={section.heading} className="pt-5">
                <p className={`pb-3 text-[16px] font-semibold leading-[1.5] ${HEADING}`}>
                  {section.heading}
                </p>
                {section.items.map((item) => (
                  <NavRow key={item.label} item={item} active={active} onSelect={onSelect} />
                ))}
              </div>
            ))}
          </div>
        </nav>

        <hr className="mx-4 mt-10 border-t border-[#e0e0e0]" />

        <div className="px-7 pt-6">
          <button type="button" className={`${ROW} py-3 ${ITEM} active:bg-black/[0.04]`}>
            <Avatar className="h-6 w-6 shrink-0 rounded-full bg-[#f5f8fc]" />
            <span className="flex-1 text-[18px] leading-[1.5]">Account Name</span>
            <Chevron className="shrink-0" />
          </button>
        </div>

        <hr className="mx-4 mt-5 border-t border-[#e0e0e0]" />

        <div className="px-7 pt-6">
          <p className={`text-[18px] font-semibold leading-[1.5] ${HEADING}`}>Contact Us</p>
          {/* Anonymised like the logo: the frame's real address and number give way to
              example.com and the 555-01xx range reserved for fiction. */}
          <div className="mt-2 flex flex-col gap-1 text-[14px] leading-[1.5]">
            <p className="text-black">ops@example.com</p>
            <p className="text-black">For immediate support, call</p>
            <a href="tel:+15550147427" className="text-[#2f80ed] underline">
              +1 (555) 014-7427
            </a>
          </div>
        </div>

        <div className="px-7 pb-10 pt-9">
          <button type="button" className={`${ROW} py-3 ${ITEM} active:bg-black/[0.04]`}>
            <img src={logoutIcon} alt="" className="h-6 w-6 shrink-0 object-contain" />
            <span className="flex-1 text-[18px] leading-[1.5]">Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
}
