<template>
  <b-modal id="modalEditarProyecto" title="Editar Proyecto" centered @shown="getProyecto()">
    <h6>Nombre</h6>
    <b-input-group>
      <b-input v-model="nombre" :state="changeStateInputNombre" />
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
export default {
  props: {
    idProyecto: Number
  },
  data() {
    return {
      nombre: ''
    }
  },
  methods: {
    getProyecto() {
      this.$http.get(`${this.$store.getters.getDireccion}/proyectos/${this.idProyecto}`).then(response => {
        this.nombre = response.data.nombre
      }).catch(() => {
        this.closeModal()
        alert('No hay conexión con el servidor')
      })
    },
    closeModal() {
      this.$bvModal.hide('modalEditarProyecto')
    },
    updateProyecto() {
      if(this.changeStateInputNombre) {
        this.$http.put(`${this.$store.getters.getDireccion}/proyectos/${this.idProyecto}`, {
        nombre: this.nombre
      }).then(response => {
        var proyecto = response.data
        this.$emit('proyectoUpdating', proyecto)
        this.closeModal()
      }).catch(() => {
        this.closeModal()
        alert('No hay conexión con el servidor')
      })
      } else {
        alert('Favor de ingresar un nombre')
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