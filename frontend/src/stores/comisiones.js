import { defineStore } from 'pinia'
//import participantesJSON from '@/assets/participantes.json'
//import { getParticipantes } from './api-service'



export const useComisionesStore = defineStore('comisiones', {
  state: () => ({
    listaComisiones: ['comision1', 'comision2']
  }),
  getters: {
  },
  actions: {
    getComisiones() {
      return this.listaComisiones
    },
  },
})