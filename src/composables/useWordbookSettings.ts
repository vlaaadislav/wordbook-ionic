import { createGlobalState } from '@vueuse/core'

interface Settings {
  perPage?: number
}

export default createGlobalState(() => {
  const isTranslationVisible = ref(true)

  return {
    isTranslationVisible,
  }
})
