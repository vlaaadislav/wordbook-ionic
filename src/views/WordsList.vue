<script lang="ts" setup>
import AddWord from '@/components/AddWord.vue'
import FooterPaginator from '@/components/FooterPaginator.vue'
import WordLine from '@/components/WordLine.vue'
import useWordList from '@/composables/use-word-list'
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonMenuButton,
  IonPage,
  IonProgressBar,
  IonTitle,
  IonToolbar,
} from '@ionic/vue'

const { isLoading, wordsList, deleteWord, changeTranslation } = useWordList()

const list = ref<typeof IonList | null>(null)

const perPage = 1
const currentPage = ref(1)
const currentPageWords = computed(() => wordsList.value.slice(currentPage.value - 1, currentPage.value - 1 + perPage))

function handleDelete(id: number) {
  list.value?.$el.closeSlidingItems()
  deleteWord(id)
}
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <template #start>
          <IonButtons>
            <IonMenuButton />
          </IonButtons>
        </template>

        <IonTitle>Words List</IonTitle>

        <IonProgressBar v-if="isLoading" type="indeterminate" />
      </IonToolbar>
    </IonHeader>

    <AddWord />

    <IonContent>
      <IonList ref="list">
        <WordLine
          v-for="word of currentPageWords"
          :key="word.id"
          :item="word"
          @option-select="changeTranslation"
          @delete="handleDelete(word.id)"
        />
      </IonList>
    </IonContent>

    <FooterPaginator v-model="currentPage" :total="wordsList.length" :per-page="perPage" />
  </IonPage>
</template>
