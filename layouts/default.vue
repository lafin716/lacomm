<script setup lang="ts">
import MenuList from "~/components/layout/MenuList.vue";
import Footer from "~/components/layout/Footer.vue";
import Header from "~/components/layout/Header.vue";
import { useDisplay } from "vuetify";

const mobile = useDisplay().mobile;
const drawer = ref(!mobile.value);

useSeoMeta({
  title: "LACOMM",
  description: "커뮤니티 사이트",
});
</script>
<template>
  <v-layout>
    <v-navigation-drawer v-model="drawer">
      <MenuList></MenuList>
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <Header></Header>
    </v-app-bar>
    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
    <Footer></Footer>
  </v-layout>
</template>
