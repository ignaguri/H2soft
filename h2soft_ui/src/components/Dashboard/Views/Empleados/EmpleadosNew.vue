<template>
  <div class="card">
    <div class="header">
      <h4 class="title" v-if="!edit">Agregar nuevo empleado</h4>
      <h4 class="title" v-if="edit">Editar empleado</h4>
    </div>
    <div class="content">
      <form name="new_camion_form" @submit.prevent="guardarEmpleado">
        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="Nombre"
                      :disabled="false"
                      placeholder="Nombre"
                      v-model="empleado.nombre"
                      required
            >
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input type="text"
                      label="Apellido"
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
            <!--<label for="fechaNacimiento"><h4><span class="label label-default">Fecha nacimiento</span></h4></label>-->
            <slot name="label"><label class="control-label">Fecha de nacimiento</label></slot>
            <p></p>
            <datepicker v-model="empleado.fechaNacimiento" id="fechaNacimiento" :disabled-days-of-week=[0]
                        :format="'dd/MM/yyyy'"
                        :placeholder="'Fecha'" width="100%" :clear-button="true"></datepicker>
          </div>
          <div class="col-md-6">
            <fg-input type="text"
                      label="DNI"
                      :disabled="false"
                      placeholder="DNI"
                      v-model="empleado.dni"
                      required
            >
            </fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label>Domicilio</label>
            <vga ref="obAddress"
                 id="objetiv"
                 classname="form-control border-input"
                 placeholder="Ingrese el domicilio"
                 v-on:placechanged="getAddressData"
                 country="ar">
            </vga>
          </div>
            <div class="col-md-6">
              <fg-input type="number"
                        label="Teléfono"
                        :disabled="false"
                        placeholder="Teléfono"
                        v-model="empleado.telefono"
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
  import {datepicker, select} from 'vue-strap'
  import api from 'src/api/services/empleadoServices'
  import noti from 'src/api/notificationsService'
  import sele from 'vue-strap/src/Select.vue'
  import check from 'vue-strap/src/Checkbox.vue'
  import VueGoogleAutocomplete from 'vue-google-autocomplete'

  export default {
    components: {
      sele,
      check,
      datepicker,
      dds: select,
      vga: VueGoogleAutocomplete
    },
    data () {
      return {
        empleado: {
          idEmpleados: '',
          nombre: '',
          apellido: '',
          dni: '',
          fechaNacimiento: new Date().toLocaleDateString('es-AR', {year: '2-digit', month: '2-digit', day: '2-digit'}),
          idLocalidad: null,
          obAddress: '',
          direccion: '',
          localidad: '',
          telefono: ''
        },
        localidades: []
      }
    },
    props: {
      edit: Boolean,
      id: Number
    },
    mounted () {
      this.cargarLocalidades()
      this.cargarEmpleado()
    },
    methods: {
      cargarLocalidades () {
        api.getLocalidad(this)
          .then(r => {
            this.localidades = r
          })
      },
      guardarEmpleado () {
        if (!this.edit) {
          let fecha = this.empleado.fechaNacimiento.split('/')
          this.empleado.fechaNacimiento = fecha[1] + '/' + fecha[0] + '/' + fecha[2]
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
          let fecha = this.empleado.fechaNacimiento.split('/')
          this.empleado.fechaNacimiento = fecha[1] + '/' + fecha[0] + '/' + fecha[2]
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
            this.empleado.direccion = empleado.direccion
            this.empleado.localidad = empleado.localidad
            this.empleado.telefono = empleado.telefono
          })
        }
      },
      limpiarCampos () {
        this.empleado.idEmpleados = null
        this.empleado.nombre = null
        this.empleado.apellido = null
        this.empleado.dni = null
        this.empleado.fechaNacimiento = new Date().toLocaleDateString('es-AR', {year: '2-digit', month: '2-digit', day: '2-digit'})
        this.empleado.direccion = null
        this.empleado.localidad = null
        this.empleado.telefono = null
        this.$refs.obAddress.clear()
      },
      getAddressData (addressData, placeResultData) {
        console.log('addressData:', addressData)
        console.log('placeresultdata:', placeResultData)
        this.empleado.direccion = addressData.route.concat(addressData.street_number !== undefined ? ' ' + addressData.street_number : ' ' + 'S/N')
        this.empleado.localidad = addressData.locality !== undefined ? addressData.locality : addressData.administrative_area_level_1
      }
    }
  }
</script>
<style>

</style>
