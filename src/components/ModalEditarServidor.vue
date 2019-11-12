<template>
  <b-modal id="modalEditarServidor" title="Editar Servidor" centered @shown="getServidor()">
    <h6>Sistema operativo</h6>
    <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
      <b-input ref="sistemaOperativo" placeholder="Sistema operativo" v-model="sistemaOperativo" :state="changeStateInput"></b-input>
    </b-input-group>
    <template v-slot:modal-footer="{ Cancelar, Guardar }">
      <b-button size="sm" variant="danger" @click="closeModal()">
        Cancelar
      </b-button>
      <b-button size="sm" variant="success" @click="updateServidor()">
        Guardar
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    idServidor: Number
  },
  data() {
    return {
      sistemaOperativo: "",
      direccion: null,
      dominio: null
    }
  },
  methods: {
    getServidor() {
      axios.get(`${this.$store.getters.getDireccion}/servidores/${this.idServidor}`).then(response => {
        this.sistemaOperativo = response.data.sistema_operativo
        this.direccion = response.data.direccion_publica
        this.dominio = response.data.dominio
      }).catch(e => console.log(e))
    },
    closeModal() {
      this.$bvModal.hide("modalEditarServidor")
    },
    updateServidor() {
      if(this.changeStateInput) {
        axios.put(`${this.$store.getters.getDireccion}/servidores/${this.idServidor}`, {
        sistema_operativo: this.sistemaOperativo,
        direccion_publica: this.direccion,
        dominio: this.dominio
      }).then(response => {
        var servidor = response.data
        this.$emit('servidorUpdating', servidor)
        this.closeModal()
      }). catch(e => console.log(e))
      } else {
        alert("Ingresar un sistema operativo")
      }
    }
  },
  computed: {
    changeStateInput: function() {
      return this.sistemaOperativo != ''
    }
  }
}
</script>