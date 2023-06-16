import { defineStore } from 'pinia'
import { getComisionesApi, postComisionApi, putComisionApi, deleteComisionApi,
  getComisionesPorUsuarioApi, getComisionApi, getStatsApi } from '@/stores/api-service'

export const useComisionesStore = defineStore('comision', {
  state: () => ({
    //loadingComisionesStore: false,
    queriesSinRespuesta: 0,
    erroredComisionesStore: false,
    listaComisiones: [],
    comisionSeleccionada: null,
    datosEstadisticos: { todas: { duracionMedia: NaN },
                          viogen: { duracionMedia: NaN },
                          extranjero: { duracionMedia: NaN }}
  }),
  getters: {
    loadingComisionesStore() {
      return this.queriesSinRespuesta > 0
    }
  },
  actions: {

    getComisiones() {
      this.initRequest()
      getComisionesApi().then((response) => {
        this.listaComisiones = response.data._embedded ? response.data._embedded.listaComisiones : []
        this.successfulEnding()
      })
        .catch((error) => this.processError(error))
    },
    getComisionesPorUsuario(usuario){
      this.initRequest()
      getComisionesPorUsuarioApi(usuario._links.self.href).then((response) => {
        this.listaComisiones = response.data._embedded ? response.data._embedded.listaComisiones : []
        this.successfulEnding()
      })
        .catch((error) => this.processError(error))
    },
    saveComision(comision) {
      this.initRequest()
      postComisionApi(comision).then((response) => {
        this.listaComisiones.push(response.data)
        this.successfulEnding()
      })
        .catch((error) => this.processError(error))
    },
    seleccionaComision(comisionLink) {
      let index = this.listaComisiones.findIndex((c) => c._links.self.href == comisionLink)
      this.comisionSeleccionada = (index > -1) ? this.listaComisiones[index] : null
      this.initRequest()
      getComisionApi(comisionLink).then((response) => {
        response.data.fechaLimite = new Date(response.data.fechaLimite)
        this.comisionSeleccionada = response.data
        this.successfulEnding()
      })
        .catch((error) => this.processError(error))
    },
    editComision(comision) {
      this.initRequest()

      let body = (({ puesto, localidad, especialidad, empleo, fechaLimite, duracion, detalles, tipo, riesgo, perfil }) =>
        ({ puesto, localidad, especialidad, empleo, fechaLimite, duracion, detalles, tipo, riesgo, perfil }))(comision)

        putComisionApi(comision._links.self.href, body).then((response) => {
        this.comisionSeleccionada = response.data
        this.comisionSeleccionada.fechaLimite = new Date(this.comisionSeleccionada.fechaLimite)
        this.successfulEnding()
      })
        .catch((error) => this.processError(error))
    },
    removeComision(comision) {
      this.initRequest()
      deleteComisionApi(comision._links.self.href).then((response) => {
        let indexToRemove = this.listaComisiones.indexOf(comision)
        if (indexToRemove > -1) this.listaComisionesCompleta.splice(indexToRemove, 1)
        this.comisionSeleccionada = null
        this.successfulEnding()
      })
        .catch((error) => this.processError(error))
    },
    getDuracionMedia(tipoComision) {
      this.initRequest()
      getStatsApi(tipoComision == 'todas' ? '' : ('tipo=' + tipoComision.toUpperCase())).then((response) => {
        this.datosEstadisticos[tipoComision].duracionMedia = parseInt(response.data.duracionMedia).toFixed(1)
        this.successfulEnding()
      })
        .catch((error) => this.processError(error))
    },
    getDatosEstadisticos() {
      ['todas', 'extranjero', 'viogen'].forEach(tipo => this.getDuracionMedia(tipo))
    },

    initRequest() {
      //this.loadingComisionesStore = true
      this.queriesSinRespuesta++
      this.erroredComisionesStore = false
    },
    successfulEnding() {
      if(this.queriesSinRespuesta > 0) {
        this.queriesSinRespuesta--
      }
      //this.resetEstadoComisionesStore()
    },
    processError(error) {
      this.erroredComisionesStore = true
    },
    resetEstadoComisionesStore() {
      //this.loadingComisionesStore = false
      this.queriesSinRespuesta = 0
      this.erroredComisionesStore = false
    },

  },
})