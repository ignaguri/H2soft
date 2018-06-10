<template>
  <div>
    <div class="row">
      <div class="col-md-4 left">
        <div class="text-line">
          <h4>Generación del remito</h4>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 left">
        <div class="text-line">
          <h5>Objetivo: <a>{{objetivo}}</a></h5>
        </div>
      </div>
    </div>
    <div v-if="!this.edicion" class="content">
      <form name="nuevo-remito" @submit.prevent="guardarRemito">
        <div class="row">
          <div class="col-md-3 left">
            <h5>Producto</h5>
            <div class="btn-group btn-group-justified">
              <sele v-model="idProducto" :options="productos" options-value="idProductos" search-text="Buscar" placeholder="Seleccione" options-label="nombre" :multiple="false" :search="true" :justified="true" ></sele>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 col-xs-3 left">
            <fg-input type="number"
                      min="0"
                      label="Colocados"
                      placeholder="Cantidad de dejados en el cliente"
                      v-model="remito.bidonesDejo">
            </fg-input>
          </div>
          <div class="col-md-3 col-xs-3 left">
            <fg-input type="number"
                      label="Retirados"
                      placeholder="Cantidad de retirados del cliente"
                      v-model="remito.bidonesLlevo">
            </fg-input>
          </div>
          <div class="col-md-3 col-xs-3 ">
            <div class="" style="margin-top: 30px;">
              <button type="button" class="btn btn-info btn-fill btn-sm" @click="agregar">
                Agregar
              </button>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <paper-table type="hover" :title="table1.title" :data="table1.data" :columns="table1.columns" :editButton="false" :eraseButton="true" :goButton="false" :erase="borrar" >
              </paper-table>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 left">
            <h5>Dispensers colocados</h5>
            <div class="btn-group btn-group-justified">
              <sele @change="cambioDispensersColocados" :options="dispensersSinObjetivo" options-value="idDispensers" search-text="Buscar" :placeholder="this.dispensersSinObjetivo_placeholder" options-label="codigo" :multiple="true" :search="true" :justified="true" ></sele>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 left">
            <h5>Dispensers retirados</h5>
            <div class="btn-group btn-group-justified">
              <sele @change="cambioDispensersRetirados" :options="dispensersDelObjetivo" options-value="idDispensers" search-text="Buscar" :placeholder="this.dispensersDelObjetivo_placeholder" options-label="codigo" :multiple="true" name=""  :search="true" :justified="true"></sele>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 left">
            <h5>Dispensers a mantenimiento</h5>
            <div class="btn-group btn-group-justified">
              <sele :options="dispensersAMantenimiento" options-value="idDispensers" search-text="Buscar" :placeholder="this.dispensersAMantenimiento_placeholder" options-label="codigo" :multiple="true" name=""  :search="true" :justified="true"></sele>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 left">
            <h5>Firma</h5>
            <div class="text-center">
              <firma></firma>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <div class="text-center">
              <button type="submit" class="btn btn-success btn-fill btn-wd">
                Guardar
              </button>
            </div>
          </div>
        </div>
    </form>
    </div>
    <div v-if="this.edicion" class="content">
      <div class="row">
        <div class="col-md-4 left">
          <h5>Productos:</h5>
          <ul>
            <li v-for="prod in remito.productos"> {{prod.producto}}: {{prod.cantidad}} {{prod.accion }}</li>
          </ul> 
        </div>
      </div>
      <div class="row">
          <div class="col-md-4 left">
            <h5>Dispensers colocados: </h5>
            <ul>
              <li v-for="disp in remito.dispensersDejo"> {{disp}}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 left">
            <h5>Dispensers retirados: </h5>
            <ul>
              <li v-for="disp in remito.dispensersLlevo"> {{disp}}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 left">
            <h5>Dispenser a mantenimiento: </h5>
            <ul>
              <li v-for="disp in remito.dispensersMantenimiento"> {{disp}}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 left" v-if="!this.edicion">
            <h5>Firma</h5>
            <div class="left" >
              <firma></firma>
            </div>
          </div>
          <div class="col-md-3 left" v-if="this.edicion">
            <h5>Firma conforme:</h5>
            <div class="left" >
              <img :src="this.firma"/>
            </div>
          </div>
        </div>
      <div class="row">
        <div class="col-md-3">
          <div class="text-center">
            <button type="button" class="btn btn-success btn-fill btn-wd" v-if="this.$parent.verRemito" @click="showCustomModal = true">
              Anular
            </button>
          </div>
        </div>
    </div>
    </div>
    <div class="row">
      <div class="col-md-3">
        <div class="text-center">
          <button type="button" class="btn btn-fill btn-wd" v-if="this.$parent.verRemito" @click="seeDetalle">
            Volver
          </button>
        </div>
      </div>
    </div>
    <modal effect="fade" :value="showCustomModal" :backdrop="false" @ok="showCustomModal" title="Anular remito">
      <div class="row">
        <div class="col-md-12">
          <h5>¿Desea anular este remito?</h5>
        </div>
      </div>
      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-default" @click="showCustomModal = false">Cancelar</button>
        <button type="button" class="btn btn-success" @click="anular">Aceptar</button>
      </div>
    </modal>
  </div>
</template>
<script>
  import api from 'src/api/services/recorridosHistoricosServices'
  import apiDispensers from 'src/api/services/dispensersServices'
  import apiRemito from 'src/api/services/remitoServices'
  import apiMantenimiento from 'src/api/services/mantenimientoServices'
  import apiContratos from 'src/api/services/contratosServices'
  import apiProductos from 'src/api/services/productosServices'
  import PaperTable from 'components/UIComponents/PaperTablePlusRemito.vue'
  import firma from '../Firma.vue'
  import noti from 'src/api/notificationsService'
  import sele from 'vue-strap/src/Select.vue'
  import { modal } from 'vue-strap'
  import check from 'vue-strap/src/Checkbox.vue'
  const tableColumns = ['Nro', 'Producto', 'Cantidad dejada', 'Cantidad retirada']
  const dataColumns = []
  export default {
    components: {
      PaperTable,
      sele,
      firma,
      check,
      modal
    },
    data () {
      return {
        remito: {
          bidonesDejo: null,
          bidonesLlevo: null,
          productos: [],
          dispensersDejo: [],
          dispensersLlevo: [],
          dispensersMantenimiento: []
        },
        idProducto: null,
        productos: [],
        dispensers: [],
        dispensersSinObjetivo: [],
        dispensersDelObjetivo: [],
        dispensersAMantenimiento: [],
        dispensersSinObjetivo_placeholder: 'Seleccione',
        dispensersDelObjetivo_placeholder: 'Seleccione',
        dispensersAMantenimiento_placeholder: 'Ninguno',
        idObjetivo: '',
        objetivo: '',
        idRemito: 0,
        edicion: false,
        firma: '',
        showCustomModal: false,
        table1: {
          title: 'Productos colocados / retirados',
          subTitle: '',
          columns: [...tableColumns],
          data: [...dataColumns]
        }
      }
    },
    props: {
      IdDetalleRecorridoAsignado: String
    },
    mounted () {
      this.cargarProductos()
      this.cargarDetalleRecorridoHistorico()
    },
    methods: {
      cargarDetalleRecorridoHistorico () {
        api.getDetalleRecorridoAsignado(this, this.IdDetalleRecorridoAsignado)
          .then(resDet => {
            resDet = resDet.body.data[0]
            this.idRemito = resDet.idRemito
            api.getObjetivoXId(this, resDet.idObjetivo)
              .then(obj => {
                obj = obj.body.data[0]
                this.idObjetivo = resDet.idObjetivo
                this.objetivo = obj.nombre
              })
            this.cargarDispensers(resDet.idObjetivo)
            if (this.idRemito !== null) {
              // Cargo en cada componente el valor del remito ya cargado
              this.edicion = true
              this.cargarRemitoCreado()
            }
          }, error => {
            console.log('error al cargar los recorridos asignados ' + error)
          })
      },
      cargarRemitoCreado () {
        // Busco la firma del remito
        apiRemito.getRemito(this, this.idRemito)
          .then(res => {
            res = res.body.data[0]
            this.firma = res.firma
            // Busco la info de los bidones dejados y llevados
            apiRemito.getDetalleRemitoProducto(this, this.idRemito)
              .then(res => {
                res = res.body.data
                res.forEach(d => {
                  apiProductos.getProductoXId(this, d.idProducto)
                  .then(p => {
                    p = p[0]
                    let detalle = {
                      'producto': p.nombre,
                      'cantidad': d.cantidad,
                      'accion': d.dejadoEnCliente ? 'dejados' : 'retirados'
                    }
                    this.remito.productos.push(detalle)
                  })
                })
              })
            // Busco la info de los dispensers dejados y llevados
            apiRemito.getDetalleRemitoDispensers(this, this.idRemito)
              .then(res => {
                res = res.body.data
                let dispenserCodigo = ''
                let huboDispensersLlevados = false // variable de control utilizada luego para mostrar "No hubo"
                let huboDispensersDejados = false // variable de control utilizada luego para mostrar "No hubo"
                let huboDispensersMantenimiento = false // variable de control utilizada luego para mostrar "No hubo"
                if (res !== null) {
                  res.forEach(r => {
                    if (r.dejadoEnCliente === 0) {
                      dispenserCodigo = this.dispensers.filter(x => { return x.idDispensers === r.idDispenser })
                      huboDispensersLlevados = true
                      this.remito.dispensersLlevo.push(dispenserCodigo[0].codigo)
                      if (r.requiereMantenimiento === 1) {
                        this.remito.dispensersMantenimiento.push(dispenserCodigo[0].codigo)
                        huboDispensersMantenimiento = true
                      }
                    }
                    if (r.dejadoEnCliente === 1) {
                      dispenserCodigo = this.dispensers.filter(x => { return x.idDispensers === r.idDispenser })
                      huboDispensersDejados = true
                      this.remito.dispensersDejo.push(dispenserCodigo[0].codigo)
                    }
                    dispenserCodigo = '' // limpio la variable aux para el proximo ciclo del FOR
                  })
                  if (huboDispensersLlevados === false) {
                    this.remito.dispensersLlevo.push('No hubo')
                  }
                  if (huboDispensersDejados === false) {
                    this.remito.dispensersDejo.push('No hubo')
                  }
                  if (huboDispensersMantenimiento === false) {
                    this.remito.dispensersMantenimiento.push('No hubo')
                  }
                  // this.dispensersDelObjetivo = res.filter(x => { return x.dejadoEnCliente === 0 })
                }
              })
          })
      },
      guardarRemito () {
        if (this.table1.data.length === 0) {
          noti.infoConTexto(this, 'Alerta', 'Debe indicar algún movimiento de productos')
        } else if (this.firma === '') {
          noti.infoConTexto(this, 'Alerta', 'Debe firmar el remito')
        } else {
          // guardar Remito
          var idEmpleado = JSON.parse(sessionStorage.getItem('user')).idEmpleado
          var remito = {
            'fecha': Date.now(),
            'idEmpleado': idEmpleado,
            'firma': this.firma,
            'firmaConforme': true,
            'idObjetivo': this.idObjetivo,
            'idEstadoRemito': 1 // creado
          }
          apiRemito.nuevoRemito(this, remito)
          .then(rem => {
            // actualizo el detalle del recorrido historico
            var detalle = {
              'idDetalleRecorridoHistorico': this.IdDetalleRecorridoAsignado,
              'idRemito': rem.idRemito,
              'entregado': true
            }
            api.editarDetalleRecorridoHistorico(this, detalle)
            // inserto el detalle del remito para los productos que me llevo
            this.table1.data.forEach(r => {
              let detalleRemito = {
                'idRemito': rem.idRemito,
                'idProducto': r.nro, // producto
                'dejadoEnCliente': false,
                'cantidad': r.cantidadretirada
              }
              apiRemito.nuevoDetalleRemitoProducto(this, detalleRemito)
              // inserto el detalle del remito para losproductos que dejo
              detalleRemito.dejadoEnCliente = true
              detalleRemito.cantidad = r.cantidaddejada
              apiRemito.nuevoDetalleRemitoProducto(this, detalleRemito)
            })
            // acualizo los dispensers e inserto el detalle del remito para los dispensers
            // Guardo los dispensers dejados en el cliente
            this.dispensersColocados.forEach(disC => {
              let detalleRemitoDispensersDejados = {
                'idRemito': rem.idRemito,
                'idDispenser': disC,
                'dejadoEnCliente': true
              }
              apiRemito.nuevoDetalleRemitoDispensers(this, detalleRemitoDispensersDejados)
              apiDispensers.setObjetivoADispenser(this, disC, this.idObjetivo)
            })
            // Guardo los dispensers retirados del cliente
            const idDispensersAMantenimiento = this.dispensersAMantenimiento.map(x => x.idDispensers)
            this.dispensersRetirados.forEach(disR => {
              let detalleRemitoDispensersLlevado = {
                'idRemito': rem.idRemito,
                'idDispenser': disR,
                'dejadoEnCliente': false,
                'requiereMantenimiento': null
              }
              let dispenser = {
                'id': disR,
                'idObjetivo': null,
                'idEstadoDispenser': null // estado limpio y en fabrica
              }
              // Guardo los mantenimientos de dispensers
              if (idDispensersAMantenimiento.includes(disR)) {
                dispenser.idEstadoDispenser = 4 // a mantenimiento
                detalleRemitoDispensersLlevado.requiereMantenimiento = true
                apiDispensers.editDispenser(this, dispenser)
                let mantenimiento = {
                  'idObjetivo': this.idObjetivo,
                  'idDispenser': disR,
                  'idEstadoMantenimiento': 1, // se crea en estado Pendiente
                  'idTipoMantenimiento': 1, // por defecto, se crea de tipo Preventivo
                  'idRemito': rem.idRemito
                }
                apiMantenimiento.nuevoMantenimiento(this, mantenimiento)
                apiRemito.nuevoDetalleRemitoDispensers(this, detalleRemitoDispensersLlevado)
              } else {
                dispenser.idEstadoDispenser = 1 // a mantenimiento
                detalleRemitoDispensersLlevado.requiereMantenimiento = false
                apiDispensers.editDispenser(this, dispenser)
                apiRemito.nuevoDetalleRemitoDispensers(this, detalleRemitoDispensersLlevado)
              }
            })
            // muestro la notificacion de ok
            noti.exitoConTexto(this, 'Éxito', 'Remito guardado con éxito!')
            // vuelvo atrás
            this.$parent.current = 'DetalleRecorrido'
            this.$parent.verRemito = false
            this.$parent.verDetalle = true
          })
        }
      },
      anular () {
        api.getDetalleRecorridosAsignadosXRemito(this, this.idRemito)
        .then(det => {
          // edito los dispensers
          const detalleRecorrido = {
            'idDetalleRecorridoHistorico': det.idDetalleRecorridoHistorico,
            'entregado': 0,
            'idRemito': null
          }
          api.editarDetalleRecorridoHistorico(this, detalleRecorrido)
          .then(detrec => {
            apiRemito.getDetalleRemitoDispensers(this, this.idRemito)
            .then(detDips => {
              detDips = detDips.body.data
              detDips.forEach(d => {
                let dispenser = {
                  'id': d.idDispenser,
                  'idObjetivo': null,
                  'idEstadoDispenser': 1
                }
                if (d.dejadoEnCliente === 0) {
                  dispenser.idObjetivo = det.idObjetivo
                  dispenser.idEstadoDispenser = 2
                }
                apiDispensers.editDispenser(this, dispenser)
              })
            })
          })
          // borro los mantenimientos
          apiMantenimiento.deleteMantenimientoXRemito(this, this.idRemito)
          .then(mant => {
            // borro el remito completo
            apiRemito.deleteRemito(this, this.idRemito)
            .then(disp => {
              noti.exitoConTexto(this, 'Exito', 'El remito ha sido anulado')
              this.showCustomModal = false
              this.$parent.current = 'DetalleRecorrido'
              this.$parent.verRemito = false
              this.$parent.verDetalle = true
            })
          })
        })
      },
      cargarDispensers (idObjetivo) {
        apiDispensers.getDispensers(this)
          .then(res => {
            this.dispensers = res
            if (res.filter(x => { return x.idObjetivo === idObjetivo }).length > 0) {
              this.dispensersDelObjetivo = res.filter(x => { return x.idObjetivo === idObjetivo })
              this.dispensersDelObjetivo_placeholder = 'Seleccione'
            } else {
              this.dispensersDelObjetivo_placeholder = 'Ninguno'
            }
            if (res.filter(x => { return x.idEstadoDispenser === 1 }).length > 0) {
              this.dispensersSinObjetivo = res.filter(x => { return x.idEstadoDispenser === 1 })
              this.dispensersSinObjetivo_placeholder = 'Seleccione'
            } else {
              this.dispensersSinObjetivo_placeholder = 'Ninguno'
            }
          })
      },
      cargarProductos () {
        apiContratos.getProductosContratos(this)
        .then(res => {
          this.productos = res
        })
      },
      verdetalle () {
        noti.exitoConTexto(this, 'Éxito', 'Ver!')
      },
      recorridoCambioEstado () {
        this.txBtIniciarFinalizar = 'Finalizar'
        this.estado = 'En proceso'
      },
      seeDetalle () {
        this.$parent.objetivoId = 0
        this.$parent.verRemito = false
        this.$parent.verDetalle = true
      },
      cambioDispensersColocados (value) {
        this.dispensersColocados = value
      },
      cambioDispensersRetirados (value) {
        this.dispensersRetirados = value
        let i
        this.dispensersAMantenimiento = []
        for (i = 0; i < value.length; i++) {
          this.dispensersAMantenimiento.push(this.dispensersDelObjetivo.filter(x => { return x.idDispensers === value[i] })[0])
        }
      },
      agregar () {
        const existe = this.table1.data.find(x => { return x.nro === this.idProducto })
        if (this.idProducto === null) {
          noti.infoConTexto(this, 'Alerta', 'Debe seleccionar un producto')
        } else if (this.remito.bidonesDejo === null || this.remito.bidonesLlevo === null) {
          noti.infoConTexto(this, 'Alerta', 'Debe ingresar las cantidades que deja y retira')
        } else if (existe !== undefined) {
          noti.infoConTexto(this, 'Alerta', 'El producto seleccionado ya se cargó')
        } else {
          const prod = this.productos.find(p => { return p.idProductos === this.idProducto })
          const prodSeleccionado = {
            'nro': prod.idProductos,
            'producto': prod.nombre,
            'cantidaddejada': this.remito.bidonesDejo,
            'cantidadretirada': this.remito.bidonesLlevo
          }
          this.table1.data.push(prodSeleccionado)
          this.idProducto = null
          this.remito.bidonesDejo = null
          this.remito.bidonesLlevo = null
        }
      },
      borrar (e) {
        let id = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        this.table1.data = this.table1.data.filter(x => { return x.nro.toString() !== id })
      }
    }
  }
</script>
