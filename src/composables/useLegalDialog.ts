import { ref } from 'vue'

/**
 * Whether the legal dialog is showing.
 *
 * Module-level, like the language: the footer opens it, the dialog itself
 * renders it, and neither is an ancestor of the other.
 */
const isOpen = ref(false)

export function useLegalDialog() {
  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  return { isOpen, open, close }
}
