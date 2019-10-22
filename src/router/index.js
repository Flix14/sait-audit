import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CatalogoUs from '../views/CatalogoUs.vue'
import CatalogoProy from '../views/CatalogoProy.vue'
import CatalogoServ from '../views/CatalogoServ.vue'
import Auditorias from '../views/Auditorias.vue'
import Eventos from '../views/Eventos.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/catalogoUs',
    name: 'catalogoUs',
    component: CatalogoUs
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/catalogoProy',
    name: 'catalogoProy',
    component: CatalogoProy
    
  },
  {
    path: '/catalogoServ',
    name: 'catalogoServ',
    component: CatalogoServ
    
  },
  {
    path: '/auditorias',
    name: 'auditorias',
    component: Auditorias
    
  },
  {
    path: '/eventos',
    name: 'eventos',
    component: Eventos
    
  }
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
