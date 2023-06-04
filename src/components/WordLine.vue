<template>
    <IonItemSliding>
        <IonItem>
            <IonLabel class="ion-text-start">{{ source }}</IonLabel>
            <IonLabel class="ion-text-end">{{ translation }}</IonLabel>
        </IonItem>

        <IonItemOptions @ionSwipe="emit('delete', source)">
            <IonItemOption color="danger" @click="emit('delete', source)">Delete</IonItemOption>
        </IonItemOptions>
    </IonItemSliding>
</template>

<script lang="ts" setup>
    import { IonItem, IonItemOptions, IonItemOption, IonItemSliding, IonLabel } from '@ionic/vue'

    interface Props {
        source: string
        translation: string
        options: string[]
    }

    defineProps<Props>()

    const emit = defineEmits<{
        (e: 'delete', source: Props['source']): void
    }>()
</script>
