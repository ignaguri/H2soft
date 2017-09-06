<template>
  <div class="card">
    <div class="header">
      <h3 class="title">Agregar nuevo contrato</h3>
    </div>
    <div class="content">
      <form @submit.prevent="guardarContrato">
        <div class="row">
          <div class="col-md-6 col-md-offset-3">
            <fg-input type="number"
                      label="Cliente"
                      placeholder="Numero ID"
                      v.model="contrato.cliente"
                      required>
            </fg-input>
          </div>
        </div>
          <div class="row">
            <div class="col-md-6">
              <fg-input type="date"
                        label="Fecha de firma"
                        placeholder="Fecha"
                        v-model="contrato.fechaFirma"
                        required>
              </fg-input>
            </div>
            <div class="col-md-6">
              <fg-input type="date"
                        label="Fecha de vigencia"
                        placeholder="Fecha"
                        v-model="contrato.fechaVigencia"
                        required>
              </fg-input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <fg-input type="number"
                        label="Cantidad del producto"
                        placeholder="Cantidad"
                        v-model="contrato.cantidad"
                        required>
              </fg-input>
            </div>
            <div class="col-md-6">
              <fg-input type="number"
                        label="Precio por unidad"
                        placeholder="Precio"
                        v-model="contrato.precio"
                        required>
              </fg-input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <fg-input type="number"
                        label="Producto"
                        placeholder="producto ID"
                        v-model="contrato.producto"
                        required>
              </fg-input>
            </div>
          </div>
          <hr>
           <div class="text-center">
             <button type="submit" @click="guardarContrato" class="btn btn-success btn-fill btn-wd">
              Guardar cliente
             </button>
            </div>
          <div class="clearfix"></div>
      </form>
    </div>
  </div>
</template>
<script>

  // TODO: el cliente y producto se tiene que poder seleccionar con un combo para cada uno
  // TODO: validaciones de los campos

import api from 'src/api/services'
  export default {
    data () {
      return {
        contrato: {
          cliente: '',
          fechaFirma: '',
          fechaVigencia: '',
          cantidad: '',
          precio: '',
          producto: ''
        }
      }
    },
    mounted () {
    },
    methods: {
      guardarContrato () {
        api.postContratos(this, this.contrato).then(res => {
          console.log('res es ' + res)
          if (res) {
            console.log('devolvió true en nuevoContrato')
            alert('Contrato guardado con exito')
          } else {
            console.log('devolvio false')
            alert('Error al guardar el cliente. check consola')
          }
        })
        this.$parent.current = 'ContratosLista'
        this.$parent.isContratosList = true
      }
    }
  }
</script>
<style>

</style>
