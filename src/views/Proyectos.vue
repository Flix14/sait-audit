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
            class="mb-4"
            v-model="query"
            :data="proyectos"
            :serializer="proyecto => proyecto.nombre"
            placeholder="Buscar proyectos"
            prepend="Nombre:"
          />
        </b-col>
        <b-col class="text-right">
          <b-button 
            variant="outline-success badge-pill" 
            v-b-modal.modalAgregarProyecto>
            Agregar Proyecto
          </b-button>
        </b-col>
      </b-row>
    </b-container>
    <br>
    <Tabla :proyectos="proyectos"/>
    <ModalAgregarProyecto @proyectoAdding="getProyectos"/>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="rowsPerPage"
      aria-controls="tablaProyectos"
      align="center"
      :hidden="rowsPerPage == 10 ? false : true"
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
      query: ""
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
      }).catch(e => console.log(e))
    }
  },
  mounted() {
    this.getProyectos()
  },
  watch: {
    currentPage: function() {
      this.getProyectos()
    },
    query: function(newQuery) {
      if (newQuery != "") {
        axios.get(`${this.$store.getters.getDireccion}/proyectos?nombre=${newQuery}`).then((res) => {
          this.proyectos = res.data.proyectos
          this.rows = res.data.proyectos.length
          this.rowsPerPage =res.data.proyectos.length
        }) 
      } else {
        this.getProyectos()
      }
    }
  }
}
/*
Lo que falta por mejorar:
  -Eliminar inf de los modales al cerrarlos de cualquier forma
  -Eliminar información del typeahead al agregar un nuevo registro
  -Habilitar el funcionamiento del botón servidores en Proyectos
*/
</script>