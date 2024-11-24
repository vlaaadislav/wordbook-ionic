<script lang="ts" setup>
import useWordbookSettings from '@/composables/useWordbookSettings'
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/vue'
import { syncRef } from '@vueuse/core'

const { darkMode, perPage } = useWordbookSettings()

const perPageModel = ref(perPage.value)
syncRef(perPage, perPageModel, { direction: 'ltr' })

function updatePerPage() {
  if (Math.round(perPageModel.value)) {
    perPage.value = Math.round(perPageModel.value)
  } else {
    perPageModel.value = perPage.value
  }
}
</script>

<template>
  <IonPage>
    <IonHeader class="ion-no-border">
      <IonToolbar class="ion-padding-vertical">
        <IonButtons slot="start">
          <IonBackButton default-href="/" />
        </IonButtons>

        <IonTitle>Settings</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent>
      <IonListHeader>
        Appearance
      </IonListHeader>
      <IonList inset>
        <IonItem>
          <IonToggle v-model="darkMode">
            Dark mode
          </IonToggle>
        </IonItem>
      </IonList>

      <IonListHeader>
        Other
      </IonListHeader>

      <IonList inset>
        <IonItem>
          <IonInput
            v-model="perPageModel"
            label="Items per page"
            type="number"
            inputmode="decimal"
            placeholder="15"
            :min="0"
            label-placement="floating"
            required
            step="1"
            @ion-blur="updatePerPage()"
          />
        </IonItem>
      </IonList>
    </IonContent>
  </IonPage>
</template>

<style>
  ion-item {
    --transition: none;
  }
</style>
