<script lang="ts" setup>
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/vue'
import { useConfirmDialog } from '@vueuse/core'
import { add, closeOutline } from 'ionicons/icons'
import useTranslator from '../composables/use-word-list'

const { appendWord, error, isWordInWordList } = useTranslator()

const newWord = ref('')

const { isRevealed, cancel: close, reveal } = useConfirmDialog()

const isInputTouched = ref(false)

const isNewWordValid = computed(() => newWord.value.length > 0)
const isWordAlreadyExists = computed(() => newWord.value && isRevealed.value && isWordInWordList(newWord.value))
const isWordAlreadyExistsText = computed(() => {
  return isWordAlreadyExists.value ? 'This word already in wordbook!' : undefined
})

async function showModal() {
  await reveal()
  newWord.value = ''
  isInputTouched.value = false
}

async function saveNewWord() {
  if (!isNewWordValid.value) {
    return
  }

  await appendWord(newWord.value)
  error.value || close()
}
</script>

<template>
  <IonFab slot="fixed" vertical="bottom" horizontal="end">
    <IonFabButton id="add-word-fab-button">
      <IonIcon :icon="add" @click="reveal" />
    </IonFabButton>

    <IonModal :is-open="isRevealed" @did-dismiss="close()">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add a new word</IonTitle>

          <IonButtons slot="end">
            <IonButton @click="close()">
              <IonIcon slot="icon-only" :icon="closeOutline" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent :scroll-y="false" class="ion-padding">
        <IonInput
          v-model.trim="newWord"
          :class="{
            'ion-touched': isInputTouched,
            'ion-valid': isNewWordValid,
            'ion-invalid': !isNewWordValid,
          }"
          label="Enter text"
          fill="outline"
          label-placement="floating"
          :helper-text="isWordAlreadyExistsText"
          clear-input
          @ion-focus="isInputTouched = false"
          @ion-blur="isInputTouched = true"
        />
      </IonContent>

      <IonFooter class="ion-no-border ion-padding">
        <IonButtons>
          <IonButton
            expand="block"
            :color="isWordAlreadyExists ? 'warning' : 'primary'"
            @click="saveNewWord()"
          >
            {{ isWordAlreadyExists ? 'Save duplicate' : 'Save' }}
          </IonButton>
        </IonButtons>
      </IonFooter>
    </IonModal>
  </IonFab>
</template>

<style scoped>
    .modal-footer {
        position: absolute;
        bottom: 0;
    }
</style>
