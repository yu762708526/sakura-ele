// 直接更新state的多个方法对象
import {
  RECEIVE_ADDRESS, RECEIVE_FOODSTYPE, RECEIVE_SHOPLIST, RECEIVE_USERINFO, RECEIVE_GETOUT,
  RECEIVE_SHOPINFO, RECEIVE_SHOPRATINGS, RECEIVE_SHOPGOODS, INCRESE_COUNT, DECRESE_COUNT, CLEAN_CART, SEARCH_SHOPS
} from './mutations-types'
import Vue from 'vue'
export default {
  [RECEIVE_ADDRESS] (state, { address }) { // 这里的address是传入的对象
    state.address = address
  },
  [RECEIVE_FOODSTYPE] (state, { foodsType }) { // 这里的address是传入的对象
    state.foodstype = foodsType
  },
  [RECEIVE_SHOPLIST] (state, { shoplist }) { // 这里的address是传入的对象
    state.shoplist = shoplist
  },
  [RECEIVE_USERINFO] (state, { userinfo }) { // 自动登录
    state.userinfo = userinfo
  },
  [RECEIVE_GETOUT] (state) { // 登出
    state.userinfo = {}
  },
  [RECEIVE_SHOPINFO] (state, { shopinfo }) { // 商家信息
    state.shopinfo = shopinfo
  },
  [RECEIVE_SHOPRATINGS] (state, { shopratings }) { // 评价信息
    state.shopratings = shopratings
  },
  [RECEIVE_SHOPGOODS] (state, { shopgoods }) { // 商品信息
    state.shopgoods = shopgoods
  },
  [INCRESE_COUNT] (state, { food }) { // 增加商品
    if (!food.count) {
      Vue.set(food, 'count', 1)
      state.cartFoods.push(food)
    } else {
      food.count++
    }
  },
  [DECRESE_COUNT] (state, { food }) { // 减少商品
    if (food.count) {
      food.count--
      if (food.count === 0) {
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },
  [CLEAN_CART] (state) { // 清空购物车
    state.cartFoods.forEach((item) => {
      item.count = 0
    })
    state.cartFoods = []
  },
  // 关键字搜索店铺
  [SEARCH_SHOPS] (state, { searchShops }) {
    state.searchShops = searchShops
  }

}
