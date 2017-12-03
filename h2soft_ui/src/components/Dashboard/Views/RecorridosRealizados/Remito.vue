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
    <div class="content">
      <form name="nuevo-remito" @submit.prevent="guardarRemito">
    <div class="row">
      <div class="col-md-4 left">
        <h5>Bidones</h5>
      </div>
      <div class="col-md-4 left">
        <fg-input type="number"
                  min="0"
                  label="Dejados llenos"
                  placeholder="Cantidad de llenos"
                  v-model="remito.bidonesDejo"
                  required>
        </fg-input>
      </div>
      <div class="col-md-4 left">
        <fg-input type="number"
                  label="Retirados vacios"
                  placeholder="Cantidad de vacios"
                  v-model="remito.bidonesLlevo"
                  required>
        </fg-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 left">
        <h5>Dispenser colocados</h5>
        <div class="btn-group btn-group-justified">
          <sele @change="cambioDispensersColocados" :options="dispensers" options-value="idDispensers" search-text="Buscar" placeholder="Seleccione" options-label="codigo" :multiple="true" :search="true" :justified="true"></sele>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 left">
        <h5>Dispenser retirados</h5>
        <div class="btn-group btn-group-justified">
          <sele @change="cambioDispensersRetirados" :options="dispensersDelObjetivo" options-value="idDispensers" search-text="Buscar" placeholder="Seleccione" options-label="codigo" :multiple="true" name=""  :search="true" :justified="true"></sele>
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
    <div class="row">
      <div class="col-md-3">
        <div class="text-center">
          <button type="button" class="btn btn-fill btn-wd" v-if="this.$parent.verRemito" @click="seeDetalle">
            Volver
          </button>
        </div>
      </div>
    </div>
    </form>
    </div>
  </div>
</template>
<script>
  import api from 'src/api/services/recorridosHistoricosServices'
  import apiDispensers from 'src/api/services/dispensersServices'
  import apiRemito from 'src/api/services/remitoServices'
  import PaperTable from 'components/UIComponents/TablaRecorridos.vue'
  // import firma from 'components/Dashboard/Views/Firma.vue'
  import firma from '../Firma.vue'
  import noti from 'src/api/notificationsService'
  import sele from 'vue-strap/src/Select.vue'
  const tableColumns = ['Nro', 'Orden', 'Objetivo']
  const dataColumns = []
  export default {
    components: {
      PaperTable,
      sele,
      firma
    },
    data () {
      return {
        remito: {
          bidonesDejo: '',
          bidonesLlevo: null
        },
        dispensers: [],
        dispensersDelObjetivo: [],
        idObjetivo: '',
        objetivo: '',
        idRemito: 0,
        edicion: false,
        firma: '',
        table1: {
          title: 'Objetivos del recorrido',
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
            this.cargarDispensers()
            this.cargarDispensersDelObjetivo(resDet.idObjetivo)
//            if (this.idRemito !== 0) {
//              apiRemito.getRemito(this, this.idRemito)
//                .then(res => {
//                  res = res.body.data[0]
//                  console.log(res)
//                  this.edicion = true
//                })
//            } else {
//              // alert('esto es edicion de un remito ' + this.idRemito)
//            }
          }, error => {
            console.log('error al cargar los recorridos asignados ' + error)
          })
      },
      guardarRemito () {
        // guardar Remito
        var idEmpleado = JSON.parse(sessionStorage.getItem('user')).idEmpleado
        var remito = {
          'fecha': Date.now(),
          'idEmpleado': idEmpleado,
          'firma': this.firma,
          'firmaConforme': true,
          'idObjetivo': this.idObjetivo
        }
        apiRemito.nuevoRemito(this, remito)
          .then(rem => {
            console.log(rem)
            // inserto el detalle del remito para los bidones vacios que me llevo
            rem = rem.body
            var detalleRemitoBidonesLlevo = { // cantidad de bidones vacios que me llevo del cliente
              'idRemito': rem.idRemito,
              'idProducto': 1, // bidones
              'cantidad': this.remito.bidonesLlevo,
              'dejadoEnCliente': false
            }
            apiRemito.nuevoDetalleRemitoProducto(this, detalleRemitoBidonesLlevo)
            // inserto el detalle del remito para los bidones llenos que dejo
            var detalleRemitoBidonesDejo = { // cantidad de bidones llenos que dejo en el cliente
              'idRemito': rem.idRemito,
              'idProducto': 1, // bidones
              'cantidad': this.remito.bidonesDejo,
              'dejadoEnCliente': true
            }
            apiRemito.nuevoDetalleRemitoProducto(this, detalleRemitoBidonesDejo)
              .then(res => {
                // actualizo el detalle del recorrido historico
                var detalle = {
                  'idDetalleRecorridoHistorico': this.IdDetalleRecorridoAsignado,
                  'idRemito': rem.idRemito,
                  'entregado': true
                }
                api.editarDetalleRecorridoHistorico(this, detalle)
                  .then(res => {
                    // acualizo los dispensers e inserto el detalle del remito para los dispensers
                    // Guardo los dispensers dejados
                    this.dispensersColocados.forEach(disC => {
                      var detalleRemitoDispensersDejados = {
                        'idRemito': rem.idRemito,
                        'idDispenser': disC,
                        'dejadoEnCliente': true
                      }
                      apiRemito.nuevoDetalleRemitoDispensers(this, detalleRemitoDispensersDejados)
                      apiDispensers.setObjetivoADispenser(this, disC, this.idObjetivo)
                    })
                    // Guardo los dispensers llevados
                    this.dispensersRetirados.forEach(disR => {
                      var detalleRemitoDispensersLlevado = {
                        'idRemito': rem.idRemito,
                        'idDispenser': disR,
                        'dejadoEnCliente': false
                      }
                      apiRemito.nuevoDetalleRemitoDispensers(this, detalleRemitoDispensersLlevado)
                      apiDispensers.borrarObjetivoDeDispenser(this, disR)
                    })
                    // muestro la notificacion de ok
                    noti.success(this)
                    // vuelvo atrás
                    this.$parent.current = 'DetalleRecorrido'
                    this.$parent.verRemito = false
                    this.$parent.verDetalle = true
                  })
              })
          }, error => {
            console.log('error ' + JSON.stringify(error))
            noti.danger()
          })
      },
      cargarDispensersDelObjetivo (idObjetivo) {
        apiDispensers.getDispensersXObjetivo(this, idObjetivo)
          .then(res => {
            console.log(res)
            this.dispensersDelObjetivo = res
          })
      },
      cargarDispensers () {
        apiDispensers.getDispensers(this)
          .then(res => {
            console.log(res)
            this.dispensers = res.filter(x => { return x.idObjetivo == null })
          })
      },
      verdetalle () {
        alert('ver!')
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
      }
    }
  }
</script>
