<template>
  <!-- <div class="row"> -->
    <!-- <div class="col-sm-1">
      <span :class="icon"></span>
    </div>
    <div class="col-sm-10">
      <a href="#/bidonesdispensers">{{message}}</a>
      <hr>
    </div> -->
    <!-- <div class="col-sm-12"> -->
      <a href="#" class="thumbnail"><span :class="icon"></span> {{message}}</a>
    <!-- </div> -->
    <!--<div class="col-sm-1">-->
      <!--<span>&times;</span>-->
    <!--</div>-->
  <!-- </div> -->
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
  .top-notification {
    background-color: #F3BB45;
  }
  .top-notification a {
    color: white;
  }
</style>
