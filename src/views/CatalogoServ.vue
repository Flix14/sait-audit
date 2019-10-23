<template>
    <div >
         <br>
        <div class="text-center">
          <h2>Catalogo de Servidores</h2>
      </div>
        <br>
       <div class="container text-right">
 <div>
  <b-button variant="outline-success badge-pill" v-b-modal.modal-1>Agregar Servidor</b-button>
  <b-modal id="modal-1" title="Ingresar nuevo Servidor">
      <h6>Nombre</h6>
     <b-form-input v-model="text" placeholder="Enter your name"></b-form-input> 
     <h6>Proyecto</h6>
     <b-form-input v-model="text" placeholder="Enter your name"></b-form-input> 
     <h6>Direccion</h6>
     <b-form-input v-model="text" placeholder="Enter your name"></b-form-input> 
     <h6>Dominio</h6>
     <b-form-input v-model="text" placeholder="Enter your name"></b-form-input>   
  </b-modal>
</div>
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
             <div>
  <b-button  variant="btn btn-outline-info badge-pill" style="width:90px; margin: 5px;" v-b-modal.modal-2>Editar</b-button>

  <b-modal id="modal-2" title="Editar los siguientes campos">
     <h6>Nombre</h6>
     <b-form-input v-model="text" placeholder="Enter your name"></b-form-input> 
     <h6>Proyecto</h6>
     <b-form-input v-model="text" placeholder="Enter your name"></b-form-input> 
     <h6>Direccion</h6>
     <b-form-input v-model="text" placeholder="Enter your name"></b-form-input> 
     <h6>Dominio</h6>
     <b-form-input v-model="text" placeholder="Enter your name"></b-form-input>  
  </b-modal>
            </div>
          </td>
      </tr>
       <tr>
          <th >Servidor 2</th>
          <td>Sait Boveda</td>
          <td>192.132.14</td>
          <td>null</td>
          
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
            <button class="btn btn-outline-info badge-pill" style="width:80px;">Editar</button>
          </td>
      </tr>
      <tr>
          <th >Servidor 5</th>
          <td>Sait Boveda</td>
          <td>192.132.14</td>
          <td>null</td>
          
          <td class="text-right">
            <button class="btn btn-outline-info badge-pill" style="width:80px;">Editar</button>
          </td>
      </tr>
    </tbody>
    </table>
        </div>
    </div>
</template>