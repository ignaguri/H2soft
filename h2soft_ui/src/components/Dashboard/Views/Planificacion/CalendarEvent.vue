<template>
  <tooltip effect="fadein" :content="getTooltipContent(e)" placement="right" trigger="click">
    <div
      :key="e.event.id"
      :class="getClasses(e)"
      :title="e.event.title"
      :style="`top:${getEventTop(e)};cursor: pointer;${e.event.originalEvent.style}`"
      class="cv-event"
      @click.stop="onClickEvent(e)"
      v-html="getEventTitle(e)">
    </div>
  </tooltip>
</template>
<script>
  import { tooltip } from 'vue-strap'
  export default {
    components: {
      tooltip
    },
    props: [
      'e'
    ],
    data () {
      return {}
    },
    methods: {
      onClickEvent (e) {
        return `${e.event.title}`
      },
      getEventTitle (e) {
        return `${e.event.title}`
      },
      getEventTop (e) {
        return `${e.top}`
      },
      getClasses (e) {
        const classesWithoutSpan = e.event.classes.filter(c => !c.startsWith('span'))
        return classesWithoutSpan
      },
      getTooltipContent (e) {
        const turno = e.event.originalEvent.classes === 'orange' ? 'Mañana' : 'Tarde'
        const visitado = e.event.originalEvent.entregado ? 'Sí' : 'No'
        const recorrido = e.event.originalEvent.idRecorrido
        const empleado = e.event.originalEvent.empleado
        return `Turno: ${turno} - Asignado a: ${empleado} - Visitado: ${visitado} - Recorrido: ${recorrido}`
      }
    }
  }
</script>
<style>
</style>
