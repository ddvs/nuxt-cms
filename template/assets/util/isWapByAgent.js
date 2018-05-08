export default function isWapByAgent (agent) {
  var flag = false
  var keywords = ['Android', 'iPhone', 'iPod', 'iPad', 'Windows Phone', 'MQQBrowser']
  agent = typeof agent === 'string' ? agent : ''
  // 排除 Windows 桌面系统
  if (agent.indexOf('Windows NT') < 0 || (agent.indexOf('Windows NT') >= 0 && agent.indexOf('compatible; MSIE 9.0;') >= 0)) {
    // 排除 苹果桌面系统
    if (agent.indexOf('Windows NT') < 0 && agent.indexOf('Macintosh') < 0) {
      for (var i = 0; i < keywords.length; i++) {
        if (agent.indexOf(keywords[i]) >= 0) {
          flag = true
          break
        }
      }
    }
  }
  return flag
}
