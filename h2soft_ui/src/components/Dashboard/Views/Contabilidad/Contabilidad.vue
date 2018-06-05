<template>
  <div class="content">
    <form name="new_dispenser_form">
      <div class="row">
        <h5 class="title">Información útil de cada cliente para realizar la facturación</h5>
        <div class="col-md-3">
          <label for="cliente"><h4><span class="label label-default">Cliente</span></h4></label>
            <dds id="cliente" v-model="idClientes"
                :options="clientes"
                options-value="idClientes"
                options-label="razonSocial"
                search-text="Buscar"
                :placeholder="'Cliente'"
                :search="true" :justified="true" style="width: 200PX;" >
            </dds>
        </div>
      </div>
      <div class="row text-line">
        <div class="col-md-3">
          <label><h4><span class="label label-default">Desde</span></h4></label>
          <dp v-model="fechaDesde" id="fechaDesde" :disabled-days-of-week=[0] :format="'dd/MM/yyyy'"  :placeholder="'Desde'" width="100%" :clear-button="true"></dp>
        </div>
        <div class="col-md-3">
          <label><h4><span class="label label-default">Hasta</span></h4></label>
          <dp v-model="fechaHasta" id="fechaHasta" :disabled-days-of-week=[0] :format="'dd/MM/yyyy'"  :placeholder="'Hasta'" width="100%" :clear-button="true"></dp>
        </div>
        <div class="col-md-3"  style="padding-top: 25px;" >
          <button type="button" class="btn btn-info btn-fill" @click="this.actualizar">Actualizar</button>
        </div>
      </div>
    </form>
   <div class="row" >
      <div class="col-md-12">
        <div class="card">
          <div class="row">
                  <div class="col-md-4 text-center">
                    <h5>Precio por unidad</h5>
                    <h4 style="margin-top: 0px;" class="">$ {{this.precioPorUnidad}} / bidón</h4>
                  </div>
                  <div class="col-md-4 text-center">
                    <h5>Cantidad vendida</h5>
                    <h4 style="margin-top: 0px;" class="">{{this.cantidad}} bidones</h4>
                  </div>
                  <div class="col-md-4 text-center">
                    <h5>Total</h5>
                    <h4 style="margin-top: 0px;" class="">$ {{this.total}}</h4>
                  </div>
          </div>
          <div class="row">
            <div class="col-md-12" style="margin-left: 20px;">
              <p class="category" v-if="superaRangos">La cantidad de bidones de 20 L vendida en el periodo seleccionado supera los rangos del contrato. Se tomará el precio del mayor rango</p>
            </div>
          </div>
          <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns" :editButton="false" :eraseButton="false" :goButton="false" >
          </paper-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import PaperTable from 'components/UIComponents/PaperTablePlusContabilidad.vue'
  import { datepicker, select } from 'vue-strap'
  import api from 'src/api/services/clientServices.js'
  import noti from 'src/api/notificationsService'

  const table1Columns = ['Objetivo', 'Fecha', 'Cantidad', 'Firmado conforme']
  export default {
    components: {
      PaperTable,
      dp: datepicker,
      dds: select
    },
    data () {
      return {
        table1: {
          title: 'Listado de ventas realizadas',
          subTitle: 'Detalle de las ventas de bidones realizadas para el cliente seleccionado',
          columns: [...table1Columns],
          data: []
        },
        precioPorUnidad: 0,
        cantidad: 0,
        total: 0,
        clientes: [],
        idClientes: 0,
        fechaDesde: '',
        fechaHasta: '',
        superaRangos: false
      }
    },
    mounted () {
      this.cargarClientes()
      const lastMonth = new Date()
      lastMonth.setMonth(lastMonth.getMonth() - 1)
      this.fechaDesde = lastMonth.toLocaleDateString('es-AR', { year: 'numeric', month: '2-digit', day: '2-digit' })
      this.fechaHasta = new Date().toLocaleDateString('es-AR', { year: 'numeric', month: '2-digit', day: '2-digit' })
    },
    watch: {
      idClientes: function () {
        this.calcularValores()
      }
    },
    methods: {
      cargarClientes () {
        api.getClientes(this).then(r => {
          this.clientes = r.body.data
        })
      },
      actualizar () {
        if (this.idClientes !== 0) {
          this.precioPorUnidad = 0
          this.cantidad = 0
          this.total = 0
          this.table1.data = []
          this.calcularValores()
        } else {
          noti.errorConTexto(this, 'Error', 'Debe seleccionar un cliente')
        }
      },
      calcularValores () {
        api.calcularVentasPorCliente(this, this.idClientes, this.fechaDesde, this.fechaHasta)
          .then(ventasXProducto => {
            if (ventasXProducto && ventasXProducto.length) {
              this.precioPorUnidad = ventasXProducto[0].precioPorUnidad
              this.cantidad = ventasXProducto[0].cantidad
              this.total = ventasXProducto[0].total
              this.table1.data = ventasXProducto[0].ventas
            } else {
              this.precioPorUnidad = 0
              this.cantidad = 0
              this.total = 0
              this.table1.data = []
            }
          })
      }
    }
  }
</script>
<style>

</style>
