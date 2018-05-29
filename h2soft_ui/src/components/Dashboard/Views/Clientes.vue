<template>
  <div>
    <div class="row">
      <tabs id="pestañas" v-model="this.pestañaActiva" @active="cambio" nav-style="tabs" justified>
        <tab header="Clientes">
           <clientes v-if="this.pestañaActiva === 0"></clientes>
        </tab>
        <tab header="Contratos" >
          <contratos v-if="this.pestañaActiva === 1"></contratos>
        </tab>
      </tabs>
    </div>
  </div>
</template>
<script>
  import { tabs, tab } from 'vue-strap'
  import clientes from './Clientes/Clientes'
  import contratos from './Contratos/Contratos'

  export default {
    components: {
      tabs,
      tab,
      clientes,
      contratos
    },
    data () {
      return {
        pestañaActiva: 0
      }
    },
    methods: {
      cambio (index) {
        this.pestañaActiva = index
      }
    }
  }
</script>
