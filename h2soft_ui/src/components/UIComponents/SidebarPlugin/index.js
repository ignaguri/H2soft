import Sidebar from './SideBar.vue'

const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [
    {
      name: 'Recorridos',
      icon: 'ti-direction-alt',
      path: '/recorridos'
    },
    {
      name: 'Planificacion',
      icon: 'ti-map-alt',
      path: '/planificacion'
    },
    {
      name: 'Reportes',
      icon: 'ti-bar-chart',
      path: '/reportes'
    },
    {
      name: 'Bidones y Dispensers',
      icon: 'ti-paint-bucket',
      path: '/bidonesdispensers'
    },
    {
      name: 'Ingresos y Gastos',
      icon: 'ti-shopping-cart',
      path: '/typography'
    },
    {
      name: 'Facturación',
      icon: 'ti-money',
      path: '/facturacion'
    },
    {
      name: 'Clientes',
      icon: 'ti-view-list-alt',
      path: '/clientes'
    },
    {
      name: 'Contratos',
      icon: 'ti-pencil-alt',
      path: '/contratos'
    },
    {
      name: 'Usuarios',
      icon: 'ti-user',
      path: '/usuarios'
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
