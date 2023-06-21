<script>
import { mapActions, mapState } from 'pinia'
import { useComisionesStore } from '@/stores/comisiones'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
  },
  emits: ['update:visible'],
  data() {
    return {
    }
  },
  watch: {
    visible(newVisibleState) {
      if (newVisibleState) {
        this.getDatosEstadisticos()
      }
    },
    erroredComisionesStore(newError) {
      this.update(false)
    }
  },
  computed: {
    ...mapState(useComisionesStore, ['datosEstadisticos', 'loadingComisionesStore', 'erroredComisionesStore']),
  },
  methods: {
    ...mapActions(useComisionesStore, ['getDatosEstadisticos']),
    formateaResultado(tipo, valor) {
      let resultadoFormateado = '- ' + tipo.charAt(0).toUpperCase() + tipo.slice(1) + ':'
      resultadoFormateado += (valor == 'NaN') ? ' No hay datos' : ` ${valor} meses`
      return resultadoFormateado
    },
    update(event) {
      if(!event) {
        this.$emit('update:visible', false);  
      }
    }
  }
}
</script>

<template>
  <Dialog :visible="visible" :style="{ width: '450px', margin: '0.75rem' }" header="Datos Estadísticos" :modal="true" @update:visible="update" >
    <ProgressSpinner v-if="loadingComisionesStore" :class="['spinner-6', { 'overlay-spinner': datosEstadisticos }]" />
    <div v-if="datosEstadisticos">
      <div><span class="texto-subrayado">Duración media:</span></div>
      <div v-for="(valor,tipo) in datosEstadisticos"><span>{{ formateaResultado(tipo, valor.duracionMedia) }}</span></div>
    </div>
  </Dialog>
</template>

<style scoped>
.spinner-6 {
  width: 6rem;
  height: 6rem;
}

.overlay-spinner {
  position: absolute;
  top: calc(50% - 3rem);
  left: calc(50% - 3rem);
}

.texto-subrayado {
  text-decoration: underline;
}
</style>