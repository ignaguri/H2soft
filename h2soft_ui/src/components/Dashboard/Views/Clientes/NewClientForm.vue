<template>
  <div class="card">
    <div class="header">
      <h3 class="title" v-if="!edit">Agregar nuevo cliente</h3>
      <h3 class="title" v-if="edit">Editar cliente</h3>
    </div>
    <div class="content">
      <form name="new_client_form" @submit.prevent="saveClient">
        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="Nombre/Razón social*"
                      placeholder="Nombre/Razón social"
                      v-model="cliente.razonSocial"
                      :disabled="edit"
                      required>
            </fg-input>
          </div>
          <div class="col-md-4 col-md-offset-1">
            <fg-input type="text"
                      label="CUIL/CUIT*"
                      placeholder="CUIL/CUIT"
                      v-model="cliente.CUIL"
                      required>
            </fg-input>
          </div>
        </div>
          <div class="row">
            <div class="col-md-5">
              <div class="form-group">
                <label for="tipoCliente">
                  <h4><span class="label label-default">Tipo de cliente*</span></h4>
                </label>
                <dds id="tipoCliente" v-model="cliente.idTipo"
                     :options="tiposCliente"
                     options-value="idTiposCliente" search-text="Buscar"
                     :placeholder="'Nada seleccionado'"
                     options-label="nombre"
                     :search="true" :justified="true">
                </dds>
              </div>
            </div>
            <div class="col-md-6">
              <label>Domicilio Fiscal</label>
              <vga ref="address"
                   id="map"
                   classname="form-control border-input"
                   placeholder="Ingrese la dirección"
                   v-on:placechanged="getAddressData"
                   country="ar">
              </vga>
            </div>
          </div>
        <div class="header">
          <h4 class="title">Información de contacto</h4>
        </div>
        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="Nombre*"
                      placeholder="Nombre"
                      v-model="contacto.nombre"
                      required>
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input type="email"
                      label="Mail*"
                      placeholder="Dirección de email"
                      v-model="contacto.mail"
                      required>
            </fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <fg-input type="tel"
                      label="Teléfono"
                      placeholder="Teléfono fijo"
                      v-model="contacto.telefono">
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input type="tel"
                      label="Celular"
                      placeholder="Teléfono celular"
                      v-model="contacto.celular">
            </fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>Observaciones</label>
              <textarea rows="3" class="form-control border-input"
                        placeholder="Alguna observación especial, rol de la persona en la empresa, etc."
                        v-model="contacto.observaciones">
              </textarea>
            </div>
          </div>
        </div>
        <objetivos-list :objetivos="objetivos" :edit="edit" @new_objetivo="captarObjetivo" @delete_objetivo="borrarObjetivo"></objetivos-list>
        <div class="row">
          <div class="text-center">
            <button type="submit" class="btn btn-success btn-fill btn-wd">
              Guardar cliente
            </button>
          </div>
          <div class="clearfix"></div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  import api from 'src/api/services/clientServices'
  import ObjetivosList from './ObjetivosList.vue'
  import VueGoogleAutocomplete from 'vue-google-autocomplete'
  import { select } from 'vue-strap'
  import noti from 'src/api/notificationsService'

  export default {
    components: {
      ObjetivosList,
      vga: VueGoogleAutocomplete,
      dds: select
    },
    props: {
      edit: Boolean,
      idCliente: Number
    },
    data () {
      return {
        cliente: {
          razonSocial: '',
          CUIL: null,
          direccion: '',
          idTipo: null
        },
        contacto: {
          nombre: '',
          telefono: null,
          celular: null,
          mail: '',
          observaciones: ''
        },
        objetivos: [],
        tiposCliente: [],
        address: ''
      }
    },
    mounted () {
      this.cargarTiposCliente()
      this.cargarCliente()
    },
    methods: {
      saveClient () {
        if (this.objetivos.length <= 0) {
          noti.errorConTexto(this, 'Error', 'Debe agregar al menos 1 objetivo')
          return
        }
        if (!this.edit) {
          api.postClientes(this, this.cliente, this.contacto, this.objetivos).then(res => {
            if (res) {
              console.log('devolvió true en newclientlist')
              noti.exitoConTexto(this, 'Éxito', 'Cliente guardado con éxito')
            } else {
              console.log('saveclient devolvio false')
              noti.errorConTexto(this, 'Error', 'Error al eliminar un cliente, check consola')
            }
          })
        } else {
          api.editClientes(this, this.idCliente, this.cliente, this.contacto, this.objetivos).then(res => {
            if (res) {
              console.log('devolvió true en edit')
              noti.exitoConTexto(this, 'Éxito', 'Cliente editado con éxito')
            } else {
              console.log('editar devolvio false')
              noti.errorConTexto(this, 'Error', 'Error al editar el cliente, check consola')
            }
          })
        }
        this.$parent.isClientList = true
      },
      captarObjetivo (ob) {
        this.objetivos.push(ob)
      },
      borrarObjetivo (ob) {
        this.objetivos = this.objetivos.filter(objs => objs.nombre !== ob)
      },
      cargarCliente () {
        if (this.idCliente !== -1 && this.edit) {
          api.getClienteFull(this, this.idCliente).then(r => {
            console.log('me ha iegado', r)
            this.cliente.razonSocial = r.cliente.razonSocial
            this.cliente.CUIL = r.cliente.CUIL
            this.$refs.address.update(r.cliente.direccion)
            this.cliente.direccion = r.cliente.direccion
            this.cliente.idTipo = r.cliente.idTipo
            this.contacto.nombre = r.contacto.nombre
            this.contacto.mail = r.contacto.mail
            this.contacto.celular = r.contacto.celular
            this.contacto.telefono = r.contacto.telefono
            this.contacto.observaciones = r.contacto.observaciones
            r.objetivos.forEach(o => {
              this.objetivos.push({
                nombre: o.nombre,
                direccion: o.direccion,
                localidad: o.localidad
              })
            })
          })
        }
      },
      cargarTiposCliente () {
        api.getTiposCliente(this).then(r => {
          this.tiposCliente = r
        })
      },
      getAddressData (addressData, placeResultData) {
        console.log('addressData:', addressData)
        console.log('placeresultdata:', placeResultData)
        // let dirAcortada = addressData.route + ', ' + addressData.street_number + ', ' + addressData.locality
        this.cliente.direccion = placeResultData.formatted_address
      }
    }
  }

</script>
<style>

</style>
