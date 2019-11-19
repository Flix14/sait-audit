<template>
  <b-modal 
  id="modalVerProyectosDeServidores" 
  centered title="Proyectos" 
  no-close-on-esc 
  no-close-on-backdrop 
  hide-header-close>
    <table v-if="proyectos.length > 0" class="table table-hover table-bordered">
      <thead>
        <tr>
          <th>Nombre</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="proyecto in proyectos" :key="proyecto.id">
          <td>{{proyecto.nombre}}</td>
        </tr>
      </tbody>
    </table>
    <div class="container text-center" v-if="proyectos.length == 0">
      <p v-if="!conexion">No hay conexión con el servidor</p>
      <p v-else>No hay proyectos asociados al servidor</p>
    </div>
    <template v-slot:modal-footer="{ Cerrar }">
      <b-button size="sm" variant="danger" @click="closeModal()">
        Cerrar
      </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: {
    idServidor: Number
  },
  data() {
    return {
      proyectos: [],
      conexion: true
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
      this.$http.get(`${this.$store.getters.getDireccion}/servidores/${val}/proyectos`).then(response => {
        listaProyectos = response.data
        listaProyectos.forEach(proyecto => {
          this.proyectos.push({id: proyecto.id, nombre: proyecto.nombre})
          this.conexion = true
        })
      }).catch(() => this.conexion = false)
    }
  }
}
</script>