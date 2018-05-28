<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="header">
            <h4 class="title">Estado de repartos</h4>
            <p class="category" >Repartos  del día de hoy</p>
          </div>
          <objetivos v-for="reparto in rep.reps" :reparto="reparto"></objetivos>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import objetivos from 'components/Dashboard/Views/Reportes/Objetivos.vue'
  
  export default {
    components: {
      objetivos
    },
    data () {
      return {}
    },
    props: {
      rep: {
        type: Object,
        default: () => {
          return {
            reps: []
          }
        }
      }
    }
  }

</script>
<style>

</style>
