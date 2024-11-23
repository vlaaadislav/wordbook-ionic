<script lang="ts" setup>
import {
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/vue'
import { add } from 'ionicons/icons'
import AddWordModal from './AddWordModal.vue'
</script>

<template>
  <IonFab slot="fixed" vertical="bottom" horizontal="end">
    <IonFabButton id="add-word-fab-button" class="ion-margin-bottom" size="small">
      <IonIcon :icon="add" />
    </IonFabButton>

    <AddWordModal trigger="add-word-fab-button" />
  </IonFab>
</template>

<style scoped>
  .add-word-container {
    height: 25%;
    display: flex;
    flex-direction: column;
  }
</style>
