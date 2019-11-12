<template>
  <b-modal id="modalFechaPersonalizada" centered title="Rango de fechas">
    <b-input-group prepend="De:" class="mb-2 mr-sm-2 mb-sm-0">
      <b-input v-model="fechaInicio" placeholder="Fecha de inicio" @focus="changeSelectedInputText(fechaInicio, 'inicio')" autofocus readonly style="background: #fff"></b-input>
    </b-input-group>
    <br>
    <b-input-group prepend="Hasta:" class="mb-2 mr-sm-2 mb-sm-0">
      <b-input ref="inputHasta" v-model="fechaFin" placeholder="Fecha final" @focus="changeSelectedInputText(fechaFin, 'fin')" readonly style="background: #fff"></b-input>
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
      fecha: null,
      fechaInicio: null,
      fechaFin: null,
      selectedInput: 'inicio'
    }
  },
  methods: {
    closeModal() {
      this.$bvModal.hide("modalFechaPersonalizada")
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
  }
}
</script>