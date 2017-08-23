import util from 'ddv-util'
import utilTime from 'ddv-util/time'
import {util as apiUtil} from 'ddv-restful-api'
import tools from '~/assets/util/util.js'

// 把util映射到全局变量d中
util.globalInit('d', (typeof window !== typeof void 0 && window === window.window ? window : (typeof global !== typeof void 0 && global === global.global ? global : this)))
// 扩展 时间模块, 请求接口
util.extendInit(utilTime, apiUtil)
util.extend({
  util: tools
})
