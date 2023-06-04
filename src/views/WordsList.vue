<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>

                <IonTitle>Words List</IonTitle>

                <IonProgressBar v-if="isLoading" type="indeterminate" />
            </IonToolbar>
        </IonHeader>

        <IonContent>
            <AddWord />

            <IonList>
                <WordLine
                    v-for="word of wordsList"
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
        IonTitle,
        IonProgressBar,
    } from '@ionic/vue'
    import WordLine from '@/components/WordLine.vue'
    import AddWord from '@/components/AddWord.vue'
    import useWordList from '@/composables/use-word-list'

    const { isLoading, wordsList } = useWordList()
</script>
