<template>
  <div class="card">
    <div class="header">
      <h4 class="title">Planificar recorrido</h4>
      <p class="category">Cree un recorrido nuevo o agregue objetivos a uno ya creado</p>
    </div>
    <div class="content">
      <form @submit.prevent="guardarRecorrido" class="form-inline">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <!--<label for="recorrido"><h4><span class="label label-default">Recorrido</span></h4></label>-->
              <slot name="label"><label class="control-label">Recorrido</label></slot>
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
              <!--<label for="frecuencia"><h4><span class="label label-default">Frecuencia</span></h4></label>-->
              <slot name="label"><label class="control-label">Frecuencia</label></slot>
              <dds id="frecuencia" v-model="idFrecuencia"
                   :options="frecuencias"
                   options-value="idFrecuenciasRecorrido"
                   options-label="nombre"
                   search-text="Buscar"
                   :placeholder="'Seleccione una frecuencia'"
                   :search="true" :justified="true"
                   :disabled="idRecorrido !== null" required>
              </dds>
            </div>
            <div class="form-group">
              <!--<label for="dia"><h4><span class="label label-default">Día</span></h4></label>-->
              <slot name="label"><label class="control-label">Día</label></slot>
              <dds id="dia" v-model="idDia"
                   :options="dias"
                   options-value="idDias"
                   options-label="nombre"
                   search-text="Buscar"
                   :placeholder="'Seleccione un día'"
                   :search="true" :justified="true"
                   :disabled="idRecorrido !== null" required>
              </dds>
            </div>
            <div class="form-group">
              <!--<label for="turno"><h4><span class="label label-default">Turno</span></h4></label>-->
              <slot name="label"><label class="control-label">Turno</label></slot>
              <dds id="turno" v-model="idTurno"
                   :options="turnos"
                   options-value="idTurnos"
                   options-label="nombre"
                   search-text="Buscar"
                   :placeholder="'Seleccione un turno'"
                   :search="true" :justified="true"
                   :disabled="idRecorrido !== null" required>
              </dds>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <!--<label for="cliente"><h4><span class="label label-default">Cliente</span></h4></label>-->
              <slot name="label"><label class="control-label">Cliente</label></slot>
              <dds id="cliente" v-model="idClientes"
                   :options="clientes"
                   options-value="idClientes"
                   options-label="razonSocial"
                   search-text="Buscar"
                   :placeholder="'Seleccione un cliente'"
                   :search="true" :justified="true" required>
              </dds>
            </div>
            <div class="form-group">
              <!--<label for="objetiv"><h4><span class="label label-default">Objetivo</span></h4></label>-->
              <slot name="label"><label class="control-label">Objetivo</label></slot>
              <dds id="objetiv" v-model="idObjetivo"
                   :options="objetivos"
                   options-value="idObjetivosXCliente"
                   options-label="nombre"
                   search-text="Buscar"
                   :placeholder="'Seleccione un objetivo'"
                   :search="true" :justified="true" required>
              </dds>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="text-center">
            </br>
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
        <div class="row" v-if="planificando">
          <paper-table type="hover" :title="table2.title" :sub-title="table2.subTitle" :data="table2.data"
                       :columns="table2.columns" :editButton="false" :eraseButton="false" :filter="false">
          </paper-table>
          <hr>
        </div>
        <div class="row">
          <div class="text-right">
            Ver objetivos
            <button-group v-model="radioValue" type="info">
              <radio selected-value="sin_planificar">Sin planificar</radio>
              <radio selected-value="planificados">Planificados</radio>
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
        radioValue: 'sin_planificar',
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
        planificando: false,
        table1: {
          title: 'Objetivos planificados',
          columns: [],
          data: []
        },
        table2: {
          title: 'Recorrido',
          subTitle: 'Estás planificando este recorrido',
          columns: ['Objetivo', 'Cliente', 'Direccion', 'Localidad'],
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
          // TODO: sacarlo. dejado por cuestion de tiempos
          idTemporada: 1
        }
        let detalle = {
          idObjetivo: this.idObjetivo
        }
        api.postRecorrido(this, recorrido, detalle)
          .then(resp => {
            if (resp) {
              this.planificando = true
              noti.exitoConTexto(this, 'Éxito', 'Recorrido guardado con éxito!')
              if (resp[1]) noti.infoConTexto(this, 'Info', 'El recorrido tiene asignaciones futuras. Para que este objetivo se incluya deberá reasignarlo')
              this.cargarRecorridos()
              this.cargarComboRecorridos()
              if (this.idRecorrido === null) {
                this.idRecorrido = resp
              } else {
                this.cambiarRecorrido(resp[0])
              }
              if (this.idRecorrido) {
                this.idClientes = null
                this.idObjetivo = null
              } else {
                this.limpiarCampos()
              }
            } else {
              noti.errorConTexto(this, 'Error', 'Error al guardar recorrido')
            }
          })
      },
      cargarCombos () {
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
        api.getRecorridosFull(this)
          .then(recs => {
            recs.sort((a, b) => a.recorrido - b.recorrido)
            recs.forEach(r => {
              r.datos = `${r.recorrido} (${r.dia}, ${r.turno}, ${r.frecuencia})`
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
          this.table1.title = 'Objetivos planificados'
          this.table1.columns = ['Recorrido', 'Objetivo', 'Cliente', 'Día', 'Turno', 'Frecuencia']
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
                      dia: r.dia,
                      turno: r.turno,
                      frecuencia: r.frecuencia
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
        this.$parent.show = 'list'
      },
      cambiarRecorrido (e) {
        const id = e
        if (id) {
          api.getRecorrido(this, id)
            .then(r => {
              this.idTurno = r.idTurno
              this.idDia = r.idDia
              this.idFrecuencia = r.idFrecuencia
            })
          this.planificando = true
          this.cargarPlanificando(id)
        } else {
          this.planificando = false
          this.limpiarCampos()
        }
      },
      limpiarCampos () {
        this.idRecorrido = null
        this.idClientes = null
        this.idObjetivo = null
        this.idTurno = null
        this.idDia = null
        this.idFrecuencia = null
      },
      cargarPlanificando (idRecorrido) {
        this.table2.data = []
        this.table2.title = 'Recorrido n° ' + idRecorrido
        api.getDetalleRecorridosFull(this, idRecorrido)
          .then(r => {
            r.sort((a, b) => {
              if (a.objetivo.toLowerCase() > b.objetivo.toLowerCase()) return 1
              if (a.objetivo.toLowerCase() < b.objetivo.toLowerCase()) return -1
              return 0
            })
            r.forEach(recs => {
              this.table2.data.push({
                id: recs.detalleRecorrido,
                recorrido: recs.recorrido,
                objetivo: recs.objetivo,
                direccion: recs.direccion,
                localidad: recs.localidad,
                cliente: recs.cliente
              })
            })
          })
        api.checkIfAsignado(this, idRecorrido)
          .then(r => {
            if (r) {
              this.table2.title = this.table2.title + ' asignado a ' + r.nombre + ' ' + r.apellido
            }
          })
      }
    }
  }
</script>
<style>

</style>
