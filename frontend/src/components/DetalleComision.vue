<script>
import { mapActions, mapState } from 'pinia'
import { useComisionesStore } from '@/stores/comisiones'
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
      estadoSolicitud: null,
      confirmacionAnulacion: false,
      anulacion: false,
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
    fecha() {
      let options = { year: 'numeric', month: 'long', day: 'numeric' };
      return (new Date(Number(this.comision.fechaLimite))).toLocaleDateString('es-ES', options);
    },
    esAdmin() {
      return true
    },
    esSolicitante() {
      return true
    },
    esPublicador() {
      return true
    },
    mensajeEstado() {
      return (!this.esAdmin && this.esSolicitante) ? "(Estado: solicitada)" : ""
    },
    tipoComision() {
      let tipo
      
      if( this.comision.riesgo ) tipo = `Viogen (riesgo: ${this.comision.riesgo})`
      else if ( this.comision.perfil ) tipo = `Extranjero (perfil: ${this.comision.riesgo})`
      else tipo = 'Normal'
      
      return tipo
    }
  },
  methods: {
    ...mapActions(useComisionesStore, ['getComisiones', 'setComision']),
    volver() {
      this.$router.go(-1)
    },
    confirmaAnular() {
      this.anulacion = false
      this.confirmacionAnulacion = true
    },
    anular() {
      this.anulacion = true
      setTimeout(() => { this.confirmacionAnulacion = false }, 2000)
    },
    solicitar() {
      this.confirmacionSolicitud = true
      setTimeout(() => { this.confirmacionSolicitud = false }, 2000)
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
        <Button label="Volver" icon="pi pi-arrow-left" severity="secondary" text @click="volver" />
        <Button v-if="!esAdmin && !esSolicitante" label="Solicitar" icon="pi pi-check" severity="success" text
          @click="solicitar" />
        <Button v-if="esAdmin && esPublicador" label="Editar" icon="pi pi-pencil" severity="success" text
          @click="editar" />
        <Button v-if="(esAdmin && esPublicador) || (!esAdmin && esSolicitante)" label="Anular" icon="pi pi-times"
          severity="danger" text @click="confirmaAnular" />
      </div>
    </Panel>

    <ListadoSolicitantes :comision-id="comision.id + ''"/>

    <Dialog v-model:visible="confirmacionAnulacion" :style="{ width: '450px' }" header="Confirmación" :modal="true">
      <div v-if="!anulacion" class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span>¿Seguro que quiere anular la {{ esAdmin ? "comisión" : "solicitud" }}?</span>
      </div>
      <div v-if="anulacion" class="confirmation-content">
        <span style="color: red;">¡{{ esAdmin ? "La comisión" : "Su solicitud" }} ha sido anulada!</span>
      </div>
      <template v-if="!anulacion" #footer>
        <Button label="No" icon="pi pi-times" text @click="confirmacionAnulacion = false" />
        <Button label="Sí" icon="pi pi-check" text @click="anular" />
      </template>
    </Dialog>

    <Dialog v-model:visible="confirmacionSolicitud" :style="{ width: '450px' }" header="Confirmación" :modal="true">
      <div class="confirmation-content">
        <span style="color: red;">¡Su solicitud ha sido realizada!</span>
      </div>
    </Dialog>

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
