<style src="mint-ui/lib/style.css" lang="css"></style>
<style src="ddv-ui/css/wap/base.css" lang="css"></style>
<template>
  <div class="wechat-page">
    <nuxt/>
  </div>
</template>

<script>
import Vue from 'vue'
import Mint from 'mint-ui'
import d from 'ddv-util'
Vue.filter('d', d)
Vue.use(Mint)

if (process.BROWSER_BUILD) {
  require('~plugins/flexible')
}

if (process.BROWSER_BUILD) {
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
    } else {
      Mint.MessageBox('错误', e.message)
    }
  })
}

export default {
  middleware: 'wechatConfig',
  head () {
    return {
      title: '屏趣',
      meta: [
        {'charset': 'utf-8'},
        {'name': 'viewport', 'content': 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'},
        {'name': 'renderer', 'content': 'webkit|ie-stand|ie-comp'},
        {'name': 'apple-mobile-web-app-capable', 'content': 'yes'},
        {'name': 'apple-mobile-web-app-status-bar-style', 'content': 'black'},
        {'name': 'format-detection', 'content': 'telephone=no,email=no'},
        {'name': 'msapplication-tap-highlight', 'content': 'no'},
        {'name': 'flexible', 'content': 'initial-dpr=2,maximum-dpr=3'},
        {'name': 'screen-orientation', 'content': 'portrait'},
        {'name': 'x5-orientation', 'content': 'portrait'},
        {'name': 'full-screen', 'content': 'yes'},
        {'name': 'x5-fullscreen', 'content': 'true'},
        {'name': 'browsermode', 'content': 'application'},
        {'name': 'x5-page-mode', 'content': 'app'}
      ]
    }
  }
}
</script>
