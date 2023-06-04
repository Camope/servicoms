<script>

import { FilterMatchMode } from 'primevue/api';
import { ConstantesComision } from '@/js/ConstantesComision';
import { mapActions, mapState } from 'pinia'
import { useComisionesNuevoStore } from '@/stores/comisionesnuevo'
import { useUsuariosStore } from '@/stores/usuarios';
import FormularioComision from './FormularioComision.vue'
import TituloItem from './listado/TituloItem.vue';
import EncabezadoLista from './listado/EncabezadoLista.vue';
import ElementoLista from './listado/ElementoLista.vue';
import { getUsuario, getComisionesApi } from '@/stores/api-service'

export default {
  props:
  {
    filtrar: { // Parámetro que controla el filtrado de las comisiones solicitadas
      type: Boolean,
      default: false
    }
  },
  components: { FormularioComision, TituloItem, EncabezadoLista, ElementoLista },
  emits: [],
  data() {
    return {
      mostrarFormulario: false,
      enviar: false,
      comisionTemp: {},
      miUsuario: null,
      first: 0,
      rows: 10,
      configList: [{ campo: 'empleo', title: 'Empleo', styles: 'max-width: 10rem;' },
      { campo: 'puesto', title: 'Vacante', styles: null },
      { campo: 'especialidad', title: 'Especialidad', styles: null },
      { campo: 'localidad', title: 'Localidad', styles: null },
      { campo: 'estado', title: 'Estado', styles: 'max-width: 10rem; justify-content: center;' }],
      camposDeBusqueda: ['puesto', 'empleo', 'especialidad', 'localidad'],
    }
  },
  updated() {
  },
  created() {
    this.updateListaComisiones()
  },
  mounted() {
    // if (!this.filtrar || !this.isUserLoggedIn) {
    //   this.listaComisiones = null
    //   this.listaComisionesCompleta = null
    //   getComisionesApi().then((response) => {
    //     this.listaComisionesCompleta = response.data._embedded.listaComisiones
    //     this.listaComisiones = [...this.listaComisionesCompleta]
    //   })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // } else {
    //   this.listaComisiones = []
    //   this.getUsuarioLogeado.solicitudes.forEach(id => {
    //     let comision = this.getComisionPorId(id)
    //     if (comision) {
    //       this.listaComisiones.push(this.getComisionPorId(id))
    //     } else {
    //       console.log("La comisión ID:" + id + " no existe")
    //     }
    //   })
    //}
    getUsuario(1).then((response) => {
      this.miUsuario = JSON.stringify(response.data)
      console.log(JSON.stringify(response.data))
    })
      .catch((error) => {
        console.log(error)
      })
  },
  computed: {
    ...mapState(useUsuariosStore, ['getUsuarioLogeado', 'isUserLoggedIn', 'isUserAdmin']),
    ...mapState(useComisionesNuevoStore, ['listaComisiones', 'loading', 'errored']),
    page() {
      let last = Math.min((this.first + this.rows), this.listaComisiones.length)
      return this.listaComisiones.slice(this.first, last)
    },
    hoy() {
      return new Date()
    },
    empleos() {
      return ConstantesComision.getEmpleos()
    },
    especialidades() {
      return ConstantesComision.getEspecialidades()
    },
    duracionMaxima() {
      return ConstantesComision.getDuracionMaxima()
    },
    riesgos() {
      return ConstantesComision.getRiesgos()
    },
    perfiles() {
      return ConstantesComision.getPerfiles()
    }

  },
  methods: {
    ...mapActions(useComisionesNuevoStore, ['updateListaComisiones', 'sortListaComisiones',
                                            'searchInListaComisiones', 'saveComision',
                                            'resetEstados', 'getComisionId']),
    nuevaComision() {
      this.comisionTemp = {}
      this.mostrarFormulario = true
    },
    cancelarNuevaComision() {
      this.mostrarFormulario = false
    },
    guardarComision(data) {
      console.log("guardar...")
      console.log(data)
      this.saveComision(data)
      this.mostrarFormulario = false
    },
    sortRuleChange(data, reverse) {
      this.sortListaComisiones(data, reverse)
    },
    rowClick(event) {

      console.log(this.getComisionId(event))
      this.$router.push({ name: 'comisionnuevo', params: { comisionId: this.getComisionId(event) } })
    },
    buscar(event) {
      this.searchInListaComisiones(event, this.camposDeBusqueda)
    },
    gestionarErrores(event) {
      if (!event) this.resetEstados()
    }
  }
}
</script>

<template>
  <div>
    <div class="card p-panel p-component">
      <div class="p-panel-header flex-wrap grid-nogutter">
        <div class="md:col-3 col-6 flex flex-order-1 md:flex-order-0 p-0 justify-content-start align-items-center">
          <Button v-if="isUserAdmin" label="Nueva" icon="pi pi-plus" severity="success" @click="nuevaComision" />
        </div>
        <div
          class="md:col-6 col-12 flex flex-order-0 md:flex-order-1 p-2 justify-content-center align-items-center p-panel-title">
          <span>{{ filtrar ? "Mis Solicitudes" : "Comisiones Publicadas" }}</span>
        </div>
        <div class="md:col-3 col-6 flex flex-order-2 md:flex-order-2 p-0 justify-content-end align-items-center">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <input class="p-inputtext p-component" placeholder="Buscar..." style="max-width: 40vw;"
              @input="buscar($event.target.value)" />
          </span>
        </div>
      </div>
      <ProgressSpinner v-if="loading" />
      <div v-else>
        <EncabezadoLista :titles="configList" @sortRuleChange="sortRuleChange" />
        <ElementoLista v-for="comision in page" :titles="configList" :element="comision"
          @filaSeleccionada="rowClick" />
        <div class="p-panel-footer gap-2 block">
          <Paginator v-model:first="first" :rows="rows" :totalRecords="listaComisiones.length"
            :rowsPerPageOptions="[10, 20, 30]" @update:rows="(r) => rows = r"></Paginator>
        </div>
      </div>

    </div>

    <!-- Formulario para crear una nueva comisión -->
    <FormularioComision :mostrar="mostrarFormulario" :comision="comisionTemp" @cancelar-formulario="cancelarNuevaComision"
      @guardarCambios="guardarComision" />

    <!-- Diálogo de Error -->
    <Dialog :visible="errored" :style="{ width: '450px' }" header="Información" :modal="true" @update:visible="gestionarErrores" >
      <div>
        <span style="color: red;">¡Error de comunicación!</span>
      </div>
      <div>
        <span>En este momento no es posible contactar con el servidor, inténtelo pasado unos minutos.</span>
      </div>
    </Dialog>

  </div>
</template>

<style scoped>

</style>