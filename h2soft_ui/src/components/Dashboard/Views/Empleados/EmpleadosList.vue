<template>
  <div>
    <div v-if="isEmpleadosList">
      <div class="col-md-12">
        <div class="card">
          <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data"
                       :columns="table1.columns" :editButton="true" :eraseButton="true"
                       :erase="borrarEmpleado" :goButton="false"
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
  import api from 'src/api/services/empleadoServices'
  import noti from 'src/api/notificationsService'
  const tableColumns = ['#', 'Nombre', 'Dni', 'Fecha nacimiento', 'Domicilio', 'Localidad']
  //  let tableData = []

  export default {
    components: {
      PaperTable
    },
    data () {
      return {
        isEmpleadosList: true,
        estados: [],
        table1: {
          title: 'Empleados',
          subTitle: 'Listado de empleados de la empresa',
          columns: [...tableColumns],
          data: []
        },
        localidades: []
      }
    },
    mounted () {
      this.getLocalidades()
      this.cargarEmpleados()
    },
    methods: {
      getLocalidades () {
        api.getLocalidad(this)
          .then(res => {
            this.localidades = res
          })
      },
      cargarLocalidades (idLocalidades) {
        for (var i = 0, len = this.localidades.length; i < len; i++) {
          if (this.localidades[i].idLocalidad === idLocalidades) {
            return this.localidades[i].nombre
          }
        }
      },
      cargarEmpleados () {
        api.getEmpleados(this).then(res => {
          res.forEach(empleado => {
            this.table1.data.push({
              '#': empleado.idEmpleados,
              nombre: empleado.nombre + ' ' + empleado.apellido,
              dni: empleado.dni,
              fechanacimiento: new Date(empleado.fechaNacimiento).toLocaleDateString('es-AR', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit'
              }),
              domicilio: empleado.domicilio,
              localidad: this.cargarLocalidades(empleado.idLocalidad)
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
      borrarEmpleado (e) {
        let id = Number(e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML)
        api.deleteEmpleado(this, id)
          .then(res => {
            if (res) {
              noti.exitoConTexto(this, 'Éxito', 'El Empleado se ha eliminado!')
            }
          })
          .catch(err => {
            console.log('error', err)
            noti.errorConTexto(this, 'Error', 'Error al eliminar Empleado')
          })
      }
    }
  }

</script>
<style>

</style>
