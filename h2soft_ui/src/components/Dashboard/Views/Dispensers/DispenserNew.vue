<template>
  <div class="card">
    <div class="header">
      <h4 class="title">Dispenser</h4>
    </div>
    <div class="content">
      <form name="new_dispenser_form" @submit.prevent="guardarDispenser">
        <div class="row">
          <div class="col-md-6">
            <h5>Código</h5>
            <fg-input type="text"
                      label=""
                      :disabled="false"
                      placeholder="Código"
                      v-model="dispenser.codigo"
                      required
                      >
            </fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <h5>Estado</h5>
            <div class="btn-group btn-group-justified">
              <sele id="estado" v-model="dispenser.idEstadoDispenser"
                    :options="dispensersEstados" @change="cambioEstado"
                    options-value="idEstadosDispenser"
                    search-text="Buscar" :placeholder="'Estado'"
                    options-label="nombre"
                    :disabled="this.edit"
                    :search="true" :justified="true" required>
              </sele>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <h5>Cliente</h5>
            <div class="btn-group btn-group-justified">
              <sele id="clienteDispenser" v-model="dispenser.idCliente" @change="cambioCliente"
                    :options="clientes" options-value="idClientes"
                    search-text="Buscar" placeholder="Cliente"
                    options-label="razonSocial" :multiple="false"
                    name=""  :search="true" :justified="true"
                    :disabled="!this.requiereObjetivo || this.edit"
                    :required="this.requiereObjetivo">
              </sele>
            </div>
          </div>
          <div class="col-md-6">
            <h5>Objetivo</h5>
            <div class="btn-group btn-group-justified">
              <sele id="objetivoDispenser" v-model="dispenser.idObjetivo"
                    :options="ObjetivosXCliente" options-value="idObjetivosXCliente"
                    search-text="Buscar" :placeholder="this.ObjetivosPlaceHolder"
                    options-label="nombre" :multiple="false"
                    :search="true" :justified="true"
                    :disabled="!this.requiereObjetivo || this.edit"
                    :required="this.requiereObjetivo">
              </sele>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6"  >
            <h5>Fecha de instalación</h5>
            <div v-if="this.edit">{{this.dispenser.fechaProxMantenimiento}}</div>
            <dp v-if="!this.edit" v-model="fechaInstalacion" :disabled-days-of-week=[0] :format="'dd/MM/yyyy'"  placeholder="Fecha" width="100%" :clear-button="true" ></dp>
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
  // import auth from 'src/api/auth'
  import api from 'src/api/services/dispensersServices'
  import apiClientes from 'src/api/services/clientServices'
  import noti from 'src/api/notificationsService'
  import sele from 'vue-strap/src/Select.vue'
  import check from 'vue-strap/src/Checkbox.vue'
  import { datepicker } from 'vue-strap'
  // import fgdrop from 'components/UIComponents/Inputs/formGroupDropDown.vue'

  export default {
    components: {
      sele,
      check,
      dp: datepicker
    },
    data () {
      return {
        dispenser: {
          idDispensers: '',
          codigo: '',
          idEstadoDispenser: null,
          idObjetivo: null,
          fechaProxMantenimiento: null
        },
        dispensersEstados: [],
        ObjetivosXCliente: [],
        clientes: [],
        ObjetivosPlaceHolder: 'Seleccione un cliente',
        fechaInstalacion: '',
        requiereObjetivo: false,
        codigoValido: false
      }
    },
    props: {
      edit: Boolean,
      id: Number
    },
    mounted () {
      this.cargarEstados()
      this.cargarClientes()
      this.cargarDispenser()
    },
    methods: {
      guardarDispenser () { // metodo para gurdar Dispenser, tanto nuevos como edición
        this.validarCodigoDispenser(this.dispenser.codigo).then(res => {
          if (res === true) {
            if (!this.edit) { // alta
              this.newDisp()
            } else { // edit
              this.editDisp()
            }
          } else {
            noti.errorConTexto(this, 'Error', 'El codigo ingresado ya se encuentra en uso.')
          }
        })
      },
      newDisp () {
        if (this.fechaInstalacion !== '') {
          const proxMant = this.fechaInstalacion.split('/')
          const date = new Date(proxMant[2], proxMant[1] - 1, proxMant[0])
          date.setMonth(date.getMonth() + 6)
          this.dispenser.fechaProxMantenimiento = date
        }
        api.postDispenser(this, this.dispenser).then(res => {
          if (res) {
            noti.exito(this)
            this.$parent.isDispensersList = true
          } else {
            noti.error(this)
          }
        })
      },
      editDisp () {
        this.dispenser = {
          'id': this.id,
          'codigo': this.dispenser.codigo
        }
        api.editDispenser(this, this.dispenser).then(res => {
          if (res) {
            noti.exito(this)
            this.$parent.edit = false
            this.$parent.idDispenser = 0
            this.$parent.isDispensersList = true
          } else {
            noti.error(this)
          }
        })
      },
      cargarEstados () { // devuelve el listado de estados
        api.getEstadosDispensers(this).then(res => {
          this.dispensersEstados = res
        }, error => {
          console.log('error ' + error)
        })
      },
      cargarClientes () { // devuelve el listado de clietnes
        apiClientes.getClientes(this).then(res => {
          this.clientes = res.body.data
          if (this.edit) {
            this.ObjetivosPlaceHolder = 'Objetivo'
          }
        }, error => {
          console.log('error ' + error)
        })
      },
      cargarDispenser () { // trae los datos de un disp
        if (this.id !== 0) {
          api.getDispenser(this, this.id).then(res => {
            this.dispenser.id = res.idDispensers
            this.dispenser.codigo = res.codigo
            this.dispenser.idEstadoDispenser = res.idEstadoDispenser
            if (res.fechaProxMantenimiento === null) {
              this.dispenser.fechaProxMantenimiento = 'No especificado'
            } else {
              let fecha = new Date(res.fechaProxMantenimiento)
              this.dispenser.fechaProxMantenimiento = fecha.toLocaleDateString('es-AR', { year: '2-digit', month: '2-digit', day: '2-digit' })
            }
            if (res.idObjetivo !== null) {
              apiClientes.getObjetivo(this, res.idObjetivo)
                .then(obj => {
                  this.ObjetivosXCliente = obj.body.data
                  this.dispenser.idObjetivo = res.idObjetivo
                  this.dispenser.idCliente = obj.body.data[0].idCliente
                })
            }
          }, error => {
            console.log('error ' + error)
          })
        }
      },
      cambioCliente (value) {
        apiClientes.getObjetivos(this, value)
          .then(res => {
            this.ObjetivosXCliente = res
            if (res[0] !== null) {
              this.ObjetivosPlaceHolder = 'Objetivos'
            }
          }, error => {
            console.log('error ' + error)
          })
      },
      cambioEstado (value) {
        if (value === 2 || value === 3) { // si el estado es "en objetivo y..." habilito el cliente y el objetivo, y los hago requeridos
          this.requiereObjetivo = true
        } else {
          this.requiereObjetivo = false
        }
      },
      validarCodigoDispenser (codigo) {
        return api.getCodigosDispensers(this)
         .then(res => {
           if (res !== []) {
             if (!this.edit) {
               for (var i = 0, len = res.length; i < len; i++) {
                 if (res[i].codigo === codigo) {
                   return false
                 }
               }
             } else {
               for (var j = 0, len2 = res.length; j < len2; j++) {
                 if (res[j].codigo === codigo && res[j].id !== this.id) {
                   return false
                 }
               }
             }
           }
           console.log('el codigo ingresado es válido')
           return true
         })
      }
    }
  }
</script>
<style>

</style>
