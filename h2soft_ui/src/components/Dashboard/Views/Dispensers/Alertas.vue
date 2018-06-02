<template>
  <div>
    <div class="row">
      <alertas-list v-if="isAlertasList" @emitted="capturarEvento"></alertas-list>
      <alertas-new v-if="!isAlertasList" :edit="edit" :id="idAlerta"></alertas-new>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="text-center">
          <button type="button" class="btn btn-info btn-fill btn-wd" @click="addAlerta" v-show="isAlertasList">
            Agregar alerta
          </button>
          <button type="button" class="btn btn-default btn-fill btn-wd" @click="seeList" v-show="!isAlertasList">
            Volver
          </button>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import AlertasList from './AlertasList'
  import AlertasNew from './AlertasNew'

  export default {
    components: {
      AlertasList,
      AlertasNew
    },
    data () {
      return {
        isAlertasList: true,
        edit: false,
        idAlerta: null
      }
    },
    methods: {
      addAlerta () {
        this.edit = false
        this.isAlertasList = false
      },
      seeList () {
        this.isAlertasList = true
        this.idAlerta = 0
        this.edit = false
      },
      capturarEvento (e) {
        switch (e.action) {
          case 'edit':
            this.edit = true
            this.idAlerta = Number(e.alerta)
            this.isAlertasList = false
            break
          case 'erase':
            console.log('borrar', e.alerta)
            break
        }
      }
    }
  }

</script>
<style>

</style>
