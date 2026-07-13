import { useEffect, useId, useRef, useState } from 'react'
import { Close, Expand, Minus, Plus } from './icons'

function NotesModal({ notes, onClose }: { notes: string; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)

  // Escape closes; focus moves into the dialog so keyboard users aren't stranded
  // behind it on the page underneath.
  useEffect(() => {
    ref.current?.focus()
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Component Notes"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[80vh] w-full max-w-3xl overflow-auto rounded bg-white p-6 shadow-2xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[21px] font-semibold text-nav-dark">Component Notes</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close notes"
            className="rounded p-1 text-txt-secondary hover:bg-gray-100"
          >
            <Close />
          </button>
        </div>
        <p className="leading-relaxed text-txt">{notes}</p>
      </div>
    </div>
  )
}

export default function DisclosurePanel({
  title,
  notes,
  children,
}: {
  title: string
  notes: string
  children?: React.ReactNode
}) {
  const [open, setOpen] = useState(true)
  const [modal, setModal] = useState(false)
  const panelId = useId()

  return (
    <section className="rounded border border-border-subtle bg-white">
      <div className="flex items-center justify-between gap-4 p-6">
        <h2 className="text-[21px] font-semibold text-nav-dark">{title}</h2>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? `Collapse ${title}` : `Expand ${title}`}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-input-border bg-white text-txt-secondary transition-colors hover:bg-gray-100"
        >
          {open ? <Minus /> : <Plus />}
        </button>
      </div>

      <div
        id={panelId}
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0">
          <div className="grid grid-cols-1 gap-6 px-6 pb-6 lg:grid-cols-[1fr_330px]">
            {/* Notes */}
            <div className="rounded border border-border-subtle p-6">
              <div className="mb-3 flex items-start justify-between gap-4">
                <h3 className="font-bold text-txt">Component Notes</h3>
                <button
                  type="button"
                  onClick={() => setModal(true)}
                  aria-label="Expand component notes"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-input-border text-primary transition-colors hover:bg-gray-100"
                >
                  <Expand />
                </button>
              </div>
              <div className="scrollbar-thin max-h-[150px] overflow-y-auto pr-3">
                <p className="leading-relaxed text-txt">{notes}</p>
              </div>
            </div>

            {/* Additional */}
            {children}
          </div>
        </div>
      </div>

      {modal && <NotesModal notes={notes} onClose={() => setModal(false)} />}
    </section>
  )
}
