<template>
  <div>
    <div class="col-md-12">
      <div class="card">
        <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns" :editButton="false" :erase="borrar_confirm">
        </paper-table>
      </div>
    </div>
    <div class="col-md-4 col-md-offset-8">
      <div class="text-center">
        <button type="button" class="btn btn-info btn-fill btn-wd" @click="showCustomModal = true">
          Agregar cláusula
        </button>
      </div>
    </div>
    <modal effect="fade" width="50%" :backdrop="false" :value="showCustomModal" @ok="showCustomModal = ok()" title="Agregar cláusula">
      <div class="row">
        <div class="col-md-6">
          <!--<label for="producto"><h4><span class="label label-default">Producto</span></h4></label>-->
          <slot name="label"><label class="control-label">Producto</label></slot>
          <p>

          </p>
          <dds id="producto" v-model="detalleContrato.idProducto"
               :options="productos"
               options-value="idProductos"
               options-label="nombre"
               search-text="Buscar"
               placeholder="Seleccione un producto"
               :search="true" :justified="true">
          </dds>
        </div>
        <div class="col-md-6">
          <!--<label for="productos"><h4><span class="label label-default">Precio</span></h4></label>-->
          <slot name="label"><label class="control-label">Precio</label></slot>
          <money id="importe" v-model="detalleContrato.precioPorUnidad" v-bind="money" class="form-control"></money>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <!--<label for="cantmin"><h4><span class="label label-default">Cant. mínima de unidades:</span></h4></label>-->
          <slot name="label"><label class="control-label">Cant. mínima de unidades</label></slot>
          <fg-input id="cantmin"
                    type="number"
                    placeholder="Cantidad mínima"
                    v-model="detalleContrato.cantidadMinima"
                    min="1">
          </fg-input>
        </div>
        <div class="col-md-6">
          <!--<label for="cantmax"><h4><span class="label label-default">Cant. máxima de unidades:</span></h4></label>-->
          <slot name="label"><label class="control-label">Cant. máxima de unidades</label></slot>
          <fg-input id="cantmax"
                    type="number"
                    placeholder="Cantidad máxima"
                    v-model="detalleContrato.cantidadMaxima"
                    :min="detalleContrato.cantidadMinima">
          </fg-input>
        </div>
      </div>
      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-default" @click="showCustomModal = false">Salir</button>
        <button type="button" class="btn btn-success" @click="showCustomModal = ok()">Guardar</button>
      </div>
    </modal>
    <modal effect="fade" width="50%" :backdrop="false" :value="showCustomModalBorrar" @ok="showCustomModal = borrar()" title="Confirmación">
      <div class="row">
        <div class="col-md-12">
          <div>¿Desea borrar la cláusula del contrato?</div>
        </div>
      </div>
      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-default" @click="showCustomModalBorrar = false">Cancelar</button>
        <button type="button" class="btn btn-success" @click="borrar()">Aceptar</button>
      </div>
    </modal>
    </div>
</template>
<script>
  import PaperTable from 'components/UIComponents/PaperTablePlus.vue'
  import api from 'src/api/services/contratosServices'
  import { modal, select } from 'vue-strap'
  import noti from 'src/api/notificationsService'
  import {Money} from 'v-money'

  const tableColumns = ['Producto', 'Cantidad desde', 'Cantidad hasta', 'Precio']

  export default {
    components: {
      PaperTable,
      modal,
      dds: select,
      Money

    },
    data () {
      return {
        showCustomModal: false,
        showCustomModalBorrar: false,
        detalleContrato: {
          // idDetallesContrato: '',
          idProducto: '',
          cantidadMaxima: ' ',
          cantidadMinima: ' ',
          precioPorUnidad: ' '
        },
        productoss: {},
        productos: [],
        table1: {
          title: 'Detalle de contrato',
          subTitle: 'Lista de cláusulas por contrato',
          columns: [...tableColumns],
          data: []
        },
        toDeleteProducto: 0,
        toDeleteCantidad: '',
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
      idContrato: {
        type: Number,
        default: 0
      },
      edit: {
        type: Boolean,
        default: false
      },
      detalles: {
        type: Array
      }
    },
    watch: {
      detalles: function changer () {
        this.cargarDetalles()
      }
    },
    mounted () {
      this.cargarDetalles()
      this.getProductos()
    },
    methods: {
      cargarDetalles () {
        this.table1.data = []
        this.detalles.forEach(det => {
//          console.log('detalle', det)
          this.table1.data.push({
            // nro: det.idDetallesContrato,
            producto: this.cargarProducto(det.idProducto),
            cantidaddesde: det.cantidadMinima,
            cantidadhasta: det.cantidadMaxima,
            precio: '$ ' + det.precioPorUnidad
          })
        })
      },
      getProductos () {
        api.getProductosContratos(this)
          .then(res => {
            this.productos = res
          })
      },
      borrar () {
        // let toDelete = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        // let DeleteProducto = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        // let toDeleteProducto = this.buscarIdProducto(DeleteProducto)
        // let toDeleteCantidad = e.target.parentNode.parentNode.getElementsByTagName('td')[1].innerHTML
        // alert('prod: ' + toDeleteProducto + ', cant: ' + toDeleteCantidad)
        this.$emit('delete_detalle', this.toDeleteProducto, this.toDeleteCantidad)
        this.showCustomModalBorrar = false
      },
      borrar_confirm (e) {
        console.log(e)
        let DeleteProducto = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        let toDeleteProducto = this.buscarIdProducto(DeleteProducto)
        let toDeleteCantidad = e.target.parentNode.parentNode.getElementsByTagName('td')[1].innerHTML
        this.toDeleteCantidad = toDeleteCantidad
        this.toDeleteProducto = toDeleteProducto
        this.showCustomModalBorrar = true
      },
      ok () {
        if (this.detalleContrato.idProducto === '' || this.detalleContrato.cantidadMaxima === '' || this.detalleContrato.cantidadMinima === '' || this.detalleContrato.precioPorUnidad === 0) {
          noti.infoConTexto(this, 'Alerta', 'Debe completar todos los campos')
          return true
        }
        if (Number(this.detalleContrato.cantidadMinima) > Number(this.detalleContrato.cantidadMaxima)) {
          console.log(this.detalleContrato.cantidadMinima + ' ' + this.detalleContrato.cantidadMaxima)
          noti.errorConTexto(this, 'Error', 'La cantidad mínima no puede ser mayor a la cantidad máxima')
          return true
        }
        /*
        if (parseInt(this.detalles.precioPorUnidad) < 0) {
          alert('No puede ingresar valores negativos')
          return true
        }
        */
        // this.$emit('nuevo_detalle', { id: this.detalleContrato.idDetallesContrato, idProducto: this.detalleContrato.idProducto, cantidadMaxima: this.detalleContrato.cantidadMaxima, cantidadMinima: this.detalleContrato.cantidadMinima, precioPorUnidad: this.detalleContrato.precioPorUnidad })
        this.$emit('nuevo_detalle', {
          idProducto: this.detalleContrato.idProducto,
          cantidadMinima: this.detalleContrato.cantidadMinima,
          cantidadMaxima: this.detalleContrato.cantidadMaxima,
          precioPorUnidad: this.detalleContrato.precioPorUnidad
        })
        noti.exitoConTexto(this, 'Éxito', 'Se agregó un nuevo detalle!')
        this.limpiarCampos()
        return false
      },
      cargarProducto (idProd) {
        for (let p = 0, len = this.productos
          .length; p < len; p++) {
          if (this.productos[p].idProductos === idProd) {
            return this.productos[p].nombre
          }
        }
      },
      buscarIdProducto (nombreProdu) {
        for (let p = 0, len = this.productos
          .length; p < len; p++) {
          if (this.productos[p].nombre === nombreProdu) {
            return this.productos[p].idProductos
          }
        }
      },
      limpiarCampos () {
        this.detalleContrato.idProducto = null
        this.detalleContrato.cantidadMaxima = ''
        this.detalleContrato.cantidadMinima = ''
        this.detalleContrato.precioPorUnidad = ''
      }
    }
  }
</script>
<style>
  valid {
    border: 3px solid green;
  }
  invalid {
    border: 3px solid red;
  }
</style>
