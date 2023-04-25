import { defineStore } from 'pinia'
import comisionesJSON from '@/assets/datosComisiones.json'
//import { getParticipantes } from './api-service'



export const useComisionesStore = defineStore('comisiones', {
  state: () => ({
    listaComisiones: comisionesJSON
  }),
  getters: {

  },
  actions: {
    getComisiones() {
      return this.listaComisiones
    },
  },
})