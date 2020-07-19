// 通过mutation间接更新state的多个方法的对象
import {
  RECEIVE_ADDRESS, RECEIVE_FOODSTYPE, RECEIVE_SHOPLIST, RECEIVE_USERINFO, RECEIVE_GETOUT, RECEIVE_SHOPINFO,
  RECEIVE_SHOPRATINGS, RECEIVE_SHOPGOODS, INCRESE_COUNT,
  DECRESE_COUNT, CLEAN_CART, SEARCH_SHOPS
} from './mutations-types'
import { reqAddress, reqFoodsType, reqShopList, reqUserinfo, reqLogout, reqShopInfo, reqShopRatings, reqShopGoods, reqSearchShops } from '../api/index'
export default {
  // 异步获取地址
  async getAddress ({ commit, state }) {
    // 发送异步请求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    // 提交一个mutation
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, { address })
    }
  },
  // 异步获取食品分类列表
  async getFoodsType ({ commit }) {
    // 发送异步请求
    const result = await reqFoodsType()
    // 提交一个mutation
    if (result.code === 0) {
      const foodsType = result.data
      commit(RECEIVE_FOODSTYPE, { foodsType })
    }
  },
  // 异步获取商家列表
  async getShopList ({ commit, state }) {
    // 发送异步请求
    const { longitude, latitude } = state
    const result = await reqShopList(longitude, latitude)
    // 提交一个mutation
    if (result.code === 0) {
      const shoplist = result.data
      commit(RECEIVE_SHOPLIST, { shoplist })
    }
  },
  // 同步获取用户信息  跟异步不一样
  getUserInfo ({ commit }, userinfo) {
    commit(RECEIVE_USERINFO, { userinfo })
  },
  // 异步获取用户信息,用于刷新自动登陆
  async updataUserInfo ({ commit }) {
    const result = await reqUserinfo()
    if (result.code === 0) {
      const userinfo = result.data
      commit(RECEIVE_USERINFO, { userinfo })
    }
  },
  // 异步登出
  async getOut ({ commit }) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RECEIVE_GETOUT)
    }
  },
  // 异步获取商家信息
  async getShopInfo ({ commit }) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const shopinfo = result.data
      commit(RECEIVE_SHOPINFO, { shopinfo })
    }
  },
  // 异步获取评价信息
  async getShopRaings ({ commit }, callBack) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const shopratings = result.data
      commit(RECEIVE_SHOPRATINGS, { shopratings })
      callBack && callBack()
    }
  },
  // 异步获取商品信息
  async getShopGoods ({ commit }, callBack) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const shopgoods = result.data
      commit(RECEIVE_SHOPGOODS, { shopgoods })
      callBack && callBack()
    }
  },
  // 增加或减少购物车数量
  updataCartCount ({ commit }, { isAdd, food }) {
    if (isAdd) {
      commit(INCRESE_COUNT, { food })
    } else {
      commit(DECRESE_COUNT, { food })
    }
  },
  // 清空购物车
  cleanShopCart ({ commit }) {
    commit(CLEAN_CART)
  },
  // 根据经纬度和关键字搜索店铺
  async getSearchShops ({ commit, state }, keyword) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShops(geohash, keyword)
    if (result.code === 0) {
      const searchShops = result.data
      commit(SEARCH_SHOPS, { searchShops })
    }
  }

}
