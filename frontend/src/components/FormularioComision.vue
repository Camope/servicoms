<script>
import { ConstantesComision } from '@/js/ConstantesComision';

export default {
  props: {
    comision: {
      type: Object,
      default: {}
    },
    mostrar: {
      type: Boolean,
      default: false
    },
  },
  components: {},
  emits: ['cancelarFormulario', 'guardarCambios'],
  data() {
    console.log("data")
    return {
      // comision: this.comision,
      enviar: false,
    }
  },
  updated() {
    console.log("Updated")
    console.log(this.comision.especialidad)
    this.comision.viogen = this.comision.riesgo ? true : false
    this.comision.extranjero = this.comision.perfil ? true : false
  },
  created() {
  },
  mounted() {
  },
  computed: {
    hoy() {
      return new Date()
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
    visible() {
      return this.mostrar
    }
  },
  methods: {
    cambioViogen(event) {
      this.comision.extranjero = false
      this.comision.perfil = null
      if (!event) this.comision.riesgo = null
    },
    cambioExtranjero(event) {
      this.comision.viogen = false
      this.comision.riesgo = null
      if (!event) this.comision.perfil = null
    },
    cancelar() {
      this.enviar = false
      this.$emit('cancelarFormulario')
    },
    guardar() {
      this.enviar = true;

      if (this.comision.localidad &&
        this.comision.empleo &&
        this.comision.especialidad &&
        this.comision.duracion &&
        this.comision.fechaLimite &&
        (!this.comision.viogen || this.comision.riesgo) &&
        (!this.comision.extranjero || this.comision.perfil)) {

        console.log("Comisión Guardada!!")
        this.enviar = false
        this.$emit('guardarCambios', this.comision)
      }
    },
  }
}
</script>

<template>
  <div>
    <Dialog v-if="comision" :visible="visible" @update:visible="$emit('cancelarFormulario')" :style="{ width: '500px' }"
      :header="comision ? 'Editar Comisión' : 'Nueva Comisión'" :modal="true" class="p-fluid">
      <div class="field">
        <label for="vacante">Vacante</label>  
        <InputText id="vacante" v-model.trim="comision.puesto" required="true" :autofocus="comision ? false : true"
          :class="{ 'p-invalid': enviar && !comision.puesto }" />
        <small class="p-error" v-if="enviar && !comision.puesto">Introduzca nombre de la vacante</small>
      </div>

      <div class="field">
        <label for="description">Descripción</label>
        <Textarea id="description" v-model="comision.description" required="false" rows="3" cols="20" />
      </div>

      <div class="field">
        <label for="localidad">Localidad</label>
        <InputText id="localidad" v-model.trim="comision.localidad" required="true"
          :class="{ 'p-invalid': enviar && !comision.localidad }" />
        <small class="p-error" v-if="enviar && !comision.localidad">Introduzca localidad</small>
      </div>

      <div class="formgrid grid">
        <div class="field col-6">
          <label for="selectorEmpleo" class="mb-3">Empleo</label>
          <Dropdown id="selectorEmpleo" v-model="comision.empleo" :options="empleos" required="true"
            placeholder="Seleccione empleo" class="w-full" :class="{ 'p-invalid': enviar && !comision.empleo }" />
          <small class="p-error" v-if="enviar && !comision.empleo">Seleccione empleo</small>
        </div>

        <div class="field col-6">
          <label for="selectorEspecialidad" class="mb-3">Especialidad</label>
          <Dropdown id="selectorEspecialidad" v-model="comision.especialidad" :options="especialidades"
            required="true" placeholder="Seleccione especialidad" class="w-full"
            :class="{ 'p-invalid': enviar && !comision.especialidad }" />
          <small class="p-error" v-if="enviar && !comision.especialidad">Seleccione especialidad</small>
        </div>
      </div>

      <div class="field">
        <label for="duracion" class="mb-3">Duración</label>
        <InputNumber v-model="comision.duracion" :suffix="comision.duracion == 1 ? ' mes' : ' meses'"
          inputId="duracion" mode="decimal" showButtons :min="1" :max="duracionMaxima" />
      </div>

      <div class="field">
        <label for="fechalimite" class="mb-3">Fecha límite de solicitud</label>
        <Calendar id="fechalimite" v-model="comision.fechaLimite" dateFormat="dd/mm/yy" :minDate="hoy" showIcon
          required="true" :class="{ 'p-invalid': enviar && !comision.fechaLimite }" />
        <small class="p-error" v-if="enviar && !comision.fechaLimite">Introduzca fecha</small>
      </div>

      <div class="formgrid grid">
        <div class="field-radiobutton col-6">
          <InputSwitch v-model="comision.viogen" @input="cambioViogen" id="viogen" />
          <label for="viogen" class="mb-3">Viogen</label>
        </div>
        <div class="field-radiobutton col-6">
          <InputSwitch v-model="comision.extranjero" @input="cambioExtranjero" id="extranjero" />
          <label for="extranjero" class="mb-3">Extranjero</label>
        </div>
        <div class="field col-6">
          <label for="selectorRiesgo" class="mb-3">Riesgo</label>
          <Dropdown id="selectorRiesgo" v-model="comision.riesgo" :disabled="!comision.viogen" :options="riesgos"
            placeholder="Seleccione Riesgo" class="w-full"
            :class="{ 'p-invalid': enviar && !comision.riesgo && comision.viogen }" />
          <small class="p-error" v-if="enviar && !comision.riesgo && comision.viogen">Seleccione riesgo</small>
        </div>
        <div class="field col-6">
          <label for="selectorPerfil" class="mb-3">Perfil</label>
          <Dropdown id="selectorPerfil" v-model="comision.perfil" :disabled="!comision.extranjero"
            :options="perfiles" placeholder="Seleccione Perfil" class="w-full"
            :class="{ 'p-invalid': enviar && !comision.perfil && comision.extranjero }" />
          <small class="p-error" v-if="enviar && !comision.perfil && comision.extranjero">Seleccione
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