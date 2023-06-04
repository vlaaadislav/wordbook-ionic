import uniqid from 'uniqid'
import { TranslatorResponse } from './translator'

interface TranslateResponse {
    lang: string
    text: string[]
}

interface DictionaryResponse {
    def: Array<{ text: string, tr: Array<{ text: string }> }>
}

const DICT = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup'
const DICT_KEY = 'dict.1.1.20190113T173518Z.6b5f6fc6886f7a00.04b3ef123e6617a253f041967b509d7e6d352ba9'

const TRANSLATE = 'https://translate.yandex.net/api/v1.5/tr.json/translate'
const TRANSLATE_KEY = 'trnsl.1.1.20190113T172305Z.c4f9164143be1338.970bea30a1fd7e8bfd561e1e7acba2073898b198'

const doRequest = async (...args: Parameters<typeof fetch>): ReturnType<typeof fetch> => {
    const response = await fetch(...args)

    if (!response.ok) {
        throw Error((await response.json()).message)
    }

    return response
}

const translateByDictionary = async (word: string): Promise<TranslatorResponse> => {
    const url = `${DICT}?key=${DICT_KEY}&lang=en-ru&flags=15&text=${encodeURIComponent(word)}`
    const data: DictionaryResponse = await (await doRequest(url)).json()

    const options = data.def.flatMap(entry => {
        return entry.text.toLocaleLowerCase() === word.toLowerCase()
            ? entry.tr.map(translation => translation.text)
            : []
    })

    return {
        id: uniqid(),
        source: word,
        translation: options[0] || '',
        options
    }
}

const translateByTranslate = async (source: string): Promise<TranslatorResponse> => {
    const url = `${TRANSLATE}?key=${TRANSLATE_KEY}&lang=en-ru&flags=15&text=${encodeURIComponent(source)}`
    const data: TranslateResponse = await (await doRequest(url)).json()

    const options = data.text || []

    return {
        id: uniqid,
        source,
        translation: options[0] || '',
        options: options
    }
}

export default async function translate(source: string): Promise<TranslatorResponse> {
    return source.split(' ').length === 1
        ? translateByDictionary(source)
        : translateByTranslate(source)
}
