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
import { add } from 'ionicons/icons'
import { computed, ref } from 'vue'
import useTranslator from '../composables/use-word-list'

const { appendWord, isLoading, error, isWordInWordList } = useTranslator()

const newWord = ref('')
const isModalOpen = ref(false)
const isInputTouched = ref(false)

const isNewWordValid = computed(() => newWord.value.trim().length > 0)
const isWordAlreadyExists = computed(() => newWord.value && isModalOpen.value && isWordInWordList(newWord.value))
const isWordAlreadyExistsText = computed(() => {
  return isWordAlreadyExists.value ? 'This word already in wordbook!' : undefined
})

function resetState() {
  newWord.value = ''
  isInputTouched.value = false
}

function openModal() {
  resetState()
  isModalOpen.value = true
}
const closeModal = () => isModalOpen.value = false

async function saveNewWord() {
  await appendWord(newWord.value)
  error.value || closeModal()
}
</script>

<template>
  <IonFab slot="fixed" vertical="bottom" horizontal="end">
    <IonFabButton>
      <IonIcon :icon="add" @click="openModal" />
    </IonFabButton>

    <IonModal :is-open="isModalOpen" @did-dismiss="isModalOpen = false">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add a new word</IonTitle>

          <template #end>
            <IonButtons>
              <IonButton @click="closeModal">
                Close
              </IonButton>
            </IonButtons>
          </template>
        </IonToolbar>
      </IonHeader>

      <IonContent :scroll-y="false" class="ion-padding">
        <IonInput
          v-model="newWord"
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

      <IonFooter class="modal-footer ion-no-border ion-padding">
        <IonButton
          expand="block"
          :disabled="!isNewWordValid || isLoading"
          :color="isWordAlreadyExists ? 'warning' : 'primary'"
          @click="saveNewWord"
        >
          {{ isWordAlreadyExists ? 'Save duplicate' : 'Save' }}
        </IonButton>
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
