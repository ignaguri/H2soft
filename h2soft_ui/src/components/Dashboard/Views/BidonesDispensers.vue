<template>
  <div>
    <div class="row">
      <tabs>
        <tab header="Clientes">
        </tab>
        <tab header="Alertas" >
        </tab>
        <tab header="Mantenimientos">
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
  import dispensers from './Dispensers/Dispensers.vue'

  export default {
    components: {
      tabs,
      tab,
      dispensers
    }
  }
</script>
