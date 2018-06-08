<template>
  <div>
    <div class="row">
      <productos-list v-if="isProductoList" @emitted="capturarEvento"></productos-list>
      <nuevo-producto-form v-if="!isProductoList" :edit="edit" :idProducto="idProducto"></nuevo-producto-form>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="text-center">
          <button type="button" class="btn btn-info btn-fill btn-wd" @click="addProducto" v-show="isProductoList">
            Agregar producto
          </button>
          <button type="button" class="btn btn-default btn-fill btn-wd" @click="seeList" v-show="!isProductoList">
            Volver
          </button>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>
<script>
  // TODO: poner los botones en cada componente
  import ProductosList from 'src/components/Dashboard/Views/Productos/ProductosList'
  import NuevoProductoForm from 'src/components/Dashboard/Views/Productos/NuevoProductoForm'

  export default {
    components: {
      ProductosList,
      NuevoProductoForm
    },
    data () {
      return {
        isProductoList: true,
        edit: false,
        idProducto: -1
      }
    },
    methods: {
      addProducto () {
        this.edit = false
        this.isProductoList = false
      },
      seeList () {
        this.isProductoList = true
      },
      capturarEvento (e) {
        switch (e.action) {
          case 'edit':
            this.edit = true
            this.idProducto = parseInt(e.prod)
            this.isProductoList = false
            break
        }
      }
    }
  }

</script>
<style>

</style>
