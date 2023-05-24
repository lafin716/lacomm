<script setup lang="ts">
import TextLogo from "~/components/image/TextLogo.vue";

definePageMeta({
  layout: "blank",
});
</script>
<template>
  <div class="container">
    <v-container fluid class="pa-3">
      <v-row class="h-100vh d-flex justify-center align-center">
        <v-col cols="12" lg="4" xl="3" class="d-flex align-center">
          <v-card
            rounded="md"
            elevation="10"
            class="px-sm-1 px-0 withbg mx-auto"
            max-width="500"
          >
            <v-card-item class="pa-sm-8">
              <div class="d-flex justify-center py-4">
                <TextLogo />
              </div>
              <div class="text-body-1 text-muted text-center mb-3">
                커뮤니티 사이트
              </div>
              <AuthLoginForm />
              <span
                class="text-muted font-weight-medium d-flex justify-center align-center mt-3"
              >
                아직 회원이 아니신가요?
                <NuxtLink
                  to="/auth/register"
                  class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium pl-2"
                >
                  계정 만들기</NuxtLink
                >
              </span>
              <div class="sso-area text-center my-3">
                <div class="d-flex justify-center mt-3">
                  <AuthSSO />
                </div>
              </div>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.sso-area {
  border-top: 1px solid #e0e0e0;
}
</style>
