# View modes: single, overview, compare

**Date:** 2026-07-16
**Status:** Design approved, pending spec review

## Problem

The prototype shows one pattern at a time. A bottom-pinned pill switches between A, B,
C, and D, but seeing how two patterns differ means clicking back and forth and holding
the previous one in your head. There is no way to see the set at a glance, and no way to
put two side by side.

## Solution

Three view modes, cycled by a circular button sitting left of the existing pill:

| Mode | Shows | Pill |
| --- | --- | --- |
| Single | One pattern, full screen (today's behaviour) | `A B C D`, active highlighted |
| Overview | Live 2×2 grid of all four patterns | Hidden; circle recentres |
| Compare | Two patterns side by side, full width | Two slots: `A ⇄ C` |

Mode is a query param on the current path, so it is shareable and reversible:

```
/a/property/basic                      → single
/a/property/basic?mode=overview        → overview, returns to A on exit
/a/property/basic?mode=compare&vs=A,C  → compare A against C
```

Because the param rides on the path rather than replacing it, there is always a pattern
"underneath" a mode. Exiting is lossless and needs no remembered state.

## Constraints (from design review)

1. **The circle never moves between single and compare.** The pill is fixed-width so it
   cannot drift when its contents change.
2. **Overview is the one exception.** The pill unmounts and the circle recentres.
3. **Compare is full width.** Two panes edge to edge, no letterboxing.
4. **The chrome floats over content.** It never reserves layout space.
5. **The pill shows bare letters.** No "Pattern" prefix, no hint text. Full names are
   `title` tooltips; the real descriptions live in the overview captions.

## Architecture

### `src/lib/viewMode.ts` — mode parsing

```ts
export type ViewMode = 'single' | 'overview' | 'compare'
export function modeFrom(search: URLSearchParams): ViewMode
export function pairFrom(search: URLSearchParams, active: Pattern): [Pattern, Pattern]
export function nextMode(mode: ViewMode): ViewMode   // single → overview → compare → single
```

Unrecognised values fall back to `single` rather than throwing — this is a prototype
whose URLs get hand-edited and pasted into Slack. `pairFrom` defaults to
`[active, active === 'A' ? 'C' : 'A']` when `vs` is absent or malformed, so cycling into
compare never requires a decision first.

### `src/lib/patterns.ts` — the pattern registry

Today `HOME` lives in `PatternSwitcher.tsx` and `ShellD` lives in `App.tsx`, and nothing
can render "pattern X" generically. Overview needs exactly that. One registry becomes the
single definition of a pattern:

```ts
export type Pattern = 'A' | 'B' | 'C' | 'D'

export const PATTERNS: Record<Pattern, {
  label: string      // "Pattern A"
  hint: string       // "Admin"
  home: string       // "/a/property/basic"
  caption: string    // one sentence, shown in overview and compare
  element: () => ReactNode
}>
```

`patternFor(pathname)` moves here too. `App.tsx` and `PatternSwitcher.tsx` both import
from it instead of each holding a copy.

Captions:

- **A — Admin:** Left sidebar with a context switcher, for managing multiple accounts.
- **B — Console:** Left sidebar with grouped categories, for dense technical monitoring.
- **C — Insights:** Left sidebar with a light footprint, for a dashboard-first experience.
- **D — Top nav:** Top-only nav with tabs, for flatter, filter-heavy IA.

These describe the IA choice rather than listing features, so two read side by side
actually say something.

### `src/components/PatternStage.tsx` — one pattern, scaled and isolated

The load-bearing piece. Renders any pattern inside a cell of any size:

```tsx
<div ref={box} className="relative overflow-hidden">
  <div style={{ width: 1440, height: 900, transform: `scale(${s})`, transformOrigin: 'top left' }}>
    <MemoryRouter initialEntries={[PATTERNS[p].home]}>
      {PATTERNS[p].element()}
    </MemoryRouter>
  </div>
</div>
```

Three decisions, each solving a specific problem:

- **Fixed 1440×900 virtual viewport.** Tailwind's `lg:` queries read the real viewport,
  not the cell. Without a fixed inner size the cells would render at whatever the real
  window is; with it, every cell reliably shows the desktop layout.
- **`transform: scale()`.** Every pattern's sidebar is `fixed inset-y-0 left-0`
  (`SideNavA.tsx:126`, `SideNavB.tsx:108`, `SideNav.tsx:116`). A transformed element
  becomes the containing block for fixed descendants, so scaling traps each sidebar
  inside its own cell instead of letting four of them stack on the real viewport edge.
  This is why scaling beats simply sizing the cell down.
- **`MemoryRouter` per stage.** Every pattern calls `useLocation()` (`SideNavA.tsx:8`,
  `SideNavB.tsx:7`, `SideNav.tsx:12`). Mounted under the shared browser router, all four
  would read the same pathname and none would highlight correctly. A memory router seeded
  at that pattern's home gives each cell its own history — cells are fully interactive,
  and clicking inside one never touches the browser URL.

`s` comes from a `ResizeObserver` on the outer box: `s = boxWidth / 1440`.

### `src/components/OverviewGrid.tsx`

2×2 grid. Each cell is a caption bar above a `PatternStage`. The caption bar shows
`Pattern A — Admin` plus the sentence, and is itself the button that enters that pattern
full-screen (drops the `mode` param, navigates to `PATTERNS[p].home`). It hover-darkens
and shows an `↗`.

The caption bar carries this job because the cell body cannot: the stage is live, so a
click there is a click *in the app*. The two intents would collide.

### `src/components/CompareView.tsx`

Two `PatternStage`s at 50% width each, full bleed, with the same caption bars — but not
clickable, since compare has a working pill.

### `src/components/ModeButton.tsx`

44px circle. Icon reflects current mode (single square / 2×2 grid / split rectangle).
Click calls `nextMode`. `aria-label` names the *current* mode; the button is a plain
`<button>` so it is keyboard-reachable.

### Changes to existing files

- **`App.tsx`** branches once. `mode === 'single'` renders today's `<Routes>` completely
  untouched; otherwise it renders `<OverviewGrid>` or `<CompareView>` in its place. The
  route tree never changes, so single mode carries no regression risk.
- **`PatternSwitcher.tsx`** renders the circle plus a mode-dependent pill: bare `A B C D`
  buttons (single), nothing (overview), or two slots (compare). Fixed pill width of
  184px.

## Compare slots

Each slot is a button showing a bare letter. Clicking cycles it to the next pattern,
skipping whatever the other slot holds. Cycling matches the circle's idiom and needs no
popover.

**Open for review:** a caret (`▾`) would signal "changeable" but promises a dropdown that
does not exist. The spec drops the caret and uses `A ⇄ C` framing instead. If this reads
as static in use, upgrade the slots to real popover menus.

## Responsive

Overview and compare are **desktop only**. A 2×2 grid of 1440px shells on a phone gives
four ~180px cells at 0.125 scale — illegible. Below Tailwind's `lg` breakpoint the circle
is hidden and the `mode` param is ignored, so mobile behaves exactly as it does today.
A mobile-specific overview is a different feature and is out of scope.

## Verification

The repo has no test runner, so verification is:

1. `npm run build` — `tsc -b` catches type errors across the registry refactor, which is
   where the real risk lives (two files stop owning `HOME` and `ShellD`).
2. Manual, in the browser:
   - Single mode is byte-for-byte unchanged: all four patterns, sidebars collapse, tables
     sort and paginate, Pattern D's filters recompute.
   - Overview: four cells, each showing a desktop layout with its sidebar *inside* its
     cell. Each cell independently interactive — collapsing A's sidebar does nothing to
     the other three. Caption click enters that pattern.
   - Compare: two panes, full width, no letterbox. Slots swap. Pill and circle float over
     both panes without stealing clicks.
   - The circle does not move between single and compare; it recentres in overview.
   - Paste `?mode=compare&vs=A,C` into a fresh tab — it restores. `?mode=nonsense` falls
     back to single without a crash.
   - Below `lg`, no circle, and a `mode` param is ignored.

## Out of scope

- Synced scroll or navigation between compare panes.
- Comparing three patterns, or arbitrary grid subsets.
- Mobile overview/compare.
- Thumbnails or static previews — all previews are live.
