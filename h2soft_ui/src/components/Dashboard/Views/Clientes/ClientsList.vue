<template>
  <div>
    <div class="col-md-12">
      <div class="card">
        <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns">

        </paper-table>
      </div>
    </div>
  </div>
</template>
<script>
  // import PaperTable from 'components/UIComponents/PaperTable.vue'
  import PaperTable from 'components/UIComponents/PaperTablePlus.vue'
  import api from 'src/api/services/clientServices'
  import { modal } from 'vue-strap'

  const tableColumns = ['Id', 'Nombre', 'CUIL', 'Domicilio']
  //  let tableData = []
  // TODO: agregar cantidad de objetivos a la tabla
  // TODO: hacer cada cliente de la tabla linkeable
  // TODO: guardar lista en localStorage para ahorrar llamados a la api
  // TODO: ver como hacer para que despues del login recien se ejecute el getLocalidades
  export default {
    components: {
      PaperTable
    },
    data () {
      return {
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
              id: cl.idClientes,
              nombre: cl.razonSocial,
              cuil: cl.CUIL,
              domicilio: cl.direccion
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
