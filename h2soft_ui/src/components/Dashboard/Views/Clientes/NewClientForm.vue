<template>
  <div class="card">
    <div class="header">
      <h3 class="title">Agregar nuevo cliente</h3>
    </div>
    <div class="content">
      <form>
        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="Empresa"
                      placeholder="Razón social"
                      v-model="cliente.razonSocial">
            </fg-input>
          </div>
          <div class="col-md-4 col-md-offset-1">
            <fg-input type="text"
                      label="CUIL"
                      placeholder="CUIL"
                      v-model="cliente.cuil">
            </fg-input>
          </div>
          <div class="row">
            <div class="col-md-6 col-md-offset-3">
              <fg-input type="text"
                        label="Dirección de la oficina central"
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
                      v-model="contacto.nombre">
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input type="text"
                      label="Mail"
                      placeholder="Dirección de email"
                      v-model="contacto.mail">
            </fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="Teléfono"
                      placeholder="Teléfono fijo"
                      v-model="contacto.telefono">
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input type="text"
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
        <div class="header">
          <h4 class="title">Objetivo/Lugar de reparto</h4>
        </div>
        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="Nombre"
                      placeholder="Nombre"
                      v-model="objetivo.nombre">
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input type="text"
                      label="Dirección"
                      placeholder="Dirección del lugar"
                      v-model="objetivo.direccion">
            </fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-md-offset-4">
            <label for="localidad">Localidad</label>
            <select id="localidad" v-model="objetivo.localidad">
              <option value="">Seleccione una localidad</option>
              <option v-for="loc in localidades" v-bind:value="loc.idLocalidad">
                {{ loc.nombre }}
              </option>
            </select>
          </div>
        </div>
        <hr>
        <div class="text-center">
          <button type="submit" class="btn btn-success btn-fill btn-wd" @click="saveClient">
            Guardar cliente
          </button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </div>
</template>
<script>
  import auth from '../../../../api/auth'
  export default {
    data () {
      return {
        cliente: {
          razonSocial: '',
          cuil: '',
          direccion: ''
        },
        contacto: {
          nombre: '',
          telefono: '',
          celular: '',
          mail: '',
          observaciones: ''
        },
        objetivo: {
          nombre: '',
          direccion: '',
          localidad: ''
        },
        localidades: {}
      }
    },
    mounted () {
      this.getLocalidades()
    },
    methods: {
      saveClient () {
        alert('Cliente guardado con éxito')
        this.$parent.current = 'ClientsList'
        this.$parent.isClientList = true
      },
      getLocalidades () {
        this.$http.get('http://localhost:3030/localidades', { headers: auth.getAuthHeader() })
          .then(res => {
            this.localidades = res.body.data
          })
      }
    }
  }

</script>
<style>

</style>
