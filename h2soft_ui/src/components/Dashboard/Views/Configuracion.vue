<template>
  <div>
    <div class="row">
      <tabs id="pestañas" v-model="this.pestañaActiva" @active="cambio" nav-style="tabs" justified>
        <tab header="Productos">
          <productos v-if="this.pestañaActiva === 0"></productos>
        </tab>
        <tab header="Camiones">
          <camiones v-if="this.pestañaActiva === 1"></camiones>
        </tab>
        <tab header="Empleados">
          <empleados v-if="this.pestañaActiva === 2"></empleados>
        </tab>
        <tab header="Usuarios">
          <usuarios v-if="this.pestañaActiva === 3"></usuarios>
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
  import usuarios from './Usuarios/Usuarios.vue'

  export default {
    components: {
      tabs,
      tab,
      camiones,
      empleados,
      productos,
      usuarios
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
