<template>
  <div>
    <NavBar/>
    <br>
    <div class="text-center">
      <h2>Detalles de auditoría #{{idAuditoria}}</h2>
    </div>
    <br>
    <b-form inline class="text-center">
      <b-col>
        <h4>Usuario</h4>
        <b-form-input v-model="auditoria.usuario" type="text" disabled />
      </b-col>
      <b-col>
        <h4>Proyecto</h4>
        <b-form-input v-model="auditoria.nombre_proyecto" type="text" disabled />
      </b-col>
      <b-col>
        <h4>IP Servidor</h4>
        <b-form-input v-model="auditoria.ip_servidor" type="text" disabled />
      </b-col>
    </b-form>
    <br>
    <div class="container">
      <h4 class="mr-sm-10" for="inline-form-custom-select-pref">Motivo:</h4>
      <b-form inline class="text-center">
        <b-form-input v-model="auditoria.motivo" type="text" disabled />
      </b-form>
      <br>
      <h4>Comentarios:</h4>
      <b-form-textarea
        v-model="auditoria.comentario"
        placeholder="Sin comentarios"  
        rows="3"
        disabled>
      </b-form-textarea>
      <br>
      <h4>Lista de comandos:</h4>
      <b-form-textarea
        v-model="auditoria.comandos"
        placeholder="Cargando comandos..."
        rows="10"
        disabled>
      </b-form-textarea>
      <br>
      <div class="text-center">
        <router-link class="btn btn-outline-dark badge-pill" :to="{name: 'auditorias'}">Volver a Auditorías</router-link>
      </div>
      <br>
    </div>
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
      idAuditoria: this.$route.params.id,
      auditoria: []
    }
  },
  methods: {
    getAuditoria(){
      this.$http.get(`${this.$store.getters.getDireccion}/auditorias/${this.idAuditoria}`).then(response => {
        this.auditoria = response.data
      }).catch(() => {
        alert('No hay conexión con el servidor')
        this.$router.push({name: 'auditorias'})
      })
    }
  },
  mounted(){
    this.getAuditoria()
  }
}
</script>

<style scoped>
[disabled] {
  background-color: white;
}
</style>