import translateByYandex from './ya-translator'

export interface TranslatorResponse {
  id: string
  source: string
  translation: string
  options: string[]
}

export interface Options {
  dictKey: string
  translateKey: string
}

export type Translator = (source: string, options?: Options) => Promise<TranslatorResponse>

export function translate(source: string, options?: Options) {
  return translateByYandex(source.trim(), options)
}
