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
              <label for="estado"><h4><span class="label label-default">Estado</span></h4></label>
              <dds id="estado" v-model="idEstado"
                  :options="estados"
                  options-value="idEstadoAlerta"
                  options-label="nombre"
                  search-text="Buscar"
                  :search="true" :justified="true"
                  placeholder="Seleccione un estado" required>
              </dds>
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
  import { select, modal } from 'vue-strap'
  import api from 'src/api/services/alertasServices'

  const tableColumns = ['Nro', 'Cliente', 'Objetivo', 'Tipo', 'Notificacion', 'Estado']
  export default {
    components: {
      PaperTable,
      dds: select,
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
      // editar (e) {
      //   const id = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
      //   this.$emit('emitted', {action: 'edit', alerta: id})
      // },
      borrar (e) {
        const id = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        api.deleteAlerta(this, id)
          .then(r => {
            if (r) {
              alert('Alerta borrada con éxito!')
              this.cargarAlertas()
            } else {
              alert('Error al borrar la alerta')
              this.cargarAlertas()
            }
          })
      },
      editar () {
        this.showCustomModal = true
      },
      ok () {
        // return !confirm('Ok event.\nClose Modal?')
        // if (this.idEmpleadoAsignado === null) {
        //   alert('Debe completar todos los campos')
        //   return true
        // }
        // this.postAsignacion({
        //   recorrido: Number(this.recorrido),
        //   empleado: this.idEmpleadoAsignado,
        //   diasAsignacion: this.diasAsignacion
        // })
        return false
      }
    }
  }

</script>
<style>

</style>
