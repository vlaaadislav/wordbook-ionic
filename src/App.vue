<template>
  <ion-app>
    <ion-menu content-id="main-content" type="overlay">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button />
          </ion-buttons>

          <ion-title>Wordbook</ion-title>
        </ion-toolbar>
      </ion-header>
    </ion-menu>

    <!-- <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button />
        </ion-buttons>

        <ion-title id="main-title" />
      </ion-toolbar>
    </ion-header> -->

    <ion-router-outlet id="main-content"></ion-router-outlet>
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp,
  IonHeader,
  IonMenu,
  IonRouterOutlet,
  IonButtons,
  IonToolbar,
  IonMenuButton,
  IonTitle,
} from '@ionic/vue'
</script>