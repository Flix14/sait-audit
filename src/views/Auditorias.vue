<template>
  <div>
    <NavBar/>
    <br>
    <div class="text-center">
      <h2>Catalogo de Auditorías</h2>
    </div>
    <br>
    <b-container>
      <b-row>
        <b-col>
          <vue-bootstrap-typeahead
            ref="auditTypeAhead"
            :class="auditorias.length == 0 && query == '' ? 'disabled' : ''"
            v-model="query"
            :data="auditorias"
            :serializer="auditoria => ''"
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
          <br>
          <b-dropdown :text="filtroFecha" variant="light">
            <b-dropdown-item @click="filtrarCualquierFecha">De cualquier fecha</b-dropdown-item>
            <b-dropdown-item @click="filtrarFechaHoy">Hoy</b-dropdown-item>
            <b-dropdown-item @click="filtrarFechaAyer">Ayer</b-dropdown-item>
            <b-dropdown-item @click="filtrarFechaSemana">Esta semana</b-dropdown-item>
            <b-dropdown-item @click="filtrarFechaMes">Este mes</b-dropdown-item>
            <b-dropdown-divider/>
            <b-dropdown-item v-b-modal.modalFechaPersonalizada>Fecha personalizada</b-dropdown-item>
          </b-dropdown>
        </b-col>
        <b-col class="text-right">
          <b-button 
            ref="btnNuevaAuditoria"
            variant="outline-success" 
            :to="{name: 'nuevaAuditoria'}">
            Nueva Auditoria
          </b-button>
        </b-col>
      </b-row>
    </b-container>
    <br>
    <Tabla :auditorias="auditorias"/>
    <div class="container text-center" v-if="auditorias.length == 0">
      <p v-if="!conexion">No hay conexión con el servidor</p>
      <p v-else>No hay datos en la tabla</p>
    </div>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="10"
      align="center"
      :hidden="auditorias.length == 0">
    </b-pagination>
    <ModalFechaPersonalizada @sendingFechas="filtrarFechaPersonalizada" />
  </div>
</template>

<script>
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
      currentPage: 1,
      rows: 10,
      query: '',
      tipoBusqueda: 'Motivo',
      filtroFecha: 'De cualquier fecha',
      limitInf: '0000-00-00T00:00:00',
      limitSup: '',
      conexion: true
    }
  },
  methods: {
    getAuditorias(){
      this.$http.get(`${this.$store.getters.getDireccion}/auditorias?pagina=${this.currentPage}&limit_inf=${this.limitInf}&limit_sup=${this.limitSup}`)
      .then(response => {
        this.auditorias = response.data.auditorias
        this.rows = response.data.pagina.total_elementos
        this.conexion = true
      }).catch(() => this.conexion = false)
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
      var newQuery = this.query //Arreglar esto 
      if (newQuery != '') {
        if (this.tipoBusqueda == 'Motivo') {
          this.$http.get(`${this.$store.getters.getDireccion}/auditorias?pagina=${this.currentPage}&limit_inf=${this.limitInf}&limit_sup=${this.limitSup}&motivo=${newQuery}`)
          .then((res) => {
            this.auditorias = res.data.auditorias
            this.rows = res.data.pagina.total_elementos
          }).catch(() => {
            this.auditorias = []
            this.query = ''
            this.$refs.auditTypeAhead.inputValue = ''
            this.$refs.btnNuevaAuditoria.focus()
          })
        }
        if (this.tipoBusqueda == 'Proyecto') {
          this.$http.get(`${this.$store.getters.getDireccion}/auditorias?pagina=${this.currentPage}&limit_inf=${this.limitInf}&limit_sup=${this.limitSup}&nombre_proyecto=${newQuery}`)
          .then((res) => {
            this.auditorias = res.data.auditorias
            this.rows = res.data.pagina.total_elementos
          }).catch(() => {
            this.auditorias = []
            this.query = ''
            this.$refs.auditTypeAhead.inputValue = ''
            this.$refs.btnNuevaAuditoria.focus()
          }) 
        }
        if (this.tipoBusqueda == 'IP Servidor') {
          this.$http.get(`${this.$store.getters.getDireccion}/auditorias?pagina=${this.currentPage}&limit_inf=${this.limitInf}&limit_sup=${this.limitSup}&ip_servidor=${newQuery}`)
          .then((res) => {
            this.auditorias = res.data.auditorias
            this.rows = res.data.pagina.total_elementos
          }).catch(() => {
            this.auditorias = []
            this.query = ''
            this.$refs.auditTypeAhead.inputValue = ''
            this.$refs.btnNuevaAuditoria.focus()
          })
        }
        if (this.tipoBusqueda == 'Usuario') {
          this.$http.get(`${this.$store.getters.getDireccion}/auditorias?pagina=${this.currentPage}&limit_inf=${this.limitInf}&limit_sup=${this.limitSup}&usuario=${newQuery}`)
          .then((res) => {
            this.auditorias = res.data.auditorias
            this.rows = res.data.pagina.total_elementos
          }).catch(() => {
            this.auditorias = []
            this.query = ''
            this.$refs.auditTypeAhead.inputValue = ''
            this.$refs.btnNuevaAuditoria.focus()
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
      if(this.query == '') {
        this.getAuditorias()
      } else {
        this.setFilters()
      }
    },
    query: function() {
      this.currentPage = 1
      this.setFilters()
    },
    filtroFecha: function() {
      this.currentPage = 1
      this.setFilters()
    },
    tipoBusqueda: function() {
      this.query = ''
      this.$refs.auditTypeAhead.inputValue = ''
    }
  }
}
</script>