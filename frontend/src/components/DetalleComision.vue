<script>
import { mapActions, mapState } from 'pinia'
import { useComisionesStore } from '@/stores/comisiones'

export default {
  props: ['comisionId'],
  components: {},
  emits: [],
  data() {
    return {
      comision: null,
      estadoSolicitud: null,
      confirmacionAnulacion: false,
      anulacion: false,
      confirmacionSolicitud: false,
    }
  },
  created() {
  },
  mounted() {
    this.comision = this.getComisiones().find(c => c.id == this.comisionId)
    this.estadoSolicitud = true
    this.comision.fechaLimite = new Date()
    console.log(this.comision)
    console.log(this.comisionId)
  },
  computed: {
    fecha() {
      let options = { year: 'numeric', month: 'long', day: 'numeric' };
      return this.comision.fechaLimite.toLocaleDateString('es-ES', options);
    }
  },
  methods: {
    ...mapActions(useComisionesStore, ['getComisiones']),
    volver() {
      this.$router.go(-1)
    },
    confirmaAnular() {
      this.anulacion = false
      this.confirmacionAnulacion = true
    },
    anular() {
      this.anulacion = true
      setTimeout(() => {this.confirmacionAnulacion = false}, 2000)
    },
    solicitar() {
      this.confirmacionSolicitud = true
      setTimeout(() => {this.confirmacionSolicitud = false}, 2000)
    }
  }
}
</script>

<template>
  <div v-if="comision" class="card">

    <Panel header="Datos de la comisión">

      <div class="field col-12 encabezado">
        {{ comision.puesto }} {{ estadoSolicitud ? "(Estado: solicitada)" : "" }}
      </div>

      <Divider />

      <ul>
        <li><span class="negrita">Empleo:</span> {{ comision.empleo }}</li>
        <li><span class="negrita">Especialidad:</span> {{ comision.especialidad }}</li>
        <li><span class="negrita">Localidad:</span> {{ comision.localidad }}</li>
        <li><span class="negrita">Duración:</span> {{ comision.duracion }} {{ comision.duracion > 1 ? "meses" : "mes" }}
        </li>
        <li><span class="negrita">Fecha límite solicitud:</span> {{ fecha }}</li>
        <li><span class="negrita">Descripción:</span> {{ comision.descripcion ? comision.descripcion : "" }}</li>
      </ul>

      <div class="flex justify-content-around">
        <Button label="Volver" icon="pi pi-arrow-left" severity="secondary" text @click="volver" />
        <Button v-if="!estadoSolicitud" label="Solicitar" icon="pi pi-check" severity="success" text @click="solicitar" />
        <Button v-if="estadoSolicitud" label="Anular" icon="pi pi-times" severity="danger" text @click="confirmaAnular" />
      </div>
    </Panel>

    <Dialog v-model:visible="confirmacionAnulacion" :style="{ width: '450px' }" header="Confirmación" :modal="true">
      <div v-if="!anulacion" class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span>¿Seguro que quiere anular la solicitud?</span>
      </div>
      <div v-if="anulacion" class="confirmation-content">
        <span style="color: red;">¡Su solicitud ha sido anulada!</span>
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
