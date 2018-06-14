<template>
  <div class="card">
    <div class="header">
      <h3 class="title" v-if="!edit">Agregar nuevo Ingreso/Egreso</h3>
      <h3 class="title" v-if="edit">Modificar Ingreso/Egreso</h3>
    </div>
    <div class="content">
      <form name="nuevo_ingresoEgreso_Form" @submit.prevent="guardarIngresoEgreso">
        <div class="row">
          <div class="text-left" style="padding:10px">
            <button-group v-model="radioValue" type="info">
              <radio selected-value="egreso">Egreso</radio>
              <radio selected-value="ingreso">Ingreso</radio>
            </button-group>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <slot name="label"><label class="control-label">Medio de pago</label></slot>
            <dds id="medio-de-pago-cobro"
                 v-model="ingresosEgresos.idMedioDePagoCobro"
                 :options="mediosDePagoCobro"
                 options-value="idMediosDePagoCobro"
                 options-label="nombre"
                 search-text="Buscar"
                 :placeholder="'Seleccione un medio'"
                 :search="true" :justified="true" required>
            </dds>
          </div>
          <div class="col-md-6">
            <label class="control-label">Fecha</label>
            <datepicker v-model="ingresosEgresos.fecha" id="fecha" :disabled-days-of-week=[0] :format="'dd/MM/yyyy'"
                        :placeholder="'fecha'" width="100%" :clear-button="true"></datepicker>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="Descripción"
                      placeholder="Descripción"
                      v-model="ingresosEgresos.descripcion"
                      required>
            </fg-input>
          </div>
          <div class="col-md-6">
            <slot name="label"><label class="control-label">Importe</label></slot>
            <money id="importe" v-model="ingresosEgresos.monto" v-bind="money" class="form-control" :disabled="edit"></money>
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
            <h5>Imagen comprobante</h5>
            <picture-input
              ref="pictureInput"
              id="foto"
              @change="onChange"
              width="200"
              height="200"
              margin="10"
              accept="image/jpeg,image/png"
              size="5"
              :borrar="this.limpiarImagen"
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
  import {Money} from 'v-money'

  export default {
    components: {
      datepicker,
      pictureInput,
      buttonGroup,
      radio,
      dds: select,
      Money
    },
    data () {
      return {
        // se idGastos seria el ID de ingresoEgreso
        ingresosEgresos: {
          idGastos: '',
          fecha: new Date().toLocaleDateString('es-AR', {year: 'numeric', month: '2-digit', day: '2-digit'}),
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
        mediosDePagoCobro: [],
        radioValue: null,
        limpiarImagen: false,
        money: {
          decimal: ',',
          thousands: '.',
          prefix: '$ ',
          suffix: '',
          precision: 2,
          masked: false
        }
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
        apiMPC.getMedioDePagoCobro(this)
          .then(r => {
            this.mediosDePagoCobro = r
          })
      },
      guardarIngresoEgreso () {
        if (this.idGasto === -1 && !this.edit) {
          if (this.radioValue === null) {
            // alert('Tiene que seleccionar un tipo de operacion')
            noti.infoConTexto(this, 'Alerta', 'Tiene que seleccionar un tipo de operación')
            return
          }
          if (this.ingresosEgresos.monto === 0) {
            noti.infoConTexto(this, 'Alerta', 'El monto no puede ser cero')
            return
          }
          if (this.radioValue === 'egreso') {
            this.ingresosEgresos.monto = '-' + this.ingresosEgresos.monto
          }
          let fecha = this.ingresosEgresos.fecha.split('/')
          this.ingresosEgresos.fecha = fecha[1] + '/' + fecha[0] + '/' + fecha[2]

          apiIE.postIngresoEgreso(this, this.ingresosEgresos)
            .then(res => {
              if (res) {
                noti.exitoConTexto(this, 'Éxito', 'Ingreso/Egreso guardado con éxito!')
                // alert('ingresosEgresos guardado con éxito.')
                this.cajaTotal.idMedioDePago = this.ingresosEgresos.idMedioDePagoCobro
                this.cajaTotal.monto = this.ingresosEgresos.monto
                this.cajaTotal.fecha = this.ingresosEgresos.fecha
                apiCT.postCajaTotal(this, this.cajaTotal)
                  .then(res => {
                    if (res) {
                      console.log('devolvió true en cajaTotal')
                    } else {
                      console.log('Error al guardar el cajaTotal. ' + JSON.stringify(this.cajaTotal))
                      // alert('Error al guardar el cajaTotal. ' + JSON.stringify(this.cajaTotal))
                    }
                  })
                this.limpiarCampos()
              } else {
                noti.errorConTexto(this, 'Error', 'Error al guardar Ingreso/Egreso')
              }
            })
        } else {
          let fecha = this.ingresosEgresos.fecha.split('/')
          this.ingresosEgresos.fecha = fecha[1] + '/' + fecha[0] + '/' + fecha[2]

          apiIE.pathcIngresosEgresos(this, this.idGasto, this.ingresosEgresos)
            .then(res => {
              if (res) {
                noti.exitoConTexto(this, 'Éxito', 'Ingreso/Egreso actualizado con éxito!')
                this.limpiarCampos()
              } else {
                noti.error(this)
                noti.errorConTexto(this, 'Error', 'Error al modificar Ingreso/Egreso')
              }
            })
        }
      },
      onChange (image) {
        if (image) {
          this.ingresosEgresos.imagen = image
        } else {
          alert('FileReader API not supported: use the <form>, Luke!')
        }
      },
      cargaIngresosEgresos2 () {
        if (this.idGasto !== -1 && this.edit) {
          apiIE.getIngresoEgreso2(this, this.idGasto)
            .then(ie => {
              this.ingresosEgresos.idMedioDePagoCobro = ie.idMedioDePagoCobro
              this.ingresosEgresos.monto = ie.monto
              this.ingresosEgresos.fecha = new Date(ie.fecha).toLocaleDateString('es-AR', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit'
              })
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
        this.ingresosEgresos.monto = ''
        this.ingresosEgresos.fecha = new Date().toLocaleDateString('es-AR', {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit'
        })
        this.ingresosEgresos.idMedioDePagoCobro = null
        this.ingresosEgresos.descripcion = null
        this.ingresosEgresos.imagen = null
        this.radioValue = null
        this.limpiarImagen = !this.limpiarImagen
      }
    }
  }
</script>
<style>

</style>
