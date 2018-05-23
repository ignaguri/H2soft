<template>
  <div class="card">
    <div class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data"
                         :columns="table1.columns" :goButton="false" :edit="editar" :erase="borrar">
            </paper-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import PaperTable from 'components/UIComponents/PaperTablePlus.vue'
  import { select } from 'vue-strap'
  import api from 'src/api/services/alertasServices'

  const tableColumns = ['Nro', 'Cliente', 'Objetivo', 'Tipo', 'Notificacion', 'Estado']
  export default {
    components: {
      PaperTable,
      dds: select
    },
    data () {
      return {
        isAlertasList: true,
        table1: {
          title: 'Alertas',
          subTitle: 'Listado de alertas',
          columns: [...tableColumns],
          data: []
        }
      }
    },
    mounted () {
      this.cargarAlertas()
    },
    methods: {
      cargarAlertas () {
        this.table1.data = []
        api.getAlertas(this).then(r => {
          this.table1.data = r
        })
      },
      editar (e) {
        let id = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        this.$emit('emitted', {action: 'edit', alerta: id})
      },
      borrar (e) {
        let id = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        this.$emit('emitted', {action: 'erase', alerta: id})
      }
    }
  }

</script>
<style>

</style>
