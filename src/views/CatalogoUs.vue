<template>
    <div class="catalogoUs">
         <br>
        <div class="text-center">
          <h2>Catalogo de Usuarios</h2>
      </div>
        <br>
       <div class="container text-right">
  <b-button variant="outline-success">
    Agregar Usuarios<b-badge variant="light"></b-badge>
  </b-button>
</div>
        <br>
        <br>
        <div class="container table-responsive">
    <table class="table table-dark table-hover table-bordered">
    <thead>
      <tr>
          <th scope="col">Correo Electronico</th>
          
          <th class="text-right">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
          <th >asas@gmail.com</th>
          <td class="text-right">
            <button class="btn btn-outline-info badge-pill" style="width:90px; margin: 5px;">Editar</button>
            <button class="btn btn-outline-danger badge-pill" style="width:90px; ">ELiminar</button>
          </td>
      </tr>
       <tr>
          <th >Sait@gmail.com</th>
          <td class="text-right">
           <button class="btn btn-outline-info badge-pill" style="width:90px; margin: 5px;">Editar</button>
            <button class="btn btn-outline-danger badge-pill" style="width:90px;">ELiminar</button>
          </td>
      </tr>
        <tr>
          <th >soft@gmail.com</th>
          <td class="text-right">
            <button class="btn btn-outline-info badge-pill" style="width:90px; margin: 5px;">Editar</button>
            <button class="btn btn-outline-danger badge-pill" style="width:90px;">ELiminar</button>
          </td>
      </tr>
       <tr>
          <th >NUBE@gmail.com</th>
          <td class="text-right">
          <button class="btn btn-outline-info badge-pill" style="width:90px; margin: 5px;">Editar</button>
            <button class="btn btn-outline-danger badge-pill" style="width:90px;">ELiminar</button>
          </td>
      </tr>
    </tbody>
    </table>
        </div>
    </div>
</template>