<template>
  <div>
    <div class="row">
      <tabs id="pestañas" v-model="this.pestañaActiva" @active="cambio" nav-style="tabs" justified>
        <tab header="Camiones">
          <camiones v-if="this.pestañaActiva === 0"></camiones>
        </tab>
      </tabs>
    </div>
  </div>
</template>
<script>
  import { tabs, tab } from 'vue-strap'
  import camiones from './camiones/Camiones.vue'

  export default {
    components: {
      tabs,
      tab,
      camiones
    },
    data () {
      return {
        pestañaActiva: 0
      }
    },
    methods: {
    }
  }
</script>
