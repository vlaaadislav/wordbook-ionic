import translateByYandex from './ya-translator'

export interface TranslatorResponse {
    source: string
    translation: string
    options: string[]
}

export function translate(source: string) {
    return translateByYandex(source)
}
