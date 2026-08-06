<script setup lang="ts">
import type { LegalStrings } from '@/data/types'

defineProps<{ legal: LegalStrings }>()

const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <span>© {{ year }} {{ legal.copyright }}</span>
    <nav class="legal-links">
      <a :href="legal.imprintHref">{{ legal.imprintLabel }}</a>
      <a :href="legal.privacyHref">{{ legal.privacyLabel }}</a>
    </nav>
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

.legal-links {
  display: flex;
  gap: 20px;
}

.legal-links a {
  color: var(--ink-55);
  text-decoration: none;
  border-bottom: 1px solid var(--hairline-14);
}

.legal-links a:hover {
  color: var(--accent-base);
  border-color: var(--accent-base);
}
</style>
