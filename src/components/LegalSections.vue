<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import { useLanguage } from '@/composables/useLanguage'
import { legal } from '@/data/legal'
import type { LegalDocument } from '@/data/legal'

const { lang } = useLanguage()

const documents = computed<{ id: string; doc: LegalDocument }[]>(() => [
  { id: 'impressum', doc: legal[lang.value].imprint },
  { id: 'datenschutz', doc: legal[lang.value].privacy },
])

const root = ref<HTMLElement | null>(null)

/**
 * The footer links are plain anchors (#impressum / #datenschutz), so they work
 * with JavaScript disabled — the browser jumps to the collapsed section. With
 * JavaScript the targeted section also opens, which keeps the content one click
 * away as § 5 DDG's "unmittelbar erreichbar" expects.
 */
function openFromHash() {
  const id = window.location.hash.slice(1)
  if (id !== 'impressum' && id !== 'datenschutz') return

  const el = root.value?.querySelector<HTMLDetailsElement>(`#${id}`)
  if (!el) return

  el.open = true
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  window.addEventListener('hashchange', openFromHash)
  openFromHash()
})

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', openFromHash)
})
</script>

<template>
  <section ref="root" class="legal">
    <details v-for="{ id, doc } in documents" :id="id" :key="id" class="legal-doc">
      <summary class="legal-summary">
        <span class="legal-title">{{ doc.title }}</span>
        <span class="legal-updated">{{ doc.updated }}</span>
      </summary>

      <div class="legal-body">
        <section v-for="(block, index) in doc.blocks" :key="index" class="legal-block">
          <h3 v-if="block.heading" class="legal-heading">{{ block.heading }}</h3>
          <p v-for="(text, i) in block.paragraphs" :key="i" class="legal-text">{{ text }}</p>
          <ul v-if="block.list" class="legal-list">
            <li v-for="item in block.list" :key="item">{{ item }}</li>
          </ul>
        </section>
      </div>
    </details>
  </section>
</template>

<style scoped>
.legal {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 8px var(--section-pad-x) 28px;
}

.legal-doc {
  border: 1px solid var(--hairline-12);
  border-radius: var(--radius-chip);
  background: var(--card-ground);
}

.legal-summary {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 22px;
  cursor: pointer;
  list-style: none;
}

/* Replace the default triangle with a marker that matches the design. */
.legal-summary::-webkit-details-marker {
  display: none;
}

.legal-summary::after {
  content: '+';
  color: var(--accent-base);
  font-size: 17px;
  font-weight: 800;
  line-height: 1;
}

.legal-doc[open] .legal-summary::after {
  content: '–';
}

.legal-title {
  font-size: 13.5px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--accent-base);
}

.legal-updated {
  margin-left: auto;
  color: var(--ink-55);
  font-size: 11.5px;
}

.legal-body {
  padding: 0 22px 22px;
  max-width: 78ch;
}

.legal-block + .legal-block {
  margin-top: 18px;
}

.legal-heading {
  margin-bottom: 6px;
  font-size: 12.5px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.legal-text {
  font-size: 13px;
  line-height: 1.6;
  color: var(--ink-88);
  text-wrap: pretty;
  /* Address blocks arrive as one string with newlines. */
  white-space: pre-line;
}

.legal-text + .legal-text {
  margin-top: 8px;
}

.legal-list {
  margin-top: 8px;
  padding-left: 18px;
  list-style: disc;
  font-size: 13px;
  line-height: 1.6;
  color: var(--ink-88);
}
</style>
