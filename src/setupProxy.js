const { createProxyMiddleware } = require('http-proxy-middleware')

const matchUrl = '/api' // 请求是匹配的地址
const target = 'http://localhost:5000/' // 目标网址
const prevUrl = '^/api' // 以/api路径截取
const writeUlr = '' // 重写请求路径
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target, //目标端口
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    })
  )
}
