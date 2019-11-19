<template>
  <div>
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
      :per-page="10"
      align="center"
      :hidden="servidores.length == 0"
    ></b-pagination>
  </div>
</template>

<script>
import Tabla from '@/components/TablaServidores.vue'
import ModalAgregarServidor from '@/components/ModalAgregarServidor.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    Tabla,
    ModalAgregarServidor,
    NavBar
  },
  data() {
    return {
      servidores: [],
      dominios: [],
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
      this.$http.get(`${this.$store.getters.getDireccion}/servidores?pagina=${this.currentPage}`).then(response => {
        this.servidores = response.data.servidores
        this.rows = response.data.pagina.total_elementos
        this.conexion = true
      }).catch(() => this.conexion = false)
    },
    getServidoresPerQuery() {
      let newQuery = this.query
      if (newQuery != '') {
        if (this.tipoBusqueda == 'Dirección pública') {
          this.$http.get(`${this.$store.getters.getDireccion}/servidores?pagina=${this.currentPage}&direccion_publica=${newQuery}`).then((res) => {
            this.servidores = res.data.servidores
            this.rows = res.data.pagina.total_elementos
          }).catch(() => {
            this.servidores = []
            this.query = ''
            this.$refs.servTypeAhead.inputValue = ''
            this.$refs.btnAgregarServidor.focus()
          })
        } else {
          var listaServidores = []
          this.dominios = []
          this.$http.get(`${this.$store.getters.getDireccion}/servidores?pagina=${this.currentPage}&dominio=${newQuery}`).then((res) => {
            listaServidores = res.data.servidores
            this.servidores = listaServidores
            listaServidores.forEach(servidor => {
              servidor.dominios.forEach(dominio => {
                this.dominios.push(dominio.dominio)
              })
            })
            this.rows = res.data.pagina.total_elementos
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
    }
  },
  mounted() {
    this.getServidores()
  },
  watch: {
    currentPage: function() {
      if(this.query == '') {
        this.getServidores()
      } else {
        this.getServidoresPerQuery()
      }
    },
    query: function() {
      this.currentPage = 1
      this.getServidoresPerQuery()
    },
    tipoBusqueda: function() {
      this.currentPage = 1
      this.query = ''
      this.$refs.servTypeAhead.inputValue = ''
    }
  }
}
</script>