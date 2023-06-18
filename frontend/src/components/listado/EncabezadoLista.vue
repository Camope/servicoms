<script>
import TituloItem from './TituloItem.vue'

export default {
  props: {
    titles: [Object],
    showIcon: {
      type: Boolean,
      default: true
    },
    sortable: {
      type: Boolean,
      default: true
    },
  },
  components: { TituloItem },
  emits: ['sortRuleChange'],
  data() {
    return {
      filtros: [],
      filtroSeleccionado: null,
      iconClassTypes: ['pi pi-sort-alt', 'pi pi-sort-amount-down-alt', 'pi pi-sort-amount-up-alt'],
      iconIndexList: [],
      isLargeDevice: true,
      filtroPlaceholder: 'Aplicar Filtro',
    }
  },
  updated() {
  },
  created() {
    this.titles.forEach(t => {
      this.iconIndexList.push(0)
      this.filtros.push(t.title + ' asc.')
      this.filtros.push(t.title + ' desc.')
    })

    this.myEventHandler()

    window.addEventListener("resize", this.myEventHandler)

  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
  mounted() {
  },
  computed: {

  },
  methods: {
    cambiaOrden(index, requiredIndexIcon) {

      for (const key in this.iconIndexList) {
        if (key != index) {
          this.iconIndexList[key] = 0
        } else {
          if ((requiredIndexIcon != undefined) || (requiredIndexIcon != null)){
            this.iconIndexList[key] = requiredIndexIcon
          } else {
            this.iconIndexList[key] = (++this.iconIndexList[key] >= this.iconClassTypes.length) ? 1 : this.iconIndexList[key]
          }
        }
      }

      this.filtroSeleccionado = this.filtros[index * 2 + this.iconIndexList[index] - 1] 
      this.filtroPlaceholder = this.filtroSeleccionado

      this.$emit('sortRuleChange', this.titles[index].campo, this.iconIndexList[index] == 2)
    },
    cambiaSelector(opcion) {
      let index = this.filtros.findIndex(f => f == opcion)
      let iconIndex = (index % 2) + 1
      index = Math.trunc(index / 2)

      this.cambiaOrden(index, iconIndex)
    },
    myEventHandler() {
      this.isLargeDevice = screen.width >= 800
    }
  }
}
</script>

<template>
  <div v-if="isLargeDevice" class="comision-item-header flex">
    <TituloItem v-for="(title, index) in titles" ref="titulosRef" :title="title.title" :styles="title.styles"
      :showIcon="showIcon" :iconClass="iconClassTypes[iconIndexList[index]]" :hoverable="sortable"
      @filterChange="cambiaOrden(index)" />
  </div>
  <div v-if="!isLargeDevice && sortable" class="comision-item-header flex p-2 justify-content-end">
    <Dropdown v-model="filtroSeleccionado" :options="filtros" :placeholder="filtroPlaceholder" class="w-14rem"
      @update:modelValue="cambiaSelector" />
  </div>
</template>

<style scoped>
.comision-item-header {
  border: 1px solid #e9ecef;
  border-width: 0 0 1px 0;
  color: #495057;
  font-weight: 600;
  background: #f8f9fa;
}
</style>