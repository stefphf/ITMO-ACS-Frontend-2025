<template>
  <div class="card h-100">
    <img :src="recipe.image" :alt="recipe.title" class="card-img-top" />
    <div class="card-body">
      <h2 class="card-title h5">{{ recipe.title }}</h2>
      <p class="card-text">{{ recipe.description }}</p>
      <RouterLink :to="`/recipe/${recipe.id}`" class="btn btn-primary"
        >Открыть</RouterLink
      >
    </div>
  </div>
</template>

<script setup>
defineProps({
  recipe: { type: Object, required: true },
});
</script>
