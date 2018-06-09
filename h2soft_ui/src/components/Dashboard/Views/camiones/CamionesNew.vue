<template>
  <div class="card">
    <div class="header">
      <h3 class="title" v-if="!edit">Agregar nuevo camión</h3>
      <h3 class="title" v-if="edit">Editar camión</h3>
    </div>
    <div class="content">
      <form name="new_camion_form" @submit.prevent="guardarCamion">
        <div class="row">
          <div class="col-md-6">
            <h5>Nombre</h5>
            <fg-input type="text"
                      label=""
                      :disabled="false"
                      placeholder="Código"
                      v-model="camion.nombre"
                      required
            >
            </fg-input>
          </div>
          <div class="col-md-6">
            <h5>Capacidad Máxima</h5>
            <fg-input type="number"
                      label=""
                      :disabled="false"
                      placeholder="Número"
                      v-model="camion.capacidadMaxima"
                      required
            >
            </fg-input>
          </div>
        </div>
        <hr>
        <div class="text-center">
          <button type="submit" class="btn btn-success btn-fill btn-wd">
            Guardar
          </button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </div>
</template>
<script>
  // import auth from 'src/api/auth'
  import api from 'src/api/services/camionServices'
  import noti from 'src/api/notificationsService'
  import sele from 'vue-strap/src/Select.vue'
  import check from 'vue-strap/src/Checkbox.vue'
  // import fgdrop from 'components/UIComponents/Inputs/formGroupDropDown.vue'

  export default {
    components: {
      sele,
      check
    },
    data () {
      return {
        camion: {
          idCamiones: '',
          nombre: '',
          capacidadMaxima: 0
        }
      }
    },
    props: {
      edit: Boolean,
      id: Number
    },
    mounted () {
      this.cargarCamion()
    },
    methods: {
      guardarCamion () { // metodo para gurdar Camion, tanto nuevos como edición
        if (!this.edit) {
          api.postCamiones(this, this.camion)
            .then(res => {
              if (res) {
                noti.exitoConTexto(this, 'Éxito', 'Camión guardado con éxito!')
                this.limpiarCampos()
              } else {
                noti.errorConTexto(this, 'Error', 'Error al guardar el camión')
              }
            })
        } else {
          api.editCamion(this, this.camion)
            .then(res => {
              if (res) {
                noti.exitoConTexto(this, 'Éxito', 'Camión guardado con éxito!')
                this.limpiarCampos()
              } else {
                noti.errorConTexto(this, 'Error', 'Error al guardar el camión')
              }
            })
        }
      },
      cargarCamion () {
        console.log('ID CAMION:' + JSON.stringify(this.id))
        if (this.id !== 0 && this.edit) {
          api.getCamion(this, this.id).then(camio => {
            console.log('CAMION:' + JSON.stringify(camio.body.nombre))
            this.camion.idCamiones = camio.body.idCamiones
            this.camion.nombre = camio.body.nombre
            this.camion.capacidadMaxima = camio.body.capacidadMaxima
          })
        }
      },
      limpiarCampos () {
        this.camion.idCamiones = null
        this.camion.nombre = null
        this.camion.capacidadMaxima = null
      }
    }
  }
</script>
<style>

</style>
