<template>
  <div class="container table-responsive">
    <table class="table table-dark table-hover table-bordered" >
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Proyecto</th>
          <th scope="col">IP Servidor</th>
          <th scope="col">Usuario</th>
          <th scope="col">Motivo</th>
          <th scope="col">Fecha</th>
          <th class="text-right">Acción</th>
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
          <td class="text-right">
            <div>
              <b-button 
                variant="btn btn-outline-info badge-pill"  
                style="width:90px; margin: 5px;" 
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