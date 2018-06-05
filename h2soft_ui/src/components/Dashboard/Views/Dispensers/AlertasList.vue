<template>
  <div class="card">
    <div class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data"
                         :columns="table1.columns" :goButton="false" :edit="editar" :erase="borrar">
            </paper-table>
          </div>
        </div>
      </div>
    </div>
    <modal effect="fade" width="50%" :value="showCustomModal" @ok="showCustomModal = ok()" title="Cambiar estado">
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <div class="text-center">
              <label><h4><span class="label label-default">Estado</span></h4></label>
              <button-group v-model="idEstado" type="info">
                <radio selected-value="1">Pendiente</radio>
                <radio selected-value="2">Realizado</radio>
              </button-group>
            </div>
          </div>
        </div>
      </div>
      <div slot="modal-footer" class="modal-footer">
        <button type="button" class="btn btn-default" @click="showCustomModal = false">Salir</button>
        <button type="button" class="btn btn-success" @click="showCustomModal = ok()">Guardar</button>
      </div>
    </modal>
  </div>
</template>
<script>
  import PaperTable from 'components/UIComponents/PaperTablePlus.vue'
  import { buttonGroup, radio, modal } from 'vue-strap'
  import api from 'src/api/services/alertasServices'
  import noti from 'src/api/notificationsService'

  const tableColumns = ['Nro', 'Cliente', 'Objetivo', 'Tipo', 'Notificacion', 'Estado']
  export default {
    components: {
      PaperTable,
      buttonGroup,
      radio,
      modal
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
        showCustomModal: false,
        idEstado: null,
        idAlerta: null,
        estados: []
      }
    },
    mounted () {
      this.cargarAlertas()
      this.cargarEstados()
    },
    methods: {
      cargarAlertas () {
        this.table1.data = []
        api.getAlertas(this).then(r => {
          this.table1.data = r
        })
      },
      cargarEstados () {
        if (this.estados.length <= 0) {
          api.getEstados(this)
          .then(r => {
            this.estados = r
          })
        }
      },
      borrar (e) {
        if (!confirm('¿Está seguro de que desea borrar esta alerta?')) {
          return
        }
        const id = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        api.deleteAlerta(this, id)
          .then(r => {
            if (r) {
              noti.exitoConTexto(this, 'Éxito', 'Alerta borrada con éxito!')
              location.reload()
              this.cargarAlertas()
            } else {
              noti.errorConTexto(this, 'Error', 'Error al borrar alerta')
              location.reload()
              this.cargarAlertas()
            }
          })
      },
      editar (e) {
        const id = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        this.idAlerta = Number(id)
        this.showCustomModal = true
      },
      ok () {
        if (this.idEstado === null) {
          noti.infoConTexto(this, 'Alerta', 'Debe seleccionar un estado')
          return true
        }
        this.editarAlerta()
        return false
      },
      editarAlerta () {
        const alerta = {
          id: this.idAlerta,
          idEstado: Number(this.idEstado)
        }
        api.updateEstado(this, alerta)
          .then(r => {
            if (r) {
              noti.exitoConTexto(this, 'Éxito', 'Alerta actualizada con éxito!')
              location.reload()
              this.cargarAlertas()
            } else {
              noti.errorConTexto(this, 'Error', 'Error al actualizar alerta')
              location.reload()
              this.cargarAlertas()
            }
          })
      }
    }
  }

</script>
<style>

</style>
