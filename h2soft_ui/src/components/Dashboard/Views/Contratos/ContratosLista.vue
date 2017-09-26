<template>
  <div>
    <div class="col-md-12">
      <div class="card">
        <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns" :edit="editarContrato" :eraseButton="false">
        </paper-table>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable indent */
  // TODO: para el campo cliente hacer que traiga el nombre del cliente y no el ID
  // TODO: cambiar formato de la fecha
  // TODO: hacer que al cargar la primera vez la pagina me carge los  datos de la lista y no al actualizarla
  // TODO: traer el producto del contrato  en los resultado que se muestran en la tabla

  import PaperTable from 'components/UIComponents/PaperTablePlus.vue'
  import api from 'src/api/services/contratosServices'
  const tableColumns = ['idcontrato', 'Cliente', 'FechaFirma', 'FechaVigencia', 'Cantidad', 'Precio']
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
                idcontrato: contrat.idContratos,
                cliente: contrat.idCilente, // Cambiar por el nombre del ciente
                fechafirma: contrat.fechaFirma,
                fechavigencia: contrat.fechaVigencia,
                cantidad: contrat.cantidad,
                precio: contrat.precioPorUnidad
              })
            })
        }, error => {
            console.log('error' + JSON.stringify(error))
        })
      },
    editarContrato (e) {
      let id = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
      this.$parent.contratoId = id
      this.$parent.isContratosList = false
    }
  }

  }

</script>

<style>

</style>
