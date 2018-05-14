<template>
  <div>
    <div class="col-md-12">
      <div class="card">
        <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns" :editButton="false" :erase="borrar">
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
    <modal effect="fade" width="50%" :value="showCustomModal" @ok="showCustomModal = ok()" title="Agregar cláusula">
      <div class="row">
        <div class="col-md-6">
          <label for="productos"><h4><span class="label label-default">Producto:</span></h4></label>
          <select id="productos" v-model="detalleContrato.idProducto">
            <option value="">Seleccione un producto</option>
            <option v-for="prod in productoss" v-bind:value="prod.idProductos">
              {{ prod.nombre }}
            </option>
          </select>
        </div>
        <div class="col-md-6">
          <label for="precio"><h4><span class="label label-default">Precio por unidad:</span></h4></label>
          <fg-input id="precio"
                    type="number"
                    placeholder="Precio"
                    v-model="detalleContrato.precioPorUnidad"
                    pattern="[0-9]+">
          </fg-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <label for="cantmin"><h4><span class="label label-default">Cant mínima de unidades:</span></h4></label>
          <fg-input id="cantmin"
                    type="number"
                    placeholder="Cantidad Minima"
                    v-model="detalleContrato.cantidadMinima"
                    pattern="[0-9]+"
                    min="1">
          </fg-input>
        </div>
        <div class="col-md-6">
          <label for="cantmax"><h4><span class="label label-default">Cant máxima de unidades:</span></h4></label>
          <fg-input id="cantmax"
                    type="number"
                    placeholder="Cantidad Maxima"
                    v-model="detalleContrato.cantidadMaxima"
                    pattern="[0-9]+">
          </fg-input>
        </div>
      </div>
      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-default" @click="showCustomModal = false">Salir</button>
        <button type="button" class="btn btn-success" @click="showCustomModal = ok()">Guardar</button>
      </div>
    </modal>
    </div>
</template>
<script>
  import PaperTable from 'components/UIComponents/PaperTablePlus.vue'
  import api from 'src/api/services/contratosServices'
  import { modal } from 'vue-strap'
  import noti from 'src/api/notificationsService'

  const tableColumns = ['Producto', 'Cantidad desde', 'Cantidad hasta', 'Precio']

  export default {
    components: {
      PaperTable,
      modal
    },
    data () {
      return {
        showCustomModal: false,
        detalleContrato: {
          // idDetallesContrato: '',
          idProducto: '',
          cantidadMaxima: '',
          cantidadMinima: '',
          precioPorUnidad: ''
        },
        productoss: {},
        table1: {
          title: 'Detalle de contrato',
          subTitle: 'Lista de cláusulas por contrato',
          columns: [...tableColumns],
          data: []
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
          this.table1.data.push({
            // nro: det.idDetallesContrato,
            producto: this.cargarProducto(det.idProducto),
            cantidaddesde: det.cantidadMinima,
            cantidadhasta: det.cantidadMaxima,
            precio: det.precioPorUnidad
          })
        })
      },
      getProductos () {
        api.getProductosContratos(this)
          .then(res => {
            this.productoss = res
          })
      },
      borrar (e) {
        // let toDelete = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        let DeleteProducto = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        let toDeleteProducto = this.buscarIdProducto(DeleteProducto)
        let toDeleteCantidad = e.target.parentNode.parentNode.getElementsByTagName('td')[1].innerHTML
        // alert('prod: ' + toDeleteProducto + ', cant: ' + toDeleteCantidad)
        this.$emit('delete_detalle', toDeleteProducto, toDeleteCantidad)
      },
      ok () {
        if (this.detalleContrato.idProducto === '' || this.detalleContrato.cantidadMaxima === '' || this.detalleContrato.precioPorUnidad === '' || this.detalleContrato.cantidadMinima === '') {
         // alert('Debe completar todos los campos')
          noti.errorConTexto(this, 'Error', 'Debe completar todos los campos')
          return true
        }
        if (this.detalleContrato.cantidadMinima > this.detalleContrato.cantidadMaxima) {
          // alert('La cantidad mínima no puede ser mayor a la cantidad máxima')
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
        noti.exitoConTexto(this, 'Éxito', 'Se agregó un nuevo detalle')
        return false
      },
      cargarProducto (idProd) {
        for (let p = 0, len = this.productoss
          .length; p < len; p++) {
          if (this.productoss[p].idProductos === idProd) {
            return this.productoss[p].nombre
          }
        }
      },
      buscarIdProducto (nombreProdu) {
        for (let p = 0, len = this.productoss
          .length; p < len; p++) {
          if (this.productoss[p].nombre === nombreProdu) {
            return this.productoss[p].idProductos
          }
        }
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
