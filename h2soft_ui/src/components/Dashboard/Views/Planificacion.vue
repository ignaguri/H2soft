<template>
  <div>
    <div class="row">
      <recorridos-list v-if="isRecorridoList" @emitted="capturarEvento" :idRecorrido="idRecorrido"></recorridos-list>
      <new-recorrido-form v-if="!isRecorridoList" :edit="edit" :idRecorrido="idRecorrido"></new-recorrido-form>
    </div>
    <div class="row">
<!--      <div class="col-md-12">
        <div class="text-center">
          <button type="button" class="btn btn-info btn-fill btn-wd" @click="addClient" v-show="isRecorridoList">
            Nuevo Recorrido
          </button>
          <button type="button" class="btn btn-danger btn-fill btn-wd" @click="seeList" v-show="!isRecorridoList">
            Cancelar
          </button>
        </div>
        <div class="clearfix"></div>
      </div>-->
    </div>
  </div>
</template>
<script>
  // TODO: poner los botones en cada componente
  import RecorridosList from './Planificacion/RecorridosList.vue'
  import NewRecorridoForm from './Planificacion/NewRecorridoForm.vue'

  export default {
    components: {
      RecorridosList,
      NewRecorridoForm
    },
    data () {
      return {
        isRecorridoList: true,
        edit: false,
        idRecorrido: 0
      }
    },
    methods: {
      addClient () {
        this.edit = false
        this.isRecorridoList = false
      },
      seeList () {
        this.isRecorridoList = true
      },
      capturarEvento (e) {
        switch (e.action) {
          case 'edit':
            console.log('editar cliente: ', e.client)
            this.edit = true
            this.idRecorrido = parseInt(e.client)
            this.isRecorridoList = false
            break
          case 'ver':
            console.log('ver cliente: ', e.client)
            break
        }
      }
    }
  }

</script>
<style>

</style>
