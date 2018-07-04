<template>
  <div :class="{'nav-open': $sidebar.showSidebar}">
    <router-view></router-view>
    <!--This sidebar appears only for screens smaller than 992px-->
    <side-bar type="navbar" :sidebar-links="$sidebar.sidebarLinks">
      <ul class="nav navbar-nav">
        <li>
          <a href="Fecha de hoy" class="btn-magnify" @click.prevent="false">
            {{new Date().toLocaleDateString('es-AR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}
          </a>
        </li>
        <li>
          <a href="#/bidonesdispensers" class="btn-rotate" :style="'color: ' + notiColor">
            <i class="ti-bell"></i>
            <p>
              {{cantNotificaciones}}
            </p>
          </a>
        </li>
        <li>
          <a href="#" @click.prevent="logout" class="btn-rotate">
            <i class="ti-control-eject"></i>
            <p>
              Salir
            </p>
          </a>
        </li>
        <li class="divider"></li>
      </ul>
    </side-bar>
  </div>
</template>

<script>
  import auth from 'src/api/auth'
  import alertsApi from 'src/api/services/alertasServices'
  import topNotification from 'src/components/UIComponents/TopNavbarNotification'
  export default {
    components: {
      topNotification
    },
    data () {
      return {
        cantNotificaciones: '0 Notificaciones',
        notifications: [],
        notiColor: null,
        sidebarLinks: []
      }
    },
    mounted () {
      this.cargarNotificaciones()
    },
    methods: {
      cargarNotificaciones () {
        if (auth.isLoggedIn()) {
          alertsApi.getAlertasPendientes(this)
            .then(a => {
              this.cantNotificaciones = a.length === 1 ? `1 Notificación` : `${a.length} Notificaciones`
              this.notiColor = a.length ? '#EB5E28' : null
              this.notifications = a
            })
        }
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

<style lang="scss"></style>
