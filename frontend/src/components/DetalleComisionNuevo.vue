<script>

import { mapActions, mapState } from 'pinia'
import { useUsuariosNuevoStore } from '@/stores/usuariosnuevo'
import { useComisionesNuevoStore } from '@/stores/comisionesnuevo'
import FormularioComision from './FormularioComision.vue'
import ListadoSolicitantesNuevo from './ListadoSolicitantesNuevo.vue'

export default {
  props: ['comisionId'],
  components: { FormularioComision, ListadoSolicitantesNuevo },
  emits: [],
  data() {
    return {
      comisionTemp: null,
      confirmacionAnulacion: false,
      preguntaConfirmacion: false,
      confirmacionSolicitud: false,
      mostrarFormulario: false,
      confirmacionPendiente: false,
    }
  },
  created() {
    this.getComisionPorId(this.comisionId)
    if (this.isLoggedIn && !this.isAdmin) {
      this.getSolicitudesPorUsuario()
    }
    console.log(this.comisionSeleccionada)
  },
  mounted() {

  },
  computed: {
    ...mapState(useUsuariosNuevoStore, ['usuarioLogueado', 'isLoggedIn', 'isAdmin']),
    ...mapState(useComisionesNuevoStore, ['comisionSeleccionada', 'loading', 'errored']),
    fecha() {
      let options = { year: 'numeric', month: 'long', day: 'numeric' }
      return this.comisionSeleccionada.fechaLimite.toLocaleDateString('es-ES', options)
    },
    esPublicador() {
      return true // Los administradores tendrán siempre rol de publicador
    },
    esSolicitante() {
      return this.isLoggedIn && !this.isAdmin && this.isApplicant(this.comisionId)
    },
    muestraSolicitar() {
      return this.isLoggedIn && !this.isAdmin && !this.isApplicant(this.comisionId)
    },
    muestraEditar() {
      return this.isAdmin && this.esPublicador
    },
    muestraAnular() {
      return (this.isAdmin && this.esPublicador) || this.esSolicitante
    },
    muestraListado() {
      return this.isAdmin && this.esPublicador && !this.loading && this.comisionSeleccionada
    },
    mensajeEstado() {
      return this.esSolicitante ? '(Estado: solicitada)' : ''
    },
    mensajeConfirmacion() {
      return this.confirmacionPendiente && !this.loading
    },
    tipoComision() { // Configuración del mensaje a mostrar según el tipo de comisión
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
    ...mapActions(useUsuariosNuevoStore, ['getSolicitudesPorUsuario', 'isApplicant', 'postSolicitud', 'removeSolicitud', 'getSolicitud']),
    ...mapActions(useComisionesNuevoStore, ['getComisionPorId', 'editComision', 'removeComision', 'resetEstados']),
    volver() {
      this.$router.go(-1)
    },
    confirmaAnular() {
      this.preguntaConfirmacion = true
    },
    confirma() {
      if (this.esSolicitante) {
        this.anular()
      } else {
        this.borrar()
      }
    },
    anular() {
      this.removeSolicitud(this.getSolicitud(this.comisionId))
      this.preguntaConfirmacion = false
    },
    borrar() {
      this.removeComision(this.comisionSeleccionada)
      this.preguntaConfirmacion = false
      this.confirmacionPendiente = true
    },
    solicitar() {
      this.postSolicitud(this.comisionSeleccionada)
    },
    editar() {
      this.comisionTemp = { ...this.comisionSeleccionada }
      console.log(this.comisionTemp)
      this.mostrarFormulario = true
    },
    cerrarFormulario() {
      this.mostrarFormulario = false
    },
    cerrarMensajeConfirmacion() {
      this.confirmacionPendiente = false
      this.volver()
    },
    guardar(data) {
      this.editComision(data)
      this.cerrarFormulario()
    },
    gestionarErrores(event) {
      if (!event) {
        this.resetEstados()
        this.volver()
      }
    },
  }
}
</script>

<template>
  <div>
    <div v-if="loading || !comisionSeleccionada" class="card text-center">
      <ProgressSpinner />
    </div>
    <div v-else class="card">
      <!-- Muestra los datos en detalle de una comisión -->
      <Panel header="Datos de la comisión">

        <div class="field col-12 encabezado">
          {{ comisionSeleccionada.puesto }} {{ mensajeEstado }}
        </div>

        <Divider />

        <ul>
          <li><span class="negrita">Empleo:</span> {{ comisionSeleccionada.empleo }}</li>
          <li><span class="negrita">Especialidad:</span> {{ comisionSeleccionada.especialidad }}</li>
          <li><span class="negrita">Localidad:</span> {{ comisionSeleccionada.localidad }}</li>
          <li><span class="negrita">Duración:</span> {{ comisionSeleccionada.duracion }} {{ comisionSeleccionada.duracion
            > 1 ? "meses" : "mes" }}
          </li>
          <li><span class="negrita">Fecha límite solicitud:</span> {{ fecha }}</li>
          <li><span class="negrita">Tipo:</span> {{ tipoComision }}</li>
          <li><span class="negrita">Descripción:</span> {{ comisionSeleccionada.detalles ?
            comisionSeleccionada.detalles : "" }}</li>
        </ul>

        <div class="flex justify-content-around">
          <!-- Mostrará los botones de manera condicionada al rol de usuario y al estado de la comisión -->
          <Button label="Volver" icon="pi pi-arrow-left" severity="secondary" text @click="volver" />
          <Button v-if="muestraSolicitar" label="Solicitar" icon="pi pi-check" severity="success" text
            @click="solicitar" />
          <Button v-if="muestraEditar" label="Editar" icon="pi pi-pencil" severity="success" text @click="editar" />
          <Button v-if="muestraAnular" label="Anular" icon="pi pi-times" severity="danger" text @click="confirmaAnular" />

          <!-- <button class="p-button p-component p-button-danger p-button-text" type="button">
            <span class="pi pi-times"></span>
            <span class="spinner-border spinner-border-sm"></span>
            <span>Loading...</span>
          </button> -->
          <!-- <Button label="Anular" icon="pi pi-times" severity="danger" text >
            <span style="position: absolute;">Anular</span>
            <ProgressSpinner style="width: 50px; height: 50px; position: absolute;"/>
          </Button> -->
        </div>
        <!-- </div> -->
      </Panel>

      <!-- Mostrará el listado de solicitantes en el caso de que el usuario logueado sea administrador -->
      <ListadoSolicitantesNuevo v-if="muestraListado" :comision-id="comisionId" />
    </div>

    <!-- Diálogo de confirmación de anulación de la solicitud/comisión condicionada al rol y estado de la comisión -->
    <Dialog v-model:visible="preguntaConfirmacion" :style="{ width: '450px' }" header="Confirmación" :modal="true">
      <div>
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span>¿Seguro que quiere anular la {{ isAdmin ? "comisión" : "solicitud" }}?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="preguntaConfirmacion = false" />
        <Button label="Sí" icon="pi pi-check" text @click="confirma" />
      </template>
    </Dialog>

    <!-- Diálogo de confirmación de la solicitud -->
    <Dialog :visible="mensajeConfirmacion" :style="{ width: '450px' }" header="Información" :modal="true"
      @update:visible="cerrarMensajeConfirmacion">
      <div>
        <span style="color: red;">¡Su solicitud ha sido realizada!</span>
      </div>
    </Dialog>

    <!-- Diálogo de Error -->
    <Dialog :visible="errored" :style="{ width: '450px' }" header="Información" :modal="true"
      @update:visible="gestionarErrores">
      <div>
        <span style="color: red;">¡Error de comunicación!</span>
      </div>
      <div>
        <span>En este momento no es posible contactar con el servidor, inténtelo pasado unos minutos.</span>
      </div>
    </Dialog>

    <!-- Muestra el formulario de la comisión que se quiere editar (rol administrador) -->
    <FormularioComision v-if="mostrarFormulario" :comision="comisionTemp" @cancelar-formulario="cerrarFormulario"
      @guardarCambios="guardar" />


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
</style>
