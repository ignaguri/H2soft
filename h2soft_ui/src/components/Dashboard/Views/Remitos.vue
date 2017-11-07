<template>
  <div>
    <div class="row">
      <listado-remitos v-if="false"></listado-remitos>
      <listado-detalle-remito v-if="true"></listado-detalle-remito>
    </div>
  </div>
</template>
<script>
  import ListadoRemitos from './ListadoRemitos/ListadoRemitos.vue'
  import ListadoDetalleRemito from './ListadoRemitos/ListadoDetalleRemito.vue'
  export default {
    components: {
      ListadoRemitos,
      ListadoDetalleRemito
    }
  }
</script>
<style>

</style>
