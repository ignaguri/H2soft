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
          Agregar Restriccion
        </button>
      </div>
    </div>
    <modal effect="fade" width="50%" :value="showCustomModal" @ok="showCustomModal = ok()" title="Agregar Restriccion">
      <div class="row">
        <!--
        <div class="col-md-6">
          <label for="productos">Producto</label>
          <select id="productos" v-model="detalleContrato.idProductos">
            <option value="">Seleccione un producto</option>
            <option v-for="prod in productoss" v-bind:value="prod.idProductos">
              {{ prod.nombre }}
            </option>
          </select>
        </div>
        -->
        <div class="col-md-6">
          <fg-input type="number"
                    label="idProducto"
                    placeholder="id"
                    v-model="detalleContrato.idProductos"
                    required>
          </fg-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <fg-input type="number"
                    label="Precio por unidad"
                    placeholder="Precio"
                    v-model="detalleContrato.precioPorUnidad"
                    required>
          </fg-input>
        </div>
        <div class="col-md-6">
          <fg-input type="number"
                    label="Cantidad del producto"
                    placeholder="Cantidad"
                    v-model="detalleContrato.cantidadMaxima"
                    required>
          </fg-input>
        </div>
        {{ productoss }}
      </div>
      {{ detalleContrato }}
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

  const tableColumns = ['Producto', 'Cantidad', 'Precio']

  export default {
    components: {
      PaperTable,
      modal
    },
    data () {
      return {
        showCustomModal: false,
        detalleContrato: {
          idProductos: '',
          cantidadMaxima: '',
          precioPorUnidad: ''
        },
        productoss: {},
        table1: {
          title: 'Detalle de Contrato',
          subTitle: 'Lista de restricciones por contrato',
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
      detalle: function changer () {
        this.cargarDetalles()
      }
    },
    mounted () {
      this.cargarDetalles()
      this.getProductos()
    },
    methods: {
      cargarDetalles () {
        api.getDetalleContrato(this, this.idContrato).then(res => {
          res.forEach(det => {
            this.table1.data.push({
              id: det.idProductos,
              cant: det.cantidadMaxima,
              PrecioPorUnid: det.precioPorUnidad
            })
          })
        }, error => {
          alert('error:' + JSON.stringify(error))
        })
      },
      getProductos () {
        api.getProductosContratos(this)
          .then(res => {
            this.productoss = res
          })
      },
      borrar (e) {
        let toDelete = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        alert('borrar name: ' + toDelete)
        this.$emit('delete_detalle', toDelete)
      },
      ok () {
        if (this.detalleContrato.idProductos === '' || this.detalleContrato.cantidadMaxima === '' || this.detalleContrato.precioPorUnidad === '') {
          alert('Debe completar todos los campos')
          return true
        }
        this.$emit('nuevo_detalle', { idProducto: this.detalleContrato.idProducto, cantidadMaxima: this.detalleContrato.cantidadMaxima, precioPorUnidad: this.detalleContrato.precioPorUnidad })
        alert('se agrego un nuevo detalle')
        return false
      }
    }
  }
</script>
<style>

</style>
