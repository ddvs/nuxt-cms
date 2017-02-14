const api = require('ddv-restful-api')
// 设置默认请求域名
api.setBaseUrl('http://api.test.com')
// 自定义头前缀
api.setHeadersPrefix('x-hz-')
// 是否长期会话
api.setLongStorage(false)
// 设置会话初始化最大自动尝试次数，默认3次
api.setSessionInitTrySum(3)
// 设置初始化session的path，默认/session/init
api.setSessionInitPath('/session/init')
