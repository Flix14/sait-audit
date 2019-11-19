<template>
  <b-modal 
    id="modalAgregarProyecto" 
    title="Ingresar nuevo proyecto" 
    centered 
    @hidden="cleanModal()" 
    @shown="getServidores" 
    no-close-on-esc 
    no-close-on-backdrop 
    hide-header-close>
    <h6>Nombre</h6>
    <b-input-group>
      <b-input placeholder="ej. SAIT 123" v-model="nombre" :state="changeStateInputNombre" autofocus/>
    </b-input-group>
    <p v-if="showWarningNombre">*Debe ingresar un nombre para el proyecto</p>
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
      <p v-if="showWarningServidores">*Agregue servidores para el proyecto</p>
    </div>
    <div v-else>
      <div v-for="servidor in totalNuevosServidores" :key="servidor">
        <b-form-select
          class="select-servers"
          v-model="servidoresSelected[servidor - 1]" 
          :options="servidoresExistentes" 
          :state="servidoresSelected[servidor - 1] != ''">
        </b-form-select>
        <p v-if="showWarningServidores && servidoresSelected[servidor - 1] == ''">*Elija un servidor</p>
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
      servidoresSelected: [],
      showWarningNombre: false,
      showWarningServidores: false
    }
  },
  methods: {
    cleanModal(){
      this.nombre = ''
      this.totalNuevosServidores = 0
      this.servidoresSelected = []
      this.showWarningNombre = false
      this.showWarningServidores = false
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
        this.$bvModal.msgBoxOk('No se ha podido establecer conexión con el servidor', {
          title: 'Problemas de conexión',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'success',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
        }).then(res => {
          if(res) {
            this.closeModal()
          }
        })
      })
    },
    addProyecto() {
      var servidorVacio = false
      this.showWarningNombre = false
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
          }).catch((e) => {
            if(e.response != undefined){
              if(e.response.status == 409) {
                this.$bvModal.msgBoxOk('Ya existe un proyecto con ese nombre', {
                  title: 'Proyecto existente',
                  size: 'sm',
                  buttonSize: 'sm',
                  okVariant: 'success',
                  headerClass: 'p-2 border-bottom-0',
                  footerClass: 'p-2 border-top-0',
                  centered: true
                })
              }
            } else if(e.message == 'Network Error'){
              this.$bvModal.msgBoxOk('No se ha podido establecer conexión con el servidor', {
                title: 'Problemas de conexión',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'success',
                headerClass: 'p-2 border-bottom-0',
                footerClass: 'p-2 border-top-0',
                centered: true
              })
            } else {
              this.$bvModal.msgBoxOk('Ha ocurrido un error inesperado')
            }
          })
        } else {
          this.showWarningServidores = true
        }
      } else {
        if(this.nombre.length == 0) {
          this.showWarningNombre = true
        } else {
          this.showWarningServidores = true
        }
      }
    },
    addNewInputServidor() {
      this.totalNuevosServidores++
      this.servidoresSelected.push('')
      this.showWarningServidores = false
    },
    removeLastInputServidor() {
      this.totalNuevosServidores--
      this.servidoresSelected.pop()
      this.showWarningServidores = false
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