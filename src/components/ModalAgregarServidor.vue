<template>
  <b-modal 
    id="modalAgregarServidor" 
    title="Ingresar nuevo servidor" 
    centered 
    @hidden="cleanModal()" 
    no-close-on-esc 
    no-close-on-backdrop 
    hide-header-close>
    <h6>Dirección pública</h6>
    <b-input-group>
      <b-input 
        placeholder="ej. 201.175.167.22" 
        v-model="direccionPublica" 
        :formatter="formatIP" 
        :state="changeStateInputDireccionPublica" 
        autofocus
      />
    </b-input-group>
    <p v-if="showWarningIP">*Debe ingresar una dirección IP válida</p>
    <br>
    <h6>Sistema operativo</h6>
    <b-input-group>
      <b-input 
        placeholder="ej. Microsoft Windows Server 2016 Essentials" 
        v-model="sistemaOperativo" 
        :state="changeStateInputSistemaOperativo" 
      />
    </b-input-group>
    <p v-if="showWarningSO">*Debe ingresar un sistema operativo</p>
    <br>
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
          class="input-dom"
          placeholder="ej. www.example.com" 
          v-model="dominios[dominio - 1]" 
          :state="dominios[dominio - 1] != ''">
        </b-input>
        <p v-if="showWarningDOM && dominios[dominio - 1] == ''">*Ingrese un dominio</p>
      </div>
    </div>
    <template v-slot:modal-footer="{ Cancelar, Agregar }">
      <b-button size="sm" variant="danger" @click="closeModal()">
        Cancelar
      </b-button>
      <b-button size="sm" variant="success" @click="addServidor()">
        Agregar
      </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      direccionPublica: '',
      sistemaOperativo: '',
      dominios: [],
      enviarDominios: [],
      totalNuevosDominios: 0,
      exReg: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,
      showWarningIP: false,
      showWarningSO: false,
      showWarningDOM: false
    }
  },
  methods: {
    cleanModal() {
      this.direccionPublica = ''
      this.sistemaOperativo = ''
      this.dominios = []
      this.enviarDominios = []
      this.totalNuevosDominios = 0
      this.showWarningSO = false
      this.showWarningDOM = false
      this.showWarningIP = false
    },
    closeModal() {
      this.$bvModal.hide('modalAgregarServidor')
    },
    addServidor() {
      var dominioVacio = false
      this.showWarningDOM = false
      this.showWarningSO = false
      this.showWarningIP = false
      if(this.changeStateInputDireccionPublica && this.changeStateInputSistemaOperativo && this.totalNuevosDominios > 0 && this.dominios.length > 0) {
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
          this.$http.post(`${this.$store.getters.getDireccion}/servidores`, {
            direccion_publica: this.direccionPublica,
            sistema_operativo: this.sistemaOperativo,
            dominios: this.enviarDominios
          }).then(() => {
            this.$emit('servidorAdding')
            this.closeModal()
          }).catch((e) => {
            if(e.response != undefined){
              if(e.response.status == 409) {
                this.$bvModal.msgBoxOk('Ya existe un servidor con esa dirección IP pública', {
                  title: 'Servidor existente',
                  size: 'sm',
                  buttonSize: 'sm',
                  okVariant: 'success',
                  headerClass: 'p-2 border-bottom-0',
                  footerClass: 'p-2 border-top-0',
                  centered: true
                })
              }
              if(e.response.status == 400) {
                this.$bvModal.msgBoxOk(`El dominio ${e.response.data.error.Message.split("'")[1]} ya existe o se encuentra repetido`, {
                  title: 'Dominio existente',
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
            this.enviarDominios = []
          })
        } else {
          this.showWarningDOM = true
        }
      } else {
        if(!this.changeStateInputDireccionPublica) {
          this.showWarningIP = true
        }
        if(!this.changeStateInputSistemaOperativo) {
          this.showWarningSO = true
        }
        if(this.totalNuevosDominios == 0) {
          this.showWarningDOM = true
        }
      }
    },
    formatIP(value, event) {
      var arrayValores = value.split('.')
      var arrayActual = arrayValores.length
      var caracterActual = event.data
      if(!Number.isNaN(Number.parseInt(caracterActual)) || caracterActual == '.' && arrayActual <= 4) {
        if(arrayActual == 1 && arrayValores[0].length <= 3){
          return value
        }
        if(arrayActual == 2 && arrayValores[1].length <= 3){
          return value
        }
        if(arrayActual == 3 && arrayValores[2].length <= 3){
          return value
        }
        if(arrayActual == 4 && arrayValores[3].length <= 3){
          return value
        }
      }
      if(event.type == 'input' && event.data != null) {
        return value.slice(0, value.length - 1)
      } else {
        return value.slice(0, value.length)
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
    changeStateInputDireccionPublica: function() {
      return this.exReg.test(this.direccionPublica)
    },
    changeStateInputSistemaOperativo: function() {
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
  width: 30px
}

.input-dom {
  margin-top: 5px;
}
</style>