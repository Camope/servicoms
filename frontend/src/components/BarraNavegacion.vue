<script>
import { mapActions, mapState } from 'pinia'
import { useUsuariosStore } from '@/stores/usuarios'
import { useSolicitudesStore } from '@/stores/solicitudes'
import MenuDesplegable from './MenuDesplegable.vue'

export default {
  props: [],
  components: { MenuDesplegable },
  emits: [],
  data() {
    return {
      logoutMenuTemplate: {
        header: { icon: 'pi-sign-in', name: 'Login', surname: '' },
        body: [{ divider: true, icon: 'pi-fw pi-user', text: 'Admin', clickMessage: 'adminLogin' },
        { divider: false, icon: 'pi-fw pi-users', text: 'User', clickMessage: 'userLogin' }]
      },
      loginMenuTemplate: {
        header: { icon: 'pi-user', name: '', surname: '' },
        body: [{ divider: true, icon: null, text: '', clickMessage: '' },
        { divider: false, icon: null, text: 'Lista de Comisiones', clickMessage: 'comisiones' },
        { divider: true, icon: 'pi-fw pi-sign-out', text: 'Logout', clickMessage: 'logout' },]
      },
      menuTemplate: null,
      muestraMenu: false,
    }
  },
  watch: {
    isLoggedIn(newLoginState) {
      if (newLoginState) {
        this.getSolicitudesPorUsuario(this.usuarioLogueado._links.self.href)
        this.configuraLoginMenuTemplate()
        this.menuTemplate = this.loginMenuTemplate
      } else {
        this.menuTemplate = this.logoutMenuTemplate
      }
    }
  },
  created() {
    if (this.isLoggedIn) {
      this.configuraLoginMenuTemplate()
    }
    this.menuTemplate = this.isLoggedIn ? this.loginMenuTemplate : this.logoutMenuTemplate
  },
  mounted() {
  },
  computed: {
    ...mapState(useUsuariosStore, ['usuarioLogueado', 'isLoggedIn', 'isAdmin']),
    nombre() {
      return this.isLoggedIn ? this.usuarioLogueado.nombre : ''
    }
  },
  methods: {
    ...mapActions(useUsuariosStore, ['loginUser', 'logoutUser']),
    ...mapActions(useSolicitudesStore, ['getSolicitudesPorUsuario']),
    configuraLoginMenuTemplate() {
      this.loginMenuTemplate.header.name = this.usuarioLogueado.nombre
      this.loginMenuTemplate.header.surname = this.isAdmin ? 'Admin' : 'Usuario'
      this.loginMenuTemplate.body[0].text = this.isAdmin ? 'Gestión Usuarios' : 'Mis Comisiones'
      this.loginMenuTemplate.body[0].clickMessage = this.isAdmin ? 'usuarios' : 'misComisiones'
    },
    login(role) {
      if (role == 'admin') {
        this.loginUser(1) // El usuario 1 es administrador en los datos de prueba
      } else {
        this.loginUser(Math.floor(Math.random() * 4) + 3 ) // Los usuarios 3 al 6 son normales en los datos de prueba
      }
      this.goHome()
    },
    logout() {
      this.logoutUser()
      this.goHome()
    },
    goHome() {
      this.$router.push({ name: 'comisiones' })
    },
    misComisiones() {
      this.$router.push({ name: 'miscomisiones' })
    },
    gestionUsuarios() {
      this.$router.push({ name: 'usuarios' })
    },
    seleccionarOpcion(opcion) {
      this.muestraMenu = false
      if (opcion == 'adminLogin') {
        this.login('admin')
      } else if (opcion == 'userLogin') {
        this.login('user')
      } else if (opcion == 'logout') {
        this.logout()
      } else if (opcion == 'comisiones') {
        this.goHome()
      } else if (opcion == 'miscomisiones') {
        this.misComisiones()
      } else if (opcion == 'usuarios') {
        this.gestionUsuarios()
      }

    }

  }
}
</script>

<template>
  <div class="card">
    <div class="p-menubar flex align-items-center justify-content-between">
      <div class="logo">
        <router-link :to="{ name: 'comisiones' }">
          <img alt="logo" src="/src/assets/sc.png" class="mr-2 imagen-logo" >
        </router-link>
        <span class="texto-logo">ServiComs</span>
      </div>

      <div @click="muestraMenu = !muestraMenu">
          <Button v-if="!isLoggedIn" label="Inicia Sesión" severity="info" size="small" />
          <Button v-else icon="pi pi-user" severity="warning" rounded />
      </div>

      <MenuDesplegable :visible="muestraMenu" :menuTemplate="menuTemplate" @selectMenuOption="seleccionarOpcion" />

      
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
  font-family: 'Michroma', sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
}

.imagen-logo {
  width: 2.5rem;
}

</style>