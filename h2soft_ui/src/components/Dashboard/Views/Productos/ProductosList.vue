  <template>
  <div>
    <div class="col-md-12">
      <div class="card">
        <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns" :editButton="true" :eraseButton="false" :edit="editar" :goButton="false">
        </paper-table>
      </div>
    </div>
  </div>
</template>
<script>
  // import PaperTable from 'components/UIComponents/PaperTable.vue'
  import PaperTable from 'components/UIComponents/PaperTablePlus.vue'
  import api from 'src/api/services/productosServices'

  const tableColumns = ['#', 'Nombre', 'Descripción']
  export default {
    components: {
      PaperTable
    },
    data () {
      return {
        showCustomModal: false,
        table1: {
          title: 'Productos',
          subTitle: 'Lista de productos cargados en el sistema',
          columns: [...tableColumns],
          data: []
        }
      }
    },
    mounted () {
      this.cargarProductos()
    },
    methods: {
      cargarProductos () {
        api.getProductos(this)
        .then(res => {
          res.forEach(p => {
            this.table1.data.push({
              '#': p.idProductos,
              'nombre': p.nombre,
              'descripción': p.descripcion
            })
          })
        }, error => {
          console.log('error ' + JSON.stringify(error))
        })
      },
      editar (e) {
        let id = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        this.$emit('emitted', {action: 'edit', prod: id})
      }
    }
  }

</script>
<style>

</style>
