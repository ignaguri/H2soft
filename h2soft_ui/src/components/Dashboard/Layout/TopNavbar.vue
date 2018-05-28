<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" :class="{toggled: $sidebar.showSidebar}" @click="toggleSidebar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar bar1"></span>
          <span class="icon-bar bar2"></span>
          <span class="icon-bar bar3"></span>
        </button>
        <a class="navbar-brand">{{routeName}}</a>
      </div>
      <div class="navbar-right-menu">
        <ul class="nav navbar-nav navbar-right">
<!--          <li class="open">
            <a href="#" class="dropdown-toggle btn-magnify" data-toggle="dropdown">
              <i class="ti-panel"></i>
              <p>Stats</p>
            </a>
          </li>-->
             <drop-down :title="cantNotificaciones" icon="ti-bell">
               <li v-for="n in notifications">
                 <top-notification :message="n.notificacion"></top-notification>
               </li>
             </drop-down>
          <!--<li>-->
            <!--<a href="#" @click.prevent="settings" class="btn-rotate">-->
              <!--<i class="ti-settings"></i>-->
              <!--<p>-->
                <!--Ajustes-->
              <!--</p>-->
            <!--</a>-->
          <!--</li>-->
          <li>
            <a href="#" @click.prevent="logout" class="btn-rotate">
              <i class="ti-control-eject"></i>
              <p>
                Salir
              </p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
  import auth from 'src/api/auth'
  import alertsApi from 'src/api/services/alertasServices'
  import topNotification from 'src/components/UIComponents/TopNavbarNotification'
  export default {
    components: {
      topNotification
    },
    computed: {
      routeName () {
        const {name} = this.$route
        return this.capitalizeFirstLetter(name)
      }
    },
    data () {
      return {
        activeNotifications: false,
        cantNotificaciones: 'Sin Notificaciones',
        notifications: []
      }
    },
    mounted () {
      this.cargarNotificaciones()
    },
    methods: {
      cargarNotificaciones () {
        alertsApi.getAlertas(this)
          .then(a => {
            this.cantNotificaciones = `${a.length} Notificaciones`
            this.notifications = a
          })
      },
      capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown () {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown () {
        this.activeNotifications = false
      },
      toggleSidebar () {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar () {
        this.$sidebar.displaySidebar(false)
      },
      logout () {
        auth.logout(this)
      },
      settings () {
        alert('Implementar')
      }
    }
  }

</script>
<style>

</style>
