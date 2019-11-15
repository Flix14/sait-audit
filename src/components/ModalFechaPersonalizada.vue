<template>
  <b-modal id="modalFechaPersonalizada" centered title="Rango de fechas">
    <b-input-group prepend="De:">
      <b-input 
        v-model="fechaInicio" 
        @focus="changeSelectedInputText(fechaInicio, 'inicio')" 
        autofocus 
        readonly>
      </b-input>
    </b-input-group>
    <br>
    <b-input-group prepend="Hasta:">
      <b-input 
        v-model="fechaFin" 
        @focus="changeSelectedInputText(fechaFin, 'fin')" 
        readonly>
      </b-input>
    </b-input-group>
    <br>
    <date-pick
      v-model="fecha"
      :hasInputElement="false"
    ></date-pick>
    <template v-slot:modal-footer="{ Cancelar, Aceptar }">
      <b-button size="sm" variant="danger" @click="closeModal()">
        Cancelar
      </b-button>
      <b-button size="sm" variant="success" @click="sendFecha()">
        Aceptar
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';

export default {
  components: {DatePick},
  data() {
    return {
      fecha: '',
      fechaInicio: '',
      fechaFin: '',
      selectedInput: 'inicio'
    }
  },
  methods: {
    closeModal() {
      this.$bvModal.hide('modalFechaPersonalizada')
    },
    sendFecha() {
      if(parseInt(this.fechaInicio.replace(/-/g, '')) > parseInt(this.fechaFin.replace(/-/g, ''))) {
        let guardaFecha = this.fechaInicio;
        this.fechaInicio = this.fechaFin
        this.fechaFin = guardaFecha
      }
      this.$emit('sendingFechas', {inicio: this.fechaInicio, fin: this.fechaFin})
      this.closeModal()
    },
    changeSelectedInputText(fecha, input){
      if(fecha != '') {
        this.fecha = fecha
      }
      this.selectedInput = input
    }
  },
  watch: {
    fecha: function () {
      if(this.selectedInput == 'inicio') {
        this.fechaInicio = this.fecha
      } else {
        this.fechaFin = this.fecha
      }
    }
  },
  created() {
    let fechaHoy = new Date()
    this.fechaInicio = fechaHoy.getFullYear() + '-' + (fechaHoy.getMonth()+1)  + '-' + fechaHoy.getDate()
    this.fechaFin = fechaHoy.getFullYear() + '-' + (fechaHoy.getMonth()+1)  + '-' + fechaHoy.getDate()
  }
}
</script>

<style scoped>
[readonly] {
  background-color: white;
}
</style>