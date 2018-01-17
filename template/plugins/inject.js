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
    inserted: function (el) {
      el.onload = function () {
        let w = this.naturalWidth
        let h = this.naturalHeight
        let pW = this.parentNode.offsetWidth
        let pH = this.parentNode.offsetHeight
        let ratio = w / h
        let pRatio = pW / pH
        if (pRatio > ratio) {
          this.classList.remove('Hcenter')
          this.classList.add('Vcenter')
        } else {
          this.classList.remove('Vcenter')
          this.classList.add('Hcenter')
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
