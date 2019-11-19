<template>
  <div class="container table-responsive">
    <table class="table table-dark table-hover table-bordered" >
      <thead>
        <tr>
          <th>ID</th>
          <th>Proyecto</th>
          <th>Servidor</th>
          <th>Usuario</th>
          <th>Motivo</th>
          <th>Fecha</th>
          <th class="text-center">Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="auditoria in auditorias" :key="auditoria.id">
          <td>{{auditoria.id}}</td>
          <td>{{auditoria.nombre_proyecto}}</td>
          <td>{{auditoria.ip_servidor}}</td>
          <td>{{auditoria.usuario}}</td>
          <td>{{auditoria.motivo}}</td>
          <td>{{auditoria.fecha}}</td>
          <td class="text-center">
            <div>
              <b-button 
                variant="btn btn-outline-info badge-pill"  
                :to="'/auditorias/' + auditoria.id">
                Detalles
              </b-button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    auditorias: null
  }
}
</script>