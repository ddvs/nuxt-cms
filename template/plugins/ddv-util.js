import util from 'ddv-util';
import utilTime from 'ddv-util/time';
import api from 'ddv-restful-api';
var content = typeof window!=='undefined'&&window.window === window?window:this;
//把util映射到全局变量d中
util.globalInit('d', content);
//扩展时间模块
util.extendInit(utilTime);
//扩展请求接口
util.extend({
    api,
    get:api.get,
    post:api.post,
    put:api.put,
    del:api.del
});
//delete兼容性问题
util['delete'] = api['delete'];
