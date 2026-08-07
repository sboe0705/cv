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
| `--accent-base` | primary button, rail fill, active chip, language switch, contact band, labels and headings on tints |
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
`--accent-soft` instead. `print.css` overrides the tech pills back to ink, since a light blue
on white paper does not exist.

Everything else is scoped CSS inside the component it belongs to. The one deliberate exception
is `src/styles/print.css`, which is global and reaches into component class names to build the
PDF layout; scoped CSS does not rename classes, so those selectors match. If you rename a class
in a component, check `print.css`.

## The content model

`src/data/types.ts` and `src/data/cv.ts` are plain typed data with **no Vue imports**. That is
intentional: the content is meant to be reusable outside this site (a PDF generator, a second
front-end, an API) by importing `cv` and the helpers.

Key contracts:

- `Localized<T> = Record<Lang, T>` — anything language-dependent is wrapped in it. Adding a
  language means extending the `Lang` union and letting the compiler find the gaps.
- `year`, `org` and `tech` are **not** localized. They are proper nouns and technology names,
  identical in every language. Do not move them under `content`.
- **Entries are stored oldest-first**, i.e. chronologically. Newest-first is a display concern,
  handled by `resolveEntries()`. Do not reorder the array to change display order.
- `resolveEntry()` flattens a `TimelineEntry` to one language, producing the `ResolvedEntry`
  that components render. Components should never index into `entry.content[lang]` themselves.
- Every `meta.filterChips` string must appear verbatim in some entry's `tech` array — nothing
  enforces this, and a typo silently produces a chip that filters everything away.

## State

Local component state only; no store is warranted at this size.

| State | Where | Notes |
| --- | --- | --- |
| `lang` | `useLanguage` | Module-level ref — the language belongs to the page, not a component. Persisted to `localStorage` under `cv.lang`, and mirrored to `document.documentElement.lang`. |
| `openId` | `useTimeline` | Exactly one entry open; clicking the open one collapses it. Defaults to `cv.meta.openByDefault`. |
| `activeChip` | `useTimeline` | Filtering deliberately does **not** close the open entry — a filtered-out entry simply is not rendered and returns expanded when the filter clears. |
| `progress` | `useScrollProgress` | `clamp01((innerHeight * 0.62 - rect.top) / rect.height)`, on passive rAF-throttled scroll/resize listeners removed on unmount. |

## Interaction details worth preserving

- Timeline cards are `role="button"` with `tabindex="0"`, `aria-expanded`, `aria-controls`, and
  Enter/Space handlers — the handoff asks for keyboard access the prototype lacked.
- The reveal animates `grid-template-rows: 0fr → 1fr` rather than a measured height. The
  collapsed copy stays in the DOM (so print can expand it) and carries `inert`, which keeps it
  out of the tab order and the accessibility tree.
- `--duration-reveal` drops to `0ms` under `prefers-reduced-motion: reduce`.

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
