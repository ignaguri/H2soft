<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns"  :goButton="false" :eraseButton="false" :edit="editar" >
        </paper-table>
      </div>
    </div>
  </div>
</template>
<script>
//  import auth from 'src/api/auth'
  import api from 'src/api/services/listadoRemitoServices'
  import apiObjetivos from 'src/api/services/objetivoServices'
  import PaperTable from 'components/UIComponents/PaperTablePlus.vue'
  const tableColumns = ['Nro', 'Fecha', 'Objetivo', 'Empleado']
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
        empleados: [],
        objetivos: []
      }
    },
    mounted () {
      this.getEmpleados()
      this.getObjetivo()
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
                objetivo: this.cargarObjetivo(rem.idObjetivo),
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
      },
      editar (e) {
        let id = Number(e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML)
        // this.$emit('emitted', {action: 'edit', client: id})
        this.$parent.isRemitosList = false
        this.$parent.idRemito = id
      },
      getObjetivo () {
        apiObjetivos.getObjetivos(this)
          .then(res => {
            this.objetivos = res
          })
      },
      cargarObjetivo (idObjetivo) {
        for (var i = 0, len = this.objetivos.length; i < len; i++) {
          if (this.objetivos[i].idObjetivosXCliente === idObjetivo) {
            return this.objetivos[i].nombre
          }
        }
      }
    }
  }
</script>
<style>

</style>
