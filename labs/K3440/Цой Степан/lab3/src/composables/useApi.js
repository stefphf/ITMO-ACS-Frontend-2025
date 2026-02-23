import axios from "axios";
import { ref } from "vue";

const api = axios.create({ baseURL: "http://localhost:3000" });

export function useApi() {
  const loading = ref(false);
  const error = ref(null);

  async function request(fn) {
    loading.value = true;
    error.value = null;
    try {
      return await fn();
    } catch (e) {
      error.value = "Ошибка загрузки. Запущен ли json-server?";
      throw e;
    } finally {
      loading.value = false;
    }
  }

  const getRecipes = (params = {}) =>
    request(() => api.get("/recipes", { params }).then((r) => r.data));
  const getRecipeById = (id) =>
    request(() => api.get(`/recipes/${id}`).then((r) => r.data));
  const getUsers = () => request(() => api.get("/users").then((r) => r.data));
  const createUser = (data) =>
    request(() => api.post("/users", data).then((r) => r.data));

  return { loading, error, getRecipes, getRecipeById, getUsers, createUser };
}
