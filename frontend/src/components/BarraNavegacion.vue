<script>
import { mapActions, mapState } from 'pinia'
// import { useComisionesStore } from '@/stores/comisiones'

export default {
  props: [],
  components: {},
  emits: [],
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
    //    ...mapActions(useComisionesStore, ['getComisiones', 'setComision']),
    muestraMenuLogout(event) {
      this.$refs.menu.toggle(event);
    },
    linkAdmin() {
      console.log("click en admin")
    }
  }
}
</script>

<template>
  <div class="card relative z-2">
    <div class="p-menubar p-component">
      <div class="p-menubar-start logo">
        <img alt="logo" src="/src/assets/sc.png" class="mr-2" height="40">
        <span class="texto-logo">ServiComs</span>
      </div>

      <div class="p-menubar-end">
        <!-- <span>Carlos Moreno</span> -->
        <!-- <Button icon="pi pi-user" severity="info" rounded outlined @click="muestraMenuLogout" />
        <Menu ref="menu" :model="items" :popup="true" /> -->
        <!-- <div class="dropdown"> -->
        <a class="" href="#" role="button" data-bs-toggle="dropdown">
          <Button icon="pi pi-user" severity="info" rounded outlined />
        </a>

        <ul class="dropdown-menu dropdown-menu-end p-menu-overlay p-menu p-component">
          <li class="p-submenu-header" role="none">Login</li>
          <li><hr class="dropdown-divider"></li>
          <li class="p-menuitem" @click="linkAdmin">
            <div class="p-menuitem-content">
              <a class="p-menuitem-link" tabindex="-1">
                <span class="p-menuitem-icon pi pi-fw pi-user"></span>
                <span class="p-menuitem-text">Admin</span>
              </a>
            </div>
          </li>
          <li class="p-menuitem">
            <div class="p-menuitem-content">
              <a class="p-menuitem-link" tabindex="-1">
                <span class="p-menuitem-icon pi pi-fw pi-users"></span>
                <span class="p-menuitem-text">User</span>
              </a>
            </div>
          </li>

        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Odibee+Sans&display=swap');

.logo {
  display: flex;
  align-items: center;
}

.texto-logo {
  font-family: 'Odibee Sans', cursive;
  font-size: 2rem;
}
</style>