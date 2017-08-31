import Sidebar from './SideBar.vue'

const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [
    {
      name: 'Planificacion',
      icon: 'ti-panel',
      path: '/admin/overview'
    },
    {
      name: 'Tu Perfil',
      icon: 'ti-user',
      path: '/admin/stats'
    },
    {
      name: 'Clientes',
      icon: 'ti-view-list-alt',
      path: '/admin/table-list'
    },
    {
      name: 'Insumos',
      icon: 'ti-text',
      path: '/admin/typography'
    },
    {
      name: 'Contabilidad',
      icon: 'ti-pencil-alt2',
      path: '/admin/icons'
    },
    {
      name: 'Mapas',
      icon: 'ti-map',
      path: '/admin/maps'
    },
    {
      name: 'Reportes',
      icon: 'ti-bell',
      path: '/admin/notifications'
    },
    {
      name: 'Usuarios',
      icon: 'ti-user',
      path: '/admin/usuarios'
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
