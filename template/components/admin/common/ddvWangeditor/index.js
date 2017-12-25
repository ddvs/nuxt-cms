var WedContainer = require('./component/wangeditor.vue')

var WedBuild = function (Vue) {
  Vue.component('ddv-wangeditor', WedContainer)
}

var ddvWangeditor = {
  ddvWangeditor: WedContainer,
  install: function (Vue) {
    WedBuild(Vue)
  }
}

module.exports = ddvWangeditor
module.exports.default = module.exports
