<script>
import { mapActions, mapState } from 'pinia'
import { useComisionesStore } from '@/stores/comisiones'
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
      comisionTemp: Object.assign({}, this.comision),
      enviar: false,
    }
  },
  updated() {
    console.log("Updated")
    console.log(this.comisionTemp.especialidad)
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
      this.comisionTemp.extranjero = false
      this.comisionTemp.perfil = null
      if (!event) this.comisionTemp.riesgo = null
    },
    cambioExtranjero(event) {
      this.comisionTemp.viogen = false
      this.comisionTemp.riesgo = null
      if (!event) this.comisionTemp.perfil = null
    },
    cancelar() {
      this.enviar = false
      this.$emit('cancelarFormulario')
    },
    guardar() {
      this.enviar = true;

      if (this.comisionTemp.localidad &&
        this.comisionTemp.empleo &&
        this.comisionTemp.especialidad &&
        this.comisionTemp.duracion &&
        this.comisionTemp.fechaLimite &&
        (!this.comisionTemp.viogen || this.comisionTemp.riesgo) &&
        (!this.comisionTemp.extranjero || this.comisionTemp.perfil)) {

        console.log("Comisión Guardada!!")
        this.enviar = false
        this.$emit('guardarCambios', this.comisionTemp)
      }
    },
  }
}
</script>

<template>
  <div>
    <Dialog v-if="comisionTemp" :visible="visible" @update:visible="$emit('cancelarFormulario')" :style="{ width: '500px' }"
      :header="comision ? 'Editar Comisión' : 'Nueva Comisión'" :modal="true" class="p-fluid">
      <div class="field">
        <label for="vacante">Vacante</label>  
        <InputText id="vacante" v-model.trim="comisionTemp.puesto" required="true" :autofocus="comision ? false : true"
          :class="{ 'p-invalid': enviar && !comisionTemp.puesto }" />
        <small class="p-error" v-if="enviar && !comisionTemp.puesto">Introduzca nombre de la vacante</small>
      </div>

      <div class="field">
        <label for="description">Descripción</label>
        <Textarea id="description" v-model="comisionTemp.description" required="false" rows="3" cols="20" />
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
          <Dropdown id="selectorEspecialidad" v-model="comisionTemp.especialidad" :options="especialidades"
            required="true" placeholder="Seleccione especialidad" class="w-full"
            :class="{ 'p-invalid': enviar && !comisionTemp.especialidad }" />
          <small class="p-error" v-if="enviar && !comisionTemp.especialidad">Seleccione especialidad</small>
        </div>
      </div>

      <div class="field">
        <label for="duracion" class="mb-3">Duración</label>
        <InputNumber v-model="comisionTemp.duracion" :suffix="comisionTemp.duracion == 1 ? ' mes' : ' meses'"
          inputId="duracion" mode="decimal" showButtons :min="1" :max="duracionMaxima" />
      </div>

      <div class="field">
        <label for="fechalimite" class="mb-3">Fecha límite de solicitud</label>
        <Calendar id="fechalimite" v-model="comisionTemp.fechaLimite" dateFormat="dd/mm/yy" :minDate="hoy" showIcon
          required="true" :class="{ 'p-invalid': enviar && !comisionTemp.fechaLimite }" />
        <small class="p-error" v-if="enviar && !comisionTemp.fechaLimite">Introduzca fecha</small>
      </div>

      <div class="formgrid grid">
        <div class="field-radiobutton col-6">
          <InputSwitch v-model="comisionTemp.viogen" @input="cambioViogen" id="viogen" />
          <label for="viogen" class="mb-3">Viogen</label>
        </div>
        <div class="field-radiobutton col-6">
          <InputSwitch v-model="comisionTemp.extranjero" @input="cambioExtranjero" id="extranjero" />
          <label for="extranjero" class="mb-3">Extranjero</label>
        </div>
        <div class="field col-6">
          <label for="selectorRiesgo" class="mb-3">Riesgo</label>
          <Dropdown id="selectorRiesgo" v-model="comisionTemp.riesgo" :disabled="!comisionTemp.viogen" :options="riesgos"
            placeholder="Seleccione Riesgo" class="w-full"
            :class="{ 'p-invalid': enviar && !comisionTemp.riesgo && comisionTemp.viogen }" />
          <small class="p-error" v-if="enviar && !comisionTemp.riesgo && comisionTemp.viogen">Seleccione riesgo</small>
        </div>
        <div class="field col-6">
          <label for="selectorPerfil" class="mb-3">Perfil</label>
          <Dropdown id="selectorPerfil" v-model="comisionTemp.perfil" :disabled="!comisionTemp.extranjero"
            :options="perfiles" placeholder="Seleccione Perfil" class="w-full"
            :class="{ 'p-invalid': enviar && !comisionTemp.perfil && comisionTemp.extranjero }" />
          <small class="p-error" v-if="enviar && !comisionTemp.perfil && comisionTemp.extranjero">Seleccione
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