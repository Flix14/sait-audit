<template>
  <div>
    <NavBar/>
    <br>
    <div class="text-center">
      <h2>Nueva Auditoría</h2>
    </div>
    <br>
    <b-form inline class="text-center">
      <b-col>
        <h4>Usuario</h4>
        <b-form-input v-model="emailUsuario" type="text" disabled />
      </b-col>
      <b-col>
        <h4>Proyecto*</h4>
        <b-form-select 
          v-model="selectedProyecto" 
          :options="proyectos"
          :state="changeStateInputProyecto">
        </b-form-select>
      </b-col>
      <b-col>
        <h4>IP Servidor*</h4>
        <b-form-select 
          v-model="selectedServidor" 
          :options="servidores" 
          :disabled="selectedProyecto == 'Selecciona un proyecto'"
          :state="changeStateInputServidor">
        </b-form-select>
      </b-col>
    </b-form>
    <br>
    <div class="container">
      <h4>Motivo*:</h4>
      <b-form inline>
        <b-form-select 
          v-model="selectedMotivo" 
          :options="motivos" 
          :state="changeStateInputMotivo">
        </b-form-select>
        <b-col v-if="selectedMotivo == 'Otro '">
          <b-form inline>
            <h6>Especifica*:</h6>
            <b-form-input 
              v-model="otroMotivo" 
              type="text" 
              :state="changeStateInputMotivoOtro">
            </b-form-input>
          </b-form>
        </b-col>
      </b-form>
      <br>
      <h4>Comentarios:</h4>
      <b-form-textarea
        v-model="comentario"
        placeholder="Sin comentarios"  
        rows="3">
      </b-form-textarea>
      <br>
      <h4>Lista de comandos*:</h4>
      <b-form-textarea
        v-model="comandos"
        rows="10"
        :state="changeStateInputComandos">
      </b-form-textarea>
      <br>
      <div class="text-center">
        <button class="btn btn-outline-danger badge-pill" @click="$router.go(-1)">Cancelar</button>
        <button class="btn btn-outline-success badge-pill" @click="guardarAuditoria()">Guardar</button>
      </div>
      <br>
    </div>
    <b-alert 
      class="position-fixed fixed-top m-0 rounded-0"
      style="z-index: 2000;"
      variant="danger" 
      v-model="showWarning" 
      dismissible>
      Ingrese todos los campos marcados para guardar la auditoría
    </b-alert>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      servidores: ['Selecciona un servidor'],
      proyectos: ['Selecciona un proyecto'],
      emailUsuario: '',
      idUsuario: 0, 
      motivos: ['Selecciona un motivo', 'Actualización', 'Revisión', 'Otro '],
      comentario: '',
      comandos: '',
      selectedServidor: 'Selecciona un servidor',
      selectedProyecto: 'Selecciona un proyecto',
      selectedMotivo: 'Selecciona un motivo',
      otroMotivo: '',
      showWarning: false
    }
  },
  methods: {
    getProyectos(){
      var listaProyectos = []
      this.$http.get(`${this.$store.getters.getDireccion}/proyectos`).then(response => {
        listaProyectos = response.data.proyectos
        listaProyectos.forEach(proyecto => {
        this.proyectos.push({value: proyecto.id, text: proyecto.nombre})
      })
      }).catch(() => {
        this.$bvModal.msgBoxOk('No se ha podido establecer conexión con el servidor', {
          title: 'Problemas de conexión',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'success',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
        }).then(() => {
          this.$router.push({name: 'home'})
        })
      })
    },
    getServidores(){
      var listaServidores = []
      this.$http.get(`${this.$store.getters.getDireccion}/proyectos/${this.selectedProyecto}/servidores`).then(response => {
        listaServidores = response.data
        listaServidores.forEach(servidor => {
        this.servidores.push({value: servidor.id, text: servidor.direccion_publica})
      })
      }).catch(() => {
        this.$bvModal.msgBoxOk('No se ha podido establecer conexión con el servidor', {
          title: 'Problemas de conexión',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'success',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
        }).then(() => {
          this.$router.push({name: 'home'})
        })
      })
    },
    guardarAuditoria() {
      this.showWarning = false
      if(this.changeStateInputProyecto && this.changeStateInputServidor && this.changeStateInputMotivo && this.changeStateInputMotivoOtro && this.changeStateInputComandos) {
        this.$http.post(`${this.$store.getters.getDireccion}/auditorias`, {
        motivo: this.selectedMotivo + this.otroMotivo,
        comentario: this.comentario,
        comandos: this.comandos,
        id_usuario: this.idUsuario,
        id_proyecto: this.selectedProyecto,
        id_servidor: this.selectedServidor
      }).then(response => {
        this.$bvModal.msgBoxOk(`Auditoría #${response.data.id} guardada correctamente`, {
            title: 'Aviso',
            size: 'sm',
            buttonSize: 'sm',
            okVariant: 'success',
            headerClass: 'p-2 border-bottom-0',
            footerClass: 'p-2 border-top-0',
            centered: true
          }).then(res => {
            if(res) {
              this.$router.push({name: 'home'})
            }
          })
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
      } else {
        this.showWarning = true
      }
    }
  },
  mounted(){
    this.emailUsuario = this.$store.getters.getEmailUsuario
    this.idUsuario = this.$store.getters.getIdUsuario
    this.getProyectos()
  },
  watch: {
    selectedProyecto: function(newSelectedProyecto) {
      this.servidores = ['Selecciona un servidor']
      this.selectedServidor = 'Selecciona un servidor'
      if(newSelectedProyecto != 'Selecciona un proyecto') {
        this.getServidores()
      }
    }
  },
  computed: {
    changeStateInputProyecto: function() {
      return this.selectedProyecto == 'Selecciona un proyecto' ? false : true
    },
    changeStateInputServidor: function() {
      return this.selectedServidor == 'Selecciona un servidor' ? false : true
    },
    changeStateInputMotivo: function() {
      return this.selectedMotivo == 'Selecciona un motivo' ? false : true
    },
    changeStateInputComandos: function() {
      return this.comandos == '' ? false : true
    },
    changeStateInputMotivoOtro: function() {
      return this.selectedMotivo != 'Otro ' || this.otroMotivo != '' ? true : false
    }
  }
}
</script>

<style scoped>
[disabled] {
  background-color: white;
}

h6 {
  margin-right: 10px
}

button {
  width: 100px; 
  margin-left: 5px;
  margin-right: 5px;
}
</style>