<script setup lang="ts">
const user = useSupabaseUser();
const avatar = computed(() => {
  if (!user.value) return {};

  const metadata = user.value.user_metadata;
  return {
    fullName: metadata.full_name,
    email: metadata.email,
    initials: Array.from(metadata.full_name)[0],
    avatarUrl: metadata.avatar_url,
  };
});

const router = useRouter();
const client = useSupabaseAuthClient();
const logout = async () => {
  const { error } = await client.auth.signOut();
  if (error) {
    console.error(error);
    return alert(error.message);
  }

  return router.push("/");
};
</script>
<template>
  <v-menu min-width="200px" rounded>
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props">
        <v-avatar color="brown" size="small">
          <v-img :src="avatar.avatarUrl" alt="avatar" v-if="avatar.avatarUrl" />
          <span v-else>{{ avatar.initials }}</span>
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <div class="mx-auto text-center">
          <v-avatar color="brown">
            <v-img
              :src="avatar.avatarUrl"
              alt="avatar"
              v-if="avatar.avatarUrl"
            />
            <span class="text-h6" v-else>{{ avatar.initials }}</span>
          </v-avatar>
          <h3 class="my-2">{{ avatar.fullName }}</h3>
          <p class="text-caption">
            {{ avatar.email }}
          </p>
          <v-divider class="my-3"></v-divider>
          <v-btn variant="text"> 계정설정 </v-btn>
          <v-divider class="my-3"></v-divider>
          <v-btn variant="text" @click="logout"> 로그아웃 </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>
<style scoped></style>
