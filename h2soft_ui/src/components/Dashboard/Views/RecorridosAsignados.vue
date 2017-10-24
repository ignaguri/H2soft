<template>
  <div>
    <div class="row">
      <recorrido-list v-if="this.verLista"></recorrido-list>
      <detalle-recorrido v-if="this.verDetalle" v-bind:id="recorridoAsignadoId" :dia="this.dia" :turno="this.turno" :fecha="this.fecha" :temporada="this.temporada" v-bind:estado="estado"></detalle-recorrido>
      <remito v-if="this.verRemito" v-bind:id="objetivoId" ></remito>
    </div>
    <div class="row">
      <div class="col-md-11">
        <div class="text-center">
          <button type="button" class="btn btn-danger btn-fill btn-wd" @click="seeLista" v-if="verDetalle">
            Atrás
          </button>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import RecorridoList from './RecorridosRealizados/RecorridosAsignadosList.vue'
  import DetalleRecorrido from './RecorridosRealizados/DetalleRecorridoAsignado.vue'
  import Remito from './RecorridosRealizados/Remito.vue'
  export default {
    components: {
      RecorridoList,
      DetalleRecorrido,
      Remito
    },
    data () {
      return {
        verLista: true,
        verDetalle: false,
        verRemito: false,
        recorridoAsignadoId: 0,
        objetivoId: 0,
        dia: '',
        turno: '',
        temporada: '',
        fecha: '',
        estado: ''
      }
    },
    methods: {
      seeLista () {
        this.verLista = true
        this.verDetalle = false
        this.recorridoAsignadoId = 0
        this.objetivoId = 0
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
