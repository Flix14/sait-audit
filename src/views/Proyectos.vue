<template>
  <div class="proyectos">
    <NavBar/>
    <br>
    <div class="text-center">
      <h2>Catalogo de Proyectos</h2>
    </div>
    <br>
    <b-container>
      <b-row >
        <b-col>
          <vue-bootstrap-typeahead
            ref="proyectTypeAhead"
            :class="proyectos.length == 0 && query == '' ? 'disabled' : ''"
            v-model="query"
            :data="proyectos"
            :serializer="proyecto => proyecto.nombre"
            placeholder="Buscar proyectos"
            prepend="Nombre:"
          />
        </b-col>
        <b-col class="text-right">
          <b-button 
            ref="btnAgregarProyecto"
            variant="outline-success" 
            v-b-modal.modalAgregarProyecto>
            Agregar Proyecto
          </b-button>
        </b-col>
      </b-row>
    </b-container>
    <br>
    <Tabla :proyectos="proyectos"/>
    <ModalAgregarProyecto @proyectoAdding="getProyectos"/>
    <div class="container text-center" v-if="proyectos.length == 0">
      <p v-if="!conexion">No hay conexión con el servidor</p>
      <p v-else>No hay datos en la tabla</p>
    </div>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="rowsPerPage"
      aria-controls="tablaProyectos"
      align="center"
      :hidden="rowsPerPage != 10 || proyectos.length == 0"
    ></b-pagination>
  </div>
</template>

<script>
import axios from 'axios'
import Tabla from '@/components/TablaProyectos.vue'
import ModalAgregarProyecto from '@/components/ModalAgregarProyecto.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'proyectos',
  components: {
    Tabla,
    ModalAgregarProyecto,
    NavBar
  },
  data() {
    return {
      proyectos: [],
      pagina: null,
      currentPage: 1,
      rows: 10,
      rowsPerPage: 10,
      query: "",
      conexion: true
    }
  },
  methods: {
    getProyectos(){
      axios.get(`${this.$store.getters.getDireccion}/proyectos?pagina=${this.currentPage}`).then(response => {
        this.proyectos = response.data.proyectos
        this.pagina = response.data.pagina
        this.rows = this.pagina.total_elementos
        this.rowsPerPage = 10
        this.query = ''
        this.$refs.proyectTypeAhead.inputValue = ''
        this.conexion = true
      }).catch(() => this.conexion = false)
    },
    getProyectosPerQuery() {
      let newQuery = this.query
      if (newQuery != "") {
        axios.get(`${this.$store.getters.getDireccion}/proyectos?pagina=${this.currentPage}&nombre=${newQuery}`).then((res) => {
          this.proyectos = res.data.proyectos
          this.pagina = res.data.pagina
          this.rows = this.pagina.total_elementos
          this.rowsPerPage = 10
        }).catch((e) => {
          this.proyectos = []
          this.query = ''
          this.$refs.proyectTypeAhead.inputValue = ''
          this.$refs.btnAgregarProyecto.focus()
          console.log(e)
        })
      } else {
        this.getProyectos()
      }
    }
  },
  mounted() {
    this.getProyectos()
  },
  watch: {
    currentPage: function() {
      if(this.query == '') {
        this.getProyectos()
      } else {
        this.getProyectosPerQuery()
      }
    },
    query: function() {
      this.currentPage = 1
      this.getProyectosPerQuery()
    }
  }
}
</script>