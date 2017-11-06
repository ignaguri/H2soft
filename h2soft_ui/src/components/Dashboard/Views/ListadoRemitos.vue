<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns"  :goButton="false"  >
        </paper-table>
      </div>
    </div>
  </div>
</template>
<script>
  import auth from 'src/api/auth'
  import api from 'src/api/services/remitoServices'
  import PaperTable from 'components/UIComponents/PaperTablePlus.vue'
  const tableColumns = ['Nro', 'Fecha', 'Empleado']
  const dataColumns = []

  export default {
    components: {
      PaperTable
    },
    data () {
      return {
        table1: {
          title: 'Remitos',
          subTitle: 'Listado de remitos',
          columns: [...tableColumns],
          data: [...dataColumns]
        }
      }
    },
    mounted () {
      this.cargarRemitos()
    },
    methods: {
      cargarRemitos () {
        api.getRemitos(this)
          .then(resUs => {
            resUs.body.data.forEach(rem => {
              this.table1.data.push({
                nro: rem.idRemito,
                fecha: new Date(rem.fecha).toLocaleDateString(),
                empleado: rem.idEmpleado
              })
            })
          }, error => {
            console.log('error al cargar los remitos ' + error)
          })
      }
    }
  }
</script>
<style>

</style>
