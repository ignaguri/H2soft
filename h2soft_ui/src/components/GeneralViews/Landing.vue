<template>
  <div class="wrapper">
    <!--<div class="view">-->
    <!--<div class="full-bg-img flex-center">-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12 text-center">
          <img class="img-responsive logo" alt="h2soft logo" src="../../../static/img/h2s-logo6.png"/>
        </div>
        <div class="col-md-12 text-center">
          <h3 class="title">Sistema de gestión para empresas repartidoras de agua.</h3>
        </div>
        <div class="col-md-12">
          <br>
        </div>
        <div class="col-md-12 text-center">
          <button v-if="seen" id="btn_login" type="button" class="btn btn-lg btn-success btn-fill" @click="btn_login_click">
            Iniciar Sesión
          </button>
          <login v-if="!seen"></login>
        </div>
        <div class="col-md-12">
          <img class="img-responsive" alt="background" src="../../../static/img/fondo3_cutted.jpg"/>
        </div>
      </div>
    </div>
    <footer class="footer-demo">
      <div class="container">
        <div class="copyright pull-right">
          &copy; 2017, <i class="fa fa-heart heart"></i> por H2Soft team
        </div>
      </div>
    </footer>
    <!--</div>-->
    <!--</div>-->
  </div>
</template>

<style>
  .img-responsive.logo{
    max-height: 200px;
    max-width: 320px;
    margin-left: auto;
    margin-right: auto;
  }
</style>

<script>
  import Login from '../UIComponents/Inputs/Login.vue'
  export default {
    components: {
      Login
    },
    data () {
      return {
        seen: true
      }
    },
    methods: {
      btn_login_click () {
        this.seen = false
      }
    }
  }

</script>
