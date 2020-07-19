import Vue from 'vue'
import VueRouter from 'vue-router'

// import Home from '../pages/Home/Home.vue'
// import Order from '../pages/Order/Order.vue'
// import Personal from '../pages/Personal/Personal.vue'
// import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login.vue'
import Userinfo from '../pages/Userinfo/Userinfo.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'

const Home = () => import('../pages/Home/Home.vue')
const Order = () => import('../pages/Order/Order.vue')
const Personal = () => import('../pages/Personal/Personal.vue')
const Search = () => import('../pages/Search/Search.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'

  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      ShowFooter: true
    }
  },
  {
    path: '/order',
    name: 'order',
    component: Order,
    meta: {
      ShowFooter: true
    }
  },
  {
    path: '/personal',
    name: 'personal',
    component: Personal,
    meta: {
      ShowFooter: true
    }
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    meta: {
      ShowFooter: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/userinfo',
    name: 'userinfo',
    component: Userinfo
  },
  {
    path: '/shop',
    component: Shop,
    children: [
      {
        path: '/shop/goods',
        name: 'goods',
        component: ShopGoods
      },
      {
        path: '/shop/info',
        name: 'info',
        component: ShopInfo
      },
      {
        path: '/shop/ratings',
        name: 'ratings',
        component: ShopRatings
      },
      {
        path: '',
        redirect: '/shop/goods'
      }
    ]

  }

]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
