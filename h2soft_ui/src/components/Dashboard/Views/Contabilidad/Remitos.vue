<template>
  <div>
    <div class="row">
      <listado-remitos v-if="isRemitosList"></listado-remitos>
      <listado-detalle-remito v-if="!isRemitosList":idRemito="idRemito" ></listado-detalle-remito>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="text-center">
          <button type="button" class="btn btn-default btn-fill btn-wd" v-show="!isRemitosList" @click="seeList">
            Volver
          </button>
        </div>
        <div class="clearfix" ></div>
      </div>
    </div>
  </div>
</template>
<script>
  import ListadoRemitos from '../ListadoRemitos/ListadoRemitos.vue'
  import ListadoDetalleRemito from '../ListadoRemitos/ListadoDetalleRemito.vue'
  export default {
    components: {
      ListadoRemitos,
      ListadoDetalleRemito
    },
    data () {
      return {
        isRemitosList: true,
        idRemito: -1
      }
    },
    methods: {
      seeList () {
        this.isRemitosList = true
      }
    }
  }
</script>
<style>

</style>
