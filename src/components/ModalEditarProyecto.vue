<template>
  <b-modal id="modalEditarProyecto" title="Editar Proyecto" centered @shown="getProyecto()">
    <h6>Nombre</h6>
    <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
      <b-input ref="nombre" placeholder="Nombre" v-model="nombre" :state="changeStateInputNombre"></b-input>
    </b-input-group>
    <template v-slot:modal-footer="{ Cancelar, Guardar }">
      <b-button size="sm" variant="danger" @click="closeModal()">
        Cancelar
      </b-button>
      <b-button size="sm" variant="success" @click="updateProyecto()">
        Guardar
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    idProyecto: Number
  },
  data() {
    return {
      nombre: ""
    }
  },
  methods: {
    getProyecto() {
      axios.get(`${this.$store.getters.getDireccion}/proyectos/${this.idProyecto}`).then(response => {
        this.nombre = response.data.nombre
      }).catch(e => console.log(e))
    },
    closeModal() {
      this.$bvModal.hide("modalEditarProyecto")
    },
    updateProyecto() {
      if(this.changeStateInputNombre) {
        axios.put(`${this.$store.getters.getDireccion}/proyectos/${this.idProyecto}`, {
        nombre: this.nombre
      }).then(response => {
        var proyecto = response.data
        this.$emit('proyectoUpdating', proyecto)
        this.closeModal()
      }). catch(e => console.log(e))
      } else {
        alert("Favor de ingresar un nombre")
      }
    }
  },
  computed: {
    changeStateInputNombre: function() {
      return this.nombre != ''
    }
  }
}
</script>