<script lang="ts" setup>
import { IonButton, IonButtons, IonFooter } from '@ionic/vue'
import { Pagination } from 'reka-ui/namespaced'

interface Props {
  perPage?: number
  total?: number
}

withDefaults(defineProps<Props>(), { perPage: 10 })
const currentPage = defineModel<number>({ default: 1 })
</script>

<template>
  <IonFooter class="ion-padding ion-no-border">
    <Pagination.Root
      v-model:page="currentPage"
      :items-per-page="perPage"
      :total="total"
      :sibling-count="1"
    >
      <Pagination.List v-slot="{ items }">
        <Pagination.Prev />

        <template v-for="(page, index) of items">
          <Pagination.ListItem v-if="page.type === 'page'" :key="index" :value="page.value" />

          <Pagination.Ellipsis v-else :key="page.type" :index="index">
            &#8230;
          </Pagination.Ellipsis>
        </template>

        <Pagination.Next />
      </Pagination.List>
    </Pagination.Root>
  </IonFooter>
</template>
