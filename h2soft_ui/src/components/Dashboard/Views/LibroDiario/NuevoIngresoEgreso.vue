<template>
  <div class="card">
    <div class="header">
      <h3 class="title" v-if="!edit">Agregar nuevo Ingreso/Egreso</h3>
      <h3 class="title" v-if="edit">Modificar Ingreso/Egreso</h3>
    </div>
    <div class="content">
      <form name="nuevo_ingresoEgreso_Form" @submit.prevent="guardarIngresoEgreso">
        <div class="row">
          <!--div-- class="text-left">
            <button-group v-model="radioValue" type="info">
              <radio selected-value="ingreso">Ingreso</radio>
              <radio selected-value="egreso">Egreso</radio>
            </button-group>
          </div!-->
          <div class="col-md-6">
            <input type="radio" id="ingreso" name="tipoOperacion" value="ingreso">
            <label for="ingreso">Ingreso</label>

            <input type="radio" id="egreso" name="tipoOperacion" value="egreso">
            <label for="egreso">Egreso</label>
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
                      label="IdEmpleado"
                      placeholder="IdEmplado"
                      v-model="ingresosEgresos.idEmpleado"
                      required>
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input label="Monto"
                      type="number"
                      placeholder="Monto"
                      v-model="ingresosEgresos.monto"
                      required>
            </fg-input>
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
          <picture-input
            ref="pictureInput"
            @change="onChange"
            width="200"
            height="200"
            margin="16"
            accept="image/jpeg,image/png"
            size="10"
            buttonClass="btn"
            :customStrings="{
        upload: '<h1>Bummer!</h1>',
        drag: 'Seleccionar una imagen' }">

          </picture-input>
          {{ ingresosEgresos }}
          {{ idGasto }}
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
  import {datepicker} from 'vue-strap'
  import apiMPC from 'src/api/services/medioDePagoCobroService'
  import apiIE from 'src/api/services/ingresosEgresosServices'
  import pictureInput from 'vue-picture-input'

  export default {
    components: {
      datepicker,
      pictureInput
    },
    data () {
      return {
        // se idGastos seria el ID de ingresoEgreso
        ingresosEgresos: {
          idGastos: '',
          fecha: '',
          idEmpleado: '',
          descripcion: '',
          monto: '',
          idMedioDePagoCobro: '',
          imagen: ''
        },
        mediosDePagoCobro: {},
        radioValue: 'ingreso'
      }
    },
    props: {
      edit: Boolean,
      idGasto: Number
    },
    mounted () {
      this.cargarMedioDePagoCobro()
      this.cargaIngresosEgresos2()
    },
    methods: {
      cargarMedioDePagoCobro () {
        apiMPC.getMedioDePagoCobro(this).then(r => {
          this.mediosDePagoCobro = r.body.data
        })
      },
      guardarIngresoEgreso () {
        if (this.idGasto === -1 && !this.edit) {
          if (document.nuevo_ingresoEgreso_Form.tipoOperacion[0].checked) {

          } else if (document.nuevo_ingresoEgreso_Form.tipoOperacion[1].checked) {
            this.ingresosEgresos.monto = '-' + this.ingresosEgresos.monto
          } else {
            alert('Tiene que seleccionar un tipo de operacion')
            return
          }

          let fecha = this.ingresosEgresos.fecha.split('/')
          this.ingresosEgresos.fecha = fecha[1] + '/' + fecha[0] + '/' + fecha[2]

          apiIE.postIngresoEgreso(this, this.ingresosEgresos).then(res => {
            if (res) {
              console.log('devolvió true en ingresosEgresos')
              alert('ingresosEgresos guardado con éxito.')
            } else {
              console.log('devolvio false')
              alert('Error al guardar el ingresosEgresos.')
            }
          })
        } else {
          let fecha = this.ingresosEgresos.fecha.split('/')
          this.ingresosEgresos.fecha = fecha[1] + '/' + fecha[0] + '/' + fecha[2]

          apiIE.pathcIngresosEgresos(this, this.idGasto, this.ingresosEgresos).then(res => {
            if (res) {
              console.log('devolvió true en modificar ingresosEgresos')
              alert('ingresosEgresos modificado con éxito.')
            } else {
              console.log('devolvio false')
              alert('Error al modificar el ingresosEgresos.')
            }
          })
        }
      },
      onChange (image) {
        if (image) {
          alert('Nueva Imagen Seleccionada!')
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
      }
    }
  }
</script>
<style>

</style>
