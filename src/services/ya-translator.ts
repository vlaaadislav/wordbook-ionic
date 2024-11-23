import type { TranslatorResponse } from './translator'
import { v4 as uuidv4 } from 'uuid'

interface TranslateResponse {
  lang: string
  text: string[]
}

interface DictionaryResponse {
  def: Array<{ text: string, tr: Array<{ text: string }> }>
}

const DICT = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup'
const DICT_KEY = import.meta.env.VITE_YANDEX_DICT_KEY

const TRANSLATE = 'https://translate.yandex.net/api/v1.5/tr.json/translate'
const TRANSLATE_KEY = import.meta.env.VITE_YANDEX_TRANSLATE_KEY

async function doRequest(...args: Parameters<typeof fetch>): ReturnType<typeof fetch> {
  const response = await fetch(...args)

  if (!response.ok) {
    throw new Error((await response.json()).message)
  }

  return response
}

async function translateByDictionary(word: string): Promise<TranslatorResponse> {
  const url = `${DICT}?key=${DICT_KEY}&lang=en-ru&flags=15&text=${encodeURIComponent(word)}`
  const data: DictionaryResponse = await (await doRequest(url)).json()

  const options = data.def.flatMap((entry) => {
    return entry.text.toLocaleLowerCase() === word.toLowerCase()
      ? entry.tr.map(translation => translation.text)
      : []
  })

  return {
    id: uuidv4(),
    source: word,
    translation: options[0] || '',
    options,
  }
}

async function translateByTranslate(source: string): Promise<TranslatorResponse> {
  const url = `${TRANSLATE}?key=${TRANSLATE_KEY}&lang=en-ru&flags=15&text=${encodeURIComponent(source)}`
  const data: TranslateResponse = await (await doRequest(url)).json()

  const options = data.text || []

  return {
    id: uuidv4(),
    source,
    translation: options[0] || '',
    options,
  }
}

export default async function translate(source: string): Promise<TranslatorResponse> {
  return source.split(' ').length === 1
    ? translateByDictionary(source)
    : translateByTranslate(source)
}
