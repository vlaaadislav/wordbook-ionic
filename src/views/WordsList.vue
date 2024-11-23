<script lang="ts" setup>
import AddWord from '@/components/AddWord.vue'
import FooterPaginator from '@/components/FooterPaginator.vue'
import WordLine from '@/components/WordLine.vue'
import useWordList from '@/composables/use-word-list'
import {
  IonContent,
  IonFooter,
  IonHeader,
  IonList,
  IonPage,
  IonProgressBar,
  IonTitle,
  IonToolbar,
} from '@ionic/vue'
import { useOffsetPagination } from '@vueuse/core'

const { isLoading, wordsList, deleteWord, changeTranslation } = useWordList()

const list = ref<typeof IonList | null>(null)

const perPage = 15
const { currentPage, pageCount } = useOffsetPagination({
  total: () => wordsList.value.length,
  pageSize: perPage,
})

const currentPageWords = computed(() => {
  return wordsList.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage)
})

watch(wordsList, (val, oldVal) => {
  if (oldVal.length && val.length > oldVal.length) {
    currentPage.value = pageCount.value
  }
})

function handleDelete(id: string) {
  list.value?.$el.closeSlidingItems()
  deleteWord(id)
}
</script>

<template>
  <IonPage>
    <IonHeader id="header" class="ion-padding">
      <IonToolbar>
        <IonTitle size="large">
          Wordbook
        </IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonProgressBar v-if="isLoading" type="indeterminate" />

    <AddWord />

    <IonContent color="light">
      <IonList
        ref="list"
        class="ion-no-padding words-list"
        lines="none"
        inset
      >
        <WordLine
          v-for="word of currentPageWords"
          :key="word.id"
          :item="word"
          @option-select="changeTranslation"
          @delete="handleDelete(word.id)"
        />
      </IonList>
    </IonContent>

    <IonFooter id="footer" class="ion-padding">
      <FooterPaginator v-model="currentPage" :total="wordsList.length" :per-page="perPage" />
    </IonFooter>
  </IonPage>
</template>

<style scoped>
  .words-list {
    background: var(--ion-color-light);
  }
</style>
