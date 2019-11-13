<template>
  <div class="servidores">
    <NavBar/>
    <br>
    <div class="text-center">
      <h2>Catalogo de Servidores</h2>
    </div>
    <br>
    <b-container>
      <b-row >
        <b-col>
          <vue-bootstrap-typeahead
            ref="servTypeAhead"
            :class="servidores.length == 0 && query == '' ? 'disabled' : ''"
            v-model="query"
            :data="tipoBusqueda == 'Dirección pública' ? servidores : dominios"
            :serializer="data => tipoBusqueda == 'Dirección pública' ? data.direccion_publica : data"
            placeholder="Buscar servidores"
          >
            <template v-slot:prepend>
              <b-dropdown :text="tipoBusqueda" variant="dark">
                <b-dropdown-item @click="tipoBusqueda = 'Dirección pública'">Dirección pública</b-dropdown-item>
                <b-dropdown-item @click="tipoBusqueda = 'Dominio'">Dominio</b-dropdown-item>
              </b-dropdown>
            </template>
          </vue-bootstrap-typeahead>
        </b-col>
        <b-col class="text-right">
          <b-button 
            ref="btnAgregarServidor"
            variant="outline-success" 
            v-b-modal.modalAgregarServidor>
            Agregar Servidor
          </b-button>
        </b-col>
      </b-row>
    </b-container>
    <br>
    <Tabla :servidores="servidores"/>
    <ModalAgregarServidor @servidorAdding="getServidores"/>
    <div class="container text-center" v-if="servidores.length == 0">
      <p v-if="!conexion">No hay conexión con el servidor</p>
      <p v-else>No hay datos en la tabla</p>
    </div>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="rowsPerPage"
      aria-controls="tablaServidores"
      align="center"
      :hidden="rowsPerPage != 10 || servidores.length == 0"
    ></b-pagination>
  </div>
</template>

<script>
import axios from 'axios'
import Tabla from '@/components/TablaServidores.vue'
import ModalAgregarServidor from '@/components/ModalAgregarServidor.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'servidores',
  components: {
    Tabla,
    ModalAgregarServidor,
    NavBar
  },
  data() {
    return {
      servidores: [],
      dominios: [],
      pagina: null,
      currentPage: 1,
      rows: 10,
      rowsPerPage: 10,
      query: "",
      tipoBusqueda: "Dirección pública",
      conexion: true
    }
  },
  methods: {
    getServidores(){
      axios.get(`${this.$store.getters.getDireccion}/servidores?pagina=${this.currentPage}`).then(response => {
        this.servidores = response.data.servidores
        this.pagina = response.data.pagina
        this.rows = this.pagina.total_elementos
        this.rowsPerPage = 10
        this.query = ''
        this.$refs.servTypeAhead.inputValue = ''
        this.conexion = true
      }).catch(() => this.conexion = false)
    }
  },
  mounted() {
    this.getServidores()
  },
  watch: {
    currentPage: function() {
      this.getServidores()
    },
    query: function(newQuery) {
      if (newQuery != "") {
        if (this.tipoBusqueda == "Dirección pública") {
          axios.get(`${this.$store.getters.getDireccion}/servidores?direccion_publica=${newQuery}`).then((res) => {
            this.servidores = res.data.servidores
            this.rows = res.data.servidores.length
            this.rowsPerPage = res.data.servidores.length
          }).catch(() => {
            this.servidores = []
            this.query = ''
            this.$refs.servTypeAhead.inputValue = ''
            this.$refs.btnAgregarServidor.focus()
          })
        } else {
          var listaServidores = []
          this.dominios = []
          axios.get(`${this.$store.getters.getDireccion}/servidores?dominio=${newQuery}`).then((res) => {
            listaServidores = res.data.servidores
            this.servidores = listaServidores
            listaServidores.forEach(servidor => {
              servidor.dominios.forEach(dominio => {
                this.dominios.push(dominio.dominio)
              })
            })
            this.rows = res.data.servidores.length
            this.rowsPerPage = res.data.servidores.length
          }).catch(() => {
            this.servidores = []
            this.query = ''
            this.$refs.servTypeAhead.inputValue = ''
            this.$refs.btnAgregarServidor.focus()
          })
        }
      } else {
        this.getServidores()
      }
    },
    tipoBusqueda: function() {
      this.getServidores()
    }
  }
}
</script>

<style>
select:focus{ outline: none;}
</style>