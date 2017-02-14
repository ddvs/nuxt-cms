import api from 'ddv-restful-api'
import util from 'ddv-util'

util._getTypeByContext = function (context) {
  var path = (context && context.route && context.route.path) || ''
  var pathArr = path.split('/')
  var type = pathArr[1] || 'pc'
  return type
}
util._getTypeByRoute = function (route) {
  var path = (route && route.path) || ''
  var pathArr = path.split('/')
  var type = pathArr[1] || 'pc'
  return type
}
if (process.SERVER_BUILD) {
  // 服务端错误处理
  // 切记，这里是服务端，只能跳转，不用想太多弹框什么的
  // 所以，仅仅处理登录这种逻辑就好
  api.onDataServerError(function onDataServerError (e, context) {
    if (e.error_id === 'NO_LOGIN' && context.redirect) {
      var toPath = '/' + util._getTypeByContext(context) + '/login'
      context.redirect('302', toPath)
    } else {
      throw e
    }
  })
}
// 客户端需要配置一些，服务器已经在启动的时候配置了
if (process.BROWSER_BUILD) {
  require('../api.config')
}
