<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns"  :goButton="false" :eraseButton="false"  >
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
        },
        empleados: []
      }
    },
    mounted () {
      this.getEmpleados()
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
                empleado: this.cargarEmpleado(rem.idEmpleado)
              })
            })
          }, error => {
            console.log('error al cargar los remitos ' + error)
          })
      },
      getEmpleados () {
        api.getEmpleados(this)
          .then(empl => {
            this.empleados = empl.body.data
          })
      },
      cargarEmpleado (idEmpleado) {
        for (var i = 0, len = this.empleados.length; i < len; i++) {
          if (this.empleados[i].idEmpleados === idEmpleado) {
            return this.empleados[i].nombre + ' ' + this.empleados[i].apellido
          }
        }
      }
    }
  }
</script>
<style>

</style>
