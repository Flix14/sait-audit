<template>
    <div>
       <br>
        <div class="text-center">
          <h2>Eventos de Auditorias</h2>
      </div>
        <br>
    <div class="container">
    <b-form-select class="col-md-3 select-responsive" style="margin: 10px" v-model="selected" :options="options"></b-form-select>
    <b-form-select class="col-md-3 select-responsive" v-model="selected" :options="options"></b-form-select>
    
    
  </div>

        <br>
        <br>
        <br>
        <div class="container table-responsive">
    <table class="table table-dark table-hover table-bordered">
    <thead>
      <tr>
          <th scope="col">Proyecto</th>
          <th scope="col">Servidor</th>
          <th scope="col">Usuario</th>
          <th scope="col">Fecha</th>
          <th class="text-right"></th>
      </tr>
    </thead>
    <tbody>
      <tr>
          <th >Factura123</th>
          <td>Servidor1</td>
          <td>SAIT@gmail.com</td>
          <td>05/10/19</td>
          <td class="text-right">
            <button class="btn btn-outline-primary badge-pill" style="width:80px;">Detalles</button>
          </td>
      </tr>
       <tr>
          <th >Factura123</th>
          <td>Servidor1</td>
          <td>SAIT@gmail.com</td>
          <td>05/10/19</td>
          <td class="text-right">
            <button class="btn btn-outline-primary badge-pill" style="width:80px;">Detalles</button>
          </td>
      </tr>
      <tr>
          <th >Factura123</th>
          <td>Servidor1</td>
          <td>SAIT@gmail.com</td>
          <td>05/10/19</td>
          <td class="text-right">
            <button class="btn btn-outline-primary badge-pill" style="width:80px;">Detalles</button>
          </td>
      </tr>
      <tr>
         <th >Factura123</th>
          <td>Servidor1</td>
          <td>SAIT@gmail.com</td>
          <td>05/10/19</td>
          <td class="text-right">
             <button class="btn btn-outline-primary badge-pill" style="width:80px;">Detalles</button>
          </td>
      </tr>
    </tbody>
    </table>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        selected: null,
        options: [
          { value: null, text: 'Porfavor seleciona una opcion' },
          { value: 'a', text: 'This is First option' },
          { value: 'b', text: 'Selected Option' },
          { value: { C: '3PO' }, text: 'This is an option with object value' },
          { value: 'd', text: 'This one is disabled', disabled: true }
        ]
      }
    }
  }
</script>