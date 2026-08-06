<script setup lang="ts">
import type { ExternalLink } from '@/data/types'

defineProps<{
  title: string
  hobbies: string[]
  link: ExternalLink
}>()
</script>

<template>
  <div class="hobbies">
    <h2 class="hobbies-title">{{ title }}</h2>
    <div class="hobbies-list">
      <span v-for="hobby in hobbies" :key="hobby" class="pill">{{ hobby }}</span>
      <a class="pill pill-link" :href="link.href" target="_blank" rel="noopener">
        {{ link.label }} ↗
      </a>
    </div>
  </div>
</template>

<style scoped>
.hobbies {
  padding: 28px 30px;
  background: var(--support-tint);
  border-radius: var(--radius-card);
}

.hobbies-title {
  margin-bottom: 16px;
  color: var(--accent-base);
  font-size: 15px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.hobbies-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 7px 12px;
  border: 1.5px solid var(--hairline-10);
  border-radius: var(--radius-pill);
  background: var(--page-card);
  font-size: 11.5px;
  font-weight: 600;
  line-height: 1;
}

.pill-link {
  border-color: var(--accent-base);
  color: var(--accent-base);
  text-decoration: none;
}

.pill-link:hover {
  background: var(--accent-tint);
}
</style>
