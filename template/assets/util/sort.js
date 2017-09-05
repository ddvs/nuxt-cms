import util from 'ddv-util'

export default sort
/**
 * array 检测数组
 * opts 配置参数
 * [callback] 回调，有则使用异步，没有则同步
 * [isRec] 是否递归查询
 */
function sort (array, opts, callback, isRec) {
  if (!Array.isArray(array)) {
    throw new Error('"data" is not an array')
  }

  if (!(typeof callback === 'function')) {
    isRec = callback === true
    callback = null
  }

  if (array.length <= 1 && !isRec) {
    if (callback) {
      callback(array)
    } else {
      return array
    }
  }
  let sortOrderCheck = ['asc', 'desc']
  var arr = []
  util.extend(true, arr, array)
  /**
   * sortOrder 排序规则，asc是指定列按升序排列，desc则是指定列按降序排列
   * prop 排序检测key；如为一维数组则可以不传
   * children 指定子节点对象的某个属性值
   */
  opts = (typeof opts === 'object') ? opts : { sortOrder: 'desc' }
  // 默认降序
  opts.sortOrder = sortOrderCheck.includes(opts.sortOrder) ? opts.sortOrder : 'desc'
  sortOrderCheck = void 0

  var recFn = (arr) => {
    arr.forEach(item => {
      if (Array.isArray(item[opts.children]) && item[opts.children].length > 1) {
        item = item[opts.children].sort(by(opts.prop, opts.sortOrder))
        recFn(item)
      }
    })
  }

  var fn = () => {
    arr.sort(by(opts.prop, opts.sortOrder))

    if (isRec && opts.children) {
      recFn(arr)
    }
  }

  if (callback) {
    Promise.resolve()
      .then(() => {
        fn()
        callback(arr)
      })
  } else {
    fn()
    return arr
  }
}

function by (name, sort) {
  return function (o, p) {
    var a, b
    var flag = sort === 'desc' ? 1 : -1
    if (o && p && ((typeof o === 'object' && o[name]) || !isNaN(o)) && ((typeof p === 'object' && p[name]) || !isNaN(p))) {
      a = typeof o === 'object' ? parseInt(o[name]) : parseInt(o)
      b = typeof p === 'object' ? parseInt(p[name]) : parseInt(p)
      if (a === b) {
        return 0
      }
      if (typeof a === typeof b) {
        return a < b ? flag : -flag
      }
      return typeof a < typeof b ? flag : -flag
    }
  }
}
