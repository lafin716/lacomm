<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";

const authStore = useAuthStore();
</script>
<template>
  <div class="icon-wrap">
    <v-btn
      icon="mdi-google"
      color="red"
      @click="authStore.login('google')"
    ></v-btn>
    <v-btn
      icon="mdi-facebook"
      color="blue"
      @click="authStore.login('facebook')"
    ></v-btn>
    <v-btn icon="mdi-github" @click="authStore.login('github')"></v-btn>
  </div>
</template>
<style scoped>
.icon-wrap > button {
  margin: 0 5px;
}
</style>
