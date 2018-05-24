<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="">
          <p class="category horizontal repartidor" >{{reparto.repartidor}}</p>
          <objetivo v-for="obj in ordenados" :objetivo="obj"></objetivo>
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
      return {
        ordenados: []
      }
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
      this.ordenar()
    },
    methods: {
      ordenar () {
        console.log('ordenar')
        this.ordenados = this.reparto.objetivos.sort(function (o1, o2) {
          if (o1.orden > o2.orden) {
            return 1
          } else if (o1.orden < o2.orden) {
            return -1
          }
          return 0
        })
      }
    }
  }
</script>
<style>
.repartidor {
    margin-top: 36px;
    margin-left: 20px;
    margin-right: 20px;
    width: 60px;
}

</style>
