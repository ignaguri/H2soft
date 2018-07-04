import Sidebar from './SideBar.vue'
import auth from '../../../api/auth'

const fullLinks = [
  {
    name: 'Recorridos',
    icon: 'ti-direction-alt',
    path: '/recorridos'
  },
  {
    name: 'Planificación',
    icon: 'ti-map-alt',
    path: '/planificacion'
  },
  {
    name: 'Dispensers y Productos',
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
    name: 'Reportes',
    icon: 'ti-bar-chart',
    path: '/reportes'
  },
  {
    name: 'Configuración',
    icon: 'ti-settings',
    path: '/config'
  }
]

const filterModules = () => {
  // Roles:
  // 1 Administrador
  // 2 Encargado de Reparto
  // 3 Repartidor
  // 4 Cliente
  // 5 Encargado de Mantenimiento
  // 6 Gerente
  // 7 Facturista
  if (auth.isLoggedIn()) {
    const rol = JSON.parse(auth.isLoggedIn()).idRol
    const contables = ['Contabilidad', 'Reportes']
    const productos = ['Dispensers y Productos']
    const procesos = ['Planificación']
    const links = fullLinks.filter(l => l.name !== 'Configuración')
    switch (rol) {
      case 1:
      case 6:
        return fullLinks
      case 2:
      case 5:
        return links.filter(l => !contables.includes(l.name))
      case 3:
        return links.filter(l => !contables.includes(l.name) && !productos.includes(l.name) && !procesos.includes(l.name))
      case 4:
      case 7:
      default:
        return []
    }
  }
}

const SidebarStore = {
  showSidebar: false,
  sidebarLinks: filterModules(),
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
