<template>
  <div>
    <div class="row">
     <!-- <component :is="current"></component>-->
      <NuevoContrato v-if="!this.isContratosList" v-bind:id="2"></NuevoContrato>
      <ContratosLista v-if="this.isContratosList" ></ContratosLista>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="text-center">
          <button type="button" class="btn btn-info btn-fill btn-wd" @click="newContrato" v-show="isContratosList" >
            Agregar contrato
          </button>
          <button type="button" class="btn btn-danger btn-fill btn-wd" @click="verLista"  v-show="!isContratosList" >
            Cancelar
          </button>
          <button type="button" class="btn btn-success btn-fill btn-wd" @click="newContrato"  v-show="isContratosList" >
            Editar contrato
          </button>
          <button type="button" class="btn btn-warning btn-fill btn-wd" @click=""  v-show="isContratosList" >
            Eliminar contrato
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
  import NuevoContrato from './Contratos/NuevoContrato.vue'
  export default {
    components: {
      ContratosLista,
      NuevoContrato
    },
    data () {
      return {
        current: 'ContratosLista',
        isContratosList: true
      }
    },
    methods: {
      verLista () {
        this.current = ContratosLista
        this.isContratosList = true
      },
      newContrato () {
        this.current = NuevoContrato
        this.isContratosList = false
      }
    }
  }
</script>

<style>

</style>
