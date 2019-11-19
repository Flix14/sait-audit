<template>
  <b-modal 
    id="modalEditarUsuario" 
    title="Editar Usuario" 
    centered 
    @shown="getUsuario()" 
    no-close-on-esc 
    no-close-on-backdrop 
    hide-header-close>
    <h6>Correo electrónico</h6>
    <b-input-group prepend="@">
      <b-input v-model="newEmail" :state="changeStateInputEmail" />
    </b-input-group>
    <template v-slot:modal-footer="{ Cancelar, Guardar }">
      <b-button size="sm" variant="danger" @click="closeModal()">
        Cancelar
      </b-button>
      <b-button size="sm" variant="success" @click="updateUsuario()">
        Guardar
      </b-button>
    </template>
    <p v-if="showWarnings">*Debe ingresar un correo electrónico</p>
  </b-modal>
</template>

<script>
export default {
  props: {
    idUsuario: Number
  },
  data() {
    return {
      newEmail: '',
      email: '',
      estado: null,
      reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      showWarnings: false
    }
  },
  methods: {
    getUsuario() {
      this.$http.get(`${this.$store.getters.getDireccion}/usuarios/${this.idUsuario}`).then(response => {
        this.email = response.data.email
        this.newEmail = this.email
        this.estado = response.data.estado
      }).catch(() => {
        this.$bvModal.msgBoxOk('No se ha podido establecer conexión con el servidor', {
          title: 'Problemas de conexión',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'success',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
        })
        this.closeModal()
      })
    },
    closeModal() {
      this.$bvModal.hide('modalEditarUsuario')
      this.showWarnings = false
    },
    updateUsuario() {
      if(this.changeStateInputEmail) {
        if(this.email != this.newEmail) {
          this.$http.put(`${this.$store.getters.getDireccion}/usuarios/${this.idUsuario}`, {
            email: this.newEmail,
            estado: this.estado
          }).then(response => {
            var usuario = response.data
            this.$emit('usuarioUpdating', usuario)
            this.closeModal()
          }).catch(() => {
            this.$bvModal.msgBoxOk('No se ha podido establecer conexión con el servidor', {
              title: 'Problemas de conexión',
              size: 'sm',
              buttonSize: 'sm',
              okVariant: 'success',
              headerClass: 'p-2 border-bottom-0',
              footerClass: 'p-2 border-top-0',
              centered: true
            })
          })
        } else {
          this.closeModal()
        }
      } else {
        this.showWarnings = true
      }
    }
  },
  computed: {
    changeStateInputEmail: function() {
      return this.reg.test(this.newEmail)
    }
  }
}
</script>

<style scoped>
p {
  color: tomato;
}
</style>