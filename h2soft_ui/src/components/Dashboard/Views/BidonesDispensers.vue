<template>
  <div>
    <div class="row">
      <tabs id="pestañas" v-model="this.pestañaActiva" @active="cambio" nav-style="tabs" justified>
        <tab header="Clientes">
           <clientes v-if="this.pestañaActiva === 0"></clientes>
        </tab>
        <tab header="Alertas" >
          <alertas v-if="this.pestañaActiva === 1"></alertas>
        </tab>
        <tab header="Mantenimientos">
          <mantenimientos v-if="this.pestañaActiva === 2"></mantenimientos>
        </tab>
        <tab header="Dispensers" >
          <dispensers v-if="this.pestañaActiva === 3"></dispensers>
        </tab>
      </tabs>
    </div>
  </div>
</template>
<script>
  import tabs from 'vue-strap/src/Tabs.vue'
  import tab from 'vue-strap/src/Tab.vue'
  import clientes from './Dispensers/DispensersCliente.vue'
  import dispensers from './Dispensers/Dispensers.vue'
  import alertas from './Dispensers/Alertas.vue'
  import mantenimientos from './Mantenimiento/MantenimientosList.vue'

  export default {
    components: {
      tabs,
      tab,
      dispensers,
      alertas,
      mantenimientos,
      clientes
    },
    data () {
      return {
        pestañaActiva: 1
      }
    },
    methods: {
      cambio (index) {
        this.pestañaActiva = index
      }
    }
  }
</script>
