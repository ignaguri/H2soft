<template>
  <div>
    <div class="row">
      <dispenser-list v-if="isDispensersList" @emitted="capturarEvento"></dispenser-list>
      <dispenser-new v-if="!isDispensersList" :edit="edit" :id="idDispenser"></dispenser-new>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="text-center">
          <button type="button" class="btn btn-info btn-fill btn-wd" @click="addDispenser" v-if="isDispensersList">
            Agregar dispenser
          </button>
          <button type="button" class="btn btn-default btn-fill btn-wd" @click="seeList" v-if="!isDispensersList">
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
  import DispenserList from './DispensersList.vue'
  import DispenserNew from './DispenserNew.vue'

  export default {
    components: {
      DispenserList,
      DispenserNew
    },
    data () {
      return {
        isDispensersList: true,
        edit: false,
        idDispenser: 0
      }
    },
    methods: {
      addDispenser () {
        this.edit = false
        this.isDispensersList = false
      },
      seeList () {
        this.isDispensersList = true
        this.idDispenser = 0
        this.edit = false
      },
      capturarEvento (e) {
        switch (e.action) {
          case 'edit':
            console.log('editar disp: ', e.client)
            this.edit = true
            this.idDispenser = parseInt(e.client)
            this.isDispensersList = false
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
