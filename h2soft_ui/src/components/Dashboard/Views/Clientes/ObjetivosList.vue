<template>
  <div>
    <div class="col-md-12">
      <div class="card">
        <paper-table type="hover" :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns" :editButton="false" :erase="borrar">

        </paper-table>
      </div>
    </div>
    <div class="col-md-4 col-md-offset-8">
      <div class="text-center">
        <button type="button" class="btn btn-info btn-fill btn-wd" @click="btn_agregar">
          Agregar objetivo
        </button>
      </div>
    </div>
    <modal effect="fade" width="50%" :value="showCustomModal" @ok="showCustomModal = ok()" title="Agregar objetivo">
      <div class="row">
        <div class="col-md-6">
          <fg-input type="text"
                    label="Nombre"
                    placeholder="Nombre"
                    v-model="nombre">
          </fg-input>
        </div>
        <div class="col-md-6">
          <label>Dirección</label>
          <vga ref="obAddress"
               id="objetiv"
               classname="form-control border-input"
               placeholder="Ingrese la dirección"
               v-on:placechanged="getAddressData"
               country="ar">
          </vga>
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
  import { modal } from 'vue-strap'
  import VueGoogleAutocomplete from 'vue-google-autocomplete'
  import noti from 'src/api/notificationsService'

  const tableColumns = ['Nombre', 'Dirección', 'Localidad']
  export default {
    components: {
      PaperTable,
      modal,
      vga: VueGoogleAutocomplete
    },
    data () {
      return {
        showCustomModal: false,
        nombre: '',
        direccion: '',
        localidad: '',
        obAddress: '',
        table1: {
          title: 'Objetivos',
          subTitle: 'Lista de objetivos donde entregar pedidos',
          columns: [...tableColumns],
          data: []
        }
      }
    },
    props: {
      idCliente: {
        type: Number,
        default: 0
      },
      edit: {
        type: Boolean,
        default: false
      },
      objetivos: {
        type: Array
      }
    },
    watch: {
      objetivos: function () {
        this.cargarObjetivos()
      }
    },
    mounted () {
      this.cargarObjetivos()
    },
    methods: {
      cargarObjetivos () {
        this.table1.data = []
        this.objetivos.forEach(ob => {
          this.table1.data.push({
            id: ob.idObjetivosXCliente,
            nombre: ob.nombre,
            direccion: ob.direccion,
            localidad: ob.localidad
          })
        })
      },
      borrar (e) {
        let toDelete = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        console.log('borrar name: ' + toDelete)
        this.$emit('delete_objetivo', toDelete)
      },
      ok () {
        // return !confirm('Ok event.\nClose Modal?')
        if (this.nombre === '' || this.direccion === '') {
          noti.infoConTexto(this, 'Alerta', 'Debe completar todos los campos')
          return true
        }
        this.$emit('new_objetivo', {nombre: this.nombre, direccion: this.direccion, localidad: this.localidad})
        return false
      },
      getAddressData (addressData, placeResultData) {
        console.log('addressData:', addressData)
        console.log('placeresultdata:', placeResultData)
        this.direccion = addressData.route.concat(addressData.street_number !== undefined ? ' ' + addressData.street_number : ' ' + 'S/N')
        this.localidad = addressData.locality !== undefined ? addressData.locality : addressData.administrative_area_level_1
      },
      btn_agregar () {
        this.nombre = ''
        this.direccion = ''
        this.localidad = ''
        this.$refs.obAddress.clear()
        this.showCustomModal = true
      }
    }
  }

</script>
<style>

</style>
