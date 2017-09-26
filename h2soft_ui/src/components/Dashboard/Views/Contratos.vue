<template>
  <div>
    <div class="row">
     <!-- <component :is="current"></component>-->
      <NuevoContrato v-if="!this.isContratosList" v-bind:id="contratoId"></NuevoContrato>
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
        isContratosList: true,
        contratoId: 0
      }
    },
    methods: {
      verLista () {
        this.current = ContratosLista
        this.isContratosList = true
        this.contratoId = 0
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
