<script>

export default {
  props: {
    title: String,
    styles: String,
    showIcon: Boolean,
    iconClass: {
      type: String,
      default: ''
    },
    hoverable: Boolean,
  },
  emits: ['filterChange'],
  data() {
    return {
      hover: false
    }
  },
  methods: {
    click(event){
      this.$emit('filterChange', this.title)
    },
  }
}
</script>

<template>
  <div ref="titleContainer" class="p-3 flex-1 flex flex-nowrap m-auto" :class="{ active: hover }" @mouseover="hover = hoverable"
      @mouseleave="hover = false" :style="styles" @click="click">
    <span>{{ title }}</span>
    <slot></slot>
    <i v-if="showIcon" :class="iconClass" />
  </div>
</template>

<style scoped>

.active {
  background: #e9ecef;
}

div {
  user-select: none;
}

i {
  color: #6c757d;
  margin-left: 0.5rem;
}

</style>