<script setup>

import BarraNavegacion from '@/components/BarraNavegacion.vue'
import PiePagina from './components/PiePagina.vue';

</script>

<template>
  <BarraNavegacion class="mt-1 mb-3" />

  <!-- Elemento que muestra el contenido de las distintas rutas -->
  <div class="mb-3">
    <router-view v-slot="{ Component, route }">
      <transition name="fade">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </div>

  <PiePagina class="mt-auto mb-1" />
</template>

<style scoped>
</style>
