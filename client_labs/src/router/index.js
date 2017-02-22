import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import App from 'App'
import DashboardPage from 'pages/DashboardPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
  ]
})

const routes = [
  {path: '/', component: App, name: 'home'},
  {path: '/DashboardPage', component: DashboardPage, name: 'dashboard'}
]

const router = new Router({
  mode: 'history',
  routes
})

new Vue({
  router

}).$mount('#app')
