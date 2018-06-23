<template>
  <div
    :key="e.event.id"
    :class="getClasses(e)"
    :title="e.event.title"
    :style="`top:${getEventTop(e)};${e.event.originalEvent.style}`"
    class="cv-event"
    @click.stop="onClickEvent(e)"
    v-html="getEventTitle(e)">
  </div>
</template>
<script>
export default {
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
    }
  }
}
</script>
<style>
</style>
