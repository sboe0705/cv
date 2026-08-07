<script setup lang="ts">
import { ref, toRef } from 'vue'

import ScrollRail from '@/components/ScrollRail.vue'
import TimelineEntryCard from '@/components/TimelineEntryCard.vue'
import { useLanguage } from '@/composables/useLanguage'
import { useScrollProgress } from '@/composables/useScrollProgress'
import { useTimeline } from '@/composables/useTimeline'
import type { Lang } from '@/data/types'

const props = defineProps<{ lang: Lang }>()

const { t } = useLanguage()
const { entries, isOpen, toggle } = useTimeline(toRef(props, 'lang'))

const list = ref<HTMLElement | null>(null)
const { progress } = useScrollProgress(list)
</script>

<template>
  <section class="timeline">
    <div class="timeline-head">
      <h2 class="timeline-title">{{ t.timelineTitle }}</h2>
      <p class="timeline-sub">{{ t.timelineSub }}</p>
    </div>

    <div class="timeline-body">
      <ScrollRail :progress="progress" />
      <div ref="list" class="timeline-list">
        <TimelineEntryCard
          v-for="entry in entries"
          :key="entry.id"
          :entry="entry"
          :open="isOpen(entry.id)"
          @toggle="toggle"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.timeline-head {
  padding: 8px var(--section-pad-x) 16px;
}

.timeline-title {
  margin-bottom: 4px;
  font-size: 34px;
  letter-spacing: -0.02em;
}

.timeline-sub {
  color: var(--ink-55);
  font-size: 13.5px;
}

.timeline-body {
  display: flex;
  padding: 26px var(--section-pad-x) 8px;
}

.timeline-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

@media screen and (max-width: 560px) {
  .timeline-title {
    font-size: 26px;
  }
}
</style>
