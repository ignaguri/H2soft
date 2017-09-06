<template>
  <div>
    <div class="row">
      <component :is="current"></component>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="text-center">
          <button type="button" class="btn btn-info btn-fill btn-wd" @click="addClient" v-show="isClientList">
            Agregar Cliente
          </button>
          <button type="button" class="btn btn-danger btn-fill btn-wd" @click="seeList" v-show="!isClientList">
            Cancelar
          </button>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>

</template>
<script>
  import ClientsList from './Clientes/ClientsList.vue'
  import NewClientForm from './Clientes/NewClientForm.vue'
  export default {
    components: {
      ClientsList,
      NewClientForm
    },
    data () {
      return {
        current: 'ClientsList',
        isClientList: true
      }
    },
    methods: {
      addClient () {
        this.current = 'NewClientForm'
        this.isClientList = false
      },
      seeList () {
        this.current = 'ClientsList'
        this.isClientList = true
      }
    }
  }

</script>
<style>

</style>
