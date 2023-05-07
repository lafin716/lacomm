<script setup lang="ts">
import { RouterView } from "vue-router";
const meta = useSeoMeta({
  title: "LACOMM",
  description: "커뮤니티 사이트",
});
</script>
<template>
  <v-app>
    <RouterView />
  </v-app>
</template>
