<script setup lang="ts">
import { computed } from 'vue'

import type { ResolvedEntry } from '@/data/types'

const props = defineProps<{
  entry: ResolvedEntry
  open: boolean
}>()

const emit = defineEmits<{ toggle: [id: string] }>()

const detailId = computed(() => `entry-detail-${props.entry.id}`)

function toggle() {
  emit('toggle', props.entry.id)
}
</script>

<template>
  <article
    class="entry"
    :class="{ 'is-open': open }"
    role="button"
    tabindex="0"
    :aria-expanded="open"
    :aria-controls="detailId"
    @click="toggle"
    @keydown.enter.prevent="toggle"
    @keydown.space.prevent="toggle"
  >
    <div class="entry-left">
      <span class="entry-year">{{ entry.year }}</span>
      <span class="entry-kind">{{ entry.kindLabel }}</span>
    </div>

    <div class="entry-main">
      <h3 class="entry-org">{{ entry.org }}</h3>
      <p class="entry-role">{{ entry.role }}</p>
      <p class="entry-meta">{{ entry.period }} · {{ entry.place }}</p>

      <!-- Collapsed via a 0fr → 1fr grid row, so the reveal animates without
           measuring heights. `inert` keeps the hidden copy out of the tab
           order and the accessibility tree; print CSS forces it open. -->
      <div :id="detailId" class="entry-detail" :inert="!open || undefined">
        <div class="entry-detail-clip">
          <div class="entry-detail-body">
            <p class="entry-summary">{{ entry.summary }}</p>

            <ul v-if="entry.bullets.length" class="entry-bullets">
              <li v-for="bullet in entry.bullets" :key="bullet" class="entry-bullet">
                {{ bullet }}
              </li>
            </ul>

            <p v-if="entry.credentials" class="entry-credentials">
              {{ entry.credentials }}
            </p>

            <div v-if="entry.tech.length" class="entry-tech">
              <span v-for="tech in entry.tech" :key="tech" class="entry-tech-pill">
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.entry {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 30px;
  align-items: start;
  padding: 26px 30px;
  border-radius: var(--radius-entry);
  background: var(--card-ground);
  color: var(--ink);
  box-shadow: var(--shadow-entry);
  cursor: pointer;
  transition: box-shadow 140ms ease;
}

.entry:hover {
  box-shadow: var(--shadow-entry-hover);
}

.entry.is-open {
  background: var(--accent-deep);
  color: var(--on-dark);
}

.entry-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.entry-year {
  font-size: 40px;
  font-weight: 800;
  line-height: 0.9;
  letter-spacing: -0.03em;
}

.entry-kind {
  padding: 5px 12px;
  border-radius: var(--radius-pill);
  background: var(--accent-tint);
  color: var(--accent-base);
  font-size: 9.5px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.entry.is-open .entry-kind {
  background: var(--on-dark-fill-22);
  color: var(--on-dark);
}

.entry-org {
  font-size: 25px;
  letter-spacing: -0.015em;
}

.entry-role {
  margin-top: 5px;
  font-size: 15.5px;
  font-weight: 600;
}

.entry-meta {
  margin-top: 3px;
  font-size: 12.5px;
  opacity: 0.88;
}

.entry-detail {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--duration-reveal) var(--ease-reveal);
}

.entry.is-open .entry-detail {
  grid-template-rows: 1fr;
}

.entry-detail-clip {
  overflow: hidden;
}

.entry-detail-body {
  padding-top: 20px;
  opacity: 0;
  transition: opacity var(--duration-reveal) var(--ease-reveal);
}

.entry.is-open .entry-detail-body {
  opacity: 1;
}

.entry-summary {
  max-width: 62ch;
  font-size: 15.5px;
  line-height: 1.55;
  text-wrap: pretty;
}

.entry-bullets {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px 26px;
  margin-top: 16px;
}

.entry-bullet {
  padding: 12px 16px;
  border-radius: var(--radius-chip);
  background: var(--on-dark-fill-10);
  font-size: 13.5px;
  line-height: 1.5;
}

.entry-credentials {
  margin-top: 16px;
  font-size: 12.5px;
  opacity: 0.92;
}

.entry-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 20px;
}

.entry-tech-pill {
  padding: 7px 12px;
  border: 1.5px solid var(--highlight);
  border-radius: var(--radius-pill);
  color: var(--highlight);
  font-size: 11.5px;
  font-weight: 600;
  line-height: 1;
}
</style>
