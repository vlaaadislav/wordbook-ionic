import { ref, toRaw, nextTick } from 'vue'
import { useAsyncState, createGlobalState } from '@vueuse/core'
import { toastController } from '@ionic/vue'
import { translate } from '../services/translator'
import storage, { WORD_LIST_KEY } from '../services/storage'
import type { TranslatorResponse } from '../services/translator'

type GetAsyncStateOptions = (triggerLoader?: boolean, immediate?: boolean) => Parameters<typeof useAsyncState>[2]

export default createGlobalState(() => {
    const wordsList = ref<TranslatorResponse[]>([])
    const error = ref<unknown>(null)
    const isLoading = ref(false)

    const getAsyncStateOptions: GetAsyncStateOptions = (triggerLoader = false, immediate = false) => ({
        immediate,
        onError: (e: unknown) => {
            error.value = e
            triggerLoader && (isLoading.value = false)
            console.error(e)
            e instanceof Error && toastController.create({
                message: e.message,
                duration: 1500
            }).then(toast => toast.present())
        },
        onSuccess: () => triggerLoader && (isLoading.value = false)
    })

    const startLoading = () => {
        error.value = null
        isLoading.value = true
    }

    const { execute: init } = useAsyncState(async () => {
        startLoading()
        wordsList.value = (await (await storage).get(WORD_LIST_KEY)) || []
    }, null, getAsyncStateOptions(true, true))

    const { execute: appendWord } = useAsyncState(async (source: string) => {
        startLoading()

        const translatorResponse = await translate(source)
        const updatedWordList = [...toRaw(wordsList.value), translatorResponse]

        await (await storage).set(WORD_LIST_KEY, updatedWordList)
        init()
    }, null, getAsyncStateOptions())

    const { execute: deleteWord } = useAsyncState(async (index: number) => {
        startLoading()

        const updateWordList = toRaw(wordsList.value).filter((_, i) => i !== index)

        await (await storage).set(WORD_LIST_KEY, updateWordList)
        init()
    }, null, getAsyncStateOptions())

    const isWordInWordList = (source: string) => {
        const trimmedSource = source.toLowerCase().trim()
        return !!wordsList.value.find(entry => {
            return entry.source.toLocaleLowerCase().trim() === trimmedSource
        })
    }

    return {
        wordsList,
        error,
        isLoading,
        appendWord: (source: string) => appendWord(0, source),
        deleteWord: (index: number) => deleteWord(0, index),
        isWordInWordList
    }
})
