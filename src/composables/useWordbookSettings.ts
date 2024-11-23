import { createGlobalState, toReactive } from '@vueuse/core'
import useStorage from './useStorage'

export interface UserSettings {
  perPage: number
}

export const WORD_LIST_STORAGE_KEY = 'settings'

export default createGlobalState(() => {
  const userSettings = useStorage<UserSettings>('WORD_LIST_STORAGE_KEY', {
    perPage: 15,
  })

  const isTranslationVisible = ref(true)

  return {
    isTranslationVisible,
    ...toRefs(toReactive(userSettings)),
  }
})
