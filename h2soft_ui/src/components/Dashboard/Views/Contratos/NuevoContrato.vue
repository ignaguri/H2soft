<template>
  <div class="card">
    <div class="header">
      <h4 class="title" v-if="!edit">Agregar nuevo contrato</h4>
      <h4 class="title" v-if="edit">Editar contrato</h4>
    </div>
    <div class="content">
      <form name="nuevo_contrato_form" @submit.prevent="guardarContrato">
        <div class="row">
          <div class="col-md-6">
            <!--<label for="cliente"><h4><span class="label label-default">Cliente</span></h4></label>-->
            <slot name="label"><label class="control-label">Cliente</label></slot>
            <dds id="cliente" v-model="contrato.idClientes"
                 :options="clientes"
                 options-value="idClientes"
                 options-label="razonSocial"
                 search-text="Buscar"
                 :placeholder="'Seleccione un cliente'"
                 :search="true" :justified="true" required>
            </dds>
        </div>
          <div class="col-md-6">
            <!--<label for="fechaFirma"><h4><span class="label label-default">Firmado</span></h4></label>-->
            <slot name="label"><label class="control-label">Firmado</label></slot>
            <datepicker v-model="contrato.fechaFirma" id="fechaFirma" :disabled-days-of-week=[0] :format="'dd/MM/yyyy'"  :placeholder="'Fecha firmado'" width="100%" :clear-button="true"></datepicker>
          </div>
        </div>
          <div class="row">
            <div class="col-md-6">
              <!--<label for="fechaDesde"><h4><span class="label label-default">Vigente desde</span></h4></label>-->
              <slot name="label"><label class="control-label">Vigente desde</label></slot>
              <datepicker v-model="contrato.fechaVigenciaDesde" id="fechaDesde" :disabled-days-of-week=[0] :format="'dd/MM/yyyy'"  :placeholder="'Fecha desde'" width="100%" :clear-button="true"></datepicker>
            </div>
            <div class="col-md-6">
              <!--<label for="fechaHasta"><h4><span class="label label-default">Vigente hasta</span></h4></label>-->
              <slot name="label"><label class="control-label">Vigente hasta</label></slot>
              <datepicker v-model="contrato.fechaVigenciaHasta" id="fechaHasta" :disabled-days-of-week=[0] :format="'dd/MM/yyyy'"  :placeholder="'Fecha hasta'" width="100%" :clear-button="true"></datepicker>
            </div>
          </div>
          <hr>
        <detalle-contrato :detalles="detalles" :edit="edit" :idContrato="id" @nuevo_detalle="captarDetalle" @delete_detalle="borrarDetalle"></detalle-contrato>
        <div class="row">
          <div class="text-center">
            <button type="button" v-if="edit" class="btn btn-info btn-fill btn-wd" @click="exportar">
              Exportar a PDF
            </button>
            <button type="submit"  class="btn btn-success btn-fill btn-wd">
              Guardar contrato
            </button>
          </div>
          <div class="clearfix"></div>
        </div>
      </form>
    </div>
    {{ contrato }}
  </div>
</template>
<script>
  // TODO: agregar columna de idDetalleContrato para poder borra solo un detalle
  // TODO: agrefar el nombre de producto en vez del idProducto
  import api from 'src/api/services/contratosServices'
  import exportApi from 'src/api/export'
  import DetalleContrato from './DetalleContrato.vue'
  import { datepicker, select } from 'vue-strap'
  import noti from 'src/api/notificationsService'

  export default {
    components: {
      DetalleContrato,
      datepicker,
      dds: select
    },
    data () {
      return {
        contrato: {
          idCliente: null,
          fechaFirma: '',
          fechaVigenciaDesde: '',
          fechaVigenciaHasta: ''
        },
        clientes: [],
        contrat: {},
        detalles: [],
        productos: []
      }
    },
    props: {
      edit: Boolean,
      id: Number
    },
    mounted () {
      this.getClientes()
      this.getProductos()
      this.cargarContratos2()
    },
    methods: {
      exportar () {
        const clausulas = this.detalles.map(d => {
          const aux = Object.assign({}, d)
          const nombre = this.productos.find(p => p.idProductos === d.idProducto).nombre
          aux.producto = nombre
          return aux
        })
        api.getClienteContratos(this, this.contrato.idCliente)
          .then(cliente => {
            const data = {
              razonSocial: cliente.razonSocial,
              cuil: cliente.CUIL,
              domicilio: cliente.direccion,
              fechaFirma: this.contrato.fechaFirma,
              vigenciaDesde: this.contrato.fechaVigenciaDesde,
              vigenciaHasta: this.contrato.fechaVigenciaHasta,
              clausulas
            }
            exportApi.exportToPDF(data)
          })
      },
      guardarContrato () {
        if (this.detalles.length <= 0) {
          noti.infoConTexto(this, 'Alerta', 'Debe agregar al menos un detalle')
          return
        }
        if (this.contrato.fechaFirma === '' || this.contrato.fechaVigenciaDesde === '' || this.contrato.fechaVigenciaHasta === '') {
          noti.infoConTexto(this, 'Alerta', 'Debe completar todos los campos')
          return
        }
        if (new Date(this.contrato.fechaVigenciaDesde) > new Date(this.contrato.fechaVigenciaHasta)) {
          noti.infoConTexto(this, 'Alerta', 'La fecha de vigencia desde no puede ser mayor a la fecha de vigencia hasta')
          return
        }
        if (this.id === 0 && !this.edit) {
          let firmado = this.contrato.fechaFirma.split('/')
          let fechaDesde = this.contrato.fechaVigenciaDesde.split('/')
          let fechaHasta = this.contrato.fechaVigenciaHasta.split('/')
          this.contrat = {
            idCliente: this.contrato.idCliente,
            fechaFirma: firmado[1] + '/' + firmado[0] + '/' + firmado[2],
            fechaVigenciaDesde: fechaDesde[1] + '/' + fechaDesde[0] + '/' + fechaDesde[2],
            fechaVigenciaHasta: fechaHasta[1] + '/' + fechaHasta[0] + '/' + fechaHasta[2]
          }
          api.postContratos(this, this.contrat, this.detalles).then(res => {
            if (res) {
              console.log('devolvió true en nuevoContrato')
              noti.exitoConTexto(this, 'Éxito', 'Contrato guardado con éxito!')
            } else {
              console.log('devolvio false')
              noti.errorConTexto(this, 'Error', 'Error al guardar el contrato')
            }
          })
        } else {
          let firmado = this.contrato.fechaFirma.split('/')
          let fechaDesde = this.contrato.fechaVigenciaDesde.split('/')
          let fechaHasta = this.contrato.fechaVigenciaHasta.split('/')
          this.contrat = {
            id: this.id,
            idCliente: this.contrato.idCliente,
            fechaFirma: firmado[1] + '/' + firmado[0] + '/' + firmado[2],
            fechaVigenciaDesde: fechaDesde[1] + '/' + fechaDesde[0] + '/' + fechaDesde[2],
            fechaVigenciaHasta: fechaHasta[1] + '/' + fechaHasta[0] + '/' + fechaHasta[2]
          }
          api.editarContratoFull3(this, this.contrat, this.detalles, this.id).then(res => {
            if (res) {
              noti.exitoConTexto(this, 'Éxito', 'Contrato guardado con éxito!')
              this.$parent.current = 'UsersList'
              this.$parent.isUserList = true
            } else {
              noti.errorConTexto(this, 'Error', 'Error al guardar el contrato')
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
      },
      borrarDetalle (prod, cant) {
        for (let i = 0; i < this.detalles.length; i++) {
          if (parseInt(this.detalles[i].idProducto) === parseInt(prod) && parseInt(this.detalles[i].cantidadMinima) === parseInt(cant)) {
            this.$delete(this.detalles, i)
          }
        }
      },
      cargarContratos2 () {
        if (this.id !== 0 && this.edit) {
          api.getContratoFull(this, this.id).then(c => {
           // alert('llegue el full con: ' + JSON.stringify(c))
            this.contrato.idCliente = c.contrato.idCliente // Cambiar por el nombre del ciente
            this.contrato.fechaFirma = new Date(c.contrato.fechaFirma).toLocaleDateString('es-AR', { year: '2-digit', month: '2-digit', day: '2-digit' })
            this.contrato.fechaVigenciaDesde = new Date(c.contrato.fechaVigenciaDesde).toLocaleDateString('es-AR', { year: '2-digit', month: '2-digit', day: '2-digit' })
            this.contrato.fechaVigenciaHasta = new Date(c.contrato.fechaVigenciaHasta).toLocaleDateString('es-AR', { year: '2-digit', month: '2-digit', day: '2-digit' })
            c.detalle.forEach(dc => {
              this.detalles.push({
                idProducto: dc.idProducto,
                cantidadMinima: dc.cantidadMinima,
                cantidadMaxima: dc.cantidadMaxima,
                precioPorUnidad: dc.precioPorUnidad
              })
            })
          })
        }
      },
      validarCampos () {
        if (this.detalles.length <= 0) {
          noti.infoConTexto(this, 'Alerta', 'Debe agregar al menos un detalle')
          return true
        }
        if (new Date(this.contrato.fechaVigenciaDesde) > new Date(this.contrato.fechaVigenciaHasta)) {
          noti.errorConTexto(this, 'Error', 'La fecha de vigencia desde no puede ser mayor a la fecha de vigencia hasta')
          return true
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
