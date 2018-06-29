<template>
  <div class="card">
    <div class="header">
      <h4 class="title" v-if="!edit">Agregar nuevo producto</h4>
      <h4 class="title" v-if="edit">Editar producto</h4>
    </div>
    <div class="content">
      <form name="new_client_form" @submit.prevent="saveProducto">
        <div class="row">
          <div class="col-md-4">
            <fg-input type="text"
                      label="Nombre"
                      placeholder="Nombre"
                      v-model="producto.nombre"
                      required>
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      label="Descripción"
                      placeholder="Descripción"
                      v-model="producto.descripcion"
                      required>
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      label="Tamaño (Litros)"
                      placeholder="Tamaño en litros"
                      v-model="producto.tamanio"
                      required>
            </fg-input>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="text-center">
            <button type="submit" class="btn btn-success btn-fill btn-wd">
              Guardar producto
            </button>
          </div>
          <div class="clearfix"></div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  import api from 'src/api/services/productosServices'
  import VueGoogleAutocomplete from 'vue-google-autocomplete'
  import { select } from 'vue-strap'
  import noti from 'src/api/notificationsService'

  export default {
    components: {
      vga: VueGoogleAutocomplete,
      dds: select
    },
    props: {
      edit: Boolean,
      idProducto: Number
    },
    data () {
      return {
        producto: {
          nombre: '',
          descripcion: ''
        }
      }
    },
    mounted () {
      this.cargarProducto()
    },
    methods: {
      saveProducto () {
        if (!this.edit) {
          api.postProducto(this, this.producto).then(res => {
            if (res) {
              noti.exitoConTexto(this, 'Éxito', 'Producto guardado con éxito!')
            } else {
              noti.errorConTexto(this, 'Error', 'Error al guardar el producto')
            }
          })
        } else {
          api.editProducto(this, this.idProducto, this.producto).then(res => {
            if (res) {
              noti.exitoConTexto(this, 'Éxito', 'Producto editado con éxito!')
            } else {
              noti.errorConTexto(this, 'Error', 'Error al editar el producto')
            }
          })
        }
        this.$parent.isProductoList = true
      },
      cargarProducto () {
        if (this.idProducto !== -1 && this.edit) {
          api.getProductoXId(this, this.idProducto).then(r => {
            r = r[0]
            this.producto.nombre = r.nombre
            this.producto.descripcion = r.descripcion
            this.producto.tamanio = r.tamanio
          })
        }
      }
    }
  }

</script>
<style>

</style>
