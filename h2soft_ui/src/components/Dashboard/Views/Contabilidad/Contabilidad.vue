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
          <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns" :editButton="false" :eraseButton="false" :goButton="false" >
          </paper-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import PaperTable from 'components/Dashboard/Views/Contabilidad/PaperTablePlusContabilidad.vue'
  import { datepicker } from 'vue-strap'
  import dds from 'vue-strap/src/Select.vue'
  import api from 'src/api/services/clientServices.js'
  import apiRemito from 'src/api/services/remitoServices.js'
  import noti from 'src/api/notificationsService'
  // import apiDispensers from 'src/api/services/dispensersServices.js'
  // import apiContratos from 'src/api/services/contratosServices.js'

  const table1Columns = ['Objetivo', 'Fecha', 'Cantidad', 'Firmado conforme']
  export default {
    components: {
      PaperTable,
      dp: datepicker,
      dds
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
        desde: null,
        hasta: null
      }
    },
    mounted () {
      this.cargarClientes()
      this.desde = new Date()
      this.desde.setMonth(this.desde.getMonth() - 1)
      this.hasta = new Date()
      this.fechaDesde = this.desde.toLocaleDateString('es-AR', { year: '2-digit', month: '2-digit', day: '2-digit' })
      this.fechaHasta = this.hasta.toLocaleDateString('es-AR', { year: '2-digit', month: '2-digit', day: '2-digit' })
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
          let dsd = this.fechaDesde.split('/')
          let hst = this.fechaHasta.split('/')
          this.desde = new Date(dsd[2], dsd[1] - 1, dsd[0])
          this.hasta = new Date(hst[2], hst[1] - 1, hst[0])
          this.hasta.setHours(23, 59, 59) // seteo las 23:59 para incluir el último dia seleccionado
          this.calcularValores()
        } else {
          noti.infoConTexto(this, 'Alerta', 'Debe seleccionar un cliente')
        }
      },
      calcularValores () {
        api.getClienteConContrato(this, this.idClientes)
          .then(res => {
            this.objetivos = res['objetivos']
            this.contrato = res['contrato']
            this.detalleContrato = res['detalle']
            this.calcularCantidad()
            .then(r => {
              if (r) {
                this.calcularVenta()
              }
            })
          })
      },
      calcularCantidad () {
        return new Promise((resolve, reject) => {
          this.objetivos.forEach((obj, i) => {
            apiRemito.getRemitoXObjetivo(this, obj.idObjetivosXCliente)
              .then(rems => {
                rems.forEach(rem => {
                  let f = new Date(rem.fecha)
                  if (f < this.hasta && f > this.desde) {
                    apiRemito.getDetalleRemitoProducto(this, rem.idRemito)
                    .then(dets => {
                      dets = dets.body.data
                      dets.forEach(det => {
                        if (det.dejadoEnCliente === 1) {
                          this.cantidad = this.cantidad + det.cantidad
                          let venta = {
                            objetivo: obj.nombre,
                            fecha: rem.fecha === null ? '-' : new Date(rem.fecha).toLocaleDateString('es-AR', { year: '2-digit', month: '2-digit', day: '2-digit' }),
                            cantidad: det.cantidad,
                            firmadoconforme: rem.firmaConforme === 1 ? 'Si' : 'No'
                          }
                          this.table1.data.push(venta)
                        }
                        if (this.objetivos.length - 1 === i) { // al finalizar el for devuelvo el valor de la promise
                          resolve(true)
                        }
                      })
                    })
                  }
                })
              })
          })
        })
      },
      calcularVenta () {
        this.detalleContrato.forEach(det => {
          if (det.cantidadMinima <= this.cantidad && this.cantidad <= det.cantidadMaxima) {
            this.precioPorUnidad = det.precioPorUnidad
            this.total = this.cantidad * this.precioPorUnidad
          }
        })
      }
    }
  }

</script>
<style>

</style>
