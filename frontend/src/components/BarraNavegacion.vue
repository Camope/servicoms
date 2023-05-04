<script>
import { mapActions, mapState } from 'pinia'
// import { useComisionesStore } from '@/stores/comisiones'

export default {
  props: [],
  components: {},
  emits: [],
  data() {
    return {
      items: [
        { separator: true },
        { label: 'Profile', icon: 'pi pi-fw pi-user' },
        { label: 'Settings', icon: 'pi pi-fw pi-cog' },
        { separator: true }
      ]
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
    }
  }
}
</script>

<template>
  <div class="card relative z-2">
    <div></div>
    <div class="p-menubar p-component">
      <div class="p-menubar-start logo">
        <img alt="logo" src="/src/assets/sc.png" class="mr-2" height="40">
        <span class="texto-logo">ServiComs</span>
      </div>
      <div class="p-menubar-end">
        <!-- <span>Carlos Moreno</span> -->
        <Button icon="pi pi-user" severity="info" rounded outlined @click="muestraMenuLogout" />
        <!-- <Menu ref="menu" :model="items" :popup="true" /> -->
        <!-- <div class="dropdown"> -->
          <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
            Dropdown link
          </a>

          <ul class="dropdown-menu" >
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>
      <!-- </div> -->
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