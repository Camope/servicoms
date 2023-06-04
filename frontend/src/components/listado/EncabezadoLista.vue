<script>
import TituloItem from './TituloItem.vue';

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
      isLargeDevice: true,
    }
  },
  updated() {
  },
  created() {
    this.filtros = []
    this.titles.forEach(t => {
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
    cambiaOrden(data, reverse) {
      this.$refs.titulosRef.forEach(t => {
        if (t.title != data) {
          t.resetIcon()
        }
      })
      this.$emit('sortRuleChange', this.titles.find(i => i.title == data).campo, reverse)
    },
    cambiaSelector(data) {
      let index = this.filtros.findIndex(f => f == data)
      let reverse = (index % 2) == 1
      index = Math.trunc(index / 2)

      this.cambiaOrden(this.titles[index].title, reverse)
    },
    myEventHandler() {
      this.isLargeDevice = screen.width >= 800
    }
  }
}
</script>

<template>
  <div v-if="isLargeDevice" class="comision-item-header flex">
    <TituloItem v-for="title in titles" ref="titulosRef" :title="title.title" :styles="title.styles" :showIcon="showIcon"
      :hoverable="sortable" @filterChange="cambiaOrden" />
  </div>
  <div v-if="!isLargeDevice && sortable" class="comision-item-header flex p-2 justify-content-end">
    <Dropdown v-model="filtroSeleccionado" :options="filtros" placeholder="Aplicar Filtro" class="w-14rem"
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