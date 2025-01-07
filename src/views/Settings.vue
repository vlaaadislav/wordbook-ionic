<script lang="ts" setup>
import useWordbookSettings, { type UserSettings } from '@/composables/useWordbookSettings'
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonListHeader,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/vue'
import { syncRef } from '@vueuse/core'
import { arrowUndoCircleOutline } from 'ionicons/icons'

const {
  darkMode,
  perPage,
  dictKey,
  translateKey,
  defaultValues,
  wordsHideMode,
} = useWordbookSettings()

const perPageModel = ref(perPage.value)
syncRef(perPage, perPageModel, { direction: 'ltr' })

const wordsHideModeOptions: Array<{ label: string, value: UserSettings['wordsHideMode'] }> = [
  { value: 'translation', label: 'Translation' },
  { value: 'source', label: 'Source' },
]

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
        Words hiding mode
      </IonListHeader>

      <IonList inset>
        <IonItem>
          <IonRadioGroup v-model="wordsHideMode" class="radio-group">
            <IonRadio
              v-for="option of wordsHideModeOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </IonRadio>
          </IonRadioGroup>
        </IonItem>
      </IonList>

      <IonListHeader>
        API
      </IonListHeader>
      <IonList inset>
        <IonItem>
          <IonInput
            v-model="dictKey"
            label="Yandex Dictionary API key"
            placeholder="Enter API key..."
            label-placement="floating"
            required
          >
            <IonButton
              v-show="dictKey !== defaultValues.dictKey"
              slot="end"
              fill="clear"
              @click="dictKey = defaultValues.dictKey"
            >
              <IonIcon slot="icon-only" :icon="arrowUndoCircleOutline" size="small" />
            </IonButton>
          </IonInput>
        </IonItem>
      </IonList>
      <IonList inset>
        <IonItem>
          <IonInput
            v-model="translateKey"
            label="Yandex Translate API key"
            placeholder="Enter API key..."
            label-placement="floating"
            required
          >
            <IonButton
              v-show="translateKey !== defaultValues.translateKey"
              slot="end"
              fill="clear"
              @click="translateKey = defaultValues.translateKey"
            >
              <IonIcon slot="icon-only" :icon="arrowUndoCircleOutline" size="small" />
            </IonButton>
          </IonInput>
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

<style scoped>
  ion-item {
    --transition: none;
  }

  ion-input :deep(.label-text-wrapper) {
    transition: none !important;
  }

  .radio-group {
    width: 100%;
  }
</style>
