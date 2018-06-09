<template>
  <div>
    <div class="col-md-12">
      <div class="card">
        <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data"
                     :columns="table1.columns" :editButton="true" :edit="editarIngresoEgreso" :eraseButton="true"
                     :erase="borrarIngresoEgreso" :goButton="true" :go="verImagenComprobante">
        </paper-table>
      </div>
      <div class="row">
          <div class="text-center">
            <button type="button" class="btn btn-info btn-fill btn-wd" @click="descargar">Exportar</button>
          </div>
      </div>
      <modal effect="fade" width="50%" height="50%" :value="showCustomModal" title="Comprobante">
        <div class="row">
          <div class="col-md-12">
            <img class="img-responsive" v-bind:src="this.modalData.imagen" width="100%" height="100%"/>
          </div>
        </div>
        <div slot="modal-footer" class="modal-footer">
          <button type="button" class="btn btn-default" @click="showCustomModal = false">Salir</button>
        </div>
      </modal>
    </div>
  </div>
</template>
<script>
  import PaperTable from 'components/UIComponents/PaperTablePlus.vue'
  import apiIE from 'src/api/services/ingresosEgresosServices'
  import apiEmpleados from 'src/api/services/listadoRemitoServices'
  import apiMedios from 'src/api/services/medioDePagoCobroService'
  import noti from 'src/api/notificationsService'
  import apiExport from 'src/api/export'
  import { modal } from 'vue-strap'

  const tableColumns = ['Id', 'Fecha', 'Empleado', 'Importe', 'Medio depago', 'Descripcion']

  export default{
    // TODO: hacer que el ID del empleado se tome solo de la sesion
    // TODO: mover todos las fnc que cargan los datos de otras tablas a una misma funcion.
    components: {
      PaperTable,
      modal
    },
    data () {
      return {
        table1: {
          title: 'Ingresos/Egresos',
          subTitle: 'Listado de todas las transacciones de dinero realizadas',
          columns: [...tableColumns],
          data: []
        },
        empleados: [],
        tipoDePago: [],
        modalData: {
          imagen: ''
        },
        showCustomModal: false,
        exportData: []
      }
    },
    props: {
      verImagen: false,
      imagen: ''
    },
    mounted () {
      this.getEmpleadoss()
      this.getMedioDePagoCobro()
      this.cargarIngresosEgresos()
    },
    methods: {
      cargarIngresosEgresos () {
        this.table1.data = []
        this.exportData = []
        apiIE.getIngresoEgresoSinImagenPorUsuario(this).then(res => {
          res.body.data.forEach(ingreEgre => {
            const ie = {
              id: ingreEgre.idGastos,
              fecha: new Date(ingreEgre.fecha).toLocaleDateString('es-AR', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit'
              }),
              empleado: this.cargarEmpleado(ingreEgre.idEmpleado),
              importe: '$ ' + ingreEgre.monto,
              mediodepago: this.cargarMeidoDePagoCobro(ingreEgre.idMedioDePagoCobro),
              descripcion: ingreEgre.descripcion
            }
            this.table1.data.push(ie)
            this.exportData.push([ie.id, ie.fecha, ie.empleado, ie.importe, ie.mediodepago, ie.descripcion])
          })
        })
        .catch(error => {
          console.log('error' + JSON.stringify(error))
        })
      },
      getEmpleadoss () {
        apiEmpleados.getEmpleados(this)
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
      getMedioDePagoCobro () {
        apiMedios.getMedioDePagoCobro(this)
          .then(tipo => {
            this.tipoDePago = tipo
          })
      },
      cargarMeidoDePagoCobro  (idMedioDePago) {
        for (var i = 0, len = this.tipoDePago.length; i < len; i++) {
          if (this.tipoDePago[i].idMediosDePagoCobro === idMedioDePago) {
            return this.tipoDePago[i].nombre
          }
        }
      },
      borrarIngresoEgreso (e) {
        let id = Number(e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML)
        apiIE.deleteIngresoEgreso(this, id)
          .then(res => {
            if (res) {
              noti.exitoConTexto(this, 'Éxito', 'El Ingreso/Egreso se ha eliminado!')
            }
          })
          .catch(err => {
            console.log('errorrrrrr', err)
            noti.errorConTexto(this, 'Error', 'Error al eliminar Ingreso/Egreso')
          })
      },
      editarIngresoEgreso (e) {
        let id = Number(e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML)
        this.$parent.idIngresoEgreso = id
        this.$parent.isIngresoEgresoList = false
        this.$parent.edit = true
        this.$parent.cambImagen = false
        this.$emit('emmited', {action: 'edit2'})
      },
      verImagenComprobante (e) {
        let id = Number(e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML)
        apiIE.getIngresoEgreso2(this, id).then(res => {
          this.modalData.imagen = res.imagen
        })
        this.showCustomModal = true
      },
      descargar () {
        const today = new Date().toLocaleDateString('es-AR', {year: '2-digit', month: '2-digit', day: '2-digit'})
        const title = `Resumen de Ingresos y Egresos al día ${today}`
        const columns = ['Id', 'Fecha', 'Empleado', 'Importe', 'Medio de Pago', 'Descripción']
        // Acá se suman todos los importes, que estan en la posición 3 del arreglo por cada ingreso/egreso
        const total = this.exportData.reduce((a, b) => a + b[3], 0)
        const columnaTotal = ['Total', null, null, total]
        apiExport.exportToExcel(title, columns, this.exportData, columnaTotal)
      }
    }
  }

</script>
<style>

</style>
