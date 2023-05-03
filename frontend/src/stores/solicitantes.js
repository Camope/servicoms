import { defineStore } from 'pinia'
import solicitantesJSON from '@/assets/datosSolicitantes.json'


export const useSolicitantesStore = defineStore('solicitantes', {
  state: () => ({
    listaSolicitantes: null,
  }),
  getters: {
  },
  actions: {
    initLista() {
      if (!this.listaSolicitantes) {
        this.listaSolicitantes = solicitantesJSON
      }
    },
    getSolicitantes() {
      if (!this.listaSolicitantes) {
        this.initLista()
      }
      return this.listaSolicitantes
    },
    getSolicitantesPorComision(comisionId) {
      if (!this.listaSolicitantes) {
        this.initLista()
      }
      return (this.listaSolicitantes.filter(s => {
        return s.comisiones.findIndex(id => id == comisionId) >= 0
      }))
    },
    addSolicitante(solicitante, comisionId) {

      let solicitanteTemp = { ...solicitante }
      solicitanteTemp.comsion_id = comisionId
      this.listaSolicitantes.push(solicitanteTemp)

    }
  },
})