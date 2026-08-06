import { computed, ref, watch } from 'vue'

import { cv } from '@/data/cv'
import type { Lang, UiStrings } from '@/data/types'

const STORAGE_KEY = 'cv.lang'

function isLang(value: unknown): value is Lang {
  return value === 'de' || value === 'en'
}

function initialLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isLang(stored)) return stored
  } catch {
    // Private mode or blocked storage — fall through to the default.
  }
  return cv.meta.defaultLang
}

/**
 * Module-level state: the language is a property of the page, not of any one
 * component, and every section reads it.
 */
const lang = ref<Lang>(initialLang())

watch(
  lang,
  (value) => {
    document.documentElement.lang = value
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      // Persisting is a convenience; ignore storage failures.
    }
  },
  { immediate: true },
)

export function useLanguage() {
  /** Every chrome string for the active language. */
  const t = computed<UiStrings>(() => cv.ui[lang.value])

  function setLang(value: Lang) {
    lang.value = value
  }

  return { lang, t, setLang }
}
