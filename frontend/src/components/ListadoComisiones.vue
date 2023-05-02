<script>
import { FilterMatchMode } from 'primevue/api';
import { ConstantesComision } from '@/js/ConstantesComision';
import { mapActions, mapState } from 'pinia'
import { useComisionesStore } from '@/stores/comisiones'

export default {
  data() {
    return {
      mostrarFormulario: false,
      filters: {},
      enviar: false,
      listaComisiones: [],
      // products: {},
      comision: {
        // vacante: null,
        // localidad: null,
        // empleo: null,
        // especialidad: null,
        // duracion: 1,
        // fechaLimite: null,
        // viogen: false,
        // riesgo: null,
        // extranjero: false,
        // perfil: null
      },
      // empleos: [
        // 'Guardia',
        // 'Cabo/Cabo 1º',
        // 'Cabo Mayor',
        // 'Sargento/Sto. 1º',
        // 'Brigada',
        // 'Subteniente',
        // 'Suboficial Mayor',
        // 'Teniente',
        // 'Capitán',
        // 'Comandante',
        // 'Teniente Coronel',
        // 'Coronel',
        // 'General'
      // ],
      // especialidades: [
      //   'Seguridad Ciudadana',
      //   'SEPRONA',
      //   'Tráfico',
      //   'UEI',
      //   'Policía Judicial',
      //   'TEDAX NRBQ',
      //   'Control de Armas',
      //   'Servicio Aéreo',
      //   'Marítimo',
      //   'Montaña',
      //   'Fiscal',
      //   'ARS',
      //   'Cinológico',
      //   'Otras'
      // ],
      duracionMaxima: 12,
      riesgos: [
        'Bajo',
        'Medio',
        'Alto',
        'Extremo'
      ],
      perfiles: [
        'No requerido',
        'Inglés (1.1.1.1)',
        'Inglés (2.2.2.2)',
        'Inglés (3.3.3.3)',
        'Inglés (4.4.4.4)',
        'Francés (1.1.1.1)',
        'Francés (2.2.2.2)',
        'Francés (3.3.3.3)',
        'Francés (4.4.4.4)',
        'Portugués (1.1.1.1)',
        'Portugués (2.2.2.2)',
        'Portugués (3.3.3.3)',
        'Portugués (4.4.4.4)',
        'Árabe (1.1.1.1)',
        'Árabe (2.2.2.2)',
        'Árabe (3.3.3.3)',
        'Árabe (4.4.4.4)',
        'Alemán (1.1.1.1)',
        'Alemán (2.2.2.2)',
        'Alemán (3.3.3.3)',
        'Alemán (4.4.4.4)',
      ],
    }
  },
  created() {
    this.initFilters();
  },
  mounted() {
    //ProductService.getProducts().then((data) => (this.products = data))
    // this.products = ProductService.getProductsData()
    this.listaComisiones = this.getComisiones()
    this.listaComisiones.forEach(element => element.estado = element.id % 3)
  },
  computed: {
    hoy() {
      return new Date()
    },
    empleos() {
      return ConstantesComision.getEmpleos()
    },
    especialidades() {
      return ConstantesComision.getEspecialidades()
    },
  },
  methods: {
    nuevaComision() {
      this.comision = { duracion: 1 };
      this.enviar = false;
      this.mostrarFormulario = true;
    },
    cancelarNuevaComision() {
      this.mostrarFormulario = false;
      this.enviar = false;
    },
    guardarComision() {
      this.enviar = true;

      if (this.comision.localidad &&
          this.comision.empleo &&
          this.comision.especialidad &&
          this.comision.duracion &&
          this.comision.fechaLimite &&
          (!this.comision.viogen || this.comision.riesgo) &&
          (!this.comision.extranjero || this.comision.perfil)) {

            console.log("Comisión Guardada!!")
            this.mostrarFormulario = false
            this.comision = null
          }
    },
    initFilters() {
      this.filters = {
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
      }
    },
    getStatusLabel(status) {
      switch (status) {
        case 0:
          return { value: 'En plazo', severity: 'success' }
        case 1:
          return { value: 'Finalizando', severity: 'warning' }
        case 2:
          return { value: 'Cerrada', severity: 'danger' }
        default:
          return null;
      }
    },
    ...mapActions(useComisionesStore, ['getComisiones', 'initLista']),
    rowClick(event) {
      console.log(event.data.id)
      // this.$router.push({ path: "prueba" });
    },
    cambioViogen(event) {
      this.comision.extranjero = false
      this.comision.perfil = null
      if(!event) this.comision.riesgo = null
    },
    cambioExtranjero(event) {
      this.comision.viogen = false
      this.comision.riesgo = null
      if(!event) this.comision.perfil = null
    }
  }
}
</script>

<template>
  <div>
    <div class="card">
      <DataTable ref="dt" :value="listaComisiones" dataKey="id" :paginator="true"
        :rows="10" :filters="filters" :row-hover="true" @row-click="rowClick"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Mostrando de {first} a {last} de {totalRecords} comisiones">
        <template #header>
          <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
            <span><Button label="Nueva" icon="pi pi-plus" severity="success" class="mr-2" @click="nuevaComision" /></span>
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
        <Column field="estado" header="Estado" sortable style="min-width:10rem; display: flex; justify-content: center;">
          <template #body="slotProps">
            <Tag :value="getStatusLabel(slotProps.data.estado).value"
              :severity="getStatusLabel(slotProps.data.estado).severity" />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog v-model:visible="mostrarFormulario" :style="{ width: '500px' }" header="Nueva Comisión" :modal="true"
      class="p-fluid">
      <div class="field">
        <label for="name">Vacante</label>
        <InputText id="name" v-model.trim="comision.vacante" autofocus required="true"
          :class="{ 'p-invalid': enviar && !comision.vacante }" />
        <small class="p-error" v-if="enviar && !comision.vacante">Introduzca nombre de la vacante</small>
      </div>

      <div class="field">
        <label for="description">Descripción</label>
        <Textarea id="description" v-model="comision.description" required="false" rows="3" cols="20" />
      </div>

      <div class="field">
        <label for="name">Localidad</label>
        <InputText id="name" v-model.trim="comision.localidad" required="true"
          :class="{ 'p-invalid': enviar && !comision.localidad }" />
        <small class="p-error" v-if="enviar && !comision.localidad">Introduzca localidad</small>
      </div>
      
      <div class="formgrid grid">
        <div class="field col-6">
          <label for="selectorEmpleo" class="mb-3">Empleo</label>
          <Dropdown id="selectorEmpleo" v-model="comision.empleo" :options="empleos" required="true"
            placeholder="Seleccione empleo" class="w-full" :class="{ 'p-invalid': enviar && !comision.empleo }" />
          <small class="p-error" v-if="enviar && !comision.empleo">Seleccione empleo</small>
        </div>

        <div class="field col-6">
          <label for="selectorEspecialidad" class="mb-3">Especialidad</label>
          <Dropdown id="selectorEspecialidad" v-model="comision.especialidad" :options="especialidades" required="true"
            placeholder="Seleccione especialidad" class="w-full" :class="{ 'p-invalid': enviar && !comision.especialidad }" />
            <small class="p-error" v-if="enviar && !comision.especialidad">Seleccione especialidad</small>
        </div>
      </div>

      <div class="field">
        <label for="duracion" class="mb-3">Duración</label>
        <InputNumber v-model="comision.duracion" :suffix="comision.duracion == 1 ? ' mes' : ' meses'" inputId="duracion"
          mode="decimal" showButtons :min="1" :max="duracionMaxima" />
      </div>

      <div class="field">
        <label for="fechalimite" class="mb-3">Fecha límite de solicitud</label>
        <Calendar id="fechalimite" v-model="comision.fechaLimite" dateFormat="dd/mm/yy" :minDate="hoy" showIcon required="true"
          :class="{ 'p-invalid': enviar && !comision.fechaLimite }" />
        <small class="p-error" v-if="enviar && !comision.fechaLimite">Introduzca fecha</small>
      </div>

      <div class="formgrid grid">
        <div class="field-radiobutton col-6">
          <InputSwitch v-model="comision.viogen" @input="cambioViogen" id="viogen" />
          <label for="viogen" class="mb-3">Viogen</label>
        </div>
        <div class="field-radiobutton col-6">
          <InputSwitch v-model="comision.extranjero" @input="cambioExtranjero" id="extranjero" />
          <label for="extranjero" class="mb-3">Extranjero</label>
        </div>
        <div class="field col-6">
          <label for="selectorRiesgo" class="mb-3">Riesgo</label>
          <Dropdown id="selectorRiesgo" v-model="comision.riesgo" :disabled="!comision.viogen" :options="riesgos"
            placeholder="Seleccione Riesgo" class="w-full" :class="{ 'p-invalid': enviar && !comision.riesgo && comision.viogen }" />
          <small class="p-error" v-if="enviar && !comision.riesgo && comision.viogen">Seleccione riesgo</small>
        </div>
        <div class="field col-6">
          <label for="selectorPerfil" class="mb-3">Perfil</label>
          <Dropdown id="selectorPerfil" v-model="comision.perfil" :disabled="!comision.extranjero" :options="perfiles"
            placeholder="Seleccione Perfil" class="w-full" :class="{ 'p-invalid': enviar && !comision.perfil && comision.extranjero }" />
          <small class="p-error" v-if="enviar && !comision.perfil && comision.extranjero">Seleccione perfil</small>
        </div>
      </div>

      <template #footer>
        <Button label="Cancelar" icon="pi pi-times" text @click="cancelarNuevaComision" />
        <Button label="Guardar" icon="pi pi-check" text @click="guardarComision" />
      </template>
    </Dialog>

  </div>
</template>
