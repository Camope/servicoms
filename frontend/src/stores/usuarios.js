import { defineStore } from 'pinia'
import { loginUsuarioApi, getUsuariosApi, getUsuarioPorLinkApi, postUsuarioApi, putUsuarioApi, patchUsuarioPasswordApi, deleteUsuarioApi } from '@/stores/api-service'
import { addFullName } from '@/js/utils'

export const useUsuariosStore = defineStore('usuarios', {
  state: () => {
    let usuarioGuardado = null
    if (localStorage.getItem("usuarioLogueado")) {
      usuarioGuardado = JSON.parse(localStorage.getItem("usuarioLogueado"))
    }
    return {
      loadingUsuariosStore: false,
      erroredUsuariosStore: false,
      listaUsuarios: [],
      usuarioLogueado: usuarioGuardado,
      usuarioSeleccionado: null
    }
  },
  getters: {
    isLoggedIn() {
      return this.usuarioLogueado ? true : false
    },
    isAdmin() {
      return this.isLoggedIn ? (this.usuarioLogueado.role == 'ADMIN') : false
    },
    isNotAdmin() {
      return this.isLoggedIn ? (this.usuarioLogueado.role == 'NO_ADMIN') : false
    }
  },
  actions: {

    loginUser(usuarioId) {
      this.initRequest()
      loginUsuarioApi(usuarioId).then((response) => {
        this.usuarioLogueado = response.data
        this.successfulEnding()
      })
        .catch((error) => this.processError(error))
    },

    getUsuarios() {
      this.initRequest()
      getUsuariosApi().then((response) => {
        this.listaUsuarios = response.data._embedded ? response.data._embedded.listaUsuarios : []
        this.listaUsuarios.forEach(u => addFullName(u))
        this.successfulEnding()
      })
        .catch((error) => this.processError(error))
    },

    seleccionaUsuario(usuarioUrl) {
      let index = this.listaUsuarios.findIndex((u) => u._links.self.href == usuarioUrl)
      this.usuarioSeleccionado = this.listaUsuarios[index]
      this.initRequest()
      getUsuarioPorLinkApi(usuarioUrl).then((response) => {
        addFullName(response.data)
        this.usuarioSeleccionado = response.data
        this.listaUsuarios[index] = response.data
        this.successfulEnding()
      })
        .catch((error) => this.processError(error))
    },

    saveUsuario(usuario) {
      this.initRequest()
      
      let body = (({ nombre, apellidos, tip, empleo, email, role, password }) =>
      ({ nombre, apellidos, tip, empleo, email, role, password }))(usuario)
      
      postUsuarioApi(body).then((response) => {
        addFullName(response.data)
        this.listaUsuarios.push(response.data)
        this.successfulEnding()
      })
        .catch((error) => this.processError(error))
    },

    editaUsuario(usuario) {
      this.initRequest()
      
      let body = (({ nombre, apellidos, tip, empleo, email, role }) =>
      ({ nombre, apellidos, tip, empleo, email, role }))(usuario)
      
      putUsuarioApi(usuario._links.self.href, body).then((response) => {
        addFullName(response.data)
        let index = this.listaUsuarios.findIndex((u) => u._links.self.href == response.data._links.self.href)
        this.listaUsuarios[index] = response.data
        this.successfulEnding()
      })
        .catch((error) => this.processError(error))
    },

    changePassword(usuario) {
      this.initRequest()
      patchUsuarioPasswordApi(usuario._links.self.href, usuario.password).then((response) => {
        this.successfulEnding()
      })
        .catch((error) => this.processError(error))
    },

    removeUser(user) {
      this.initRequest()
      deleteUsuarioApi(user._links.self.href).then((response) => {
        let indexToRemove = this.listaUsuarios.findIndex((u) => u._links.self.href == user._links.self.href)
        if (indexToRemove > -1) this.listaUsuarios.splice(indexToRemove, 1)
        this.usuarioSeleccionado = null
        this.successfulEnding()
      })
        .catch((error) => this.processError(error))
    },

    initRequest() {
      this.loadingUsuariosStore = true
      this.erroredUsuariosStore = false
    },
    successfulEnding() {
      this.resetEstadoUsuariosStore()
    },
    processError(error) {
      this.erroredUsuariosStore = true
    },
    resetEstadoUsuariosStore() {
      this.loadingUsuariosStore = false
      this.erroredUsuariosStore = false
    },
    logoutUser() {
      this.usuarioLogueado = null
      this.solicitudes = []
    },
  },
})