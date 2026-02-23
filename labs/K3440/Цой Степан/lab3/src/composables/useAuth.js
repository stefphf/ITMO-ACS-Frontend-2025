import { ref, computed } from "vue";

const user = ref(JSON.parse(localStorage.getItem("user") || "null"));

export function useAuth() {
  const isLoggedIn = computed(() => !!user.value);

  function login(userData) {
    user.value = userData;
    localStorage.setItem("user", JSON.stringify(userData));
  }

  function logout() {
    user.value = null;
    localStorage.removeItem("user");
  }

  return { user, isLoggedIn, login, logout };
}
