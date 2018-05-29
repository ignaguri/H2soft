<template>
  <div>
    <div class="row">
     <!-- <component :is="current"></component>-->
      <ContratosLista v-if="this.isContratosList" @emmited="capturarEvento"></ContratosLista>
      <NuevoContrato v-if="!this.isContratosList" :id="contratoId" :edit="edit"></NuevoContrato>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="text-center">
          <button type="button" class="btn btn-info btn-fill btn-wd" @click="newContrato" v-show="isContratosList" >
            Agregar Contrato
          </button>
          <button type="button" class="btn btn-default btn-fill btn-wd" @click="verLista"  v-show="!isContratosList" >
            Volver
          </button>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable indent */

  import ContratosLista from './ContratosLista.vue'
  import NuevoContrato from './NuevoContrato.vue'
  export default {
    components: {
      ContratosLista,
      NuevoContrato
    },
    data () {
      return {
        current: 'ContratosLista',
        isContratosList: true,
        contratoId: 0,
        edit: false
      }
    },
    methods: {
      verLista () {
        this.isContratosList = true
      },
      newContrato () {
        this.edit = false
        this.isContratosList = false
        this.contratoId = 0
      },
      capturarEvento (e) {
        switch (e.action) {
          case 'edit':
            this.edit = true
            this.isContratosList = false
            break
          case 'ver':
            break
        }
      }
    }
  }
</script>

<style>

</style>
