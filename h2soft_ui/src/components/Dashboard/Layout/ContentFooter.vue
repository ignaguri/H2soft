<template>
  <footer class="footer">
    <div class="container-fluid">
      <nav class="pull-left">
        <ul>
          <li>
            <router-link :to="{path:'/admin/usuarios'}">{{user}}</router-link>
          </li>
        </ul>
      </nav>
      <div class="copyright pull-right">
        &copy; Hecho con
        <i class="fa fa-heart heart"></i> por
        <a href="mailto:teamh2soft@gmail.com">H2Soft team</a>.
      </div>
    </div>
  </footer>
</template>
<script>
  export default {
    computed: {
      user () {
        if (JSON.parse(sessionStorage.getItem('user')).nombre) {
          return JSON.parse(sessionStorage.getItem('user')).nombre + ' ' + JSON.parse(sessionStorage.getItem('user')).apellido
        } else {
          return JSON.parse(sessionStorage.getItem('user')).email
        }
      }
    }
  }

</script>
<style>

</style>
