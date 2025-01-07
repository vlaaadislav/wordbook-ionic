<script lang="ts" setup>
import useWordbookSettings from '@/composables/useWordbookSettings'
import {
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
} from '@ionic/vue'
import { onClickOutside } from '@vueuse/core'
import { add, chevronUpCircle, eye, eyeOff } from 'ionicons/icons'
import AddWordModal from './AddWordModal.vue'

const { isTranslationVisible } = useWordbookSettings()
const activated = ref(false)

const fabRef = useTemplateRef('words-list-operations')
onClickOutside(fabRef, () => {
  activated.value = false
})
</script>

<template>
  <IonFab
    ref="words-list-operations"
    slot="fixed"
    class="words-list-operations"
    :activated="activated"
    vertical="bottom"
    horizontal="end"
    @click="activated = !activated"
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
