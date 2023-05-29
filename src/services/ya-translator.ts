import { TranslatorResponse } from './translator'

const DICT = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup'
const DICT_KEY = 'dict.1.1.20190113T173518Z.6b5f6fc6886f7a00.04b3ef123e6617a253f041967b509d7e6d352ba9'

const TRANSLATE = 'https://translate.yandex.net/api/v1.5/tr.json/translate'
const TRANSLATE_KEY = 'trnsl.1.1.20190113T172305Z.c4f9164143be1338.970bea30a1fd7e8bfd561e1e7acba2073898b198'

function formatResponse(source: string, data) {

}

export default async function translate(word: string) {
    const url = word.split(' ').length === 1
        ? `${DICT}?key=${DICT_KEY}`
        : `${TRANSLATE}?key=${TRANSLATE_KEY}`

    const response = await fetch(`${url}&lang=en-ru&flags=15&text=${encodeURIComponent(word)}`)
    const data = await response.json()
}