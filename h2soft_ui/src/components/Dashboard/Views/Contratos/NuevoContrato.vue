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
                        label="Fecha vigencia desde"
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
        <detalle-contrato :detalles="detalles" :edit="edit" :idContrato="id" @nuevo_detalle="captarDetalle" @delete_detalle="borrarDetalle"></detalle-contrato>
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
    {{ edit }}
    {{ id }}
  </div>
</template>
<script>
  // TODO: agregar columna de idDetalleContrato para poder borra solo un detalle
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
        if (this.id === 0 && !this.edit) {
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
          }
          api.editarContratoFull3(this, this.contrat, this.detalles, this.id).then(res => {
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
      captarDetalle (det) {
        this.detalles.push(det)
       // alert('captar detale' + JSON.stringify(det))
      },
      borrarDetalle (det) {
        this.detalles = this.detalles.filter(dets => dets.idDetallesContrato !== parseInt(det))
      },
      cargarContratos2 () {
        if (this.id !== 0 && this.edit) {
          api.getContratoFull(this, this.id).then(c => {
           // alert('llegue el full con: ' + JSON.stringify(c))
            this.contrato.idCliente = c.contrato.idCliente // Cambiar por el nombre del ciente
            this.contrato.fechaFirma = new Date(c.contrato.fechaFirma).toLocaleDateString()
            this.contrato.fechaVigenciaDesde = new Date(c.contrato.fechaVigenciaDesde).toLocaleDateString()
            this.contrato.fechaVigenciaHasta = new Date(c.contrato.fechaVigenciaHasta).toLocaleDateString()
            c.detalle.forEach(dc => {
              this.detalles.push({
                idDetallesContrato: dc.idDetallesContrato,
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
