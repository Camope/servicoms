import { defineStore } from 'pinia'
import { getComisionesApi, postComisionesApi, getComisionIdApi,
          putComisionApi, deleteUrlApi, getComisionesPorUsuarioApi, getUsuarioIdApi, getUrlApi } from '@/stores/api-service'

export const useComisionesStore = defineStore('comision', {
  state: () => ({
    loading: false,
    errored: false,
    listaComisiones: [],
    comisionSeleccionada: null,
  }),
  getters: {
  },
  actions: {
    // ******** API REQUESTS ******** //
    // Solicitud del listado completo de comisiones
    getComisiones() {
      this.initRequest()
      getComisionesApi().then((response) => {
        this.listaComisiones = response.data._embedded ? response.data._embedded.listaComisiones : []
        this.loading = false
      })
        .catch((error) => this.processError(error))
    },
    getComisionesPorUsuario(usuario){
      this.initRequest()
      getComisionesPorUsuarioApi(getUsuarioIdApi(usuario._links.self.href)).then((response) => {
        this.listaComisiones = response.data._embedded ? response.data._embedded.listaComisiones : []
        this.loading = false
      })
        .catch((error) => this.processError(error))
    },
    saveComision(comision) {
      this.initRequest()
      postComisionesApi(comision).then((response) => {
        this.listaComisiones.push(response.data)
        this.loading = false
      })
        .catch((error) => this.processError(error))
    },
    seleccionaComision(comisionLink) {
      let index = this.listaComisiones.findIndex((c) => c._links.self.href == comisionLink)
      console.log('index: ', index)
      this.comisionSeleccionada = (index > -1) ? this.listaComisiones[index] : null
      //console.log(this.usuarioSeleccionado)
      this.initRequest()
      getUrlApi(comisionLink).then((response) => {
        response.data.fechaLimite = new Date(response.data.fechaLimite)
        this.comisionSeleccionada = response.data
        console.log('comision recuperada')
        console.log(this.comisionSeleccionada)
        this.loading = false
      })
        .catch((error) => this.processError(error))
    },
    editComision(comision) {
      this.initRequest()

      let body = (({ puesto, localidad, especialidad, empleo, fechaLimite, duracion, detalles, tipo, riesgo, perfil }) =>
        ({ puesto, localidad, especialidad, empleo, fechaLimite, duracion, detalles, tipo, riesgo, perfil }))(comision)

      putComisionApi(comision, this.getComisionId(comision)).then((response) => {
        this.comisionSeleccionada = response.data
        this.comisionSeleccionada.fechaLimite = new Date(this.comisionSeleccionada.fechaLimite)
        this.loading = false
      })
        .catch((error) => this.processError(error))
    },
    removeComision(comision) {
      this.initRequest()
      deleteUrlApi(comision._links.self.href).then((response) => {
        let indexToRemove = this.listaComisiones.indexOf(comision)
        if (indexToRemove > -1) this.listaComisionesCompleta.splice(indexToRemove, 1)
        this.comisionSeleccionada = null
        this.loading = false
      })
        .catch((error) => this.processError(error))
    },
    // ******** FUNCIONES AUXILIARES ******** //
    initRequest() {
      this.loading = true
      this.errored = false
    },
    processError(error) {
      console.log(error.message)
      this.errored = true
    },
    resetEstados() {
      this.loading = false
      this.errored = false
    },
    getComisionId(comision) {
      return getComisionIdApi(comision._links.self.href)
    },
    updateListaComisiones(usuario) {
      if (usuario) {
        this.getComisionesPorUsuario(usuario)
      } else {
        this.getComisiones()
      }
    },
    // ******** FUNCIONES DE BÚSQUEDA Y ORDENACIÓN ******** //
    /**
    * sortListaComisiones(data, reverse) ordena un array de objetos en función de
    * del atributo indicado en data y en el orden indicado en reverse, orden ascendente
    * (reverse=false) o descendente (reverse=true)
    *
    * @param {(String||Number)} data
    * @param { Boolean } reverse
    */
    sortListaComisiones(data, reverse) {
      if (typeof this.listaComisiones[0][data] == 'string') {
        this.listaComisiones.sort((a, b) => {
          let result
          result = a[data].localeCompare(b[data])
          return reverse ? -result : result
        })
      } else if (typeof this.listaComisiones[0][data] == 'number') {
        this.listaComisiones.sort((a, b) => {
          let result
          result = a[data] - b[data]
          return reverse ? -result : result
        })
      }
    },

    searchInListaComisiones(word, fields) {
      this.listaComisiones = this.listaComisionesCompleta.filter(c => {
        for (const field of fields) {
          if (typeof c[field] === 'string' || c[field] instanceof String) {
            if (c[field].toLowerCase().includes(word.toLowerCase())) {
              return true
            }
          }
        }
        return false
      })
    },
  },
})