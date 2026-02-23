<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark bg-dark"
    aria-label="Основная навигация"
  >
    <div class="container">
      <RouterLink class="navbar-brand" to="/">RecipeShare</RouterLink>

      <div class="ms-auto d-flex gap-2 align-items-center">
        <template v-if="isLoggedIn">
          <RouterLink to="/profile" class="btn btn-outline-light btn-sm">{{
            user.name
          }}</RouterLink>
          <button class="btn btn-outline-danger btn-sm" @click="handleLogout">
            Выйти
          </button>
        </template>

        <template v-else>
          <RouterLink to="/login" class="btn btn-outline-light btn-sm"
            >Вход</RouterLink
          >
          <RouterLink to="/register" class="btn btn-light btn-sm"
            >Регистрация</RouterLink
          >
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth.js";

const router = useRouter();
const { isLoggedIn, user, logout } = useAuth();

function handleLogout() {
  logout();
  router.push("/");
}
</script>
