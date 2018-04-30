<template>
  <div>
    <div class="col-md-12">
      <div class="card">
        <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns" :editButton="true" :edit="editarIngresoEgreso" :eraseButton="true" :erase="borrarIngresoEgreso" :goButton="true"  :go="verImagenComprobante" >
        </paper-table>
      </div>
      <modal effect="fade" width="50%" :value="showCustomModal" title="Comprobante">
         <div class="row">
           <div class="col-md-12">
             <img v-bind:src="this.modalData.imagen" width="100%"/>
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
  import { modal } from 'vue-strap'

  const tableColumns = ['Id', 'Fecha', 'Empleado', 'Monto', 'MediodePago', 'Descripcion']

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
          subTitle: 'Listado de Ingresos/Egresos',
          columns: [...tableColumns],
          data: []
        },
        empleados: [],
        tipoDePago: [],
        modalData: {
          imagen: ''
        },
        showCustomModal: false
      }
    },
    props: {
      verImagen: false,
      imagen: ''
    },
    mounted () {
      this.cargarIngresosEgresos()
      this.getEmpleadoss()
      this.getMedioDePagoCobro()
    },
    methods: {
      cargarIngresosEgresos () {
        apiIE.getIngresoEgreso(this).then(res => {
          res.body.data.forEach(ingreEgre => {
            this.table1.data.push({
              id: ingreEgre.idGastos,
              fecha: new Date(ingreEgre.fecha).toLocaleDateString(),
              empleado: this.cargarEmpleado(ingreEgre.idEmpleado),
              monto: ingreEgre.monto,
              mediodepago: this.cargarMeidoDePagoCobro(ingreEgre.idMedioDePagoCobro),
              descripcion: ingreEgre.descripcion
            })
          })
        }, error => {
          console.log('error' + JSON.stringify(error))
        }
      )
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
            this.tipoDePago = tipo.body.data
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
        alert('Ingreso/Egreso eliminado:' + id)
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
        }
       )
        this.showCustomModal = true
      }
    }
  }

</script>
<style>

</style>
