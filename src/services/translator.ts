import translateByYandex from './ya-translator'

export interface TranslatorResponse {
  id: string
  source: string
  translation: string
  options: string[]
}

export function translate(source: string) {
  return translateByYandex(source.trim())
}
