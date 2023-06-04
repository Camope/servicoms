<script>

export default {
  props: {
    title: String,
    styles: String,
    showIcon: Boolean,
    hoverable: Boolean,
  },
  components: {},
  emits: ['filterChange'],
  data() {
    return {
      iconList: ['pi-sort-alt', 'pi-sort-amount-up-alt', 'pi-sort-amount-down-alt'],
      iconClass: null,
      index: 0,
      hover: false
    }
  },
  updated() {
  },
  created() {
  },
  mounted() {
    this.iconClass = this.iconList[0]
  },
  computed: {
  },
  methods: {
    click(event){
      this.index = this.index == 2 ? 1 : 2
      this.iconClass = this.iconList[this.index]
      this.$emit('filterChange', this.title, this.index == 1)
    },
    resetIcon(){
      this.index = 0
      this.iconClass = this.iconList[0]
    },
  }
}
</script>

<template>
  <div ref="titleContainer" class="p-3 flex-1 flex flex-nowrap m-auto" :class="{ active: hover }" @mouseover="hover = hoverable"
      @mouseleave="hover = false" :style="styles" @click="click">
    <span>{{ title }}</span>
    <slot></slot>
    <i v-if="showIcon" class="pi" :class="iconClass" />
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