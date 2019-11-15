<template>
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-brand :to="{name: 'googleAuth'}">SAIT Auditorías</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav :hidden="!isSignIn">
          <b-nav-item :to="{name: 'home'}">Inicio</b-nav-item>
          <b-nav-item :to="{name: 'usuarios'}">Usuarios</b-nav-item>
          <b-nav-item :to="{name: 'proyectos'}">Proyectos</b-nav-item>
          <b-nav-item :to="{name: 'servidores'}">Servidores</b-nav-item>
          <b-nav-item :to="{name: 'auditorias'}">Auditorias</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item @click="handleClickSignIn()" v-if="!isSignIn">Iniciar sesión</b-nav-item>
          <b-nav-item-dropdown v-if="isSignIn" :text="usuario">
            <b-dropdown-item @click="handleClickSignOut()">Cerrar Sesión</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      isSignIn: false,
      isInit: false,
      usuario: ''
    }
  },
  methods: {
    handleClickSignIn(){
      this.$gAuth.signIn()
      .then(user => {
        this.$emit('newLoggin', {data: user, isAuth: this.isAuthorized})
      })
    },
    handleClickSignOut(){
      this.$gAuth.signOut()
      .then(() => {
        this.$store.commit('changeUsuario', {email: null, id: null})
        this.isSignIn = this.$gAuth.isAuthorized
        this.$router.push({name: 'googleAuth'})
      })
    }
  },
  created() {
    let checkGauthLoad = setInterval(() => {
      this.isInit = this.$gAuth.isInit
      this.isSignIn = this.$gAuth.isAuthorized
      if(this.isInit){
        clearInterval(checkGauthLoad)
        if(this.isSignIn) {
          this.usuario = this.$gAuth.GoogleAuth.currentUser.Ab.w3.U3
        } else if(this.$route.name != 'googleAuth') {
          this.$store.commit('changeUsuario', {email: null, id: null})
          this.$router.push({name: 'googleAuth'})
        } else {
          this.$store.commit('changeUsuario', {email: null, id: null})
        }
      }
    }, 100)
  }
}
</script>