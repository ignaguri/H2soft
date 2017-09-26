<template>
  <div class="card">
    <div class="header">
      <h3 class="title">Agregar nuevo contrato</h3>
    </div>
    <div class="content">
      <form @submit.prevent="guardarContrato">
        <div class="row">
          <div class="col-md-6">
            <label for="clientes">Cliente</label>
            <select id="clientes" v-model="contrato.idCilente" required>
              <option value="">Seleccione un cliente</option>
              <option v-for="cli in clientes" v-bind:value="cli.idClientes">
                {{ cli.razonSocial }}
              </option>
            </select>
          </div>
        </div>
          <div class="row">
            <div class="col-md-6">
              <fg-input type="date"
                        label="Fecha de firma"
                        placeholder="Fecha"
                        v-model="contrato.fechaFirma"
                        required>
              </fg-input>
            </div>
            <div class="col-md-6">
              <fg-input type="date"
                        label="Fecha de vigencia"
                        placeholder="Fecha"
                        v-model="contrato.fechaVigencia"
                        required>
              </fg-input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <fg-input type="number"
                        label="Cantidad del producto"
                        placeholder="Cantidad"
                        v-model="contrato.cantidad"
                        required>
              </fg-input>
            </div>
            <div class="col-md-6">
              <fg-input type="number"
                        label="Precio por unidad"
                        placeholder="Precio"
                        v-model="contrato.precioPorUnidad"
                        required>
              </fg-input>
            </div>
          </div>
        <div class="row">
          <div class="col-md-6">
            <label for="productos">Producto</label>
            <select id="productos" v-model="contrato.idProducto" required>
              <option value="">Seleccione un producto</option>
              <option v-for="pro in productos" v-bind:value="pro.idProductos">
                {{ pro.nombre }}
              </option>
            </select>
          </div>
        </div>
          <hr>
           <div class="text-center">
             <button type="submit"  class="btn btn-success btn-fill btn-wd">
              Guardar contrato
             </button>
            </div>
          <div class="clearfix"></div>
      </form>
    </div>
  </div>
</template>
<script>
  import api from 'src/api/services/contratosServices'
  export default {
    data () {
      return {
        contrato: {
          idCilente: '',
          fechaFirma: '',
          fechaVigencia: '',
          cantidad: '',
          precioPorUnidad: '',
          idProducto: ''
        },
        clientes: {},
        productos: {},
        contrat: {}
      }
    },
    props: ['id'],
    mounted () {
      this.getClientes()
      this.getProductos()
      this.cargarContratos()
      /*
      if (this.id !== 0) {
        this.cargarContratos()
      }
      */
    },
    methods: {
      guardarContrato () {
        if (this.id === 0) {
          this.contrat = {
            idCilente: this.contrato.idCilente,
            fechaFirma: this.contrato.fechaFirma,
            fechaVigencia: this.contrato.fechaVigencia,
            cantidad: this.contrato.cantidad,
            precioPorUnidad: this.contrato.precioPorUnidad,
            idProducto: this.contrato.idProducto
          }
          api.postContratos(this, this.contrat).then(res => {
            if (res) {
              console.log('devolvió true en nuevoContrato')
              alert('Contrato guardado con exito')
            } else {
              console.log('devolvio false')
              alert('Error al guardar el contrato. check consola')
            }
          })
        } else {
          this.contrat = {
            id: this.id,
            idCilente: this.contrato.idCilente,
            fechaFirma: this.contrato.fechaFirma,
            fechaVigencia: this.contrato.fechaVigencia,
            cantidad: this.contrato.cantidad,
            precioPorUnidad: this.contrato.precioPorUnidad,
            idProducto: this.contrato.idProducto
          }
          api.editarContrato(this, this.contrat).then(res => {
            if (res) {
              alert('Contrato modificado con exito')
              this.$parent.current = 'UsersList'
              this.$parent.isUserList = true
            } else {
              console.log('devolvio false')
              alert('Error al modificar el contrato. check consola')
            }
          })
        }
        this.$parent.current = 'ContratosLista'
        this.$parent.isContratosList = true
      },
      getClientes () {
        api.getClientesContratos(this)
          .then(res => {
            this.clientes = res
          })
      },
      getProductos () {
        api.getProductosContratos(this)
          .then(res => {
            this.productos = res
          })
      },
      cargarContratos () {
        api.getContrato(this, this.id)
          .then(res => {
            res = res.body.data[0]
            this.contrato.idCilente = res.idCilente // Cambiar por el nombre del ciente
            this.contrato.fechaFirma = res.fechaFirma
            this.contrato.fechaVigencia = res.fechaVigencia
            this.contrato.cantidad = res.cantidad
            this.contrato.precioPorUnidad = res.precioPorUnidad
            this.contrato.idProducto = res.idProducto
          })
      }
    }
  }
</script>
<style>

</style>
