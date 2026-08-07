import { computed, ref } from 'vue'

import { cv, resolveEntries } from '@/data/cv'
import type { Lang, ResolvedEntry } from '@/data/types'
import type { Ref } from 'vue'

/**
 * Timeline state: which entry is expanded.
 *
 * There was a technology filter here too. It was removed once the numbers were
 * looked at: with five stations, half its chips selected exactly one of them
 * and the broadest ("Java") hid only the Abitur — a worse way of clicking the
 * station directly. The `tech` pills on each entry tell the same story without
 * a control, and without the unenforced invariant that every chip string had
 * to appear verbatim in some entry's `tech` array.
 */
export function useTimeline(lang: Ref<Lang>) {
  const openId = ref<string | null>(cv.meta.openByDefault)

  const entries = computed<ResolvedEntry[]>(() => resolveEntries(lang.value))

  function toggle(id: string) {
    openId.value = openId.value === id ? null : id
  }

  function isOpen(id: string) {
    return openId.value === id
  }

  return { openId, entries, toggle, isOpen }
}
