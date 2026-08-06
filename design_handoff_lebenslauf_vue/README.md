# Handoff: Interaktive Lebenslauf-Webseite (Desktop) → Vue.js

## Overview
A single-page, desktop-only CV site for **Sebastian Böhm** (software engineer, Stuttgart region).
Core element is a vertical career timeline, newest entry first. Each entry is a clickable card; the
open one becomes a filled green "poster" panel revealing summary, project bullets, credentials and
its technology stack. Exactly one entry is open at a time. Secondary features: DE/EN language
switch, a technology filter, a scroll-progress rail next to the timeline, a portrait slot, an
"About me" block, a prominent "AI as an everyday tool" band, Skills, Hobbies, Languages and a
contact band.

Target: implement as a **Vue 3 application** (SFC, `<script setup>`, Composition API). No backend.
Content is static data (see `cv-data.json`).

## About the Design Files
The files in this bundle are **design references authored in HTML** — a prototype showing the
intended look and behaviour. They are **not production code to copy**. `Lebenslauf.dc.html` uses a
proprietary streaming-template runtime (`<x-dc>`, `{{ }}` holes, `<sc-for>`, `<sc-if>`, a
`Component extends DCLogic` logic class). Do **not** try to port that runtime. Read it as a spec:
markup structure, inline styles, and the data/state model — then rebuild it idiomatically in Vue
(`v-for`, `v-if`, `ref`/`computed`, scoped CSS or CSS modules).

Open `Lebenslauf.dc.html` in a browser to see the design live. The file contains **two turns of
design exploration**:

* **Section `#t2` (top) — option `2a` is THE design to build.** Everything below is history.
* Option `2b` is an alternative colourway (berry/blue), **not** to be built.
* Section `#t1` holds three earlier timeline studies (`1a`, `1b`, `1c`) in the original red
  Modernist palette — **reference only, do not build**.

## Fidelity
**High-fidelity.** Colours, typography, spacing, radii and interaction states below are final.
Recreate `2a` pixel-accurately. If the target codebase already has a design system, map these
values onto it; otherwise take the values verbatim.

## Screens / Views
One screen: the CV page. Page shell is a card of fixed width **1180px** (desktop-only, no
responsive breakpoints required), `background #faf8f6`, `border-radius 28px`,
`box-shadow 0 1px 3px rgba(32,30,29,.1)`, centred on a neutral page ground (`#e6e4e4`).
Sections top to bottom:

### 1. Header bar
* `display:flex; align-items:center; justify-content:space-between; padding:20px 40px;`
  `border-bottom:1px solid rgba(32,30,29,.12)`
* Left: brand `SEBASTIAN BÖHM` — Archivo 800, 16px, `letter-spacing:-.01em`, non-breaking space
  between the words.
* Right: nav links (Profil / Werdegang / Skills), Archivo 600 12.5px, colour `#201e1d`,
  `gap:22px`, no underline; then the language switch.
* Language switch: pill container `background:#e8f6ed; border-radius:999px; padding:4px; gap:4px`.
  Two buttons `DE` / `EN`, Archivo 700 11.5px, `padding:6px 14px; border-radius:999px; border:0`.
  Active: `background:#2f9c62; color:#fff`. Inactive: `background:transparent; color:#1f7247`.

### 2. Hero
* `display:grid; grid-template-columns:1fr 320px; gap:48px; padding:56px 40px 48px;`
  `align-items:start`
* Kicker pill: `padding:6px 14px; border-radius:999px; background:#e8f6ed;`
  `font:800 10px Archivo; letter-spacing:.1em; text-transform:uppercase; color:#1f7247`.
  Copy: DE `Software-Entwicklung · Stuttgart`.
* `h1`: `font-size:58px; font-weight:800; letter-spacing:-.025em; line-height:1.02; margin-top:20px`.
  Copy: `Sebastian Böhm`.
* Lead paragraph: `font-size:17.5px; line-height:1.55; max-width:52ch; margin-top:20px;`
  `text-wrap:pretty` (see `cv-data.json → lead`).
* Meta row (Standort / Schwerpunkt / Erfahrung): `display:flex; flex-wrap:wrap; gap:0 32px;`
  `margin-top:22px; padding-top:16px; border-top:1.5px solid rgba(32,30,29,.12)`. Per item a
  label (`font:800 9.5px Archivo; letter-spacing:.09em; uppercase; color:#17607f`) above a value
  (`font-weight:700; font-size:14.5px`).
* Buttons row (`gap:10px; margin-top:30px`):
  * Primary: `padding:13px 26px; border-radius:999px; background:#2f9c62; color:#fff;`
    `font:700 14px Archivo`; hover `background:#1f7247`. Links to `mailto:`.
  * Secondary: same metrics, `border:2px solid rgba(32,30,29,.18); color:#201e1d;`
    `background:transparent`; hover `border-color:#2f9fc9; color:#17607f`. Triggers the PDF export
    (see Open points).
  * Below: placeholder note, `font-size:12.5px; color:rgba(32,30,29,.55); margin-top:14px`.
* Right column: portrait **320×380px**, `border-radius:24px`, `object-fit:cover`. In the prototype
  this is a drag-and-drop `<image-slot>`; in Vue use a plain `<img>` with the real photo.
  Caption under it: `font-size:11.5px; color:rgba(32,30,29,.5); margin-top:8px`.

### 3. About me
* `padding:0 40px 48px`; inner card `background:#e7f2f8; border-radius:24px; padding:34px 36px;`
  `display:grid; grid-template-columns:200px 1fr; gap:36px; align-items:start`.
* Heading `h4`: `font-size:15px; letter-spacing:.06em; uppercase; color:#17607f`.
* Body: `font-size:15.5px; line-height:1.6; max-width:70ch; text-wrap:pretty`.

### 4. AI band (prominent)
* `padding:0 40px 48px`; inner band `background:#1e6e44; border-radius:24px; padding:38px 40px;`
  `color:#fff`.
* Inside: `display:grid; grid-template-columns:1fr 1fr; gap:36px; align-items:start`.
* Left: kicker pill (`background:rgba(255,255,255,.18)`, same type as hero kicker), `h2`
  `font-size:30px; letter-spacing:-.02em; margin-top:16px`, paragraph
  `font-size:15.5px; line-height:1.55; max-width:44ch`.
* Right: three items as a `flex column; gap:10px`; each `padding:14px 18px; border-radius:16px;`
  `background:rgba(255,255,255,.12); font-size:13.5px; line-height:1.5`.
* Footer note inside the band: `margin-top:26px; padding-top:18px;`
  `border-top:1.5px solid rgba(255,255,255,.28); font-size:12.5px; color:rgba(255,255,255,.9)` —
  states the page was built with AI assistance.

### 5. Timeline header + technology filter
* `padding:8px 40px 16px`; row `display:flex; align-items:baseline; justify-content:space-between;`
  `gap:24px; flex-wrap:wrap`.
* Left: `h2` `font-size:34px; letter-spacing:-.02em` + sub line
  `font-size:13.5px; color:rgba(32,30,29,.55)` ("Station anklicken — Details klappen auf, jeweils
  eine gleichzeitig.").
* Right: filter chips, `display:flex; flex-wrap:wrap; gap:7px; max-width:660px;`
  `justify-content:flex-end`. Chip: `padding:7px 13px; border-radius:999px;`
  `font:600 11.5px Archivo; border:1.5px solid`. Inactive `background:#faf8f6;`
  `border-color:rgba(32,30,29,.14); color:#201e1d`. Active `background:#2f9c62;`
  `border-color:#2f9c62; color:#fff`.
* Chips: `Alle Stationen` (= no filter) plus `Java`, `CI/CD`, `AWS`, `DevOps`, `OSGi`, `SQL`,
  `Scrum / Kanban`, `J2EE / EJB3`. A chip keeps only entries whose `tech` array contains that exact
  string.

### 6. Timeline
* Wrapper `display:flex; padding:26px 40px 8px`.
* Progress rail: fixed column `width:10px; margin-right:30px; position:relative`.
  * Track: `position:absolute; left:3px; top:6px; bottom:6px; width:4px; border-radius:999px;`
    `background:rgba(32,30,29,.12)`.
  * Fill: `position:absolute; left:0; top:6px; width:10px; border-radius:999px;`
    `background:#2f9c62`, `height` = scroll progress in % (see Interactions).
* Entry list: `flex:1; display:flex; flex-direction:column; gap:14px`.
* **Entry card** (closed): `display:grid; grid-template-columns:120px 1fr; gap:30px;`
  `align-items:start; border-radius:22px; padding:26px 30px; cursor:pointer;`
  `background:#fbfaf9; box-shadow:0 1px 2px rgba(32,30,29,.07); color:#201e1d`.
  * Left cell: year `font:800 40px/0.9 Archivo; letter-spacing:-.03em`; below it a kind pill
    `padding:5px 12px; border-radius:999px; background:#e8f6ed;`
    `font:800 9.5px Archivo; letter-spacing:.09em; uppercase; color:#1f7247`.
  * Right cell: `h3` org `font-size:25px; letter-spacing:-.015em`; role
    `font-weight:600; font-size:15.5px; margin-top:5px`; meta `{period} · {place}`
    `font-size:12.5px; margin-top:3px; opacity:.88`.
* **Entry card (open)**: same box, but `background:#1e6e44; color:#fff`; kind pill
  `background:rgba(255,255,255,.22); color:#fff`. Revealed block `margin-top:20px`:
  * Summary `font-size:15.5px; line-height:1.55; max-width:62ch; text-wrap:pretty`.
  * Bullets: `display:grid; grid-template-columns:1fr 1fr; gap:14px 26px; margin-top:16px;`
    list-style none; each `padding:12px 16px; border-radius:16px;`
    `background:rgba(255,255,255,.1); font-size:13.5px; line-height:1.5`.
  * Credentials line (only where present): `font-size:12.5px; margin-top:16px; opacity:.92`.
  * Tech pills: `display:flex; flex-wrap:wrap; gap:7px; margin-top:20px`; each
    `padding:7px 12px; border-radius:999px; border:1.5px solid rgba(255,255,255,.5);`
    `font:600 11.5px Archivo`.
* Entry order: **newest first** (msg life → GEBIT → Accelsis → Alcatel-Lucent → Abitur).
  Default open entry on load: `msg` (msg life).

### 7. Skills / Hobbies / Languages
* `padding:44px 40px 12px; display:grid; grid-template-columns:1fr 340px; gap:36px;`
  `align-items:start`.
* Left column = `flex column; gap:20px`:
  * **Skills card**: `background:#e8f6ed; border-radius:24px; padding:32px 34px`. Heading as in
    About (colour `#1f7247`). Groups in `display:grid; grid-template-columns:1fr 1fr; gap:24px 32px`;
    per group a label (`font:800 10px Archivo; letter-spacing:.09em; uppercase; color:#17607f;`
    `margin-bottom:10px`) and pills `padding:7px 12px; border-radius:999px; background:#faf8f6;`
    `border:1.5px solid rgba(32,30,29,.1); font:600 11.5px Archivo`.
  * **Hobbies card** ("Abseits der Arbeit"): `background:#e8f6ed; border-radius:24px;`
    `padding:28px 30px`, heading colour `#1f7247`, same pills in a wrapping row. Last pill is a
    link to `https://sboe0705.github.io/schedoughler/` labelled `Schedoughler ↗`, styled
    `border:1.5px solid #17607f; color:#17607f; text-decoration:none`, hover `background:#e7f2f8`,
    `target="_blank" rel="noopener"`.
* Right column = **Languages card**: `background:#e7f2f8; border-radius:24px; padding:28px 30px`,
  heading colour `#17607f`; items `flex column; gap:14px`, name `font-weight:800; font-size:17px`,
  level `font-size:12.5px; color:rgba(32,30,29,.6); margin-top:2px`.

### 8. Contact band
* `margin:44px 24px 24px; background:#17607f; border-radius:24px; padding:44px 40px;`
  `display:flex; align-items:center; justify-content:space-between; gap:32px; flex-wrap:wrap`.
* Left: `h2` `font-size:34px; color:#fff; letter-spacing:-.02em` ("Lass uns sprechen.").
  Contact grid `display:grid; grid-template-columns:1fr 1fr; gap:10px 32px; margin-top:22px`; per
  item a label (`font:800 9.5px Archivo; letter-spacing:.09em; uppercase;`
  `color:rgba(255,255,255,.7)`) above a link (`font-size:14.5px; font-weight:600; color:#fff;`
  `text-decoration:none; border-bottom:1.5px solid rgba(255,255,255,.4); width:fit-content`;
  hover `border-color:#fff`). Then the placeholder note
  `font-size:12.5px; color:rgba(255,255,255,.8); margin-top:20px`.
* Right: button `padding:14px 28px; border-radius:999px; background:#faf8f6; color:#17607f;`
  `font:700 14.5px Archivo`.

## Interactions & Behavior
1. **Expand / collapse entry** — click anywhere on an entry card. Only one entry open at a time;
   clicking the open one collapses it (`openId = openId === id ? null : id`). Add keyboard access
   in the Vue build: `role="button"`, `tabindex="0"`, Enter/Space toggle, `aria-expanded`,
   and a themed focus ring `outline:2px solid #2f9c62; outline-offset:2px`.
   Recommended (not in the prototype): animate the reveal with a height/opacity transition
   ~180–220ms `cubic-bezier(.2,.7,.3,1)`; respect `prefers-reduced-motion`.
2. **Technology filter** — a chip filters entries to those whose `tech` contains the chip value;
   `Alle Stationen` clears it. Filtering does not close the open entry (if it is filtered out, it
   simply is not rendered and reappears when the filter is cleared).
3. **Language switch** — DE/EN toggles every string, including entry copy, skills group names,
   hobby names, language levels, and the AI band. All copy for both languages is in
   `cv-data.json`. Also set `document.documentElement.lang`.
4. **Scroll progress** — the rail fill height tracks vertical scroll across the timeline element:
   `p = clamp01((viewportHeight * 0.62 - rect.top) / rect.height)`, applied as `height: p*100%`.
   Use a passive scroll + resize listener (or `IntersectionObserver`/`requestAnimationFrame`
   throttling) and clean it up on unmount.
5. **Hover states** — buttons and chips as specified above; entry cards may lift subtly
   (`box-shadow 0 2px 6px rgba(32,30,29,.1)`), no transform.
6. **No responsive work required** (desktop only, fixed 1180px content column). Keep the page
   horizontally scrollable rather than reflowing.

## State Management
Local component state is enough — no store needed.
* `lang: 'de' | 'en'` — default `'de'`; persist in `localStorage` and honour it on load.
* `openId: string | null` — default `'msg'`.
* `filter: string | null` — default `null`.
* `progress: number` (0…1) — derived from scroll.
* `entries` — computed: source list filtered by `filter`, reversed to newest-first, mapped to the
  active language.
No data fetching; import `cv-data.json` (or a typed `cv.ts`) at build time.

## Design Tokens
Colours
| Token | Hex | Use |
| --- | --- | --- |
| Green base (primary voice) | `#2f9c62` | primary button, rail fill, active chip/lang, kicker pill text pairing |
| Green deep | `#1e6e44` | open timeline entry fill, AI band fill |
| Green ink | `#1f7247` | headings on green tints, primary button hover |
| Green tint | `#e8f6ed` | skills/hobbies/kicker/lang-switch grounds, closed kind pill |
| Blue base (second voice) | `#2f9fc9` | secondary button hover border |
| Blue deep | `#17607f` | contact band fill, group labels, link accents |
| Blue tint | `#e7f2f8` | about + languages cards, hobby link hover |
| Card ground | `#fbfaf9` | closed timeline entry |
| Page card | `#faf8f6` | page shell, pills on tinted grounds |
| Page ground | `#e6e4e4` | outside the page card |
| Ink | `#201e1d` | body text |
| Ink 55–62% | `rgba(32,30,29,.55)` … `.62` | muted copy |
| Hairline | `rgba(32,30,29,.10)` – `.18` | 1–1.5px borders |
| On-dark copy | `#fff`, `rgba(255,255,255,.9)` | text on green/blue fills |
| On-dark fills | `rgba(255,255,255,.10)` / `.12` / `.18` / `.22` | bullet chips, kicker, kind pill |

Typography — **Archivo** (400 / 600 / 800), Google Fonts:
`@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;800&display=swap')`.
Scale used: 58 (h1) · 34 (section h2) · 30 (AI h2) · 25 (entry org) · 17.5 (lead) · 15.5–14.5 (body)
· 13.5 (bullets) · 12.5 (meta) · 11.5 (pills) · 10 / 9.5 (uppercase labels, `letter-spacing:.09–.1em`).
Display sizes carry negative tracking (`-.015em` … `-.03em`); headings `line-height:1.02–1.12`.

Radii: `999px` (pills, buttons, rail) · `28px` (page shell) · `24px` (section cards) ·
`22px` (timeline entry) · `16px` (bullet chip) · `14px`.
Spacing rhythm: 4 / 6 / 10 / 14 / 20 / 26 / 30 / 36 / 40 / 48 / 56px. Section padding `0 40px`.
Shadows: `0 1px 2px rgba(32,30,29,.07)` (entry) · `0 1px 3px rgba(32,30,29,.1)` (page shell).

## Assets
* **Portrait** — not supplied. The prototype shows a 320×380 drag-and-drop placeholder
  (`image-slot.js`, bundled for reference only; do not port it). Ask the user for the photo;
  serve a 2× JPEG/WebP and keep `border-radius:24px`, `object-fit:cover`.
* **Icons** — none used. If icons are added later, use Lucide.
* **Fonts** — Archivo from Google Fonts (self-host for production).
* **Source documents** — the CV content was transcribed from the user's reference letters and
  certificates (`uploads/cv/*.pdf` in the design project). Not part of this bundle and **must not**
  be published on the site: the user asked for content only, no document downloads.

## Files
| File | What it is |
| --- | --- |
| `Lebenslauf.dc.html` | The design prototype. Build option **2a** in section `#t2`; everything else is history. |
| `cv-data.json` | All content in DE and EN, ready to import — entries, skills, hobbies, languages, AI band, contact placeholders. |
| `modernist-styles.css` | The design system the visual language started from (Archivo, tokens). The final design overrides its red accent with the green/blue palette above and adds radii — treat as background reading. |
| `image-slot.js` | The prototype's portrait placeholder component. Reference only. |

Note on opening the prototype: `Lebenslauf.dc.html` still links its stylesheet from
`_ds/modernist-…/styles.css` (the design project's layout). Either repoint that `<link>` to the
bundled `modernist-styles.css` or ignore it — the design's own colours, radii and type sizes are all
inline in the file and in the tables above, so it renders readably without the stylesheet.

## Open points for the implementer
* **Contact data is placeholder** (`sebastian.boehm@example.com`, a generic LinkedIn URL). GitHub
  (`github.com/sboe0705`) is real. Phone number is deliberately omitted — do not add one.
* **PDF export** is specified as a secondary button but not implemented. Simplest route: a print
  stylesheet (`@page { size: A4; margin: 14mm }`, all entries force-expanded, filter/nav/language
  switch hidden, green fills kept but flattened) triggered by `window.print()`.
* **Legal**: a German-hosted personal site typically needs an Impressum and a privacy note — add a
  small footer link.
* Copy in the timeline entries paraphrases the employers' reference letters; keep it neutral (the
  user explicitly did not want verbatim quotes).
