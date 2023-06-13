<script>

import { mapActions, mapState } from 'pinia'
import { useUsuariosStore } from '@/stores/usuarios'
import { useComisionesStore } from '@/stores/comisiones'
import { useSolicitudesStore } from '@/stores/solicitudes'
import FormularioComision from '@/components/FormularioComision.vue'
import ListadoSolicitantes from '@/components/ListadoSolicitantes.vue'
import DialogoError from '@/components/DialogoError.vue'

export default {
  props: [],
  components: { FormularioComision, ListadoSolicitantes, DialogoError },
  emits: [],
  data() {
    return {
      preguntaConfirmacion: false,
      mostrarFormulario: false,
      confirmacionPendiente: false,
    }
  },
  created() {
    if (!this.comisionSeleccionada) {
      this.$router.push({ name: "comisiones" })
    }
    if (this.isNotAdmin) {
      this.getSolicitudesPorUsuario(this.usuarioLogueado._links.self.href)
    }
  },
  mounted() {
  },
  computed: {
    ...mapState(useUsuariosStore, ['usuarioLogueado', 'isLoggedIn', 'isAdmin', 'isNotAdmin']),
    ...mapState(useComisionesStore, ['comisionSeleccionada', 'loadingComisionesStore', 'erroredComisionesStore']),
    ...mapState(useSolicitudesStore, ['comisionLoading', 'comisionErrored']),
    fechaLimite() {
      let options = { year: 'numeric', month: 'long', day: 'numeric' }
      return this.comisionSeleccionada.fechaLimite ? this.comisionSeleccionada.fechaLimite.toLocaleDateString('es-ES', options) : ''
    },
    esSolicitante() {
      return !this.isAdmin && this.isApplicant(this.comisionSeleccionada._links.self.href)
    },
    muestraSolicitar() {
      return this.isNotAdmin && !this.isApplicant(this.comisionSeleccionada._links.self.href) && !this.loadingComisionesStore
    },
    muestraEditar() {
      return this.isAdmin && !this.loadingComisionesStore
    },
    muestraAnular() {
      return (this.isAdmin || this.esSolicitante) && !this.loadingComisionesStore
    },
    muestraListado() {
      return this.isAdmin && !this.loadingComisionesStore && this.comisionSeleccionada
    },
    mensajeEstado() {
      return this.esSolicitante ? '(Estado: solicitada)' : ''
    },
    mensajeConfirmacion() {
      return this.confirmacionPendiente && !this.loadingComisionesStore
    },
    tipoComision() {
      let mensaje

      if (this.comisionSeleccionada.tipo == 'VIOGEN') {
        mensaje = `Viogen (riesgo: ${this.comisionSeleccionada.riesgo})`
      }
      else if (this.comisionSeleccionada.perfil == 'EXTRANJERO') {
        mensaje = `Extranjero (perfil: ${this.comisionSeleccionada.perfil})`
      }
      else mensaje = 'Normal'

      return mensaje
    }
  },
  methods: {
    ...mapActions(useSolicitudesStore, ['getSolicitudesPorUsuario', 'postSolicitud', 'removeSolicitud', 'isApplicant', 'getSolicitud']),
    ...mapActions(useComisionesStore, ['seleccionaComision', 'editComision', 'removeComision', 'resetEstadoComisionesStore']),
    volver() {
      this.$router.go(-1)
    },
    solicitar() {
      this.postSolicitud(this.comisionSeleccionada, this.usuarioLogueado)
    },
    editar() {
      this.mostrarFormulario = true
    },
    cerrarFormulario() {
      this.mostrarFormulario = false
    },
    guardarCambios(data) {
      this.editComision(data)
      this.cerrarFormulario()
    },
    anular() {
      this.preguntaConfirmacion = true
    },
    confirma() {
      this.preguntaConfirmacion = false
      if (this.esSolicitante) {
        this.anulaSolicitud()
      } else {
        this.borrarComision()
      }
    },
    anulaSolicitud() {
      this.removeSolicitud(this.getSolicitud(this.comisionSeleccionada._links.self.href))
    },
    borrar() {
      this.removeComision(this.comisionSeleccionada)
      this.confirmacionPendiente = true
    },
    cerrarMensajeConfirmacion() {
      this.confirmacionPendiente = false
      this.volver()
    },
    gestionarErrores(event) {
      if (!event) {
        this.resetEstadoComisionesStore()
        this.volver()
      }
    },
  }
}
</script>

<template>
  <div>
    <div class="card">

      <Panel header="Datos de la comisión">

        <ProgressSpinner v-if="loadingComisionesStore" class="spinner-6 overlay-spinner" />
        <div v-if="comisionSeleccionada">
          <div>
            <div class="field col-12 encabezado">{{ comisionSeleccionada.puesto }} {{ mensajeEstado }}</div>
            <Divider />
            <ul>
              <li><span class="negrita">Empleo:</span><span class="ml-2">{{ comisionSeleccionada.empleo }}</span></li>
              <li>
                <span class="negrita">Especialidad:</span><span class="ml-2">{{ comisionSeleccionada.especialidad
                }}</span>
              </li>
              <li><span class="negrita">Localidad:</span><span class="ml-2">{{ comisionSeleccionada.localidad }}</span>
              </li>
              <li>
                <span class="negrita">Duración:</span>
                <span class="ml-2">{{ comisionSeleccionada.duracion }} {{ comisionSeleccionada.duracion > 1 ? "meses" :
                  "mes" }}</span>
              </li>
              <li><span class="negrita">Fecha límite solicitud:</span><span class="ml-2">{{ fechaLimite }}</span></li>
              <li><span class="negrita">Tipo:</span><span class="ml-2">{{ tipoComision }}</span></li>
              <li>
                <span class="negrita">Descripción:</span>
                <pre
                  class="p-component ml-3 mt-2">{{ comisionSeleccionada.detalles ? comisionSeleccionada.detalles : "" }}</pre>
              </li>
            </ul>
          </div>
          <div class="flex justify-content-around">
            <Button label="Volver" icon="pi pi-arrow-left" severity="secondary" text @click="volver" />
            <Button v-if="muestraSolicitar" label="Solicitar" icon="pi pi-check" severity="success" text
              @click="solicitar" />
            <Button v-if="muestraEditar" label="Editar" icon="pi pi-pencil" severity="success" text @click="editar" />
            <Button v-if="muestraAnular" label="Anular" icon="pi pi-times" severity="danger" text @click="anular" />
          </div>
        </div>
      </Panel>

      <ListadoSolicitantes v-if="muestraListado" :comision="comisionSeleccionada" />
    </div>

    <Dialog v-model:visible="preguntaConfirmacion" :style="{ width: '450px', margin: '0.75rem' }" header="Confirmación"
      :modal="true">
      <div>
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span>¿Seguro que quiere anular la {{ isAdmin ? "comisión" : "solicitud" }}?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="preguntaConfirmacion = false" />
        <Button label="Sí" icon="pi pi-check" text @click="confirma" />
      </template>
    </Dialog>

    <Dialog :visible="mensajeConfirmacion" :style="{ width: '450px', margin: '0.75rem' }" header="Información"
      :modal="true" @update:visible="cerrarMensajeConfirmacion">
      <div>
        <span class="texto-rojo">¡Su solicitud ha sido realizada!</span>
      </div>
    </Dialog>

    <DialogoError :visible="erroredComisionesStore" @update:visible="gestionarErrores" />

    <FormularioComision v-if="mostrarFormulario" :comision="comisionSeleccionada" @cancelar="cerrarFormulario"
      @guardar="guardarCambios" />


  </div>
</template>

<style scoped>
.encabezado {
  color: #495057;
  font-weight: 600;
  text-align: center;
  margin: 0;
}

.negrita {
  color: #495057;
  font-weight: 600;
}

.spinner-6 {
  width: 6rem;
  height: 6rem;
}

.overlay-spinner {
  position: absolute;
  top: calc(50% - 3rem);
  left: calc(50% - 3rem);
}

.texto-rojo {
  color: red;
}
</style>
