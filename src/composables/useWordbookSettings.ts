import { createGlobalState } from '@vueuse/core'

export default createGlobalState(() => {
  const isTranslationVisible = ref(true)

  return {
    isTranslationVisible,
  }
})
