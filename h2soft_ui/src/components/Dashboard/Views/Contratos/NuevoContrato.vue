<template>
  <div class="card">
    <div class="header">
      <h3 class="title">Agregar nuevo contrato</h3>
    </div>
    <div class="content">
      <form @submit.prevent="guardarContrato" novalidate>
        <div class="row">
          <div class="col-md-6">
            <label for="clientes">Cliente</label>
            <select id="clientes" v-model="contrato.idCliente" required>
              <option value="">Seleccione un cliente</option>
              <option v-for="cli in clientes" v-bind:value="cli.idClientes">
                {{ cli.razonSocial }}
              </option>
            </select>
          </div>
          <div class="col-md-6">
            <fg-input type="date"
                      label="Fecha de firma"
                      placeholder="Fecha"
                      v-model="contrato.fechaFirma"
                      required>
            </fg-input>
          </div>
        </div>
          <div class="row">
            <div class="col-md-6">
              <fg-input type="date"
                        label="Fecha de vigencia desde"
                        placeholder="Fecha"
                        v-model="contrato.fechaVigenciaDesde"
                        required>
              </fg-input>
            </div>
            <div class="col-md-6">
              <fg-input type="date"
                        label="Fecha vigencia hasta"
                        placeholder="Fecha"
                        v-model="contrato.fechaVigenciaHasta"
                        required>
              </fg-input>
            </div>
          </div>
          <hr>
        <detalle-contrato :detalles="detalles" @nuevo_detalle="captarDetalle" @delete_detalle="borrarDetalle"></detalle-contrato>
        <div class="row">
        <div class="text-center">
             <button type="submit"  class="btn btn-success btn-fill btn-wd">
              Guardar contrato
             </button>
            </div>
          <div class="clearfix"></div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  // TODO: agregar columna de idDetalleContrato para poder borra solo un detalle
  // TODO: corregir error en  postContratos porque siepre termina con el .error la promesa
  // TODO: corregir en el modificar el contrato la parte de los detalles de contrato que da error el detalle.forEach
  // TODO: agrefar el nombre de producto en vez del idProducto
  import api from 'src/api/services/contratosServices'
  import DetalleContrato from './DetalleContrato.vue'
  export default {
    components: {
      DetalleContrato
    },
    data () {
      return {
        contrato: {
          idCilente: '',
          fechaFirma: '',
          fechaVigenciaDesde: '',
          fechaVigenciaHasta: ''
        },
        clientes: {},
        contrat: {},
        detalles: []
      }
    },
    props: {
      edit: Boolean,
      id: String
    },
    mounted () {
      this.getClientes()
      this.getProductos()
      this.cargarContratos2()
      /*
      if (this.id !== 0) {
        this.cargarContratos()
      }
      */
    },
    methods: {
      guardarContrato () {
        if (this.detalles.length <= 0) {
          alert('Debe agregar al menos un detalle')
          return
        }
        if (this.id === 0 && this.edit === false) {
          this.contrat = {
            idCliente: this.contrato.idCliente,
            fechaFirma: this.contrato.fechaFirma,
            fechaVigenciaDesde: this.contrato.fechaVigenciaDesde,
            fechaVigenciaHasta: this.contrato.fechaVigenciaHasta
          }
          api.postContratos(this, this.contrat, this.detalles).then(res => {
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
            idCliente: this.contrato.idCliente,
            fechaFirma: this.contrato.fechaFirma,
            fechaVigenciaDesde: this.contrato.fechaVigenciaDesde,
            fechaVigenciaHasta: this.contrato.fechaVigenciaHasta
            /*
            cantidad: this.contrato.cantidad,
            precioPorUnidad: this.contrato.precioPorUnidad,
            idProducto: this.contrato.idProducto
            */
          }
          api.editarContratoFull(this, this.contrat, this.detalle).then(res => {
            if (res) {
              alert('Contrato modificado con exito')
              this.$parent.current = 'UsersList'
              this.$parent.isUserList = true
            } else {
              console.log('omdificar contrato devolvio false')
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
      /*
      cargarContratos () {
        api.getContrato(this, this.id)
          .then(res => {
            res = res.body.data[0]
            this.contrato.idCliente = res.idCliente // Cambiar por el nombre del ciente
            this.contrato.fechaFirma = res.fechaFirma
            this.contrato.fechaVigenciaDesde = res.fechaVigenciaDesde
            this.contrato.fechaVigenciaHasta = res.fechaVigenciaHasta
          })
      },
      */
      captarDetalle (det) {
        this.detalles.push(det)
        alert('captar detale' + JSON.stringify(det))
      },
      borrarDetalle (det) {
        this.detalles = this.detalles.filter(dets => dets.idProducto !== parseInt(det))
      },
      cargarContratos2 () {
        if (this.id !== 0 && this.edit) {
          api.getContratoFull(this, this.id).then(c => {
           // alert('llegue el full con: ' + JSON.stringify(c))
            this.contrato.idCliente = c.contrato.idCliente // Cambiar por el nombre del ciente
            this.contrato.fechaFirma = c.contrato.fechaFirma
            this.contrato.fechaVigenciaDesde = c.contrato.fechaVigenciaDesde
            this.contrato.fechaVigenciaHasta = c.contrato.fechaVigenciaHasta
            c.detalle.forEach(dc => {
              this.detalles.push({
                idProducto: dc.idProducto,
                cantidadMaxima: dc.cantidadMaxima,
                precioPorUnidad: dc.precioPorUnidad
              })
            })
          })
        }
      }
    }
  }
</script>
<style>

</style>
