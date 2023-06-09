<script>
import { mapActions, mapState } from 'pinia'
import { useUsuariosNuevoStore } from '@/stores/usuariosnuevo'
import EncabezadoLista from './listado/EncabezadoLista.vue'
import ElementoLista from './listado/ElementoLista.vue'

export default {
  props: {
    comisionId: [Number, String],
  },
  components: { EncabezadoLista, ElementoLista },
  emits: [],
  data() {
    return {
      configList: [{ campo: 'tip', title: 'TIP', styles: 'max-width: 10rem; justify-content: center;' },
      { campo: 'nombreCompleto', title: 'Nombre', styles: null },
      { campo: 'empleo', title: 'Empleo', styles: 'max-width: 10rem;' },
      { campo: 'email', title: 'e-mail', styles: null }],
    }
  },
  updated() {
  },
  created() {
    this.getUsuariosPorComision(this.comisionId)
  },
  mounted() {
    console.log("id: " + this.comisionId)
  },
  computed: {
    ...mapState(useUsuariosNuevoStore, ['listaUsuarios', 'userLoading', 'userErrored']),
    haySolicitantes() {
      return this.listaUsuarios.length > 0
    },
  },
  methods: {
    ...mapActions(useUsuariosNuevoStore, ['getUsuariosPorComision']),
    exportar() {
      this.$refs.dt.exportCSV();
    }
  }
}
</script>

<template>
  <!-- Muestra la lista de solicitantes, si es que hay. En caso contrario notifica dicha situación -->
  <div class="card p-panel p-component">
    <div class="p-panel-header encabezado justify-content-center">
      <span>Lista de solicitantes</span>
    </div>
    <div v-if="userLoading" class="text-center">
      <ProgressSpinner />
    </div>
    <div v-else>
      <div v-if="!haySolicitantes" class="encabezado">¡No hay solicitantes para esta comisión!</div>
      <div v-else>
        <EncabezadoLista :titles="configList" :showIcon="false" :sortable="false" />
        <ElementoLista v-for="solicitante in listaUsuarios" :titles="configList" :element="solicitante" :hoverable="false"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.encabezado {
  color: #495057;
  font-weight: 600;
  text-align: center;
  margin: 0;
  padding: 1rem;
}
</style>