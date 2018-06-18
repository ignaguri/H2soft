<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card" v-if="verCompleto() == true">
        <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data"
                     :columns="table1.columns" :editButton="false" :erase="borrarRecorrido" :goButton="true" :go="ver">

        </paper-table>
        <div class="text-center">
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
      <modal effect="fade" width="50%" :value="showCustomModal" @ok="showCustomModal = ok()" :title="modalTitle">
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
        recorrido: this.idRecorrido,
        showCustomModal: false,
        idEmpleadoAsignado: null,
        empleados: [],
        asignado: false,
        fechaDesde: new Date().toLocaleDateString('es-AR', { year: 'numeric', month: '2-digit', day: '2-digit' }),
        fechaHasta: new Date().toLocaleDateString('es-AR', { year: 'numeric', month: '2-digit', day: '2-digit' }),
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
                día: recs.dia,
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
                  dirección: recs.direccion,
                  localidad: recs.localidad,
                  cliente: recs.cliente
                })
              })
            })
          api.checkIfAsignado(this, this.recorrido)
            .then(r => {
              if (r) {
                this.asignado = r
                this.table2.title = this.table2.title + ' asignado a ' + r.nombre + ' ' + r.apellido
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
      },
      planificar () {
        this.$parent.edit = false
        this.$parent.isRecorridoList = false
      },
      asignar () {
        this.showCustomModal = true
      },
      ok () {
        // return !confirm('Ok event.\nClose Modal?')
        if (this.idEmpleadoAsignado === null) {
          noti.infoConTexto(this, 'Alerta', 'Debe completar todos los campos')
          return true
        }
        if (this.asignado && !this.idMotivo) {
          noti.infoConTexto(this, 'Alerta', 'Debe completar todos los campos')
          return true
        }
        this.postAsignacion({
          recorrido: Number(this.recorrido),
          empleado: this.idEmpleadoAsignado,
          fechaDesde: this.fechaDesde,
          fechaHasta: this.fechaHasta,
          idMotivoDeReasignacion: this.idMotivo
        }, this.asignado)
        return false
      },
      postAsignacion (asignacion, isReasignacion) {
        api.postAsignacion(this, asignacion, isReasignacion)
          .then(r => {
            if (r) {
              noti.exitoConTexto(this, 'Éxito', 'Recorrido asignado con éxito!')
              this.cargarRecorridos()
              this.seeList()
            } else {
              noti.errorConTexto(this, 'Error', 'Error al asignar recorrido')
              this.seeList()
            }
          })
      },
      cambioAsignacion () {
        if (this.asignado) {
          this.cargarMotivosReasignacion()
          this.modalTitle = this.$refs.btn_asignar.innerText = 'Reasignar recorrido'
        } else {
          this.modalTitle = this.$refs.btn_asignar.innerText = 'Asignar recorrido'
        }
      }
    }
  }

</script>
<style>

</style>
