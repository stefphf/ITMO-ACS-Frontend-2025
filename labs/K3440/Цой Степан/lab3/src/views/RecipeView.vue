<template>
  <main class="container my-4">
    <div v-if="loading" class="text-center py-4">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Загрузка...</span>
      </div>
    </div>

    <div v-else-if="error" class="alert alert-warning">{{ error }}</div>

    <template v-else-if="recipe">
      <nav aria-label="Навигационная цепочка" class="mb-3">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <RouterLink to="/">Главная</RouterLink>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ recipe.title }}
          </li>
        </ol>
      </nav>

      <div class="row">
        <div class="col-lg-8">
          <h1 class="mb-3">{{ recipe.title }}</h1>
          <img
            :src="recipe.image"
            :alt="recipe.title"
            class="img-fluid rounded mb-4"
          />

          <section aria-labelledby="ingr-heading">
            <h2 id="ingr-heading" class="h4">Ингредиенты</h2>
            <ul class="list-group mb-4">
              <li class="list-group-item">Паста — 200 г</li>
              <li class="list-group-item">Бекон — 150 г</li>
            </ul>
          </section>

          <section aria-labelledby="steps-heading">
            <h2 id="steps-heading" class="h4">Приготовление</h2>
            <ol class="list-group list-group-numbered mb-4">
              <li class="list-group-item">Отварите пасту</li>
              <li class="list-group-item">Обжарьте бекон</li>
            </ol>
          </section>

          <section aria-labelledby="video-heading">
            <h2 id="video-heading" class="h4">Видео</h2>
            <div class="ratio ratio-16x9 mb-4">
              <iframe
                src="https://www.youtube.com/embed/3AAdKl1UYZs"
                title="Видео приготовления"
                allowfullscreen
                loading="lazy"
              ></iframe>
            </div>
          </section>

          <button
            class="btn mb-4"
            :class="isLiked ? 'btn-danger' : 'btn-outline-danger'"
            :aria-pressed="isLiked"
            @click="isLiked = !isLiked"
          >
            ❤️ Нравится
          </button>

          <section aria-labelledby="comments-heading">
            <h2 id="comments-heading" class="h4">Комментарии</h2>

            <div v-for="(c, i) in comments" :key="i" class="card mb-3">
              <div class="card-body">
                <strong>{{ c.author }}</strong>
                <p class="mb-0">{{ c.text }}</p>
              </div>
            </div>

            <div class="card">
              <div class="card-body">
                <h3 class="h5">Оставить комментарий</h3>
                <label for="commentText" class="visually-hidden"
                  >Комментарий</label
                >
                <textarea
                  v-model="commentText"
                  id="commentText"
                  class="form-control mb-3"
                  rows="3"
                ></textarea>
                <button class="btn btn-primary" @click="addComment">
                  Отправить
                </button>
              </div>
            </div>
          </section>
        </div>

        <aside class="col-lg-4" aria-label="Информация о рецепте">
          <div class="card mb-3">
            <div class="card-body">
              <h2 class="h5">Автор</h2>
              <p>
                <strong>{{ recipe.author }}</strong>
              </p>
              <button
                class="btn btn-sm"
                :class="isSubscribed ? 'btn-primary' : 'btn-outline-primary'"
                :aria-pressed="isSubscribed"
                @click="isSubscribed = !isSubscribed"
              >
                {{ isSubscribed ? "Отписаться" : "Подписаться" }}
              </button>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <h2 class="h5">Информация</h2>
              <p class="mb-1">Тип: {{ recipe.type }}</p>
              <p class="mb-0">Сложность: {{ recipe.difficulty }}</p>
            </div>
          </div>
        </aside>
      </div>
    </template>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useApi } from "../composables/useApi.js";
import { useAuth } from "../composables/useAuth.js";

const route = useRoute();
const { loading, error, getRecipeById } = useApi();
const { user } = useAuth();

const recipe = ref(null);
const isLiked = ref(false);
const isSubscribed = ref(false);
const commentText = ref("");
const comments = ref([
  { author: "Анна", text: "Очень вкусно получилось!" },
  { author: "Игорь", text: "Добавил чеснок — стало ещё лучше." },
]);

onMounted(async () => {
  try {
    recipe.value = await getRecipeById(route.params.id);
  } catch (e) {}
});

function addComment() {
  const text = commentText.value.trim();
  if (!text) return;
  comments.value.push({ author: user.value?.name || "Гость", text });
  commentText.value = "";
}
</script>
