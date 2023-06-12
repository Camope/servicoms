<script>
import { ConstantesComision } from '@/js/ConstantesComision'

export default {
  props: {
    usuario: {
      type: Object
    },
  },
  components: {},
  emits: ['cancelar', 'guardar', 'borrar'],
  data() {
    return {
      checkForm: false,
      nuevo: true,
      usuarioTemp: null,
    }
  },
  watch: {
    usuario(nuevoUsuario) {
      this.usuarioTemp = { ...this.usuario }
    }
  },
  updated() {
  },
  created() {
    this.nuevo = this.usuario ? false : true
    this.usuarioTemp = this.nuevo ? {} : { ...this.usuario }
  },
  mounted() {
  },
  computed: {
    empleos() {
      return ConstantesComision.getEmpleos()
    },
    roles() {
      return ConstantesComision.getRoles()
    }
  },
  methods: {
    cancelar() {
      this.$emit('cancelar')
    },
    guardar() {
      this.checkForm = true

      if (this.usuarioTemp.nombre &&
        this.usuarioTemp.apellidos &&
        this.usuarioTemp.tip &&
        (this.usuarioTemp.password || !this.nuevo) &&
        this.usuarioTemp.email &&
        this.usuarioTemp.empleo &&
        this.usuarioTemp.role) {

        this.$emit('guardar', this.usuarioTemp)
      }
    },
    borrar() {
      this.$emit('borrar')
    }
  }
}
</script>

<template>
  <div>
    <Dialog :visible="true" @update:visible="$emit('cancelar')" :style="{ width: '500px' }"
      :header="nuevo ? 'Nuevo Usuario' : 'Editar Usuario'" :modal="true" class="p-fluid">
      <div class="field">
        <label for="nombre">Nombre</label>
        <InputText id="nombre" v-model.trim="usuarioTemp.nombre" required="true" :autofocus="usuarioTemp ? false : true"
          :class="{ 'p-invalid': checkForm && !usuarioTemp.nombre }" />
        <small class="p-error" v-if="checkForm && !usuarioTemp.nombre">Introduzca nombre</small>
      </div>

      <div class="field">
        <label for="apellidos">Apellidos</label>
        <InputText id="apellidos" v-model.trim="usuarioTemp.apellidos" required="true" :autofocus="usuarioTemp ? false : true"
          :class="{ 'p-invalid': checkForm && !usuarioTemp.apellidos }" />
        <small class="p-error" v-if="checkForm && !usuarioTemp.apellidos">Introduzca apellidos</small>
      </div>

      <div class="formgrid grid">
      <div class="field col-6">
        <label for="tip">TIP (nombre de usuario)</label>
        <InputText id="tip" v-model.trim="usuarioTemp.tip" required="true"
          :class="{ 'p-invalid': checkForm && !usuarioTemp.tip }" />
        <small class="p-error" v-if="checkForm && !usuarioTemp.tip">Introduzca la TIP</small>
      </div>

      <div class="field col-6">
        <label for="password">Contraseña</label>
        <InputText id="password" v-model.trim="usuarioTemp.password" required="true" :autofocus="usuarioTemp ? false : true"
          :class="{ 'p-invalid': checkForm && !usuarioTemp.password }" />
        <small class="p-error" v-if="checkForm && !usuarioTemp.password && nuevo">Introduzca contraseña</small>
      </div>

    </div>

    <div class="field">
        <label for="email">e-mail</label>
        <InputText id="email" v-model.trim="usuarioTemp.email" required="true" :autofocus="usuarioTemp ? false : true"
          :class="{ 'p-invalid': checkForm && !usuarioTemp.email }" />
        <small class="p-error" v-if="checkForm && !usuarioTemp.email">Introduzca dirección de correo</small>
      </div>

      <div class="formgrid grid">
        <div class="field col-6">
          <label for="selectorEmpleo" class="mb-3">Empleo</label>
          <Dropdown id="selectorEmpleo" v-model="usuarioTemp.empleo" :options="empleos" required="true"
            placeholder="Seleccione empleo" class="w-full" :class="{ 'p-invalid': checkForm && !usuarioTemp.empleo }" />
          <small class="p-error" v-if="checkForm && !usuarioTemp.empleo">Seleccione empleo</small>
        </div>

        <div class="field col-6">
          <label for="selectorRole" class="mb-3">Rol</label>
          <Dropdown id="selectorRole" v-model="usuarioTemp.role" :options="roles" required="true"
            placeholder="Seleccione rol" class="w-full"
            :class="{ 'p-invalid': checkForm && !usuarioTemp.role }" />
          <small class="p-error" v-if="checkForm && !usuarioTemp.role">Seleccione rol</small>
        </div>
      </div>

      

      <template #footer>
        <div class="flex justify-content-end">
        <Button v-if="!nuevo" class="mr-auto" label="Borrar" icon="pi pi-trash" severity="danger" text @click="borrar" />
        <Button label="Cancelar" icon="pi pi-times" text @click="cancelar" />
        <Button label="Guardar" icon="pi pi-check" text @click="guardar" />
      </div>
      </template>
    </Dialog>

  </div>
</template>