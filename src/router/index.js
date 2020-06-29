import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../pages/Home/Home.vue'
import Order from '../pages/Order/Order.vue'
import Personal from '../pages/Personal/Personal.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'

  },
  {
    path: '/home',
    component: Home,
    meta: {
      ShowFooter: true
    }
  },
  {
    path: '/order',
    component: Order,
    meta: {
      ShowFooter: true
    }
  },
  {
    path: '/personal',
    component: Personal,
    meta: {
      ShowFooter: true
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      ShowFooter: true
    }
  },
  {
    path: '/login',
    component: Login
  }

]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
