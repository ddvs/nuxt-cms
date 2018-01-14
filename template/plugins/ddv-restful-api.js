import api from 'ddv-restful-api'
import util from 'ddv-util'
require('../api.config')

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
if (process.server) {
  // 服务端错误处理
  // 切记，这里是服务端，只能跳转，不用想太多弹框什么的
  // 所以，仅仅处理登录这种逻辑就好
  api.onDataServerError(function onDataServerError (e, context) {
    if (e.errorId === 'NO_LOGIN' && context.redirect) {
      var toPath = '/' + util._getTypeByContext(context) + '/login'
      context.redirect('302', toPath)
    } else {
      if (e.errorId === 'UNKNOWN_ERROR') {
        e.message = '网络错误'
      }
      throw e
    }
  })
}
