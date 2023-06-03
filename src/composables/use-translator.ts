import { ref, computed } from 'vue'
import { translate } from '../services/translator'
import type { TranslatorResponse } from '../services/translator'

const savedWords = ref<TranslatorResponse[]>([
    { source: 'hello', translation: 'привет', options: [] },
    { source: 'buy', translation: 'купить', options: [] },
    { source: 'test', translation: 'тест', options: [] }
])

const isTranslating = ref(false)

export default function useTranslator() {
    const wordsList = computed(() => savedWords.value)
    const translateNewWord = async (source: string) => {
        isTranslating.value = true

        try {
            const translatorResponse = await translate(source)
            savedWords.value = [...savedWords.value, translatorResponse]
        } finally {
            isTranslating.value = false
        }
    }

    return {
        wordsList,
        isTranslating,
        translate: translateNewWord,
    }
}
