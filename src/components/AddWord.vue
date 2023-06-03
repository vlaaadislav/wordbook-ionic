<template>
    <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton>
            <IonIcon :icon="add" @click="openModal" />
        </IonFabButton>

        <IonModal :is-open="isModalOpen">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Add a new word</IonTitle>

                    <IonButtons slot="end">
                        <IonButton @click="closeModal">Close</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent :scroll-y="false" class="ion-padding">
                <IonInput
                    v-model="newWord"
                    label="Enter text"
                    fill="outline"
                    label-placement="floating"
                    clear-input
                />
            </IonContent>

            <IonFooter class="modal-footer ion-no-border ion-padding">
                <IonButton expand="block">Save</IonButton>
            </IonFooter>
        </IonModal>
    </IonFab>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'
    import { IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonModal, IonTitle, IonToolbar } from '@ionic/vue'
    import { add } from 'ionicons/icons'

    const isModalOpen = ref(false)
    const newWord = ref('')

    const openModal = () => isModalOpen.value = true
    const closeModal = () => isModalOpen.value = false
</script>

<style scoped>
    .modal-footer {
        position: absolute;
        bottom: 0;
    }
</style>
