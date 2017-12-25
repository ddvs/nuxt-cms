<style>
.wangEditor-txt img{
  width: auto;
}
</style>


<template>
  <div v-html="inputContent" @input="outputContent" ref="editor"></div>
</template>

<script>
const {createUploadInit} = require('../js/uploadInit.js')
export default{
  props: {
    inputContent: String,
    menus: Array,
    httpRequest: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      content: '',
      editor: null
    }
  },
  mounted () {
    var startTime = new Date()
    var timer = setInterval(() => {
      if ((this.$refs.editor && this.$refs.editor.clientWidth) || new Date() - startTime >= 3000) {
        clearInterval(timer)
        import('wangeditor')
          .then(WangEditor => this.createEditor(WangEditor))
      }
    }, 100)
  },
  methods: {
    createEditor (WangEditor) {
      const self = this
      this.editor = new WangEditor(this.$refs.editor)

      if (this.menus instanceof Array && this.menus.length !== 0) {
        this.editor.config.menus = this.menus
      } else {
        this.editor.config.menus = [
          'source',
          '|',
          'bold',
          'underline',
          'italic',
          'strikethrough',
          'eraser',
          'forecolor',
          'bgcolor',
          '|',
          'quote',
          'fontfamily',
          'fontsize',
          'lineheight',
          'indent',
          'head',
          'unorderlist',
          'orderlist',
          'alignleft',
          'aligncenter',
          'alignright',
          '|',
          'link',
          'unlink',
          'table',
          'emotion',
          '|',
          'img',
          'video',
          'location',
          'insertcode',
          '|',
          'undo',
          'redo',
          'fullscreen'
        ]
      }
      // this.editor.config.uploadImgUrl = this.uploadUrl
      this.editor.onchange = function () {
        self.formatContent(this.$txt.html())
      }
      if (this.httpRequest && typeof this.httpRequest === 'function') {
        this.editor.config.customUpload = true  // 设置自定义上传的开关
        this.editor.config.customUploadInit = createUploadInit(this.httpRequest)  // 配置自定义上传初始化事件，uploadInit方法在上面定义了
      }
      this.editor.create()
    },
    formatContent (content) {
      this.content = content
      this.outputContent()
    },
    outputContent () {
      this.$emit('input', this.content)
    },
    clearContent () {
      this.editor && this.editor.clear && this.editor.clear()
    }
  }
}
</script>

<style lang="css" scoped>
  .wangEditor-container{
    border-radius: 2px;
    overflow: hidden;
    border: 1px solid #CCC;
  }
  
</style>
