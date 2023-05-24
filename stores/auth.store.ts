export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: ref(""),
    refreshToken: ref(""),
    user: ref<any>(null),
    error: ref<any>(null),
  }),

  getters: {
    getUser: (state) => {
      return state.user;
    },
    getAccessToken: (state) => {
      return state.accessToken;
    },
    getRefreshToken: (state) => {
      return state.refreshToken;
    },
    getError: (state) => {
      return state.error;
    },
  },

  actions: {
    async nuxtServerInit() {
      console.log("nuxtServerInit");
    },
    async checkLogin() {
      const user = useSupabaseUser();
      const router = useRouter();
      if (!user.value) {
        return router.push({ path: "/auth/login" });
      }

      this.user = user.value;
      router.push({ path: "/" });
    },
    async login(provider: "github" | "google" | "facebook") {
      const client = useSupabaseAuthClient();
      const router = useRouter();
      const { data, error } = await client.auth.signInWithOAuth({ provider });
      if (error) {
        console.error(error);
        this.error = error;
        return alert(error.message);
      }

      console.log(data);
      const user = useSupabaseUser();
      this.accessToken = user.value?.user_metadata?.accessToken;
      this.refreshToken = user.value?.user_metadata?.refreshToken;
      router.push({ path: "/" });
    },

    async logout() {
      const client = useSupabaseAuthClient();
      const router = useRouter();
      const { error } = await client.auth.signOut();
      if (error) {
        console.error(error);
        return alert(error.message);
      }

      router.push({ path: "/auth/login" });
    },
  },
});
