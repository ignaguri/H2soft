import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage'
import Landing from '../components/GeneralViews/Landing'

// Admin pages
import Clientes from 'src/components/Dashboard/Views/Clientes'
import WorkInProgress from 'src/components/GeneralViews/WorkInProgress'
import RecorridosAsignados from 'src/components/Dashboard/Views/RecorridosAsignados'
import Planificacion from 'src/components/Dashboard/Views/Planificacion'
import Reporte from 'src/components/Dashboard/Views/Reportes'
import IngresosEgresos from 'src/components/Dashboard/Views/IngresosEgresos'
import BidonesDispensers from 'src/components/Dashboard/Views/BidonesDispensers'
import Contabilidad from 'src/components/Dashboard/Views/Contabilidad'
import Configuracion from 'src/components/Dashboard/Views/Configuracion.vue'

const routes = [
  {
    path: '/login',
    component: Landing
  },
  {
    path: '/',
    name: 'app',
    component: DashboardLayout,
    redirect: 'planificacion',
    children: [
      {
        path: 'overview',
        name: 'overview',
        component: WorkInProgress,
        meta: {requiresAuth: true}
      },
      {
        path: 'reportes',
        name: 'Reportes',
        component: Reporte,
        meta: {requiresAuth: true}
      },
      {
        path: 'notifications',
        name: 'Work-in-Progress',
        component: WorkInProgress,
        meta: {requiresAuth: true}
      },
      {
        path: 'ingresosEgresos',
        name: 'Ingresos y Egresos',
        component: IngresosEgresos,
        meta: {requiresAuth: true}
      },
      {
        path: 'recorridos',
        name: 'Recorridos',
        component: RecorridosAsignados,
        meta: {requiresAuth: true}
      },
      {
        path: 'planificacion',
        name: 'Planificación',
        component: Planificacion,
        meta: {requiresAuth: true}
      },
      {
        path: 'contabilidad',
        name: 'Contabilidad',
        component: Contabilidad,
        meta: {requiresAuth: true}
      },
      {
        path: 'bidonesdispensers',
        name: 'Dispensers y Productos',
        component: BidonesDispensers,
        meta: {requiresAuth: true}
      },
      {
        path: 'clientes',
        name: 'clientes',
        component: Clientes,
        meta: {requiresAuth: true}
      },
      {
        path: 'config',
        name: 'Configuración',
        component: Configuracion,
        meta: {requiresAuth: true}
      }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
