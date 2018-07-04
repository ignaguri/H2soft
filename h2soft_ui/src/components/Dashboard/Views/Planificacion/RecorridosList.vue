<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card" v-if="verCompleto() == true">
        <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data"
                     :columns="table1.columns" :editButton="false" :erase="borrarRecorrido" :goButton="true" :go="ver">

        </paper-table>
        <div class="text-center">
          <button type="button" class="btn btn-primary btn-fill btn-wd" @click="calendario">
            Ver calendario
          </button>
          <button type="button" class="btn btn-info btn-fill btn-wd" @click="planificar">
            Planificar recorrido
          </button>
        </div>
        <br>
      </div>
      <div class="card" v-if="verCompleto() == false">
        <paper-table type="hover" :title="table2.title" :sub-title="table2.subTitle" :data="table2.data"
                     :columns="table2.columns" :editButton="false" :erase="borrarDetalle">

        </paper-table>
        <paper-table type="hover" :title="asignacionesT.title" :sub-title="asignacionesT.subTitle" :data="asignacionesT.data"
                     :columns="asignacionesT.columns" :editButton="false" :eraseButton="false" :filter="false">

        </paper-table>
        <div class="text-center">
          <button type="button" class="btn btn-default btn-fill btn-wd" @click="seeList">
            Volver
          </button>
          <button ref="btn_asignar" type="button" class="btn btn-info btn-fill btn-wd" @click="asignar">
            Asignar recorrido
          </button>
        </div>
        <br>
      </div>
      <modal effect="fade" width="50%" :value="showCustomModal" :backdrop="false" @ok="showCustomModal = ok()" :title="modalTitle">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <!--<label for="empleado"><h4><span class="label label-default">Repartidor</span></h4></label>-->
              <slot name="label"><label class="control-label">Repartidor</label></slot>
              <dds id="empleado" v-model="idEmpleadoAsignado"
                   :options="empleados"
                   options-value="idEmpleados"
                   options-label="data"
                   search-text="Buscar"
                   :placeholder="'Seleccione un repartidor'"
                   :search="true" :justified="true" required>
              </dds>
              <template v-if="asignado">
                <!--<label for="motivo"><h4><span class="label label-default">Motivo</span></h4></label>-->
                <slot name="label"><label class="control-label">Motivo</label></slot>
                <dds id="motivo" v-model="idMotivo"
                     :options="motivos"
                     options-value="idMotivoDeReasignacion"
                     options-label="descripcion"
                     search-text="Buscar"
                     :placeholder="'Motivo de reasignación'"
                     :search="true" :justified="true" required>
                </dds>
              </template>
            </div>
          </div>
          <div class="col-md-12">
            <!--<div class="col-md-6">-->
              <slot name="label"><label class="control-label">Desde</label></slot>
              <dp v-model="fechaDesde" id="fechaDesde" :disabled-days-of-week=[0] :format="'dd/MM/yyyy'"
                  :placeholder="'Desde'" width="100%" :clear-button="true"></dp>
            <!--</div>-->
            <!--<div class="col-md-6">-->
              <slot name="label"><label class="control-label">Hasta</label></slot>
              <dp v-model="fechaHasta" id="fechaHasta" :disabled-days-of-week=[0] :format="'dd/MM/yyyy'"
                  :placeholder="'Hasta'" width="100%" :clear-button="true"></dp>
            <!--</div>-->
          </div>
        </div>
        <div slot="modal-footer" class="modal-footer">
          <button type="button" class="btn btn-default" @click="showCustomModal = false">Salir</button>
          <button type="button" class="btn btn-success" @click="showCustomModal = ok()">Guardar</button>
        </div>
      </modal>
    </div>
  </div>
</template>
<script>
  import PaperTable from 'components/UIComponents/PaperTablePlus.vue'
  import api from 'src/api/services/recorridoServices'
  import noti from 'src/api/notificationsService'
  import { modal, select, datepicker } from 'vue-strap'

  const table1Columns = ['#', 'Día', 'Turno', 'Frecuencia', 'Asignado a']
  const table2Columns = ['Orden', 'Objetivo', 'Cliente', 'Dirección', 'Localidad']
  const asignacionesTColumns = ['Empleado', 'Fecha desde', 'Fecha hasta']
  export default {
    components: {
      PaperTable,
      modal,
      dp: datepicker,
      dds: select
    },
    data () {
      return {
        table1: {
          title: 'Recorridos existentes',
          subTitle: 'Listado de recorridos disponibles para ser asignados',
          columns: [...table1Columns],
          data: []
        },
        table2: {
          title: 'Recorrido',
          subTitle: 'Información del recorrido',
          columns: [...table2Columns],
          data: []
        },
        asignacionesT: {
          title: 'Próximas asignaciones para este recorrido',
          subTitle: '',
          columns: [...asignacionesTColumns],
          data: []
        },
        recorrido: this.idRecorrido,
        showCustomModal: false,
        idEmpleadoAsignado: null,
        empleados: [],
        asignado: false,
        fechaDesde: new Date().toLocaleDateString('es-AR', { year: 'numeric', month: '2-digit', day: '2-digit' }),
        fechaHasta: '', // new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()).toLocaleDateString('es-AR', { year: 'numeric', month: '2-digit', day: '2-digit' }),
        recorridos: [],
        motivos: [],
        idMotivo: null,
        modalTitle: 'Asignar recorrido'
      }
    },
    props: {
      idRecorrido: Number
    },
    mounted () {
      this.cargarRecorridos()
      this.cargarEmpleados()
    },
    watch: {
      recorrido: function () {
        this.verEspecifico()
      },
      asignado: function () {
        this.cambioAsignacion()
      }
    },
    methods: {
      cargarRecorridos () {
        this.table1.data = []
        api.getRecorridosFull(this)
          .then(r => {
            r.sort((a, b) => a.recorrido - b.recorrido)
            r.forEach(recs => {
              this.table1.data.push({
                '#': recs.recorrido,
                temporada: recs.temporada,
                dia: recs.dia,
                turno: recs.turno,
                frecuencia: recs.frecuencia,
                asignadoa: recs.asignado ? `${recs.asignado.apellido}, ${recs.asignado.nombre}` : null
              })
            })
            this.recorridos = r
          })
      },
      cargarEmpleados () {
        api.getEmpleados(this)
          .then(e => {
            if (e) {
              e.forEach(em => {
                em.data = `${em.nombre} ${em.apellido}`
              })
              this.empleados = e
            } else {
              this.empleados = []
            }
          })
      },
      cargarMotivosReasignacion () {
        this.motivos = []
        api.getMotivosReasignacion(this)
          .then(e => {
            if (e) {
              this.motivos = e
            }
          })
      },
      verEspecifico () {
        if (this.recorrido !== 0) {
          this.table2.data = []
          api.getDetalleRecorridosFull(this, this.recorrido)
            .then(r => {
              r.sort((a, b) => a.orden - b.orden)
              r.forEach(recs => {
                this.table2.data.push({
                  '#': recs.detalleRecorrido,
                  recorrido: recs.recorrido,
                  objetivo: recs.objetivo,
                  orden: recs.orden,
                  direccion: recs.direccion,
                  localidad: recs.localidad,
                  cliente: recs.cliente
                })
              })
            })
          this.asignacionesT.data = []
          api.getAsignacionesFuturas(this, this.recorrido)
            .then(r => {
              if (r.length) {
                r.sort((a, b) => a.first.fechaAsignacion > b.first.fechaAsignacion)
                this.asignado = r[0].empleado
                this.table2.title = this.table2.title + ' asignado a ' + r[0].empleado.nombre + ' ' + r[0].empleado.apellido
                r.forEach(a => this.asignacionesT.data.push({
                  empleado: `${a.empleado.apellido}, ${a.empleado.nombre}`,
                  fechadesde: new Date(a.first.fechaAsignacion).toLocaleDateString('es-AR', { year: 'numeric', month: '2-digit', day: '2-digit' }),
                  fechahasta: new Date(a.last.fechaAsignacion).toLocaleDateString('es-AR', { year: 'numeric', month: '2-digit', day: '2-digit' })
                }))
                this.fechaDesde = new Date(r[r.length - 1].last.fechaAsignacion).toLocaleDateString('es-AR', { year: 'numeric', month: '2-digit', day: '2-digit' })
              } else {
                this.asignado = false
              }
            })
          const recorrido = this.recorridos.find(r => r.recorrido === Number(this.recorrido))
          this.table2.subTitle = `Día: ${recorrido.dia} - Turno: ${recorrido.turno} - Frecuencia: ${recorrido.frecuencia}`
        }
      },
      editar (e) {
        let id = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        console.log(id)
      },
      borrarRecorrido (e) {
        let id = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        if (!confirm('¿Desea eliminar a este recorrido y todos sus objetivos planificados?')) return
        api.deleteRecorrido(this, id)
          .then(res => {
            if (res) {
              noti.exitoConTexto(this, 'Éxito', 'El recorrido se ha eliminado!')
              this.cargarRecorridos()
            } else {
              noti.errorConTexto(this, 'Error', 'Error al borrar recorrido')
            }
          })
      },
      borrarDetalle (e) {
        let id = e.target.parentNode.parentNode.getElementsByTagName('td')[1].innerHTML
        if (!confirm('¿Desea eliminar a este objetivo del recorrido? Se eliminarán también todas las asignaciones futuras que tenga')) return
        api.deleteObjetivoFromRecorrido(this, id, this.recorrido)
          .then(r => {
            if (r) {
              noti.exitoConTexto(this, 'Éxito', 'El objetivo del recorrido se ha eliminado!')
              this.verEspecifico()
            } else {
              noti.errorConTexto(this, 'Error', 'Error al borrar objetivo')
            }
          })
      },
      ver (e) {
        let id = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        this.recorrido = id
        this.table2.title = 'Recorrido n° ' + id
      },
      verCompleto () {
        return this.recorrido === 0
      },
      seeList () {
        this.recorrido = 0
        this.limpiarCampos()
      },
      planificar () {
        this.$parent.edit = false
        this.$parent.show = 'form'
      },
      calendario () {
        this.$parent.show = 'calendar'
      },
      asignar () {
        this.showCustomModal = true
      },
      ok () {
        if (this.idEmpleadoAsignado === null) {
          noti.infoConTexto(this, 'Alerta', 'Debe completar todos los campos')
          return true
        }
        if (this.asignado && !this.idMotivo) {
          noti.infoConTexto(this, 'Alerta', 'Debe completar todos los campos')
          return true
        }
        if (!this.fechaDesde || !this.fechaHasta) {
          noti.infoConTexto(this, 'Alerta', 'Debe completar todos los campos')
          return true
        }
        const desde = this.fechaDesde.split('/')
        const fechaDesde = new Date(desde[2], desde[1] - 1, desde[0])
        fechaDesde.setHours(0, 0, 0, 0)
        const hasta = this.fechaHasta.split('/')
        const fechaHasta = new Date(hasta[2], hasta[1] - 1, hasta[0])
        fechaHasta.setHours(0, 0, 0, 0)
        const now = new Date()
        now.setHours(0, 0, 0, 0)
        if (fechaDesde < now) {
          noti.infoConTexto(this, 'Alerta', 'La fecha desde no puede ser menor a hoy')
          return true
        }
        if (fechaDesde >= fechaHasta) {
          noti.infoConTexto(this, 'Alerta', 'La fecha desde no puede ser mayor o igual a la fecha hasta')
          return true
        }
        this.postAsignacion({
          recorrido: Number(this.recorrido),
          empleado: this.idEmpleadoAsignado,
          fechaDesde: this.fechaDesde,
          fechaHasta: this.fechaHasta,
          idMotivoDeReasignacion: this.idMotivo
        })
        return false
      },
      postAsignacion (asignacion) {
        api.postAsignacion(this, asignacion)
          .then(r => {
            console.log('post asignacion', r)
            if (r && r.asignado) {
              noti.exitoConTexto(this, 'Éxito', 'Recorrido asignado con éxito!')
              this.cargarRecorridos()
              this.seeList()
              this.limpiarCampos()
              return
            }
            if (r && !r.restrictivo) {
              if (!confirm(`${r.message} ${r.data.toString()} ¿Desea continuar de todas formas?`)) return
              api.postAsignacion(this, asignacion, true)
                .then(r => {
                  noti.exitoConTexto(this, 'Éxito', 'Recorrido asignado con éxito!')
                  this.cargarRecorridos()
                  this.seeList()
                  this.limpiarCampos()
                })
                .catch(e => {
                  noti.errorConTexto(this, 'Error', 'Error al asignar recorrido.')
                  this.seeList()
                  this.limpiarCampos()
                })
            } else {
              noti.errorConTexto(this, 'Error', `${r.message ? r.message + ' ' + r.data.toString() : ''}`)
              this.seeList()
              this.limpiarCampos()
            }
          })
      },
      cambioAsignacion () {
        if (this.asignado) {
          this.cargarMotivosReasignacion()
//          this.modalTitle = this.$refs.btn_asignar.innerText = 'Reasignar recorrido'
//        } else {
//          this.modalTitle = this.$refs.btn_asignar.innerText = 'Asignar recorrido'
        }
      },
      limpiarCampos () {
        this.idEmpleadoAsignado = null
        this.fechaDesde = new Date().toLocaleDateString('es-AR', { year: 'numeric', month: '2-digit', day: '2-digit' })
        this.fechaHasta = '' // new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()).toLocaleDateString('es-AR', { year: 'numeric', month: '2-digit', day: '2-digit' })
        this.idMotivo = null
      }
    }
  }

</script>
<style>

</style>
