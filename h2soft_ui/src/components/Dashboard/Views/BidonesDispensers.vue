<template>
  <div>
    <div class="row">
      <tabs>
        <tab header="Clientes">
        </tab>
        <tab header="Alertas" >
          <alertas></alertas>
        </tab>
        <tab header="Mantenimientos">
          <mantenimientos></mantenimientos>
        </tab>
        <tab header="Dispensers" >
          <dispensers></dispensers>
        </tab>
      </tabs>

    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="text-center">

        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import tabs from 'vue-strap/src/Tabs.vue'
  import tab from 'vue-strap/src/Tab.vue'
  import dispensers from './Dispensers/DispensersList.vue'
  import alertas from './Dispensers/AlertasList.vue'
  import mantenimientos from './Mantenimiento/MantenimientosList.vue'

  export default {
    components: {
      tabs,
      tab,
      dispensers,
      alertas,
      mantenimientos
    }
  }
</script>
