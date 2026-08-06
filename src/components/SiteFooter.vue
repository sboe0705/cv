<script setup lang="ts">
import { useLegalDialog } from '@/composables/useLegalDialog'
import type { LegalStrings } from '@/data/types'

defineProps<{ legal: LegalStrings }>()

const { open } = useLegalDialog()

const year = new Date().getFullYear()

/**
 * Kept as a real anchor to #impressum rather than a button: the href is
 * meaningful (the dialog also opens from that hash on load, so the address is
 * shareable) and the click is intercepted to show the modal instead of jumping.
 */
function openLegal(event: MouseEvent) {
  event.preventDefault()
  open()
}
</script>

<template>
  <footer class="site-footer">
    <span>© {{ year }} {{ legal.copyright }}</span>
    <a class="legal-link" href="#impressum" @click="openLegal">{{ legal.label }}</a>
  </footer>
</template>

<style scoped>
.site-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 0 var(--section-pad-x) 28px;
  color: var(--ink-55);
  font-size: 12.5px;
}

.legal-link {
  color: var(--ink-55);
  text-decoration: none;
  border-bottom: 1px solid var(--hairline-14);
  cursor: pointer;
}

.legal-link:hover {
  color: var(--accent-base);
  border-color: var(--accent-base);
}
</style>
