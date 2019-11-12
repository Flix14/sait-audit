import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import App from './App.vue'
import router from './router'
import store from './store'
import GAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId: '519162351103-6iavkb1ofor81uheqi7dnbo800qj7vvd.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}

Vue.use(BootstrapVue)
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)
Vue.use(GAuth, gauthOption)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
