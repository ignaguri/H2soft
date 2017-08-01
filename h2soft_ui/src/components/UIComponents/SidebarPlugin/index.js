import Sidebar from './SideBar.vue'

const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [
    {
      name: 'Estadísticas',
      icon: 'ti-panel',
      path: '/admin/overview'
    },
    {
      name: 'Tu Perfil',
      icon: 'ti-user',
      path: '/admin/stats'
    },
    {
      name: 'Tablas',
      icon: 'ti-view-list-alt',
      path: '/admin/table-list'
    },
    {
      name: 'Fuentes',
      icon: 'ti-text',
      path: '/admin/typography'
    },
    {
      name: 'Iconos',
      icon: 'ti-pencil-alt2',
      path: '/admin/icons'
    },
    {
      name: 'Mapas',
      icon: 'ti-map',
      path: '/admin/maps'
    },
    {
      name: 'Notificaciones',
      icon: 'ti-bell',
      path: '/admin/notifications'
    }
  ],
  displaySidebar (value) {
    this.showSidebar = value
  }
}

const SidebarPlugin = {

  install (Vue) {
    Vue.mixin({
      data () {
        return {
          sidebarStore: SidebarStore
        }
      }
    })

    Object.defineProperty(Vue.prototype, '$sidebar', {
      get () {
        return this.$root.sidebarStore
      }
    })
    Vue.component('side-bar', Sidebar)
  }
}

export default SidebarPlugin
