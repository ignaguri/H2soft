<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns"  :goButton="false" :eraseButton="false" :editButton="false"  >
        </paper-table>
      </div>
    </div>
  </div>
</template>
<script>
  import auth from 'src/api/auth'
  import api from 'src/api/services/remitoServices'
  import PaperTable from 'components/UIComponents/PaperTablePlus.vue'
  const tableColumns = ['Producto', 'Cantidad', 'Dispenser']
  const dataColumns = []

  export default {
    components: {
      PaperTable
    },
    data () {
      return {
        table1: {
          title: 'Detalles Remito',
          subTitle: 'Listado de detalle de remito',
          columns: [...tableColumns],
          data: [...dataColumns]
        },
        productos: []
      }
    },
    props: {
      idRemito: Number
    },
    mounted () {
      this.cargarDetalles(17)
    },
    methods: {
      cargarDetalles (id) {
        api.getDetallesRemito(this, id)
            .then(resUs => {
              resUs.body.data.forEach(rem => {
                this.table1.data.push({
                  producto: rem.producto,
                  cantidad: rem.cantidad,
                  dispenser: rem.dispenser
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
