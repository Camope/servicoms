<script>
import { mapActions, mapState } from 'pinia'
import { useUsuariosStore } from '@/stores/usuarios'

export default {
  props: {
    comisionId: {
      type: Number,
      default: null
    },
  },
  components: {},
  emits: [],
  data() {
    return {
      solicitantes: [],
    }
  },
  updated() {

  },
  created() {
  },
  mounted() {
    this.solicitantes = this.getSolicitantesPorComision(this.comisionId)
    console.log("id: " + this.comisionId)
    this.solicitantes.forEach(s => { s.nombreCompleto = s.nombre + " " + s.apellidos })
  },
  computed: {
    haySolicitantes() {
      return this.solicitantes.length > 0
    },
    titulo() {
      return this.haySolicitantes ? "Solicitantes" : "No hay solicitantes"
    }
  },
  methods: {
    ...mapActions(useUsuariosStore, ['getSolicitantesPorComision']),
    exportar() {
      this.$refs.dt.exportCSV();
    }
  }
}
</script>

<template>
  <!-- Muestra la lista de solicitantes, si es que hay. En caso contrario notifica dicha situación -->
  <div v-if="!haySolicitantes" class="card encabezado">¡No hay solicitantes para esta comisión!</div>
  <div v-if="haySolicitantes" class="card">
    <DataTable :value="solicitantes" ref="dt" scrollable scrollHeight="400px" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex justify-content-center">
          Solicitantes
        </div>
      </template>
      <Column field="tip" header="TIP" style=""></Column>
      <Column field="nombreCompleto" header="Nombre" style=""></Column>
      <Column field="empleo" header="Empleo" style=""></Column>
      <Column field="email" header="e-mail" style=""></Column>
      <template #footer>
        <div class="flex justify-content-center">
          <Button label="Exportar" icon="pi pi-external-link" severity="secondary" @click="exportar($event)" />
        </div>
      </template>
    </DataTable>
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