<script setup lang="ts">
const client = useSupabaseAuthClient();
const router = useRouter();
const login = async (provider: "github" | "google" | "facebook") => {
  const { data, error } = await client.auth.signInWithOAuth({ provider });
  if (error) {
    console.error(error);
    return alert(error.message);
  }

  console.log(data);
  // return router.push("/");
};
</script>
<template>
  <div class="icon-wrap">
    <v-btn icon="mdi-google" color="red" @click="login('google')"></v-btn>
    <v-btn icon="mdi-facebook" color="blue" @click="login('facebook')"></v-btn>
    <v-btn icon="mdi-github" @click="login('github')"></v-btn>
  </div>
</template>
<style scoped>
.icon-wrap > button {
  margin: 0 5px;
}
</style>
