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
        <tab header="Productos">
          <productos v-if="this.pestañaActiva === 2"></productos>
        </tab>
      </tabs>
    </div>
  </div>
</template>
<script>
  import { tabs, tab } from 'vue-strap'
  import camiones from './camiones/Camiones.vue'
  import empleados from './Empleados/Empleados.vue'
  import productos from './Productos/Productos.vue'

  export default {
    components: {
      tabs,
      tab,
      camiones,
      empleados,
      productos
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
