<template>
  <b-modal id="modalAgregarServidor" title="Ingresar nuevo servidor" centered @hidden="cleanModal()">
    <h6>Dirección pública</h6>
    <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
      <b-input placeholder="Dirección pública" v-model="direccionPublica" :formatter="formatIP" :state="changeStateInputDireccionPublica"></b-input>
    </b-input-group>
    <br>
    <h6>Sistema operativo</h6>
    <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
      <b-input placeholder="Sistema operativo" v-model="sistemaOperativo" :state="changeStateInputSistemaOperativo"></b-input>
    </b-input-group>
    <br>
    <b-row>
      <b-col>
        <h6 ref="serv" :state="false">Dominios</h6>
      </b-col>
      <b-col class="text-right">
        <b-button variant="outline-danger" size="sm" @click="totalNuevosDominios--; dominios.pop()" v-if="totalNuevosDominios" style="width: 30px">-</b-button>
        <b-button variant="outline-primary" size="sm" @click="totalNuevosDominios++; dominios.push('')" style="margin-left: 5px; width: 30px">+</b-button>
      </b-col>
    </b-row>
    <div ref="divServidores" v-if="!totalNuevosDominios">
      <p>Agregue dominios para el servidor</p>
    </div>
    <div v-else>
      <div v-for="dominio in totalNuevosDominios" :key="dominio">
        <b-input placeholder="Dominio" v-model="dominios[dominio - 1]" style="margin-top: 5px" :state="dominios[dominio - 1] == '' ? false : true"></b-input>
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
import axios from 'axios'

export default {
  data() {
    return {
      direccionPublica: '',
      sistemaOperativo: '',
      dominios: [],
      totalNuevosDominios: 0,
      reg: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/
    }
  },
  methods: {
    cleanModal() {
      this.direccionPublica = ""
      this.sistemaOperativo = ""
      this.dominios = []
      this.totalNuevosDominios = 0
    },
    closeModal() {
      this.$bvModal.hide("modalAgregarServidor")
    },
    addServidor() {
      var dominioVacio = false
      if(this.changeStateInputDireccionPublica && this.changeStateInputSistemaOperativo && this.totalNuevosDominios > 0 && this.dominios.length > 0) {
        this.dominios.forEach(dominio => {
          if(dominio == '') {
            dominioVacio = true
            return
          }
        })
        if(!dominioVacio) {
          this.dominios.forEach((dominio, index) => {
            this.dominios[index] = {'dominio': dominio}
          })
          axios.post(`${this.$store.getters.getDireccion}/servidores`, {
            direccion_publica: this.direccionPublica,
            sistema_operativo: this.sistemaOperativo,
            dominios: this.dominios
          }).then(() => {
            this.$emit('servidorAdding')
            this.closeModal()
          }).catch(() => {
            this.closeModal()
            alert("No hay conexión con el servidor")
          })
        } else {
          alert("Ingrese dominios")
        }
      } else {
        alert("Ingrese todos los campos necesarios")
      }
    },
    formatIP(value, event) { //ARREGLAR
    var arrayActual = value.split('.').length
    var caracterActual = event.data
    var arrayValores = value.split('.')
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
      return value.slice(0, value.length - 1)
    }
  },
  computed: {
    changeStateInputDireccionPublica: function() {
      //return this.direccionPublica != ''
      return this.reg.test(this.direccionPublica)
    },
    changeStateInputSistemaOperativo: function() {
      return this.sistemaOperativo != ''
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