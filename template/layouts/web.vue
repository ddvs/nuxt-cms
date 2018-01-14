<style src="element-ui/lib/theme-chalk/base.css"></style>
<style src="element-ui/lib/theme-chalk/loading.css"></style>
<style src="element-ui/lib/theme-chalk/message-box.css"></style>
<style src="element-ui/lib/theme-chalk/message.css"></style>
<style src="element-ui/lib/theme-chalk/notification.css"></style>
<template>
  <div>
    <nuxt/>
  </div>
</template>

<script>
import Vue from 'vue'
import d from 'ddv-util'
import { Loading, MessageBox, Message, Notification } from 'element-ui'

Vue.filter('d', d)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

if (process.browser) {
  d.api.onDataClientError(function onDataClientError (e, context) {
    var toPath
    if (e.errorId === 'NO_LOGIN' && context) {
      if (context.$router && context.$route) {
        toPath = '/' + d._getTypeByRoute(context.$route) + '/login'
        context.$router.push(toPath)
      } else if (context.redirect) {
        toPath = '/' + d._getTypeByContext(context) + '/login'
        context.redirect('302', toPath)
      } else {
        throw e
      }
    } else if (e.errorId === 'UNKNOWN_ERROR') {
      MessageBox('网络错误', '错误')
    } else {
      MessageBox(e.message, '错误')
    }
  })
}

export default {
  head () {
    return {
      title: 'ddv',
      meta: [
        {
          'charset': 'utf-8'
        },
        {
          'name': 'viewport',
          'content': 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
        },
        {
          'name': 'renderer',
          'content': 'webkit'
        }
      ]
    }
  }
}
</script>
