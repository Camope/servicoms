<script setup>
import ListadoComisiones from './components/ListadoComisiones.vue'
</script>

<template>
  <div class="d-flex justify-content-center">
    <div>
      <div>
        <h1>Menú</h1>
        <router-link :to="{ name: 'home' }" :class="$route.name == 'home' ? 'badge bg-success' : ''" class="me-2">Go to Home</router-link>
        <router-link :to="{ name: 'about' }" :class="$route.name == 'about' ? 'badge bg-success' : ''" class="me-2">Go to About</router-link>
        <router-link :to="{ name: 'comisiones' }" :class="$route.name == 'comisiones' ? 'badge bg-success' : ''" class="me-2">Comisiones</router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>

</style>
