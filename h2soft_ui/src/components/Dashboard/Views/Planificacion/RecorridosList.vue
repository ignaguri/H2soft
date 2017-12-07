<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card" v-if="verCompleto() == true">
        <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns" :editButton="false" :erase="borrarRecorrido" :goButton="true" :go="ver">

        </paper-table>
        <div class="text-center">
          <button type="button" class="btn btn-info btn-fill btn-wd" @click="planificar">
            Planificar Recorrido
          </button>
        </div>
        <br>
      </div>
      <div class="card" v-if="verCompleto() == false">
        <paper-table type="hover" :title="table2.title" :sub-title="table2.subTitle" :data="table2.data" :columns="table2.columns" :editButton="false" :erase="borrarDetalle">

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
      <modal effect="fade" width="50%" :value="showCustomModal" @ok="showCustomModal = ok()" title="Asignar recorrido">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label for="Empleado"><h4><span class="label label-default">Repartidor</span></h4></label>
              <select id="Empleado" v-model="idEmpleadoAsignado">
                <option value="null">Seleccione un repartidor</option>
                <option v-for="emp in empleados" v-bind:value="emp.idEmpleados">
                  {{ emp.nombre + ' ' + emp.apellido }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group">
              <fg-input type="number"
                        label="Cantidad de días de asignación"
                        placeholder="Ingrese un número"
                        v-model="diasAsignacion"
                        disabled>
              </fg-input>
            </div>
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
  import { modal } from 'vue-strap'

  const table1Columns = ['Nro', 'Temporada', 'Dia', 'Turno', 'Frecuencia']
  const table2Columns = ['Orden', 'Objetivo', 'Direccion', 'Localidad', 'Cliente']
  export default {
    components: {
      PaperTable,
      modal
    },
    data () {
      return {
        table1: {
          title: 'Planificación',
          subTitle: 'Lista de recorridos programados',
          columns: [...table1Columns],
          data: []
        },
        table2: {
          title: 'Recorrido',
          columns: [...table2Columns],
          data: []
        },
        recorrido: this.idRecorrido,
        showCustomModal: false,
        idEmpleadoAsignado: null,
        empleados: {},
        asignado: false,
        diasAsignacion: 30
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
            r.forEach(recs => {
              this.table1.data.push({
                nro: recs.recorrido,
                temporada: recs.temporada,
                dia: recs.dia,
                turno: recs.turno,
                frecuencia: recs.frecuencia
              })
            })
          })
      },
      cargarEmpleados () {
        api.getEmpleados(this)
          .then(e => {
            this.empleados = e
          })
      },
      verEspecifico () {
        if (this.recorrido !== 0) {
          this.table2.data = []
          api.getDetalleRecorridosFull(this, this.recorrido)
            .then(r => {
              r.forEach(recs => {
                this.table2.data.push({
                  id: recs.detalleRecorrido,
                  recorrido: recs.recorrido,
                  objetivo: recs.objetivo,
                  orden: recs.orden,
                  direccion: recs.direccion,
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
        }
      },
      editar (e) {
        let id = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        console.log(id)
      },
      borrarRecorrido (e) {
        let id = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        if (!confirm('Desea eliminar a este recorrido y todos sus objetivos planificados?')) return
        api.deleteRecorrido(this, id).then(res => {
          if (res) {
            alert('Borrado con éxito')
            this.cargarRecorridos()
          } else {
            alert('error al borrar')
          }
        })
      },
      borrarDetalle (e) {
        let id = e.target.parentNode.parentNode.getElementsByTagName('td')[1].innerHTML
        api.deleteObjetivoFromRecorrido(this, id, this.recorrido)
          .then(r => {
            if (r) {
              alert('Se borró con éxito el objetivo del recorrido')
              this.verEspecifico()
            } else {
              alert('Hubo un error. check consola')
            }
          })
      },
      ver (e) {
        let id = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        this.recorrido = id
        this.table2.title = 'Recorrido n° ' + id
      },
      verCompleto () {
        if (this.recorrido === 0) {
          return true
        } else {
          return false
        }
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
          alert('Debe completar todos los campos')
          return true
        }
        this.postAsignacion({
          recorrido: Number(this.recorrido),
          empleado: this.idEmpleadoAsignado,
          diasAsignacion: this.diasAsignacion
        })
        return false
      },
      postAsignacion (asignacion) {
        api.postAsignacion(this, asignacion)
          .then(r => {
            if (r) {
              alert('Recorrido asignado!')
            } else {
              alert('Error asignando recorrido. check consola')
            }
          })
      },
      cambioAsignacion () {
        if (this.asignado) {
          this.$refs.btn_asignar.innerText = 'Reasignar recorrido'
        }
      }
    }
  }

</script>
<style>

</style>
