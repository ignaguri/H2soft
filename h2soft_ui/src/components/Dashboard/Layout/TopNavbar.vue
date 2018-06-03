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
          <li>
            <a href="Fecha de hoy" class="btn-magnify" @click.prevent="">
              {{new Date().toLocaleDateString('es-AR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}
            </a>
          </li>
          <drop-down :title="cantNotificaciones" icon="ti-bell" :color="notiColor">
            <li v-for="n in notifications">
              <top-notification :notification="n" @notiUpdate="notiUpdate"></top-notification>
            </li>
          </drop-down>
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
        cantNotificaciones: '0 Notificaciones',
        notifications: [],
        notiColor: null
      }
    },
    mounted () {
      this.cargarNotificaciones()
    },
    methods: {
      cargarNotificaciones () {
        alertsApi.getAlertasPendientes(this)
          .then(a => {
            this.cantNotificaciones = a.length === 1 ? `1 Notificación` : `${a.length} Notificaciones`
            this.notiColor = a.length ? '#EB5E28' : null
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
      notiUpdate (e) {
        this.cargarNotificaciones()
      }
    }
  }

</script>
<style>

</style>
