import { computed, ref } from 'vue'

import { cv, filterByTech, resolveEntries } from '@/data/cv'
import type { Lang, ResolvedEntry } from '@/data/types'
import type { Ref } from 'vue'

/**
 * Timeline state: which entry is expanded and which technology chip is active.
 *
 * Filtering deliberately does not touch `openId` — an entry filtered out is
 * simply not rendered and comes back expanded when the filter is cleared.
 */
export function useTimeline(lang: Ref<Lang>) {
  const openId = ref<string | null>(cv.meta.openByDefault)
  const activeChip = ref<string | null>(null)

  const entries = computed<ResolvedEntry[]>(() =>
    resolveEntries(lang.value, filterByTech(activeChip.value)),
  )

  function toggle(id: string) {
    openId.value = openId.value === id ? null : id
  }

  function isOpen(id: string) {
    return openId.value === id
  }

  function selectChip(chip: string | null) {
    activeChip.value = chip
  }

  return { openId, activeChip, entries, toggle, isOpen, selectChip }
}
