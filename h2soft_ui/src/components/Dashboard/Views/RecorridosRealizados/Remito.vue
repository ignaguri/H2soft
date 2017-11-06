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
                  label="Dejo"
                  placeholder="bidonesDejo"
                  v-model="remito.bidonesDejo">
        </fg-input>
      </div>
      <div class="col-md-4 left">
        <fg-input type="text"
                  label="Llevo"
                  placeholder="bidonesLlevo"
                  v-model="remito.bidonesLlevo">
        </fg-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 left">
        <h5>Dispenser</h5>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">
        <div class="text-center">
          <button type="button" class="btn btn-info btn-fill btn-wd" @click="alert('firma')">
            Firma
          </button>
          <button type="button" class="btn btn-info btn-fill btn-wd" @click="alert('guardar')">
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
  import PaperTable from 'components/UIComponents/TablaRecorridos.vue'
  // import noti from 'src/notificationsService/index.js'
  const tableColumns = ['Nro', 'Orden', 'Objetivo']
  const dataColumns = []
  export default {
    components: {
      PaperTable
    },
    data () {
      return {
        remito: {
          bidonesDejo: '',
          bidonesLlevo: null
        },
        // fecha: '',
        // dia: '',
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
      'idObjetivo': String
    },
    mounted () {
      // this.cargarRecorrido()
      // this.cargarRecorridoAsignado()
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
      cargarRecorrido () {
        api.getRecorrido(this, this.id)
          .then(res => {

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
      }
    }
  }
</script>
