<template>
    <div>
        <br>
        <div class="text-center">
          <h2>Catalogo de Proyectos</h2>
      </div>
        <br>
       <div class="container text-right">
  <b-button variant="success">
    Agregar <b-badge variant="light"></b-badge>
  </b-button>
</div>
        <br>
        <br>
        <div class="container table-responsive">
    <table class="table table-dark table-hover table-bordered">
    <thead>
      <tr>
          <th scope="col">Nombre</th>
          
          <th class="text-right">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
          <th >Factura123</th>
          <td class="text-right">
            <button class="btn btn-outline-info badge-pill" style="width:80px;">Editar</button>
          </td>
      </tr>
       <tr>
          <th >Sait Boveda</th>
          <td class="text-right">
            <button class="btn btn-outline-info badge-pill" style="width:80px;">Editar</button>
          </td>
      </tr>
        <tr>
          <th >SAIT SYNC</th>
          <td class="text-right">
           <button class="btn btn-outline-info badge-pill" style="width:80px;">Editar</button>
          </td>
      </tr>
       <tr>
          <th >SAIT NUBE</th>
          <td class="text-right">
            <button class="btn btn-outline-info badge-pill" style="width:80px;">Editar</button>
          </td>
      </tr>
    </tbody>
    </table>
        </div>
    </div>
</template>