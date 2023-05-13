<script>

import { mapActions, mapState } from 'pinia'
import { useComisionesStore } from '@/stores/comisiones'
import { useUsuariosStore } from '@/stores/usuarios';
import FormularioComision from './FormularioComision.vue'
import ListadoSolicitantes from './ListadoSolicitantes.vue'

export default {
  props: ['comisionId'],
  components: { FormularioComision, ListadoSolicitantes },
  emits: [],
  data() {
    return {
      comision: null,
      comisionTemp: null,
      confirmacionAnulacion: false,
      preguntaConfirmacion: false,
      confirmacionSolicitud: false,
      mostrarFormulario: false
    }
  },
  created() {
  },
  mounted() {
    this.comision = this.getComisiones().find(c => c.id == this.comisionId)
    this.estadoSolicitud = true
  },
  computed: {
    ...mapState(useUsuariosStore, ['getUsuarioLogeado', 'isUserLoggedIn', 'isUserAdmin']),
    fecha() {
      let options = { year: 'numeric', month: 'long', day: 'numeric' }
      return this.comision.fechaLimite.toLocaleDateString('es-ES', options)
    },
    esPublicador() {
      return true // Los administradores tendrán siempre rol de publicador
    },
    esSolicitante() {
      return this.isUserLoggedIn && !this.isUserAdmin && this.isSolicitante(this.comisionId)
    },
    muestraSolicitar() {
      return this.isUserLoggedIn && !this.isUserAdmin && !this.isSolicitante(this.comisionId)
    },
    muestraEditar() {
      return this.isUserAdmin && this.esPublicador
    },
    muestraAnular() {
      return (this.isUserAdmin && this.esPublicador) || this.esSolicitante
    },
    muestraListado() {
      return this.isUserAdmin && this.esPublicador
    },
    mensajeEstado() {
      return this.esSolicitante ? "(Estado: solicitada)" : ""
    },
    tipoComision() { // Configuración del mensaje a mostrar según el tipo de comisión
      let tipo

      if (this.comision.riesgo) tipo = `Viogen (riesgo: ${this.comision.riesgo})`
      else if (this.comision.perfil) tipo = `Extranjero (perfil: ${this.comision.perfil})`
      else tipo = 'Normal'

      return tipo
    }
  },
  methods: {
    ...mapActions(useComisionesStore, ['getComisiones', 'setComision', 'removeComision']),
    ...mapActions(useUsuariosStore, ['isSolicitante', 'addSolicitud', 'removeSolicitud']),
    volver() {
      this.$router.go(-1)
    },
    confirmaAnular() {
      this.preguntaConfirmacion = true
      this.confirmacionAnulacion = true
    },
    confirma() {
      if (this.esSolicitante){
        this.anular()
      } else {
        this.borrar()
      }
    },
    anular() {
      if (this.removeSolicitud(this.comisionId)) {
        this.preguntaConfirmacion = false
        setTimeout(() => { this.confirmacionAnulacion = false }, 2000)
      }
    },
    borrar() {
      if (this.removeComision(this.comisionId)) {
        this.preguntaConfirmacion = false
        setTimeout(() => { this.confirmacionAnulacion = false }, 2000)
      }
      this.volver()
    },
    solicitar() {
      if (this.addSolicitud(this.comisionId)) {
        this.confirmacionSolicitud = true
        setTimeout(() => { this.confirmacionSolicitud = false }, 2000)
      }
    },
    editar() {
      this.comisionTemp = { ...this.comision }
      this.mostrarFormulario = true
    },
    cerrarFormulario() {
      this.mostrarFormulario = false
    },
    guardar(data) {
      data.id = this.comision.id
      this.setComision(data)
      this.comision = data //{ ...data }
      this.cerrarFormulario()
    }
  }
}
</script>

<template>
  <div v-if="comision" class="card">
    <!-- Muestra los datos en detalle de una comisión -->
    <Panel header="Datos de la comisión">

      <div class="field col-12 encabezado">
        {{ comision.puesto }} {{ mensajeEstado }}
      </div>

      <Divider />

      <ul>
        <li><span class="negrita">Empleo:</span> {{ comision.empleo }}</li>
        <li><span class="negrita">Especialidad:</span> {{ comision.especialidad }}</li>
        <li><span class="negrita">Localidad:</span> {{ comision.localidad }}</li>
        <li><span class="negrita">Duración:</span> {{ comision.duracion }} {{ comision.duracion > 1 ? "meses" : "mes" }}
        </li>
        <li><span class="negrita">Fecha límite solicitud:</span> {{ fecha }}</li>
        <li><span class="negrita">Tipo:</span> {{ tipoComision }}</li>
        <li><span class="negrita">Descripción:</span> {{ comision.descripcion ? comision.descripcion : "" }}</li>
      </ul>

      <div class="flex justify-content-around">
        <!-- Mostrará los botones de manera condicionada al rol de usuario y al estado de la comisión -->
        <Button label="Volver" icon="pi pi-arrow-left" severity="secondary" text @click="volver" />
        <Button v-if="muestraSolicitar" label="Solicitar" icon="pi pi-check" severity="success" text @click="solicitar" />
        <Button v-if="muestraEditar" label="Editar" icon="pi pi-pencil" severity="success" text @click="editar" />
        <Button v-if="muestraAnular" label="Anular" icon="pi pi-times" severity="danger" text @click="confirmaAnular" />
      </div>
    </Panel>

    <!-- Mostrará el listado de solicitantes en el caso de que el usuario logueado sea administrador -->
    <ListadoSolicitantes v-if="muestraListado" :comision-id="comision.id" />

    <!-- Diálogo de confirmación de anulación de la solicitud/comisión condicionada al rol y estado de la comisión -->
    <Dialog v-model:visible="confirmacionAnulacion" :style="{ width: '450px' }" header="Confirmación" :modal="true">
      <div v-if="preguntaConfirmacion" class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span>¿Seguro que quiere anular la {{ isUserAdmin  ? "comisión" : "solicitud" }}?</span>
      </div>
      <div v-if="!preguntaConfirmacion" class="confirmation-content">
        <span style="color: red;">¡{{ isUserAdmin ? "La comisión" : "Su solicitud" }} ha sido anulada!</span>
      </div>
      <template v-if="preguntaConfirmacion" #footer>
        <Button label="No" icon="pi pi-times" text @click="confirmacionAnulacion = false" />
        <Button label="Sí" icon="pi pi-check" text @click="confirma" />
      </template>
    </Dialog>

    <!-- Diálogo de confirmación de la solicitud -->
    <Dialog v-model:visible="confirmacionSolicitud" :style="{ width: '450px' }" header="Confirmación" :modal="true">
      <div class="confirmation-content">
        <span style="color: red;">¡Su solicitud ha sido realizada!</span>
      </div>
    </Dialog>

    <!-- Muestra el formulario de la comisión que se quiere editar (rol administrador) -->
    <FormularioComision :mostrar="mostrarFormulario" :comision="comisionTemp" @cancelar-formulario="cerrarFormulario"
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
