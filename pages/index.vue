<script setup lang="ts">
import { BoardSchema } from "@/types/BoardSchema";
import { useBbsStore } from "~/stores/bbs.store";

const headers = [
  { title: "NO", align: "start", value: "id" },
  { title: "제목", align: "start", value: "title" },
  { title: "작성자", align: "start", value: "user_name" },
  { title: "등록일자", align: "start", value: "created_at" },
  { title: "수정일자", align: "start", value: "updated_at" },
];

const store = useBbsStore();
const router = useRouter();
store.fetchBoards();
const list: BoardSchema[] | any = computed(() => {
  if (!store.boards) {
    return [];
  }

  return store.boards;
});

const goView = async (id: string) => {
  await store.fetchBoard(id);
  router.push(`/view/${id}`);
};

const remove = async (id: string) => {
  if (!confirm("삭제하시겠습니까?")) {
    return;
  }

  await store.deleteBoard(id);
  if (store.error) {
    alert("삭제에 실패했습니다.");
    return;
  }

  alert("삭제되었습니다.");
  await store.fetchBoards();
};
</script>
<template>
  <v-card class="w-100">
    <v-card-title>게시판</v-card-title>
    <v-card-text>
      <div class="btn-wrap">
        <v-btn color="primary" text to="/add"> 글쓰기 </v-btn>
      </div>
      <v-table>
        <thead>
          <tr>
            <th v-for="header in headers" :key="header.value">
              {{ header.title }}
            </th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.id">
            <td>{{ item.id }}</td>
            <td>
              <a @click="goView(item.id)">{{ item.title }}</a>
            </td>
            <td>{{ item.user_name }}</td>
            <td>{{ item.created_at }}</td>
            <td>{{ item.updated_at }}</td>
            <td>
              <v-btn
                icon="mdi-pencil"
                color="success"
                text
                @click="goView(item.id)"
                size="small"
                class="text-white mr-2"
              >
              </v-btn>
              <v-btn
                icon="mdi-trash-can"
                color="error"
                text
                @click="remove(item.id)"
                size="small"
                class="text-white"
              >
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>
<style scoped>
.btn-wrap {
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
}
</style>
