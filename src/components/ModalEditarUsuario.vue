<template>
  <b-modal id="modalEditarUsuario" title="Editar Usuario" centered @shown="getUsuario()">
    <h6>Correo electrónico</h6>
    <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
      <b-input ref="email" placeholder="Correo Electrónico" v-model="email" :state="changeStateInputEmail"></b-input>
    </b-input-group>
    <template v-slot:modal-footer="{ Cancelar, Guardar }">
      <b-button size="sm" variant="danger" @click="closeModal()">
        Cancelar
      </b-button>
      <b-button size="sm" variant="success" @click="updateUsuario()">
        Guardar
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    idUsuario: Number
  },
  data() {
    return {
      email: "",
      estado: null,
      reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    }
  },
  methods: {
    getUsuario() {
      axios.get(`${this.$store.getters.getDireccion}/usuarios/${this.idUsuario}`).then(response => {
        this.email = response.data.email
        this.estado = response.data.estado
      }).catch(e => console.log(e))
    },
    closeModal() {
      this.$bvModal.hide("modalEditarUsuario")
    },
    updateUsuario() {
      if(this.changeStateInputEmail) {
        axios.put(`${this.$store.getters.getDireccion}/usuarios/${this.idUsuario}`, {
          email: this.email,
          estado: this.estado
        }).then(response => {
          var usuario = response.data
          this.$emit('usuarioUpdating', usuario)
          this.closeModal()
        }). catch(e => console.log(e))
      } else {
        alert("Favor de ingresar un email")
      }
    }
  },
  computed: {
    changeStateInputEmail: function() {
      return this.reg.test(this.email)
    }
  }
}
</script>