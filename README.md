# new-prototype

Responsive, interactive prototypes of three navigation patterns from the
[Navigation Demo App](https://www.figma.com/design/dqZvtsMsxIEP5Kh0BHF3yY/Navigation-Demo-App) Figma file.

A switcher pinned to the bottom of the viewport moves between the patterns. The active
pattern is encoded in the URL, so any pattern is shareable by link.

| Pattern | Route | Shell |
| --- | --- | --- |
| A — Admin | `/a/property/basic` | Blue sidebar, community switcher, sortable/paginated data table |
| C — Insights | `/c` | Light sidebar, search header, insights table |
| D — Top nav | `/dashboard` | Dark top navbar, filters, metric cards, disclosure panel |

Each pattern is a self-contained shell with its own navigation, design tokens, and
typeface — they are three different design systems, not three skins over one layout.

## Running

```bash
npm install
npm run dev
```

## Stack

React + TypeScript + Vite, with Tailwind v4. Design tokens from each Figma file's
published variables live in `src/index.css` under `@theme`, namespaced per pattern
(`--color-a-*`, `--color-c-*`, and Pattern D's unprefixed set).

## Interactions

**Pattern A** — collapsible sidebar; multi-select community switcher with search,
state filter, and select-all (a draft selection that only commits on "Choose
Community"); sortable table columns; 5/10/20 page sizes with working pagination;
top-bar language, help, notifications (with read/unread state), and account menus.

**Pattern C** — collapsible sidebar rail, expandable nav groups, live table search,
dismissible banner, per-row action menus.

**Pattern D** — click-driven navbar dropdowns with an in-flow mobile accordion panel;
filters whose Apply button stays disabled until something changes, then recomputes the
metric cards; a collapsible Component Details panel with an expandable notes modal.
