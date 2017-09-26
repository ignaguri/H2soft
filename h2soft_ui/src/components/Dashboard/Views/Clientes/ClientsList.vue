<template>
  <div>
    <div class="col-md-12">
      <div class="card">
        <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns">

        </paper-table>
      </div>
    </div>
  </div>
</template>
<script>
  import PaperTable from 'components/UIComponents/PaperTable.vue'
  import api from 'src/api/services/clientServices'
  const tableColumns = ['Id', 'Nombre', 'CUIL']
  //  let tableData = []
  // TODO: agregar cantidad de objetivos a la tabla
  // TODO: hacer cada cliente de la tabla linkeable
  // TODO: guardar lista en localStorage para ahorrar llamados a la api
  // TODO: ver como hacer para que despues del login recien se ejecute el getLocalidades
  export default {
    components: {
      PaperTable
    },
    data () {
      return {
        table1: {
          title: 'Clientes',
          subTitle: 'Lista de clientes con los que actualmente tenemos contrato',
          columns: [...tableColumns],
          data: []
        }
      }
    },
    mounted () {
      this.cargarClientes()
    },
    methods: {
      cargarClientes () {
        api.getClientes(this).then(res => {
          res.body.data.forEach(cl => {
            this.table1.data.push({
              id: cl.idClientes,
              nombre: cl.razonSocial,
              cuil: cl.CUIL
            })
          })
        }, error => {
          console.log('error ' + JSON.stringify(error))
        })
      }
    }
  }

</script>
<style>

</style>
