/*
ajax请求函数模块
返回值: promise对象(异步返回的数据是: response.data)
 */
import axios from 'axios'
import qs from 'qs'

// 环境的切换

// 根据环境变量区分接口的默认地址
switch (process.env.NODE_ENV) {
  // case 'test':
  //   axios.defaults.baseURL = '/api'
  //   break
  // case 'production':
  //   axios.defaults.baseURL = '/api'
  //   break
  default:
    axios.defaults.baseURL = '/api'
    break
}
// 设置超时时间和跨域是否允许携带凭证
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true

// 不要求可以不设置
// post请求的时候，设置请求传递数据得格式
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = params => qs.stringify(params) // 把对象变成字符串  只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法

// // 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 携带token
  // token校验(JWT):接收服务器返回的token，存储到vuex/本地存储中，每一次向服务器发请求，我们应该把token带上
  const token = localStorage.getItem('token')
  token && (config.headers.Authorization = token)
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// // 自定义响应成功的HTTP状态码
// // 一般公司不用
// // axios.get('/user/12345', {
// //   validateStatus: function (status) {
// //     return /^(2|3)\d{2}$/.test(status) // 状态码在200-300时才会 reject
// //   }
// // })

// // 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.status === 200) {
    return response
  } else {
    return Promise.reject(response)
  }
}, function (error) {
  const { response } = error
  // 对响应错误做点什么
  if (response) {
    // 服务器起码返回了结果
    switch (response.status) {
      // 401: 未登录
      // 未登录则跳转登录页面，并携带当前页面的路径
      // 在登录成功后返回当前页面，这一步需要在登录页操作。
      case 401:
        // router.replace({
        //   path: '/login',
        //   query: {
        //     redirect: router.currentRoute.fullPath
        //   }
        // })
        break
      // 403 token过期
      // 登录过期对用户进行提示
      // 清除本地token和清空vuex中token对象
      // 跳转登录页面
      case 403:
        // Toast({
        //   message: '登录过期，请重新登录',
        //   duration: 1000,
        //   forbidClick: true
        // })
        // 清除token
        // localStorage.removeItem('token')
        // store.commit('loginSuccess', null)
        // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
        // setTimeout(() => {
        //   router.replace({
        //     path: '/login',
        //     query: {
        //       redirect: router.currentRoute.fullPath
        //     }
        //   })
        // }, 1000)
        break
      // 404请求不存在 找不到页面
      case 404:
        // Toast({
        //   message: '网络请求不存在',
        //   duration: 1500,
        //   forbidClick: true
        // })
        break
    }
  } else {
    // 服务器连结果都没有返回
    if (!window.navigator.onLine) {
      // 断网处理:可以跳转到断网页面
      return
    }
    return Promise.reject(error.response)
  }
})

export default function ajax (url, params = {}, type = '') {
  return new Promise(function (resolve, reject) {
    // 执行异步ajax请求
    let promise
    if (type === 'GET') {
      // 准备url query参数数据
      // let dataStr = '' // 数据拼接字符串
      // Object.keys(data).forEach(key => {
      //   dataStr += key + '=' + data[key] + '&'
      // })
      // if (dataStr !== '') {
      //   dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
      // dataStr = qs.stringify(data)
      // if (dataStr !== '') {
      //   url = url + '?' + dataStr
      // }
      // }
      // 发送get请求
      promise = axios.get(url, { params: params })
    } else if (type === 'post') {
      // 发送post请求
      promise = axios.post(url, params)
    }
    promise.then((response) => {
      // 成功了调用resolve()
      resolve(response.data)
    }).catch((error) => {
      // 失败了调用reject()
      reject(error)
    })
  })
}
