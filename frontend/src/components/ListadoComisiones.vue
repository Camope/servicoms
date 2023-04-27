<script>
import { FilterMatchMode } from 'primevue/api';
// import { ProductService } from '@/service/ProductService';
import { mapActions, mapState } from 'pinia'
import { useComisionesStore } from '@/stores/comisiones'

export default {
  data() {
    return {
      products: null,
      productDialog: false,
      deleteProductDialog: false,
      deleteProductsDialog: false,
      product: {},
      selectedProducts: null,
      filters: {},
      submitted: false,
      statuses: [
        { label: 'INSTOCK', value: 'instock' },
        { label: 'LOWSTOCK', value: 'lowstock' },
        { label: 'OUTOFSTOCK', value: 'outofstock' }
      ],
      listaComisiones: []
    }
  },
  created() {
    this.initFilters();
  },
  mounted() {
   // ProductService.getProducts().then((data) => (this.products = data))
    this.listaComisiones = this.getComisiones()
    this.listaComisiones.forEach(element => element.estado = element.id % 3)
  },
  methods: {
    
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
    ...mapActions(useComisionesStore, ['getComisiones']),
    rowClick(event){
      console.log(event.data.id)
    },
  }
}
</script>

<template>
  <div>
    <div class="card">
      <DataTable ref="dt" :value="listaComisiones" v-model:selection="selectedProducts" dataKey="id" :paginator="true" :rows="10"
        :filters="filters" :row-hover="true" @row-click="rowClick"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]" currentPageReportTemplate="Mostrando de {first} a {last} de {totalRecords} comisiones">
        <template #header>
          <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="filters['global'].value" placeholder="Buscar..." />
            </span>
          </div>
        </template>

        <Column field="empleo" header="Empleo" sortable style="min-width:10rem; max-width: 10rem;"></Column>
        <Column field="puesto" header="Vacante" sortable style="min-width:10rem; max-width: 10rem;"></Column>
        <Column field="especialidad" header="Especialidad" sortable style="width:10rem"></Column>
        <Column field="localidad" header="Localidad" sortable style="width:10rem"></Column>
        <Column field="estado" header="Estado" sortable style="min-width:12rem">
          <template #body="slotProps">
            <Tag :value="getStatusLabel(slotProps.data.estado).value" :severity="getStatusLabel(slotProps.data.estado).severity" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
