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
      servidores: []
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
      })
      }).catch(e => console.log(e))
    }
  }
}
</script>