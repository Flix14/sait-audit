<template>

  <div class="container ">
    <br>
      <div class="text-center">
          <h2>Auditoria</h2>
      </div>
      <br>
   <b-form inline>
    <h4 class="mr-sm-10" for="inline-form-custom-select-pref">Selecciona el Motivo</h4>
    <b-form-select
      class="mb-8 mr-sm-10 mb-sm-0 col-md-3"
      :value="null"
      :options="{ '1': 'One', '2': 'Two', '3': 'Three' }"
      id="inline-form-custom-select-pref"
    >
      <template v-slot:first>
        <option :value="null">Motivo</option>
      </template>
    </b-form-select>

    
  </b-form>
  <br>
  <br>
  <br>
  <h4>Comentarios:</h4>
  <b-form-textarea
      id="textarea"
      v-model="text"
      placeholder="Agregar Comentarios...."
      
      rows="3"
      max-rows="6"
    ></b-form-textarea>

    <pre class="mt-3 mb-0">{{ text }}</pre>

  <br>
  <br>
  <h4>Lista de comandos:</h4>
  <b-form-textarea
      id="textarea"
      v-model="text2"
      placeholder="Agregar Comandos...."
      
      rows="3"
      max-rows="6"
    ></b-form-textarea>

    <pre class="mt-3 mb-0">{{ text2 }}</pre>
    <br>
    <br>
    <div class="text-center">
          <button class="btn btn-outline-success badge-pill" style="width:100px; margin: 50px;">Guardar</button>
          <button class="btn btn-outline-danger badge-pill" style="width:100px;">ELiminar</button>
     
    </div>
  </div>
</template>

<script>
 export default {
    data() {
      return {
        text: '',
        text2: ''
      }
    }
  }
</script>