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
  // TODO: en el detale de contarto cambiar el criterio de seleccion de fila a: idProducto y cantidad y ver si funciona asi sacar columna id
  // TODO: para el campo cliente hacer que traiga el nombre del cliente y no el ID
  // TODO: cambiar formato de la fecha
  // TODO: hacer que al cargar la primera vez la pagina me carge los  datos de la lista y no al actualizarla
  // TODO: traer el producto del contrato  en los resultado que se muestran en la tabla

  import PaperTable from 'components/UIComponents/PaperTablePlus.vue'
  import api from 'src/api/services/contratosServices'
  /*
  const tableColumns = ['idcontrato', 'Cliente', 'FechaFirma', 'FechaVigencia', 'Cantidad', 'Precio']
  */
  const tableColumns = ['#', 'Cliente', 'Firmado', 'Vigente desde', 'Vigente hasta']
  export default{
    components: {
      PaperTable
    },
    data () {
      return {
        table1: {
          title: 'Contratos',
          subTitle: 'Contratos que están vigentes actualmente',
          columns: [...tableColumns],
           data: []
        }
      }
    },
    mounted () {
      api.getClientesContratos(this)
        .then(res => {
          this.clientes = res
          this.cargarContratos()
        })
    },
    methods: {
      cargarContratos () {
      api.getContratos(this).then(res => {
            res.body.data.forEach(contrat => {
              this.table1.data.push({
                '#': contrat.idContratos,
               // cliente: contrat.idCliente, // Cambiar por el nombre del ciente
                cliente: this.cargarCliente(contrat.idCliente),
              //  fechafirma: new Date(contrat.fechaFirma).getFullYear() + '/' + new Date(contrat.fechaFirma).getMonth() + '/' + new Date(contrat.fechaFirma).getDate(), // arreglar
                firmado: new Date(contrat.fechaFirma).toLocaleDateString('es-AR', { year: '2-digit', month: '2-digit', day: '2-digit' }),
                vigentedesde: new Date(contrat.fechaVigenciaDesde).toLocaleDateString('es-AR', { year: '2-digit', month: '2-digit', day: '2-digit' }),
                vigentehasta: new Date(contrat.fechaVigenciaHasta).toLocaleDateString('es-AR', { year: '2-digit', month: '2-digit', day: '2-digit' })
              })
            })
        }, error => {
            console.log('error' + JSON.stringify(error))
        })
      },
      editarContrato (e) {
      let id = Number(e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML)
      this.$parent.contratoId = id
      this.$parent.isContratosList = false
      this.$parent.edit = true
      this.$emit('emmited', {action: 'edit'})
    },
    cargarCliente (idCliente) {
        for (var i = 0, len = this.clientes.length; i < len; i++) {
          if (this.clientes[i].idClientes === idCliente) {
            return this.clientes[i].razonSocial
          }
        }
    },
    getClientes () {
      api.getClientesContratos(this)
      .then(res => {
       this.clientes = res
      })
    }
  }

  }

</script>

<style>

</style>
