<script>

export default {
  props: {
    showButton: {
      type: Boolean,
      default: false
    },
    buttonLabel: {
      type: String,
      default: 'Nuevo'
    },
    title : {
      type: String,
      default: ''
    }
  },
  components: {},
  emits: ['click', 'search'],
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
    click(event) {
      this.$emit('click', event)
    },
    search(event) {
      this.$emit('search', event)
    }
  }
}
</script>

<template>
  <div class="card p-panel p-component">
    <div class="p-panel-header flex-wrap grid-nogutter">
      <div class="md:col-3 col-6 flex flex-order-1 md:flex-order-0 p-0 justify-content-start align-items-center">
        <Button v-if="showButton" :label="buttonLabel" icon="pi pi-plus" severity="success" @click="click" />
      </div>
      <div
        class="md:col-6 col-12 flex flex-order-0 md:flex-order-1 p-2 justify-content-center align-items-center p-panel-title">
        <span>{{ title }}</span>
      </div>
      <div class="md:col-3 col-6 flex flex-order-2 md:flex-order-2 p-0 justify-content-end align-items-center">
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <input class="p-inputtext p-component" placeholder="Buscar..." style="max-width: 40vw;"
            @input="search($event.target.value)" />
        </span>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped></style>