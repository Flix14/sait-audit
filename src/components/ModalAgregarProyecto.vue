<template>
  <b-modal id="modalAgregarProyecto" title="Ingresar nuevo proyecto" centered @hidden="cleanModal()" @shown="getServidores">
    <h6>Nombre</h6>
    <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
      <b-input placeholder="Nombre" v-model="nombre" :state="changeStateInputNombre"></b-input>
    </b-input-group>
    <br>
    <b-row>
      <b-col>
        <h6 ref="serv">Servidores</h6>
      </b-col>
      <b-col class="text-right">
        <b-button variant="outline-danger" size="sm" @click="totalNuevosServidores--; servidoresSelected.pop()" v-if="totalNuevosServidores" style="width: 30px">-</b-button>
        <b-button variant="outline-primary" size="sm" @click="totalNuevosServidores++; servidoresSelected.push('')" style="margin-left: 5px; width: 30px">+</b-button>
      </b-col>
    </b-row>
    <div ref="divServidores" v-if="!totalNuevosServidores">
      <p>Agregue servidores para el proyecto</p>
    </div>
    <div v-else>
      <div v-for="servidor in totalNuevosServidores" :key="servidor">
        <b-form-select 
          v-model="servidoresSelected[servidor - 1]" 
          :options="servidoresExistentes" 
          style="margin-top: 5px" 
          :state="servidoresSelected[servidor - 1] != ''">
        </b-form-select>
      </div>
    </div>
    <template v-slot:modal-footer="{ Cancelar, Agregar }">
      <b-button size="sm" variant="danger" @click="closeModal()">
        Cancelar
      </b-button>
      <b-button size="sm" variant="success" @click="addProyecto()">
        Agregar
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      nombre: '',
      totalNuevosServidores: 0,
      servidoresExistentes: [],
      servidoresSelected: []
    }
  },
  methods: {
    cleanModal(){
      this.nombre = ""
      this.totalNuevosServidores = 0
      this.servidoresSelected = []
    },
    closeModal() {
      this.$bvModal.hide("modalAgregarProyecto")
    },
    getServidores() {
      var listaServidores = []
      this.servidoresExistentes = []
      axios.get(`${this.$store.getters.getDireccion}/servidores`).then(response => {
        listaServidores = response.data.servidores
        listaServidores.forEach(servidor => {
        this.servidoresExistentes.push({value: servidor.id, text: servidor.direccion_publica})
      })
      }).catch(() => {
        this.closeModal()
        alert("No hay conexión con el servidor")
      })
    },
    addProyecto() {
      var servidorVacio = false
      if(this.changeStateInputNombre && this.totalNuevosServidores > 0 && this.servidoresSelected.length > 0) {
        this.servidoresSelected.forEach(servidor => {
          if(servidor == '') {
            servidorVacio = true
            return
          }
        })
        if(!servidorVacio) {
          axios.post(`${this.$store.getters.getDireccion}/proyectos`, {
            nombre: this.nombre,
            servidores: this.servidoresSelected
          }).then(() => {
            this.$emit('proyectoAdding')
            this.closeModal()
          }).catch(() => {
            this.closeModal()
            alert("No hay conexión con el servidor")
          })
        } else {
          alert("Ingrese servidores")
        }
      } else {
        alert("Ingrese todos los campos necesarios")
      }
    }
  },
  computed: {
    changeStateInputNombre: function() {
      return this.nombre != ''
    }
  }
}
</script>

<style scoped>
p {
  font-weight: bold;
  color: tomato;
}
</style>