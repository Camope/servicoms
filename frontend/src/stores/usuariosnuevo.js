import { defineStore } from 'pinia'
import { getUsuarioIdApi, getUsuariosPorComisionApi, getUsuarioPorIdApi, getSolicitudesPorUsuarioApi,
          getComisionIdApi, postSolicitudApi, getSolicitudIdApi, deleteSolicitudApi } from '@/stores/api-service'

export const useUsuariosNuevoStore = defineStore('usuariosnuevo', {
  state: () => {
    let usuarioGuardado = null
    if (localStorage.getItem("usuarioLogueado")) {
      usuarioGuardado = JSON.parse(localStorage.getItem("usuarioLogueado"))
    }
    return {
      userLoading: false,
      userErrored: false,
      listaUsuarios: [],
      usuarioLogueado: usuarioGuardado,
      solicitudes: [],
    }
  },
  getters: {
    isLoggedIn() {
      return this.usuarioLogueado ? true : false
    },
    isAdmin() {
      return this.isLoggedIn ? (this.usuarioLogueado.role == 'ADMIN') : false
    },
  },
  actions: {
    // ******** API REQUESTS ******** //

    getUsuarioPorId(usuarioId) {
      this.initRequest()
      getUsuarioPorIdApi(usuarioId).then((response) => {
        this.usuarioLogueado = response.data
        this.userLoading = false
      })
        .catch((error) => this.processError(error))
    },
    getUsuariosPorComision(comisionId) {
      this.initRequest()
      getUsuariosPorComisionApi(comisionId).then((response) => {
        this.listaUsuarios = response.data._embedded ? response.data._embedded.listaUsuarios : []
        this.listaUsuarios.forEach(u => { u.nombreCompleto = u.nombre + " " + u.apellidos })
        this.userLoading = false
      })
        .catch((error) => this.processError(error))
    },
    getSolicitudesPorUsuario(usuarioId = this.getUserId()) {
      this.initRequest()
      getSolicitudesPorUsuarioApi(usuarioId).then((response) => {
        this.solicitudes = response.data._embedded ? response.data._embedded.listaSolicitudes : []
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
        console.log('respuesta:', response.data)

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
      this.userLoading = true
      this.userErrored = false
    },
    logoutUser() {
      this.usuarioLogueado = null
      this.solicitudes = []
    },
    getUserId(user = this.usuarioLogueado) {
      return getUsuarioIdApi(user._links.self.href)
    },
    isApplicant(comisionId) {
      return this.solicitudes.some((s) => getComisionIdApi(s._links.comision.href) == comisionId)
    },
    getSolicitud(comisionId) {
      let solicitud = this.solicitudes.find((s) => getComisionIdApi(s._links.comision.href) == comisionId)
      return solicitud ? solicitud : null
    }
  },
})