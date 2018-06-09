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
      name: 'Ingresos y Egresos',
      icon: 'ti-shopping-cart',
      path: '/ingresosEgresos'
    },
    {
      name: 'Contabilidad',
      icon: 'ti-money',
      path: '/contabilidad'
    },
    {
      name: 'Clientes',
      icon: 'ti-view-list-alt',
      path: '/clientes'
    },
    {
      name: 'configuracion',
      icon: 'ti-settings',
      path: '/config'
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
