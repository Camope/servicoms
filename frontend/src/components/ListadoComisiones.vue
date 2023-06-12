<script>

import { mapActions, mapState } from 'pinia'
import { useComisionesStore } from '@/stores/comisiones'
import { useUsuariosStore } from '@/stores/usuarios'
import { useSolicitudesStore } from '@/stores/solicitudes'
import FormularioComision from '@/components/FormularioComision.vue'
import Lista from '@/components/listado/Lista.vue'
import DialogoError from '@/components/DialogoError.vue'
import PanelTitulado from '@/components/PanelTitulado.vue'

export default {
  props:
  {
    filtrar: {
      type: Boolean,
      default: false
    }
  },
  components: { FormularioComision, Lista, DialogoError, PanelTitulado },
  emits: [],
  data() {
    return {
      mostrarFormulario: false,
      enviar: false,
      palabraBuscada: '',
      configList: [{ campo: 'empleo', title: 'Empleo', styles: 'max-width: 10rem;' },
      { campo: 'puesto', title: 'Vacante', styles: '' },
      { campo: 'especialidad', title: 'Especialidad', styles: '' },
      { campo: 'localidad', title: 'Localidad', styles: '' },
      { campo: 'estado', title: 'Estado', styles: 'max-width: 10rem; justify-content: center;' }],
      camposDeBusqueda: ['puesto', 'empleo', 'especialidad', 'localidad'],
    }
  },
  updated() {
  },
  created() {
    this.getComisiones()
    if(this.filtrar){ 
      this.getSolicitudesPorUsuario(this.usuarioLogueado._links.self.href)
    }
  },
  mounted() {
  },
  computed: {
    ...mapState(useUsuariosStore, ['usuarioLogueado', 'isLoggedIn', 'isAdmin']),
    ...mapState(useComisionesStore, ['listaComisiones', 'loadingComisionesStore', 'erroredComisionesStore']),
    mostrarLista() {
      return (this.listaComisiones.length > 0)
    },
    listaComisionesParaMostrar() {
      let listaComisionesFiltrada = this.listaComisiones

      if (this.filtrar) {
        listaComisionesFiltrada = listaComisionesFiltrada.filter(c => {
          return this.isApplicant(c._links.self.href)
        })
      }

      if (this.palabraBuscada != '') {
        listaComisionesFiltrada = this.listaComisionesFiltrada.filter(c => {
          for (const campo of this.camposDeBusqueda) {
            if (typeof c[campo] === 'string' || c[campo] instanceof String) {
              if (c[campo].toLowerCase().includes(this.palabraBuscada.toLowerCase())) {
                return true
              }
            }
          }
          return false
        })
      }

      return listaComisionesFiltrada
    }
  },
  methods: {
    ...mapActions(useComisionesStore, [ 'getComisiones', 'saveComision', 'resetEstadoComisionesStore', 'seleccionaComision' ]),
    ...mapActions(useSolicitudesStore, [ 'getSolicitudesPorUsuario', 'isApplicant' ]),
    nuevaComision() {
      this.mostrarFormulario = true
    },
    cerrarFormulario() {
      this.mostrarFormulario = false
    },
    guardarComision(data) {
      this.saveComision(data)
      this.cerrarFormulario()
    },
    seleccionarComision(comision) {
      if (!this.loadingComisionesStore) {
        this.seleccionaComision(comision._links.self.href)
        this.$router.push({ name: 'detallecomision' })
      }
    },
    buscar(palabra) {
      this.palabraBuscada = palabra
    },
    gestionarErrores(event) {
      if (!event) this.resetEstadoComisionesStore()
    }
  }
}
</script>

<template>
  <div>

    <PanelTitulado :title="filtrar ? 'Mis Solicitudes' : 'Comisiones Publicadas'" :show-button="isAdmin"
      button-label="Nueva" @click="nuevaComision" @search="buscar">
      <ProgressSpinner v-if="loadingComisionesStore" :class="['spinner-6', { 'overlay-spinner': mostrarLista }]" />
      <Lista v-if="mostrarLista" :elements="listaComisionesParaMostrar" :titles="configList"
        @row-click="seleccionarComision" />
    </PanelTitulado>

    <!-- Formulario para crear una nueva comisión -->
    <FormularioComision v-if="mostrarFormulario" @cancelar="cerrarFormulario"
      @guardar="guardarComision" />

    <!-- Diálogo de Error -->
    <DialogoError :visible="erroredComisionesStore" @update:visible="gestionarErrores" />

  </div>
</template>

<style scoped>
.spinner-6 {
  width: 6rem;
  height: 6rem;
}

.overlay-spinner {
  position: absolute;
  top: calc(50% - 3rem);
  left: calc(50% - 3rem);
}
</style>