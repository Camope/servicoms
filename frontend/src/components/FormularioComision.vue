<script>
import { ConstantesComision } from '@/js/ConstantesComision';

export default {
  props: {
    comision: {
      type: Object,
    },
  },
  components: {},
  emits: ['cancelar', 'guardar'],
  data() {
    return {
      enviar: false,
      nueva: true,
      comisionTemp: null,
    }
  },
  updated() {
  },
  created() {
    this.nueva = this.comision ? false : true
    this.comisionTemp = this.nueva ? {} : { ...this.comision }
  },
  mounted() {
  },
  computed: {
    hoy() {
      return new Date()
    },
    fecha() {
      let options = { year: 'numeric', month: 'numeric', day: 'numeric' }
      return (new Date(Number(this.comisionTemp.fechaLimite))).toLocaleDateString('es-ES', options)
    },
    empleos() {
      return ConstantesComision.getEmpleos()
    },
    especialidades() {
      return ConstantesComision.getEspecialidades()
    },
    duracionMaxima() {
      return ConstantesComision.getDuracionMaxima()
    },
    riesgos() {
      return ConstantesComision.getRiesgos()
    },
    perfiles() {
      return ConstantesComision.getPerfiles()
    },
    tipoViogen() {
      return this.comisionTemp.tipo ? this.comisionTemp.tipo == 'VIOGEN' : false
    },
    tipoExtranjero() {
      return this.comisionTemp.tipo ? this.comisionTemp.tipo == 'EXTRANJERO' : false
    }
  },
  methods: {
    cambioViogen(event) {
      this.comisionTemp.tipo = event ? 'VIOGEN' : null
      this.comisionTemp.riesgo = event ? this.comisionTemp.riesgo : null
      this.comisionTemp.perfil = null
    },
    cambioExtranjero(event) {
      this.comisionTemp.tipo = event ? 'EXTRANJERO' : null
      this.comisionTemp.perfil = event ? this.comisionTemp.perfil : null
      this.comisionTemp.riesgo = null
    },
    cancelar() {
      this.enviar = false
      this.$emit('cancelar')
    },
    guardar() {
      this.enviar = true;

      if (this.comisionTemp.localidad &&
        this.comisionTemp.empleo &&
        this.comisionTemp.especialidad &&
        this.comisionTemp.duracion &&
        this.comisionTemp.fechaLimite &&
        (!this.tipoViogen || this.comisionTemp.riesgo) &&
        (!this.tipoExtranjero || this.comisionTemp.perfil)) {

        this.enviar = false
        this.$emit('guardar', this.comisionTemp)
      }
    },
  }
}
</script>

<template>
  <div>
    <Dialog :visible="true" @update:visible="$emit('cancelarFormulario')" :style="{ width: '500px' }"
      :header="nueva ? 'Nueva Comisión' : 'Editar Comisión'" :modal="true" class="p-fluid">
      <div class="field">
        <label for="vacante">Vacante</label>
        <InputText id="vacante" v-model.trim="comisionTemp.puesto" required="true" :autofocus="comisionTemp ? false : true"
          :class="{ 'p-invalid': enviar && !comisionTemp.puesto }" />
        <small class="p-error" v-if="enviar && !comisionTemp.puesto">Introduzca nombre de la vacante</small>
      </div>

      <div class="field">
        <label for="description">Descripción</label>
        <Textarea id="description" v-model="comisionTemp.detalles" required="false" rows="3" cols="20" />
      </div>

      <div class="field">
        <label for="localidad">Localidad</label>
        <InputText id="localidad" v-model.trim="comisionTemp.localidad" required="true"
          :class="{ 'p-invalid': enviar && !comisionTemp.localidad }" />
        <small class="p-error" v-if="enviar && !comisionTemp.localidad">Introduzca localidad</small>
      </div>

      <div class="formgrid grid">
        <div class="field col-6">
          <label for="selectorEmpleo" class="mb-3">Empleo</label>
          <Dropdown id="selectorEmpleo" v-model="comisionTemp.empleo" :options="empleos" required="true"
            placeholder="Seleccione empleo" class="w-full" :class="{ 'p-invalid': enviar && !comisionTemp.empleo }" />
          <small class="p-error" v-if="enviar && !comisionTemp.empleo">Seleccione empleo</small>
        </div>

        <div class="field col-6">
          <label for="selectorEspecialidad" class="mb-3">Especialidad</label>
          <Dropdown id="selectorEspecialidad" v-model="comisionTemp.especialidad" :options="especialidades" required="true"
            placeholder="Seleccione especialidad" class="w-full"
            :class="{ 'p-invalid': enviar && !comisionTemp.especialidad }" />
          <small class="p-error" v-if="enviar && !comisionTemp.especialidad">Seleccione especialidad</small>
        </div>
      </div>

      <div class="field">
        <label for="duracion" class="mb-3">Duración</label>
        <InputNumber v-model="comisionTemp.duracion" :suffix="comisionTemp.duracion == 1 ? ' mes' : ' meses'" inputId="duracion"
          mode="decimal" showButtons :min="1" :max="duracionMaxima" />
      </div>

      <div class="field">
        <label for="fechalimite" class="mb-3">Fecha límite de solicitud</label>
        <Calendar id="fechalimite" v-model="comisionTemp.fechaLimite" dateFormat="dd/mm/yy" :minDate="hoy" showIcon
          required="true" :class="{ 'p-invalid': enviar && !comisionTemp.fechaLimite }" />
        <small class="p-error" v-if="enviar && !comisionTemp.fechaLimite">Introduzca fecha</small>
      </div>

      <!-- Selectores de tipo de comisión -->
      <div class="formgrid grid">
        <div class="field-radiobutton col-6">
          <InputSwitch :modelValue="tipoViogen" @input="cambioViogen" id="viogen" />
          <label for="viogen" class="mb-3">Viogen</label>
        </div>
        <div class="field-radiobutton col-6">
          <InputSwitch :modelValue="tipoExtranjero" @input="cambioExtranjero" id="extranjero" />
          <label for="extranjero" class="mb-3">Extranjero</label>
        </div>
        <div class="field col-6">
          <label for="selectorRiesgo" class="mb-3">Riesgo</label>
          <Dropdown id="selectorRiesgo" v-model="comisionTemp.riesgo" :disabled="!tipoViogen" :options="riesgos"
            placeholder="Seleccione Riesgo" class="w-full"
            :class="{ 'p-invalid': enviar && !comisionTemp.riesgo && tipoViogen }" />
          <small class="p-error" v-if="enviar && !comisionTemp.riesgo && tipoViogen">Seleccione riesgo</small>
        </div>
        <div class="field col-6">
          <label for="selectorPerfil" class="mb-3">Perfil</label>
          <Dropdown id="selectorPerfil" v-model="comisionTemp.perfil" :disabled="!tipoExtranjero" :options="perfiles"
            placeholder="Seleccione Perfil" class="w-full"
            :class="{ 'p-invalid': enviar && !comisionTemp.perfil && tipoExtranjero }" />
          <small class="p-error" v-if="enviar && !comisionTemp.perfil && tipoExtranjero">Seleccione
            perfil</small>
        </div>
      </div>

      <template #footer>
        <Button label="Cancelar" icon="pi pi-times" text @click="cancelar" />
        <Button label="Guardar" icon="pi pi-check" text @click="guardar" />
      </template>
    </Dialog>

  </div>
</template>