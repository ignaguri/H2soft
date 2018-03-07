import Sidebar from './SideBar.vue'

const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [
    {
      name: 'Recorridos',
      icon: 'ti-direction-alt',
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
      path: '/admin/reportes'
    },
    {
      name: 'Bidones y Dispensers',
      icon: 'ti-paint-bucket',
      path: '/admin/table-list'
    },
    {
      name: 'Ingresos y Egresos',
      icon: 'ti-shopping-cart',
      path: '/admin/ingresosEgresos'
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
      name: 'Contratos',
      icon: 'ti-pencil-alt',
      path: '/admin/contratos'
    },
    {
      name: 'Usuarios',
      icon: 'ti-user',
      path: '/admin/usuarios'
    },
    {
      name: 'ListadoRemitos',
      icon: 'ti-pencil',
      path: '/admin/listadoRemitos'
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
