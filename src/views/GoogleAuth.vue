<template>
  <div class="googleAuth">
    <NavBar @newLoggin="getUsuario"/>
    <br>
    <b-col class="text-center center">
      <img src="../assets/saitlogo.png" />
    </b-col>
  </div>
</template>

<script>
import axios from 'axios'
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'googleAuth',
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
    //Se puede mejorar con Vuex
    getUsuario(usuario){
      let email = usuario.data.w3.U3
      this.isAuth = usuario.isAuth
      axios.get(`${this.$store.getters.getDireccion}/usuarios?email=${email}`).then((res) => {
          this.usuarioDB = res.data.usuarios
        }).catch(e => console.log(e))
    },
    handleClickSignOut(){
      this.$gAuth.signOut()
      .then(() => {
        alert("No tiene autorización para entrar al sistema")
      })
      .catch(error  => {
        console.log(error)
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