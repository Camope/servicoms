<script>

import TituloItem from './TituloItem.vue'

export default {
  props: {
    titles: [Object],
    element: Object,
    hoverable: {
      type: Boolean,
      default: true
    },
    responsiveSize: {
      type: Number,
      default: 800
    }
  },
  components: { TituloItem },
  emits: ['filaSeleccionada'],
  data() {
    return {
      etiqueta: null,
      isLargeDevice: true,
      indices: [0],
      hover: false,
      umbral: 604800, // 1 Semana en segundos
    }
  },
  updated() {
  },
  created() {

    for (let i = 2; i < this.titles.length; i++) {
      this.indices.push(i)
    }

    this.myEventHandler()

    window.addEventListener("resize", this.myEventHandler)
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
  mounted() {

  },
  computed: {
    getLabel() {
      let label

      if (this.element.estado > this.umbral) {
        label = { value: 'En plazo', severity: 'p-tag-success' }
      } else if (this.element.estado < 0) {
        label = { value: 'Cerrada', severity: 'p-tag-danger' }
      } else {
        label = { value: 'Finalizando', severity: 'p-tag-warning' }
      }

      return label
    },
    isClosed() {
      return this.getLabel.value == 'Cerrada'
    },
  },
  methods: {
    rowSelect() {
      this.$emit('filaSeleccionada', this.element)
    },
    myEventHandler() {
      this.isLargeDevice = window.innerWidth >= this.responsiveSize
    }
  }
}
</script>

<template>
  <div class="comision-item" :class="{ active: hover }" @mouseover="hover = hoverable" @mouseleave="hover = false"
    @click="rowSelect">
    <div v-if="isLargeDevice" class="flex">
      <TituloItem v-for="title in titles" ref="comisionRef" :title="title.campo != 'estado' ? element[title.campo] : ''"
        :styles="title.styles" :showIcon="false" :hoverable="false">
        <span v-if="title.campo == 'estado'" class="p-tag p-component" :class="getLabel.severity">
          <span class="p-tag-value">{{ getLabel.value }}</span>
        </span>
      </TituloItem>
    </div>
    <div v-else class="flex-wrap">
      <div class="col-12 titulo">
        <span>{{ titles[1].title }}: </span>
        <span class="negrita subrayado">{{ element[titles[1].campo] }}</span>
      </div>
      <div class="col-12">
        <ul>
          <li v-for="i in indices">
            <span class="negrita">{{ titles[i].title }}:</span>
            <span class="ml-2" :class="{ rojo: isClosed && (titles[i].campo == 'estado') }">
              {{ (titles[i].campo != 'estado') ? element[titles[i].campo] : getLabel.value }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.active {
  background-color: #e9ecef !important;
}

.comision-item {
  border: 1px solid #e9ecef;
  border-width: 0 0 1px 0;
  color: #495057;
  background-color: white;
}

.negrita {
  color: #495057;
  font-weight: 600;
}

.titulo {
  text-align: center;
  padding-top: 1rem;
}

.subrayado {
  text-decoration: underline;
}

.rojo {
  color: red;
}
</style>