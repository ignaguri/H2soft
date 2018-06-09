<template>
  <div>
    <div class="row">
      <empleados-list v-if="isEmpleadosList" @emitted="capturarEvento"></empleados-list>
      <empleados-new v-if="!isEmpleadosList" :edit="edit" :id="idEmpleados"></empleados-new>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="text-center">
          <button type="button" class="btn btn-info btn-fill btn-wd" @click="addEmpleado" v-if="isEmpleadosList">
            Agregar empleado
          </button>
          <button type="button" class="btn btn-default btn-fill btn-wd" @click="seeList" v-if="!isEmpleadosList">
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
  import EmpleadosList from './EmpleadosList.vue'
  import EmpleadosNew from './EmpleadosNew.vue'

  export default {
    components: {
      EmpleadosList,
      EmpleadosNew
    },
    data () {
      return {
        isEmpleadosList: true,
        edit: false,
        idEmpleados: 0
      }
    },
    methods: {
      addEmpleado () {
        this.edit = false
        this.isEmpleadosList = false
      },
      seeList () {
        this.isEmpleadosList = true
        this.idEmpleados = 0
        this.edit = false
      },
      capturarEvento (e) {
        switch (e.action) {
          case 'edit':
            console.log('editar empl: ', e.client)
            this.edit = true
            this.idEmpleados = parseInt(e.client)
            this.isEmpleadosList = false
            break
          case 'ver':
            console.log('ver empl: ', e.client)
            break
        }
      }
    }
  }

</script>
<style>

</style>
