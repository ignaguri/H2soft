import Sidebar from './SideBar.vue'

const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [
    {
      name: 'Recorridos',
      icon: 'ti-map-alt',
      path: '/admin/recorridos'
    },
    {
      name: 'Planificacion',
      icon: 'ti-map-alt',
      path: '/admin/planificacion'
    },
    {
      name: 'Reportes',
      icon: 'ti-bar-chart',
      path: '/admin/stats'
    },
    {
      name: 'Insumos',
      icon: 'ti-package',
      path: '/admin/table-list'
    },
    {
      name: 'Gastos',
      icon: 'ti-shopping-cart',
      path: '/admin/typography'
    },
    {
      name: 'Facturación',
      icon: 'ti-money',
      path: '/admin/icons'
    },
    {
      name: 'Clientes',
      icon: 'ti-view-list-alt',
      path: '/admin/clientes'
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
