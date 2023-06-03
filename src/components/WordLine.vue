<template>
    <IonItem>
        <IonLabel class="ion-text-start">{{ source }}</IonLabel>
        <IonLabel class="ion-text-end">{{ translation }}</IonLabel>
    </IonItem>
</template>

<script lang="ts" setup>
    import { defineProps } from 'vue'
    import { IonItem, IonLabel } from '@ionic/vue'

    interface Props {
        source: string
        translation: string
        options: string[]
    }

    defineProps<Props>()
</script>
