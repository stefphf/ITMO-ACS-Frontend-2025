<template>
  <NavBar />
  <!-- RouterView подставляет нужный компонент-страницу в зависимости от URL -->
  <RouterView />
</template>

<script setup>
import NavBar from './components/NavBar.vue'
</script>
