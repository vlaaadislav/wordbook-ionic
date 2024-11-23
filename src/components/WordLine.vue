<script lang="ts" setup>
import type { TranslatorResponse } from '@/services/translator'
import {
  IonContent,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPopover,
} from '@ionic/vue'

interface Props {
  item: TranslatorResponse
}

interface Emits {
  (e: 'delete', id: Props['item']['id']): void
  (e: 'optionSelect', id: Props['item']['id'], option: Props['item']['options'][number]): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <IonItemSliding>
    <IonItem :id="item.id" button>
      <IonLabel class="ion-text-start">
        {{ item.source }}
      </IonLabel>
      <IonLabel class="ion-text-end">
        {{ item.translation }}
      </IonLabel>
    </IonItem>

    <IonPopover
      v-if="item.options.length > 0"
      :trigger="item.id"
      alignment="end"
      dismiss-on-select
    >
      <IonContent>
        <IonList>
          <IonItem
            v-for="option of item.options"
            :key="option"
            button
            @click="$emit('optionSelect', item.id, option)"
          >
            {{ option }}
          </IonItem>
        </IonList>
      </IonContent>
    </IonPopover>

    <IonItemOptions @ion-swipe="$emit('delete', item.id)">
      <IonItemOption color="danger" @click="$emit('delete', item.id)">
        Delete
      </IonItemOption>
    </IonItemOptions>
  </IonItemSliding>
</template>
