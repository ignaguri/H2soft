<template>
  <div class="card">
    <div class="header">
      <h3 class="title">Agregar nuevo cliente</h3>
    </div>
    <div class="content">
      <form name="new_client_form" @submit.prevent="saveClient">
        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="Nombre/Razón social"
                      placeholder="Nombre/Razón social"
                      v-model="cliente.razonSocial"
                      :disabled="edit"
                      required>
            </fg-input>
          </div>
          <div class="col-md-4 col-md-offset-1">
            <fg-input type="text"
                      label="CUIL"
                      placeholder="CUIL"
                      v-model="cliente.CUIL"
                      required>
            </fg-input>
          </div>
          <div class="row">
            <div class="col-md-6 col-md-offset-3">
              <fg-input type="text"
                        label="Domicilio Fiscal"
                        placeholder="Dirección"
                        v-model="cliente.direccion">
              </fg-input>
            </div>
          </div>
        </div>
        <div class="header">
          <h4 class="title">Información de contacto</h4>
        </div>
        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="Nombre"
                      placeholder="Nombre"
                      v-model="contacto.nombre"
                      required>
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input type="email"
                      label="Mail"
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
        <!--<div class="header">
          <h4 class="title">Objetivo/Lugar de reparto</h4>
        </div>
        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="Nombre"
                      placeholder="Nombre"
                      v-model="objetivo.nombre"
                      required>
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input type="text"
                      label="Dirección"
                      placeholder="Dirección del lugar"
                      v-model="objetivo.direccion"
                      required>
            </fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-md-offset-4">
            <label for="localidad">Localidad</label>
            <select id="localidad" v-model="objetivo.idLocalidad" required>
              <option value="">Seleccione una localidad</option>
              <option v-for="loc in localidades" v-bind:value="loc.idLocalidad">
                {{ loc.nombre }}
              </option>
            </select>
          </div>
        </div>-->
        <objetivos-list :objetivos="objetivos" @new_objetivo="captarObjetivo" @delete_objetivo="borrarObjetivo"></objetivos-list>
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
  export default {
    components: {
      ObjetivosList
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
          direccion: ''
        },
        contacto: {
          nombre: '',
          telefono: null,
          celular: null,
          mail: '',
          observaciones: ''
        },
        objetivos: [],
        localidades: {}
      }
    },
    mounted () {
      this.cargarCliente()
      this.getLocalidades()
    },
    methods: {
      saveClient () {
        if (this.objetivos.length <= 0) {
          alert('Debe agregar al menos 1 objetivo')
          return
        }
        if (!this.edit) {
          api.postClientes(this, this.cliente, this.contacto, this.objetivos).then(res => {
            if (res) {
              console.log('devolvió true en newclientlist')
              alert('Cliente guardado con éxito')
            } else {
              console.log('saveclient devolvio false')
              alert('Error al guardar el cliente. check consola')
            }
          })
        } else {
          api.editClientes(this, this.idCliente, this.cliente, this.contacto, this.objetivos).then(res => {
            if (res) {
              console.log('devolvió true en edit')
              alert('Cliente editado con éxito')
            } else {
              console.log('editar devolvio false')
              alert('Error al editar el cliente. check consola')
            }
          })
        }
        this.$parent.isClientList = true
      },
      getLocalidades () {
        api.getLocalidades(this)
          .then(res => {
            this.localidades = res
          })
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
            this.cliente.direccion = r.cliente.direccion
            this.contacto.nombre = r.contacto.nombre
            this.contacto.mail = r.contacto.mail
            this.contacto.celular = r.contacto.celular
            this.contacto.telefono = r.contacto.telefono
            this.contacto.observaciones = r.contacto.observaciones
            r.objetivos.forEach(o => {
              this.objetivos.push({
                nombre: o.nombre,
                direccion: o.direccion,
                idLocalidad: o.idLocalidad
              })
            })
          })
        }
      }
    }
  }

</script>
<style>

</style>
