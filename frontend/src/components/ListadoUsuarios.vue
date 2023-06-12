<script>

import { mapActions, mapState } from 'pinia'
import { useUsuariosStore } from '@/stores/usuarios'
import FormularioUsuario from '@/components/FormularioUsuario.vue'
import Lista from '@/components/listado/Lista.vue'
import DialogoError from '@/components/DialogoError.vue'
import PanelTitulado from '@/components/PanelTitulado.vue'

export default {
  props: {

  },
  components: { FormularioUsuario, Lista, DialogoError, PanelTitulado },
  emits: [],
  data() {
    return {
      mostrarFormulario: false,
      enviar: false,
      nuevo: true,
      palabraBuscada: '',
      configList: [{ campo: 'tip', title: 'TIP', styles: 'max-width: 10rem; justify-content: center;' },
      { campo: 'nombreCompleto', title: 'Nombre', styles: '' },
      { campo: 'empleo', title: 'Empleo', styles: 'max-width: 10rem;' },
      { campo: 'email', title: 'e-mail', styles: '' }],
      camposDeBusqueda: ['tip', 'nombreCompleto', 'empleo', 'email'],
    }
  },
  updated() {
  },
  created() {
    this.getUsuarios()
  },
  mounted() {
  },
  computed: {
    ...mapState(useUsuariosStore, ['isAdmin', 'loadingUsuariosStore', 'erroredUsuariosStore', 'listaUsuarios', 'usuarioSeleccionado']),
    mostrarLista() {
      return (this.listaUsuarios.length > 0)
    },
    listaUsuariosParaMostrar() {

      let listaUsuariosFiltrada = this.listaUsuarios

      if (this.palabraBuscada != '') {
        listaUsuariosFiltrada = this.listaUsuarios.filter(c => {
          for (const campo of this.camposDeBusqueda) {
            if (typeof c[campo] === 'string' || c[campo] instanceof String) {
              if (c[campo].toLowerCase().includes(this.palabraBuscada.toLowerCase())) {
                return true
              }
            }
          }
          return false
        })
      }

      return listaUsuariosFiltrada
    }
  },
  methods: {
    ...mapActions(useUsuariosStore, ['getUsuarios', 'resetEstadoUsuariosStore', 'seleccionaUsuario', 'saveUsuario', 'editaUsuario', 'changePassword', 'removeUser']),
    nuevoUsuario() {
      this.nuevo = true
      this.mostrarFormulario = true
    },
    editarUsuario(usuario) {
      this.seleccionaUsuario(usuario._links.self.href)
      this.nuevo = false
      this.mostrarFormulario = true
    },
    cerrarFormulario() {
      this.mostrarFormulario = false
    },
    guardarUsuario(usuario) {
      this.cerrarFormulario()
      if (this.nuevo) {
        this.saveUsuario(usuario)  
      } else {
        this.editaUsuario(usuario)
        if (usuario.password) {
          this.changePassword(usuario)
        }
      }
    },
    borrarUsuario() {
      this.cerrarFormulario()
      this.removeUser(this.usuarioSeleccionado)
    },
    buscar(palabra) {
      this.palabraBuscada = palabra
    },
    gestionarErrores(visible) {
      if (!visible) this.resetEstadoUsuariosStore()
    },
  }
}
</script>

<template>
  <div>
    <PanelTitulado title="Lista de Usuarios" :show-button="isAdmin" button-label="Nuevo" @click="nuevoUsuario"
      @search="buscar">
      <ProgressSpinner v-if="loadingUsuariosStore" :class="['spinner-6', { 'overlay-spinner': mostrarLista }]" />
      <Lista v-if="mostrarLista" :elements="listaUsuariosParaMostrar" :titles="configList" @row-click="editarUsuario" />
    </PanelTitulado>

    <FormularioUsuario v-if="mostrarFormulario" :usuario="nuevo ? null : usuarioSeleccionado"
      @cancelar="cerrarFormulario" @guardar="guardarUsuario" @borrar="borrarUsuario"/>

    <!-- Diálogo de Error -->
    <DialogoError :visible="erroredUsuariosStore" @update:visible="gestionarErrores" />

  </div>
</template>

<style scoped>

.spinner-6 {
  width: 6rem;
  height: 6rem;
}
.overlay-spinner {
  position: absolute;
  top: calc(50% - 3rem);
  left: calc(50% - 3rem);
}
</style>