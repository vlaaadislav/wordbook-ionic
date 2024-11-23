<script lang="ts" setup>
import useWordbookSettings from '@/composables/useWordbookSettings'
import {
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
} from '@ionic/vue'
import { add, chevronUpCircle, eye, eyeOff } from 'ionicons/icons'
import AddWordModal from './AddWordModal.vue'

const { isTranslationVisible } = useWordbookSettings()
</script>

<template>
  <IonFab
    slot="fixed"
    class="words-list-operations"
    vertical="bottom"
    horizontal="end"
  >
    <IonFabButton>
      <IonIcon :icon="chevronUpCircle" />
    </IonFabButton>

    <IonFabList side="top">
      <IonFabButton id="add-word-fab-button">
        <IonIcon :icon="add" />
      </IonFabButton>

      <IonFabButton @click="isTranslationVisible = !isTranslationVisible">
        <IonIcon :icon="isTranslationVisible ? eye : eyeOff" />
      </IonFabButton>
    </IonFabList>

    <AddWordModal trigger="add-word-fab-button" />
  </IonFab>
</template>

<style scoped>
  .words-list-operations {
    margin-bottom: calc(var(--ion-padding, 16px) - 10px);
  }
</style>
