import Vue from 'vue'
import VueResource from 'vue-resource'
import Router from 'vue-router'
import App from './App'
import store from './store'
import Hello from './components/Hello'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import Register from './pages/RegisterPage'
import VueNotifications from 'vue-notifications'
import miniToastr from 'mini-toastr'

miniToastr.init()
function toastr ({title, message, type, timeout, cb}) {
  return miniToastr[type](message, title, timeout, cb)
}

const options = {
  success: toastr,
  error: toastr,
  info: toastr,
  warn: toastr
}
VueNotifications.config.timeout = 4000
Vue.use(VueNotifications, options)

Vue.use(Router)
Vue.use(VueResource)

Vue.component('app', App)

const routes = [
  {path: '/login', component: LoginPage, name: 'login'},
  {path: '/hello', component: Hello, name: 'hello'},
  {path: '/register', component: Register, name: 'register'},
  {path: '/dashboard', component: DashboardPage, name: 'dashboard', meta: { requiresAuth: true }}
]

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('authUser'))
    if (authUser && authUser.access_token) {
      next()
    } else {
      next({name: 'home'})
    }
  }
  next()
})

new Vue({
  router, store

}).$mount('#app')
