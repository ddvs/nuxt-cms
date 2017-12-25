// 初始化上传
export {
  createUploadInit
}
function createUploadInit (httpRequest) {  
  // 初始化
  function uploadInit () {
    // this 即 editor 对象
    var editor = this
    // 触发选择文件的按钮的id
    var btnId = editor.customUploadBtnId
    // 触发选择文件的按钮的父容器的id
    var containerId = editor.customUploadContainerId
    // 输入框
    var input = document.createElement('input')
    // 文件上传
    input.setAttribute('type', 'file')
    // 支持同时多文件
    input.setAttribute('multiple', 'multiple')
    input.style = 'position:absolute;left:0;top:0;width:100%;height:100%;opacity:0;z-index:99;'
    // 获取文件
    input.onchange = function onchange (e) {
      uploads(e && e.target && e.target.files, editor)
      input.value = ''
    }
    var $container = document.getElementById(containerId)
    $container.style = 'position:relative'
    $container.appendChild(input)
  }

  // 运行多个文件上传
  function uploads (files, editor) {
    var i
    files = files && files.length && files.length > 0 ? files : []
    if (files.length < 1) {
      return
    }
    for (i = 0; i < files.length; i++) {
      uploadRun(files[i], editor)
    }
  }

  // 运行单个上传
  function uploadRun (file, editor) {
    var options = {
      file: file,
      onSuccess: function onSuccess (res) {
        // 隐藏进度条
        editor.hideUploadProgress()
        // 插入图片到editor
        editor.command(null, 'insertHtml', '<img src="' + res.url + '" style="max-width:100%;"/>')
      },
      onError: function onError (e) {
        alert('上传失败' + e.message)
      },
      onProgress: function onProgress (e) {
        // 显示进度条
        editor.showUploadProgress(e.percent)
      }
    }
    var _promise = httpRequest(options)
    if (typeof Promise !== 'undefined' && _promise instanceof Promise) {
      _promise.then(options.onSuccess, options.onError)
    }
  }
  return uploadInit
}
