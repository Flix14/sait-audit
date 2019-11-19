<template>
  <div class="container table-responsive">
    <table class="table table-dark table-hover table-bordered">
      <thead>
        <tr> 
          <th>Correo Electronico</th> 
          <th>Estado</th> 
          <th class="text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="usuario in usuarios" :key="usuario.id"> 
          <td>{{usuario.email}}</td>
          <td>{{usuario.estado == 1 ? 'Activo' : 'Inactivo'}}</td>
          <td class="text-center">
            <button 
              class="btn btn-outline-info badge-pill"  
              @click="openModalEditar(usuario)">
              Editar
            </button>
            <button 
              :class="usuario.estado == 1 ? 'btn btn-outline-danger badge-pill' : 'btn btn-outline-success badge-pill'"
              @click="changeStatus(usuario.id, usuario.email, usuario.estado)">
              {{usuario.estado == 1 ? 'Desactivar' : 'Activar'}}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <ModalEditarUsuario :idUsuario="usuarioSeleccionado ? usuarioSeleccionado.id : null" @usuarioUpdating="updateListUsuarios"/>
  </div>
</template>

<script>
import ModalEditarUsuario from '@/components/ModalEditarUsuario.vue'

export default {
  components: {
    ModalEditarUsuario
  },
  props: {
    usuarios: Array
  },
  data() {
    return {
      usuarioSeleccionado: null
    }
  },
  methods: {
    changeStatus(id, email, estado){
      this.$http.put(`${this.$store.getters.getDireccion}/usuarios/${id}`, {
        email: email,
        estado: estado == 1 ? 0 : 1
      }).then(response => {
        var usuario = this.usuarios.find(element => {
          return element.id == response.data.id
        })
        usuario.estado = response.data.estado
        this.$emit('estadoUpdating')
      }).catch(() => {
        this.$bvModal.msgBoxOk('No se ha podido establecer conexión con el servidor', {
          title: 'Problemas de conexión',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'success',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
        })
      })
    },
    updateListUsuarios(newUsuario) {
      var oldUsuario = this.usuarios.find(element => {
          return element.id == newUsuario.id
        })
      oldUsuario.email = newUsuario.email
    },
    openModalEditar(usuario) {
      this.usuarioSeleccionado = usuario 
      this.$bvModal.show('modalEditarUsuario')
    }
  }
}
</script>

<style scoped>
.btn-outline-success {
  width:90px; 
  margin-left: 10px;
}

.btn-outline-danger {
  width:90px; 
  margin-left: 10px;
}
</style>