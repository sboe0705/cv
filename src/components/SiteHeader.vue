<script setup lang="ts">
import LanguageSwitch from '@/components/LanguageSwitch.vue'
import { useLanguage } from '@/composables/useLanguage'
import { cv } from '@/data/cv'

const { t } = useLanguage()

/** The brand keeps a non-breaking space so the name never wraps. */
const brand = cv.meta.name.toUpperCase().replace(' ', ' ')
</script>

<template>
  <header class="site-header">
    <span class="brand">{{ brand }}</span>
    <div class="header-right">
      <nav class="nav">
        <a href="#profil">{{ t.nav.profile }}</a>
        <a href="#werdegang">{{ t.nav.timeline }}</a>
        <a href="#skills">{{ t.nav.skills }}</a>
      </nav>
      <LanguageSwitch />
    </div>
  </header>
</template>

<style scoped>
.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px var(--section-pad-x);
  border-bottom: 1px solid var(--hairline-12);
}

.brand {
  font-size: 16px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.01em;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 26px;
}

.nav {
  display: flex;
  gap: 22px;
  font-size: 12.5px;
  font-weight: 600;
  line-height: 1;
}

.nav a {
  color: var(--ink);
  text-decoration: none;
}

.nav a:hover {
  color: var(--accent-base);
}
</style>
