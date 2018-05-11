<template>
  <div>
    <div v-if="isDispensersList" >
      <div class="row" >
        <div class="col-md-12">
          <div class="card">
            <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns" :editButton="true" :eraseButton="false" :goButton="false" :edit="editar"  >
            </paper-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  // import PaperTable from 'components/UIComponents/PaperTable.vue'
  import PaperTable from 'components/UIComponents/PaperTablePlus.vue'
  import api from 'src/api/services/dispensersServices'
  import apiCliente from 'src/api/services/clientServices'

  const tableColumns = ['Nro', 'Código', 'Estado', 'Ubicación', 'Próx Mantenimiento']
  //  let tableData = []

  export default {
    components: {
      PaperTable
    },
    data () {
      return {
        isDispensersList: true,
        estados: [],
        table1: {
          title: 'Dispensers',
          subTitle: 'Listado de dispensers de la empresa',
          columns: [...tableColumns],
          data: []
        }
      }
    },
    mounted () {
      api.getEstadosDispensers(this).then(res => {
        this.estados = res
        this.cargarDispensers()
      })
    },
    methods: {
      cargarDispensers () {
        api.getDispensers(this).then(res => {
          res.forEach(dis => {
            var disp = {
              nro: dis.idDispensers,
              código: dis.codigo,
              estado: this.getEstadoDispenser(dis.idEstadoDispenser),
              próxmantenimiento: dis.fechaProxMantenimiento === null ? '-' : new Date(dis.fechaProxMantenimiento).toLocaleDateString()
            }
            if (dis.idObjetivo === null) {
              disp.ubicación = 'En fabrica'
              this.table1.data.push(disp)
            } else {
              this.getObjetivo(dis.idObjetivo)
                .then(res1 => {
                  disp.ubicación = res1.body.data[0].nombre
                  this.table1.data.push(disp)
                })
            }
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
      },
      getEstadoDispenser (idEstado) {
        for (var i = 0, len = this.estados.length; i < len; i++) {
          if (this.estados[i].idEstadosDispenser === idEstado) {
            return this.estados[i].nombre
          }
        }
      },
      getObjetivo (idObjetivo) {
        return apiCliente.getObjetivo(this, idObjetivo)
      }
    }
  }

</script>
<style>

</style>
