<template>
  <div>
      <div class="row" >
        <div class="col-md-12">
          <div class="card">
            <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns" :editButton="false" :eraseButton="false" :goButton="false" >
            </paper-table>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
  // import PaperTable from 'components/UIComponents/PaperTable.vue'
  import PaperTable from 'components/UIComponents/PaperTablePlus.vue'
  import api from 'src/api/services/mantenimientoServices'
  import apiCliente from 'src/api/services/clientServices'
  import apiDispenser from 'src/api/services/dispensersServices'

  const tableColumns = ['Nro', 'Cliente', 'Objetivo', 'Dispenser', 'Tipo', 'Estado', 'Creado', 'Realizado']
  //  let tableData = []

  export default {
    components: {
      PaperTable
    },
    data () {
      return {
        estados: [],
        tipos: [],
        table1: {
          title: 'Mantenimientos',
          subTitle: 'Listado de mantenimientos solicitados',
          columns: [...tableColumns],
          data: []
        }
      }
    },
    mounted () {
      api.getEstadosMantenimiento(this).then(estados => {
        this.estados = estados
        api.getTipoMantenimiento(this).then(tipos => {
          this.tipos = tipos
          this.cargarMantenimientos()
        })
      })
    },
    methods: {
      cargarMantenimientos () {
        api.getMantenimientos(this).then(res => {
          res.forEach(mant => {
            var mantenimiento = {
              nro: mant.idMantenimientos,
              cliente: '',
              objetivo: '',
              dispenser: '',
              creado: mant.cratedAt === null ? '-' : new Date(mant.cratedAt).toLocaleDateString(),
              realizado: mant.fechaRealizado === null ? '-' : new Date(mant.fechaRealizado).toLocaleDateString(),
              estado: this.getEstado(mant.idEstadoMantenimiento),
              tipo: this.getTipo(mant.idTipoMantenimiento)
            }
            apiCliente.getObjetivo(this, mant.idObjetivo)
              .then(res1 => {
                res1 = res1.body.data[0]
                mantenimiento.objetivo = res1.nombre
                apiCliente.getCliente(this, res1.idCliente)
                  .then(res2 => {
                    res2 = res2[0]
                    mantenimiento.cliente = res2.razonSocial
                    apiDispenser.getDispenser(this, mant.idDispenser)
                      .then(disp => {
                        mantenimiento.dispenser = disp.codigo
                        this.table1.data.push(mantenimiento)
                      })
                  })
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
      },
      getEstado (idEstado) {
        for (var i = 0, len = this.estados.length; i < len; i++) {
          if (this.estados[i].idEstadosMantenimiento === idEstado) {
            return this.estados[i].nombre
          }
        }
      },
      getTipo (idTipo) {
        for (var i = 0, len = this.tipos.length; i < len; i++) {
          if (this.tipos[i].idTiposMantenimiento === idTipo) {
            return this.tipos[i].nombre
          }
        }
      },
      getObjetivo (idObjetivo) {
        return apiCliente.getObjetivo(this, idObjetivo)
//          .then(res => {
//          return res
//        }, error => {
//          console.log('error al cargar las temporadas' + error)
//        })
      }
    }
  }

</script>
<style>

</style>
