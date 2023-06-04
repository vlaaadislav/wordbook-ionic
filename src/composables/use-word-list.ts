import { ref, toRaw, unref } from 'vue'
import { useAsyncState, createGlobalState } from '@vueuse/core'
import { toastController } from '@ionic/vue'
import { translate } from '../services/translator'
import storage, { WORD_LIST_KEY } from '../services/storage'
import type { TranslatorResponse } from '../services/translator'

export default createGlobalState(() => {
    const wordsList = ref<TranslatorResponse[]>([])
    const error = ref<unknown>(null)
    const isLoading = ref(false)

    const asyncStateOptions: Parameters<typeof useAsyncState>[2] = {
        onError: (e: unknown) => {
            error.value = e
            isLoading.value = false
            console.error(e)
            e instanceof Error && toastController.create({
                message: e.message,
                duration: 1500
            }).then(toast => toast.present())
        },
        onSuccess: () => isLoading.value = false
    }

    const startLoading = () => {
        error.value = null
        isLoading.value = true
    }

    const { execute: init } = useAsyncState(async () => {
        startLoading()
        wordsList.value = (await (await storage).get(WORD_LIST_KEY)) || []
    }, null, asyncStateOptions)

    const { execute: appendWord } = useAsyncState(async (source: string) => {
        startLoading()
        const translatorResponse = await translate(source)
        const updatedWordList = [...toRaw(wordsList.value), translatorResponse]
        await (await storage).set(WORD_LIST_KEY, updatedWordList)
        init()
    }, null, { ...asyncStateOptions, immediate: false })

    return {
        wordsList,
        error,
        isLoading,
        appendWord: (source: string) => appendWord(0, source)
    }
})
