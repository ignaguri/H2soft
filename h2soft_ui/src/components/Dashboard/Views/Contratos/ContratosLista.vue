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
  /* eslint-disable indent */

  import PaperTable from 'components/UIComponents/PaperTable.vue'
  import api from 'src/api/services'

  const tableColumns = ['Cliente', 'FechaFirma', 'FechaVigencia', 'Cantidad', 'Precio']

  export default{
    components: {
      PaperTable
    },
    data () {
      return {
        table1: {
          title: 'Contratos',
          subTitle: 'Contratos que estan vigentes actualmente',
          columns: [...tableColumns],
           data: []
        }
      }
    },
    mounted () {
      this.cargarContratos()
    },
    methods: {
      cargarContratos () {
      api.getContratos(this).then(res => {
            res.body.data.forEach(contrat => {
              this.table1.data.push({
                cliente: contrat.idCilente, // Cambiar por el nombre del ciente
                fechafirma: contrat.fechaFirma,
                fechavigencia: Date(contrat.fechaVigencia),
                cantidad: contrat.cantidad,
                precio: contrat.precioPorUnidad

              })
            })
        }, error => {
            console.log('error' + JSON.stringify(error))
        })
      }
  }

  }

</script>

<style>

</style>
