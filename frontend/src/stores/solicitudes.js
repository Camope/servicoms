import { defineStore } from 'pinia'
import { getSolicitantesPorComisionApi, getSolicitudesPorUsuarioApi, postSolicitudApi, deleteSolicitudApi } from '@/stores/api-service'
import { addFullName } from '@/js/utils'

export const useSolicitudesStore = defineStore('solicitudes', {
  state: () => ({
    loadingSolicitudesStore: false,
    erroredSolicitudesStore: false,
    listaDeSolicitantes: [],
    solicitudes: [],
  }),
  getters: {
  },
  actions: {

    getSolicitantesPorComision(comision) {
      this.initRequest()
      this.listaDeSolicitantes = []
      getSolicitantesPorComisionApi(comision._links.self.href).then((response) => {
        this.listaDeSolicitantes = response.data._embedded ? response.data._embedded.listaUsuarios : []
        this.listaDeSolicitantes.forEach(u => addFullName(u))
        this.successfulEnding()
      })
        .catch((error) => this.processError(error))
    },

    getSolicitudesPorUsuario(userLink) {
      this.initRequest()
      getSolicitudesPorUsuarioApi(userLink).then((response) => {
        this.solicitudes = response.data._embedded ? response.data._embedded.listaSolicitudes : []
        this.successfulEnding()
      })
        .catch((error) => this.processError(error))
    },

    postSolicitud(comision, usuario) {
      this.initRequest()
      let body = {comision: comision._links.self.href, usuario: usuario._links.self.href}
      postSolicitudApi(body).then((response) => {
        this.solicitudes.push(response.data)
        this.successfulEnding()
      })
        .catch((error) => this.processError(error))
    },

    removeSolicitud(solicitud) {
      this.initRequest()
      deleteSolicitudApi(solicitud._links.self.href).then((response) => {
        let indexToRemove = this.solicitudes.indexOf(solicitud)
        if (indexToRemove > -1) this.solicitudes.splice(indexToRemove, 1)
        this.successfulEnding()
      })
        .catch((error) => this.processError(error))
    },

    
    isApplicant(comisionLink) {
      return this.solicitudes.some((s) => s._links.comision.href == comisionLink)
    },
    getSolicitud(comisionLink) {
      let solicitud = this.solicitudes.find((s) => s._links.comision.href == comisionLink)
      return solicitud ? solicitud : null
    },
    initRequest() {
      this.loadingSolicitudesStore = true
      this.erroredSolicitudesStore = false
    },
    successfulEnding() {
      this.resetEstadoSolicitudesStore()
    },
    processError(error) {
      this.erroredSolicitudesStore = true
    },
    resetEstadoSolicitudesStore() {
      this.loadingSolicitudesStore = false
      this.erroredSolicitudesStore = false
    },
  },
})