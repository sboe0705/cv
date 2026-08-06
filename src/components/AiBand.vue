<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'

const { t } = useLanguage()
</script>

<template>
  <section class="ai">
    <div class="ai-band">
      <div class="ai-grid">
        <div>
          <p class="ai-kicker">{{ t.ai.kicker }}</p>
          <h2 class="ai-title">{{ t.ai.title }}</h2>
          <p class="ai-body">{{ t.ai.body }}</p>
        </div>
        <ul class="ai-points">
          <li v-for="point in t.ai.points" :key="point" class="ai-point">{{ point }}</li>
        </ul>
      </div>
      <p class="ai-note">{{ t.ai.note }}</p>
    </div>
  </section>
</template>

<style scoped>
.ai {
  padding: 0 var(--section-pad-x) 48px;
}

.ai-band {
  padding: 38px 40px;
  background: var(--accent-deep);
  border-radius: var(--radius-card);
  color: var(--on-dark);
}

.ai-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px;
  align-items: start;
}

.ai-kicker {
  display: inline-block;
  padding: 6px 14px;
  border-radius: var(--radius-pill);
  background: var(--highlight);
  color: var(--ink);
  font-size: 10px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.ai-title {
  margin-top: 16px;
  font-size: 30px;
  letter-spacing: -0.02em;
}

.ai-body {
  max-width: 44ch;
  margin-top: 12px;
  font-size: 15.5px;
  line-height: 1.55;
  text-wrap: pretty;
}

.ai-points {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ai-point {
  padding: 14px 18px;
  border-radius: var(--radius-chip);
  background: var(--on-dark-fill-12);
  font-size: 13.5px;
  line-height: 1.5;
}

.ai-note {
  margin-top: 26px;
  padding-top: 18px;
  border-top: 1.5px solid var(--on-dark-rule-band);
  color: var(--on-dark-90);
  font-size: 12.5px;
}
</style>
