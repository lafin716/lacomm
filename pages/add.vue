<script setup lang="ts">
import { useBbsStore } from "~/stores/bbs.store";
import { BoardSchema } from "~/types/BoardSchema";

const router = useRouter();
const store = useBbsStore();
const board = ref<BoardSchema>({
  title: "",
  content: "",
});
const save = async () => {
  const result = await store.createBoard(board.value);
  if (!result) {
    alert("저장에 실패했습니다.");
    return;
  }

  router.push("/");
};
</script>
<template>
  <v-card class="w-100">
    <v-card-title>게시판 글쓰기</v-card-title>
    <v-card-text>
      <form>
        <v-text-field
          v-model="board.title"
          label="제목"
          outlined
          dense
          required
        ></v-text-field>
        <v-textarea
          v-model="board.content"
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
