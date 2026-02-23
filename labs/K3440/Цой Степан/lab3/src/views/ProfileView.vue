<template>
  <main class="container my-4">
    <h1 class="mb-4">Личный кабинет</h1>

    <div class="row">
      <aside class="col-md-3" aria-label="Данные пользователя">
        <div class="card mb-3 text-center p-3">
          <h2 class="h5">{{ user.name }}</h2>
          <p class="text-muted small">{{ user.email }}</p>
          <button class="btn btn-outline-danger btn-sm" @click="handleLogout">
            Выйти
          </button>
        </div>
      </aside>

      <div class="col-md-9">
        <ul
          class="nav nav-tabs mb-3"
          role="tablist"
          aria-label="Разделы профиля"
        >
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              data-bs-toggle="tab"
              data-bs-target="#saved"
              role="tab"
              aria-selected="true"
            >
              Сохранённые рецепты
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#posts"
              role="tab"
              aria-selected="false"
            >
              Мои публикации
            </button>
          </li>
        </ul>

        <div class="tab-content">
          <div class="tab-pane fade show active" id="saved" role="tabpanel">
            <div class="row g-3">
              <div v-for="r in savedRecipes" :key="r.id" class="col-md-6">
                <div class="card">
                  <img :src="r.image" :alt="r.title" class="card-img-top" />
                  <div class="card-body">
                    <h3 class="h5 card-title">{{ r.title }}</h3>
                    <RouterLink
                      :to="`/recipe/${r.id}`"
                      class="btn btn-primary btn-sm"
                      >Открыть</RouterLink
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="tab-pane fade" id="posts" role="tabpanel">
            <p class="text-muted mt-3">Публикаций пока нет.</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth.js";
import { useApi } from "../composables/useApi.js";

const router = useRouter();
const { user, logout } = useAuth();
const { getRecipes } = useApi();

const savedRecipes = ref([]);

onMounted(async () => {
  try {
    const all = await getRecipes();
    savedRecipes.value = all.slice(0, 2);
  } catch (e) {}
});

function handleLogout() {
  logout();
  router.push("/");
}
</script>
