import type { Translator } from './translator'
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

const translateByDictionary: Translator = async (word, translatorOptions) => {
  const flags = DICT_FLAGS.MORPHO | DICT_FLAGS.POS_FILTER
  const dictKey = translatorOptions?.dictKey ?? DICT_KEY

  const url = `${DICT}?key=${dictKey}&lang=en-ru&flags=${flags}&text=${encodeURIComponent(word)}`
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

const translateByTranslate: Translator = async (source, translatorOptions) => {
  const translateKey = translatorOptions?.translateKey ?? TRANSLATE_KEY
  const url = `${TRANSLATE}?key=${translateKey}&lang=en-ru&flags=15&text=${encodeURIComponent(source)}`
  const data: TranslateResponse = await (await doRequest(url)).json()

  const options = data.text || []

  return {
    id: uuidv4(),
    source,
    translation: options[0] || '',
    options,
  }
}

const translate: Translator = async (source, options) => {
  const dictionary = await translateByDictionary(source, options)

  if (dictionary.options.length === 0) {
    return translateByTranslate(source, options)
  }

  return dictionary
}

export default translate
