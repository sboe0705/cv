<script setup lang="ts">
import { computed } from 'vue'

import { portraitJpg, portraitWebp } from '@/assets/portrait'
import { useLanguage } from '@/composables/useLanguage'
import { cv, resolveEntries } from '@/data/cv'

/**
 * The printed CV — a plain document, not the page on paper.
 *
 * It is hidden on screen and revealed by `print.css`, so it never competes
 * with the site's layout: the web page is a 1180px card of tinted panels and
 * pill clouds, which is exactly what a curriculum vitae should not look like.
 * Both read the same content from `src/data/cv.ts`.
 */
const { lang, t } = useLanguage()

const entries = computed(() => resolveEntries(lang.value))

/**
 * The classic CV split, derived from `kind` rather than a new data field:
 * employments carry their project bullets, school and degree stay short.
 */
const sections = computed(() => [
  {
    title: t.value.pdf.experienceTitle,
    entries: entries.value.filter((entry) => entry.kind === 'work'),
    bullets: true,
  },
  {
    title: t.value.pdf.educationTitle,
    entries: entries.value.filter((entry) => entry.kind !== 'work'),
    bullets: false,
  },
])

/** On paper a link has to spell itself out. */
const hobbyLinkUrl = computed(() =>
  t.value.hobbyLink.href.replace(/^https?:\/\//, '').replace(/\/$/, ''),
)
</script>

<template>
  <article class="cv-doc">
    <header class="doc-head">
      <div>
        <h1 class="doc-name">{{ cv.meta.name }}</h1>
        <p class="doc-lead">{{ t.lead }}</p>

        <p class="doc-facts">
          <span v-for="fact in t.heroFacts" :key="fact.k" class="doc-fact">
            <span class="doc-fact-label">{{ fact.k }}:</span> {{ fact.v }}
          </span>
        </p>

        <dl class="doc-contact">
          <template v-for="contact in t.contacts" :key="contact.k">
            <dt>{{ contact.k }}</dt>
            <dd>
              <a :href="contact.href">{{ contact.v }}</a>
            </dd>
          </template>
        </dl>
      </div>

      <picture>
        <source :srcset="portraitWebp" type="image/webp" />
        <img class="doc-photo" :src="portraitJpg" width="320" height="380" :alt="t.photoAlt" />
      </picture>
    </header>

    <section class="doc-section">
      <h2 class="doc-section-title">{{ t.aboutTitle }}</h2>
      <p>{{ t.about }}</p>
    </section>

    <section v-for="section in sections" :key="section.title" class="doc-section">
      <h2 class="doc-section-title">{{ section.title }}</h2>

      <div v-for="entry in section.entries" :key="entry.id" class="doc-entry">
        <p class="doc-period">{{ entry.period }}</p>
        <div>
          <h3 class="doc-org">{{ entry.org }}</h3>
          <p class="doc-role">{{ entry.role }} · {{ entry.place }}</p>
          <p class="doc-summary">{{ entry.summary }}</p>

          <ul v-if="section.bullets && entry.bullets.length" class="doc-bullets">
            <li v-for="bullet in entry.bullets" :key="bullet">{{ bullet }}</li>
          </ul>

          <p v-if="entry.credentials" class="doc-credentials">{{ entry.credentials }}</p>
          <p v-if="entry.tech.length" class="doc-tech">{{ entry.tech.join(' · ') }}</p>
        </div>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section-title">{{ t.ai.title }}</h2>
      <p>{{ t.ai.body }}</p>
      <ul class="doc-bullets">
        <li v-for="point in t.ai.points" :key="point">{{ point }}</li>
      </ul>
    </section>

    <section class="doc-section">
      <h2 class="doc-section-title">{{ t.skillsTitle }}</h2>
      <div v-for="group in t.skillGroups" :key="group.name" class="doc-row">
        <p class="doc-row-key">{{ group.name }}</p>
        <p>{{ group.items.join(' · ') }}</p>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section-title">{{ t.languagesTitle }}</h2>
      <div v-for="language in t.languages" :key="language.name" class="doc-row">
        <p class="doc-row-key">{{ language.name }}</p>
        <p>{{ language.level }}</p>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-section-title">{{ t.hobbiesTitle }}</h2>
      <p>
        {{ t.hobbies.join(' · ') }} ·
        <a :href="t.hobbyLink.href">{{ t.hobbyLink.label }}</a>
        <span class="doc-url"> ({{ hobbyLinkUrl }})</span>
      </p>
    </section>
  </article>
</template>

<style scoped>
/* Hidden on screen — and so out of the accessibility tree and the tab order,
   which keeps the content from being announced twice. The switch lives here
   rather than in print.css: scoped CSS carries an attribute selector, so a
   plain `.cv-doc` rule in a global sheet would lose on specificity. */
.cv-doc {
  display: none;
  color: var(--ink);
  font-size: 9pt;
  line-height: 1.32;
  text-wrap: pretty;
}

@media print {
  .cv-doc {
    display: block;
  }
}

.cv-doc a {
  color: inherit;
  text-decoration: none;
}

/* — header — */

.doc-head {
  display: grid;
  grid-template-columns: 1fr 34mm;
  gap: 8mm;
  align-items: start;
  break-inside: avoid;
}

.doc-name {
  font-size: 18pt;
  letter-spacing: -0.02em;
}

.doc-lead {
  margin-top: 2mm;
  font-size: 9.5pt;
  line-height: 1.35;
}

.doc-facts {
  margin-top: 3mm;
  font-size: 8pt;
}

.doc-fact + .doc-fact::before {
  content: ' · ';
  color: var(--ink-60);
}

.doc-fact-label {
  color: var(--ink-60);
}

.doc-contact {
  display: grid;
  grid-template-columns: 18mm 1fr;
  gap: 0.6mm 2mm;
  margin: 2.5mm 0 0;
  font-size: 8pt;
}

.doc-contact dt {
  color: var(--ink-60);
}

.doc-contact dd {
  margin: 0;
}

.doc-photo {
  width: 34mm;
  height: 40mm;
  object-fit: cover;
}

/* — sections — */

.doc-section {
  margin-top: 4.5mm;
}

.doc-section-title {
  margin-bottom: 2.5mm;
  padding-bottom: 1.2mm;
  border-bottom: 1px solid var(--accent-base);
  color: var(--accent-base);
  font-size: 8pt;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  break-after: avoid;
}

/* — one career station — */

.doc-entry {
  display: grid;
  grid-template-columns: 30mm 1fr;
  gap: 3mm;
  break-inside: avoid;
}

.doc-entry + .doc-entry {
  margin-top: 3.5mm;
}

.doc-period {
  font-size: 8pt;
  font-weight: 600;
}

.doc-org {
  font-size: 10.5pt;
  letter-spacing: -0.01em;
}

.doc-role {
  margin-top: 0.5mm;
  font-weight: 600;
}

.doc-summary {
  margin-top: 1.2mm;
}

.doc-bullets {
  /* base.css strips list markers globally; a printed CV wants them back. */
  margin-top: 1.5mm;
  padding-left: 4.5mm;
  list-style: disc;
}

.doc-bullets li {
  margin-top: 0.8mm;
}

.doc-credentials {
  margin-top: 1.5mm;
  color: var(--ink-88);
  font-size: 8pt;
}

.doc-tech {
  margin-top: 1.5mm;
  color: var(--ink-60);
  font-size: 8pt;
}

/* — label/value lines: skills and languages — */

.doc-row {
  display: grid;
  /* Wide enough for the longest group label to stay on one line. */
  grid-template-columns: 38mm 1fr;
  gap: 3mm;
  break-inside: avoid;
}

.doc-row + .doc-row {
  margin-top: 1.2mm;
}

.doc-row-key {
  font-weight: 700;
}

.doc-url {
  color: var(--ink-60);
}
</style>
