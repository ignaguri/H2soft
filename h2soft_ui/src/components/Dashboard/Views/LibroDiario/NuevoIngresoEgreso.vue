<template>
  <div class="card">
    <div class="header">
      <h3 class="title" v-if="!edit">Agregar nuevo Ingreso/Egreso</h3>
      <h3 class="title" v-if="edit">Modificar Ingreso/Egreso</h3>
    </div>
    <div class="content">
      <form name="nuevo_ingresoEgreso_Form" @submit.prevent="guardarIngresoEgreso">
        <div class="row">
          <div class="text-left">
            <button-group v-model="radioValue" type="info">
              <radio selected-value="egreso">Egreso</radio>
              <radio selected-value="ingreso">Ingreso</radio>
            </button-group>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label for="medio-de-pago-cobro"><h4><span class="label label-default">Medio de Pago:</span></h4></label>
            <select id="medio-de-pago-cobro" v-model="ingresosEgresos.idMedioDePagoCobro" required>
              <option :value="null">Seleccione un medio de pago</option>
              <option v-for="medios in mediosDePagoCobro" v-bind:value="medios.idMediosDePagoCobro">
                {{ medios.nombre }}
              </option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="fecha"><h4><span class="label label-default">Fecha:</span></h4></label>
            <datepicker v-model="ingresosEgresos.fecha" id="fecha" :disabled-days-of-week=[0] :format="'dd/MM/yyyy'"
                        :placeholder="'fecha'" width="100%" :clear-button="true"></datepicker>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="Descripcion"
                      placeholder="Descripcion"
                      v-model="ingresosEgresos.descripcion"
                      required>
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input label="Monto"
                      type="number"
                      placeholder="Monto"
                      v-model="ingresosEgresos.monto"
                      :disabled="edit"
                      required>
            </fg-input>
          </div>
        </div>
        <div class="row" v-if="!cambiarImagen && idGasto != -1">
          <div class="col-md-12">
            <img v-bind:src="this.ingresosEgresos.imagen" width="200" height="200"/>
            <button type="button" class="btn btn-default" @click="cambiarImagen = true">Cambiar imagen</button>
          </div>
        </div>
        <div class="row" v-if="idGasto == -1 || (idGasto !== -1 && cambiarImagen)">
          <div class="col-md-3">
            <h5>Imagen Comprobante</h5>
            <picture-input
              ref="pictureInput"
              @change="onChange"
              width="200"
              height="200"
              margin="10"
              accept="image/jpeg,image/png"
              size="5"
              buttonClass="btn"
              :removable=true
              :customStrings="{
        upload: '<h1>Bummer!</h1>',
        drag: 'Seleccionar una imagen',
        change: 'Cambiar imagen',
        remove: 'Eliminar imagen',
        fileSize: 'La imagen excede el límite permitido',}">
            </picture-input>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="text-center">
            <button type="submit" class="btn btn-success btn-fill btn-wd">
              Guardar
            </button>
          </div>
          <div class="clearfix"></div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  import {datepicker, buttonGroup, radio, select} from 'vue-strap'
  import apiMPC from 'src/api/services/medioDePagoCobroService'
  import apiIE from 'src/api/services/ingresosEgresosServices'
  import apiCT from 'src/api/services/cajaTotalServices'
  import pictureInput from 'vue-picture-input'
  import noti from 'src/api/notificationsService'

  export default {
    components: {
      datepicker,
      pictureInput,
      buttonGroup,
      radio,
      dds: select
    },
    data () {
      return {
        // se idGastos seria el ID de ingresoEgreso
        ingresosEgresos: {
          idGastos: '',
          fecha: new Date().toLocaleDateString(),
          descripcion: '',
          monto: '',
          idMedioDePagoCobro: '',
          imagen: ''
        },
        cajaTotal: {
          fecha: '',
          idMedioDePago: '',
          monto: ''
        },
        mediosDePagoCobro: {},
        radioValue: null
      }
    },
    props: {
      edit: Boolean,
      idGasto: Number,
      cambiarImagen: Boolean
    },
    mounted () {
      this.cargarMedioDePagoCobro()
      this.cargaIngresosEgresos2()
      this.checkMonto()
    },
    methods: {
      cargarMedioDePagoCobro () {
        apiMPC.getMedioDePagoCobro(this).then(r => {
          this.mediosDePagoCobro = r.body.data
        })
      },
      guardarIngresoEgreso () {
        if (this.idGasto === -1 && !this.edit) {
          if (this.radioValue === null) {
            // alert('Tiene que seleccionar un tipo de operacion')
            noti.errorConTexto(this, 'Error', 'Tiene que seleccionar un tipo de operacion')

            return
          }
          if (this.radioValue === 'egreso') {
            this.ingresosEgresos.monto = '-' + this.ingresosEgresos.monto
          }
          let fecha = this.ingresosEgresos.fecha.split('/')
          this.ingresosEgresos.fecha = fecha[1] + '/' + fecha[0] + '/' + fecha[2]

          apiIE.postIngresoEgreso(this, this.ingresosEgresos).then(res => {
            if (res) {
              noti.exito(this)
              // alert('ingresosEgresos guardado con éxito.')
              this.cajaTotal.idMedioDePago = this.ingresosEgresos.idMedioDePagoCobro
              this.cajaTotal.monto = this.ingresosEgresos.monto
              this.cajaTotal.fecha = this.ingresosEgresos.fecha
              apiCT.postCajaTotal(this, this.cajaTotal).then(res => {
                if (res) {
                  console.log('devolvió true en cajaTotal')
                } else {
                  console.log('Error al guardar el cajaTotal. ' + JSON.stringify(this.cajaTotal))
                  // alert('Error al guardar el cajaTotal. ' + JSON.stringify(this.cajaTotal))
                }
              })
              this.limpiarCampos()
            } else {
              noti.error(this)
              // alert('Error al guardar el ingresosEgresos.')
            }
          })
        } else {
          let fecha = this.ingresosEgresos.fecha.split('/')
          this.ingresosEgresos.fecha = fecha[1] + '/' + fecha[0] + '/' + fecha[2]

          apiIE.pathcIngresosEgresos(this, this.idGasto, this.ingresosEgresos).then(res => {
            if (res) {
              console.log('devolvió true en modificar ingresosEgresos')
              noti.exito(this)
              // alert('ingresosEgresos modificado con éxito.')
              this.limpiarCampos()
            } else {
              noti.error(this)
              console.log('devolvio false')
              // alert('Error al modificar el ingresosEgresos.')
            }
          })
        }
      },
      onChange (image) {
        if (image) {
          noti.info(this, '', '!Nueva imagen seleccionada!')
          this.ingresosEgresos.imagen = image
        } else {
          alert('FileReader API not supported: use the <form>, Luke!')
        }
      },
      cargaIngresosEgresos2 () {
        if (this.idGasto !== -1 && this.edit) {
          apiIE.getIngresoEgreso2(this, this.idGasto).then(ie => {
            this.ingresosEgresos.idMedioDePagoCobro = ie.idMedioDePagoCobro
            this.ingresosEgresos.monto = ie.monto
            this.ingresosEgresos.fecha = new Date(ie.fecha).toLocaleDateString()
            this.ingresosEgresos.descripcion = ie.descripcion
            this.ingresosEgresos.idEmpleado = ie.idEmpleado
            this.ingresosEgresos.imagen = ie.imagen
          })
        }
      },
      checkMonto () {
        let ref = this.$refs.txt_monto
        console.log('chequeando cambio en edit', this.edit)
        console.log('el ref es', ref)
      },
      limpiarCampos () {
        this.ingresosEgresos.monto = null
        this.ingresosEgresos.fecha = new Date().toLocaleDateString()
        this.ingresosEgresos.idMedioDePagoCobro = null
        this.ingresosEgresos.descripcion = null
        this.ingresosEgresos.imagen = null
        this.radioValue = null
      }
    }
  }
</script>
<style>

</style>
