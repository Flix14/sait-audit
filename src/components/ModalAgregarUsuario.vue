<template>
  <b-modal 
    id="modalAgregarUsuario" 
    title="Ingresar nuevo usuario" 
    centered 
    @hidden="cleanModal()" 
    no-close-on-esc 
    no-close-on-backdrop
    hide-header-close>
    <h6>Correo Electronico</h6>
    <b-input-group prepend="@">
      <b-input placeholder="ej. example@gmail.com" v-model="email" :state="changeStateInputEmail" autofocus />
    </b-input-group>
    <template v-slot:modal-footer="{ Cancelar, Agregar }">
      <b-button size="sm" variant="danger" @click="closeModal()">
        Cancelar
      </b-button>
      <b-button size="sm" variant="success" @click="addUsuario()">
        Agregar
      </b-button>
    </template>
    <p v-if="showWarnings">*Debe ingresar un correo electrónico</p>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      exReg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      showWarnings: false
    }
  },
  methods: {
    cleanModal() {
      this.email = ''
      this.showWarnings = false
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
        }).catch((e) => {
          if(e.response != undefined){
            if(e.response.status == 409) {
              this.$bvModal.msgBoxOk('Ya existe un usuario con ese correo electrónico', {
                title: 'Usuario existente',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'success',
                headerClass: 'p-2 border-bottom-0',
                footerClass: 'p-2 border-top-0',
                centered: true
              })
            }
          } else if(e.message == 'Network Error'){
            this.$bvModal.msgBoxOk('No se ha podido establecer conexión con el servidor', {
              title: 'Problemas de conexión',
              size: 'sm',
              buttonSize: 'sm',
              okVariant: 'success',
              headerClass: 'p-2 border-bottom-0',
              footerClass: 'p-2 border-top-0',
              centered: true
            })
          } else {
            this.$bvModal.msgBoxOk('Ha ocurrido un error inesperado')
          }
        })
      } else {
        this.showWarnings = true
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

<style scoped>
p {
  color: tomato;
}
</style>