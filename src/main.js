import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import '../src/common/styles/reset.css'
import '../src/common/styles/iconfont.css'
import 'swiper/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import { Button } from 'vant'
import './mock/mockServer'
import VueLazyload from 'vue-lazyload'
import loading from './common/imgs/loading.gif'
import './filters/index'

Vue.use(VueLazyload, {
  loading
})

Vue.use(Button)
Vue.config.productionTip = false

Vue.use(VueAwesomeSwiper)
fastclick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
