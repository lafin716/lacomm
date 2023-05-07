<template>
  <v-list nav>
    <template v-for="menu in menus">
      <v-list-item
        :prepend-icon="menu.icon"
        :title="menu.title"
        :to="menu.path"
      ></v-list-item>
    </template>
  </v-list>
</template>

<script setup lang="ts">
import { menuData } from "~/components/layout/menuData";
const menus = ref(menuData);
</script>

<style scoped></style>
