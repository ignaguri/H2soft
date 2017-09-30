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
        <button type="button" class="btn btn-info btn-fill btn-wd" @click="showCustomModal = true">
          Agregar Objetivo
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
          <fg-input type="text"
                    label="Dirección"
                    placeholder="Dirección del lugar"
                    v-model="direccion">
          </fg-input>
        </div>
        <div class="col-md-6 col-md-offset-3">
          <label for="localidad">Localidad</label>
          <select id="localidad" v-model="idLocalidad">
            <option value="none">Seleccione una localidad</option>
            <option v-for="loc in localidades" v-bind:value="loc.idLocalidad">
              {{ loc.nombre }}
            </option>
          </select>
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
  import api from 'src/api/services/clientServices'
  import { modal } from 'vue-strap'

  const tableColumns = ['Nombre', 'Direccion', 'Localidad']
  // TODO: guardar lista en localStorage para ahorrar llamados a la api
  // TODO: ver como hacer para que despues del login recien se ejecute el getLocalidades
  export default {
    components: {
      PaperTable,
      modal
    },
    data () {
      return {
        showCustomModal: false,
        localidades: {},
        nombre: '',
        direccion: '',
        idLocalidad: -1,
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
      objetivos: function changer () {
        this.cargarObjetivos()
      }
    },
    mounted () {
      this.cargarObjetivos()
      this.getLocalidades()
    },
    methods: {
      cargarObjetivos () {
        if (this.edit) {
          api.getObjetivos(this, this.idCliente).then(res => {
            res.forEach(ob => {
              this.table1.data.push({
                id: ob.idObjetivosXCliente,
                nombre: ob.nombre,
                direccion: ob.direccion,
                localidad: ob.idLocalidad
              })
            })
          }, error => {
            console.log('error ' + JSON.stringify(error))
          })
        } else {
          this.table1.data = []
          this.objetivos.forEach(ob => {
            this.table1.data.push({
              nombre: ob.nombre,
              direccion: ob.direccion,
              localidad: ob.idLocalidad
            })
          })
        }
      },
      getLocalidades () {
        api.getLocalidades(this)
          .then(res => {
            this.localidades = res
          })
      },
      editar (e) {
        console.log('editar id: ' + e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML)
      },
      borrar (e) {
        let toDelete = e.target.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML
        console.log('borrar name: ' + toDelete)
        this.$emit('delete_objetivo', toDelete)
      },
      ok () {
        // return !confirm('Ok event.\nClose Modal?')
        if (this.nombre === '' || this.direccion === '' || isNaN(this.idLocalidad)) {
          alert('Debe completar todos los campos')
          return true
        }
        this.$emit('new_objetivo', {nombre: this.nombre, direccion: this.direccion, idLocalidad: this.idLocalidad})
        return false
      }
    }
  }

</script>
<style>

</style>
