<script>
import { mapActions, mapState } from 'pinia'
import { useUsuariosStore } from '@/stores/usuarios'

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
    ...mapState(useUsuariosStore, [ 'getUsuarioLogeado', 'isUserLoggedIn', 'isUserAdmin' ]),
    isLoggedIn() {
      return this.isUserLoggedIn
    },
    isAdmin() {
      return this.isUserAdmin
    },
    nombre() {
      return this.getUsuarioLogeado.nombre
    }
  },
  methods: {
    ...mapActions(useUsuariosStore, ['userLogin', 'userLogout']),
    muestraMenuLogout(event) {
      this.$refs.menu.toggle(event);
    },
    login(role) {
      if (role == "admin") {
        this.userLogin(4) // El usuario 4 es es administrador en los datos de prueba
      } else {
        this.userLogin(Math.floor(Math.random() * 3) + 1) // Selecciona cualquier usuario (1-3) no admin aleatoriamente
      }
    },
    logout() {
      this.userLogout()
      this.$router.push({ name: "comisiones" })
    },
    goHome() {
      this.$router.push({ name: "comisiones" })
    },
    misComisiones() {
      this.$router.push({ name: "miscomisiones" })

    }
  }
}
</script>

<template>
  <div class="card relative z-2">
    <div class="p-menubar p-component">
      <div class="p-menubar-start logo">
        <router-link :to="{ name: 'comisiones' }">
          <img alt="logo" src="/src/assets/sc.png" class="mr-2" height="40">
        </router-link>
        <span class="texto-logo">ServiComs</span>
      </div>

      <div class="p-menubar-end">
        <a class="" href="#" role="button" data-bs-toggle="dropdown">
          <Button v-if="!isLoggedIn" label="Inicia Sesión" severity="info" size="small" />
          <Button v-else icon="pi pi-user" severity="warning" rounded />
        </a>

        <div class="dropdown-menu dropdown-menu-end p-menu-overlay p-menu p-component">
          <ul v-if="!isLoggedIn">
            <li class="p-submenu-header flex" role="none">
              <div class="">
                <i class="pi pi-sign-in mr-3" style="font-size: 1.5rem" />
              </div>
              <div class="flex flex-column justify-content-center">
                <span class="font-bold">Login</span>
              </div>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li class="p-menuitem" @click="login('admin')">
              <div class="p-menuitem-content">
                <a class="p-menuitem-link" tabindex="-1">
                  <span class="p-menuitem-icon pi pi-fw pi-user"></span>
                  <span class="p-menuitem-text">Admin</span>
                </a>
              </div>
            </li>
            <li class="p-menuitem" @click="login('notAdmin')">
              <div class="p-menuitem-content">
                <a class="p-menuitem-link" tabindex="-1">
                  <span class="p-menuitem-icon pi pi-fw pi-users"></span>
                  <span class="p-menuitem-text">User</span>
                </a>
              </div>
            </li>
          </ul>

          <ul v-if="isLoggedIn">
            <li class="p-submenu-header flex" role="none">
              <div class="">
                <i class="pi pi-user mr-3" style="font-size: 1.5rem" />
              </div>
              <div class="flex flex-column justify-content-center">
                <span class="font-bold">{{ nombre }}</span>
                <span class="text-sm">{{ isAdmin ? "Admin" : "Usuario" }}</span>
              </div>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li class="p-menuitem" @click="misComisiones">
              <div class="p-menuitem-content">
                <a class="p-menuitem-link" tabindex="-1">
                  <!-- <span class="p-menuitem-icon pi pi-fw pi-user"></span> -->
                  <span class="p-menuitem-text">Mis Comisiones</span>
                </a>
              </div>
            </li>
            <li class="p-menuitem" @click="goHome">
              <div class="p-menuitem-content">
                <a class="p-menuitem-link" tabindex="-1">
                  <!-- <span class="p-menuitem-icon pi pi-fw pi-users"></span> -->
                  <span class="p-menuitem-text">Lista de comisiones</span>
                </a>
              </div>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li class="p-menuitem" @click="logout">
              <div class="p-menuitem-content">
                <a class="p-menuitem-link" tabindex="-1">
                  <span class="p-menuitem-icon pi pi-fw pi-sign-out"></span>
                  <span class="p-menuitem-text">Logout</span>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Michroma&display=swap');

.logo {
  display: flex;
  align-items: center;
}

.texto-logo {
  /* font-family: 'Odibee Sans', cursive; */
  font-family: 'Michroma', sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
}</style>