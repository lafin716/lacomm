<script setup lang="ts">
const form = reactive({
  title: "",
  content: "",
});

const router = useRouter();
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const save = async () => {
  if (!form.title) {
    alert("제목을 입력해주세요.");
    return;
  }
  if (!form.content) {
    alert("내용을 입력해주세요.");
    return;
  }

  const { data, error } = await supabase.from("bbs").insert({
    title: form.title,
    content: form.content,
    user_id: user.value?.id,
    user_name: user.value?.user_metadata.full_name,
  });
  if (error) {
    alert("저장에 실패했습니다.");
    return;
  }

  alert("저장되었습니다.");
  router.push("/");
};
</script>
<template>
  <v-card class="w-100">
    <v-card-title>게시판 글쓰기</v-card-title>
    <v-card-text>
      <form>
        <v-text-field
          v-model="form.title"
          label="제목"
          outlined
          dense
          required
        ></v-text-field>
        <v-textarea
          v-model="form.content"
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
