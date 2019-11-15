<template>
  <b-modal id="modalAgregarUsuario" title="Ingresar nuevo usuario" centered @hidden="cleanModal()">
    <h6>Correo Electronico</h6>
    <b-input-group prepend="@">
      <b-input placeholder="ej. example@gmail.com" v-model="email" :state="changeStateInputEmail" />
    </b-input-group>
    <template v-slot:modal-footer="{ Cancelar, Agregar }">
      <b-button size="sm" variant="danger" @click="closeModal()">
        Cancelar
      </b-button>
      <b-button size="sm" variant="success" @click="addUsuario()">
        Agregar
      </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      exReg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    }
  },
  methods: {
    cleanModal() {
      this.email = ''
    },
    closeModal() {
      this.$bvModal.hide('modalAgregarUsuario')
    },
    addUsuario() {
      if(this.changeStateInputEmail) {
        this.$http.post(`${this.$store.getters.getDireccion}/usuarios`, {
        email: this.email,
        estado: 1
      }).then(() => {
        this.$emit('usuarioAdding')
        this.closeModal()
      }).catch(() => alert('No hay conexión con el servidor'))
      } else {
        alert('Ingrese un email válido')
      }
    }
  },
  computed: {
    changeStateInputEmail: function() {
      return this.exReg.test(this.email)
    }
  }
}
</script>