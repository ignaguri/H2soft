<template>
<div
    :key="e.event.id"
    :class="e.event.classes"
    :title="e.event.title"
    class="cv-event"
    @click.stop="onClickEvent(e)"
    v-html="getEventTitle(e)"/>
</template>
<script>
export default {
  components: {},
  props: [
    'e'
  ],
  data () {
    return {}
  },
  computed: {},
  mounted () {
    console.log('Rendering event with info:', this.e)
  },
  methods: {
    onClickEvent (e) {
      return `clicked ${e.event.title}`
    },
    getEventTitle (e) {
      return `${e.event.title}`
    }
  }
}
</script>
<style>
</style>
