<template>
    <IonItemSliding>
        <IonItem :id="item.id" button>
            <IonLabel class="ion-text-start">{{ item.source }}</IonLabel>
            <IonLabel class="ion-text-end">{{ item.translation }}</IonLabel>
        </IonItem>

        <IonPopover v-if="item.options.length > 0" :trigger="item.id" alignment="end" dismiss-on-select>
            <IonContent>
                <IonList>
                    <IonItem
                        v-for="option of item.options"
                        :key="option"
                        button
                        @click="emit('option-select', item.id, option)"
                    >
                        {{ option }}
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPopover>

        <IonItemOptions @ionSwipe="emit('delete', item.id)">
            <IonItemOption color="danger" @click="emit('delete', item.id)">Delete</IonItemOption>
        </IonItemOptions>
    </IonItemSliding>
</template>

<script lang="ts" setup>
    import {
        IonItem,
        IonItemOptions,
        IonItemOption,
        IonItemSliding,
        IonLabel,
        IonPopover,
        IonContent,
        IonList
    } from '@ionic/vue'

    interface Props {
        item: {
            id: number
            source: string
            translation: string
            options: string[]
        }
    }

    defineProps<Props>()

    const emit = defineEmits<{
        (e: 'delete', id: Props['item']['id']): void
        (e: 'option-select', id: Props['item']['id'], option: Props['item']['options'][number]): void
    }>()
</script>
