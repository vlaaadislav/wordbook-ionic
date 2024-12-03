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
  showTranslation?: boolean
}

interface Emits {
  (e: 'delete', id: Props['item']['id']): void
  (e: 'optionSelect', id: Props['item']['id'], option: Props['item']['options'][number]): void
}

withDefaults(defineProps<Props>(), {
  showTranslation: true,
})
defineEmits<Emits>()
</script>

<template>
  <IonItemSliding class="word-line">
    <IonItem :id="item.id" button>
      <IonLabel class="ion-text-start">
        {{ item.source }}
      </IonLabel>

      <IonLabel v-show="showTranslation" class="ion-text-end">
        {{ item.translation }}
      </IonLabel>
    </IonItem>

    <IonItemOptions side="end" @ion-swipe="$emit('delete', item.id)">
      <IonItemOption color="danger" expandable @click="$emit('delete', item.id)">
        Delete
      </IonItemOption>
    </IonItemOptions>

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
  </IonItemSliding>
</template>

<style scoped>
  .word-line + .word-line {
    margin-top: calc(var(--ion-margin, 16px) / 2);
  }
</style>
