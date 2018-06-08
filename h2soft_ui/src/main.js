import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import vClickOutside from 'v-click-outside'

// Plugins
import GlobalComponents from './globalComponents'
import Notifications from './components/UIComponents/NotificationPlugin'
import SideBar from './components/UIComponents/SidebarPlugin'
import App from './App'

// router setup
import routes from './routes/routes'

// library imports
import Chartist from 'chartist'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/sass/paper-dashboard.scss'
import 'es6-promise/auto'

// plugin setup
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(GlobalComponents)
Vue.use(vClickOutside)
Vue.use(Notifications)
Vue.use(SideBar)

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active'
})
// Some middleware to help us ensure the user is authenticated.
router.beforeEach((to, from, next) => {
  const userLoggedIn = JSON.parse(window.sessionStorage.getItem('user'))
  // window.console.log('Ir de', from.path, 'a', to.path, 'y user', userLoggedIn)
  if (to.matched.some(record => record.meta.requiresAuth) && !userLoggedIn) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    // window.console.error('Not authenticated')
    next({
      path: '/login'
    })
  } else {
    next()
  }
})
// Vue.http.headers.common['Authorization'] = auth.getAuthHeader()
// global library setup
Object.defineProperty(Vue.prototype, '$Chartist', {
  get () {
    return this.$root.Chartist
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  data: {
    Chartist: Chartist
  }
})
