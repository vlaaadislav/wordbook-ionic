<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button />
                </ion-buttons>

                <ion-title>Words List</ion-title>
            </ion-toolbar>
        </ion-header>

        <IonFab>
            <IonFabButton @click="translate('words')">
                <ion-icon :icon="add"></ion-icon>
            </IonFabButton>
        </IonFab>

        <IonContent>
            <IonList>
                <IonItem v-for="word of savedWords">
                    <IonLabel class="ion-text-start">{{ word.source }}</IonLabel>
                    <IonLabel class="ion-text-end">{{ word.translation }}</IonLabel>
                </IonItem>
            </IonList>
        </IonContent>
    </ion-page>
</template>

<script lang="ts" setup>
    import { 
        IonHeader, 
        IonPage, 
        IonFab, 
        IonFabButton, 
        IonIcon, 
        IonList, 
        IonItem,
        IonLabel, 
        IonGrid,
        IonRow,
        IonCol, 
        IonContent,
        IonToolbar,
        IonButtons, 
        IonMenuButton, 
        IonTitle
    } from '@ionic/vue'

    import { add } from 'ionicons/icons'

    import useTranslator from '../composables/use-translator'

    const savedWords: Array<{ source: string, translation: string }> = [
        { source: 'hello', translation: 'привет' },
        { source: 'buy', translation: 'купить' },
        { source: 'test', translation: 'тест' },
    ]

    const { translate } = useTranslator()
</script>