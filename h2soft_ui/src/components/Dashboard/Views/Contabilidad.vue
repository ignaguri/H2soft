<template>
  <div>
    <div class="row">
      <tabs id="pestañas" v-model="this.pestañaActiva" @active="cambio" nav-style="tabs" justified>
        <tab header="Contabilidad">
           <contabilidad v-if="this.pestañaActiva === 0"></contabilidad>
        </tab>
        <tab header="Remitos" >
          <remitos v-if="this.pestañaActiva === 1"></remitos>
        </tab>
      </tabs>
    </div>
  </div>
</template>
<script>
  import { tabs, tab } from 'vue-strap'
  import contabilidad from './Contabilidad/Contabilidad'
  import remitos from './Contabilidad/Remitos'

  export default {
    components: {
      tabs,
      tab,
      contabilidad,
      remitos
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
