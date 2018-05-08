// 位移偏差
function sameSign (a, b) {
  return (a ^ b) >= 0
}
// 位置矢量
function vector (a, b) {
  return {
    x: b.x - a.x,
    y: b.y - a.y
  }
}
// 方向向量
function vectorProduct (v1, v2) {
  return v1.x * v2.y - v2.x * v1.y
}
// 计算轨迹是否在三角形内
function isPointInTrangle (p, a, b, c) {
  var pa = vector(p, a)
  var pb = vector(p, b)
  var pc = vector(p, c)

  var t1 = vectorProduct(pa, pb)
  var t2 = vectorProduct(pb, pc)
  var t3 = vectorProduct(pc, pa)
  return sameSign(t1, t2) && sameSign(t2, t3)
}

function needDelay (elem, leftCorner, currentMousePos) {
  // 获取子菜单矩形的集合
  var rect = elem.getBoundingClientRect()
  // 不做ie6、7兼容，ie6、7从2px开始，所有会多2px
  var top = rect.top + (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0)
  var left = rect.left + (window.pageXOffset || document.documentElement.scrollLeft) - (document.documentElement.clientLeft || 0)
  // 子菜单顶点坐标
  var topLeft = {
    x: left,
    y: top
  }
  // 子菜单底部坐标
  var bottomLeft = {
    x: left,
    y: top + elem.offsetHeight
  }
  // 当前鼠标坐标   上次鼠标坐标    子菜单顶点坐标    子菜单底部坐标
  return isPointInTrangle(currentMousePos, leftCorner, topLeft, bottomLeft)
}

export default needDelay
