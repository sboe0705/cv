/**
 * The CV content model.
 *
 * This module and `cv.ts` are deliberately free of Vue imports: the content is
 * plain typed data, so it can be reused outside this site (a PDF generator, a
 * second front-end, an API) by importing `cv` and the helpers below.
 */

/** Every language the content is available in. Add one here and the compiler
 *  will point at every place that owes a translation. */
export type Lang = 'de' | 'en'

/** A value that exists once per language. */
export type Localized<T> = Record<Lang, T>

export type EntryKind = 'work' | 'study' | 'edu' | 'cert'

/** The part of a timeline entry that differs between languages. */
export interface EntryContent {
  /** e.g. "Okt 2005 – Sep 2008" or "seit 2017" */
  period: string
  role: string
  place: string
  summary: string
  bullets: string[]
  /** Degrees and awards. Empty string where the entry has none. */
  credentials: string
}

/**
 * One station of the career timeline.
 *
 * `year`, `org` and `tech` are language-independent on purpose: they are
 * proper nouns and technology names, identical in every language.
 */
export interface TimelineEntry {
  id: string
  year: string
  kind: EntryKind
  org: string
  /** Technology names, rendered as pills on the expanded entry. */
  tech: string[]
  content: Localized<EntryContent>
}

/** A timeline entry flattened to a single language — what components render. */
export type ResolvedEntry = Omit<TimelineEntry, 'content'> &
  EntryContent & {
    /** `kind` translated via `UiStrings.kinds`, e.g. "Anstellung". */
    kindLabel: string
  }

export interface SkillGroup {
  name: string
  items: string[]
}

export interface LanguageSkill {
  name: string
  level: string
}

/** A label/value pair — used for the hero facts and the contact rows. */
export interface LabelledValue {
  k: string
  v: string
}

export interface ContactEntry extends LabelledValue {
  href: string
}

export interface ExternalLink {
  label: string
  href: string
}

export interface AiBandStrings {
  kicker: string
  title: string
  body: string
  points: string[]
  note: string
}

/** Headings the printed document needs and the page has no place for — the
 *  page shows one merged timeline, the document splits it in two. */
export interface PdfStrings {
  experienceTitle: string
  educationTitle: string
}

export interface NavStrings {
  profile: string
  timeline: string
  skills: string
  contact: string
}

export interface LegalStrings {
  /** Footer link that opens the legal dialog. Names privacy too, so the
   *  privacy information stays findable — see src/data/legal.ts. */
  label: string
  copyright: string
}

/** Every piece of chrome copy for one language. */
export interface UiStrings {
  kinds: Record<EntryKind, string>
  nav: NavStrings
  kicker: string
  h1: string
  lead: string
  ctaMail: string
  ctaPdf: string
  /** Caption printed under the portrait. */
  photoNote: string
  /** Alt text for the portrait. */
  photoAlt: string
  aboutTitle: string
  about: string
  ai: AiBandStrings
  timelineTitle: string
  timelineSub: string
  /** Only the printed document uses these — see CvDocument.vue. */
  pdf: PdfStrings
  skillsTitle: string
  skillGroups: SkillGroup[]
  hobbiesTitle: string
  hobbies: string[]
  hobbyLink: ExternalLink
  languagesTitle: string
  languages: LanguageSkill[]
  heroFacts: LabelledValue[]
  footerTitle: string
  contacts: ContactEntry[]
  legal: LegalStrings
}

export interface CvMeta {
  name: string
  defaultLang: Lang
  /** Entry `id` expanded on first load. */
  openByDefault: string
}

export interface CvData {
  meta: CvMeta
  ui: Localized<UiStrings>
  /** Stored oldest-first (chronological). The timeline reverses for display. */
  entries: TimelineEntry[]
}
