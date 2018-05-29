<template>
  <div>
    <div class="row">
      <clients-list v-if="isClientList" @emitted="capturarEvento"></clients-list>
      <new-client-form v-if="!isClientList" :edit="edit" :idCliente="idCliente"></new-client-form>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="text-center">
          <button type="button" class="btn btn-info btn-fill btn-wd" @click="addClient" v-show="isClientList">
            Agregar Cliente
          </button>
          <button type="button" class="btn btn-default btn-fill btn-wd" @click="seeList" v-show="!isClientList">
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
  import ClientsList from './ClientsList.vue'
  import NewClientForm from './NewClientForm.vue'

  export default {
    components: {
      ClientsList,
      NewClientForm
    },
    data () {
      return {
        isClientList: true,
        edit: false,
        idCliente: -1
      }
    },
    methods: {
      addClient () {
        this.edit = false
        this.isClientList = false
      },
      seeList () {
        this.isClientList = true
      },
      capturarEvento (e) {
        switch (e.action) {
          case 'edit':
            this.edit = true
            this.idCliente = parseInt(e.client)
            this.isClientList = false
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
