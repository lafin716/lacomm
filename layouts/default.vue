<script setup lang="ts">
import MenuList from "~/components/layout/MenuList.vue";
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
      <v-container
        class="d-flex justify-center align-top"
        style="min-height: 500px"
      >
        <RouterView />
      </v-container>
      <v-footer class="px-4 py-2 bg-grey text-center w-100">
        Copyrights lafin {{ new Date().getFullYear() }}
      </v-footer>
    </v-main>
  </v-layout>
</template>
