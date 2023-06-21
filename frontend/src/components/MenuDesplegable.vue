<script>

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    menuTemplate: {
      type: Object,
    },
  },
  emits: ['selectMenuOption'],
  data() {
    return {
    }
  },
}
</script>

<template>
  <ul class="dropdown-menu dropdown-menu-end p-menu-overlay p-menu p-component">
    <li class="p-submenu-header flex">
      <div>
        <i class="pi mr-3 large-icon" :class="menuTemplate.header.icon" />
      </div>
      <div class="flex flex-column justify-content-center">
        <span class="font-bold">{{ menuTemplate.header.name }}</span>
        <span class="text-sm">{{ menuTemplate.header.surname }}</span>
      </div>
    </li>
    <li v-for="item in menuTemplate.body" class="p-menuitem" @click="$emit('selectMenuOption', item.clickMessage)">
      <hr v-if="item.divider" class="dropdown-divider">
      <div class="p-menuitem-content">
        <div class="p-menuitem-link">
          <span v-if="item.icon" class="p-menuitem-icon pi" :class="item.icon"></span>
          <span class="p-menuitem-text">{{ item.text }}</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.menu-show {
  display: block;
  position: absolute;
  inset: 0px 0px auto auto;
  margin: 0px;
  transform: translate(-9px, 47px);
}

.large-icon {
  font-size: 1.5rem;
}
</style>