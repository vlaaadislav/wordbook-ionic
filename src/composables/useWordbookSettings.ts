import type { Options as TranslatorOptions } from '@/services/translator'
import { createGlobalState, toReactive } from '@vueuse/core'
import useStorage from './useStorage'

export interface UserSettings extends TranslatorOptions {
  perPage: number
  page: number
  darkMode: boolean
  wordsHideMode: 'translation' | 'source'
}

export const WORD_LIST_STORAGE_KEY = 'settings'

function useDarkMode() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
  const initialValue = prefersDark.matches
  const toggleDarkPalette = (shouldAdd: boolean) => {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd)
  }

  return { prefersDark, initialValue, toggleDarkPalette }
}

export default createGlobalState(() => {
  const { toggleDarkPalette, initialValue } = useDarkMode()

  const defaultValues: UserSettings = {
    page: 1,
    perPage: 15,
    darkMode: initialValue,
    wordsHideMode: 'translation',
    dictKey: import.meta.env.VITE_YANDEX_DICT_KEY,
    translateKey: import.meta.env.VITE_YANDEX_TRANSLATE_KEY,
  }

  const userSettings = useStorage<UserSettings>(
    WORD_LIST_STORAGE_KEY,
    defaultValues,
    { mergeDefaults: true },
  )

  watchEffect(() => {
    toggleDarkPalette(userSettings.value.darkMode)
  })

  const isTranslationVisible = ref(true)

  return {
    isTranslationVisible,
    defaultValues,
    ...toRefs(toReactive(userSettings)),
  }
})
