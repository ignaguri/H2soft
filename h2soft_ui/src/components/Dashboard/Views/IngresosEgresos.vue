<template>
  <div>
    <div class="row">
      <listado-ingresos-egresos v-if="this.isIngresoEgresoList"></listado-ingresos-egresos>
      <nuevo-ingreso-egreso v-if="!this.isIngresoEgresoList" :idGasto="idIngresoEgreso" :edit="edit" :cambiarImagen="cambImagen" ></nuevo-ingreso-egreso>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="text-center">
          </br>
          <button type="button" class="btn btn-default btn-fill btn-wd" v-show="this.isIngresoEgresoList" @click="newGasto">
            Volver
          </button>
          <button type="button" class="btn btn-info btn-fill btn-wd" @click="seeList" v-show="!this.isIngresoEgresoList" >
            Ver Ingresos/Egresos
          </button>
        </div>
        <div class="clearfix" ></div>
      </div>
    </div>
  </div>
</template>
<script>
  import ListadoIngresosEgresos from './LibroDiario/ListadoIngresosEgresos.vue'
  import NuevoIngresoEgreso from './LibroDiario/NuevoIngresoEgreso.vue'
  export default {
    components: {
      ListadoIngresosEgresos,
      NuevoIngresoEgreso
    },
    data () {
      return {
        isIngresoEgresoList: false,
        idIngresoEgreso: -1,
        edit: false,
        cambImagen: true
      }
    },
    methods: {
      seeList () {
        this.isIngresoEgresoList = true
      },
      newGasto () {
        this.isIngresoEgresoList = false
        this.idIngresoEgreso = -1
        this.edit = false
      },
      capturarEvento (e) {
        switch (e.action) {
          case 'edit2':
            this.edit = true
            this.isIngresoEgresoList = false
            this.cambImagen = false
            console.log('Pase x captuar evento')
            break
        }
      }
    }
  }
</script>
<style>

</style>
