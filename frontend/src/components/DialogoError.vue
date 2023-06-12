<script>

export default {
  props: {
    visible: {
      type: Boolean,
      default: true
    },
  },
  components: {},
  emits: [ 'update:visible' ],
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
  },
  computed: {
  },
  methods: {
    update(event) {
      this.$emit('update:visible', event)
    }
  }
}
</script>

<template>
   <Dialog :visible="visible" :style="{ width: '450px', margin: '0.75rem' }" header="Información" :modal="true" @update:visible="update" >
      <div>
        <span class="texto-rojo">¡Error de comunicación!</span>
      </div>
      <div>
        <span>En este momento no es posible contactar con el servidor, inténtelo pasado unos minutos.</span>
      </div>
    </Dialog>
</template>

<style scoped>

.texto-rojo {
  color: red;
}
</style>