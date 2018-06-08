<template>
  <div>
    <div class="row">
      <dispenser-list v-if="isCamionesList" @emitted="capturarEvento"></dispenser-list>
      <dispenser-new v-if="!isCamionesList" :edit="edit" :id="idCamiones"></dispenser-new>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="text-center">
          <button type="button" class="btn btn-info btn-fill btn-wd" @click="addDispenser" v-if="isCamionesList">
            Agregar camion
          </button>
          <button type="button" class="btn btn-default btn-fill btn-wd" @click="seeList" v-if="!isCamionesList">
            Volver
          </button>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>
<script>
  // TODO: poner los botones en cada componente
  import DispenserList from './CamionesList.vue'
  import DispenserNew from './CamionesNew.vue'

  export default {
    components: {
      DispenserList,
      DispenserNew
    },
    data () {
      return {
        isCamionesList: true,
        edit: false,
        idCamiones: 0
      }
    },
    methods: {
      addDispenser () {
        this.edit = false
        this.isCamionesList = false
      },
      seeList () {
        this.isCamionesList = true
        this.idCamiones = 0
        this.edit = false
      },
      capturarEvento (e) {
        switch (e.action) {
          case 'edit':
            console.log('editar disp: ', e.client)
            this.edit = true
            this.idCamiones = parseInt(e.client)
            this.isCamionesList = false
            break
          case 'ver':
            console.log('ver disp: ', e.client)
            break
        }
      }
    }
  }

</script>
<style>

</style>
