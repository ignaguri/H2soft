<template>
  <div class="row">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data"
                       :columns="table1.columns" :goButton="false" :eraseButton="false" :editButton="false">
          </paper-table>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <paper-table type="hover" :title="table2.title" :sub-title="table2.subTitle" :data="table2.data"
                       :columns="table2.columns" :goButton="false" :eraseButton="false" :editButton="false">
          </paper-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//  import auth from 'src/api/auth'
  import api from 'src/api/services/listadoRemitoServices'
  import apiDispensers from 'src/api/services/dispensersServices'
  import PaperTable from 'components/UIComponents/PaperTablePlus.vue'
  const tableColumns1 = ['Producto', 'Cantidad', 'Dejado']
  const dataColumns1 = []
  const tableColumns2 = ['Dispenser', 'Dejado']
  const dataColumns2 = []

  export default {
    components: {
      PaperTable
    },
    data () {
      return {
        table1: {
          title: 'Detalle Remito Productos',
          subTitle: 'Listado de detalle de remito',
          columns: [...tableColumns1],
          data: [...dataColumns1]
        },
        table2: {
          title: 'Detalle Remito Dispensers ',
          subTitle: 'Listado de detalle de remito',
          columns: [...tableColumns2],
          data: [...dataColumns2]
        },
        productoss: {},
        dispensers: {}
      }
    },
    props: {
      idRemito: Number
    },
    mounted () {
      this.getDispensers()
      this.getProductoss()
      this.cargarDetallesProducto(this.idRemito)
      this.cargarDetallesDispensers(this.idRemito)
    },
    methods: {
      cargarDetallesProducto (id) {
        api.getDetallesRemito(this, id)
          .then(resUs => {
            resUs.body.data.forEach(rem => {
              this.table1.data.push({
                producto: this.cargarProducto(rem.idProducto),
                cantidad: rem.cantidad,
                dejado: this.estaDejado(rem.dejadoEnCliente)
              })
            })
          }, error => {
            console.log('error al cargar los remitos ' + error)
          })
      },
      cargarProducto (idProd) {
        for (let p = 0, len = this.productoss.length; p < len; p++) {
          if (this.productoss[p].idProductos === idProd) {
            return this.productoss[p].nombre
          }
        }
      },
      getProductoss () {
        api.getProductosRemitos(this)
          .then(res => {
            this.productoss = res
          })
      },
      cargarDetallesDispensers (id) {
        api.getDetallesRemitoDispensers(this, id)
          .then(resUs => {
            resUs.body.data.forEach(remit => {
              this.table2.data.push({
                dispenser: this.cargarDispenser(remit.idDispenser),
                dejado: this.estaDejado(remit.dejadoEnCliente)
              })
            })
          }, error => {
            console.log('error al cargar los remitos ' + error)
          })
      },
      estaDejado (dejado) {
        if (dejado === 1 || dejado === null) {
          return 'Colocado'
        }
        return 'Retirado'
      },
      getDispensers () {
        apiDispensers.getDispensers(this)
          .then(r => {
            this.dispensers = r
          })
      },
      cargarDispenser (idDispenser) {
        for (let p = 0, len = this.dispensers.length; p < len; p++) {
          if (this.dispensers[p].idDispensers === idDispenser) {
            return this.dispensers[p].codigo
          }
        }
      }
    }
  }

</script>
<style>

</style>
