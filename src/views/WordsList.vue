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

            <IonList ref="list">
                <WordLine
                    v-for="word of wordsList"
                    :key="word.id"
                    :item="word"
                    @option-select="changeTranslation"
                    @delete="handleDelete(word.id)"
                />
            </IonList>
        </IonContent>
    </IonPage>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'
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

    const { isLoading, wordsList, deleteWord, changeTranslation } = useWordList()

    const list = ref<typeof IonList | null>(null)

    const handleDelete = (id: number) => {
        list.value?.$el.closeSlidingItems()
        deleteWord(id)
    }
</script>
