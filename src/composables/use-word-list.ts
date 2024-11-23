import type { TranslatorResponse } from '../services/translator'
import { toastController } from '@ionic/vue'
import { createGlobalState, useAsyncState } from '@vueuse/core'
import { computed, ref, toRaw } from 'vue'
import storage, { WORD_LIST_KEY } from '../services/storage'
import { translate } from '../services/translator'

export default createGlobalState(() => {
  const wordsList = ref<TranslatorResponse[]>([])

  const asyncStateOptions: Parameters<typeof useAsyncState>[2] = {
    onError: (e: unknown) => {
      e instanceof Error && toastController.create({
        message: e.message,
        duration: 1500,
      }).then(toast => toast.present())
    },
  }

  const { execute: init, error: storageError, isLoading: isStorageLoading } = useAsyncState(async () => {
    wordsList.value = (await (await storage).get(WORD_LIST_KEY)) || []
  }, null, asyncStateOptions)

  const { execute: appendWord, error: translatorError, isLoading: isTranslatorLoading } = useAsyncState(async (source: string) => {
    const translatorResponse = await translate(source)
    const updatedWordList = [...toRaw(wordsList.value), translatorResponse]

    await (await storage).set(WORD_LIST_KEY, updatedWordList)
    init()
  }, null, { ...asyncStateOptions, immediate: false })

  const { execute: deleteWord, error: deleteError, isLoading: isDeleteLoading } = useAsyncState(async (id: TranslatorResponse['id']) => {
    const updateWordList = toRaw(wordsList.value).filter(item => item.id !== id)

    await (await storage).set(WORD_LIST_KEY, updateWordList)
    init()
  }, null, { ...asyncStateOptions, immediate: false })

  const {
    execute: changeTranslation,
    error: changeTranslationError,
    isLoading: isChangeTranslationLoading,
  } = useAsyncState(async (id: TranslatorResponse['id'], option: TranslatorResponse['options'][number]) => {
    const updatedWordList = toRaw(wordsList.value).map((item) => {
      return item.id === id
        ? { ...item, translation: option }
        : item
    })

    await (await storage).set(WORD_LIST_KEY, updatedWordList)
    init()
  }, null, { ...asyncStateOptions, immediate: false })

  const isWordInWordList = (source: string) => {
    const trimmedSource = source.toLowerCase().trim()
    return !!wordsList.value.find((entry) => {
      return entry.source.toLocaleLowerCase().trim() === trimmedSource
    })
  }

  const error = computed(() => storageError.value || translatorError.value || deleteError.value || changeTranslationError.value)
  const isLoading = computed(() => isStorageLoading.value || isTranslatorLoading.value || isDeleteLoading.value || isChangeTranslationLoading.value)

  return {
    wordsList,
    error,
    isLoading,
    appendWord: (source: string) => appendWord(0, source),
    changeTranslation: (id: number, option: string) => changeTranslation(0, id, option),
    deleteWord: (id: TranslatorResponse['id']) => deleteWord(0, id),
    isWordInWordList,
  }
})
