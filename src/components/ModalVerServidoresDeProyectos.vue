<template>
  <b-modal id="modalVerServidoresDeProyectos" centered title="Servidores">
    <table id="tablaServidoresDeProyectos" class="table table-hover table-bordered">
      <thead>
        <tr>
          <th scope="col">Dirección pública</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="servidor in servidores" :key="servidor.id">
          <td>{{servidor.direccion_publica}}</td>
        </tr>
      </tbody>
    </table>
    <div class="container text-center" v-if="servidores.length == 0">
      <p v-if="!conexion">No hay conexión con el servidor</p>
      <p v-else>No hay datos en la tabla</p>
    </div>
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
    idProyecto: Number
  },
  data() {
    return {
      servidores: [],
      conexion: true
    }
  },
  methods: {
    closeModal(){
      this.$bvModal.hide("modalVerServidoresDeProyectos")
    }
  },
  watch: {
    idProyecto: function (val) {
      var listaServidores = []
      this.servidores = []
      axios.get(`${this.$store.getters.getDireccion}/proyectos/${val}/servidores`).then(response => {
        listaServidores = response.data
        listaServidores.forEach(servidor => {
        this.servidores.push({id: servidor.id, direccion_publica: servidor.direccion_publica})
        this.conexion = true
      })
      }).catch(() => this.conexion = false)
    }
  }
}
</script>