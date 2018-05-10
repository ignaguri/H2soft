<template>
  <div>
    <div class="row" >
      <div class="card">
        <div class="text-right" style="padding:10px">
          Ver mantenimientos
          <button-group v-model="radioValue" type="info">
            <radio selected-value="pendientes">Solo pendientes</radio>
            <radio selected-value="todos">Todos</radio>
          </button-group>
        </div>
        <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns" :editButton="false" :eraseButton="false" :goButton="true" :go="ver" >
        </paper-table>
      </div>
    </div>

    <modal effect="fade" :value="showCustomModal" :backdrop="false" @ok="showCustomModal = recorridoAsignarCamion()" title="Realizar mantenimiento">
      <div class="row">
        <div class="col-md-12">
          <h5>¿Deseas registrar como realizado el mantenimiento seleccionado?</h5>
        </div>
      </div>
      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-default" @click="showCustomModal = false">Cancelar</button>
        <button type="button" class="btn btn-success" @click="btn_registrarMantenimiento()">Aceptar</button>
      </div>
    </modal>
  </div>


</template>
<script>
  // import PaperTable from 'components/UIComponents/PaperTable.vue'
  import PaperTable from 'src/components/Dashboard/Views/Mantenimiento/PaperTablePlusMatenimientos.vue'// 'components/UIComponents/PaperTablePlus.vue'
  import api from 'src/api/services/mantenimientoServices'
  import apiCliente from 'src/api/services/clientServices'
  import apiDispenser from 'src/api/services/dispensersServices'
  import { modal, buttonGroup, radio } from 'vue-strap'
  import noti from 'src/api/notificationsService'

  const tableColumns = ['Nro', 'Cliente', 'Objetivo', 'Dispenser', 'Tipo', 'Estado', 'Creado', 'Realizado']
  //  let tableData = []

  export default {
    components: {
      PaperTable,
      modal,
      buttonGroup,
      radio
    },
    data () {
      return {
        radioValue: 'pendientes',
        showCustomModal: false,
        estados: [],
        tipos: [],
        idMantenimiento: 0,
        table1: {
          title: 'Mantenimientos',
          subTitle: 'Listado de mantenimientos para dispensers',
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
    watch: {
      radioValue: function () {
        this.cargarMantenimientos()
      }
    },
    methods: {
      cargarMantenimientos () {
        this.table1.data = []
        if (this.radioValue === 'pendientes') {
          this.getMantenimientosPendientes()
        } else {
          this.getMantenimientosTodos()
        }
      },
      getMantenimientosTodos () {
        api.getMantenimientos(this)
          .then(res => {
            res.forEach(mant => {
              var mantenimiento = {
                nro: mant.idMantenimientos,
                cliente: '',
                objetivo: '',
                dispenser: '',
                creado: mant.createdAt === null ? '-' : new Date(mant.createdAt).toLocaleDateString(),
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
      getMantenimientosPendientes () {
        api.getMantenimientosPendientes(this).then(res => {
          res.forEach(mant => {
            var mantenimiento = {
              nro: mant.idMantenimientos,
              cliente: '',
              objetivo: '',
              dispenser: '',
              creado: mant.createdAt === null ? '-' : new Date(mant.createdAt).toLocaleDateString(),
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
      ver (e) {
        this.idMantenimiento = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        this.showCustomModal = true
        console.log('id mant selecconado: ' + this.idMantenimiento)
        // this.$emit('emitted', {action: 'ver', client: id})
      },
      btn_registrarMantenimiento () {
        this.mantenimiento = {
          'id': this.idMantenimiento,
          'fechaRealizado': Date.now(),
          'idEstadoMantenimiento': 2
        }
        api.editMantenimiento(this, this.mantenimiento)
          .then(res => {
            api.getMantenimiento(this, this.idMantenimiento)
              .then(m => {
                m = m[0]
                var dt = new Date()
                dt.setMonth(dt.getMonth() + 6)
                let dispenser = {
                  'id': m.idDispenser,
                  'idEstadoDispenser': 1,
                  'fechaProxMantenimiento': dt
                }
                apiDispenser.editDispenser(this, dispenser)
                  .then(dis => {
                    if (dis) {
                      noti.exito(this)
                      this.showCustomModal = false
                      this.table1.data = []
                      this.cargarMantenimientos()
                    } else {
                      console.log('error al editar el dispenser')
                      noti.error(this)
                      this.showCustomModal = true
                    }
                  }, error => {
                    console.log('error ' + JSON.stringify(error))
                  })
              })
          }, error => {
            console.log('error ' + JSON.stringify(error))
          })
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
