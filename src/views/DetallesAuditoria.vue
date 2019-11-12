<template>
  <div class="detallesAuditoria ">
    <NavBar/>
    <br>
    <div class="text-center">
      <h2>Detalles de auditoría #{{idAuditoria}}</h2>
    </div>
    <br>
    <b-form inline class="text-center">
      <b-col>
        <h4 class="mr-sm-10" for="inline-form-custom-select-pref">Usuario</h4>
        <b-form-input v-model="auditoria.usuario" type="text" style="background-color: #FFFFFF" disabled></b-form-input>
      </b-col>
      <b-col>
        <h4 class="mr-sm-10" for="inline-form-custom-select-pref">Proyecto</h4>
        <b-form-input v-model="auditoria.nombre_proyecto" type="text" style="background-color: #FFFFFF" disabled></b-form-input>
      </b-col>
      <b-col>
        <h4 class="mr-sm-10" for="inline-form-custom-select-pref">IP Servidor</h4>
        <b-form-input v-model="auditoria.ip_servidor" type="text" style="background-color: #FFFFFF" disabled></b-form-input>
      </b-col>
    </b-form>
    <br>
    <div class="container">
      <h4 class="mr-sm-10" for="inline-form-custom-select-pref">Motivo:</h4>
      <b-form inline class="text-center">
        <b-form-input v-model="auditoria.motivo" type="text" style="background-color: #FFFFFF" disabled></b-form-input>
      </b-form>
      <br>
      <h4>Comentarios:</h4>
      <b-form-textarea
        v-model="auditoria.comentario"
        placeholder="Sin comentarios"  
        rows="3"
        style="background-color: #FFFFFF"
        disabled>
      </b-form-textarea>
      <br>
      <h4>Lista de comandos:</h4>
      <b-form-textarea
        v-model="auditoria.comandos"
        placeholder="Cargando comandos..."
        rows="10"
        style="background-color: #FFFFFF"
        disabled>
      </b-form-textarea>
      <br>
      <div class="text-center">
        
        <router-link class="btn btn-outline-info badge-pill" :to="{name: 'auditorias'}">Volver a Auditorías</router-link>
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
      idAuditoria: this.$route.params.id,
      auditoria: []
    }
  },
  methods: {
    getAuditoria(){
      axios.get(`${this.$store.getters.getDireccion}/auditorias/${this.idAuditoria}`).then(response => {
        this.auditoria = response.data
      }).catch(e => console.log(e))
    }
  },
  mounted(){
    this.getAuditoria()
  }
}
</script>