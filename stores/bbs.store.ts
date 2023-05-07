import { BoardSchema } from "~/types/BoardSchema";

export const useBbsStore = defineStore("bbs", {
  state: () => ({
    boards: ref<BoardSchema[]>([]),
    board: ref<BoardSchema>({ title: "", content: "" }),
    loading: ref(false),
    error: ref<object | null>(null),
    currentPage: ref<number>(1),
  }),

  getters: {
    getBoards: (state) => {
      return state.boards;
    },
    getBoard: (state) => {
      return state.board;
    },
  },

  actions: {
    async movePage(page: number) {
      this.currentPage = page <= 0 ? 1 : page;
      await this.fetchBoards();
    },

    async fetchBoards() {
      const supabase = useSupabaseClient();
      this.loading = true;
      try {
        const { data } = await supabase
          .from("bbs")
          .select("*")
          .range((this.currentPage - 1) * 10, this.currentPage * 10 - 1)
          .order("id", { ascending: false });
        this.boards = data ?? [];
      } catch (e) {
        this.error = e ?? new Error("Unknown error");
      } finally {
        this.loading = false;
      }
    },

    async fetchBoard(id: string | string[]) {
      const supabase = useSupabaseClient();
      this.loading = true;
      try {
        await this.clearBoard();
        if (Array.isArray(id)) {
          id = id[0];
        }

        const { data } = await supabase.from("bbs").select("*").eq("id", id);
        this.board = data?.[0] ?? this.board;
        return this.board;
      } catch (e) {
        this.error = e ?? new Error("Unknown error");
      } finally {
        this.loading = false;
      }
    },

    async createBoard(board: BoardSchema) {
      let result = false;
      const supabase = useSupabaseClient();
      const user = useSupabaseUser();
      this.loading = true;
      try {
        if (!this.isValid(board)) {
          return;
        }

        board.created_at = new Date();
        board.user_id = user.value?.id ?? "";
        board.user_name = user.value?.user_metadata.full_name ?? "";
        const { data } = await supabase.from("bbs").insert(board);

        this.clearBoard();
        result = true;
      } catch (e) {
        this.error = e ?? new Error("Unknown error");
        result = false;
      } finally {
        this.loading = false;
      }

      return result;
    },

    async updateBoard(board: BoardSchema) {
      let result = false;
      const supabase = useSupabaseClient();
      this.loading = true;
      try {
        if (!this.isValid(board)) {
          return;
        }

        if (!board.id) {
          alert("게시글을 찾을 수 없습니다.");
          return;
        }

        board.updated_at = new Date();
        const { data } = await supabase
          .from("bbs")
          .update(board)
          .eq("id", this.board.id);

        this.clearBoard();
        result = true;
      } catch (e) {
        this.error = e ?? new Error("Unknown error");
        result = false;
      } finally {
        this.loading = false;
      }

      return result;
    },

    async deleteBoard(id: string) {
      const supabase = useSupabaseClient();
      this.loading = true;
      try {
        const { data } = await supabase.from("bbs").delete().eq("id", id);
        return data?.[0] ?? null;
      } catch (e) {
        this.error = e ?? new Error("Unknown error");
      } finally {
        this.loading = false;
      }
    },

    clearBoard() {
      this.board = { title: "", content: "" };
    },

    isValid(board: BoardSchema) {
      if (!board.title) {
        alert("제목을 입력해주세요.");
        return false;
      }

      if (!board.content) {
        alert("내용을 입력해주세요.");
        return false;
      }

      return true;
    },
  },
});
