import { createGlobalState, toReactive } from '@vueuse/core'
import useStorage from './useStorage'

export interface UserSettings {
  perPage: number
  darkMode: boolean
}

export const WORD_LIST_STORAGE_KEY = 'settings'

function useDarkMode() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
  const intitialValue = prefersDark.matches
  const toggleDarkPalette = (shouldAdd: boolean) => {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd)
  }

  return { prefersDark, intitialValue, toggleDarkPalette }
}

export default createGlobalState(() => {
  const { toggleDarkPalette, intitialValue } = useDarkMode()

  const userSettings = useStorage<UserSettings>('WORD_LIST_STORAGE_KEY', {
    perPage: 15,
    darkMode: intitialValue,
  }, { mergeDefaults: true })

  watchEffect(() => {
    toggleDarkPalette(userSettings.value.darkMode)
  })

  const isTranslationVisible = ref(true)

  return {
    isTranslationVisible,
    ...toRefs(toReactive(userSettings)),
  }
})
