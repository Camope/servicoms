<script>

import EncabezadoLista from './EncabezadoLista.vue'
import ElementoLista from './ElementoLista.vue'

export default {
  props: {
    titles: [Object],
    elements: {
      type: Array,
      default: []
    },
    hoverable: {
      type: Boolean,
      default: true
    },
    paginable: {
      type: Boolean,
      default: true
    },
    sortable: {
      type: Boolean,
      default: true
    },
  },
  components: { EncabezadoLista, ElementoLista },
  emits: ['rowClick'],
  data() {
    return {
      elementList: null,
      first: 0,
      rows: 10,
      sortRule: {},
    }
  },
  updated() {
  },
  created() {
    this.elementList = this.elements
  },
  destroyed() {
  },
  mounted() {
  },
  computed: {
    page() {
      this.elementList = [...this.elements]

      if (this.sortRule.rule) {
        this.sortData()
        console.log('sort')
      }

      if (this.paginable) {
        let last = Math.min((this.first + this.rows), this.elementList.length)
        this.elementList = this.elementList.slice(this.first, last)
      }

      return this.elementList
    },
  },
  methods: {
    rowClick(event) {
      this.$emit('rowClick', event)
    },
    sortRuleChange(rule, reverse) {
      this.sortRule = { rule, reverse }
    },
    sortData() {
      if (this.elementList.length > 1) {
        if (typeof this.elementList[0][this.sortRule.rule] == 'string') {
          this.elementList.sort((a, b) => {
            let result = a[this.sortRule.rule].localeCompare(b[this.sortRule.rule])
            return this.sortRule.reverse ? -result : result
          })
        } else if (typeof this.elementList[0][data] == 'number') {
          this.elementList.sort((a, b) => {
            let result = a[data] - b[data]
            return this.sortRule.reverse ? -result : result
          })
        }
      }
    }
  }
}
</script>

<template>
  <EncabezadoLista :titles="titles" :showIcon="sortable" :sortable="sortable" @sortRuleChange="sortRuleChange" />
  <div v-if="page.length == 0" class="resaltado-centrado">¡No hay información para mostrar!</div>
  <ElementoLista v-for="element in page" :titles="titles" :element="element" :hoverable="hoverable"
    @filaSeleccionada="rowClick" />
  <div v-if="paginable" class="p-panel-footer gap-2 block">
    <Paginator v-model:first="first" :rows="rows" :totalRecords="elementList.length" :rowsPerPageOptions="[10, 20, 30]"
      @update:rows="(r) => rows = r"></Paginator>
  </div>
</template>

<style scoped>
.resaltado-centrado {
  color: #495057;
  font-weight: 600;
  text-align: center;
  margin: 0;
  padding: 1rem;
}
</style>