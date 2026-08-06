<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'

const { t } = useLanguage()
</script>

<template>
  <section class="about">
    <div class="about-card">
      <h2 class="about-title">{{ t.aboutTitle }}</h2>
      <p class="about-body">{{ t.about }}</p>
    </div>
  </section>
</template>

<style scoped>
.about {
  padding: 0 var(--section-pad-x) 48px;
}

.about-card {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 36px;
  align-items: start;
  padding: 34px 36px;
  background: var(--accent-tint);
  border-radius: var(--radius-card);
}

.about-title {
  color: var(--accent-base);
  font-size: 15px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.about-body {
  max-width: 70ch;
  font-size: 15.5px;
  line-height: 1.6;
  text-wrap: pretty;
}
</style>
