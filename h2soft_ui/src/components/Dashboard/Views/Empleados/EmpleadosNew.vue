<template>
  <div class="card">
    <div class="header">
      <h3 class="title" v-if="!edit">Agregar nuevo empleado</h3>
      <h3 class="title" v-if="edit">Editar empleado</h3>
    </div>
    <div class="content">
      <form name="new_camion_form" @submit.prevent="guardarEmpleado">
        <div class="row">
          <div class="col-md-6">
            <h5>Nombre</h5>
            <fg-input type="text"
                      label=""
                      :disabled="false"
                      placeholder="Nombre"
                      v-model="empleado.nombre"
                      required
            >
            </fg-input>
          </div>
          <div class="col-md-6">
            <h5>Apellido</h5>
            <fg-input type="text"
                      label=""
                      :disabled="false"
                      placeholder="Apellido"
                      v-model="empleado.apellido"
                      required
            >
            </fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label for="fechaNacimiento"><h4><span class="label label-default">Fecha nacimiento:</span></h4></label>
            <datepicker v-model="empleado.fechaNacimiento" id="fechaNacimiento" :disabled-days-of-week=[0]
                        :format="'dd/MM/yyyy'"
                        :placeholder="'Fecha'" width="100%" :clear-button="true"></datepicker>
          </div>
          <div class="col-md-6">
            <h5>Dni</h5>
            <fg-input type="text"
                      label=""
                      :disabled="false"
                      placeholder="Dni"
                      v-model="empleado.dni"
                      required
            >
            </fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <h5>Domicilio</h5>
            <fg-input type="text"
                      label=""
                      :disabled="false"
                      placeholder="Domicilio"
                      v-model="empleado.domicilio"
                      required
            >
            </fg-input>
          </div>
        </div>
        <hr>
        <div class="text-center">
          <button type="submit" class="btn btn-success btn-fill btn-wd">
            Guardar
          </button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </div>
</template>
<script>
  import {datepicker} from 'vue-strap'
  import api from 'src/api/services/empleadoServices'
  import noti from 'src/api/notificationsService'
  import sele from 'vue-strap/src/Select.vue'
  import check from 'vue-strap/src/Checkbox.vue'

  export default {
    components: {
      sele,
      check,
      datepicker
    },
    data () {
      return {
        empleado: {
          idEmpleados: '',
          nombre: '',
          apellido: '',
          dni: '',
          fechaNacimiento: new Date().toLocaleDateString('es-AR', {year: '2-digit', month: '2-digit', day: '2-digit'}),
          domicilio: ''
        }
      }
    },
    props: {
      edit: Boolean,
      id: Number
    },
    mounted () {
      this.cargarEmpleado()
    },
    methods: {
      guardarEmpleado () {
        if (!this.edit) {
          api.postEmpleado(this, this.empleado)
            .then(res => {
              if (res) {
                noti.exitoConTexto(this, 'Éxito', 'Empleado guardado con éxito!')
                this.limpiarCampos()
              } else {
                noti.errorConTexto(this, 'Error', 'Error al guardar el empleado')
              }
            })
        } else {
          api.editEmpleado(this, this.empleado)
            .then(res => {
              if (res) {
                noti.exitoConTexto(this, 'Éxito', 'Empleado guardado con éxito!')
                this.limpiarCampos()
              } else {
                noti.errorConTexto(this, 'Error', 'Error al guardar el empleado')
              }
            })
        }
      },
      cargarEmpleado () {
        if (this.id !== 0 && this.edit) {
          api.getEmpleadoo(this, this.id).then(empleado => {
            console.log('EMpleadu' + empleado)
            this.empleado.idEmpleados = empleado.idEmpleados
            this.empleado.nombre = empleado.nombre
            this.empleado.apellido = empleado.apellido
            this.empleado.dni = empleado.dni
            this.empleado.fechaNacimiento = new Date(empleado.fechaNacimiento).toLocaleDateString('es-AR', {year: '2-digit', month: '2-digit', day: '2-digit'})
            this.empleado.domicilio = empleado.domicilio
          })
        }
      },
      limpiarCampos () {
        this.empleado.idEmpleados = null
        this.empleado.nombre = null
        this.empleado.apellido = null
        this.empleado.dni = null
        this.empleado.fechaNacimiento = new Date().toLocaleDateString('es-AR', {year: '2-digit', month: '2-digit', day: '2-digit'})
        this.empleado.domicilio = null
      }
    }
  }
</script>
<style>

</style>
