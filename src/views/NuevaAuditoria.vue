<template>
  <div class="nuevaAuditoria ">
    <NavBar/>
    <br>
    <div class="text-center">
      <h2>Nueva Auditoría</h2>
    </div>
    <br>
    <b-form inline class="text-center">
      <b-col>
        <h4 class="mr-sm-10" for="inline-form-custom-select-pref">Usuario</h4>
        <b-form-input v-model="emailUsuario" type="text" style="background-color: #FFFFFF" disabled></b-form-input>
      </b-col>
      <b-col>
        <h4 class="mr-sm-10" for="inline-form-custom-select-pref">Proyecto*</h4>
        <b-form-select 
          ref="selectProyecto"
          v-model="selectedProyecto" 
          :options="proyectos"
          :state="changeStateInputProyecto">
        </b-form-select>
      </b-col>
      <b-col>
        <h4 class="mr-sm-10" for="inline-form-custom-select-pref">IP Servidor*</h4>
        <b-form-select 
          v-model="selectedServidor" 
          :options="servidores" 
          :disabled="selectedProyecto == 'Selecciona un proyecto' ? true : false"
          :state="changeStateInputServidor">
        </b-form-select>
      </b-col>
    </b-form>
    <br>
    <div class="container">
      <h4 class="mr-sm-10" for="inline-form-custom-select-pref">Motivo*:</h4>
      <b-form inline>
        <b-form-select v-model="selectedMotivo" :options="motivos" :state="changeStateInputMotivo"></b-form-select>
        <b-col v-if="selectedMotivo == 'Otro ' ? true : false">
          <b-form inline>
            <h6 class="mr-sm-10" for="inline-form-custom-select-pref" style="margin-right:10px">Especifica*:</h6>
            <b-form-input v-model="otroMotivo" type="text" :state="changeStateInputMotivoOtro"></b-form-input>
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
        <button class="btn btn-outline-danger badge-pill" @click="$router.go(-1)" style="width:100px; margin-right:5px">Cancelar</button>
        <button class="btn btn-outline-success badge-pill" @click="guardarAuditoria()" style="width:100px; margin-left:5px">Guardar</button>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
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
      otroMotivo: ''
    }
  },
  methods: {
    getProyectos(){
      var listaProyectos = []
      axios.get(`${this.$store.getters.getDireccion}/proyectos`).then(response => {
        listaProyectos = response.data.proyectos
        listaProyectos.forEach(proyecto => {
        this.proyectos.push({value: proyecto.id, text: proyecto.nombre})
      })
      }).catch(() => {
        alert("No hay conexión con el servidor")
        this.$router.push({name: 'home'})
      })
    },
    getServidores(){
      var listaServidores = []
      axios.get(`${this.$store.getters.getDireccion}/proyectos/${this.selectedProyecto}/servidores`).then(response => {
        listaServidores = response.data
        listaServidores.forEach(servidor => {
        this.servidores.push({value: servidor.id, text: servidor.direccion_publica})
      })
      }).catch(() => {
        alert("No hay conexión con el servidor")
        this.$router.push({name: 'home'})
      })
    },
    guardarAuditoria() {
      if(this.changeStateInputProyecto && this.changeStateInputServidor && this.changeStateInputMotivo && this.changeStateInputMotivoOtro && this.changeStateInputComandos) {
        axios.post(`${this.$store.getters.getDireccion}/auditorias`, {
        motivo: this.selectedMotivo + this.otroMotivo,
        comentario: this.comentario,
        comandos: this.comandos,
        id_usuario: this.idUsuario,
        id_proyecto: this.selectedProyecto,
        id_servidor: this.selectedServidor
      }).then(response => {
        //Enviar mensaje o hacer algo con esto
        alert(`La auditoría #${response.data.id} ha sido guardada`)
        this.$router.push({name: 'home'})
      }).catch(() => {
        alert("No hay conexión con el servidor")
      })
      } else {
        alert("Favor de llenar los campos marcados")
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