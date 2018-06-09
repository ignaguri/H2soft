<template>
  <div>
    <div class="row">
      <tabs id="pestañas" v-model="this.pestañaActiva" @active="cambio" nav-style="tabs" justified>
        <tab header="Camiones">
          <camiones v-if="this.pestañaActiva === 0"></camiones>
        </tab>
        <tab header="Empleados">
          <empleados v-if="this.pestañaActiva === 1"></empleados>
        </tab>
      </tabs>
    </div>
  </div>
</template>
<script>
  import { tabs, tab } from 'vue-strap'
  import camiones from './camiones/Camiones.vue'
  import empleados from './Empleados/Empleados.vue'

  export default {
    components: {
      tabs,
      tab,
      camiones,
      empleados
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
