const api = require('ddv-restful-api')
const router = require('express').Router()

// 使用微信授权中间件
router.use('/wap', function (req, res, next) {
  var ajaxData = {
    callback: req.protocol + '://' + req.hostname + req.originalUrl
  }
  api.get('v2_0/api.text', req, res).send(ajaxData).then(({state, data}) => {
    if (state) {
      /* eslint-disable-line no-is_login */
      if (!data.is_login && data.redirect) {
        res.redirect(data.redirect)
      } else {
        next()
      }
    } else {
      console.log('出错了')
    }
  }).catch(e => {
    console.log(e)
  })
})

module.exports = router
