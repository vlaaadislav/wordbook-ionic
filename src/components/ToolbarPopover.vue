<script lang="ts" setup>
import { IonContent, IonItem, IonList, IonPopover } from '@ionic/vue'

interface Porps {
  trigger: string
}

defineProps<Porps>()
</script>

<template>
  <IonPopover
    :trigger="trigger"
    trigger-action="click"
    :show-backdrop="false"
    dismiss-on-select
  >
    <IonContent>
      <IonList>
        <IonItem router-link="/settings" button>
          Settings
        </IonItem>
      </IonList>
    </IonContent>
  </IonPopover>
</template>
