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
    created () {
      // this.marcarUltimoVisitado()
    },
    methods: {
      marcarUltimoVisitado () {
        let ultimosvisitados = []
        ultimosvisitados = this.reparto.objetivos.sort((a, b) => b.horavisitado - a.horavisitado)
        console.log('ultimosvisitados', ultimosvisitados)
        console.log('ultimo visitado', this.reparto.objetivos[0])
        // this.reparto.objetivos.find(x => x === ultimosvisitados[0]).ultimovisitado = true
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
