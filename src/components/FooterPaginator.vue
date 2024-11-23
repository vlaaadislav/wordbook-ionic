<script lang="ts" setup>
import { IonButton, IonButtons, IonFooter, IonIcon, IonToolbar } from '@ionic/vue'
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons'
import { Pagination } from 'reka-ui/namespaced'

interface Props {
  perPage: number
  total: number
}

defineProps<Props>()
const currentPage = defineModel<number>({ required: true })
</script>

<template>
  <Pagination.Root
    v-model:page="currentPage"
    :items-per-page="perPage"
    :total="total"
    :sibling-count="1"
    show-edges
    as-child
  >
    <IonToolbar>
      <Pagination.List v-slot="{ items }" :as="IonButtons">
        <Pagination.Prev as-child>
          <IonButton>
            <IonIcon slot="icon-only" :icon="chevronBackOutline" size="small" />
          </IonButton>
        </Pagination.Prev>

        <template v-for="(page, index) of items">
          <Pagination.ListItem
            v-if="page.type === 'page'"
            :key="index"
            :value="page.value"
            as-child
          >
            <IonButton :fill="page.value === currentPage ? 'solid' : undefined" size="large">
              {{ page.value }}
            </IonButton>
          </Pagination.ListItem>

          <Pagination.Ellipsis
            v-else
            :key="page.type"
            :index="index"
            as-child
          >
            <IonButton>
              &#8230;
            </IonButton>
          </Pagination.Ellipsis>
        </template>

        <Pagination.Next as-child>
          <IonButton>
            <IonIcon slot="icon-only" :icon="chevronForwardOutline" />
          </IonButton>
        </Pagination.Next>
      </Pagination.List>
    </IonToolbar>
  </Pagination.Root>
</template>

<style scoped>
  ion-button {
    width: 30px;
  }
</style>
