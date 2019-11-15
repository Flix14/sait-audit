<template>
  <div class="container table-responsive">
    <table class="table table-dark table-hover table-bordered" >
      <thead>
        <tr>
          <th>Dirección pública</th>
          <th>Sistema operativo</th>
          <th>Dominios</th> 
          <th class="text-center">Proyectos</th>
          <th class="text-center">Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="servidor in servidores" :key="servidor.id">
          <td>{{servidor.direccion_publica}}</td>
          <td>{{servidor.sistema_operativo}}</td>
          <td>{{servidor.dominio}}
            <p v-for="dominio in servidor.dominios" :key="dominio.id">{{dominio.dominio}}</p>
          </td>
          <td class="text-center">
            <b-button 
              variant="btn btn-outline-success badge-pill" 
              @click="openModalVer(servidor)">
              Ver proyectos
            </b-button>
          </td>
          <td class="text-center">
            <b-button 
              variant="btn btn-outline-info badge-pill"  
              @click="openModalEditar(servidor)">
              Editar
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>
    <ModalVerProyectosDeServidores :idServidor="servidorSeleccionado ? servidorSeleccionado.id : null"/>
    <ModalEditarServidor :idServidor="servidorSeleccionado ? servidorSeleccionado.id : null" @servidorUpdating="updateListServidores"/>
  </div>
</template>

<script>
import ModalEditarServidor from '@/components/ModalEditarServidor.vue'
import ModalVerProyectosDeServidores from '@/components/ModalVerProyectosDeServidores.vue'

export default {
  components: {
    ModalEditarServidor,
    ModalVerProyectosDeServidores
  },
  props: {
    servidores: Array
  },
  data() {
    return {
      servidorSeleccionado: null
    }
  },
  methods: {
    updateListServidores(newServidor) {
      var oldServidor = this.servidores.find(servidor => {
          return servidor.id == newServidor.id
        })
      oldServidor.sistema_operativo = newServidor.sistema_operativo
    },
    openModalEditar(servidor) {
      this.servidorSeleccionado = servidor 
      this.$bvModal.show('modalEditarServidor')
    },
    openModalVer(servidor) {
      this.servidorSeleccionado = servidor
      this.$bvModal.show('modalVerProyectosDeServidores')
    }
  }
}
</script>