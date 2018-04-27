import Vue from 'vue'
const emptyLeft = '(\\s|^)'
const emptyright = '(\\s|$)'

let filters = { // 过滤器
  time: (val, rule = 'Y-m-d h:m:s') => {
    return d.date(rule, val)
  }
}

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// class操作兼容
function hasClass (elements, cName) {
  return !!elements.className.match(new RegExp(emptyLeft + cName + emptyright))
}
function addClass (elements, cName) {
  if (!hasClass(elements, cName)) {
    elements.className += ' ' + cName
  }
}
function removeClass (elements, cName) {
  if (hasClass(elements, cName)) {
    elements.className = elements.className.replace(new RegExp(emptyLeft + cName + emptyright), ' ')
  }
}
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
          removeClass(el, 'Hcenter')
          addClass(el, 'Vcenter')
          // el.classList.remove('Hcenter')
          // el.classList.add('Vcenter')
        } else {
          removeClass(el, 'Vcenter')
          addClass(el, 'Hcenter')
          // el.classList.remove('Vcenter')
          // el.classList.add('Hcenter')
        }
      }
    }
  },
  flex: { // 容器自适应
    inserted: function (el, binding) {
      // el.classList.add('flex-box')
      addClass(el, 'flex-box')
      var div = document.createElement('div')
      div.className = 'expansion'
      div.style.paddingBottom = binding.value * 100 + '%'
      el.appendChild(div)
    }
  },
  src: {
    inserted: function (el, binding) {
      let pW = el.parentNode.offsetWidth
      let pH = el.parentNode.offsetHeight
      if (binding.modifiers.center) {
        el.src = binding.value + '?x-oss-process=image/resize,m_fill,h_' + parseInt(pH) + ',w_' + parseInt(pW)
        el.onload = function (e) {
          let w = el.naturalWidth
          let h = el.naturalHeight
          let ratio = w / h
          let pRatio = pW / pH
          if (pRatio > ratio) {
            removeClass(el, 'Hcenter')
            addClass(el, 'Vcenter')
            // el.classList.remove('Hcenter')
            // el.classList.add('Vcenter')
          } else {
            removeClass(el, 'Vcenter')
            addClass(el, 'Hcenter')
            // el.classList.remove('Vcenter')
            // el.classList.add('Hcenter')
          }
        }
      } else {
        el.src = binding.value + '?x-oss-process=image/resize,m_lfit,h_' + parseInt(pH) + ',w_' + parseInt(pW)
      }
    }
  }
}

Object.keys(directive).forEach(key => {
  Vue.directive(key, directive[key])
})
