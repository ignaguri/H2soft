<template>
  <div>
    <div class="row">
      <recorridos-list v-if="show === 'list'" @emitted="capturarEvento" :idRecorrido="idRecorrido"></recorridos-list>
      <new-recorrido-form v-if="show === 'form'" :edit="edit" :idRecorrido="idRecorrido"></new-recorrido-form>
      <calendario v-if="show === 'calendar'"></calendario>
    </div>
    <div class="row">
    </div>
  </div>
</template>
<script>
  import RecorridosList from './Planificacion/RecorridosList.vue'
  import NewRecorridoForm from './Planificacion/NewRecorridoForm.vue'
  import Calendario from './Planificacion/Calendario.vue'

  export default {
    components: {
      RecorridosList,
      NewRecorridoForm,
      Calendario
    },
    data () {
      return {
        show: 'list', // list, form, calendar
        edit: false,
        idRecorrido: 0
      }
    },
    beforeRouteEnter (to, from, next) {
      if (from.path.includes('login')) {
        next(vm => {
          location.reload()
        })
      } else {
        next()
      }
    },
    methods: {
      addClient () {
        this.edit = false
        this.show = 'form'
      },
      seeList () {
        this.show = 'list'
      },
      capturarEvento (e) {
        switch (e.action) {
          case 'edit':
            this.edit = true
            this.idRecorrido = parseInt(e.client)
            this.show = 'form'
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
