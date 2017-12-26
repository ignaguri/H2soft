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
    <div v-if="false" class="col-md-4 left">
      <h5>Camion asignado: </h5>
    </div>
    <div class="col-md-4 left">
      <h5>Estado del recorrido: <a>{{estado}}</a> </h5>
    </div>
    <div class="col-md-4 left">
      <button type="button" class="btn btn-info btn-fill btn-wd" v-if="verBtIniciarFinalizar" @click="recorridoIniciarFinalizar">
        {{txBtIniciarFinalizar}}
      </button>
      <button type="button" class="btn btn-info btn-fill btn-wd" v-if="verBtSuspReanudar" @click="recorridoSuspenderReanudar">
        {{txBtSuspReanudar}}
      </button>
      <button type="button" class="btn btn-info btn-fill btn-wd" v-if="verBtAnular" @click="recorridoAnular">
        Anular
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
  import noti from 'src/api/notificationsService'
  // import Remito from './RecorridosRealizados/Remito.vue'
  const tableColumns = ['Nro', 'Orden', 'Objetivo', 'Bidones']
  const dataColumns = []
  export default {
    components: {
      PaperTable
    },
    data () {
      return {
        verBtIniciarFinalizar: true,
        verBtSuspReanudar: false,
        verBtAnular: false,
        txBtIniciarFinalizar: 'Iniciar',
        txBtSuspReanudar: 'Suspender',
        puedeFinalizar: true,
        // idEstado: 0,
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
      'estado': String,
      idEstado: Number
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
                // this.idEstado = det.entregado
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
      verdetalle (e) {
        let id = e.target.parentNode.getElementsByTagName('td')[0].innerHTML
        this.$parent.detalleRecorridoAsignadoId = id
        this.$parent.verRemito = true
        this.$parent.verDetalle = false
        this.$parent.verLista = false
      },
      recorridoIniciarFinalizar () {
        switch (this.idEstado) {
          case 1: // nuevo
            console.log('entro a iniciar. Estado: ' + this.idEstado)
            apiEstados.iniciarRecorrido(this, this.id)
              .then(resObj => {
                this.verBtSuspReanudar = true
                this.verBtAnular = true
                this.txBtIniciarFinalizar = 'Finalizar'
                this.txBtSuspReanudar = 'Suspender'
                this.$parent.estado = 'En proceso'
                this.$parent.idEstado = 2
                noti.success(this)
              },
              error => {
                alert('Error al iniciar el recorrido')
                console.log('error al cambiar el estado ' + error)
              })
            break
          case 2: // en proceso
            if (this.puedeFinalizar === false) {
              alert('El recorrido no se puede finalizar porque no has visitado todos los objetivos')
            } else {
              console.log('entro a finalizar. Estado: ' + this.idEstado)
              apiEstados.finalizarRecorrido(this, this.id)
                .then(resObj => {
                  this.verBtSuspReanudar = false
                  this.verBtAnular = false
                  this.verBtIniciarFinalizar = false
                  this.$parent.estado = 'Finalizado'
                  noti.success(this)
                },
                error => {
                  alert('Error al finalizar el recorrido')
                  console.log('error al cambiar el estado ' + error)
                })
            }
            break
          default:
            alert('No se puede realizar el cambio de estado')
        }
      },
      recorridoSuspenderReanudar () {
        switch (this.idEstado) {
          case 2: // en proceso
            console.log('entro a suspender. Estado: ' + this.idEstado)
            apiEstados.suspenderRecorrido(this, this.id)
              .then(resObj => {
                this.verBtIniciarFinalizar = false
                this.verBtAnular = false
                this.txBtSuspReanudar = 'Reanudar'
                this.$parent.estado = 'Suspendido'
                this.$parent.idEstado = 3
                noti.success(this)
              },
                error => {
                  alert('Error al suspender el recorrido')
                  console.log('error al cambiar el estado ' + error)
                })
            break
          case 3: // suspendido
            console.log('entro a reanudar. Estado: ' + this.idEstado)
            apiEstados.reanudarRecorrido(this, this.id)
              .then(resObj => {
                this.verBtIniciarFinalizar = true
                this.txBtIniciarFinalizar = 'Finalizar'
                this.verBtAnular = true
                this.txBtSuspReanudar = 'Suspender'
                this.$parent.estado = 'En Proceso'
                this.$parent.idEstado = 2
                noti.success(this)
              },
              error => {
                alert('Error al suspender el recorrido')
                console.log('error al cambiar el estado ' + error)
              })
            break
          default:
            alert('No se puede realizar el cambio de estado')
        }
      },
      recorridoAnular () {
        if (this.idEstado === 1 || this.idEstado === 2) {
          console.log('entro a anular. Estado: ' + this.idEstado)
          apiEstados.anularRecorrido(this, this.id)
            .then(resObj => {
              this.$parent.estado = 'Anulado'
              this.verBtIniciarFinalizar = false
              this.verBtAnular = false
              this.verBtSuspReanudar = false
              this.$parent.idEstado = 5
              noti.success(this)
            },
            error => {
              alert('Error al anular el recorrido')
              console.log('error al cambiar el estado ' + error)
            })
        } else {
          alert('No se puede realizar el cambio de estado')
        }
      },
      setearEstadoActual () {
        console.log('estado ' + this.idEstado)
        switch (this.idEstado) {
          case 1:
            this.$parent.estado = 'Nuevo'
            this.verBtIniciarFinalizar = true
            this.txBtIniciarFinalizar = 'Iniciar'
            this.verBtAnular = true
            this.verBtSuspReanudar = false
            break
          case 2:
            this.$parent.estado = 'En Proceso'
            this.verBtIniciarFinalizar = true
            this.txBtIniciarFinalizar = 'Finalizar'
            this.verBtAnular = true
            this.verBtSuspReanudar = true
            this.txBtSuspReanudar = 'Suspender'
            break
          case 3:
            this.$parent.estado = 'Suspendido'
            this.verBtIniciarFinalizar = false
            this.verBtAnular = false
            this.verBtSuspReanudar = true
            this.txBtSuspReanudar = 'Reanudar'
            break
          case 4:
            this.$parent.estado = 'Finalizado'
            this.verBtIniciarFinalizar = false
            this.verBtAnular = false
            this.verBtSuspReanudar = false
            break
          case 5:
            this.$parent.estado = 'Anulado'
            this.verBtIniciarFinalizar = false
            this.verBtAnular = false
            this.verBtSuspReanudar = false
            break
          default:
            break
        }
      },
      verRecorridoEnMapa () {
        // alert('Ver objetivos en el mapa')
        let url = api.mostrarRecorridoEnMapa(this, this.table1.data)
        window.open(url)
      }
    }
  }

</script>
