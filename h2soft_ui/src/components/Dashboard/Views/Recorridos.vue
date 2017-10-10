<template>
  <div>
    <div class="row">
      <recorrido-list v-if="this.isRecorridoList"></recorrido-list>
      <detalle-recorrido v-if="!this.isRecorridoList" v-bind:id="recorridoAsignadoId" :dia="this.dia" :turno="this.turno" :fecha="this.fecha" :temporada="this.temporada" :estado="this.estado"></detalle-recorrido>
    </div>
    <div class="row">
      <div class="col-md-11">
        <div class="text-center">
          <button type="button" class="btn btn-danger btn-fill btn-wd" @click="seeList" v-show="!isRecorridoList">
            Atrás
          </button>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import RecorridoList from './Recorridos/RecorridosAsignadosList.vue'
  import DetalleRecorrido from './Recorridos/DetalleRecorridoAsignado.vue'
  export default {
    components: {
      RecorridoList,
      DetalleRecorrido
    },
    data () {
      return {
        isRecorridoList: true,
        recorridoAsignadoId: 0,
        dia: '',
        turno: '',
        temporada: '',
        fecha: '',
        estado: ''
      }
    },
    methods: {
      seeList () {
        this.isRecorridoList = true
        this.recorridoAsignadoId = 0
        this.dia = ''
        this.turno = ''
        this.temporada = ''
        this.fecha = ''
        this.estado = ''
      }
    }
  }
</script>
<style>
</style>
