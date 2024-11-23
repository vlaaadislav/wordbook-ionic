<script setup lang="ts">
import {
  IonApp,
  IonButtons,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from '@ionic/vue'
</script>

<template>
  <IonApp>
    <IonMenu content-id="main-content" type="overlay">
      <IonHeader>
        <IonToolbar>
          <template #start>
            <IonButtons>
              <IonMenuButton />
            </IonButtons>
          </template>

          <IonTitle>Wordbook</IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonMenu>

    <!-- <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button />
        </ion-buttons>

        <ion-title id="main-title" />
      </ion-toolbar>
    </ion-header> -->

    <IonRouterOutlet id="main-content" />
  </IonApp>
</template>
