const path = require('path')// 引入path模块
function resolve (dir) {
  return path.join(__dirname, dir)// path.join(__dirname)设置绝对路径
}
module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('components', resolve('/src/components'))
      .set('common', resolve('src/common'))
      .set('styles', resolve('src/common/styles'))
    // set第一个参数：设置的别名，第二个参数：设置的路径
  },
  devServer: {
    host: '0.0.0.0',
    port: 8081,
    proxy: {
      '/api': { // 匹配所有以'/api'开头的请求路径
        target: 'http://localhost:4000', // 代理的目标基础路径
        changeOrigin: true, // 支持跨域
        pathRewrite: { // 重写路径：去掉路径中开头的'/api'
          '^/api': ''

        }
      }
    }
  }

}
