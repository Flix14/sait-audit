<template>
  <div class="auditorias">
    <NavBar/>
    <br>
    <div class="text-center">
      <h2>Catalogo de Auditorías</h2>
    </div>
    <br>
    <b-container>
      <b-row >
        <b-col>
          <vue-bootstrap-typeahead
            ref="auditTypeAhead"
            class="mb-4"
            v-model="query"
            :data="auditorias"
            :serializer="auditoria => changeSerializer(auditoria)"
            placeholder="Buscar auditorias"
          >
            <template v-slot:prepend>
              <b-dropdown :text="tipoBusqueda" variant="dark">
                <b-dropdown-item @click="tipoBusqueda = 'Proyecto'">Proyecto</b-dropdown-item>
                <b-dropdown-item @click="tipoBusqueda = 'IP Servidor'">IP Servidor</b-dropdown-item>
                <b-dropdown-item @click="tipoBusqueda = 'Usuario'">Usuario</b-dropdown-item>
                <b-dropdown-item @click="tipoBusqueda = 'Motivo'">Motivo</b-dropdown-item>
              </b-dropdown>
            </template>
          </vue-bootstrap-typeahead>
          <b-dropdown :text="filtroFecha" variant="light">
            <b-dropdown-item @click="filtrarCualquierFecha">De cualquier fecha</b-dropdown-item>
            <b-dropdown-item @click="filtrarFechaHoy">Hoy</b-dropdown-item>
            <b-dropdown-item @click="filtrarFechaAyer">Ayer</b-dropdown-item>
            <b-dropdown-item @click="filtrarFechaSemana">Esta semana</b-dropdown-item>
            <b-dropdown-item @click="filtrarFechaMes">Este mes</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item v-b-modal.modalFechaPersonalizada>Fecha personalizada</b-dropdown-item>
          </b-dropdown>
        </b-col>
        <b-col class="text-right">
          <b-button 
            variant="outline-success" 
            :to="{name: 'nuevaAuditoria'}">
            Nueva Auditoria
          </b-button>
        </b-col>
      </b-row>
    </b-container>
    <br>
    <Tabla :auditorias="auditorias"/>
    <ModalFechaPersonalizada @sendingFechas="filtrarFechaPersonalizada" />
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="rowsPerPage"
      aria-controls="tablaAuditorias"
      align="center"
      :hidden="rowsPerPage == 10 ? false : true"
    ></b-pagination>
  </div>
</template>

<script>
import axios from 'axios'
import Tabla from '@/components/TablaAuditorias.vue'
import ModalFechaPersonalizada from '@/components/ModalFechaPersonalizada.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'auditorias',
  components: {
    Tabla,
    ModalFechaPersonalizada,
    NavBar
  },
  data() {
    return {
      auditorias: [],
      pagina: null,
      currentPage: 1,
      rows: 10,
      rowsPerPage: 10,
      query: "",
      tipoBusqueda: "Motivo",
      filtroFecha: 'De cualquier fecha',
      limitInf: "0000-00-00T00:00:00",
      limitSup: "",
      typeAheadData: []
    }
  },
  methods: {
    getAuditorias(){
      axios.get(`${this.$store.getters.getDireccion}/auditorias?pagina=${this.currentPage}&limit_inf=${this.limitInf}&limit_sup=${this.limitSup}`)
      .then(response => {
        this.auditorias = response.data.auditorias
        this.pagina = response.data.pagina
        this.rows = this.pagina.total_elementos
        this.rowsPerPage = 10
      }).catch(e => console.log(e))
    },
    changeSerializer(/*auditoria*/){ //Arreglar
      if(this.tipoBusqueda == 'Motivo') {
        //return auditoria.motivo 
      }
      if(this.tipoBusqueda == 'Proyecto') {
        //return auditoria.nombre_proyecto
      }
      if(this.tipoBusqueda == 'IP Servidor') {
        //return auditoria.ip_servidor
      }
      if(this.tipoBusqueda == 'Usuario') {
        //return auditoria.usuario
      }
      return ''
    },
    getFechaYHora(){
      let fecha = new Date()
      return fecha.getFullYear() + '-' + (fecha.getMonth()+1)  + '-' + fecha.getDate() + 'T'  + fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds()
    },
    filtrarCualquierFecha() {
      this.limitInf = '0000-00-00T00:00:00'
      this.limitSup = this.getFechaYHora()
      this.filtroFecha = 'De cualquier fecha'
    },
    filtrarFechaHoy() {
      let fechaHoy = new Date()
      //limit_inf de - limit_sup hasta
      this.limitInf = fechaHoy.getFullYear() + '-' + (fechaHoy.getMonth()+1)  + '-' + fechaHoy.getDate() + 'T'  + '00:00:00'
      this.limitSup = this.getFechaYHora()
      this.filtroFecha = 'Hoy'
    },
    filtrarFechaAyer() {
      let fechaAyer = new Date(new Date().getTime() - 24*60*60*1000)
      this.limitInf = fechaAyer.getFullYear() + '-' + (fechaAyer.getMonth()+1)  + '-' + fechaAyer.getDate() + 'T'  + '00:00:00'
      this.limitSup = fechaAyer.getFullYear() + '-' + (fechaAyer.getMonth()+1)  + '-' + fechaAyer.getDate() + 'T'  + '23:59:59'
      this.filtroFecha = 'Ayer'
    },
    filtrarFechaSemana() {
      let fechaInicioSemana = new Date(new Date().getTime() - (24*60*60*1000)*new Date().getDay())
      this.limitInf = fechaInicioSemana.getFullYear() + '-' + (fechaInicioSemana.getMonth()+1)  + '-' + fechaInicioSemana.getDate() + 'T'  + '00:00:00'
      this.limitSup = this.getFechaYHora()
      this.filtroFecha = 'Esta semana'
    },
    filtrarFechaMes() {
      let fechaInicioMes = new Date(new Date().getTime() - (24*60*60*1000)*(new Date().getDate()-1))
      this.limitInf = fechaInicioMes.getFullYear() + '-' + (fechaInicioMes.getMonth()+1)  + '-' + fechaInicioMes.getDate() + 'T'  + '00:00:00'
      this.limitSup = this.getFechaYHora()
      this.filtroFecha = 'Este mes'
    },
    filtrarFechaPersonalizada(fechas) {
      this.limitInf = fechas.inicio + 'T00:00:00'
      this.limitSup = fechas.fin + 'T23:59:59'
      this.filtroFecha = 'Fecha personalizada'
      this.setFilters() //Ver si se puede mejorar
    },
    setFilters() {
      var newQuery = this.query //Arreglar esto y de paso agregar `` en las operaciones donde se use ''
      if (newQuery != "") {
        if (this.tipoBusqueda == "Motivo") {
          axios.get(`${this.$store.getters.getDireccion}/auditorias?pagina=${this.currentPage}&limit_inf=${this.limitInf}&limit_sup=${this.limitSup}&motivo=${newQuery}`)
          .then((res) => {
            this.auditorias = res.data.auditorias
            this.rows = res.data.pagina.total_elementos
            this.rowsPerPage = 10 //Cambiar todo esto, es innecesaria esta variable
          }) 
        }
        if (this.tipoBusqueda == "Proyecto") {
          axios.get(`${this.$store.getters.getDireccion}/auditorias?pagina=${this.currentPage}&limit_inf=${this.limitInf}&limit_sup=${this.limitSup}&nombre_proyecto=${newQuery}`)
          .then((res) => {
            this.auditorias = res.data.auditorias
            this.rows = res.data.pagina.total_elementos
            this.rowsPerPage = 10
          }) 
        }
        if (this.tipoBusqueda == "IP Servidor") {
          axios.get(`${this.$store.getters.getDireccion}/auditorias?pagina=${this.currentPage}&limit_inf=${this.limitInf}&limit_sup=${this.limitSup}&ip_servidor=${newQuery}`)
          .then((res) => {
            this.auditorias = res.data.auditorias
            this.rows = res.data.pagina.total_elementos
            this.rowsPerPage = 10
          }) 
        }
        if (this.tipoBusqueda == "Usuario") {
          axios.get(`${this.$store.getters.getDireccion}/auditorias?pagina=${this.currentPage}&limit_inf=${this.limitInf}&limit_sup=${this.limitSup}&usuario=${newQuery}`)
          .then((res) => {
            this.auditorias = res.data.auditorias
            this.rows = res.data.pagina.total_elementos
            this.rowsPerPage = 10
          }) 
        }
      } else {
        this.getAuditorias()
      }
    }
  },
  mounted() {
    this.limitSup = this.getFechaYHora()
    this.getAuditorias()
  },
  watch: {
    currentPage: function() {
      this.getAuditorias()
    },
    query: function() { //Repara backend para las demás tablas para que devuelva número de elementos con filtros
      this.typeAheadData = []
      this.setFilters()
    },
    filtroFecha: function() {
      this.setFilters()
    },
    tipoBusqueda: function() {
      this.query = ''
      this.$refs.auditTypeAhead.inputValue = ''
    }
  }
}
</script>