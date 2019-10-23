<template>
    <div>
        <br>
        <div class="text-center">
          <h2>Catalogo de Proyectos</h2>
      </div>
        <br>
       <div class="container text-right">
   <div>
  <b-button variant="outline-success badge-pill" v-b-modal.modal-1>Agregar Proyecto</b-button>
  <b-modal id="modal-1" title="Ingresar nuevo Proyecto">
     <b-form-input v-model="text" placeholder="Enter your name"></b-form-input>   
  </b-modal>
</div>
</div>
        <br>
        <br>
        <div class="container table-responsive">
    <table class="table table-dark table-hover table-bordered">
    <thead>
      <tr>
          <th scope="col">Nombre</th>
          <th class="text-right">Servidores</th>
          <th class="text-right">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
          <th >Factura123</th>
          <td class="text-right">
            <button class="btn btn-outline-success badge-pill" style="width:100px;">servidores</button>
          </td>
          <td class="text-right">
              <div>
  <b-button  variant="btn btn-outline-info badge-pill" style="width:90px; margin: 5px;" v-b-modal.modal-2>Editar</b-button>

  <b-modal id="modal-2" title="Editar Correo Electronico">
     <h6>Modificar Nombre</h6>
     <b-form-input v-model="text" placeholder="Enter your name"></b-form-input>
  </b-modal>

           
            
            </div>
            
          </td>
      </tr>
       <tr>
          <th >Sait Boveda</th>
          <td class="text-right">
            <button class="btn btn-outline-success badge-pill" style="width:100px;">servidores</button>
          </td>
          <td class="text-right">
            <button class="btn btn-outline-info badge-pill" style="width:80px;">Editar</button>
          </td>
      </tr>
        <tr>
          <th >SAIT SYNC</th>
          <td class="text-right">
            <button class="btn btn-outline-success badge-pill" style="width:100px;">servidores</button>
          </td>
          <td class="text-right">
           <button class="btn btn-outline-info badge-pill" style="width:80px;">Editar</button>
          </td>
      </tr>
       <tr>
          <th >SAIT NUBE</th>
          <td class="text-right">
            <button class="btn btn-outline-success badge-pill" style="width:100px;">servidores</button>
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