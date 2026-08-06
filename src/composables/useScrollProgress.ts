import { onBeforeUnmount, onMounted, ref } from 'vue'

import type { Ref } from 'vue'

/** The point down the viewport that counts as "read up to here". */
const READ_LINE = 0.62

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value))
}

/**
 * How far the user has scrolled through `target`, as 0…1.
 *
 * Listeners are passive and rAF-throttled, and are removed on unmount.
 */
export function useScrollProgress(target: Ref<HTMLElement | null>) {
  const progress = ref(0)
  let frame = 0

  function measure() {
    frame = 0
    const el = target.value
    if (!el) return

    const rect = el.getBoundingClientRect()
    if (rect.height === 0) {
      progress.value = 0
      return
    }
    progress.value = clamp01((window.innerHeight * READ_LINE - rect.top) / rect.height)
  }

  function schedule() {
    if (frame !== 0) return
    frame = requestAnimationFrame(measure)
  }

  onMounted(() => {
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    measure()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
    if (frame !== 0) cancelAnimationFrame(frame)
  })

  return { progress, remeasure: schedule }
}
