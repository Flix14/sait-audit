<template>
  <div>
    <NavBar/>
    <br>
    <div class="text-center">
      <h2>Catalogo de Usuarios</h2>
    </div>
    <br>
    <b-container>
      <b-row >
        <b-col>
          <vue-bootstrap-typeahead
          ref="usTypeAhead"
          :class="usuarios.length == 0 && query == '' ? 'disabled-type-ahead' : ''"
          v-model="query"
          :data="usuarios"
          :serializer="usuario => usuario.email"
          placeholder="Buscar usuarios"
          prepend="Correo Electrónico:"
        />
        </b-col>
        <b-col class="text-right">
          <b-button 
            ref="btnAgregarUsuario"
            variant="outline-success" 
            v-b-modal.modalAgregarUsuario>
            Agregar Usuario
          </b-button>
        </b-col>
      </b-row>
    </b-container>
    <br>
    <div class="container">
      <b-form-group label="Filtrar por estado">
      <b-form-radio-group v-model="filtroEstadoSelected">
        <b-form-radio value="todos">Todos</b-form-radio>
        <b-form-radio value="1">Activo</b-form-radio>
        <b-form-radio value="0">Inactivo</b-form-radio>
      </b-form-radio-group>
    </b-form-group>
    </div>
    <Tabla :usuarios="usuarios" @estadoUpdating="updateList"/>
    <div class="container text-center" v-if="usuarios.length == 0">
      <p v-if="!conexion">No hay conexión con el servidor</p>
      <p v-else>No hay datos en la tabla</p>
    </div>
    <ModalAgregarUsuario @usuarioAdding="getUsuarios"/>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="10"
      align="center"
      :hidden="usuarios.length == 0"
    ></b-pagination>
  </div>
</template>

<script>
import Tabla from '@/components/TablaUsuarios.vue'
import ModalAgregarUsuario from '@/components/ModalAgregarUsuario.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    Tabla,
    ModalAgregarUsuario,
    NavBar
  },
  data() {
    return {
      usuarios: [],
      currentPage: 1,
      rows: 10,
      rowsPerPage: 10,
      query: '',
      filtroEstadoSelected: 'todos',
      conexion: true
    }
  },
  methods: {
    getUsuarios(){
      let selectQuery
      if(this.filtroEstadoSelected == 'todos'){
        selectQuery = `${this.$store.getters.getDireccion}/usuarios?pagina=${this.currentPage}`
      }else {
        selectQuery = `${this.$store.getters.getDireccion}/usuarios?pagina=${this.currentPage}&estado=${this.filtroEstadoSelected}`
      }
      this.$http.get(selectQuery).then(response => {
        this.usuarios = response.data.usuarios
        this.rows = response.data.pagina.total_elementos
        this.$refs.usTypeAhead.inputValue = '' //Al hacer esto se invoca dos veces, sucede en todas las tablas !!ARREGLAR
        this.query = ''
        this.conexion = true
      }).catch(() => this.conexion = false)
    },
    getUsuariosPerQuery(){
      let newQuery = this.query
      let selectQuery
      if (newQuery != '') {
        if(this.filtroEstadoSelected == 'todos'){
          selectQuery = `${this.$store.getters.getDireccion}/usuarios?pagina=${this.currentPage}&email=${newQuery}`
        }else {
          selectQuery = `${this.$store.getters.getDireccion}/usuarios?pagina=${this.currentPage}&email=${newQuery}&estado=${this.filtroEstadoSelected}`
        }
        this.$http.get(selectQuery).then((res) => {
          this.usuarios = res.data.usuarios
          this.rows = res.data.pagina.total_elementos
        }).catch(() => {
            this.usuarios = []
            this.query = ''
            this.$refs.usTypeAhead.inputValue = ''
            this.$refs.btnAgregarUsuario.focus()
          })
      } else {
        this.getUsuarios()
      }
    },
    updateList() {
      if(this.query == '') {
        this.getUsuarios()
      } else {
        this.getUsuariosPerQuery()
      }
    }
  },
  mounted() {
    this.getUsuarios()
  },
  watch: {
    currentPage: function() {
      if(this.query == '') {
        this.getUsuarios()
      } else {
        this.getUsuariosPerQuery()
      }
    },
    query: function() {
      this.currentPage = 1
      this.getUsuariosPerQuery()
    },
    filtroEstadoSelected: function() {
      this.currentPage = 1
      this.getUsuarios()
    }
  }
}
</script>