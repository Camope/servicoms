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
    ...mapState(useUsuariosStore, [ 'usuarioLogueado', 'isLoggedIn', 'isAdmin' ]),
    nombre() {
      return this.isLoggedIn ? this.usuarioLogueado.nombre : ''
    }
  },
  methods: {
    ...mapActions(useUsuariosStore, ['LoginUser', 'logoutUser']),
    // muestraMenuLogout(event) {
    //   this.$refs.menu.toggle(event);
    // },
    login(role) {
      if (role == "admin") {
        this.LoginUser(1) // El usuario 1 es es administrador en los datos de prueba
      } else {
        this.LoginUser(29) //this.userLogin(Math.floor(Math.random() * 3) + 1) // Selecciona cualquier usuario (1-3) no admin aleatoriamente
      }
      this.goHome()
    },
    logout() {
      this.logoutUser()
      this.goHome()
    },
    goHome() {
      this.$router.push({ name: "comisiones" })
    },
    misComisiones() {
      this.$router.push({ name: "miscomisiones" })

    },
    gestionUsuarios() {
      this.$router.push({ name: "usuarios" })

    }
  }
}
</script>

<template>
  <div class="card">
    <div class="p-menubar flex align-items-center justify-content-between">
      <div class="logo">
        <router-link :to="{ name: 'comisiones' }">
          <img alt="logo" src="/src/assets/sc.png" class="mr-2" height="40">
        </router-link>
        <span class="texto-logo">ServiComs</span>
      </div>

      <div class="">
        <a class="" href="#" role="button" data-bs-toggle="dropdown">
          <Button v-if="!isLoggedIn" label="Inicia Sesión" severity="info" size="small" />
          <Button v-else icon="pi pi-user" severity="warning" rounded />
        </a>

        <div class="dropdown-menu dropdown-menu-end p-menu-overlay p-menu p-component">
          <!-- Contenido que se mostrará cuando no hay usuario logueado -->
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
          <!-- Contenido que se mostrará cuando un usuario está logueado -->
          <ul v-if="isLoggedIn">
            <li class="p-submenu-header flex align-items-center" role="none">
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
                  <span class="p-menuitem-text">Mis Comisiones</span>
                </a>
              </div>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li class="p-menuitem" @click="gestionUsuarios">
              <div class="p-menuitem-content">
                <a class="p-menuitem-link" tabindex="-1">
                  <span class="p-menuitem-text">Gestión Usuarios</span>
                </a>
              </div>
            </li>
            <li class="p-menuitem" @click="goHome">
              <div class="p-menuitem-content">
                <a class="p-menuitem-link" tabindex="-1">
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
/* Fuente importada para el texto que acompaña al logo */
@import url('https://fonts.googleapis.com/css2?family=Michroma&display=swap');

.logo {
  display: flex;
  align-items: center;
}

.texto-logo {
  font-family: 'Michroma', sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
}


</style>