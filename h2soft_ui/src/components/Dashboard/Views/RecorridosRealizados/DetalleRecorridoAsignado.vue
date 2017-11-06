<template>
<div>
  <div class="row">
    <div class="col-md-4 left">
      <div class="text-line">
        <h4>Detalle del recorrido asignado</h4>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-4 left">
      <div class="text-line">
          <h5>Día: <a>{{dia}} {{fecha}} - {{turno}}</a></h5>
      </div>
    </div>
    <div class="col-md-4 left">
      <div class="text-line">
        <h5> Temporada: <a>{{temporada}} </a> </h5>
      </div>
    </div>
  </div>
  <div class="row">
    <div v-if="verBotonSuspender" class="col-md-4 left">
      <h5>Camion asignado: </h5>
    </div>
    <div class="col-md-4 left">
      <h5>Estado del recorrido: <a>{{estado}}</a> </h5>
    </div>
    <div class="col-md-4 left">
      <button type="button" class="btn btn-info btn-fill btn-wd" v-if="verBotonIniciar"  @click="recorridoCambioEstado">
        {{botonEstado}}
      </button>
      <button type="button" class="btn btn-info btn-fill btn-wd"  v-if="verBotonSuspender" @click="recorridoCambioEstado">
        Suspender
      </button>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <paper-table type="hover" :title="table1.title" :data="table1.data" :columns="table1.columns" :editButton="false" :eraseButton="false" :goButton="true" :go="verdetalle" >
        </paper-table>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-11">
      <div class="text-center">
        <button type="button" class="btn btn-info btn-fill btn-wd" @click="verRecorridoEnMapa">
          Mapa
        </button>
      </div>
    </div>
  </div>
</div>

</template>
<script>
  import api from 'src/api/services/recorridosHistoricosServices'
  import apiEstados from 'src/api/services/estadosDeRecorridosServices'
  import PaperTable from 'components/UIComponents/TablaRecorridos.vue'
  import noti from 'src/notificationsService/notificationsService.js'
  // import Remito from './RecorridosRealizados/Remito.vue'
  const tableColumns = ['Nro', 'Orden', 'Objetivo', 'Bidones']
  const dataColumns = []
  export default {
    components: {
      PaperTable
    },
    data () {
      return {
        verBotonIniciar: true,
        verBotonSuspender: false,
        botonEstado: 'Iniciar',
        puedeFinalizar: true,
        table1: {
          title: 'Objetivos del recorrido',
          subTitle: '',
          columns: [...tableColumns],
          data: [...dataColumns]
        }
      }
    },
    props: {
      'id': String,
      dia: String,
      turno: String,
      temporada: String,
      fecha: String,
      'estado': String
    },
    mounted () {
      // this.cargarRecorrido()
      this.cargarRecorridoAsignado()
    },
    methods: {
      cargarRecorridoAsignado () {
        api.getDetallesRecorridoAsignado(this, this.id)
          .then(resDet => {
            // console.log(resDet)
            resDet.body.data.forEach(det => {
              api.getObjetivoXId(this, det.idObjetivo)
              .then(resObj => {
                resObj = resObj.body.data[0]
                // console.log(det)
                this.table1.data.push({
                  // nro: det.idObjetivo,
                  nro: det.idDetalleRecorridoHistorico,
                  orden: det.orden,
                  objetivo: resObj.nombre,
                  horario: '',
                  estado: det.entregado === 0 ? 1 : 4,
                  bidones: det.cantidadSugerida
                })
                if (det.entregado === 0) {
                  this.puedeFinalizar = false
                }
              })
            })
            this.setearEstadoActual()
          }, error => {
            console.log('error al cargar los recorridos asignados ' + error)
          })
      },
      cargarRecorrido () {
        api.getRecorrido(this, this.id)
        .then(res => {
          this.setearBotones()
        })
      },
      verdetalle (e) {
        let id = e.target.parentNode.getElementsByTagName('td')[0].innerHTML
        // this.$parent.objetivoId = id
        this.$parent.detalleRecorridoAsignadoId = id
        this.$parent.verRemito = true
        this.$parent.verDetalle = false
        this.$parent.verLista = false
      },
      recorridoCambioEstado () {
        console.log('llego al cambio de estado', this.estado)
        if (this.estado === 'Nuevo') {
          apiEstados.iniciarRecorrido(this, this.id)
            .then(resObj => {
              this.botonEstado = 'Finalizar'
              this.$parent.estado = 'En proceso'
              noti.success(this)
            })
        }
        if (this.estado === 'En proceso') {
          this.finalizarRecorrido()
        }
      },
      finalizarRecorrido () {
        if (this.puedeFinalizar === false) {
          alert('El recorrido no se puede finalizar porque no has visitado todos los objetivos')
        } else {
          apiEstados.finalizarRecorrido(this, this.id)
          .then(resObj => {
            this.verBotonIniciar = false
            this.$parent.estado = 'Finalizado'
            noti.success(this)
          })
        }
      },
      setearEstadoActual () {
        switch (this.estado) {
          case 'Nuevo':
            this.botonEstado = 'Iniciar'
            break
          case 'En proceso':
            this.botonEstado = 'Finalizar'
            break
          case 'Suspendido':
            break
          case 'Finalizado':
            this.verBotonIniciar = false
            break
          default:
            break
        }
      },
      verRecorridoEnMapa () {
        alert('Ver objetivos en el mapa')
      }
    }
  }

</script>
