<script>
import { mapActions, mapState } from 'pinia'
import { useUsuariosStore } from '@/stores/usuarios'
import { useSolicitudesStore } from '@/stores/solicitudes'
import MenuDesplegable from '@/components/MenuDesplegable.vue'
import DialogoEstadistica from '@/components/DialogoEstadistica.vue'

export default {
  props: [],
  components: { MenuDesplegable, DialogoEstadistica },
  data() {
    return {
      logoutMenuTemplate: {
        header: { icon: 'pi-sign-in', name: 'Login', surname: '' },
        body: [{ divider: true, icon: 'pi-fw pi-user', text: 'Admin', clickMessage: 'adminLogin' },
        { divider: false, icon: 'pi-fw pi-users', text: 'User', clickMessage: 'userLogin' },
        { divider: true, icon: 'pi-fw pi-calculator', text: 'Estadísticas', clickMessage: 'estadisticas' }]
      },
      loginMenuTemplate: {
        header: { icon: 'pi-user', name: '', surname: '' },
        body: [{ divider: true, icon: null, text: '', clickMessage: '' },
        { divider: false, icon: null, text: 'Lista de Comisiones', clickMessage: 'comisiones' },
        { divider: true, icon: 'pi-fw pi-calculator', text: 'Estadísticas', clickMessage: 'estadisticas' },
        { divider: true, icon: 'pi-fw pi-sign-out', text: 'Logout', clickMessage: 'logout' }]
      },
      menuTemplate: null,
      dialogoEstadisticaVisible: false,
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
        this.loginUser(Math.floor(Math.random() * 4) + 3) // Los usuarios 3 al 6 son normales en los datos de prueba
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

      if (opcion == 'adminLogin') {
        this.login('admin')
      } else if (opcion == 'userLogin') {
        this.login('user')
      } else if (opcion == 'logout') {
        this.logout()
      } else if (opcion == 'comisiones') {
        this.goHome()
      } else if (opcion == 'misComisiones') {
        this.misComisiones()
      } else if (opcion == 'usuarios') {
        this.gestionUsuarios()
      } else if (opcion == 'estadisticas') {
        this.dialogoEstadisticaVisible = true
      }

    }
  },
  created() {
    if (this.isLoggedIn) {
      this.configuraLoginMenuTemplate()
    }
    this.menuTemplate = this.isLoggedIn ? this.loginMenuTemplate : this.logoutMenuTemplate
  },
}
</script>

<template>
  <div>
    <div class="card">
      <div class="p-menubar flex align-items-center justify-content-between">
        <div class="logo">
          <router-link :to="{ name: 'comisiones' }">
            <img alt="logo" src="/src/assets/sc.png" class="mr-2 imagen-logo">
          </router-link>
          <span class="texto-logo">ServiComs</span>
        </div>

        <div class="btn-group">
          <button type="button" class="p-button p-component p-button-sm p-button-info" data-bs-toggle="dropdown">
            <span v-if="isLoggedIn" class="p-button-icon pi pi-user"></span>
            <span v-else class="">Inicia Sesión</span>
          </button>
          <MenuDesplegable :menuTemplate="menuTemplate" @selectMenuOption="seleccionarOpcion" />
        </div>

      </div>
    </div>
    <DialogoEstadistica v-model:visible="dialogoEstadisticaVisible" />
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