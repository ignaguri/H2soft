<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns" :editButton="false" :eraseButton="false" :goButton="true" :go="ver" >

        </paper-table>
      </div>
    </div>
  </div>

</template>
<script>
  // import PaperTable from 'components/UIComponents/PaperTable.vue'
  import PaperTable from 'components/UIComponents/PaperTablePlus.vue'
  import api from 'src/api/services/dispensersServices'

  const tableColumns = ['Nro', 'Código', 'Estado', 'Ubicación', 'Próx Mantenimiento']
  //  let tableData = []
  // TODO: agregar cantidad de objetivos a la tabla
  // TODO: guardar lista en localStorage para ahorrar llamados a la api
  export default {
    components: {
      PaperTable
    },
    data () {
      return {
        showCustomModal: false,
        table1: {
          title: 'Dispensers',
          subTitle: 'Listado de dispensers de la empresa',
          columns: [...tableColumns],
          data: []
        }
      }
    },
    mounted () {
      this.cargarDispensers()
    },
    methods: {
      cargarDispensers () {
        api.getDispensers(this).then(res => {
          console.log(res)
          res.forEach(dis => {
            this.table1.data.push({
              nro: dis.idDispensers,
              código: dis.codigo,
              ubicación: dis.idObjetivo,
              estado: dis.idEstadoDispenser,
              próxmantenimiento: 'prox man'
            })
          })
        }, error => {
          console.log('error ' + JSON.stringify(error))
        })
      },
      editar (e) {
        let id = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        // console.log('editar id: ' + id)
        this.$emit('emitted', {action: 'edit', client: id})
        // this.$parent.isClientList = false
        // this.$router.push('clientes/edit/' + id)
      },
      borrar (e) {
        let id = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        if (!confirm('Desea eliminar a este cliente, sus contactos y todos sus objetivos?')) return
        api.deleteClientes(this, id).then(res => {
          if (res) {
            alert('Borrado con éxito')
            this.table1.data = []
            this.cargarClientes()
          } else {
            alert('error al borrar')
          }
        })
      },
      ver (e) {
        let id = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        api.getClienteFull(this, id).then(r => {
          console.log('me ha iegado', r)
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
