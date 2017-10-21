<template>
  <footer class="footer">
    <div class="container-fluid">
      <nav class="pull-left">
        <ul>
          <li>
            <router-link :to="{path:'/admin'}">Usuario</router-link>
          </li>
        </ul>
      </nav>
      <div class="copyright pull-right">
        &copy; Hecho con
        <i class="fa fa-heart heart"></i> por
        <a href="https://github.com/ignaguri/H2soft" target="_blank">H2Soft team</a>.
      </div>
    </div>
  </footer>
</template>
<script>
  export default {}

</script>
<style>

</style>
