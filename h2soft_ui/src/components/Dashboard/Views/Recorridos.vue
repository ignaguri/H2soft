<template>
  <div>
    <div class="row">
      <recorrido-list v-if="this.isRecorridoList"></recorrido-list>
      <detalle-recorrido v-if="!this.isRecorridoList" v-bind:id="recorridoAsignadoId"></detalle-recorrido>
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
        recorridoAsignadoId: 0
      }
    },
    methods: {
      seeList () {
        this.isRecorridoList = true
        this.recorridoAsignadoId = 0
      }
    }
  }
</script>
<style>
</style>
