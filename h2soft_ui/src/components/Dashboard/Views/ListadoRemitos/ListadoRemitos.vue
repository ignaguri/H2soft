<template>
  <div class="content">
    <div class="row">
      <div class="col-md-3">
        <!--<label for="cliente"><h4><span class="label label-default">Cliente</span></h4></label>-->
        <slot name="label"><label class="control-label">Cliente</label></slot>
          <dds id="cliente" v-model="idClientes"
              :options="clientes"
              options-value="idClientes"
              options-label="razonSocial"
              search-text="Buscar"
              :placeholder="'Seleccione un cliente'"
              :search="true" :justified="true" style="width: 200PX;" >
          </dds>
      </div>
    </div>
    </br>
    <div class="row text-line">
      <div class="col-md-3">
        <!--<label><h4><span class="label label-default">Desde</span></h4></label>-->
        <slot name="label"><label class="control-label">Desde</label></slot>
        <dp v-model="fechaDesde" id="fechaDesde" :disabled-days-of-week=[0] :format="'dd/MM/yyyy'"  :placeholder="'Desde'" width="100%" :clear-button="true"></dp>
      </div>
      <div class="col-md-3">
        <!--<label><h4><span class="label label-default">Hasta</span></h4></label>-->
        <slot name="label"><label class="control-label">Hasta</label></slot>
        <dp v-model="fechaHasta" id="fechaHasta" :disabled-days-of-week=[0] :format="'dd/MM/yyyy'"  :placeholder="'Hasta'" width="100%" :clear-button="true"></dp>
      </div>
      <div class="col-md-3" >
        <button type="button" class="btn btn-info btn-fill" @click="this.actualizar">Actualizar</button>
      </div>
    </div>
    </br>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns" :goButton="true"  :editButton="false" :eraseButton="false" :go="editar" >
          </paper-table>
        </div>
      </div>
    </div>  
    <div class="row">
      <div class="col-md-12">
        <div class="text-center">
          <button type="button" class="btn btn-info btn-fill btn-wd" @click="facturar" >
            Marcar como facturados
          </button>
        </div>
      </div>
    </div>
  </div>  
</template>
<script>
//  import auth from 'src/api/auth'
  import api from 'src/api/services/listadoRemitoServices'
  import apiClientes from 'src/api/services/clientServices.js'
  import apiRemitos from 'src/api/services/remitoServices'
  import apiObjetivos from 'src/api/services/objetivoServices'
  import PaperTable from 'src/components/Dashboard/Views/ListadoRemitos//PaperTablePlusRemitos.vue'
  import noti from 'src/api/notificationsService'
  import { datepicker, select } from 'vue-strap'
  const tableColumns = ['#', 'Fecha', 'Objetivo', 'Empleado']
  const dataColumns = []

  export default {
    components: {
      PaperTable,
      dp: datepicker,
      dds: select
    },
    data () {
      return {
        table1: {
          title: 'Remitos',
          subTitle: 'Listado de remitos del cliente seleccionado',
          columns: [...tableColumns],
          data: [...dataColumns]
        },
        clientes: [],
        idClientes: 0,
        empleados: [],
        objetivos: [],
        seleccionados: [],
        fechaDesde: '',
        fechaHasta: ''
      }
    },
    mounted () {
      this.cargarClientes()
      this.getEmpleados()
      this.getObjetivo()
      const lastMonth = new Date()
      lastMonth.setMonth(lastMonth.getMonth() - 1)
      this.fechaDesde = lastMonth.toLocaleDateString('es-AR', { year: 'numeric', month: '2-digit', day: '2-digit' })
      this.fechaHasta = new Date().toLocaleDateString('es-AR', { year: 'numeric', month: '2-digit', day: '2-digit' })
      // this.cargarRemitos()
    },
    watch: {
      idClientes: function () {
        this.table1.data = []
        this.cargarRemitos()
      }
    },
    methods: {
      cargarClientes () {
        apiClientes.getClientes(this).then(r => {
          this.clientes = r.body.data
        })
      },
      cargarRemitos () {
        apiRemitos.getRemitosXclienteYfechas(this, this.idClientes, this.fechaDesde, this.fechaHasta)
          .then(resUs => {
            console.log('remitos', resUs)
            resUs.forEach(rem => {
              let r = {
                '#': rem.idRemito,
                'fecha': new Date(rem.fecha).toLocaleDateString('es-AR', { year: '2-digit', month: '2-digit', day: '2-digit' }),
                'objetivo': this.cargarObjetivo(rem.idObjetivo),
                'empleado': this.cargarEmpleado(rem.idEmpleado),
                'facturado': rem.idEstadoRemito === 3,
                'facturar': rem.idEstadoRemito === 3
              }
              this.table1.data.push(r)
            })
          }, error => {
            console.log('error al cargar los remitos ' + error)
          })
      },
      actualizar () {
        if (this.idClientes !== 0) {
          this.table1.data = []
          this.cargarRemitos()
        } else {
          noti.errorConTexto(this, 'Error', 'Debe seleccionar un cliente')
        }
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
      },
      editar (e) {
        let id = Number(e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML)
        // this.$emit('emitted', {action: 'edit', client: id})
        this.$parent.isRemitosList = false
        this.$parent.idRemito = id
      },
      facturar () {
        if (this.seleccionados.length > 0) {
          let promesas = []
          this.seleccionados.forEach(r => {
            let remito = {
              idRemito: r,
              idEstadoRemito: 3 // cambio a estado facturado
            }
            promesas.push(
              apiRemitos.editRemito(this, remito)
            )
          })
          return Promise.all(promesas)
          .then(res => {
            if (res) {
              this.table1.data = []
              this.seleccionados = []
              this.cargarRemitos()
              noti.exitoConTexto(this, 'Éxito', 'Remitos facturados')
            } else {
              noti.errorConTexto(this, 'Error', 'Error al marcar los remitos')
            }
          })
        } else {
          noti.infoConTexto(this, 'Atención', 'Debes seleccionar algún remito para marcarlo como facturado')
        }
      }
    }
  }
</script>
<style>

</style>
