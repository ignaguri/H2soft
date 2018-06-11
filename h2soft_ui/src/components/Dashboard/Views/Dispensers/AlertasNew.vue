<template>
  <div class="card">
    <div class="content">
      <form name="new_alerta_form" @submit.prevent="guardarAlerta">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <!--<label for="cliente"><h4><span class="label label-default">Cliente</span></h4></label>-->
              <!--<h5>Cliente</h5>-->
              <slot name="label"><label class="control-label">Cliente</label></slot>
              <dds id="cliente" v-model="idClientes"
                   :options="clientes"
                   options-value="idClientes"
                   options-label="razonSocial"
                   search-text="Buscar"
                   :placeholder="'Seleccione un cliente'"
                   :search="true" :justified="true" required>
              </dds>
              <!--<label for="objetiv"><h4><span class="label label-default">Objetivo</span></h4></label>-->
              <slot name="label"><label class="control-label">Objetivo</label></slot>
              <!--<h5>Objetivo</h5>-->
              <dds id="objetiv" v-model="alerta.idObjetivo"
                   :options="objetivos"
                   options-value="idObjetivosXCliente"
                   options-label="nombre"
                   search-text="Buscar"
                   :placeholder="'Seleccione un objetivo'"
                   :search="true" :min-search="4" :justified="true"
                   @input="cargarDispensers" required>
              </dds>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <!--<label for="tipo"><h4><span class="label label-default">Tipo</span></h4></label>-->
              <slot name="label"><label class="control-label">Tipo</label></slot>
              <!--<h5>Tipo</h5>-->
              <dds id="tipo" v-model="alerta.idTipo"
                   :options="tipos"
                   options-value="idTipoAlerta"
                   options-label="nombre"
                   search-text="Buscar"
                   :placeholder="'Seleccione un tipo'"
                   :search="true" :min-search="4" :justified="true"
                   required>
              </dds>
              <template v-if="alerta.idTipo === 1">
                <!--<label for="dispenser"><h4><span class="label label-default">Dispenser</span></h4></label>-->
                <slot name="label"><label class="control-label">Dispenser</label></slot>
                <!--<h5>Dispenser</h5>-->
                <dds id="dispenser" v-model="alerta.idDispenser"
                     :options="dispensers"
                     options-value="idDispensers"
                     options-label="codigo"
                     search-text="Buscar"
                     :placeholder="'Seleccione un dispenser'"
                     :search="true" :min-search="4" :justified="true"
                     @input="cargarMensaje" required>
                </dds>
              </template>
              <template v-else-if="alerta.idTipo === 2">
                <!--<label for="producto"><h4><span class="label label-default">Producto</span></h4></label>-->
                <slot name="label"><label class="control-label">Producto</label></slot>
                <!--<h5>Producto</h5>-->
                  <dds id="producto" v-model="alerta.producto"
                     :options="productos"
                     options-value="idProductos"
                     options-label="nombre"
                     search-text="Buscar"
                     :placeholder="'Seleccion un producto'"
                     :search="true" :justified="true"
                     required>
                </dds>
                <!--<label for="cantidad"><h4><span class="label label-default">Cantidad</span></h4></label>-->
                <slot name="label"><label class="control-label">Cantidad</label></slot>
                <!--<h5>Cantidad</h5>-->
                <dds id="cantidad" v-model="alerta.cantidad"
                     :options="cantidad"
                     options-value="index"
                     options-label="number"
                     search-text="Ingrese cantidad"
                     :placeholder="'Ingrese una cantidad'"
                     :search="true" :justified="true"
                     @input="cargarMensaje" required>
                </dds>
                <!-- <input type="number" id="bidones" class="form-control border-input" min="0" max="100"
                       v-model="alerta.bidones" style="max-width: 100px" @input="cargarMensaje" required/> -->
              </template>
              <template v-if="alerta.idTipo === 3">
                <!--<label for="desvin_dispenser"><h4><span class="label label-default">Dispenser</span></h4></label>-->
                <slot name="label"><label class="control-label">Dispenser</label></slot>
                <!--<h5>Dispenser</h5>-->
                <dds id="desvin_dispenser" v-model="alerta.idDispenser"
                     :options="dispensers"
                     options-value="idDispensers"
                     options-label="codigo"
                     search-text="Buscar"
                     :placeholder="'Seleccione un dispenser'"
                     :search="true" :justified="true"
                     @input="cargarMensaje" required>
                </dds>
              </template>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8 col-md-offset-2">
            <h5>Mensaje</h5>
            <fg-input type="text"
                      label=""
                      :disabled="true"
                      placeholder="Seleccione un tipo de alerta"
                      v-model="alerta.notificacion"
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
  import apiRecorridos from 'src/api/services/recorridoServices'
  import apiDispensers from 'src/api/services/dispensersServices'
  import api from 'src/api/services/alertasServices'
  import noti from 'src/api/notificationsService'
  import { select } from 'vue-strap'

  export default {
    components: {
      dds: select
    },
    data () {
      return {
        alerta: {
          idObjetivo: null,
          idTipo: null,
          notificacion: '',
          idDispenser: null,
          producto: null,
          cantidad: null,
          idEstado: 1,
          isDesvinculacion: false
        },
        clientes: [],
        idClientes: null,
        objetivos: [],
        tipos: [],
        dispensers: [],
        productos: []
      }
    },
    props: {
      id: Number
    },
    mounted () {
      this.cargarClientes()
      this.cargarTiposAlerta()
      this.cargarProductos()
    },
    computed: {
      cantidad: function () {
        const cantidad = []
        for (let i in [...Array(100).keys()]) {
          cantidad.push({
            index: i,
            number: i
          })
        }
        return cantidad
      }
    },
    watch: {
      idClientes: function () {
        this.cargarObjetivos()
      }
    },
    methods: {
      cargarClientes () {
        apiRecorridos.getClientes(this)
          .then(r => {
            this.clientes = r
          })
      },
      cargarObjetivos () {
        if (this.idClientes !== null) {
          apiRecorridos.getObjetivos(this, this.idClientes)
            .then(r => {
              this.objetivos = r
            })
        } else {
          this.objetivos = null
        }
      },
      cargarTiposAlerta () {
        api.getTipos(this)
          .then(r => {
            this.tipos = r
          })
      },
      cargarDispensers () {
        if (this.alerta.idObjetivo !== null) {
          apiDispensers.getDispensersXObjetivo(this, this.alerta.idObjetivo)
            .then(r => {
              this.dispensers = r
            })
        } else {
          this.dispensers = null
        }
      },
      cargarProductos () {
        api.getProductos(this)
          .then(r => {
            this.productos = r
          })
      },
      cargarMensaje (e) {
        const dispenser = this.dispensers.find(d => d.idDispensers === this.alerta.idDispenser)
        const objetivo = this.objetivos.find(o => o.idObjetivosXCliente === this.alerta.idObjetivo)
        const producto = this.productos.find(o => o.idProductos === this.alerta.producto)
        if (!objetivo) {
          this.alerta.notificacion = ''
          return
        }
        switch (this.alerta.idTipo) {
          case 1:
            if (dispenser) {
              this.alerta.notificacion = `Retirar dispenser ${dispenser.codigo} en ${objetivo.nombre} para mantenimiento`
            } else {
              this.alerta.notificacion = ''
            }
            break
          case 2:
            if (producto) {
              this.alerta.notificacion = `Llevar ${this.alerta.cantidad} ${producto.nombre} a ${objetivo.nombre}`
            } else {
              this.alerta.notificacion = ''
            }
            break
          case 3:
            if (dispenser) {
              this.alerta.notificacion = `Desvincular dispenser ${dispenser.codigo} de ${objetivo.nombre}`
            } else {
              this.alerta.notificacion = ''
            }
            break
          default:
            this.alerta.notificacion = 'Seleccione un tipo de alerta'
        }
      },
      guardarAlerta () {
        api.postAlerta(this, this.alerta)
          .then(r => {
            if (r) {
              noti.exitoConTexto(this, 'Éxito', 'Alerta guardada con éxito!')
              this.$parent.isAlertasList = true
              location.reload()
            } else {
              noti.errorConTexto(this, 'Error', 'Error al guardar alerta')
            }
          })
      }
    }
  }
</script>
<style>

</style>
