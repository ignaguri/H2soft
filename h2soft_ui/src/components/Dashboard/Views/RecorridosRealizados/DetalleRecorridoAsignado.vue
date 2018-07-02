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
  </div>
  <div class="row">
    <div v-if="true" class="col-md-3 left">
      <h5>Cantidad total: <a>{{cantidadTotal}} Litros</a> </h5>
    </div>
    <div v-if="true" class="col-md-3 left">
      <h5>Camión asignado: <a>{{camionAsignado}}</a> </h5>
    </div>
  </div>
  <div class="row">
    <div class="col-md-3 left">
      <h5>Estado del recorrido: <a>{{estado}}</a> </h5>
    </div>
    <div class="col-md-6 left">
      <button type="button" class="btn btn-info btn-fill btn-sm" v-if="verBtIniciarFinalizar" @click="btn_iniciarFinalizar">
        {{txBtIniciarFinalizar}}
      </button>
      <button type="button" class="btn btn-info btn-fill btn-sm" v-if="verBtSuspReanudar" @click="btn_suspenderReanudar">
        {{txBtSuspReanudar}}
      </button>
      <button type="button" class="btn btn-info btn-fill btn-sm" v-if="verBtAnular" @click="anular">
        Anular
      </button>
    </div>
  </div>  
  <modal effect="fade" :value="showCustomModal" :backdrop="false" @ok="showCustomModal = recorridoAsignarCamion()" title="Camión del recorrido">
    <div class="row">
      <div class="col-md-12">
        <h5>Selecciona el camión en el que harás el recorrido</h5>
        <div>No podrás realizar el recorrido si no seleccionas un camión</div>
      </div>
    </div>
    </br>
    <div class="row">
      <div class="col-md-6">
        <sele v-model="idCamion" :options="camionesLibres" 
        options-value="idCamiones" search-text="Seleccione" 
        placeholder="Seleccione un camión" 
        options-label="nombreCapacidad" :multiple="false" 
        name="" :search="true" :justified="false"></sele>
      </div>
    </div>
    <div slot="modal-footer" class="modal-footer">
      <button type="button" class="btn btn-default" @click="showCustomModal = false">Salir</button>
      <button type="button" class="btn btn-success" @click="btn_iniciarReanudar()">Aceptar</button>
    </div>
  </modal>
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
  import apiCamiones from 'src/api/services/camionServices'
  import apiRemito from 'src/api/services/remitoServices'
  import apiContratos from 'src/api/services/contratosServices'
  import apiCliente from 'src/api/services/clientServices'
  import PaperTable from 'components/UIComponents/TablaObjetivosdeRecorrido.vue'
  import noti from 'src/api/notificationsService'
  import { modal, select } from 'vue-strap'
  // import sele from 'vue-strap/src/Select.vue'

  const tableColumns = ['#', 'Orden', 'Objetivo', 'Dirección', 'Bidón 20L.', 'Bidón 10L.']
  const dataColumns = []
  export default {
    components: {
      modal,
      PaperTable,
      sele: select
    },
    data () {
      return {
        showCustomModal: false,
        idCamion: 0,
        camionAsignado: '',
        camiones: [],
        camionesLibres: [],
        verBtIniciarFinalizar: true,
        verBtSuspReanudar: false,
        verBtAnular: false,
        txBtIniciarFinalizar: 'Iniciar',
        txBtSuspReanudar: 'Suspender',
        puedeFinalizar: true,
        cantidadTotal: 0,
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
      camionid: Number,
      fecha: String,
      'estado': String,
      idEstado: Number
    },
    mounted () {
      this.getCamiones()
      this.cargarProductos()
      this.cargarRecorridoAsignado()
    },
    methods: {
      cargarRecorridoAsignado () {
        api.getDetallesRecorridoAsignado(this, this.id)
          .then(resDet => {
            resDet.forEach(det => {
              api.getObjetivoXId(this, det.idObjetivo)
              .then(resObj => {
                resObj = resObj.body.data[0]
                let recorrido = {
                  '#': det.idDetalleRecorridoHistorico,
                  'orden': det.orden,
                  'objetivo': resObj.nombre,
                  'direccion': resObj.direccion,
                  'estado': det.entregado === 0 ? 1 : 4,
                  'bidon20l': 0,
                  'bidon10l': 0
                }
                this.table1.data.sort((a, b) => a.orden - b.orden) // a medida que voy insertando, voy ordenando
                if (det.entregado === 0) {
                  this.puedeFinalizar = false
                }
                let cantidad20l = 0
                let cantidad10l = 0
                apiCliente.getObjetivoCantidadProducto(this, det.idObjetivo)
                .then(ocp => {
                  if (ocp) {
                    if (ocp.find(x => x.idProducto === 1) !== undefined) {
                      cantidad20l = ocp.find(x => x.idProducto === 1).cantidad
                      recorrido.bidon20l = cantidad20l + ' (1ra. vez)'
                    }
                    if (ocp.find(x => x.idProducto === 2) !== undefined) {
                      cantidad10l = ocp.find(x => x.idProducto === 2).cantidad
                      recorrido.bidon10l = cantidad10l + ' (1ra. vez)'
                    }
                  }
                  return apiRemito.getCantidadesUltimoRemito(this, det.idObjetivo)
                })
                .then(cant => {
                  if (cant.length > 0) {
                    if (cant.find(x => x.idProducto === 1) !== undefined) {
                      cantidad20l = cant.find(x => x.idProducto === 1).cantidad
                      recorrido.bidon20l = cantidad20l + ' (últ. remito)'
                    } else recorrido.bidon20l = 0 + ' (últ. remito)'
                    if (cant.find(x => x.idProducto === 2) !== undefined) {
                      cantidad10l = cant.find(x => x.idProducto === 2).cantidad
                      recorrido.bidon10l = cantidad10l + ' (últ. remito)'
                    } else recorrido.bidon10l = 0 + ' (últ. remito)'
                  }
                  this.cantidadTotal = this.cantidadTotal + (cantidad20l * (this.productos.find(x => x.idProductos === 1).tamanio)) + (cantidad10l * (this.productos.find(x => x.idProductos === 2).tamanio))
                })
                this.table1.data.push(recorrido)
              })
            })
            this.setearEstadoActual()
          }, error => {
            console.log('error al cargar los recorridos asignados ' + error)
          })
      },
      cargarProductos () { // se buscan los productos del contrato y luego se cargan en el combo
        apiContratos.getProductosContratos(this)
        .then(res => {
          this.productos = res
        })
      },
      verdetalle (e) {
        if (this.idEstado === 2) {
          let id = e.target.parentNode.getElementsByTagName('td')[0].innerHTML
          this.$parent.detalleRecorridoAsignadoId = id
          this.$parent.verRemito = true
          this.$parent.verDetalle = false
          this.$parent.verLista = false
        } else {
          noti.infoConTexto(this, 'Alerta', 'El recorrido debe estar En Proceso para poder cargar remitos')
        }
      },
      btn_iniciarFinalizar () {
        switch (this.idEstado) {
          case 1: // En estado Nuevo -> Iniciar
            api.getRecorridosIniciadosXEmpleado(this)
            .then(res => {
              if (res.length === 0) {
                apiCamiones.getCamionesLibres(this)
                .then(res => {
                  let camLib = []
                  res.forEach(c => {
                    camLib.push({
                      'idCamiones': c.idCamiones,
                      'nombre': c.nombre,
                      'capacidadMaxima': c.capacidadMaxima,
                      'nombreCapacidad': c.nombre + ' (' + c.capacidadMaxima + 'L.)',
                      'libre': c.libre
                    })
                  })
                  this.camionesLibres = camLib
                  this.idCamion = 0
                  this.showCustomModal = true
                })
              } else {
                noti.infoConTexto(this, 'Ya tienes recorridos iniciados.', 'Dedes finalizalos o suspenderlos para poder iniciar este.')
              }
            })
            break
          case 2: // En estado En procceso -> Finalizar
            this.finalizar()
            break
          default:
            alert('sadh')
        }
      },
      btn_iniciarReanudar () {
        switch (this.idEstado) {
          case 1: // En estado Nuevo -> Iniciar
            this.iniciar()
            break
          case 3: // En estado Suspendido -> Reanudar
            this.reanudar()
            break
          default:
            alert('sadh')
        }
      },
      btn_suspenderReanudar () {
        switch (this.idEstado) {
          case 2: // en proceso
            this.suspender()
            break
          case 3: // suspendido
            apiCamiones.getCamionesLibres(this)
            .then(res => {
              let camLib = []
              res.forEach(c => {
                camLib.push({
                  'idCamiones': c.idCamiones,
                  'nombre': c.nombre,
                  'capacidadMaxima': c.capacidadMaxima,
                  'libre': c.libre,
                  'nombreCapacidad': c.nombre + ' (' + c.capacidadMaxima + 'L.)'
                })
              })
              this.camionesLibres = camLib
              // this.idCamion = 0
              this.showCustomModal = true
            })
            break
          default:
            alert('No se puede realizar el cambio de estado')
        }
      },
      iniciar () {
        apiCamiones.asignarCamionARecorrido(this, this.id, this.idCamion)
          .then(res => {
            apiEstados.iniciarRecorrido(this, this.id)
              .then(resObj => {
                const camion = {
                  idCamiones: this.idCamion,
                  libre: false
                }
                apiCamiones.editCamion(this, camion)
                .then(c => {
                  this.verBtSuspReanudar = true
                  this.verBtAnular = true
                  this.txBtIniciarFinalizar = 'Finalizar'
                  this.txBtSuspReanudar = 'Suspender'
                  this.$parent.estado = 'En proceso'
                  this.$parent.idEstado = 2
                  this.camionAsignado = this.getCamionNombre(this.idCamion)
                  this.idCamion = 0
                  noti.exitoConTexto(this, 'Éxito', 'Recorrido iniciado')
                  this.showCustomModal = false
                })
              },
              error => {
                console.log('error al cambiar el estado ' + error)
              })
          },
          error => {
            noti.errorConTexto(this, 'Error', 'No se pudo asignar el camión al recorrido')
            console.log('error al asignar el camión ' + error)
            this.showCustomModal = false
          })
      },
      finalizar () {
        if (this.puedeFinalizar === false) {
          // alert('El recorrido no se puede finalizar porque no has visitado todos los objetivos')
          noti.errorConTexto(this, 'Error', 'No se puede finalizar porque no has visitado todos los objetivos')
        } else {
          apiEstados.finalizarRecorrido(this, this.id)
            .then(resObj => {
              if (resObj) {
                const camion = {
                  idCamiones: resObj.body[0].idCamionAsignado,
                  libre: true
                }
                apiCamiones.editCamion(this, camion)
                .then(c => {
                  this.verBtSuspReanudar = false
                  this.verBtAnular = false
                  this.verBtIniciarFinalizar = false
                  this.$parent.estado = 'Finalizado'
                  this.camionAsignado = '-'
                  this.idCamion = 0
                  noti.exitoConTexto(this, 'Éxito', 'Recorrido finalizado')
                })
              }
            },
            error => {
              console.log('error al cambiar el estado ' + error)
            })
        }
      },
      suspender () {
        apiEstados.suspenderRecorrido(this, this.id)
        .then(resObj => {
          const camion = {
            idCamiones: resObj.body[0].idCamionAsignado,
            libre: true
          }
          apiCamiones.editCamion(this, camion)
          .then(c => {
            this.camionAsignado = '-'
            this.idCamion = null
            this.verBtIniciarFinalizar = false
            this.verBtAnular = false
            this.txBtSuspReanudar = 'Reanudar'
            this.$parent.estado = 'Suspendido'
            this.$parent.idEstado = 3
            noti.exitoConTexto(this, 'Éxito', 'Recorrido suspendido')
          })
        },
        error => {
          console.log('error al cambiar el estado ' + error)
        })
      },
      reanudar () {
        apiCamiones.asignarCamionARecorrido(this, this.id, this.idCamion)
          .then(res => {
            apiEstados.reanudarRecorrido(this, this.id)
            .then(resObj => {
              const camion = {
                idCamiones: resObj.body[0].idCamionAsignado,
                libre: false
              }
              apiCamiones.editCamion(this, camion)
              .then(c => {
                this.camionAsignado = this.getCamionNombre(resObj.body[0].idCamionAsignado)
                this.verBtIniciarFinalizar = true
                this.txBtIniciarFinalizar = 'Finalizar'
                this.verBtAnular = true
                this.txBtSuspReanudar = 'Suspender'
                this.$parent.estado = 'En Proceso'
                this.$parent.idEstado = 2
                noti.exitoConTexto(this, 'Éxito', 'Recorrido reanudado')
                this.showCustomModal = false
              })
            })
          },
        error => {
          console.log('error al cambiar el estado ' + error)
        })
      },
      anular () {
        if (this.idEstado === 1 || this.idEstado === 2) {
          apiEstados.anularRecorrido(this, this.id)
            .then(resObj => {
              const camion = {
                idCamiones: resObj.body[0].idCamionAsignado,
                libre: true
              }
              apiCamiones.editCamion(this, camion)
              .then(c => {
                this.$parent.estado = 'Anulado'
                this.verBtIniciarFinalizar = false
                this.verBtAnular = false
                this.verBtSuspReanudar = false
                this.camionAsignado = '-'
                this.$parent.idEstado = 5
                noti.exitoConTexto(this, 'Éxito', 'Recorrido anulado')
              })
            },
            error => {
              console.log('error al cambiar el estado ' + error)
            })
        } else {
          noti.infoConTexto('No se puede realizar el cambio de estado')
        }
      },
      setearEstadoActual () {
        switch (this.idEstado) {
          case 1:
            this.$parent.estado = 'Nuevo'
            this.verBtIniciarFinalizar = true
            this.txBtIniciarFinalizar = 'Iniciar'
            this.verBtAnular = true
            this.verBtSuspReanudar = false
            this.camionAsignado = '-'
            break
          case 2:
            this.$parent.estado = 'En Proceso'
            this.verBtIniciarFinalizar = true
            this.txBtIniciarFinalizar = 'Finalizar'
            this.verBtAnular = true
            this.verBtSuspReanudar = true
            this.txBtSuspReanudar = 'Suspender'
            this.camionAsignado = this.getCamionNombre(this.camionid)
            break
          case 3:
            this.$parent.estado = 'Suspendido'
            this.verBtIniciarFinalizar = false
            this.verBtAnular = false
            this.verBtSuspReanudar = true
            this.txBtSuspReanudar = 'Reanudar'
            this.camionAsignado = '-'
            break
          case 4:
            this.$parent.estado = 'Finalizado'
            this.verBtIniciarFinalizar = false
            this.verBtAnular = false
            this.verBtSuspReanudar = false
            this.camionAsignado = '-'
            break
          case 5:
            this.$parent.estado = 'Anulado'
            this.verBtIniciarFinalizar = false
            this.verBtAnular = false
            this.verBtSuspReanudar = false
            this.camionAsignado = '-'
            break
          default:
            break
        }
      },
      getCamiones () {
        apiCamiones.getCamiones(this)
          .then(res => {
            res.forEach(c => {
              this.camiones.push({
                'idCamiones': c.idCamiones,
                'nombre': c.nombre,
                'capacidadMaxima': c.capacidadMaxima,
                'nombreCapacidad': c.nombre + ' (' + c.capacidadMaxima + 'L.)',
                'libre': c.libre
              })
            })
          })
      },
      cambioCamionSeleccionado (value) {
        this.idCamion = value
      },
      getCamionNombre (idCamion) {
        for (var i = 0, len = this.camiones.length; i < len; i++) {
          if (this.camiones[i].idCamiones === idCamion) {
            return this.camiones[i].nombre
          }
        }
      },
      verRecorridoEnMapa () {
        api.mostrarRecorridoEnMapa(this, this.table1.data)
          .then(url => {
            window.open(url)
          })
      }
    }
  }

</script>
