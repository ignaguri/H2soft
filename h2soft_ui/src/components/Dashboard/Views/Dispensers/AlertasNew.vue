<template>
  <div class="card">
    <div class="content">
      <form name="new_alerta_form" @submit.prevent="guardarAlerta">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label for="cliente"><h4><span class="label label-default">Cliente</span></h4></label>
              <dds id="cliente" v-model="idClientes"
                   :options="clientes"
                   options-value="idClientes"
                   options-label="razonSocial"
                   search-text="Buscar"
                   :placeholder="'Sin selección'"
                   :search="true" :justified="true" required>
              </dds>
              <label for="objetivo"><h4><span class="label label-default">Objetivo</span></h4></label>
              <dds id="objetivo" v-model="alerta.idObjetivo"
                   :options="objetivos"
                   options-value="idObjetivosXCliente"
                   options-label="nombre"
                   search-text="Buscar"
                   :placeholder="'Seleccione un cliente'"
                   :search="true" :min-search="4" :justified="true"
                   @input="cargarDispensers" required>
              </dds>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label for="tipo"><h4><span class="label label-default">Tipo</span></h4></label>
              <dds id="tipo" v-model="alerta.idTipo"
                   :options="tipos"
                   options-value="idTipoAlerta"
                   options-label="nombre"
                   search-text="Buscar"
                   :placeholder="'Nada seleccionado'"
                   :search="true" :min-search="4" :justified="true"
                   required>
              </dds>
              <template v-if="alerta.idTipo === 1">
                <label for="dispenser"><h4><span class="label label-default">Dispenser</span></h4></label>
                <dds id="dispenser" v-model="alerta.idDispenser"
                     :options="dispensers"
                     options-value="idDispensers"
                     options-label="datos"
                     search-text="Buscar"
                     :placeholder="'Seleccione un objetivo'"
                     :search="true" :min-search="4" :justified="true"
                     @input="cargarMensaje" required>
                </dds>
              </template>
              <template v-else-if="alerta.idTipo === 2">
                <label for="bidones"><h4><span class="label label-default">Bidones</span></h4></label>
                  <dds id="bidones" v-model="alerta.bidones"
                     :options="bidones"
                     options-value="index"
                     options-label="number"
                     search-text="Buscar"
                     :placeholder="'Cantidad de bidones'"
                     :search="true" :justified="true"
                     @input="cargarMensaje" required>
                </dds>
                <!-- <input type="number" id="bidones" class="form-control border-input" min="0" max="100"
                       v-model="alerta.bidones" style="max-width: 100px" @input="cargarMensaje" required/> -->
              </template>
              <template v-if="alerta.idTipo === 3">
                <label for="desvin_dispenser"><h4><span class="label label-default">Dispenser</span></h4></label>
                <dds id="desvin_dispenser" v-model="alerta.idDispenser"
                     :options="dispensers"
                     options-value="idDispensers"
                     options-label="datos"
                     search-text="Buscar"
                     :placeholder="'Seleccione un objetivo'"
                     :search="true" :justified="true"
                     @input="cargarMensaje" required>
                </dds>
              </template>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8 col-md-offset-2">
            <h5>Mensaje</h5>
            <fg-input type="text"
                      label=""
                      :disabled="true"
                      placeholder="Seleccione un tipo de alerta"
                      v-model="alerta.notificacion"
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
  import apiRecorridos from 'src/api/services/recorridoServices'
  import apiDispensers from 'src/api/services/dispensersServices'
  import api from 'src/api/services/alertasServices'
//  import noti from 'src/api/notificationsService'
  import { select } from 'vue-strap'

  export default {
    components: {
      dds: select
    },
    data () {
      return {
        alerta: {
          idObjetivo: null,
          idTipo: null,
          notificacion: '',
          idDispenser: null,
          bidones: null,
          idEstado: 1,
          isDesvinculacion: false
        },
        clientes: [],
        idClientes: null,
        objetivos: [],
        tipos: [],
        dispensers: []
      }
    },
    props: {
      id: Number
    },
    mounted () {
      this.cargarClientes()
      this.cargarTiposAlerta()
      this.cargarEstadosAlerta()
    },
    computed: {
      bidones: function () {
        const bidones = []
        for (let i in [...Array(100).keys()]) {
          bidones.push({
            index: Number(i),
            number: Number(i)
          })
        }
        return bidones
      }
    },
    watch: {
      idClientes: function () {
        this.cargarObjetivos()
      }
    },
    methods: {
      cargarClientes () {
        apiRecorridos.getClientes(this)
          .then(r => {
            this.clientes = r
          })
      },
      cargarObjetivos () {
        if (this.idClientes !== null) {
          apiRecorridos.getObjetivos(this, this.idClientes)
            .then(r => {
              this.objetivos = r
            })
        } else {
          this.objetivos = null
        }
      },
      cargarTiposAlerta () {
        api.getTipos(this)
          .then(r => {
            this.tipos = r
          })
      },
      cargarDispensers () {
        if (this.alerta.idObjetivo !== null) {
          apiDispensers.getDispensersXObjetivo(this, this.alerta.idObjetivo)
            .then(r => {
              r.forEach(d => {
                d.datos = `(Cód: ${d.codigo}) ${d.descripcion}`
              })
              this.dispensers = r
            })
        } else {
          this.dispensers = null
        }
      },
      cargarMensaje (e) {
        const dispenser = this.dispensers.find(d => d.idDispensers === this.alerta.idDispenser)
        const objetivo = this.objetivos.find(o => o.idObjetivosXCliente === this.alerta.idObjetivo)
        if (!objetivo) {
          this.alerta.notificacion = ''
          return
        }
        switch (this.alerta.idTipo) {
          case 1:
            this.alerta.notificacion = `Cambiar dispenser (Cód: ${dispenser.codigo}) ${dispenser.descripcion} en ${objetivo.nombre}`
            break
          case 2:
            this.alerta.notificacion = `Llevar ${this.alerta.bidones} bidones a ${objetivo.nombre}`
            break
          case 3:
            this.alerta.notificacion = `Desvincular dispenser (Cód: ${dispenser.codigo}) ${dispenser.descripcion} de ${objetivo.nombre}`
            break
          default:
            this.alerta.notificacion = 'Seleccione un tipo de alerta'
        }
      },
      guardarAlerta () {
        api.postAlerta(this, this.alerta)
          .then(r => {
            if (r) {
              alert('Alerta guardada con éxito')
              this.$parent.isAlertasList = true
            } else {
              alert('Hubo un error al guardar la alerta')
            }
          })
      }
    }
  }
</script>
<style>

</style>
