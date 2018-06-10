<template>
  <div>
    <div class="col-md-12">
      <div class="card">
        <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns" :edit="editar" :erase="borrar" :goButton="true" :go="ver">

        </paper-table>
      </div>
    </div>
    <modal effect="fade" :value="showCustomModal" title="Resumen del cliente">
      <div class="row">
        <div class="col-md-12">
          <h2><span class="label label-default">Cliente</span></h2>
          <h3><span class="label label-primary">Nombre/Razón social:</span> {{ modalData.nombre }}</h3>
          <h3><span class="label label-primary">CUIL:</span> {{ modalData.CUIL }}</h3>
          <h3><span class="label label-primary">Tipo cliente:</span> {{ modalData.tipoCliente }}</h3>
          <h3><span class="label label-primary">Domicilio fiscal:</span> {{ modalData.direccion }}</h3>
        </div>
        <div class="col-md-12">
          <h2><span class="label label-default">Datos de contacto</span></h2>
          <h3><span class="label label-primary">Nombre:</span> {{ modalData.contacto.nombre }}</h3>
          <h3><span class="label label-primary">Teléfono:</span> {{ modalData.contacto.telefono }}</h3>
          <h3><span class="label label-primary">Celular:</span> {{ modalData.contacto.celular }}</h3>
          <h3><span class="label label-primary">Mail:</span> {{ modalData.contacto.mail }}</h3>
          <h3><span class="label label-primary">Observaciones:</span> {{ modalData.contacto.observaciones }}</h3>
        </div>
        <div class="col-md-12">
          <h2><span class="label label-default">Objetivos</span></h2>
          <h3><span class="label label-primary">Cantidad:</span> {{ modalData.objetivos }}</h3>
        </div>
      </div>
      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-default" @click="showCustomModal = false">Salir</button>
      </div>
    </modal>
  </div>
</template>
<script>
  // import PaperTable from 'components/UIComponents/PaperTable.vue'
  import PaperTable from 'components/UIComponents/PaperTablePlus.vue'
  import api from 'src/api/services/clientServices'
  import { modal } from 'vue-strap'
  import noti from 'src/api/notificationsService'

  const tableColumns = ['#', 'Nombre', 'CUIL', 'Domicilio']

  // TODO: agregar cantidad de objetivos a la tabla
  // TODO: guardar lista en localStorage para ahorrar llamados a la api
  export default {
    components: {
      PaperTable,
      modal
    },
    data () {
      return {
        showCustomModal: false,
        table1: {
          title: 'Clientes',
          subTitle: 'Lista de clientes con los que actualmente tenemos contrato',
          columns: [...tableColumns],
          data: []
        },
        modalData: {
          nombre: 'nombre',
          CUIL: 0,
          direccion: 'domicilio',
          tipoCliente: null,
          contacto: {
            nombre: 'nombre contacto',
            telefono: 0,
            celular: 0,
            mail: 'mail@contacto.com',
            observaciones: 'observaciones'
          },
          objetivos: 0
        }
      }
    },
    mounted () {
      this.cargarClientes()
    },
    methods: {
      cargarClientes () {
        api.getClientes(this).then(res => {
          res.body.data.forEach(cl => {
            this.table1.data.push({
              '#': cl.idClientes,
              'nombre': cl.razonSocial,
              'cuil': cl.CUIL,
              'domicilio': cl.direccion
            })
          })
        }, error => {
          console.log('error ' + JSON.stringify(error))
        })
      },
      editar (e) {
        let id = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        this.$emit('emitted', {action: 'edit', client: id})
      },
      borrar (e) {
        let id = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        if (!confirm('Desea eliminar a este cliente, sus contactos y todos sus objetivos?')) return
        api.deleteClientes(this, id).then(res => {
          if (res) {
            noti.exitoConTexto(this, 'Éxito', 'El cliente se ha eliminado!')
            this.table1.data = []
            this.cargarClientes()
          } else {
            noti.errorConTexto(this, 'Error', 'Error al eliminar cliente')
          }
        })
      },
      ver (e) {
        let id = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        api.getClienteFull(this, id).then(r => {
          this.modalData.nombre = r.cliente.razonSocial
          this.modalData.CUIL = r.cliente.CUIL !== undefined ? r.cliente.CUIL : ''
          this.modalData.direccion = r.cliente.direccion !== undefined ? r.cliente.direccion : ''
          switch (r.cliente.idTipo) {
            case 1:
              this.modalData.tipoCliente = 'Empresa'
              break
            case 2:
              this.modalData.tipoCliente = 'Particular'
              break
            default:
              this.modalData.tipoCliente = ''
              break
          }
          this.modalData.contacto.nombre = r.contacto !== undefined ? r.contacto.nombre : ''
          this.modalData.contacto.mail = r.contacto !== undefined ? r.contacto.mail : ''
          this.modalData.contacto.celular = r.contacto !== undefined ? r.contacto.celular : ''
          this.modalData.contacto.telefono = r.contacto !== undefined ? r.contacto.telefono : ''
          this.modalData.contacto.observaciones = r.contacto !== undefined ? r.contacto.observaciones : ''
          this.modalData.objetivos = r.objetivos.length
        })
        this.showCustomModal = true
        this.$emit('emitted', {action: 'ver', client: id})
      }
    }
  }

</script>
<style>

</style>
