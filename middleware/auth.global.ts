export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();
  console.log("user", user.value);

  if (to.path.startsWith("/auth") && user.value) {
    return navigateTo("/");
  }

  if (to.path.startsWith("/auth")) {
    return true;
  }

  if (!user.value) {
    return navigateTo("/auth/login");
  }
});
