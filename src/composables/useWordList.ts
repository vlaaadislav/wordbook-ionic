import type { TranslatorResponse } from '../services/translator'
import { toastController } from '@ionic/vue'
import { createGlobalState, useAsyncState } from '@vueuse/core'
import { translate } from '../services/translator'
import useStorage from './useStorage'
import useWordbookSettings from './useWordbookSettings'

export const WORD_LIST_STORAGE_KEY = 'word-list'

export default createGlobalState(() => {
  const onError = (e: unknown) => {
    console.error(e)

    e instanceof Error && toastController.create({
      message: e.message,
      duration: 1500,
    }).then(toast => toast.present())
  }

  const { dictKey, translateKey } = useWordbookSettings()

  const wordsList = useStorage<TranslatorResponse[]>(WORD_LIST_STORAGE_KEY, [], {
    onError,
  })

  const deleteWord = (id: TranslatorResponse['id']) => {
    wordsList.value = wordsList.value.filter(item => item.id !== id)
  }

  const changeTranslation = (id: TranslatorResponse['id'], option: TranslatorResponse['options'][number]) => {
    wordsList.value = wordsList.value.map((item) => {
      return item.id === id ? { ...item, translation: option } : item
    })
  }

  const { execute: appendWord, isLoading, error } = useAsyncState(async (source: string) => {
    wordsList.value = [...wordsList.value, await translate(source, {
      dictKey: dictKey.value,
      translateKey: translateKey.value,
    })]
  }, null, { onError, immediate: false })

  const isWordInWordList = (source: string) => {
    const trimmedSource = source.toLowerCase().trim()
    return !!wordsList.value.find((entry) => {
      return entry.source.toLocaleLowerCase().trim() === trimmedSource
    })
  }

  return { wordsList, deleteWord, changeTranslation, appendWord, isLoading, isWordInWordList, error }
})
