import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'
import Landing from '../components/GeneralViews/Landing.vue'

// Admin pages
// import Overview from 'src/components/Dashboard/Views/Overview.vue'
// import UserProfile from 'src/components/Dashboard/Views/UserProfile.vue'
// import Notifications from 'src/components/Dashboard/Views/Notifications.vue'
// import Icons from 'src/components/Dashboard/Views/Icons.vue'
// import Maps from 'src/components/Dashboard/Views/Maps.vue'
// import Typography from 'src/components/Dashboard/Views/Typography.vue'
// import TableList from 'src/components/Dashboard/Views/TableList.vue'
import Usuarios from 'src/components/Dashboard/Views/Usuarios.vue'
// import EditarUsuarioForm from 'src/components/Dashboard/Views/Usuarios/NewUserForm.vue'
import Clientes from 'src/components/Dashboard/Views/Clientes.vue'
import WorkInProgress from 'src/components/GeneralViews/WorkInProgress.vue'
import Contratos from 'src/components/Dashboard/Views/Contratos.vue'
import RecorridosAsignados from 'src/components/Dashboard/Views/RecorridosAsignados.vue'
// import NewClientForm from 'src/components/Dashboard/Views/Clientes/NewClientForm.vue'
import Planificacion from 'src/components/Dashboard/Views/Planificacion.vue'
import Reporte from 'src/components/Dashboard/Views/Reportes.vue'

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
        path: 'icons',
        name: 'Ingresos y Gastos',
        component: WorkInProgress,
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
        path: 'typography',
        name: 'Facturación',
        component: WorkInProgress,
        meta: {requiresAuth: true}
      },
      {
        path: 'table-list',
        name: 'Bidones y Dispensers',
        component: WorkInProgress,
        meta: {requiresAuth: true}
      },
      {
        path: 'contratos',
        name: 'contratos',
        component: Contratos,
        meta: {requiresAuth: true}
      },
      {
        path: 'clientes',
        name: 'clientes',
        component: Clientes,
        meta: {requiresAuth: true}
      },
      {
        path: 'usuarios',
        name: 'Gestion de usuarios',
        component: Usuarios,
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
