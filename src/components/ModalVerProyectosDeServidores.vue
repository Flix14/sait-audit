<template>
  <b-modal id="modalVerProyectosDeServidores" centered title="Proyectos">
    <table id="tablaProyectosDeServidores" class="table table-hover table-bordered">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="proyecto in proyectos" :key="proyecto.id">
          <td>{{proyecto.nombre}}</td>
        </tr>
      </tbody>
    </table>
    <template v-slot:modal-footer="{ Cerrar }">
      <b-button size="sm" variant="danger" @click="closeModal()">
        Cerrar
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
      proyectos: []
    }
  },
  methods: {
    closeModal(){
      this.$bvModal.hide("modalVerProyectosDeServidores")
    }
  },
  watch: {
    idServidor: function (val) {
      var listaProyectos = []
      this.proyectos = []
      axios.get(`${this.$store.getters.getDireccion}/servidores/${val}/proyectos`).then(response => {
        listaProyectos = response.data
        listaProyectos.forEach(proyecto => {
        this.proyectos.push({id: proyecto.id, nombre: proyecto.nombre})
      })
      }).catch(e => console.log(e))
    }
  }
}
</script>