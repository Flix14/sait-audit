<template>
  <div class="home">
    <NavBar/>
    <br>
    <b-container>
      <b-row>
        <b-col class="text-right">
          <b-button 
            variant="outline-success" 
            :to="{name: 'nuevaAuditoria'}">
            Nueva Auditoria
          </b-button>
        </b-col>
      </b-row>
    </b-container>
    <div class="text-center"> 
      <br>
      <h2>Últimas Auditorías</h2>
    </div>
    <br>
    <TablaAuditorias :auditorias="auditorias"/>
    <div class="container text-center" v-if="auditorias.length == 0">
      <p v-if="!conexion">No hay conexión con el servidor</p>
      <p v-else>No hay datos en la tabla</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TablaAuditorias from '@/components/TablaAuditorias.vue'
import axios from 'axios'
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'home',
  components: {
    TablaAuditorias,
    NavBar
  },
  data() {
    return {
      auditorias: [],
      conexion: true
    }
  },
  methods: {
    getAuditorias(){
      axios.get(`${this.$store.getters.getDireccion}/auditorias?pagina=1`)
      .then(response => {
        this.auditorias = response.data.auditorias
        this.pagina = response.data.pagina
        this.rows = this.pagina.total_elementos
        this.rowsPerPage = 10
        this.conexion = true
      }).catch(() => this.conexion = false)
    }
  },
  mounted() {
    this.getAuditorias()
  }
}
</script>
