<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="">
          <p class="category horizontal repartidor" >{{reparto.repartidor}}</p>
          <objetivo v-for="obj in reparto.objetivos" :objetivo="obj"></objetivo>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  // import PaperTable from 'components/UIComponents/PaperTable.vue'
  import objetivo from 'components/Dashboard/Views/Reportes/Objetivo.vue'
  
  export default {
    components: {
      objetivo
    },
    data () {
      return {}
    },
    props: {
      reparto: {
        type: Object,
        default: () => {
          return {
            repartidor: String,
            objetivos: []
          }
        }
      }
    },
    mounted () {
      console.log(this.reparto)
      // this.cargarClientes()
    },
    methods: {
      cargarClientes () {}
    }
  }
</script>
<style>
.repartidor {
    margin-top: 40px;
    margin-left: 20px;
    margin-right: 20px;
    width: 60px;
}
.fabrica {

}
</style>
