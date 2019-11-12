import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Usuarios from '../views/Usuarios.vue'
import Proyectos from '../views/Proyectos.vue'
import Servidores from '../views/Servidores.vue'
import Auditorias from '../views/Auditorias.vue'
import DetallesAuditoria from '../views/DetallesAuditoria.vue'
import NuevaAuditoria from '../views/NuevaAuditoria.vue'
import GoogleAuth from '../views/GoogleAuth.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'googleAuth',
    component: GoogleAuth
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/usuarios',
    name: 'usuarios',
    component: Usuarios
  },
  {
    path: '/proyectos',
    name: 'proyectos',
    component: Proyectos
  },
  {
    path: '/servidores',
    name: 'servidores',
    component: Servidores
  },
  {
    path: '/auditorias',
    name: 'auditorias',
    component: Auditorias
  },
  {
    path: '/auditorias/:id',
    name: 'auditoria',
    component: DetallesAuditoria
  },
  {
    path: '/auditorias/nueva/auditoria',
    name: 'nuevaAuditoria',
    component: NuevaAuditoria
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
