<template>
  <div class="card">
    <div class="header">
      <h3 class="title">Planificar Recorrido</h3>
    </div>
    <div class="content">
      <form @submit.prevent="guardarRecorrido" class="form-inline">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label for="recorrido"><h4><span class="label label-default">Recorrido</span></h4></label>
              <dds id="recorrido" v-model="idRecorrido"
              :options="recorridos"
              options-value="recorrido" search-text="Buscar"
              :placeholder="'Recorrido nuevo'"
              options-label="datos" clear-button
              @change="cambiarRecorrido"
              :search="true" :justified="true">
              </dds>
          </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label for="temporada"><h4><span class="label label-default">Temporada</span></h4></label>
              <dds id="temporada" v-model="idTemporada"
                   :options="temporadas"
                   options-value="idTemporadas"
                   options-label="nombre"
                   search-text="Buscar"
                   :placeholder="'Nada seleccionado'"
                   :search="true" :justified="true"
                   :disabled="idRecorrido !== null" required>
              </dds>
            </div>
            <div class="form-group">
              <label for="frecuencia"><h4><span class="label label-default">Frecuencia</span></h4></label>
              <dds id="frecuencia" v-model="idFrecuencia"
                   :options="frecuencias"
                   options-value="idFrecuenciasRecorrido"
                   options-label="nombre"
                   search-text="Buscar"
                   :placeholder="'Nada seleccionado'"
                   :search="true" :justified="true"
                   :disabled="idRecorrido !== null" required>
              </dds>
            </div>
            <div class="form-group">
              <label for="dia"><h4><span class="label label-default">Día</span></h4></label>
              <dds id="dia" v-model="idDia"
                   :options="dias"
                   options-value="idDias"
                   options-label="nombre"
                   search-text="Buscar"
                   :placeholder="'Nada seleccionado'"
                   :search="true" :justified="true"
                   :disabled="idRecorrido !== null" required>
              </dds>
            </div>
            <div class="form-group">
              <label for="turno"><h4><span class="label label-default">Turno</span></h4></label>
              <dds id="turno" v-model="idTurno"
                   :options="turnos"
                   options-value="idTurnos"
                   options-label="nombre"
                   search-text="Buscar"
                   :placeholder="'Nada seleccionado'"
                   :search="true" :justified="true"
                   :disabled="idRecorrido !== null" required>
              </dds>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label for="cliente"><h4><span class="label label-default">Cliente</span></h4></label>
              <dds id="cliente" v-model="idClientes"
                   :options="clientes"
                   options-value="idClientes"
                   options-label="razonSocial"
                   search-text="Buscar"
                   :placeholder="'Nada seleccionado'"
                   :search="true" :justified="true" required>
              </dds>
            </div>
            <div class="form-group">
              <label for="objetiv"><h4><span class="label label-default">Objetivo</span></h4></label>
              <dds id="objetiv" v-model="idObjetivo"
                   :options="objetivos"
                   options-value="idObjetivosXCliente"
                   options-label="nombre"
                   search-text="Buscar"
                   :placeholder="'Nada seleccionado'"
                   :search="true" :justified="true" required>
              </dds>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="text-center">
            <button type="button" class="btn btn-default btn-fill btn-wd" @click="seeList">
              Volver
            </button>
            <button type="submit" class="btn btn-success btn-fill btn-wd">
              Guardar recorrido
            </button>
          </div>
          <div class="clearfix"></div>
        </div>
        <hr>
        <div class="row">
          <div class="text-right">
            Ver objetivos
            <button-group v-model="radioValue" type="info">
              <radio selected-value="planificados">Planificados</radio>
              <radio selected-value="sin_planificar">Sin planificar</radio>
            </button-group>
          </div>
          <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data"
                       :columns="table1.columns" :editButton="false" :eraseButton="false">
          </paper-table>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  import api from 'src/api/services/recorridoServices'
  import PaperTable from '../../../UIComponents/PaperTablePlus.vue'
  import { buttonGroup, radio, select } from 'vue-strap'
  import noti from 'src/api/notificationsService'

  export default {
    components: {
      PaperTable,
      buttonGroup,
      radio,
      dds: select
    },
    props: {
      edit: Boolean
    },
    data () {
      return {
        radioValue: 'planificados',
        temporadas: [],
        idTemporada: null,
        dias: [],
        idDia: null,
        turnos: [],
        idTurno: null,
        frecuencias: [],
        idFrecuencia: null,
        clientes: [],
        idClientes: null,
        objetivos: [],
        idObjetivo: null,
        recorridos: [],
        idRecorrido: null,
        table1: {
          title: 'Recorridos planificados',
          columns: [],
          data: []
        }
      }
    },
    mounted () {
      this.cargarCombos()
      this.cargarRecorridos()
    },
    watch: {
      idClientes: function () {
        this.cargarObjetivos()
      },
      radioValue: function () {
        this.cargarRecorridos()
      }
    },
    methods: {
      guardarRecorrido () {
        let recorrido = {
          idRecorridos: this.idRecorrido,
          idDia: this.idDia,
          idFrecuencia: this.idFrecuencia,
          idTurno: this.idTurno,
          idTemporada: this.idTemporada
        }
        let detalle = {
          idObjetivo: this.idObjetivo
        }
        console.log('POST recorrido:', recorrido, 'detalle:', detalle)
        api.postRecorrido(this, recorrido, detalle)
          .then(resp => {
            if (resp) {
              noti.exitoConTexto(this, 'Éxito', 'Recorrido guardado con éxito')
              this.cargarRecorridos()
              this.cargarComboRecorridos()
              this.limpiarCampos()
              //  this.$parent.isRecorridoList = true
            } else {
              noti.errorConTexto(this, 'Error', 'Error al guardar recorrido')
            }
          })
//        } else {
//          let recorrido = {
//            idRecorridos: this.idRecorrido,
//            idDia: this.idDia,
//            idFrecuencia: this.idFrecuencia,
//            idTurno: this.idTurno,
//            idTemporada: this.idTemporada
//          }
//          let detalle = {
//            idObjetivo: this.idObjetivo
//          }
//          console.log('PATCH recorrido:', recorrido, 'detalle:', detalle)
//          api.postRecorrido(this, recorrido, detalle)
//            .then(resp => {
//              if (resp) {
//                alert('recorrido insertado con éxito')
//                this.$parent.isRecorridoList = true
//              } else {
//                alert('error al guardar recorrido. check consola')
//              }
//            })
//        }
      },
      cargarCombos () {
        api.getTemporadas(this).then(r => {
          this.temporadas = r
        })
        api.getDias(this).then(r => {
          this.dias = r
        })
        api.getTurnos(this).then(r => {
          this.turnos = r
        })
        api.getFrecuencias(this).then(r => {
          this.frecuencias = r
        })
        api.getClientes(this).then(r => {
          this.clientes = r
        })
        this.cargarComboRecorridos()
      },
      cargarComboRecorridos () {
        api.getRecorridosFull(this).then(recs => {
          recs.forEach(r => {
            r.datos = `${r.recorrido} (${r.dia}, ${r.turno}, ${r.frecuencia}, ${r.temporada})`
          })
          this.recorridos = recs
        })
      },
      cargarObjetivos () {
        if (this.idClientes !== null) {
          api.getObjetivos(this, this.idClientes).then(r => {
            this.objetivos = r
          })
        } else {
          this.objetivos = null
        }
      },
      cargarRecorridos () {
        if (this.radioValue === 'planificados') {
          this.table1.title = 'Recorridos planificados'
          this.table1.columns = ['Recorrido', 'Objetivo', 'Cliente', 'Día', 'Turno', 'Frecuencia', 'Temporada']
          this.table1.data = []
          api.getRecorridosFull(this).then(rec => {
            rec.forEach(r => {
              api.getDetalleRecorridosFull(this, r.recorrido)
                .then(det => {
                  det.forEach(d => {
                    this.table1.data.push({
                      objetivo: d.objetivo,
                      cliente: d.cliente,
                      recorrido: r.recorrido,
                      día: r.dia,
                      turno: r.turno,
                      frecuencia: r.frecuencia,
                      temporada: r.temporada
                    })
                  })
                })
            })
          })
        } else {
          this.table1.title = 'Objetivos sin planificar'
          this.table1.columns = ['Cliente', 'Objetivo', 'Direccion', 'Localidad']
          this.table1.data = []
          api.getObjetivosSinPlanificar(this)
            .then(det => {
              det.forEach(d => {
                this.table1.data.push({
                  objetivo: d.nombre,
                  cliente: d.cliente,
                  direccion: d.direccion,
                  localidad: d.localidad
                })
              })
            })
        }
      },
      seeList () {
        this.$parent.isRecorridoList = true
      },
      cambiarRecorrido (e) {
        // TODO: que en la grilla de abajo sólo se vean los datos correspondientes a este recorrido
        const id = e // e.target.value
        if (id) {
          api.getRecorrido(this, id)
            .then(r => {
              this.idTurno = r.idTurno
              this.idTemporada = r.idTemporada
              this.idDia = r.idDia
              this.idFrecuencia = r.idFrecuencia
            })
        } else {
          this.limpiarCampos()
        }
      },
      limpiarCampos () {
        this.idRecorrido = null
        this.idClientes = null
        this.idObjetivo = null
        this.idTurno = null
        this.idTemporada = null
        this.idDia = null
        this.idFrecuencia = null
      }
    }
  }
</script>
<style>

</style>
