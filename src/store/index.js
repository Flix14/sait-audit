import Vue from 'vue'
import Vuex from 'vuex'
import  createPersistedState  from  'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: {
      id: null,
      email: null
    },
    direccion: 'http://localhost:3000'
  },
  mutations: {
    changeUsuario(state, usuario){
      state.usuario.id = usuario.id
      state.usuario.email = usuario.email
    }
  },
  getters: {
    getIdUsuario: state => {
      return state.usuario.id
    },
    getEmailUsuario: state => {
      return state.usuario.email
    },
    getDireccion: state => {
      return state.direccion
    }
  },
  plugins: [createPersistedState()]
})
