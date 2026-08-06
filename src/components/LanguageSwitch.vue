<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'
import type { Lang } from '@/data/types'

const { lang, setLang } = useLanguage()

const options: { value: Lang; label: string }[] = [
  { value: 'de', label: 'DE' },
  { value: 'en', label: 'EN' },
]
</script>

<template>
  <div class="lang-switch" role="group" aria-label="Sprache / Language">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      class="lang-button"
      :class="{ 'is-active': lang === option.value }"
      :aria-pressed="lang === option.value"
      @click="setLang(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style scoped>
.lang-switch {
  display: flex;
  gap: 4px;
  padding: 4px;
  background: var(--accent-tint);
  border-radius: var(--radius-pill);
}

.lang-button {
  padding: 6px 14px;
  border: 0;
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--accent-base);
  font-size: 11.5px;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
}

.lang-button.is-active {
  background: var(--accent-base);
  color: var(--on-dark);
}
</style>
