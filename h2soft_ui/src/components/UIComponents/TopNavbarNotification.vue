<template>
      <a href="#/bidonesdispensers" class="thumbnail"><span :class="icon"></span> {{message}}</a>
</template>
<script>
  export default {
    props: {
      message: String,
      icon: {
        type: String,
        default: 'ti-alert'
      }
    },
    data () {
      return {}
    },
    methods: {}
  }

</script>
<style>
</style>
