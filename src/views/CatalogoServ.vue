<template>
    <div >
         <br>
        <div class="text-center">
          <h2>Catalogo de Servidores</h2>
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
    <table class="table table-dark table-hover table-bordered" >
    <thead>
      <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Proyecto</th>
          <th scope="col">Direccion</th>
          <th scope="col">Dominio</th>
          <th class="text-right">Servidores</th>
          <th class="text-right">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
          <th >Servidor 1</th>
          <td>Factura123</td>
          <td>192.132.14</td>
          <td>null</td>
          <td class="text-right">
            <button class="btn btn-outline-success badge-pill" style="width:80px;">Checar</button>
          </td>
          <td class="text-right">
            <button class="btn btn-outline-info badge-pill" style="width:80px;">Editar</button>
          </td>
      </tr>
       <tr>
          <th >Servidor 2</th>
          <td>Sait Boveda</td>
          <td>192.132.14</td>
          <td>null</td>
          <td class="text-right">
            <button class="btn btn-outline-success badge-pill" style="width:80px;">Checar</button>
          </td>
          <td class="text-right">
            <button class="btn btn-outline-info badge-pill" style="width:80px;">Editar</button>
          </td>
      </tr>
      <tr>
          <th >Servidor 4</th>
          <td>SAIT SYNC</td>
          <td>192.132.14</td>
          <td>null</td>
          <td class="text-right">
            <button class="btn btn-outline-success badge-pill" style="width:80px;">Checar</button>
          </td>
          <td class="text-right">
            <button class="btn btn-outline-info badge-pill" style="width:80px;">Editar</button>
          </td>
      </tr>
      <tr>
          <th >Servidor 5</th>
          <td>Sait Boveda</td>
          <td>192.132.14</td>
          <td>null</td>
          <td class="text-right">
            <button class="btn btn-outline-success badge-pill" style="width:80px;">Checar</button>
          </td>
          <td class="text-right">
            <button class="btn btn-outline-info badge-pill" style="width:80px;">Editar</button>
          </td>
      </tr>
    </tbody>
    </table>
        </div>
    </div>
</template>