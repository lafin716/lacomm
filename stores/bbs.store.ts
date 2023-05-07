import { BoardSchema } from "~/types/BoardSchema";

export const useBbsStore = defineStore("bbs", () => {
  const boards = ref<BoardSchema[]>([]);
  const board = ref<BoardSchema>({ title: "", content: "" });
  const loading = ref(false);
  const error = ref<object | null>(null);
  const currentPage = ref<number>(1);

  const movePage = async (page: number) => {
    currentPage.value = page <= 0 ? 1 : page;
    await fetchBoards();
  };

  const fetchBoards = async () => {
    const supabase = useSupabaseClient();
    loading.value = true;
    try {
      const { data } = await supabase
        .from("bbs")
        .select("*")
        .range((currentPage.value - 1) * 10, currentPage.value * 10 - 1)
        .order("id", { ascending: false });
      boards.value = data ?? [];
    } catch (e) {
      error.value = e ?? new Error("Unknown error");
    } finally {
      loading.value = false;
    }
  };

  const fetchBoard = async (id: string | string[]) => {
    const supabase = useSupabaseClient();
    loading.value = true;
    try {
      if (Array.isArray(id)) {
        id = id[0];
      }

      const { data } = await supabase.from("bbs").select("*").eq("id", id);
      board.value = data?.[0] ?? board.value;
    } catch (e) {
      error.value = e ?? new Error("Unknown error");
    } finally {
      loading.value = false;
    }
  };

  const createBoard = async () => {
    const supabase = useSupabaseClient();
    const user = useSupabaseUser();
    loading.value = true;
    try {
      if (!isValid()) {
        return;
      }

      board.value.created_at = new Date();
      board.value.user_id = user.value?.id ?? "";
      board.value.user_name = user.value?.user_metadata.full_name ?? "";
      const { data } = await supabase.from("bbs").insert(board.value);
      return data?.[0] ?? null;
    } catch (e) {
      error.value = e ?? new Error("Unknown error");
    } finally {
      loading.value = false;
    }
  };

  const updateBoard = async () => {
    const supabase = useSupabaseClient();
    loading.value = true;
    try {
      if (!isValid()) {
        return;
      }

      if (!board.value.id) {
        alert("게시글을 찾을 수 없습니다.");
        return;
      }

      board.value.updated_at = new Date();
      const { data } = await supabase
        .from("bbs")
        .update(board.value)
        .eq("id", board.value.id);
      return data?.[0] ?? null;
    } catch (e) {
      error.value = e ?? new Error("Unknown error");
    } finally {
      loading.value = false;
    }
  };

  const deleteBoard = async (id: string) => {
    const supabase = useSupabaseClient();
    loading.value = true;
    try {
      const { data } = await supabase.from("bbs").delete().eq("id", id);
      return data?.[0] ?? null;
    } catch (e) {
      error.value = e ?? new Error("Unknown error");
    } finally {
      loading.value = false;
    }
  };

  const isValid = () => {
    if (!board.value.title) {
      alert("제목을 입력해주세요.");
      return false;
    }

    if (!board.value.content) {
      alert("내용을 입력해주세요.");
      return false;
    }

    return true;
  };

  return {
    boards,
    board,
    loading,
    error,
    currentPage,
    movePage,
    fetchBoards,
    fetchBoard,
    createBoard,
    updateBoard,
    deleteBoard,
  };
});
