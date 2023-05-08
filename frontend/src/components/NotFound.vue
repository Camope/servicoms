
<template>
  <div class="card relative">
    <div class="flex p-component flex-column aviso-400">
      <div class="">
        <h1>¡¡Página no encontrada!!</h1>
      </div>
      <div class="">
        <router-link :to="{ name: 'comisiones' }">Regresar a la página principal</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.aviso-400 {
  min-height: 50vh;
  justify-content: center;
  text-align: center;
}
</style>