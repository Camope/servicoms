import { defineStore } from 'pinia'
import { getUsuarioIdApi, getSolicitantesPorComisionApi, getUsuarioPorIdApi, getSolicitudesPorUsuarioApi,
          postSolicitudApi, getSolicitudIdApi, deleteSolicitudApi, getUsuariosApi,
          postUsuarioApi, getUrlApi, putUrlApi, patchUsuarioPasswordApi, deleteUrlApi } from '@/stores/api-service'

export const useUsuariosStore = defineStore('usuarios', {
  state: () => {
    let usuarioGuardado = null
    if (localStorage.getItem("usuarioLogueado")) {
      usuarioGuardado = JSON.parse(localStorage.getItem("usuarioLogueado"))
    }
    return {
      userLoading: false,
      userErrored: false,
      listaUsuarios: [],
      listaDeSolicitantes: [],
      usuarioLogueado: usuarioGuardado,
      solicitudes: [],
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
    // ******** API REQUESTS ******** //

    getUsuarios() {
      this.initRequest()
      getUsuariosApi().then((response) => {
        this.listaUsuarios = response.data._embedded ? response.data._embedded.listaUsuarios : []
        this.listaUsuarios.forEach(u => { u.nombreCompleto = u.nombre + " " + u.apellidos })
        this.userLoading = false
      })
        .catch((error) => this.processError(error))
    },
    seleccionaUsuario(usuarioUrl) {
      let index = this.listaUsuarios.findIndex((u) => u._links.self.href == usuarioUrl)
      console.log(index)
      this.usuarioSeleccionado = (index > -1) ? this.listaUsuarios[index] : null
      console.log(this.usuarioSeleccionado)
      this.initRequest()
      getUrlApi(usuarioUrl).then((response) => {
        //response.data.nombreCompleto = response.data.nombre + " " + response.data.apellidos
        this.usuarioSeleccionado = response.data
        this.userLoading = false
      })
        .catch((error) => this.processError(error))
    },
    LoginUser(usuarioId) {
      this.initRequest()
      getUsuarioPorIdApi(usuarioId).then((response) => {
        this.usuarioLogueado = response.data
        console.log("Logueado")
        console.log(this.usuarioLogueado)
        this.getSolicitudesPorUsuario()
      })
        .catch((error) => this.processError(error))
    },
    saveUsuario(usuario) {
      this.initRequest()
      
      let body = (({ nombre, apellidos, tip, empleo, email, role, password }) =>
      ({ nombre, apellidos, tip, empleo, email, role, password }))(usuario)
      
      postUsuarioApi(body).then((response) => {
        response.data.nombreCompleto = response.data.nombre + " " + response.data.apellidos
        this.listaUsuarios.push(response.data)
        console.log(this.listaUsuarios)
        this.userLoading = false
      })
        .catch((error) => this.processError(error))
    },
    editaUsuario(usuario) {
      this.initRequest()
      
      let body = (({ nombre, apellidos, tip, empleo, email, role }) =>
      ({ nombre, apellidos, tip, empleo, email, role }))(usuario)
      
      putUrlApi(usuario._links.self.href, body).then((response) => {
        response.data.nombreCompleto = response.data.nombre + " " + response.data.apellidos
        let index = this.listaUsuarios.findIndex((u) => u._links.self.href == response.data._links.self.href)
        console.log(index)
        this.listaUsuarios[index] = response.data
        console.log(this.listaUsuarios[index])
        this.userLoading = false
      })
        .catch((error) => this.processError(error))
    },
    changePassword(usuario) {
      this.initRequest()
      patchUsuarioPasswordApi(usuario._links.self.href, usuario.password).then((response) => {
        this.userLoading = false
      })
        .catch((error) => this.processError(error))
    },
    removeUser(user) {
      this.initRequest()
      deleteUrlApi(user._links.self.href).then((response) => {
        let indexToRemove = this.listaUsuarios.findIndex((u) => u._links.self.href == user._links.self.href)
        if (indexToRemove > -1) this.listaUsuarios.splice(indexToRemove, 1)
        this.usuarioSeleccionado = null
        this.userLoading = false
      })
        .catch((error) => this.processError(error))
    },
    getSolicitantesPorComision(comision) {
      this.initRequest()
      getSolicitantesPorComisionApi(comision._links.self.href).then((response) => {
        this.listaDeSolicitantes = response.data._embedded ? response.data._embedded.listaUsuarios : []
        this.listaDeSolicitantes.forEach(u => { u.nombreCompleto = u.nombre + " " + u.apellidos })
        this.userLoading = false
      })
        .catch((error) => this.processError(error))
    },
    getSolicitudesPorUsuario(usuarioLink = this.usuarioLogueado._links.self.href) {
      this.initRequest()
      console.log(usuarioLink)
      getSolicitudesPorUsuarioApi(usuarioLink).then((response) => {
        this.solicitudes = response.data._embedded ? response.data._embedded.listaSolicitudes : []
        console.log("obteniendo solicitudes")
        this.userLoading = false
      })
        .catch((error) => this.processError(error))
    },
    postSolicitud(comision, usuario = this.usuarioLogueado) {
      this.initRequest()
      postSolicitudApi(comision._links.self.href, usuario._links.self.href).then((response) => {
        this.solicitudes.push(response.data)
        console.log(response.data)
        this.userLoading = false
      })
        .catch((error) => this.processError(error))
    },
    removeSolicitud(solicitud) {
      this.initRequest()
      deleteSolicitudApi(getSolicitudIdApi(solicitud._links.self.href)).then((response) => {
        let indexToRemove = this.solicitudes.indexOf(solicitud)
        if (indexToRemove > -1) this.solicitudes.splice(indexToRemove, 1)
        this.userLoading = false
      })
        .catch((error) => this.processError(error))
    },

    // ******** FUNCIONES AUXILIARES ******** //
    initRequest() {
      this.userLoading = true
      this.userErrored = false
    },
    processError(error) {
      console.log(error.message)
      this.userErrored = true
    },
    resetUserEstados() {
      this.userLoading = false
      this.userErrored = false
    },
    logoutUser() {
      this.usuarioLogueado = null
      this.solicitudes = []
    },
    getUserId(user = this.usuarioLogueado) {
      return getUsuarioIdApi(user._links.self.href)
    },
    isApplicant(comisionLink) {
      return this.solicitudes.some((s) => s._links.comision.href == comisionLink)
    },
    getSolicitud(comisionLink) {
      let solicitud = this.solicitudes.find((s) => s._links.comision.href == comisionLink)
      return solicitud ? solicitud : null
    }
  },
})