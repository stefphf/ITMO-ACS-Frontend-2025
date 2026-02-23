<template>
  <main class="container my-5" style="max-width: 500px">
    <div class="card">
      <div class="card-body">
        <h1 class="h3 mb-4 text-center">Вход</h1>

        <div v-if="errorMsg" class="alert alert-danger" role="alert">
          {{ errorMsg }}
        </div>

        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              v-model="email"
              id="email"
              type="email"
              class="form-control"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Пароль</label>
            <input
              v-model="password"
              id="password"
              type="password"
              class="form-control"
              required
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary w-100"
            :disabled="loading"
          >
            <span v-if="loading">Входим...</span>
            <span v-else>Войти</span>
          </button>
        </form>

        <p class="text-center mt-3 mb-0">
          Нет аккаунта?
          <RouterLink to="/register">Зарегистрироваться</RouterLink>
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useApi } from "../composables/useApi.js";
import { useAuth } from "../composables/useAuth.js";

const router = useRouter();
const { loading, getUsers } = useApi();
const { login } = useAuth();

const email = ref("");
const password = ref("");
const errorMsg = ref("");

async function handleLogin() {
  errorMsg.value = "";
  try {
    const users = await getUsers();
    const found = users.find(
      (u) => u.email === email.value && u.password === password.value,
    );
    if (found) {
      login(found);
      router.push("/profile");
    } else {
      errorMsg.value = "Неверный email или пароль";
    }
  } catch (e) {
    errorMsg.value = "Ошибка соединения с сервером";
  }
}
</script>
