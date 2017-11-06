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
                  label="Traidos llenos"
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
  import noti from 'src/notificationsService/notificationsService.js'
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
            api.getObjetivoXId(this, resDet.idObjetivo)
              .then(obj => {
                obj = obj.body.data[0]
                this.idObjetivo = resDet.idObjetivo
                this.objetivo = obj.nombre
              })
            this.cargarDispensers()
            this.cargarDispensersDelObjetivo(resDet.idObjetivo)
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
          'firmaConforme': true
        }
        apiRemito.nuevoRemito(this, remito)
          .then(rem => {
            console.log(rem)
            rem = rem.body
            var detalleRemitoBidones = {
              'idRemito': rem.idRemito,
              'producto': 1, // bidones
              'cantidad': this.remito.bidonesDejo
            }
            // inserto el detalle del remito para los bidones
            apiRemito.nuevoDetalleDeRemito(this, detalleRemitoBidones)
              .then(res => {
                var detalle = {
                  'idDetalleRecorridoHistorico': this.IdDetalleRecorridoAsignado,
                  'idRemito': rem.idRemito,
                  'entregado': true
                }
                // actualizo el detalle del recorrido historico
                api.editarDetalleRecorridoHistorico(this, detalle)
                  .then(res => {
                    // acualizo los dispensers e inserto el detalle del remito para los dispensers dejados
                    // Guardo los dispensers colocados
                    this.dispensersColocados.forEach(disC => {
                      console.log(disC)
                      var detalleRemitoDispenser = {
                        'idRemito': rem.idRemito,
                        'idDispensers': disC
                      }
                      apiRemito.nuevoDetalleDeRemito(this, detalleRemitoDispenser)
                      apiDispensers.setObjetivoADispenser(this, disC, this.idObjetivo)
                    })
                    // Guardo los dispensers retirados
                    this.dispensersRetirados.forEach(disR => {
                      apiDispensers.borrarObjetivoDeDispenser(this, disR)
                    })
                    noti.success(this)
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
        this.botonEstado = 'Finalizar'
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
