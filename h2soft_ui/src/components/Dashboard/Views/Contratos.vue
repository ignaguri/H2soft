<template>
  <div>
    <div class="row">
      <component :is="current"></component>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="text-center">
          <button type="button" class="btn btn-info btn-fill btn-wd" v-show="isClientList" >
            Agregar Contrato
          </button>
          <button type="button" class="btn btn-danger btn-fill btn-wd" >
            Cancelar
          </button>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>

</template>

<script>
  /* eslint-disable indent */

  import ContratosLista from './Contratos/ContratosLista.vue'

  export default {
    components: {
      ContratosLista
    },
    data () {
      return {
        current: 'ContratosLista',
        isClientList: true
      }
    },
    methods: {
    }
  }
</script>

<style>

</style>
