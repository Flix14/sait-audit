<template>
  <div class="usuarios">
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
            class="mb-4"
            v-model="query"
            :data="usuarios"
            :serializer="usuario => usuario.email"
            placeholder="Buscar usuarios"
            prepend="Correo Electrónico:"
          />
        </b-col>
        <b-col class="text-right">
          <b-button 
            variant="outline-success" 
            v-b-modal.modalAgregarUsuario>
            Agregar Usuario
          </b-button>
        </b-col>
      </b-row>
    </b-container>
    <div class="container">
      <b-form-group label="Filtrar por estado">
      <b-form-radio-group v-model="filtroEstadoSelected">
        <b-form-radio value="todos">Todos</b-form-radio>
        <b-form-radio value="1">Activo</b-form-radio>
        <b-form-radio value="0">Inactivo</b-form-radio>
      </b-form-radio-group>
    </b-form-group>
    </div>
    <Tabla :usuarios="usuarios" @estadoUpdating="query == '' ? getUsuarios : getUsuariosPerQuery(query)"/>
    <ModalAgregarUsuario @usuarioAdding="getUsuarios"/>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="rowsPerPage"
      aria-controls="tablaUsuarios"
      align="center"
      :hidden="rowsPerPage == 10 ? false : true"
    ></b-pagination>
  </div>
</template>

<script>
import axios from 'axios'
import Tabla from '@/components/TablaUsuarios.vue'
import ModalAgregarUsuario from '@/components/ModalAgregarUsuario.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'usuarios',
  components: {
    Tabla,
    ModalAgregarUsuario,
    NavBar
  },
  data() {
    return {
      usuarios: [],
      pagina: null,
      currentPage: 1,
      rows: 10,
      rowsPerPage: 10,
      query: '',
      filtroEstadoSelected: 'todos'
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
      axios.get(selectQuery).then(response => {
        this.usuarios = response.data.usuarios
        this.pagina = response.data.pagina
        this.rows = this.pagina.total_elementos
        this.rowsPerPage = 10
        this.$refs.usTypeAhead.inputValue = '' //Al hacer esto se invoca dos veces, sucede en todas las tablas !!ARREGLAR
        this.query = ''
      }).catch(e => console.log(e))
    },
    getUsuariosPerQuery(newQuery){
      let selectQuery
      if (newQuery != "") {
        if(this.filtroEstadoSelected == 'todos'){
          selectQuery = `${this.$store.getters.getDireccion}/usuarios?email=${newQuery}`
        }else {
          selectQuery = `${this.$store.getters.getDireccion}/usuarios?email=${newQuery}&estado=${this.filtroEstadoSelected}`
        }
        axios.get(selectQuery).then((res) => {
          this.usuarios = res.data.usuarios
          this.rows = res.data.usuarios.length
          this.rowsPerPage = res.data.usuarios.length
        }) 
      } else {
        this.getUsuarios()
      }
    }
  },
  mounted() {
    this.getUsuarios()
  },
  watch: {
    currentPage: function() {
      this.getUsuarios()
    },
    query: function(newQuery) {
      this.getUsuariosPerQuery(newQuery)
    },
    filtroEstadoSelected: function() {
      this.getUsuarios()
    }
  }
}
</script>