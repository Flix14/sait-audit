<template>
  <b-modal 
    id="modalEditarServidor" 
    title="Editar Servidor" 
    centered 
    @shown="getServidor()" 
    @hidden="cleanModal()" 
    no-close-on-esc 
    no-close-on-backdrop 
    hide-header-close>
    <h6>Sistema operativo</h6>
    <b-input-group>
      <b-input v-model="sistemaOperativo" :state="changeStateInput"></b-input>
    </b-input-group>
    <br/>
    <b-row>
      <b-col>
        <h6>Dominios</h6>
      </b-col>
      <b-col class="text-right">
        <b-button 
          variant="outline-danger" 
          size="sm" 
          @click="removeLastInputDominio()" 
          v-if="totalNuevosDominios">
          -
        </b-button>
        <b-button 
          variant="outline-primary" 
          size="sm"
          @click="addNewInputDominio()">
          +
        </b-button>
      </b-col>
    </b-row>
    <div v-if="!totalNuevosDominios">
      <p v-if="showWarningDOM">Agregue dominios para el servidor</p>
    </div>
    <div v-else>
      <div v-for="dominio in totalNuevosDominios" :key="dominio">
        <b-input
          class="input-style"
          placeholder="ej. www.example.com" 
          v-model="dominios[dominio - 1]" 
          :state="dominios[dominio - 1] != ''">
        </b-input>
        <p v-if="showWarningDOM && dominios[dominio - 1] == ''">*Ingrese un dominio</p>
      </div>
    </div>
    <template v-slot:modal-footer="{ Cancelar, Guardar }">
      <b-button size="sm" variant="danger" @click="closeModal()">
        Cancelar
      </b-button>
      <b-button size="sm" variant="success" @click="updateServidor()">
        Guardar
      </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: {
    idServidor: Number
  },
  data() {
    return {
      sistemaOperativo: '',
      direccion: '',
      dominios: [],
      enviarDominios: [],
      totalNuevosDominios: 0,
      showWarningSO: false,
      showWarningDOM: false
    }
  },
  methods: {
    cleanModal() {
      this.direccionPublica = ''
      this.sistemaOperativo = ''
      this.dominios = [],
      this.enviarDominios = []
      this.totalNuevosDominios = 0
      this.showWarningSO = false
      this.showWarningDOM = false
    },
    getServidor() {
      var dom = []
      this.$http.get(`${this.$store.getters.getDireccion}/servidores/${this.idServidor}`).then(response => {
        this.sistemaOperativo = response.data.sistema_operativo
        this.direccion = response.data.direccion_publica
        dom = response.data.dominios
        dom.forEach(dominio => {
          this.dominios[this.totalNuevosDominios] = dominio.dominio
          this.totalNuevosDominios++
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
        })
        this.closeModal()
      })
    },
    closeModal() {
      this.$bvModal.hide('modalEditarServidor')
    },
    updateServidor() {
      var dominioVacio = false
      this.showWarningDOM = false
      this.showWarningSO = false
      if(this.changeStateInput && this.totalNuevosDominios > 0 && this.dominios.length > 0) {
        this.dominios.forEach(dominio => {
          if(dominio == '') {
            dominioVacio = true
            return
          }
        })
        if(!dominioVacio) {
          this.dominios.forEach((dominio, index) => {
            this.enviarDominios[index] = {'dominio': dominio}
          })
          this.$http.put(`${this.$store.getters.getDireccion}/servidores/${this.idServidor}`, {
            sistema_operativo: this.sistemaOperativo,
            direccion_publica: this.direccion,
            dominios: this.enviarDominios
          }).then(response => {
            var servidor = response.data
            this.$emit('servidorUpdating', servidor)
            this.closeModal()
          }).catch((e) => {
            if(e.response != undefined) {
              if(e.response.status == 409) {
                this.$bvModal.msgBoxOk(`El dominio ${e.response.data.errors[0].split("'")[1]} ya existe o se encuentra repetido`, {
                  title: 'Dominio existente',
                  size: 'sm',
                  buttonSize: 'sm',
                  okVariant: 'success',
                  headerClass: 'p-2 border-bottom-0',
                  footerClass: 'p-2 border-top-0',
                  centered: true
                })
              }
            } else if(e.message == 'Network Error') {
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
              this.enviarDominios = []
          })
        } else {
          this.showWarningDOM = true
        }
      } else {
        if(!this.changeStateInput) {
          this.showWarningSO = true
        }
        if(this.totalNuevosDominios == 0) {
          this.showWarningDOM = true
        }
      }
    },
    addNewInputDominio() {
      this.totalNuevosDominios++ 
      this.dominios.push('')
      this.showWarningDOM = false
    },
    removeLastInputDominio() {
      this.totalNuevosDominios-- 
      this.dominios.pop()
      this.showWarningDOM = false
    }
  },
  computed: {
    changeStateInput: function() {
      return this.sistemaOperativo != ''
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
  width: 30px;
}

.input-style {
  margin-top: 5px;
}
</style>