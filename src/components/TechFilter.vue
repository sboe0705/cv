<script setup lang="ts">
import { cv } from '@/data/cv'

defineProps<{
  /** The chip currently applied, or null for "all entries". */
  active: string | null
  /** Label for the chip that clears the filter. */
  allLabel: string
  /** Accessible name for the group as a whole. */
  groupLabel: string
}>()

const emit = defineEmits<{ select: [chip: string | null] }>()

const chips = cv.meta.filterChips
</script>

<template>
  <div class="filter" role="group" :aria-label="groupLabel">
    <button
      type="button"
      class="chip"
      :class="{ 'is-active': active === null }"
      :aria-pressed="active === null"
      @click="emit('select', null)"
    >
      {{ allLabel }}
    </button>
    <button
      v-for="chip in chips"
      :key="chip"
      type="button"
      class="chip"
      :class="{ 'is-active': active === chip }"
      :aria-pressed="active === chip"
      @click="emit('select', active === chip ? null : chip)"
    >
      {{ chip }}
    </button>
  </div>
</template>

<style scoped>
.filter {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  max-width: 660px;
  justify-content: flex-end;
}

.chip {
  padding: 7px 13px;
  border: 1.5px solid var(--hairline-14);
  border-radius: var(--radius-pill);
  background: var(--page-card);
  color: var(--ink);
  font-size: 11.5px;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
}

.chip:hover {
  border-color: var(--hairline-18);
}

.chip.is-active {
  border-color: var(--accent-base);
  background: var(--accent-base);
  color: var(--on-dark);
}
</style>
