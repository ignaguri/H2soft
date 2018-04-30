<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="form-group">
          <label for="cliente"><h4><span class="label label-default">Cliente</span></h4></label>
          <dds id="cliente" v-model="idClientes"
               :options="clientes"
               options-value="idClientes"
               options-label="razonSocial"
               search-text="Buscar"
               :placeholder="'Nada seleccionado'"
               :search="true" :justified="true" required>
          </dds>
          <label for="objetivo"><h4><span class="label label-default">Objetivo</span></h4></label>
          <dds id="objetivo" v-model="idObjetivo"
               :options="objetivos"
               options-value="idObjetivosXCliente"
               options-label="nombre"
               search-text="Buscar"
               :placeholder="'Nada seleccionado'"
               :search="true" :justified="true" required>
          </dds>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns" :editButton="false" :eraseButton="false" :goButton="true" :go="ver" >
          </paper-table>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="text-center">
          <button type="button" class="btn btn-info btn-fill btn-wd" @click="" v-show="isAlertasList">
            Agregar Alerta
          </button>
          <button type="button" class="btn btn-default btn-fill btn-wd" @click="" v-show="!isAlertasList">
            Volver
          </button>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import PaperTable from 'components/UIComponents/PaperTablePlus.vue'
  import { radio, select } from 'vue-strap'
  import api from 'src/api/services/recorridoServices'

  const tableColumns = ['Nro', 'Cliente', 'Objetivo', 'Tipo', 'Notificación', 'Estado']
  export default {
    components: {
      PaperTable,
      radio,
      dds: select
    },
    data () {
      return {
        isAlertasList: true,
        table1: {
          title: 'Alertas',
          subTitle: 'Listado de alertas',
          columns: [...tableColumns],
          data: []
        },
        clientes: [],
        idClientes: null,
        objetivos: [],
        idObjetivo: null
      }
    },
    mounted () {
      this.cargarClientes()
    },
    watch: {
      idClientes: function () {
        this.cargarObjetivos()
      }
    },
    methods: {
      cargarClientes () {
        api.getClientes(this).then(r => {
          this.clientes = r
        })
      },
      cargarObjetivos () {
        if (this.idClientes !== null) {
          api.getObjetivos(this, this.idClientes).then(r => {
            this.objetivos = r
          })
        } else {
          this.objetivos = null
        }
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
        console.log('borrar', id)
//        api.deleteClientes(this, id).then(res => {
//          if (res) {
//            alert('Borrado con éxito')
//            this.table1.data = []
//            this.cargarClientes()
//          } else {
//            alert('error al borrar')
//          }
//        })
      },
      ver (e) {
        let id = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
//        api.getClienteFull(this, id).then(r => {
//          console.log('me ha iegado', r)
//          this.modalData.nombre = r.cliente.razonSocial
//          this.modalData.CUIL = r.cliente.CUIL !== undefined ? r.cliente.CUIL : ''
//          this.modalData.direccion = r.cliente.direccion !== undefined ? r.cliente.direccion : ''
//          switch (r.cliente.idTipo) {
//            case 1:
//              this.modalData.tipoCliente = 'Empresa'
//              break
//            case 2:
//              this.modalData.tipoCliente = 'Particular'
//              break
//            default:
//              this.modalData.tipoCliente = ''
//              break
//          }
//          this.modalData.contacto.nombre = r.contacto !== undefined ? r.contacto.nombre : ''
//          this.modalData.contacto.mail = r.contacto !== undefined ? r.contacto.mail : ''
//          this.modalData.contacto.celular = r.contacto !== undefined ? r.contacto.celular : ''
//          this.modalData.contacto.telefono = r.contacto !== undefined ? r.contacto.telefono : ''
//          this.modalData.contacto.observaciones = r.contacto !== undefined ? r.contacto.observaciones : ''
//          this.modalData.objetivos = r.objetivos.length
//        })
//        this.showCustomModal = true
        this.$emit('emitted', {action: 'ver', client: id})
      }
    }
  }

</script>
<style>

</style>
