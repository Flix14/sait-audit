<template>
  <div class="container table-responsive">
    <table class="table table-dark table-hover table-bordered">
      <thead>
        <tr>
          <th>Nombre</th>
          <th class="text-center">Servidores</th>
          <th class="text-center">Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="proyecto in proyectos" :key="proyecto.id">
          <td>{{proyecto.nombre}}</td>
          <td class="text-center">
            <b-button 
              variant="btn btn-outline-success badge-pill"
              @click="openModalVer(proyecto)">
              Ver servidores
            </b-button>
          </td>
          <td class="text-center">
            <b-button  
              variant="btn btn-outline-info badge-pill"  
              @click="openModalEditar(proyecto)">
              Editar
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>
    <ModalVerServidoresDeProyectos :idProyecto="proyectoSeleccionado ? proyectoSeleccionado.id : null"/>
    <ModalEditarProyecto :idProyecto="proyectoSeleccionado ? proyectoSeleccionado.id : null" @proyectoUpdating="updateListProyectos"/>
  </div>
</template>

<script>
import ModalEditarProyecto from '@/components/ModalEditarProyecto.vue'
import ModalVerServidoresDeProyectos from '@/components/ModalVerServidoresDeProyectos.vue'

export default {
  components: {
    ModalEditarProyecto,
    ModalVerServidoresDeProyectos
  },
  props: {
    proyectos: Array
  },
  data() {
    return {
      proyectoSeleccionado: null
    }
  },
  methods: {
    updateListProyectos(newProyecto) {
      var oldProyecto = this.proyectos.find(proyecto => {
          return proyecto.id == newProyecto.id
        })
      oldProyecto.nombre = newProyecto.nombre
    },
    openModalEditar(proyecto) {
      this.proyectoSeleccionado = proyecto 
      this.$bvModal.show('modalEditarProyecto')
    },
    openModalVer(proyecto) {
      this.proyectoSeleccionado = proyecto 
      this.$bvModal.show('modalVerServidoresDeProyectos')
    }
  }
}
</script>