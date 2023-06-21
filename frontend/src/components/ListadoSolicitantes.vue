<script>
import { mapActions, mapState } from 'pinia'
import { useSolicitudesStore } from '@/stores/solicitudes'
import EncabezadoLista from './listado/EncabezadoLista.vue'
import ElementoLista from './listado/ElementoLista.vue'
import { unparse } from 'papaparse'

export default {
  props: {
    comision: {
      type: Object,
    },
  },
  components: { EncabezadoLista, ElementoLista },
  data() {
    return {
      configList: [{ campo: 'tip', title: 'TIP', styles: 'max-width: 10rem; justify-content: center;' },
      { campo: 'nombreCompleto', title: 'Nombre', styles: null },
      { campo: 'empleo', title: 'Empleo', styles: 'max-width: 10rem;' },
      { campo: 'email', title: 'e-mail', styles: null }],
    }
  },
  computed: {
    ...mapState(useSolicitudesStore, ['listaDeSolicitantes', 'loadingSolicitudesStore']),
    haySolicitantes() {
      return this.listaDeSolicitantes.length > 0
    },
  },
  methods: {
    ...mapActions(useSolicitudesStore, ['getSolicitantesPorComision']),
    exportarCSV() {
      let arrayDatosParaExportar = []
      this.listaDeSolicitantes.forEach((solicitante) => {
        arrayDatosParaExportar.push(
          (({ nombre, apellidos, tip, empleo, email }) =>
            ({ nombre, apellidos, tip, empleo, email }))(solicitante))
      })

      let csv = unparse(arrayDatosParaExportar)
      let csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      let csvURL = window.URL.createObjectURL(csvData)

      let nombreArchivo = 'solicitantes_' + this.comision.puesto.replaceAll(' ', '_') +
                          '_' + (new Date()).toLocaleDateString().replaceAll('/', '_')
      let tempLink = document.createElement('a')
      tempLink.href = csvURL
      tempLink.setAttribute('download', nombreArchivo)
      tempLink.click()
      URL.revokeObjectURL(tempLink)
    }
  },
  created() {
    this.getSolicitantesPorComision(this.comision)
  },
}
</script>

<template>
  <div class="card p-panel p-component">
    <div class="p-panel-header encabezado justify-content-center">
      <span>Lista de solicitantes</span>
    </div>
    <div v-if="loadingSolicitudesStore" class="text-center">
      <ProgressSpinner />
    </div>
    <div v-else>
      <div v-if="!haySolicitantes" class="encabezado">¡No hay solicitantes para esta comisión!</div>
      <div v-else>
        <EncabezadoLista :titles="configList" :showIcon="false" :sortable="false" />
        <ElementoLista v-for="solicitante in listaDeSolicitantes" :titles="configList" :element="solicitante"
          :hoverable="false" />
        <div class="p-panel-footer gap-2 flex justify-content-center">
          <button class="p-button p-component p-button-secondary p-button-sm" type="button" @click="exportarCSV">
            <span class="p-button-icon p-button-icon-left pi pi-external-link"></span>
            <span class="p-button-label">Exportar</span>
          </button>
        </div>
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