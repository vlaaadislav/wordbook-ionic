<script lang="ts" setup>
import {
  IonButton,
  IonInput,
  IonModal,
  toastController,
} from '@ionic/vue'
import useTranslator from '../composables/use-word-list'

interface Props {
  trigger: string
}

defineProps<Props>()

const { appendWord, error, isWordInWordList, isLoading } = useTranslator()

const isOpened = ref(false)

const newWord = ref('')
const isInputTouched = ref(false)

const wordToSave = computed(() => {
  const word = newWord.value.toLocaleLowerCase().trim()
  return `${word.charAt(0).toUpperCase()}${word.slice(1)}`
})

const isNewWordValid = computed(() => wordToSave.value.length > 0)
const isWordAlreadyExists = computed(() => wordToSave.value && isWordInWordList(newWord.value))

watch(isOpened, () => isInputTouched.value = false)

async function saveNewWord() {
  if (!isNewWordValid.value) {
    return
  }

  await appendWord(wordToSave.value)

  if (error.value) {
    return
  }

  const toast = await toastController.create({
    message: 'Word successfully added to wordbook!',
    swipeGesture: 'vertical',
    duration: 1500,
    positionAnchor: 'footer',
  })
  toast.present()

  isOpened.value = false
  newWord.value = ''
}
</script>

<template>
  <IonModal
    :is-open="isOpened"
    :trigger="trigger"
    :breakpoints="[0, 0.25]"
    :initial-breakpoint="0.25"
    :handle="false"
    @did-present="$refs['input-ref']?.$el.setFocus()"
    @will-dismiss="isOpened = false"
    @will-present="isOpened = true"
  >
    <div class="add-word-container ion-justify-content-between ion-padding">
      <IonInput
        ref="input-ref"
        v-model="newWord"
        :class="{
          'ion-touched': isInputTouched,
          'ion-invalid': !isNewWordValid,
        }"
        fill="outline"
        label="Enter a new word"
        label-placement="floating"
        :helper-text="isWordAlreadyExists ? 'This word already in wordbook!' : undefined"
        error-text="Field is required"
        clear-input
        @ion-blur="isInputTouched = true"
      />

      <IonButton
        expand="block"
        :color="isWordAlreadyExists ? 'light' : 'primary'"
        :disabled="isLoading"
        @click="saveNewWord()"
      >
        {{ isWordAlreadyExists ? 'Save duplicate' : 'Save' }}
      </IonButton>
    </div>
  </IonModal>
</template>

<style scoped>
    .add-word-container {
      height: 25%;
      display: flex;
      flex-direction: column;
    }
</style>
