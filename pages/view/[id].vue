<template>
  <v-card class="w-100">
    <v-card-title>게시글 수정</v-card-title>
    <v-card-text>
      <form>
        <input type="hidden" v-model="board.id" />
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
<script lang="ts">
import { useRoute } from "vue-router";
import { useBbsStore } from "~/stores/bbs.store";
import { BoardSchema } from "~/types/BoardSchema";

export default {
  name: "View",
  async asyncData() {
    const store = useBbsStore();
    const route = useRoute();
    const id = route.params.id || "";
    await store.fetchBoard(id);
    this.board = store.board;
  },
  async mounted() {
    const store = useBbsStore();
    const route = useRoute();
    const id = route.params.id || "";
    await store.fetchBoard(id);
    this.board = store.board;
  },
  data() {
    return {
      board: <BoardSchema>{},
    };
  },
  methods: {
    async save() {
      const store = useBbsStore();
      const result = await store.updateBoard(this.board);
      if (!result) {
        alert("저장에 실패했습니다.");
        return;
      }

      const router = useRouter();
      router.push("/");
    },
  },
};
</script>
<style scoped></style>
