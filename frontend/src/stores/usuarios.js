import { defineStore } from 'pinia'
import usuariosJSON from '@/assets/datosUsuarios.json'


export const useUsuariosStore = defineStore('usuarios', {
  state: () => ({
    listaUsuarios: null,
    usuarioLogueado: undefined,
  }),
  getters: {
    getUsuarioLogeado() {
      return this.usuarioLogueado
    },
    isUserLoggedIn() {
      return !(this.usuarioLogueado == undefined)
    },
    isUserAdmin() {
      if (this.isUserLoggedIn) {
        return this.usuarioLogueado.role == "admin"
      }
      return false
    },
  },
  actions: {
    initLista() {
      if (!this.listaUsuarios) {
        this.listaUsuarios = usuariosJSON
      }
    },
    getUsuarios() {
      if (!this.listaUsuarios) {
        this.initLista()
      }
      return this.listaUsuarios
    },
    getUsuarioPorId(usuarioId) {
      return this.getUsuarios().find(usuario => usuario.id == usuarioId)
    },
    getSolicitantesPorComision(comisionId) {
      return (this.getUsuarios().filter(s => {
        return s.solicitudes.findIndex(id => id == comisionId) >= 0
      }))
    },
    userLogin(id) {
      this.usuarioLogueado = this.getUsuarioPorId(id)
      return this.isUserLoggedIn
    },
    userLogout() {
      this.usuarioLogueado = undefined
    },
    addSolicitud(comisionId) {
      if (this.isUserLoggedIn) {
        if (this.getUsuarioLogeado.solicitudes.findIndex(id => id == comisionId) < 0) {
          this.getUsuarioLogeado.solicitudes.push(comisionId)
          return true
        }
      }
      return false
    },
    removeSolicitud(comisionId) {
      if (this.isUserLoggedIn) {
        let index = this.getUsuarioLogeado.solicitudes.findIndex(id => id == comisionId)
        if (index >= 0) {
          this.getUsuarioLogeado.solicitudes.splice(index, 1)
          return true
        }
      }
      return false
    },
    isSolicitante(comisionId) {
      if (this.isUserLoggedIn) {
        return this.getUsuarioLogeado.solicitudes.findIndex(id => id == comisionId) >= 0
      }
      return false
    }
  },
})