<template>
  <div class="card">
    <div class="header">
      <h3 class="title" >Agregar nuevo Ingreso/Egreso</h3>
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
            <label for="medio-de-pago-cobro"><h4><span class="label label-default">Medio de Pago/Cobro:</span></h4></label>
            <select id="medio-de-pago-cobro" v-model="ingresosEgresos.idMedioDePagoCobro" required>
              <option :value="null">Seleccione un medio de pago/cobro</option>
              <option v-for="medios in mediosDePagoCobro" v-bind:value="medios.idMediosDePagoCobro">
                {{ medios.nombre }}
              </option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="fecha"><h4><span class="label label-default">Fecha:</span></h4></label>
            <datepicker v-model="ingresosEgresos.fecha" id="fecha" :disabled-days-of-week=[0] :format="'dd/MM/yyyy'"  :placeholder="'fecha'" width="100%" :clear-button="true"></datepicker>
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
        </div>
        <hr>
        <div class="row">
          <div class="text-center">
            <button type="submit"  class="btn btn-success btn-fill btn-wd">
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
  import { datepicker } from 'vue-strap'
  import apiMPC from 'src/api/services/medioDePagoCobroService'
  import apiIE from 'src/api/services/ingresosEgresosServices'

  export default {
    components: {
      datepicker
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
          idMedioDePagoCobro: ''

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
    },
    methods: {
      cargarMedioDePagoCobro () {
        apiMPC.getMedioDePagoCobro(this).then(r => {
          this.mediosDePagoCobro = r.body.data
        })
      },
      guardarIngresoEgreso () {
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
      }
    }
  }
</script>
<style>

</style>
