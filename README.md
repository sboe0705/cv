# Lebenslauf — Sebastian Böhm

An interactive, bilingual (DE/EN) CV website. Its centrepiece is a vertical career timeline:
each station is a clickable card, and the open one expands into a filled blue panel with a
summary, project bullets, credentials and its technology stack. Alongside it: a technology
filter, a scroll-progress rail, an "About me" block, an "AI as an everyday tool" band, skills,
hobbies, languages and a contact band.

Built with **Vue 3** (SFC, `<script setup>`, Composition API), **TypeScript** and **Vite**.
No backend — all content is static, typed data.

## Getting started

Requires Node.js 20 or newer. The two shell scripts are the shortest path — they install
dependencies on first run, so there is no separate setup step:

```bash
./dev.sh          # local server with hot reload → http://localhost:5173
./build.sh        # production build → dist/
```

`./dev.sh` passes any extra arguments straight to Vite:

```bash
./dev.sh --port 8080    # a different port
./dev.sh --host         # reachable from other devices on your network
```

`./build.sh` does a clean, reproducible build: `npm ci` from the lockfile, remove the old
`dist/`, type-check with `vue-tsc`, then bundle. These are the same steps the GitHub Pages
workflow runs, so a green run here means a green deploy. Add `--preview` to serve the result
locally afterwards:

```bash
./build.sh --preview
```

The underlying npm scripts are available directly if you prefer:

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with hot reload |
| `npm run build` | Type-check (`vue-tsc`) and build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Type-check only |

## Project structure

```
src/
  data/
    types.ts        # the content model — Lang, Localized<T>, TimelineEntry, UiStrings …
    cv.ts           # ALL content, in DE and EN. The only file you edit for content changes.
  composables/
    useLanguage.ts      # active language, persisted to localStorage
    useTimeline.ts      # which entry is open, which technology chip is active
    useScrollProgress.ts# reading progress for the timeline rail
  components/       # one component per section of the page
    CvDocument.vue  # the printed CV — hidden on screen, the only thing that goes on paper
  styles/
    tokens.css      # every colour, radius, shadow and layout constant
    base.css        # reset and page ground
    print.css       # hides the screen layout when printing
  assets/           # portrait.webp, its portrait.jpg fallback, and the uncropped source
```

## Editing the content

Everything the page says lives in [`src/data/cv.ts`](src/data/cv.ts). No copy is hard-coded in
a component, so you never need to touch a `.vue` file to change wording.

**Add a career station.** Append to the `entries` array — the list is stored oldest-first and
the timeline reverses it for display, so a new job goes at the *end*:

```ts
{
  id: 'acme',                  // unique; used for the open/closed state
  year: '2027',
  kind: 'work',                // work | study | edu | cert
  org: 'ACME GmbH',
  tech: ['Java', 'AWS'],       // must match filter chips verbatim to be filterable
  content: {
    de: { period: 'seit 2027', role: '…', place: '…', summary: '…', bullets: ['…'], credentials: '' },
    en: { period: 'since 2027', role: '…', place: '…', summary: '…', bullets: ['…'], credentials: '' },
  },
}
```

`credentials` may be an empty string and `bullets` an empty array — both sections are then
simply not rendered.

**Add a filter chip.** Add the string to `meta.filterChips`. It must match a `tech` value on at
least one entry exactly, otherwise the chip filters everything away.

**Change which entry is open on load.** `meta.openByDefault` — an entry `id`.

**Add a third language.** Add it to the `Lang` union in `src/data/types.ts`; TypeScript will
then flag every `Localized<T>` that owes a translation — the `ui` block and each entry's
`content`. Add the new button to `src/components/LanguageSwitch.vue`.

## The portrait

`src/assets/portrait.webp` (27 KB) with `portrait.jpg` (55 KB) as the fallback, served from a
`<picture>` element. Both are pre-cropped to the 320×380 hero slot at 2× (640×760) and stripped
of EXIF, so no camera model or timestamp ships with the page.

To replace it, regenerate both files at 640×760 from the original and keep the filenames — no
code change needed. The original is `src/assets/portrait-source.jpg` (1789×2683). Nothing
imports it, so it is never bundled — it sits there purely so a re-crop does not need a file
from outside the repository.

## Impressum and privacy

One document in `src/data/legal.ts` (German and English), shown in a modal dialog that the
footer link opens. The privacy information is a section inside it rather than a separate page —
the GDPR does not require a separate page, only that the information be easily accessible
(Art. 12(1)) — which is why the footer link is labelled "Impressum & Datenschutz" and not just
"Impressum": the privacy part has to stay findable.

What could **not** be reduced to a link to GitHub's policy: the controller here is the site
owner, not GitHub, so the Art. 13 duties — purpose, legal basis, data subject rights, right to
complain — have to be met on this page. GitHub's statement is linked as supplementary detail
about the host's own processing.

The text describes what this site actually does rather than generic boilerplate: GitHub Pages
server logs, the `cv.lang` local-storage entry, self-hosted fonts, no cookies, no tracking.
**If you change how the site works, update it** — adding an embed, analytics, a contact form or
a CDN web font would make the published text wrong.

The German version is the legally binding one; the English is marked as a convenience
translation. Neither has been reviewed by a lawyer — see the checklist below.

## Colours

The palette is led by a steel blue (`#17607f`) with a graphite second voice and a light
cornflower highlight (`#a8c4ee`) sampled from the shirt — all three drawn from the portrait.
This is a deliberate departure from the original design, which led with green; see `CLAUDE.md`
for the reasoning and the accessibility measurements behind it.

Everything lives in `src/styles/tokens.css`. No component contains a raw hex value, so
recolouring the site is a one-file edit.

## PDF export

The "Als PDF" / "Get the PDF" button calls `window.print()` — and what prints is not the page.
The website is a wide, colourful layout; a curriculum vitae is a document. So printing swaps in
[`src/components/CvDocument.vue`](src/components/CvDocument.vue): the same content from
`cv.ts`, set as a compact **two-page** CV — photo top right, career and education in a
year/content column, plain dashed lists instead of pill clouds, and colour only in the section
headings. It follows the language switch, and printing never changes the on-screen state.

One thing the site cannot control: the date, page URL and page numbers your browser adds to
printed pages. Switch them off in the print dialog under *Weitere Einstellungen* →
*Kopf- und Fußzeilen* (Chrome: *More settings* → *Headers and footers*).

## Deployment

Pushing to `main` publishes to GitHub Pages via `.github/workflows/deploy.yml`. Enable it once
under **Settings → Pages → Source → GitHub Actions**.

The production build uses `/cv/` as its base path (matching the repository name) — see
`vite.config.ts`. If you rename the repository or move to a custom domain, change `base` there.

## Before publishing

The content is complete — real contact details, real address in the Impressum, portrait in
place. Two things are worth a look before or shortly after going live:

- **Enable GitHub Pages** once, under *Settings → Pages → Source → GitHub Actions*. Until then
  the deploy workflow has nothing to publish to.
- **The legal text has not been reviewed by a lawyer.** It is carefully matched to what this
  site actually does, but if you want certainty, this is the point to have it checked.

## Design source

The site was built from a developer handoff — a design specification, the content in JSON and
an HTML prototype. It has served its purpose and is no longer part of the repository; the
design now lives in `src/styles/tokens.css` and the components, the content in
`src/data/cv.ts`. The handoff remains in the git history (up to commit `2e64efc`) if it is ever
needed again.

The CV content was transcribed from reference letters and certificates. Those documents are
deliberately **not** part of this repository and must not be published on the site.
