<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>

                <IonTitle>Words List</IonTitle>
            </IonToolbar>
        </IonHeader>

        <IonContent>
            <AddWord />

            <IonList>
                <WordLine
                    v-for="word of savedWords"
                    :key="word.source"
                    :source="word.source"
                    :translation="word.translation"
                    :options="[]"
                />
            </IonList>
        </IonContent>
    </IonPage>
</template>

<script lang="ts" setup>
    import {
        IonHeader,
        IonPage,
        IonList,
        IonContent,
        IonToolbar,
        IonButtons,
        IonMenuButton,
        IonTitle
    } from '@ionic/vue'
    import WordLine from '../components/WordLine.vue'
    import AddWord from '../components/AddWord.vue'

    const savedWords: Array<{ source: string, translation: string }> = [
        { source: 'hello', translation: 'привет' },
        { source: 'buy', translation: 'купить' },
        { source: 'test', translation: 'тест' },
    ]
</script>
