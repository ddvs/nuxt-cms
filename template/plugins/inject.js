import Vue from 'vue'
let filters = { // 过滤器
  time: (val, rule = 'Y-m-d h:m:s') => {
    return d.date(rule, val)
  }
}

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

let directive = { // 指令
  center: { // 图片居中切割
    inserted: function (el, binding) {
      el.onload = (e) => {
        let w = el.naturalWidth
        let h = el.naturalHeight
        let pW = el.parentNode.offsetWidth
        let pH = el.parentNode.offsetHeight
        let ratio = w / h
        let pRatio = pW / pH
        if (pRatio > ratio) {
          el.classList.remove('Hcenter')
          el.classList.add('Vcenter')
        } else {
          el.classList.remove('Vcenter')
          el.classList.add('Hcenter')
        }
        if (typeof binding.value === 'function') { // 轮播图处理
          binding.value(true)
        }
      }
    }
  },
  flex: { // 容器自适应
    inserted: function (el, binding) {
      el.classList.add('flex-box')
      var div = document.createElement('div')
      div.className = 'expansion'
      div.style.paddingBottom = binding.value * 100 + '%'
      el.appendChild(div)
    }
  }
}

Object.keys(directive).forEach(key => {
  Vue.directive(key, directive[key])
})
