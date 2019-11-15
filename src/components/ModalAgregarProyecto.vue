<template>
  <b-modal id="modalAgregarProyecto" title="Ingresar nuevo proyecto" centered @hidden="cleanModal()" @shown="getServidores">
    <h6>Nombre</h6>
    <b-input-group>
      <b-input placeholder="ej. SAIT 123" v-model="nombre" :state="changeStateInputNombre" />
    </b-input-group>
    <br>
    <b-row>
      <b-col>
        <h6>Servidores</h6>
      </b-col>
      <b-col class="text-right">
        <b-button 
          variant="outline-danger" 
          size="sm" 
          @click="removeLastInputServidor()" 
          v-if="totalNuevosServidores">
          -
        </b-button>
        <b-button 
          variant="outline-primary" 
          size="sm" 
          @click="addNewInputServidor()">
          +
        </b-button>
      </b-col>
    </b-row>
    <div v-if="!totalNuevosServidores">
      <p>Agregue servidores para el proyecto</p>
    </div>
    <div v-else>
      <div v-for="servidor in totalNuevosServidores" :key="servidor">
        <b-form-select
          class="select-servers"
          v-model="servidoresSelected[servidor - 1]" 
          :options="servidoresExistentes" 
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
      this.nombre = ''
      this.totalNuevosServidores = 0
      this.servidoresSelected = []
    },
    closeModal() {
      this.$bvModal.hide('modalAgregarProyecto')
    },
    getServidores() {
      var listaServidores = []
      this.servidoresExistentes = []
      this.$http.get(`${this.$store.getters.getDireccion}/servidores`).then(response => {
        listaServidores = response.data.servidores
        listaServidores.forEach(servidor => {
        this.servidoresExistentes.push({value: servidor.id, text: servidor.direccion_publica})
      })
      }).catch(() => {
        this.closeModal()
        alert('No hay conexión con el servidor')
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
          this.$http.post(`${this.$store.getters.getDireccion}/proyectos`, {
            nombre: this.nombre,
            servidores: this.servidoresSelected
          }).then(() => {
            this.$emit('proyectoAdding')
            this.closeModal()
          }).catch(() => {
            this.closeModal()
            alert('No hay conexión con el servidor')
          })
        } else {
          alert('Ingrese servidores')
        }
      } else {
        alert('Ingrese todos los campos necesarios')
      }
    },
    addNewInputServidor() {
      this.totalNuevosServidores++
      this.servidoresSelected.push('')
    },
    removeLastInputServidor() {
      this.totalNuevosServidores--
      this.servidoresSelected.pop()
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
.text-right > button {
  margin-left: 5px; 
  width: 30px
}

.select-servers {
  margin-top: 5px;
}
</style>