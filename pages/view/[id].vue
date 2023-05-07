<script setup lang="ts">
import { useBbsStore } from "~/stores/bbs.store";

// 주소 path 에서 id 값을 가져온다.
const route = useRoute();
const router = useRouter();
const id = route.params.id || "";

const store = useBbsStore();
const save = async () => {
  await store.updateBoard();
  if (store.error) {
    alert("저장에 실패했습니다.");
    return;
  }

  alert("저장되었습니다.");
  router.push("/");
};
</script>
<template>
  <v-card class="w-100">
    <v-card-title>게시글 수정</v-card-title>
    <v-card-text>
      <form>
        <input type="hidden" v-model="store.board.id" />
        <v-text-field
          v-model="store.board.title"
          label="제목"
          outlined
          dense
          required
        ></v-text-field>
        <v-textarea
          v-model="store.board.content"
          label="내용"
          outlined
          dense
          required
        ></v-textarea>
        <v-btn color="primary" text class="mr-2" @click="save"> 저장 </v-btn>
        <v-btn color="default" text to="/"> 목록 </v-btn>
      </form>
    </v-card-text>
  </v-card>
</template>
<style scoped></style>
