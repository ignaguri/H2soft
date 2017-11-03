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
    <div class="row">
      <div class="col-md-4 left">
        <h5>Bidones</h5>
      </div>
      <div class="col-md-4 left">
        <fg-input type="text"
                  label="Traidos"
                  placeholder="Cant. de bidones"
                  v-model="remito.bidonesDejo">
        </fg-input>
      </div>
      <div class="col-md-4 left">
        <fg-input type="text"
                  label="Retirados"
                  placeholder="Cant. de bidones"
                  v-model="remito.bidonesLlevo">
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
      <div class="col-md-3">
        <div class="text-center">
          <button type="button" class="btn btn-info btn-fill btn-wd" @click="">
            Firma
          </button>
          <button type="button" class="btn btn-info btn-fill btn-wd" @click="guardarRemito">
            Guardar
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">
        <div class="text-center">
          <button type="button" class="btn btn-danger btn-fill btn-wd" v-if="this.$parent.verRemito" @click="seeDetalle">
            Atras
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import api from 'src/api/services/recorridosHistoricosServices'
  import apiDispensers from 'src/api/services/dispensersServices'
  import PaperTable from 'components/UIComponents/TablaRecorridos.vue'
  // import noti from 'src/notificationsService/notificationsService.js'
  import sele from 'vue-strap/src/Select.vue'
  const tableColumns = ['Nro', 'Orden', 'Objetivo']
  const dataColumns = []
  export default {
    components: {
      PaperTable,
      sele
    },
    data () {
      return {
        remito: {
          bidonesDejo: '',
          bidonesLlevo: null
        },
        dispensers: [],
        dispensersDelObjetivo: [],
        objetivo: 'Objetivo 111 ',
        table1: {
          title: 'Objetivos del recorrido',
          subTitle: '',
          columns: [...tableColumns],
          data: [...dataColumns]
        }
      }
    },
    props: {
      idObjetivo: String
    },
    mounted () {
      this.cargarDispensersDelObjetivo()
      this.cargarDispensers()
    },
    methods: {
      cargarRecorridoAsignado () {
        api.getDetalleRecorridoAsignado(this, this.id)
          .then(resDet => {
            // console.log(resDet)
            resDet.body.data.forEach(det => {
              api.getObjetivoXId(this, det.idObjetivo)
                .then(resObj => {
                  resObj = resObj.body.data[0]
                  console.log(det)
                  this.table1.data.push({
                    nro: det.idObjetivo,
                    orden: det.orden,
                    objetivo: resObj.nombre,
                    horario: '',
                    estado: det.entregado
                  })
                })
            })
          }, error => {
            console.log('error al cargar los recorridos asignados ' + error)
          })
      },
      guardarRemito () {
        console.log(this.dispensersColocados, this.dispensersRetirados)
        this.dispensersColocados.forEach(disC => {
          apiDispensers.setObjetivoADispenser(this, disC, this.idObjetivo)
        })
        this.dispensersRetirados.forEach(disR => {
          apiDispensers.borrarObjetivoDeDispenser(this, disR)
        })
      },
      cargarRecorrido () {
        api.getRecorrido(this, this.id)
          .then(res => {

          })
      },
      cargarDispensersDelObjetivo () {
        apiDispensers.getDispensersXObjetivo(this, this.idObjetivo)
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
