<script setup lang="ts">
import type { LanguageSkill } from '@/data/types'

defineProps<{
  title: string
  languages: LanguageSkill[]
}>()
</script>

<template>
  <div class="languages">
    <h2 class="languages-title">{{ title }}</h2>
    <ul class="languages-list">
      <li v-for="language in languages" :key="language.name">
        <span class="language-name">{{ language.name }}</span>
        <span class="language-level">{{ language.level }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.languages {
  padding: 28px 30px;
  background: var(--accent-tint);
  border-radius: var(--radius-card);
}

.languages-title {
  margin-bottom: 16px;
  color: var(--accent-base);
  font-size: 15px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.languages-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.language-name {
  display: block;
  font-size: 17px;
  font-weight: 800;
}

.language-level {
  display: block;
  margin-top: 2px;
  color: var(--ink-60);
  font-size: 12.5px;
}
</style>
