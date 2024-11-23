<script lang="ts" setup>
import { IonButton, IonButtons, IonFooter } from '@ionic/vue'

interface Props {
  modelValue: number
  perPage?: number
}

withDefaults(defineProps<Props>(), {
  perPage: 1,
})

const emit = defineEmits<{
  (e: 'update:model-value', page: number): void
}>()
</script>

<template>
  <IonFooter class="ion-padding ion-no-border">
    <IonButtons class="ion-justify-content-center">
      <IonButton @click="emit('update:model-value', modelValue + 1)">
        Prev
      </IonButton>
      <IonButton>{{ modelValue }}</IonButton>
      <IonButton @click="emit('update:model-value', modelValue + 1)">
        Next
      </IonButton>
    </IonButtons>
  </IonFooter>
</template>
