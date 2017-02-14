import util from 'ddv-util'
import utilTime from 'ddv-util/time'
import {util as apiUtil} from 'ddv-restful-api'
import tools from '~assets/util/util.js'

// 把util映射到全局变量d中
util.globalInit('d', null, true)
// 扩展 时间模块, 请求接口
util.extendInit(utilTime, apiUtil)
util.extend({
  util: tools
})
