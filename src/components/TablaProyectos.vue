<template>
  <div class="container table-responsive">
    <table id="tablaProyectos" class="table table-dark table-hover table-bordered">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th class="text-right">Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="proyecto in proyectos" :key="proyecto.id">
          <td>{{proyecto.nombre}}</td>
          <td class="text-right">
            <b-button 
              variant="btn btn-outline-success badge-pill" 
              style="width:120px;"
              @click="proyectoSeleccionado = proyecto; $bvModal.show('modalVerServidoresDeProyectos')">
              Ver servidores
            </b-button>
            <b-button  
              variant="btn btn-outline-info badge-pill" 
              style="width:90px; margin: 5px;" 
              @click="proyectoSeleccionado = proyecto; $bvModal.show('modalEditarProyecto')">
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
    proyectos: null
  },
  data() {
    return {
      proyectoSeleccionado: null
    }
  },
  methods: {
    updateListProyectos(newProyecto) {
      var oldProyecto = this.proyectos.find(element => {
          return element.id == newProyecto.id
        })
      oldProyecto.nombre = newProyecto.nombre
    }
  }
}
</script>