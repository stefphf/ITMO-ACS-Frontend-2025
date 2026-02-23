<template>
  <main class="container my-4">
    <h1 class="mb-4">Рецепты</h1>

    <div class="row mb-3">
      <div class="col-md-8">
        <input
          v-model="search"
          class="form-control"
          placeholder="Поиск рецептов..."
          @input="load"
        />
      </div>
      <div class="col-md-4">
        <select v-model="filterType" class="form-select" @change="load">
          <option value="">Все типы</option>
          <option value="main">Основное</option>
          <option value="soup">Суп</option>
          <option value="dessert">Десерт</option>
        </select>
      </div>
    </div>

    <div v-if="loading" class="text-center py-4">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Загрузка...</span>
      </div>
    </div>

    <div v-else-if="error" class="alert alert-warning">{{ error }}</div>

    <div v-else class="row g-4">
      <div v-for="recipe in recipes" :key="recipe.id" class="col-md-4">
        <RecipeCard :recipe="recipe" />
      </div>
      <div v-if="!recipes.length" class="col-12">
        <p class="text-muted">Рецепты не найдены.</p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useApi } from "../composables/useApi.js";
import RecipeCard from "../components/RecipeCard.vue";

const { loading, error, getRecipes } = useApi();

const recipes = ref([]);
const search = ref("");
const filterType = ref("");

async function load() {
  try {
    const params = {};

    if (search.value) params.title = search.value;
    if (filterType.value) params.type = filterType.value;

    recipes.value = await getRecipes(params);
  } catch (e) {}
}

onMounted(load);
</script>
