import type { TranslatorResponse } from './translator'
import { v4 as uuidv4 } from 'uuid'
import { capitalize } from 'vue'

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

const DICT_FLAGS = {
  FAMILY: 0x0001,
  SHORT_POS: 0x0002,
  MORPHO: 0x0004,
  POS_FILTER: 0x0008,
} as const

async function doRequest(...args: Parameters<typeof fetch>): ReturnType<typeof fetch> {
  const response = await fetch(...args)

  if (!response.ok) {
    throw new Error((await response.json()).message)
  }

  return response
}

async function translateByDictionary(word: string): Promise<TranslatorResponse> {
  const flags = DICT_FLAGS.MORPHO | DICT_FLAGS.POS_FILTER

  const url = `${DICT}?key=${DICT_KEY}&lang=en-ru&flags=${flags}&text=${encodeURIComponent(word)}`
  const data: DictionaryResponse = await (await doRequest(url)).json()

  const options = data.def.flatMap((entry) => {
    return entry.tr.map(translation => translation.text)
  })

  return {
    id: uuidv4(),
    source: capitalize(data.def[0]?.text ?? word),
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
  const dictionary = await translateByDictionary(source)

  if (dictionary.options.length === 0) {
    return translateByTranslate(source)
  }

  return dictionary
}
