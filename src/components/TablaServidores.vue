<template>
  <div class="container table-responsive">
    <table class="table table-dark table-hover table-bordered" >
      <thead>
        <tr>
          <th scope="col">Dirección pública</th>
          <th scope="col">Sistema operativo</th>
          <th scope="col">Dominios</th> 
          <th class="text-right">Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="servidor in servidores" :key="servidor.id">
          <td>{{servidor.direccion_publica}}</td>
          <td>{{servidor.sistema_operativo}}</td>
          <td>{{servidor.dominio}}
            <p v-for="dominio in servidor.dominios" :key="dominio.id">{{dominio.dominio}}</p>
          </td>
          <td class="text-right">
            <b-button 
              variant="btn btn-outline-success badge-pill" 
              style="width:120px;"
              @click="servidorSeleccionado = servidor; $bvModal.show('modalVerProyectosDeServidores')">
              Ver proyectos
            </b-button>
            <b-button 
              variant="btn btn-outline-info badge-pill"  
              style="width:90px; margin: 5px;" 
              @click="servidorSeleccionado = servidor; $bvModal.show('modalEditarServidor')">
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
    servidores: null
  },
  data() {
    return {
      servidorSeleccionado: null
    }
  },
  methods: {
    updateListServidores(newServidor) {
      var oldServidor = this.servidores.find(element => {
          return element.id == newServidor.id
        })
      oldServidor.sistema_operativo = newServidor.sistema_operativo
    }
  }
}
</script>