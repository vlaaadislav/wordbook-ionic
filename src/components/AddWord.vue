<template>
    <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton>
            <IonIcon :icon="add" @click="openModal" />
        </IonFabButton>

        <IonModal :is-open="isModalOpen" @didDismiss="isModalOpen = false">
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
                    :class="{
                        'ion-touched': isInputTouched,
                        'ion-valid': isNewWordValid,
                        'ion-invalid': !isNewWordValid
                    }"
                    label="Enter text"
                    fill="outline"
                    label-placement="floating"
                    :helper-text="isWordAlreadyExistsText"
                    clear-input
                    @ionFocus="isInputTouched = false"
                    @ionBlur="isInputTouched = true"
                />
            </IonContent>

            <IonFooter class="modal-footer ion-no-border ion-padding">
                <IonButton
                    expand="block"
                    :disabled="!isNewWordValid || isLoading"
                    :color="isWordAlreadyExists ? 'warning' : 'primary'"
                    @click="saveNewWord"
                >
                    {{ isWordAlreadyExists ? 'Save duplicate' : 'Save' }}
                </IonButton>
            </IonFooter>
        </IonModal>
    </IonFab>
</template>

<script lang="ts" setup>
    import { ref, computed } from 'vue'
    import {
        IonButton,
        IonButtons,
        IonContent,
        IonFab,
        IonFabButton,
        IonFooter,
        IonHeader,
        IonIcon,
        IonInput,
        IonModal,
        IonTitle,
        IonToolbar
    } from '@ionic/vue'
    import { add } from 'ionicons/icons'
    import useTranslator from '../composables/use-word-list'

    const { appendWord, isLoading, error, isWordInWordList } = useTranslator()

    const newWord = ref('')
    const isModalOpen = ref(false)
    const isInputTouched = ref(false)

    const isNewWordValid = computed(() => newWord.value.trim().length > 0)
    const isWordAlreadyExists = computed(() => newWord.value && isModalOpen.value && isWordInWordList(newWord.value))
    const isWordAlreadyExistsText = computed(() => {
        return isWordAlreadyExists.value ? 'This word already in wordbook!' : undefined
    })


    const resetState = () => {
        newWord.value = ''
        isInputTouched.value = false
    }

    const openModal = () => {
        resetState()
        isModalOpen.value = true
    }
    const closeModal = () => isModalOpen.value = false

    const saveNewWord = async () => {
        await appendWord(newWord.value)
        error.value || closeModal()
    }
</script>

<style scoped>
    .modal-footer {
        position: absolute;
        bottom: 0;
    }
</style>
