<script setup>
import ListadoComisiones from './components/ListadoComisiones.vue'
</script>

<template>
  <div class="">
    <div>
      <div>
        <h1>Menú</h1>
        <router-link :to="{ name: 'home' }" :class="$route.name == 'home' ? 'badge bg-success' : ''" class="me-2">Go to Home</router-link>
        <router-link :to="{ name: 'about' }" :class="$route.name == 'about' ? 'badge bg-success' : ''" class="me-2">Go to About</router-link>
        <router-link :to="{ name: 'comisiones' }" :class="$route.name == 'comisiones' ? 'badge bg-success' : ''" class="me-2">Comisiones</router-link>
        <!-- Le pasamos parámetros vía router-link -->
        <router-link :to="{ name: 'comision' , params: { comisionId: 1 }}" :class="$route.name == 'comision' ? 'badge bg-success' : ''" class="me-2">Detalle</router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>

</style>
