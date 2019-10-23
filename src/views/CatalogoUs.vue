<template>
    <div class="catalogoUs">
         <br>
        <div class="text-center">
          <h2>Catalogo de Usuarios</h2>
      </div>
        <br>
       <div class="container text-right">
         <div>
  <b-button variant="outline-success badge-pill" v-b-modal.modal-1>Agregar Usuarios</b-button>
  
  <b-modal id="modal-1" title="Ingresar nuevo Usuario">
    <h6>Correo Electronico</h6>
     <label class="sr-only" for="inline-form-input-username">Username</label>
    <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
      <b-input id="inline-form-input-username" placeholder="Username"></b-input>
    </b-input-group>

    <div>
  <b-form @submit.stop.prevent>
    <label for="text-password">Password</label>
    <b-input type="password" id="text-password" aria-describedby="password-help-block"></b-input>
    <b-form-text id="password-help-block">
      Su contraseña debe tener entre 8 y 20 caracteres, contener letras y números,
       y no debe contener espacios, caracteres especiales o emoji.
    </b-form-text>
   </b-form>
</div>
  </b-modal>
</div>

  
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
            <div>
  <b-button  variant="btn btn-outline-info badge-pill" style="width:90px; margin: 5px;" v-b-modal.modal-2>Editar</b-button>

  <b-modal id="modal-2" title="Editar Correo Electronico">
     <h6>Modificar</h6>
     <label class="sr-only" for="inline-form-input-username">Username</label>
    <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
      <b-input id="inline-form-input-username" placeholder="Username"></b-input>
    </b-input-group>
  </b-modal>

           
            <button class="btn btn-outline-danger badge-pill" style="width:90px; ">ELiminar</button>
            </div>
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