<template>
  <div class="content">
      <div class="row">
        <h5 style="margin-left: 15px;">Información útil de cada cliente para realizar la facturación</h5>
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
        <div class="col-md-4">
          <slot name="label"><label class="control-label">Facturación</label></slot>
          <dds id="estado" v-model="idEstadoFacturacion"
              :options="estadosFacturacion"
              options-value="idEstado"
              options-label="nombre"
              :placeholder="'Estado de facturación'"
              :search="false" :justified="true" style="width: 200PX;" >
          </dds>
        </div>
        <div class="col-md-2" >
          <button type="button" class="btn btn-info btn-fill" @click="this.actualizar">Actualizar</button>
        </div>
      </div>
      </br>
    
    <div class="row" >
      <div class="col-md-12">
        <div class="card">
          <pt type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns" :editButton="false" :eraseButton="false" :goButton="false" >
          </pt>
          <div class="row" >
            <div class="col-md-9">
              <p class="category" v-if="superaRangos">La cantidad vendida en el periodo seleccionado supera los rangos del contrato. Se considera el precio del mayor rango</p>
            </div>
            <div class="col-md-3">
              <div class="text-left">
                <h4>TOTAL ${{this.total}}</h4>
              </div>
            </div>
            </div>
        </div>
      </div>
    </div>
    <div class="row" >
      <div class="col-md-12">
        <div class="card">
          <ptv type="hover" :title="table2.title" :sub-title="table2.subTitle" :data="table2.data" :columns="table2.columns" :editButton="false" :eraseButton="false" :goButton="false" >
          </ptv>
        </div>
      </div>
    </div>
    <div class="col-md-2" >
      <button type="button" class="btn btn-info btn-fill" @click="descargar">Exportar</button>
    </div>
  </div>
</template>
<script>
  import PaperTable from 'components/UIComponents/PaperTablePlusContabilidad.vue'
  import PaperTableVentas from 'components/Dashboard/Views/Contabilidad/PaperTablePlusVentas.vue'
  import { datepicker, select } from 'vue-strap'
  import api from 'src/api/services/clientServices.js'
  import apiProducto from 'src/api/services/productosServices.js'
  import apiExport from 'src/api/export'
  import noti from 'src/api/notificationsService'

  const table1Columns = ['Producto', 'Cantidad vendida', 'Precio por unidad', 'Subtotal']
  const table2Columns = ['Fecha', 'Objetivo', 'Producto', 'Cantidad vendida', 'Firmado conforme']
  export default {
    components: {
      pt: PaperTable,
      ptv: PaperTableVentas,
      dp: datepicker,
      dds: select
    },
    data () {
      return {
        table1: {
          title: 'Ventas al cliente por producto',
          subTitle: 'Cantidad de productos vendidos al cliente y su precio según el contrato actual',
          columns: [...table1Columns],
          data: []
        },
        table2: {
          title: 'Detalle de ventas realizadas',
          subTitle: 'Listado de las ventas realizadas al cliente por fecha y objetivo',
          columns: [...table2Columns],
          data: []
        },
        precioPorUnidad: 0,
        cantidad: 0,
        total: 0,
        clientes: [],
        idClientes: 0,
        fechaDesde: '',
        fechaHasta: '',
        superaRangos: false,
        exportData: {
          remitos: [],
          totales: []
        },
        estadosFacturacion: [
          {
            idEstado: 0,
            nombre: 'Todos'
          }, {
            idEstado: 1,
            nombre: 'Solo sin facturar'
          }, {
            idEstado: 3,
            nombre: 'Solo facturados'
          }
        ],
        idEstadoFacturacion: 0
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
          this.total = 0
          this.calcularValores()
        } else {
          noti.errorConTexto(this, 'Error', 'Debe seleccionar un cliente')
        }
      },
      calcularValores () {
        this.table1.data = []
        this.table2.data = []
        this.exportData.remitos = []
        this.exportData.totales = []
        api.calcularVentasPorCliente(this, this.idClientes, this.fechaDesde, this.fechaHasta, this.idEstadoFacturacion)
          .then(ventasXProducto => {
            console.log(ventasXProducto)
            if (ventasXProducto && ventasXProducto.length) {
              ventasXProducto.forEach(vxp => {
                apiProducto.getProductoXId(this, vxp.idProducto)
                .then(p => {
                  p = p[0]
                  let venta = {
                    'producto': p.nombre,
                    'precioporunidad': '$ ' + vxp.precioPorUnidad,
                    'cantidadvendida': vxp.cantidad,
                    'subtotal': '$ ' + vxp.total
                  }
                  this.total = this.total + vxp.total
                  this.table1.data.push(venta)
                  this.exportData.totales.push([venta.producto, venta.cantidadvendida, venta.precioporunidad, venta.subtotal])
                  vxp.ventas.forEach(v => {
                    let detalleVenta = {
                      'fecha': v.fecha,
                      'objetivo': v.objetivo,
                      'producto': p.nombre,
                      'cantidadvendida': v.cantidad,
                      'firmadoconforme': 'Si',
                      'facturado': v.idEstadoRemito === 3
                    }
                    this.table2.data.push(detalleVenta)
                    this.table2.data.sort((a, b) => a.fecha - b.fecha) // a medida que voy insertando, voy ordenando
                    this.exportData.remitos.push([detalleVenta.fecha, detalleVenta.objetivo, detalleVenta.producto, detalleVenta.cantidadvendida, v.idEstadoRemito === 3 ? 'Facturado' : 'No facturado'])
                  })
                })
              })
            } else {
              noti.infoConTexto(this, 'Indo', 'No se han obtenido datos para mostrar.')
              this.total = 0
              this.table1.data = []
              this.table2.data = []
              this.exportData.remitos = []
              this.exportData.totales = []
            }
          }, error => {
            noti.errorConTexto(this, error.name, error.message)
            // console.log('error ' + JSON.stringify(error))
          })
      },
      descargar () {
        if (this.idClientes !== 0) {
          const cliente = this.clientes.find(c => { return c.idClientes === this.idClientes }).razonSocial
          const fechas = this.fechaDesde + ' y ' + this.fechaHasta
          let datos = []
          const title = `Ventas realizadas a ${cliente} entre ${fechas}`
          const columns = ['Fecha', 'Objetivo', 'Producto', 'Cantidad']
          this.exportData.remitos.push([null, null, null, null]) // agrego una linea en blanco
          this.exportData.remitos.push(['Totales por producto'])
          this.exportData.remitos.push(['Producto', 'Cantidad Vendida', '$/unidad', 'Subtotal'])
          datos = this.exportData.remitos.concat(this.exportData.totales)
          const columnaTotal = [null, null, 'Total', '$ ' + this.total]
          apiExport.exportToExcel(title, columns, datos, columnaTotal)
        } else {
          noti.errorConTexto(this, 'Error', 'Debe seleccionar un cliente')
        }
      }
    }
  }
</script>
<style>

</style>
