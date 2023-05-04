<script setup>

import BarraNavegacion from '@/components/BarraNavegacion.vue'

// import { storeToRefs } from 'pinia'
// import { watch } from 'vue'
// import { useComisionesStore } from '@/stores/comisiones'

// const comisionesStore = useComisionesStore()
// const { listaComisiones, cambio } = storeToRefs(comisionesStore)

// let datosComisiones = sessionStorage.getItem("comisiones")

// if(!datosComisiones){
//   console.log("No hay datos almacenados")
//   comisionesStore.initLista()
// } else {
//   console.log("Hay datos almacenados")
//   comisionesStore.setComisiones(datosComisiones)
// }

// watch(cambio, () => {
//   console.log('ha cambiado algo!')
//   sessionStorage.setItem("comisiones", listaComisiones)
// })

// watch(listaComisiones, () => {
//   console.log('listaComisiones ha cambiado!')
// })

</script>

<template>
  <div class="fondo">
    <div>
      <div>
        <BarraNavegacion />
        <h1>Menú</h1>
        <router-link :to="{ name: 'home' }" :class="$route.name == 'home' ? 'badge bg-success' : ''" class="me-2">Go to
          Home</router-link>
        <router-link :to="{ name: 'about' }" :class="$route.name == 'about' ? 'badge bg-success' : ''" class="me-2">Go to
          About</router-link>
        <router-link :to="{ name: 'comisiones' }" :class="$route.name == 'comisiones' ? 'badge bg-success' : ''"
          class="me-2">Comisiones</router-link>
        <!-- Le pasamos parámetros vía router-link -->
        <router-link :to="{ name: 'comision', params: { comisionId: 1 } }"
          :class="$route.name == 'comision' ? 'badge bg-success' : ''" class="me-2">Detalle</router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
  .fondo {
    background-color: grey;
  }
</style>
