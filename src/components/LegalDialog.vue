<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import { useLanguage } from '@/composables/useLanguage'
import { useLegalDialog } from '@/composables/useLegalDialog'
import { legal } from '@/data/legal'

const { lang } = useLanguage()
const { isOpen, open, close } = useLegalDialog()

const doc = computed(() => legal[lang.value])
const dialog = ref<HTMLDialogElement | null>(null)

/**
 * `showModal()` is what makes this a real modal — it traps focus, closes on
 * Escape and renders the ::backdrop. It cannot be expressed declaratively, so
 * the boolean drives the imperative call and the dialog's own close event
 * syncs the boolean back (Escape and backdrop clicks bypass our handlers).
 */
watch(isOpen, (value) => {
  const el = dialog.value
  if (!el) return
  if (value && !el.open) el.showModal()
  else if (!value && el.open) el.close()
})

/** Clicking the backdrop lands on the dialog element itself, not its content. */
function onBackdropClick(event: MouseEvent) {
  if (event.target === dialog.value) close()
}

/** Someone may share or bookmark the anchor the footer link carries. */
function openFromHash() {
  if (window.location.hash === '#impressum') open()
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
  <dialog
    id="impressum"
    ref="dialog"
    class="legal-dialog"
    aria-labelledby="legal-dialog-title"
    @close="close"
    @click="onBackdropClick"
  >
    <div class="legal-head">
      <div>
        <h2 id="legal-dialog-title" class="legal-title">{{ doc.title }}</h2>
        <p class="legal-updated">{{ doc.updated }}</p>
      </div>
      <button type="button" class="legal-close" :aria-label="'Schließen / Close'" @click="close">
        ×
      </button>
    </div>

    <div class="legal-body">
      <section v-for="(block, index) in doc.blocks" :key="index" class="legal-block">
        <h3 v-if="block.heading" class="legal-heading">{{ block.heading }}</h3>
        <p v-for="(text, i) in block.paragraphs" :key="i" class="legal-text">{{ text }}</p>
        <ul v-if="block.list" class="legal-list">
          <li v-for="item in block.list" :key="item">{{ item }}</li>
        </ul>
        <p v-for="link in block.links" :key="link.href" class="legal-text">
          <a class="legal-link" :href="link.href" target="_blank" rel="noopener">
            {{ link.label }} ↗
          </a>
        </p>
      </section>
    </div>
  </dialog>
</template>

<style scoped>
.legal-dialog {
  width: 720px;
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 96px);
  padding: 0;
  border: 0;
  border-radius: var(--radius-card);
  background: var(--page-card);
  color: var(--ink);
  box-shadow: 0 12px 40px rgba(32, 30, 29, 0.24);
}

.legal-dialog::backdrop {
  background: rgba(32, 30, 29, 0.45);
}

.legal-head {
  position: sticky;
  top: 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  padding: 28px 32px 18px;
  background: var(--page-card);
  border-bottom: 1px solid var(--hairline-12);
}

.legal-title {
  font-size: 20px;
  letter-spacing: -0.01em;
  color: var(--accent-base);
}

.legal-updated {
  margin-top: 4px;
  color: var(--ink-55);
  font-size: 11.5px;
}

.legal-close {
  flex: none;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: var(--radius-pill);
  background: var(--accent-tint);
  color: var(--accent-base);
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
}

.legal-close:hover {
  background: var(--highlight);
  color: var(--ink);
}

.legal-body {
  padding: 22px 32px 32px;
  overflow-y: auto;
}

.legal-block + .legal-block {
  margin-top: 20px;
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
  /* The address block arrives as one string with newlines. */
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

.legal-link {
  color: var(--accent-base);
  font-weight: 600;
  text-decoration: none;
  border-bottom: 1.5px solid var(--hairline-18);
}

.legal-link:hover {
  border-color: var(--accent-base);
}

@media screen and (max-width: 560px) {
  .legal-dialog {
    max-width: calc(100vw - 24px);
    /* dvh, not vh: a mobile browser's collapsing toolbar would otherwise push
       the bottom of the dialog off screen. Identical to vh on desktop. */
    max-height: calc(100dvh - 48px);
  }

  .legal-head {
    padding: 22px 20px 14px;
  }

  .legal-close {
    width: 40px;
    height: 40px;
  }

  .legal-body {
    padding: 18px 20px 24px;
  }
}
</style>
