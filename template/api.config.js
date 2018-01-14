// 使用长连接模块
const api = require('ddv-restful-api')
const session = require('ddv-restful-api/lib/session')
// 长链接
// require('ddv-restful-ws-api')(api)
// api.setWebSocketUrl('ws://push.test.com/v1_0/conn')

// 设置默认请求域名
api.setBaseUrl('http://api.test.com/')
// 设置会话初始化最大自动尝试次数，默认3次
api.setOnAccessKeyTrySum(3)
// 是否长期会话
session.setLongStorage(false)
// 设置初始化session的path，默认/session/init
session.setSessionInitPath('/session/init')

// api.setOnModelInitend(function (model) {
//   var host
//   if (typeof location !== 'undefined') {
//     host = location && location.host
//   }
//   if ((!host) && model.requests && model.requests.headers) {
//     host = model.requests.headers.host || host
//   }
//   if (host) {
//     model.headers({
//       'x-ddv-from-host': host
//     })
//   }
// })
