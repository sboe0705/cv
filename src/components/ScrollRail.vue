<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  /** Reading progress through the timeline, 0…1. */
  progress: number
}>()

const fillHeight = computed(() => `${(props.progress * 100).toFixed(2)}%`)
</script>

<template>
  <div class="rail" aria-hidden="true">
    <div class="rail-track"></div>
    <div class="rail-fill" :style="{ height: fillHeight }"></div>
  </div>
</template>

<style scoped>
.rail {
  position: relative;
  flex: none;
  width: 10px;
  margin-right: 30px;
}

.rail-track {
  position: absolute;
  left: 3px;
  top: 6px;
  bottom: 6px;
  width: 4px;
  border-radius: var(--radius-pill);
  background: var(--hairline-12);
}

.rail-fill {
  position: absolute;
  left: 0;
  top: 6px;
  width: 10px;
  border-radius: var(--radius-pill);
  background: var(--accent-base);
}

/* Rail plus gutter costs 40px of a phone's width. Slimmed to 20px rather than
   hidden — the reading-progress cue is what the timeline was built around. */
@media screen and (max-width: 900px) {
  .rail {
    width: 6px;
    margin-right: 14px;
  }

  .rail-track {
    left: 1px;
  }

  .rail-fill {
    width: 6px;
  }
}
</style>
