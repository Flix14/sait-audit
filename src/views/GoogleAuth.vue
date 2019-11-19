<template>
  <div>
    <NavBar @newLoggin="getUsuario"/>
    <br>
    <b-col class="text-center center">
      <img src="../assets/saitlogo.png" />
    </b-col>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data () {
    return {
      usuarioDB: [],
      isAuth: null
    }
  },
  methods: {
    //Se puede mejorar con Vuex?
    getUsuario(usuario){
      let email = usuario.data.w3.U3
      this.isAuth = usuario.isAuth
      this.$http.get(`${this.$store.getters.getDireccion}/usuarios?pagina=1&email=${email}`).then((res) => {
          this.usuarioDB = res.data.usuarios
        }).catch(() => {
          this.handleClickSignOut()
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
    },
    handleClickSignOut(){
      this.$gAuth.signOut()
      .then(() => {
      })
      .catch(() => {
        this.$bvModal.msgBoxOk('Ha ocurrido un error inesperado')
      })
    }
  },
  watch: {
    usuarioDB: function(usuario) {
      if(usuario[0] != undefined && usuario[0].estado == 1) {
        this.$store.commit('changeUsuario', usuario[0])
        this.$router.push({name: 'home'})
      } else{
        this.handleClickSignOut()
        this.$bvModal.msgBoxOk('No tiene autorización para entrar al sistema', {
          title: 'Problemas de autorización',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'success',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
        })
      }
    }
  }
}
</script>

<style>
.center{
  position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
}
</style>