const app = require('express')()
const worker = require('ddv-worker')
const http = require('http')
const Nuxt = require('nuxt')
const util = require('ddv-util')
require('./api.config')
util.globalInit('d', global)

worker.server = http.createServer(app)
// Import and Set Nuxt.js options
let config = require('./nuxt.config.js')
// 调试模式
worker.DEBUG = config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)
// 使用nuxt插件
app.use(nuxt.render)

// Build only in dev mode
if (config.dev) {
  nuxt.build()
  .catch((error) => {
    console.error(error) // eslint-disable-line no-console
    process.exit(1)
  })
}

// Listen the server
worker.updateServerConf({
  defaultListen: config.defaultListen,
  listen: config.listen,
  cpuLen: config.cpuLen
}, (e) => {
  if (e) {
    console.error('监听配置参数 更新失败')
    console.error(e)
  } else {
    console.log('监听配置参数 更新成功')
  }
})
