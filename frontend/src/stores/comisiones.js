import { defineStore } from 'pinia'
import comisionesJSON from '@/assets/datosComisionesReduc.json'


export const useComisionesStore = defineStore('comisiones', {
  state: () => ({
    listaComisiones: null,
    cambio: true
  }),
  getters: {
  },
  actions: {
    initLista() {
      if (!this.listaComisiones) {
        this.listaComisiones = comisionesJSON
      }
    },
    getComisiones() {
      if (!this.listaComisiones) {
        this.initLista()
      }
      return this.listaComisiones
    },
    setComisiones(comisiones) {
      this.listaComisiones = comisiones
    },
    setComision(comision) {

      let index = this.listaComisiones.findIndex(c => c.id == comision.id)
      if (index >= 0) {
        this.listaComisiones[index] = comision
      } else {
        index = 0
        this.listaComisiones.forEach(c => {
          index = c.id > index ? c.id : index
        })
        comision.id = ++index
        this.listaComisiones.push(comision)
      }

    }
  },
})