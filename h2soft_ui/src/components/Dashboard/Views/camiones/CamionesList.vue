<template>
  <div>
    <div v-if="isCamionesList">
      <div class="col-md-12">
        <div class="card">
          <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data"
                       :columns="table1.columns" :editButton="true" :eraseButton="true"
                       :erase="borrarCamion" :goButton="false"
                       :edit="editar">
          </paper-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  // import PaperTable from 'components/UIComponents/PaperTable.vue'
  import PaperTable from 'components/UIComponents/PaperTablePlus.vue'
  import api from 'src/api/services/camionServices'
  import noti from 'src/api/notificationsService'
  const tableColumns = ['#', 'Camión', 'Capacidad máxima']
  //  let tableData = []

  export default {
    components: {
      PaperTable
    },
    data () {
      return {
        isCamionesList: true,
        estados: [],
        table1: {
          title: 'Camiones',
          subTitle: 'Listado de camiones de la empresa',
          columns: [...tableColumns],
          data: []
        }
      }
    },
    mounted () {
      this.cargarCamiones()
    },
    methods: {
      cargarCamiones () {
        api.getCamiones(this).then(res => {
          res.forEach(camion => {
            this.table1.data.push({
              '#': camion.idCamiones,
              camion: camion.nombre,
              capacidadmaxima: camion.capacidadMaxima
            })
          })
        }, error => {
          console.log('error' + JSON.stringify(error))
        })
      },
      editar (e) {
        let id = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        this.$emit('emitted', {action: 'edit', client: id})
        this.$parent.idCamiones = id
      },
      borrarCamion (e) {
        let id = Number(e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML)
        api.deleteCamion(this, id)
          .then(res => {
            if (res) {
              noti.exitoConTexto(this, 'Éxito', 'El camión se ha eliminado!')
            }
          })
          .catch(err => {
            console.log('errorr', err)
            noti.errorConTexto(this, 'Error', 'Error al eliminar camión')
          })
      }
    }
  }

</script>
<style>

</style>
