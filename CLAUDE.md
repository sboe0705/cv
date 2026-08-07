# CLAUDE.md

Technical orientation for working on this repository. For content editing and deployment, see
[README.md](README.md).

## Stack

Vue 3 (SFC, `<script setup>`, Composition API) · TypeScript (strict) · Vite 6 · no router, no
store, no backend. `@` is aliased to `src/`.

```bash
./dev.sh           # dev server (installs deps if needed; extra args go to Vite)
./build.sh         # npm ci + clean dist/ + type-check + bundle
./build.sh --preview

npm run dev        # the same, without the wrapper
npm run build      # vue-tsc --build && vite build
npm run typecheck  # types only
```

There is no test suite and no linter configured. The type-checker is the gate that matters —
`./build.sh` (or `npm run build`) must pass before a change is done. `build.sh` mirrors the
GitHub Pages workflow step for step, so use it to reproduce a CI failure locally.

## The design

The site was built from a developer handoff — a design specification, the content as JSON, and
an HTML prototype written against a proprietary streaming-template runtime. That directory
(`design_handoff_lebenslauf_vue/`) has been **removed from the repository**: it is fully
absorbed into this code and now lives only in git history, up to and including commit
`2e64efc`. If a question about the original intent ever comes up, read it there
(`git show 2e64efc:design_handoff_lebenslauf_vue/README.md`) rather than restoring it to the
working tree.

What carries over from it, and must be respected:

- **The measurements are exact, not a scale.** The design was declared final and high-fidelity,
  so its numbers were taken verbatim. That is why the CSS is full of values like `13.5px` and
  `1.5px` — don't tidy them into a spacing scale.
- **`src/styles/tokens.css` is the token table**, and together with the multi-column
  declarations listed under "Desktop-only" below it is now the entire layout specification.
- **`src/data/cv.ts` is the content**, superseding the handoff's `cv-data.json`.

### The one deliberate deviation: the palette

Every metric follows the handoff. The **colours do not**, and this was an explicit decision by
the site's owner after the real portrait arrived — do not "restore" the green thinking it is
drift.

The approved design led with green (`#2f9c62`) and used blue as a second voice. The photograph
contains **no green whatsoever** (measured: 0.00% green pixels against 7.36% blue) — it is a
charcoal suit, a silver tie and a cornflower shirt. So blue was promoted to the primary voice
and green retired entirely; the Skills and Hobbies cards, previously green tint, now sit on a
graphite tint drawn from the suit.

This also fixed an accessibility defect in the original design: white 14px bold on `#2f9c62` is
**3.47:1**, below the WCAG AA threshold of 4.5:1, and it affected the primary button and every
active filter chip. All current fills clear AA — `--accent-base` is 6.96:1 and `--accent-deep`
9.95:1 against white.

Because green is gone, the token names are roles (`--accent-*`, `--support-*`), not hues. Keep
it that way: a token called `--green-base` holding a blue is how a palette rots.

### The portrait source

`src/assets/portrait-source.jpg` is the uncropped original (1789×2683) the two hero images and
every measurement above were derived from. It is kept only so a re-crop needs nothing external.

**Nothing may import it.** Vite bundles what is imported, and the source still carries its
camera EXIF (make, model, exposure — no GPS), whereas the shipped `portrait.webp` /
`portrait.jpg` are stripped. Importing it would both quadruple the payload and start shipping
metadata the README says the site does not ship.

## Styling

All colours, radii, shadows and layout constants live in `src/styles/tokens.css`. **Component
CSS must reference these variables — no raw hex values in a `.vue` file.** That rule is what
made the green-to-blue recolour a change to one file plus three exceptions.

The colour tokens are named by role:

| Token | Role |
| --- | --- |
| `--accent-base` | primary button, rail fill, language switch, contact band, labels and headings on tints, printed section headings |
| `--accent-deep` | open timeline entry, AI band, primary button hover |
| `--accent-soft` | secondary button hover border — decorative, never sits behind text |
| `--accent-tint` | About and Languages cards, kicker, kind pill, language switch ground |
| `--support-tint` | Skills and Hobbies card grounds — the second, neutral voice |
| `--highlight` | the shirt blue — hero and AI kickers, tech pills, contact underlines, `::selection` |

Anything placed behind white text must clear 4.5:1. Check before adding a fill.

### `--highlight` has rules

`#a8c4ee` is sampled from the shirt in the portrait (lit collar measured at hue 224°, nudged to
216° so it sits in `--accent-base`'s family rather than leaning violet against it). It is a
highlight, not a second accent, and it only works two ways:

- **as a fill behind `--ink`** — 9.33:1, e.g. the kicker pills;
- **as text or rules on `--accent-deep`** — 5.59:1, e.g. the tech pills on an open entry.

It fails everywhere else: 3.91:1 behind white text, and 1.68:1 against the page ground, where a
hairline in it is effectively invisible. That is why the secondary button's hover border kept
`--accent-soft` instead. The highlight never appears on paper at all — the printed document is
a separate component and uses none of it.

Everything else is scoped CSS inside the component it belongs to. `src/styles/print.css` is
global but no longer styles anything: it only hides the screen layout — see "The printed
document" below.

## The content model

`src/data/types.ts` and `src/data/cv.ts` are plain typed data with **no Vue imports**. That is
intentional: the content is meant to be reusable outside this site (a second front-end, an API)
by importing `cv` and the helpers. `CvDocument.vue` is already the second consumer — the same
content, laid out for paper instead of a screen.

Key contracts:

- `Localized<T> = Record<Lang, T>` — anything language-dependent is wrapped in it. Adding a
  language means extending the `Lang` union and letting the compiler find the gaps.
- `year`, `org` and `tech` are **not** localized. They are proper nouns and technology names,
  identical in every language. Do not move them under `content`.
- **Entries are stored oldest-first**, i.e. chronologically. Newest-first is a display concern,
  handled by `resolveEntries()`. Do not reorder the array to change display order.
- `resolveEntry()` flattens a `TimelineEntry` to one language, producing the `ResolvedEntry`
  that components render. Components should never index into `entry.content[lang]` themselves.
- `tech` is a free list — the strings are rendered, never matched against anything. There used
  to be a `meta.filterChips` array that had to match them verbatim; see below.

## State

Local component state only; no store is warranted at this size.

| State | Where | Notes |
| --- | --- | --- |
| `lang` | `useLanguage` | Module-level ref — the language belongs to the page, not a component. Persisted to `localStorage` under `cv.lang`, and mirrored to `document.documentElement.lang`. |
| `openId` | `useTimeline` | Exactly one entry open; clicking the open one collapses it. Defaults to `cv.meta.openByDefault`. |
| `progress` | `useScrollProgress` | `clamp01((innerHeight * 0.62 - rect.top) / rect.height)`, on passive rAF-throttled scroll/resize listeners removed on unmount. |

### The technology filter is gone, deliberately

The handoff specified a row of technology chips above the timeline, and it was built. It is
removed as of this commit — do not restore it from the design without new reasoning. With five
stations the numbers did not work: `CI/CD`, `AWS`, `DevOps`, `OSGi` and `J2EE / EJB3` each
selected exactly **one** station, which is a worse way of clicking that station, and `Java`
selected **four of five**, hiding only the Abitur. Grouping the chips into themes does not help
— a "Cloud" chip still selects two. The `tech` pills on each expanded entry carry the same
information without a control, and without the unenforced invariant that every chip string had
to appear verbatim in an entry's `tech` array — a rename nearly produced a chip that filtered
every station away.

## Interaction details worth preserving

- Timeline cards are `role="button"` with `tabindex="0"`, `aria-expanded`, `aria-controls`, and
  Enter/Space handlers — the handoff asks for keyboard access the prototype lacked.
- The reveal animates `grid-template-rows: 0fr → 1fr` rather than a measured height. The
  collapsed copy stays in the DOM for the animation and carries `inert`, which keeps it out of
  the tab order and the accessibility tree.
- `--duration-reveal` drops to `0ms` under `prefers-reduced-motion: reduce`.

## The printed document

The "Als PDF" button calls `window.print()`, but printing does **not** reformat the page. The
page is a 1180px card of tinted panels and pill clouds — flattened onto A4 it ran to nine pages
with a station per sheet and the skills block clipped at the right edge. So the print path is a
second rendering instead:

- `src/components/CvDocument.vue` is a plain two-page CV built from the same `cv` data. It is
  `display: none` on screen — which also keeps it out of the accessibility tree, so the content
  is not announced twice — and reveals itself in its own `@media print` block.
- `src/styles/print.css` only sets `@page` and hides `.page-shell`. **The reveal cannot live
  there:** scoped CSS compiles to `.cv-doc[data-v-…]`, which outspecifies a global `.cv-doc`,
  and the document would silently stay hidden.
- Detail level follows `kind`: `work` entries print their bullets, everything else (`study`,
  `edu`, `cert`) prints summary and credentials only. That is the classic Berufserfahrung /
  Ausbildung split and needs no extra field on `TimelineEntry`.
- The document is plain by intent — no fills, no pills, no photo frame. Colour appears only in
  the section headings and their hairlines (`--accent-base`); everything else is ink on white.
- It fits **two A4 pages in both languages**, and the type scale (9pt/1.32, `mm` spacing) is
  what buys that. Adding a section or loosening the leading will push it to three — re-check
  before and after. To render it without a browser dialog:

  ```bash
  npm run dev -- --port 5199
  chromium --headless=new --no-pdf-header-footer --timeout=12000 \
    --print-to-pdf=check.pdf http://localhost:5199/
  ```

  (A build served by `npm run preview` does not mount under headless Chrome; use the dev
  server. If Chrome is a flatpak, it can only write inside `~/Downloads` and friends.)

## Desktop-only, and the seam for mobile

The handoff specifies desktop-only at a fixed **1180px** with no breakpoints; the page scrolls
horizontally on narrow screens rather than reflowing. That is the current, deliberate state.

A mobile layout is planned but not built. The groundwork is in place:

- `--shell-width` and `--section-pad-x` in `tokens.css` drive the shell and every section's
  horizontal padding.
- Every multi-column layout is declared once, in one component's scoped CSS: hero `1fr 320px`,
  About `200px 1fr`, AI band `1fr 1fr`, timeline entry `120px 1fr`, entry bullets `1fr 1fr`,
  skills `1fr 340px`, skill groups `1fr 1fr`, contact grid `1fr 1fr`.

Adding mobile support should therefore be one `@media (max-width: 900px)` block per component
plus the two tokens, with **no markup changes**. Also update `<meta name="viewport">` in
`index.html`, which is currently pinned to `width=1180`.

## Legal content

`src/data/legal.ts` holds the Impressum with the privacy information as a section inside it,
separate from `cv.ts` because it is legal prose that changes for entirely different reasons. It
follows the same `Localized<T>` pattern and renders in `LegalDialog.vue`, a native `<dialog>`
opened from the footer via `useLegalDialog`.

Two things there are deliberate, not oversights:

- **The privacy information is not a separate page.** The GDPR requires it to be "easily
  accessible" (Art. 12(1)), not separately hosted. That is also why the footer link reads
  "Impressum & Datenschutz" — if it said only "Impressum", the privacy part would be hidden.
- **It cannot shrink to a link to GitHub's policy.** The controller is the site owner, not
  GitHub, so the Art. 13 duties are owed here. GitHub's statement is linked as supplementary
  detail only.

The dialog uses `showModal()` for the focus trap, Escape handling and `::backdrop`. Modal
dialogs render in the top layer, so `.page-shell`'s `overflow: hidden` does not clip it.

The privacy notice makes specific factual claims about this site: no cookies, no external
fonts or CDNs, no analytics, and exactly one local-storage key (`cv.lang`). **Those claims must
stay true.** Adding a third-party script, a hosted font, an embed or a contact form makes the
published text inaccurate — update `legal.ts` in the same change.

`owner.address` must remain a *ladungsfähige Anschrift* (§ 5 DDG) — an address where legal mail
can be served. A P.O. box does not qualify.

## Content constraints from the handoff

- Timeline copy paraphrases the employers' reference letters. Keep it neutral — the user
  explicitly did not want verbatim quotes.
- The source documents (reference letters, certificates) must never be published on the site or
  committed here. Content only, no document downloads.
- No phone number. This was a deliberate omission, not an oversight.
