<script setup lang="ts">
const supabase = useSupabaseClient();
const { data } = await useAsyncData("bbs", async () => {
  const { data } = await supabase.from("bbs").select("*");
  return data;
});
console.log("bbs data", data.value);

const itemsPerPage = ref(10);
const headers = [
  { title: "NO", align: "start", value: "id" },
  { title: "제목", align: "start", value: "title" },
  { title: "작성자", align: "start", value: "user_name" },
  { title: "등록일자", align: "start", value: "created_at" },
  { title: "수정일자", align: "start", value: "updated_at" },
];
const list = computed(() => {
  if (!data.value) return [];

  return data.value;
});
</script>
<template>
  <v-card class="w-100">
    <v-card-title>게시판</v-card-title>
    <v-card-text>
      <div class="btn-wrap">
        <v-btn color="primary" text to="/add"> 글쓰기 </v-btn>
      </div>
      <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="list"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.title }}</td>
          <td>{{ props.item.user_name }}</td>
          <td>{{ props.item.created_at }}</td>
          <td>{{ props.item.updated_at }}</td>
        </template>
      </v-data-table>
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
