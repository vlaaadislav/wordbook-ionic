import { ref, toRaw, computed } from 'vue'
import { useAsyncState, createGlobalState } from '@vueuse/core'
import { toastController } from '@ionic/vue'
import { translate } from '../services/translator'
import storage, { WORD_LIST_KEY } from '../services/storage'
import type { TranslatorResponse } from '../services/translator'

export default createGlobalState(() => {
    const wordsList = ref<TranslatorResponse[]>([])

    const asyncStateOptions: Parameters<typeof useAsyncState>[2] = {
        onError: (e: unknown) => {
            e instanceof Error && toastController.create({
                message: e.message,
                duration: 1500
            }).then(toast => toast.present())
        }
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

    const { execute: deleteWord, error: deleteError, isLoading: isDeleteLoading } = useAsyncState(async (index: number) => {
        const updateWordList = toRaw(wordsList.value).filter((_, i) => i !== index)

        await (await storage).set(WORD_LIST_KEY, updateWordList)
        init()
    }, null, { ...asyncStateOptions, immediate: false })

    const isWordInWordList = (source: string) => {
        const trimmedSource = source.toLowerCase().trim()
        return !!wordsList.value.find(entry => {
            return entry.source.toLocaleLowerCase().trim() === trimmedSource
        })
    }

    const error = computed(() => storageError.value || translatorError.value || deleteError.value)
    const isLoading = computed(() => isStorageLoading.value || isTranslatorLoading.value || isDeleteLoading.value)

    return {
        wordsList,
        error,
        isLoading,
        appendWord: (source: string) => appendWord(0, source),
        deleteWord: (index: number) => deleteWord(0, index),
        isWordInWordList
    }
})
