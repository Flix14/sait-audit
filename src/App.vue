<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-container>

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#"></b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item :to="{name: 'home'}">Home</b-nav-item>
          <b-nav-item :to="{name: 'catalogoUs'}">Catalogo de Usuarios</b-nav-item>
          <b-nav-item :to="{name: 'catalogoProy'}">Catalogo de Proyectos</b-nav-item>
          <b-nav-item :to="{name: 'catalogoServ'}">Catalogo de Servidores</b-nav-item>
          <b-nav-item :to="{name: 'auditorias'}">Auditorias</b-nav-item>
          <b-nav-item :to="{name: 'eventos'}">Eventos</b-nav-item>
       </b-navbar-nav>

      </b-collapse>

    </b-container>

     </b-navbar>
     
    
    <router-view/>
  </div>
</template>

<style scoped>
.glyphicon-glyphicon-home{
  color: #fff;
}
</style>


