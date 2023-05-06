<script>
import { FilterMatchMode } from 'primevue/api';
import { ConstantesComision } from '@/js/ConstantesComision';
import { mapActions, mapState } from 'pinia'
import { useComisionesStore } from '@/stores/comisiones'
import { useUsuariosStore } from '@/stores/usuarios';
import FormularioComision from './FormularioComision.vue'

export default {
  props:
  {
    filtrar: {
      type: Boolean,
      default: false
    }
  },
  components: { FormularioComision },
  emits: [],
  data() {
    return {
      mostrarFormulario: false,
      filters: {},
      enviar: false,
      listaComisiones: [],
      comisionTemp: {}
    }
  },
  updated() {
  },
  created() {
    this.initFilters();
  },
  mounted() {
//    console.log("lista montada")
    if (!this.filtrar || !this.isUserLoggedIn) {
//      console.log(this.isUserLoggedIn)
//      console.log(this.filtrar)
      this.listaComisiones = this.getComisiones()
    } else {
      this.listaComisiones = []
      this.getUsuarioLogeado.solicitudes.forEach(id => {
        let comision = this.getComisionPorId(id)
        if (comision) {
          this.listaComisiones.push(this.getComisionPorId(id))
        } else {
          console.log("La comisión ID:" + id + " no existe")
        }
      })
    }
  },
  computed: {
    ...mapState(useUsuariosStore, ['getUsuarioLogeado', 'isUserLoggedIn']),
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
    ...mapActions(useComisionesStore, ['getComisiones', 'getComisionPorId', 'setComision']),
    nuevaComision() {
      this.comisionTemp = {}
      this.mostrarFormulario = true
    },
    cancelarNuevaComision() {
      this.mostrarFormulario = false
    },
    guardarComision(data) {
      console.log("guardar...")
      this.setComision(data)
      this.mostrarFormulario = false
    },
    initFilters() {
      this.filters = {
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
      }
    },
    getStatusLabel(comision) {
      let plazo = comision.fechaLimite - this.hoy
      let estado
      const SEMANA = 7 * 24 * 3600 * 1000 // 1 Semana en milisegundos

      if (plazo > SEMANA) {
        estado = { value: 'En plazo', severity: 'success' }
      } else if (plazo < 0) {
        estado = { value: 'Cerrada', severity: 'danger' }
      } else {
        estado = { value: 'Finalizando', severity: 'warning' }
      }

      return estado
    },
    rowClick(event) {
      console.log(event.data.id)
      this.$router.push({ name: 'comision', params: { comisionId: event.data.id } })
    },
  }
}
</script>

<template>
  <div>
    <div class="card">
      <DataTable ref="dt" :value="listaComisiones" dataKey="id" :paginator="true" :rows="10" :filters="filters"
        :row-hover="true" @row-click="rowClick"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Mostrando de {first} a {last} de {totalRecords} comisiones">
        <template #header>
          <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
            <span><Button label="Nueva" icon="pi pi-plus" severity="success" class="mr-2" @click="nuevaComision" /></span>
            <span>{{ filtrar ? "Mis Solicitudes" : "Comisiones Publicadas" }}</span>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="filters['global'].value" placeholder="Buscar..." />
            </span>
          </div>
        </template>

        <Column field="empleo" header="Empleo" sortable style="min-width:10rem"></Column>
        <Column field="puesto" header="Vacante" sortable style="min-width:10rem"></Column>
        <Column field="especialidad" header="Especialidad" sortable style="min-width:10rem"></Column>
        <Column field="localidad" header="Localidad" sortable style="min-width:10rem"></Column>
        <Column field="fechaLimite" header="Estado" sortable style="min-width:10rem; text-align: center;">
          <template #body="slotProps">
            <Tag :value="getStatusLabel(slotProps.data).value" :severity="getStatusLabel(slotProps.data).severity" />
          </template>
        </Column>
      </DataTable>
    </div>

    <FormularioComision :mostrar="mostrarFormulario" :comision="comisionTemp" @cancelar-formulario="cancelarNuevaComision"
      @guardarCambios="guardarComision" />

  </div>
</template>

<style>
.p-datatable div .p-column-header-content {
  display: inline-flex;
}
</style>