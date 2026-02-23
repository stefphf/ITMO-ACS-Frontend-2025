<template>
  <main class="container my-5" style="max-width: 500px">
    <div class="card">
      <div class="card-body">
        <h1 class="h3 mb-4 text-center">Регистрация</h1>

        <div v-if="errorMsg" class="alert alert-danger" role="alert">{{ errorMsg }}</div>

        <form @submit.prevent="handleRegister">
          <div class="mb-3">
            <label for="name" class="form-label">Имя</label>
            <input v-model="name" id="name" type="text" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input v-model="email" id="email" type="email" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Пароль</label>
            <input v-model="password" id="password" type="password" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="password2" class="form-label">Повторите пароль</label>
            <input v-model="password2" id="password2" type="password" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-success w-100" :disabled="loading">
            <span v-if="loading">Создаём аккаунт...</span>
            <span v-else>Создать аккаунт</span>
          </button>
        </form>

        <p class="text-center mt-3 mb-0">
          Уже есть аккаунт? <RouterLink to="/login">Войти</RouterLink>
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '../composables/useApi.js'

const router = useRouter()
const { loading, createUser } = useApi()

const name      = ref('')
const email     = ref('')
const password  = ref('')
const password2 = ref('')
const errorMsg  = ref('')

async function handleRegister() {
  errorMsg.value = ''
  if (password.value !== password2.value) {
    errorMsg.value = 'Пароли не совпадают'
    return
  }
  try {
    await createUser({ name: name.value, email: email.value, password: password.value })
    router.push('/login')
  } catch (e) {
    errorMsg.value = 'Ошибка при регистрации'
  }
}
</script>
