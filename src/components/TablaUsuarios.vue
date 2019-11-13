<template>
  <div class="container table-responsive">
    <table id="tablaUsuarios" class="table table-dark table-hover table-bordered">
      <thead>
        <tr> 
          <th scope="col">Correo Electronico</th> 
          <th scope="col">Estado</th> 
          <th class="text-right">Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="usuario in usuarios" :key="usuario.id"> 
          <td>{{usuario.email}}</td>
          <td>{{usuario.estado == 1 ? "Activo" : "Inactivo"}}</td>
          <td class="text-right">
            <button 
              class="btn btn-outline-info badge-pill" 
              style="width:90px; margin: 5px;" 
              @click="usuarioSeleccionado = usuario; $bvModal.show('modalEditarUsuario')">
              Editar
            </button>
            <button 
              class="btn btn-outline-danger badge-pill" 
              style="width:90px;" 
              @click="changeStatus(usuario.id, usuario.email, usuario.estado)">
              {{usuario.estado == 1 ? "Desactivar" : "Activar"}}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <ModalEditarUsuario :idUsuario="usuarioSeleccionado ? usuarioSeleccionado.id : null" @usuarioUpdating="updateListUsuarios"/>
  </div>
</template>

<script>
import axios from 'axios'
import ModalEditarUsuario from '@/components/ModalEditarUsuario.vue'

export default {
  components: {
    ModalEditarUsuario
  },
  props: {
    usuarios: null
  },
  data() {
    return {
      usuarioSeleccionado: null
    }
  },
  methods: {
    changeStatus(id, email, estado){
      axios.put(`${this.$store.getters.getDireccion}/usuarios/${id}`, {
        email: email,
        estado: estado == 1 ? 0 : 1
      }).then(response => {
        var usuario = this.usuarios.find(element => {
          return element.id == response.data.id
        })
        usuario.estado = response.data.estado
        this.$emit('estadoUpdating')
      }).catch(() => alert("No hay conexión con la base de datos"))
    },
    updateListUsuarios(newUsuario) {
      var oldUsuario = this.usuarios.find(element => {
          return element.id == newUsuario.id
        })
      oldUsuario.email = newUsuario.email
    }
  }
}
</script>